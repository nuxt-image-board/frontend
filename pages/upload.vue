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
import removeEmoji from '~/plugins/removeEmoji.js'

export default {
  components: {
    ImageSelecter
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
  watch: {
    'illust.artist' (value) {
      this.illust.artist = removeEmoji.removeEmoji(value)
    }
  },
  methods: {
    onSelectedImageChanged (newSelection) {
      this.selection = newSelection + 1
    },
    async getInfo () {
      let endpoint = '/scrape/'
      let url = this.scrapeUrl
      switch (true) {
        case url.includes('twitter.com'):
          endpoint += 'twitter'
          break
        case url.includes('pixiv.net'):
          endpoint += 'pixiv'
          break
        default:
          url = ''
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
      if (url !== '') {
        isLoading = true
        const response = await this.$axios.post(endpoint, { url })
        const data = response.data
        if (response.data.status === '200') {
          illust = data.data.illust
          const ngWords = []
          const ngTags = [
            '***REMOVED***',
            '***REMOVED***',
            '***REMOVED***',
            '***REMOVED***',
            'R-18',
            'R18',
            'チノ',
            '***REMOVED***',
            '***REMOVED***',
            '***REMOVED***',
            '***REMOVED***'
          ]
          const addTags = {
            チノ: '***REMOVED***',
            ***REMOVED***: '***REMOVED***',
            ***REMOVED***: '***REMOVED***',
            ***REMOVED***: '***REMOVED***',
            ***REMOVED***: '***REMOVED***',
            制服: '制服'
          }
          for (const t in addTags) {
            if (illust.title.includes(t)) {
              illust.tags.push(addTags[t])
            }
          }
          illust.tags.forEach(
            (tag) => {
              ngWords.push('#' + tag)
              ngWords.push('＃' + tag)
            }
          )
          ngWords.forEach(
            (w) => {
              illust.title = illust.title.replace(w, '')
              illust.caption = illust.caption.replace(w, '')
            }
          )
          illust.originUrl = url
          // 余計な文字は消す
          illust.title = illust.title.trim()
          illust.caption = illust.title.trim()
          illust.artist = illust.artist.split('@')[0]
          illust.artist = illust.artist.split('＠')[0]
          illust.artist = removeEmoji.removeEmoji(illust.artist)
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
          thumbnails = illust.imgs.map(img => img.thumb_src)
          tags = illust.tags.filter(
            (tag) => { return !ngTags.includes(tag) }
          )
          illust.tags = tags.map(tag => ({ text: tag }))
          tags = tags.map(tag => ({ text: tag }))
          isLoading = false
          this.isScraped = true
        } else {
          LoadingText = '取得失敗!'
          isFailed = true
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
      // TODO: この辺りの行による propsのエラー修正
      // あとリファクタリング
      this.illust.tags = this.tags.map(tag => (tag.text))
      // 全く同じなら説明文は消す
      if (this.illust.title === this.illust.caption) {
        this.illust.caption = ''
      }
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
      // 連番アップロード
      if (this.sendAsNumbered) {
        const tasks = []
        for (let page = 1; page < this.illust.imgs.length + 1; page++) {
          params.imageUrl = this.illust.originUrl + '?page=' + page
          if (page !== 1) {
            params.title = this.illust.title + ` (${page})`
          }
          tasks.push(this.$axios.post('/arts', params))
        }
        const taskResults = await Promise.all(tasks)
        if (taskResults.every(v => v.data.status === 202)) {
          this.LoadingText = '投稿しました!'
        } else {
          this.LoadingText = '投稿に失敗しました'
          this.isFailed = true
        }
      // 通常アップロード
      } else {
        const response = await this.$axios.post('/arts', params)
        this.isSending = false
        if (response.data.status === 202) {
          this.LoadingText = '投稿しました!'
        } else {
          this.LoadingText = '投稿に失敗しました'
          this.isFailed = true
        }
      }
      setTimeout(this.closeWindow, 1500)
    },
    closeWindow () {
      this.isUploadDisabled = false
      this.isScraped = false
      this.scrapeUrl = ''
      this.isLoading = false
    }
  },
  head () {
    return {
      title: 'イラスト投稿'
    }
  }
}
</script>
