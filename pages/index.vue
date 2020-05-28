<template>
  <section class="section">
    <div class="container is-wide">
      <div class="tile is-ancestor">
        <div class="tile is-vertical is-8">
          <div class="tile is-parent">
            <article class="tile is-child notification has-background-chino">
              <p class="title">
                ***REMOVED***
              </p>
              <p class="subtitle">
                ***REMOVED***
              </p>
              <div class="content">
                {{ version }}
              </div>
            </article>
          </div>
          <div class="tile">
            <div class="tile is-parent is-vertical">
              <article class="tile is-child notification has-background-rize">
                <p class="title">
                  Danger
                </p>
                <div class="content">
                  <p>表示崩れやバグが発生するかもです。何か気になることがあれば<a :href="CONTACT">問い合わせ等</a>より、ご連絡ください。</p>
                </div>
              </article>
              <article class="tile is-child notification has-background-syaro">
                <p class="title">
                  Hitokoto
                </p>
                <div class="content">
                  <article class="media s-pulled-right">
                    <figure class="media-left">
                      <p class="image is-64x64">
                        <img src="logo.png" alt="***REMOVED*** logo">
                      </p>
                    </figure>
                    <div class="media-content">
                      <div class="content">
                        <p>
                          <strong>{{ hitokoto.name }}</strong>
                          <br>
                          {{ hitokoto.message }}
                        </p>
                      </div>
                    </div>
                  </article>
                </div>
              </article>
            </div>
            <div class="tile is-parent">
              <article class="tile is-child notification has-background-chiya">
                <p class="title">
                  Random
                </p>
                <figure class="image is-4by3">
                  <nuxt-link :to="RANDOM_ILLUST">
                    <img :src="RANDOM_ILLUST_SRC">
                  </nuxt-link>
                </figure>
              </article>
            </div>
          </div>
        </div>
        <div class="tile is-parent">
          <article class="tile is-child notification has-background-cocoa">
            <div class="content">
              <p class="title">
                News
              </p>
              <div class="content">
                <article v-for="n in newsHead" :key="n.id" class="message">
                  <div class="message-header">
                    <p>{{ n.date }} {{ n.title }}</p>
                  </div>
                  <div class="message-body">
                    <p>
                      {{ n.body }} ...
                    </p>
                    <nuxt-link :to="'/news/'+n.id" class="is-pulled-right">
                      もっと見る
                    </nuxt-link>
                    <br>
                  </div>
                </article>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { version, hitokoto } from '~/assets/texts/index.json'

export default {
  async asyncData ({ $axios, $auth, params, error }) {
    const news = await $axios.get('/news/list?count=2')
    if (news.status !== 200) {
      return error({ statusCode: 502, message: 'err' })
    }
    const newsHead = news.data.data
    const random = await $axios.get('/search/random')
    if (random.status !== 200) {
      return error({ statusCode: 502, message: 'err' })
    }
    const randomIllustID = random.data.data.imgs[0].illustID
    return {
      randomIllustID,
      newsHead,
      version,
      hitokoto
    }
  },
  data () {
    return {
      useWebP: this.$cookies.get('useWebP')
    }
  },
  computed: {
    CONTACT () {
      return process.env.CONTACT
    },
    RANDOM_ILLUST_SRC () {
      return process.env.CDN_ENDPOINT + 'illusts/thumb/' + this.randomIllustID + (this.useWebP ? '.webp' : '.jpg')
    },
    RANDOM_ILLUST () {
      return 'arts/' + this.randomIllustID
    }
  },
  head () {
    return {
      titleTemplate: '***REMOVED***'
    }
  }
}
</script>
