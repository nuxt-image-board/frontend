<template>
  <section class="section">
    <div class="container is-wide">
      <div class="tile is-ancestor">
        <div class="tile is-vertical is-8">
          <div class="tile is-parent">
            <article class="tile is-child notification has-background-cocoa">
              <p class="title">
                {{ $t('site_name') }}
              </p>
              <p class="subtitle">
                {{ $t('site_description') }}
              </p>
              <div class="content">
                {{ version }}
              </div>
            </article>
          </div>
          <div class="tile">
            <div class="tile is-parent is-vertical">
              <article class="tile is-child notification has-background-cocoa">
                <p class="title">
                  Contact us
                </p>
                <div class="content">
                  <p><a :href="CONTACT">何か問題や質問などがあればこちらからお問い合わせください!</a></p>
                </div>
              </article>
              <article class="tile is-child notification has-background-cocoa">
                <p class="title">
                  Hitokoto
                </p>
                <div class="content">
                  <article class="media s-pulled-right">
                    <figure class="media-left">
                      <p class="image is-64x64">
                        <img src="logo.png" :alt="`${SITE_NAME} logo`">
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
              <article class="tile is-child notification has-background-cocoa">
                <p class="title">
                  Random
                </p>
                <figure class="image is-4by3">
                  <nuxt-link :to="RANDOM_ILLUST">
                    <img v-lazy="RANDOM_ILLUST_SRC" src="~/assets/images/loading.png">
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
    const news = await $axios.get('/news/list?count=2', { useCache: true })
    if (news.status !== 200) {
      return error({ statusCode: 502, message: 'err' })
    }
    const newsHead = news.data.data
    const random = await $axios.get('/search/random')
    if (random.status !== 200) {
      return error({ statusCode: 502, message: 'err' })
    }
    let randomIllust = {}
    if (random.data.data.imgs.length > 0) {
      randomIllust = random.data.data.imgs[0]
    } else {
      randomIllust = { illustID: 1 }
    }
    return {
      randomIllust,
      newsHead,
      version,
      hitokoto
    }
  },
  computed: {
    CONTACT () {
      return process.env.CONTACT
    },
    SITE_NAME () {
      return process.env.SITE_NAME
    },
    RANDOM_ILLUST_SRC () {
      return this.$config.API_CDN_ENDPOINT + 'illusts/thumb/' + this.randomIllust.illustID + '.' + (this.$store.state.user.useWebP ? 'webp' : 'jpg')
    },
    RANDOM_ILLUST () {
      return 'arts/' + this.randomIllust.illustID
    }
  },
  mounted () {
    if (this.$auth.loggedIn) {
      this.$nuxt.setLayout(this.$store.state.user.isPC ? 'desktop' : 'mobile')
    }
  },
  head () {
    return {
      titleTemplate: this.$t('site_name')
    }
  }
}
</script>
