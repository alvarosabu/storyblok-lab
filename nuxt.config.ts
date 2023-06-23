// https://nuxt.com/docs/api/configuration/nuxt-config

//
async function fetchStories(routes: string[], cacheVersion: number, page: number = 1) {
  const token = process.env.STORYBLOK_TOKEN
  const version = 'draft'
  const perPage = 100

  let toIgnore = ['home', 'en/settings']

  try {
    const response = await fetch(
      `https://api.storyblok.com/v2/cdn/links?token=${token}&version=${version}&per_page=${perPage}&page=${page}&cv=${cacheVersion}`,
    )
    const data = await response.json()

    // Add routes to the array
    Object.values(data.links).forEach(link => {
      if (!toIgnore.includes(link.slug)) {
        routes.push('/' + link.slug)
      }
    })

    // Check if there are more pages with links

    const total = response.headers.get('total')
    const maxPage = Math.ceil(total / perPage)

    if (maxPage > page) {
      await fetchStories(routes, cacheVersion, ++page)
    }
  } catch (error) {
    console.error(error)
  }
}

export default defineNuxtConfig({
  modules: ['@unocss/nuxt', ['@storyblok/nuxt', { accessToken: process.env.STORYBLOK_TOKEN }]],
  hooks: {
    async 'nitro:config'(nitroConfig) {
      if (!nitroConfig || nitroConfig.dev) {
        return
      }
      const token = process.env.STORYBLOK_TOKEN

      let cache_version = 0

      // other routes that are not in Storyblok with their slug.
      let routes = ['/'] // adds home directly but with / instead of /home
      try {
        const result = await fetch(`https://api.storyblok.com/v2/cdn/spaces/me?token=${token}`)

        if (!result.ok) {
          throw new Error('Could not fetch Storyblok data')
        }

        const space = await result.json()
        cache_version = space.space.version

        // Recursively fetch all routes and set them to the routes array
        await fetchStories(routes, cache_version)
        console.log('routes', routes.join(','))
        nitroConfig.prerender.routes.push(...routes)
      } catch (error) {
        console.error(error)
      }
    },
  },
  unocss: {
    // presets
    uno: true, // enabled `@unocss/preset-uno`
    icons: true, // enabled `@unocss/preset-icons`
    attributify: true, // enabled `@unocss/preset-attributify`,

    theme: {
      colors: {
        brand: {
          primary: '#00B3B0',
          secondary: '#1B243F',
        },
      },
    },

    // core options
    shortcuts: [],
  },
  vite: {
    optimizeDeps: { exclude: ['fsevents'] },
  },
})
