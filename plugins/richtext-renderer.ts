import { plugin, defaultResolvers } from '@marvr/storyblok-rich-text-vue-renderer'
/* import { NodeTypes } from '@marvr/storyblok-rich-text-types'
 */
const YoutubeEmbed = defineAsyncComponent(() => import('../storyblok/YoutubeEmbed.vue'))

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.use(
      plugin({
        resolvers: {
          ...defaultResolvers,
          
          // [NodeTypes.IMAGE]: YourOwnImageComponent,
          components: {
            'youtube-embed': ({ fields }) => h(YoutubeEmbed, { blok: { ...fields } }),
          },
        },
      }),
    )
  })