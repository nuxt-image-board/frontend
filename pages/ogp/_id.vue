<template>
  <section class="section">
    <div class="container">
      <div class="columns box is-multiline is-centered is-vcentered has-text-centered">
        <div class="column is-6">
          <img
            src="https://placehold/jp/640x480.png"
            class="thumb"
          >
        </div>
        <div class="column is-6">
          <p class="title">
            Illust title
          </p>
          <p class="subtitle">
            Illust description
          </p>
          <p class="subtitle">
            <a href="#" target="_blank" rel="noopener noreferrer">Artist: title</a>
          </p>
          <p class="subtitle">
            <a href="#" target="_blank" rel="noopener noreferrer">Source: title</a>
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
  methods: {
    getOGPThumb () {
      if (this.result.nsfw) {
        return require('~/assets/images/blocked_r18.png')
      } else {
        return process.env.CDN_ENDPOINT + 'illusts/thumb/' + this.result.illustID + '.jpg'
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
        { hid: 'og:url', property: 'og:url', content: `${process.env.SITE_URL}/arts/${this.result.illustID}` },
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
