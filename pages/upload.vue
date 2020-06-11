<template>
  <section class="section">
    <div class="container">
      <div class="columns is-centered is-vcentered" style="min-height:70vh">
        <div class="column is-7 has-text-centered">
          <h4 class="title">
            イラスト投稿フォーム
          </h4>
          <p>
            指定されたサイトから情報およびイラストを取得し投稿を行います。
            <b>
              投稿前には必ず
              <nuxt-link to="/rules/illust">
                イラスト投稿ルール
              </nuxt-link>
              をご確認ください!
            </b>
          </p>
          <br>
          <div v-show="!scrapeInfo.scraped">
            <div class="field">
              <label class="label">情報取得元URL(共有用アドレス)</label>
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
              <button class="button is-primary is-fullwidth is-large" :disabled="!scrapeInfo.url" @click="getArtInfo">
                情報入力画面へ
              </button>
            </div>
            <br>
            <p>
              ※このサイトでは、記載サイトから情報を取得し、半自動で登録するシステムを採用しています。
              イラストだけを直接投稿することはできません。
              自分で描いたイラストを投稿したい場合は、一旦PixivかTwitterに投稿してから、そのアドレスを入力して投稿してください。
            </p>
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
