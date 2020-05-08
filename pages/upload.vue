<template>
  <section class="section">
    <div class="container">
      <div class="pageloader" :class="{'is-active': isLoading, 'is-danger': isFailed, 'is-warning':isSending}">
        <span class="title">{{ LoadingText }}</span>
      </div>
      <div class="columns is-centered is-vcentered" style="min-height:70vh">
        <div class="column is-7 has-text-centered">
          <h4 class="title">
            イラスト投稿
          </h4>
          <p v-if="!isScraped">
            指定されたURLから画像を取得し、投稿します。
          </p>
          <p class="has-text-weight-bold">
            投稿前には必ず
            <nuxt-link to="/rules/illust">
              イラスト投稿ルール
            </nuxt-link>
            をご確認ください!
          </p>
          <br>
          <div v-if="!isScraped">
            <div class="field">
              <label class="label">取得元URL</label>
              <div class="control">
                <input v-model="scrapeUrl" placeholder="https://twitter.com/usagi_anime/status/1256508743560261632" class="input is-half" type="text">
              </div>
              <p class="help">
                対応サイト: twitter.com pixiv.net
              </p>
            </div>
            <br>
            <div class="field is-centered">
              <button class="button is-primary is-fullwidth is-large" @click="getInfo">
                データ取得
              </button>
            </div>
          </div>
          <div v-else>
            <div class="column has-text-centered is-centered">
              <table class="table is-fullwidth centered-table">
                <tbody>
                  <tr><td>画像</td><td><ImageSelecter :image-source="thumbnails" :is-button-disabled="sendAsNumbered" @onSelectedImageChanged="onSelectedImageChanged" /></td></tr>
                  <tr><td>名称</td><td><input v-model="illust.title" class="input" type="text"></td></tr>
                  <tr><td>説明</td><td><textarea v-model="illust.caption" class="textarea" rows="3" type="text" /></td></tr>
                  <tr>
                    <td>タグ</td>
                    <td>
                      <vue-tags-input
                        v-model="tag"
                        :tags="illust.tags"
                        :validation="validation"
                        @tags-changed="newTags => tags = newTags"
                      />
                    </td>
                  </tr>
                  <tr><td>作者</td><td><input v-model="illust.artist" class="input" type="text"></td></tr>
                  <tr>
                    <td>R18</td>
                    <td>
                      <div class="field">
                        <input
                          id="isR18Form"
                          v-model="illust.R18"
                          type="checkbox"
                          name="switchRoundedDanger"
                          class="switch is-rounded is-danger"
                        >
                        <label for="isR18Form" />
                      </div>
                    </td>
                  </tr>
                  <tr v-if="illust.imgs.length > 1">
                    <td>連番</td>
                    <td>
                      <div class="field">
                        <input
                          id="withNum"
                          v-model="sendAsNumbered"
                          type="checkbox"
                          name="switchRoundedDanger"
                          class="switch is-rounded is-secondary"
                        >
                        <label for="withNum" />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="column has-text-centered is-centered">
              <button class="button is-primary is-fullwidth is-large" :disabled="isUploadDisabled" @click="upload">
                投稿する
              </button>
            </div>
          </div>
        </div>
        <div v-if="!isScraped" class="column is-5 has-text-centered">
          <br>
          <h4 class="title">
            投稿履歴
          </h4>
          <div class="columns is-centered">
            <div class="column is-8">
              <div class="table-container">
                <table class="table is-hoverable is-striped is-fullwidth">
                  <thead>
                    <tr>
                      <th align="center">
                        開始時刻
                      </th>
                      <th align="center">
                        ステータス
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="u in uploadHistory" :key="u.uploadID">
                      <td align="center">
                        {{ u.started }}
                      </td>
                      <td v-if="u.status == 2" class="has-background-primary has-text-white" align="center">
                        Thumb作成中
                      </td>
                      <td v-else-if="u.status == 3" class="has-background-primary has-text-white" align="center">
                        Large作成中
                      </td>
                      <td v-else-if="u.status == 4" class="has-background-primary has-text-white" align="center">
                        Small作成中
                      </td>
                      <td v-else-if="u.status == 5" class="has-background-success has-text-white" align="center">
                        <nuxt-link :to="'/arts/'+u.illustID">
                          <p class="has-tetxt-white">
                            登録完了
                          </p>
                        </nuxt-link>
                      </td>
                      <td v-else-if="u.status == 8" class="has-background-warning has-text-white-dark" align="center">
                        イラスト重複エラー
                      </td>
                      <td v-else-if="u.status == 9" class="has-background-danger has-text-white" align="center">
                        サーバー内部エラー
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
.has-image-centered {
  margin-left: auto;
  margin-right: auto;
}
.centered-table tr td {
  text-align: center;
  vertical-align: middle;
}
</style>

