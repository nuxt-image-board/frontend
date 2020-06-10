<template>
  <section class="section">
    <div class="container">
      <div class="columns is-centered is-vcentered" style="min-height:70vh">
        <div class="column is-7 has-text-centered">
          <h4 class="title">
            イラスト投稿
          </h4>
          <p>
            指定されたサイトアドレスからイラスト情報を取得し、投稿フォームを出します。
            アドレスには 共有またはシェアで出てくるアドレス を入れてください。
          </p>
          <p class="has-text-weight-bold">
            投稿前には必ず
            <nuxt-link to="/rules/illust">
              イラスト投稿ルール
            </nuxt-link>
            をご確認ください!
          </p>
          <br>
          <div v-show="!scrapeInfo.scraped">
            <div class="field">
              <label class="label">取得元URL</label>
              <div class="control">
                <input
                  v-model="scrapeInfo.url"
                  placeholder="https://twitter.com/usagi_anime/status/1256508743560261632"
                  class="input is-half"
                  type="text"
                >
              </div>
              <p class="help">
                対応サイト: twitter.com pixiv.net
              </p>
            </div>
            <br>
            <div class="field is-centered">
              <button class="button is-primary is-fullwidth is-large" @click="getArtInfo">
                データ取得
              </button>
            </div>
          </div>
          <div v-show="scrapeInfo.scraped">
            <UploadScreen
              ref="uploadScreen"
              :scrapeInfo="scrapeInfo"
              @uploadComplete="resetScrape"
            />
            <br>
            <br>
            <button class="button is-primary is-warning" @click="scrapeInfo.scraped = false">
              戻る
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import UploadScreen from '~/components/page/upload/UploadScreen.vue'

export default {
  components: {
    UploadScreen
  },
  data () {
    return {
      scrapeInfo: {
        url: '',
        scraped: false
      }
    }
  },
  watch: {
    'scrapeInfo.url' (url) {
      // URLパラメータ除去
      url = url.split('?')[0]
      // OriginURLとimageUrlを正規表現で切り出す
      const possibleLinks = url.match('https?://[\x21-\x7e]+')
      if (possibleLinks) {
        this.scrapeInfo.url = possibleLinks.filter(
          link => (
            link.includes('twitter.com') || link.includes('pixiv.net')
          )
        )[0]
      }
    }
  },
  methods: {
    async getArtInfo () {
      await this.$refs.uploadScreen.getArtInfo()
      this.scrapeInfo.scraped = true
    },
    resetScrape () {
      this.scrapeInfo.scraped = false
      this.scrapeInfo.url = ''
    }
  },
  head () {
    return {
      title: 'イラスト投稿'
    }
  }
}
</script>
