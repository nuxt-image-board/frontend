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
                α2 20/04/18 Build
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
                  <p>未完成のサイトです。表示崩れがバグが発生する可能性があります。何か気になることがあれば<a :href="CONTACT">問い合わせ等</a>より、ご連絡ください。</p>
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
                          <strong>***REMOVED***</strong>
                          <br>
                          SQLインジェクションとかあったらつらい
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
                  Recommend
                </p>
                <figure class="image is-4by3">
                  <a :href="RANDOM_ILLUST">
                    <img :src="RANDOM_ILLUST_SRC">
                  </a>
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
      newsHead
    }
  },
  computed: {
    CONTACT () {
      return process.env.CONTACT
    },
    RANDOM_ILLUST_SRC () {
      return process.env.CDN_ENDPOINT + 'illusts/thumb/' + this.randomIllustID + '.webp'
    },
    RANDOM_ILLUST () {
      return 'arts/' + this.randomIllustID
    }
  }
}
</script>
