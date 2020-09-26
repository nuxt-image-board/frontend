<template>
  <section class="section">
    <div class="container">
      <div class="columns box is-multiline is-centered is-vcentered has-text-centered">
        <div class="column is-6">
          <img
            src="https://***REMOVED***/illusts/thumb/1.png"
            class="thumb"
          >
        </div>
        <div class="column is-6">
          <p class="title">
            魔法少女は深淵になにをみるか？
          </p>
          <p class="subtitle">
            Ｃ８９の新刊表紙となっていますっ たぶんでるはず…書店で予約開始してますのでよろしければご覧くださいっ
          </p>
          <p class="subtitle">
            <a href="https://www.pixiv.net/users/40436" target="_blank" rel="noopener noreferrer">Artist: 彩電</a>
          </p>
          <p class="subtitle">
            <a href="https://www.pixiv.net/artworks/54265978" target="_blank" rel="noopener noreferrer">Source: Pixiv</a>
          </p>
          <p class="subtitle">
            This is dummy page only for OGP bots.
            If you are human, please
            <nuxt-link to="/">
              go to top page, and login.
            </nuxt-link>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  auth: false,
  async asyncData ({ $axios, $auth, route, error }) {
    const id = isFinite(route.params.id) ? parseInt(route.params.id) : 1
    const response = await $axios.get(`/arts/${id}`)
    return {
      result: response.data.data
    }
  },
  validate ({ params }) {
    return /^\d+$/.test(params.id)
  },
  computed: {
    ImgAddress () {
      return process.env.CDN_ENDPOINT +
        'illusts/large/' +
        this.result.illustID +
        (this.$store.state.user.useWebP ? '.webp' : '.jpg')
    }
  },
  methods: {
    getOGPThumb () {
      if (this.result.nsfw) {
        return process.env.CDN_ENDPOINT + 'core_sys' + require('~/assets/images/blocked_r18.png')
      } else {
        return process.env.CDN_ENDPOINT + 'illusts/thumb/' + this.result.illustID + '.' + this.result.extension
      }
    }
  },
  head () {
    return {
      titleTemplate: this.result.title,
      meta: [
        { hid: 'description', name: 'description', content: this.result.caption.slice(0, 50) + '...' },
        { hid: 'og:title', property: 'og:title', content: this.result.title + (this.result.nsfw ? '(R18)' : '') },
        { hid: 'og:description', property: 'og:description', content: this.result.caption.slice(0, 50) + '...' },
        { hid: 'og:url', property: 'og:url', content: `https://***REMOVED***/arts/${this.result.illustID}` },
        { hid: 'og:image', property: 'og:image', content: this.getOGPThumb() },
        { hid: 'og:site_name', property: 'og:site_name', content: process.env.SITE_NAME },
        { hid: 'og:type', property: 'og:type', content: 'website' },
        { hid: 'og:locale', property: 'og:locale', content: 'ja_JP' },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:title', content: this.result.title + ' | ' + process.env.SITE_NAME },
        { name: 'twitter:description', content: this.result.caption.slice(0, 50) + '...' },
        { name: 'twitter:image', content: this.getOGPThumb() }
      ]
    }
  }
}
</script>
