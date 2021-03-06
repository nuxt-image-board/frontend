<template>
  <div v-show="illust.title !='not_fetched' || loading.status == 9 || scrapeInfo == {}">
    <div
      class="pageloader"
      :class="{'is-active': ([1,2,9].includes(loading.status)), 'is-warning': (loading.status == 1), 'is-danger': (loading.status == 9)}"
    >
      <span class="title">{{ loading.text }}</span>
    </div>
    <div class="container is-widescreen has-text-centered">
      <h2 class="subtitle">
        イラスト登録
      </h2>
      <table class="table is-fullwidth centered-table">
        <tbody>
          <tr>
            <td>画像</td>
            <td>
              <ImageSelecter
                :image-source="illust.imgs"
                :is-button-disabled="sendAsNumbered"
                @onSelectedImageChanged="onSelectedImageChanged"
              />
            </td>
          </tr>
          <tr>
            <td>名称</td>
            <td>
              <input v-model="illust.title" class="input" type="text">
            </td>
          </tr>
          <tr>
            <td>説明</td>
            <td>
              <textarea v-model="illust.caption" class="textarea" rows="3" type="text" />
            </td>
          </tr>
          <tr>
            <td>タグ</td>
            <td>
              <vue-tags-input
                v-model="tag"
                placeholder="タグを追加"
                :tags="illust.tags"
                :validation="validation"
                @tags-changed="newTags => illust.tags = newTags"
              />
              <br>
              <div class="field is-grouped is-grouped-multiline">
                <div v-for="c in charas" :key="c" @click="illust.tags.push({text:c})">
                  <div v-if="!tagList.includes(c)" class="control" style="margin-right: 5px; margin-bottom:2px;">
                    <div class="tags has-addons">
                      <div class="tag is-primary">
                        {{ c }}
                      </div>
                      <a class="tag is-secondary">+</a>
                    </div>
                  </div>
                </div>
              </div>
              <br>
            </td>
          </tr>
          <tr>
            <td>作者</td>
            <td>
              <input v-model="illust.artist" class="input" type="text">
            </td>
          </tr>
          <tr>
            <td>ソース</td>
            <td>
              <input v-model="illust.originUrl" class="input" type="text" :disabled="scraped">
            </td>
          </tr>
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
      <div class="columns">
        <div class="column has-text-centered is-centered">
          <button
            class="button is-primary is-fullwidth is-large"
            :disabled="loading.status != 0 || illust.title == '' || illust.artist == ''"
            @click="uploadArt"
          >
            送信
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import shortid from 'shortid'
import ImageSelecter from '@/components/ui/ImageSelecter.vue'

export default {
  components: {
    ImageSelecter
  },
  props: {
    scrapeInfo: {
      type: Object,
      default: () => {
        return {
          url: '',
          status: 0
        }
      }
    },
    isScrapePage: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      tag: '',
      sendAsNumbered: false,
      selection: 1,
      scraped: false,
      illust: {
        title: 'not_fetched',
        caption: '',
        imgs: [],
        tags: [],
        artist: '',
        imageUrl: '',
        originUrl: '',
        originService: '',
        R18: false
      },
      addTags: {
      },
      ngTags: [
      ],
      charas: [
      ],
      loading: {
        text: '',
        status: 0
      },
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
  computed: {
    tagList () {
      return this.illust.tags.map(tag => (tag.text))
    }
  },
  watch: {
    'illust.artist' (value) {
      this.illust.artist = this.removeEmoji(value)
    }
  },
  methods: {
    removeEmoji (text) {
      return text.replace(/([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g, '')
    },
    writeArtInfo (imageUrls) {
      this.illust = {
        title: '',
        caption: '',
        imgs: imageUrls,
        tags: [],
        artist: '',
        source: '',
        R18: false,
        imageUrl: imageUrls[0],
        originUrl: '',
        originService: '独自'
      }
    },
    async uploadArt () {
      // 読込中にする
      this.loading.text = '投稿しています...'
      this.loading.status = 1
      // 全く同じなら説明文は消す
      if (this.illust.title === this.illust.caption) {
        this.illust.caption = ''
      }
      // 個人的な趣味でフォーマット
      this.illust.title = this.illust.title.replace('。。。', '...')
      this.illust.caption = this.illust.caption.replace('。。。', '...')
      // タグをテキストに戻す
      this.illust.tags = this.illust.tags.map(tag => (tag.text))
      const params = {
        title: this.illust.title,
        caption: this.illust.caption,
        originService: this.illust.originService,
        originUrl: this.illust.originUrl + '?page=' + this.selection,
        imageUrl: this.illust.imageUrl + '?page=' + this.selection,
        artist: {
          name: this.illust.artist
        },
        tag: this.illust.tags,
        chara: [],
        group: [],
        system: [],
        nsfw: this.illust.R18
      }
      const tasks = []
      // システムタグ作成
      if (this.illust.R18) {
        params.system.push('R18')
      }
      const today = new Date()
      const dateTag = today.getFullYear() + '年' + ('00' + (today.getMonth() + 1)).slice(-2) + '月'
      params.system.push(dateTag)
      // 連番アップロード
      if (this.sendAsNumbered) {
        params.group.push(shortid.generate())
        for (let page = 1; page < this.illust.imgs.length + 1; page++) {
          // 一旦ディープコピーしてくる(しないとパラメータが全部おなじになる)
          const numberedParams = JSON.parse(JSON.stringify(params))
          numberedParams.originUrl = this.illust.originUrl + '?page=' + page
          if (this.illust.originService !== '独自') {
            numberedParams.imageUrl = this.illust.imageUrl + '?page=' + page
          } else {
            numberedParams.imageUrl = this.illust.imgs[page - 1] + '?page=' + page
          }
          if (page !== 1) {
            numberedParams.title = this.illust.title + ` (${page})`
          }
          tasks.push(this.$axios.post('/arts', numberedParams))
        }
      // 通常アップロード
      } else {
        tasks.push(this.$axios.post('/arts', params))
      }
      const taskResults = await Promise.all(tasks)
      if (taskResults.every(v => v.data.status === 202)) {
        this.loading.text = '投稿しました!'
        this.loading.status = 2
      } else {
        this.loading.text = '投稿に失敗しました'
        this.loading.status = 9
      }
      this.closeUpload()
    },
    closeUpload () {
      // 読込画面は1.5秒後に消す
      if (this.isScrapePage) {
        setTimeout(this.closeWindow, 1500)
      } else {
        setTimeout(this.closeModal, 1500)
      }
    },
    closeWindow () {
      open('about:blank', '_self').close()
    },
    closeModal () {
      // 状態を元に戻す
      this.loading.status = 0
      this.selection = 1
      this.sendAsNumbered = false
      this.$emit('uploadComplete')
    },
    onSelectedImageChanged (newSelection) {
      this.selection = newSelection + 1
    }
  }
}
</script>