<script>
import ImageSelecter from '~/components/ui/ImageSelecter.vue'

export default {
  components: {
    ImageSelecter
  },
  async asyncData ({ $axios, $auth, error }) {
    const resp = await $axios.get(
      '/accounts/' + $auth.$state.user.userID + '/upload_history'
    )
    if (resp.status !== 200) {
      return error({ statusCode: 502, message: 'err' })
    }
    return {
      uploadHistory: resp.data.data
    }
  },
  data () {
    return {
      tag: '',
      tags: [],
      isScraped: false,
      isSending: false,
      isUploadDisabled: false,
      scrapeUrl: '',
      selection: 1,
      sendAsNumbered: false,
      thumbnails: [],
      LoadingText: '',
      isFailed: false,
      isLoading: false,
      illust: {},
      validation: [{
        classes: 'max-length',
        rule: tag => tag.text.length > 20
      }, {
        classes: 'no-braces',
        rule: ({ text }) =>
          text.includes('{') ||
          text.includes('}') ||
          text.includes('<') ||
          text.includes('>')
      }]
    }
  },
  methods: {
    onSelectedImageChanged (newSelection) {
      this.selection = newSelection + 1
    },
    async getInfo () {
      let endpoint = '/scrape/'
      switch (true) {
        case this.scrapeUrl.includes('twitter.com'):
          endpoint += 'twitter'
          break
        case this.scrapeUrl.includes('pixiv.net'):
          endpoint += 'pixiv'
          break
        default:
          this.scrapeUrl = ''
          break
      }
      let tags = []
      let isLoading = false
      let isFailed = false
      let thumbnails = []
      let LoadingText = 'Loading'
      let illust = {
        title: '',
        caption: '',
        artist: '',
        tags: [],
        source: '',
        originService: '',
        originUrl: '',
        R18: false,
        imgs: [{
          width: '100',
          height: '100',
          large_src: 'https://profile.***REMOVED***?1',
          thumb_src: 'https://profile.***REMOVED***?2'
        }]
      }
      if (this.scrapeUrl !== '') {
        isLoading = true
        const response = await this.$axios.post(endpoint, { url: this.scrapeUrl })
        const data = response.data
        if (response.data.status === '200') {
          illust = data.data.illust
          const ngWords = [' ', '　']
          illust.tags.forEach(
            (tag) => {
              ngWords.push('#' + tag)
              ngWords.push('＃' + tag)
            }
          )
          ngWords.forEach(
            (tag) => {
              illust.title = illust.title.replace(tag, '')
              illust.caption = illust.caption.replace(tag, '')
            }
          )
          const ngTags = [
            '***REMOVED***',
            '***REMOVED***',
            '***REMOVED***',
            '***REMOVED***',
            'R-18',
            'R18'
          ]
          illust.tags = illust.tags.filter(
            (tag) => { return !ngTags.includes(tag) }
          )
          thumbnails = illust.imgs.map(img => img.thumb_src)
          tags = illust.tags.map(tag => ({ text: tag }))
          illust.tags = illust.tags.map(tag => ({ text: tag }))
          illust.originUrl = this.scrapeUrl
          illust.artist = illust.artist.split('@')[0]
          switch (true) {
            case illust.originUrl.includes('twitter'):
              illust.originService = 'Twitter'
              break
            case illust.originUrl.includes('pixiv'):
              illust.originService = 'Pixiv'
              break
            default:
              illust.originService = '独自'
              break
          }
          isLoading = false
          this.isScraped = true
        } else {
          LoadingText = '取得失敗!'
          isFailed = true
          setTimeout(this.closeWindow, 2000)
        }
      }
      this.tags = tags
      this.thumbnails = thumbnails
      this.LoadingText = LoadingText
      this.isFailed = isFailed
      this.isLoading = isLoading
      this.illust = illust
    },
    async upload () {
      this.isUploadDisabled = true
      this.isSending = true
      this.isLoading = true
      this.LoadingText = '投稿しています...'
      this.illust.tags = this.tags.map(tag => (tag.text))
      const params = {
        title: this.illust.title,
        caption: this.illust.caption,
        originService: this.illust.originService,
        originUrl: this.illust.originUrl,
        imageUrl: this.illust.originUrl + '?page=' + this.selection,
        artist: {
          name: this.illust.artist
        },
        tag: this.illust.tags,
        chara: [],
        nsfw: this.illust.R18
      }
      // console.log(params)
      const response = await this.$axios.post('/arts', params)
      this.isSending = false
      if (response.data.status === 202) {
        this.LoadingText = '投稿しました!'
      } else {
        this.LoadingText = '投稿に失敗しました'
        this.isFailed = true
      }
      setTimeout(this.closeWindow, 2000)
    },
    closeWindow () {
      this.isScraped = false
      this.scrapeUrl = ''
      this.isLoading = false
    }
  }
}
</script>
