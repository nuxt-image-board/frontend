<template>
  <section class="section">
    <div
      class="container"
      @dragenter="fileOnWindow = true"
    >
      <div
        v-if="step == 0"
        class="modal"
        :class="{'is-active': fileOnWindow}"
        @dragover.prevent
        @drop.prevent="fileOnWindow = false; dropImage($event)"
        @dragleave="fileOnWindow = false;"
      >
        <div class="modal-background" />
        <div class="modal-content">
          <p class="title has-text-centered has-text-white">
            ドロップで画像検索
          </p>
        </div>
      </div>
      <div class="columns is-centered is-vcentered" style="min-height:80vh;">
        <div v-if="step == 0" class="column is-6 has-text-centered">
          <h4 class="title">
            画像からイラスト投稿
          </h4>
          <p>
            <b>
              投稿前には必ず
              <nuxt-link to="/rules/illust">
                イラスト投稿ルール
              </nuxt-link>
              をご確認ください!
            </b>
          </p>
          <p>
            こちらは主に公式のイラストを投稿するのを想定しています。ファンアート等はURLから登録してください。
            ***REMOVED***
          </p>
          <p>
            ※JPGかJPEGかPNGのみ対応です
          </p>
          <br>
          <div v-if="step < 2" class="field">
            <div class="file is-centered is-large has-name is-boxed">
              <label class="file-label">
                <input class="file-input" type="file" accept="image/png,image/jpeg" :disabled="fileName != ''" @change="uploadImage">
                <span class="file-cta">
                  <span v-if="!fileName" class="file-icon">
                    <Fas i="cloud-upload-alt" />
                  </span>
                  <span v-if="!fileName" class="file-label">
                    画像を選択…
                  </span>
                  <span v-if="step == 1" class="button is-primary is-loading" />
                  <span v-if="step == 1" class="file-label">
                    ***REMOVED***で検索中...
                  </span>
                </span>
              </label>
            </div>
          </div>
          <br>
          <br>
          <div v-if="step < 2" class="field is-centered">
            <nuxt-link to="/upload" class="button is-primary is-medium">
              URLから投稿する場合はこちら
            </nuxt-link>
          </div>
        </div>
        <div v-if="results.length !== 0 && step < 2" class="column has-text-centered is-half">
          <div class="container">
            <div class="columns is-mobile is-multiline is-centered is-vcentered">
              <div v-for="result in results" :key="result.illustID" class="column is-6-mobile is-4-desktop">
                <Result :result="result" />
              </div>
            </div>
          </div>
        </div>
        <div v-show="step > 1" class="column has-text-centered is-8">
          <UploadScreen
            ref="uploadScreen"
            @uploadComplete="resetUpload"
          />
          <br>
          <br>
          <button class="has-text-centered button is-primary is-warning" @click="step = 0">
            戻る
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Fas from '~/components/ui/Fas.vue'
import Result from '~/components/page/search/Result.vue'
import UploadScreen from '~/components/page/upload/UploadScreen.vue'

export default {
  components: {
    Fas,
    Result,
    UploadScreen
  },
  data () {
    return {
      fileOnWindow: false,
      selectedFile: null,
      imageUrl: '',
      fileName: '',
      results: [],
      step: 0
    }
  },
  methods: {
    dropImage (e) {
      e.target.files = e.dataTransfer.files
      this.uploadImage(e)
    },
    async uploadImage (e) {
      e.preventDefault()
      // バリデーション
      this.step = 1
      this.results = []
      if (e.target.files.length === 0) {
        alert('指定されたファイルが正しくありません')
        this.step = 0
        this.fileName = ''
        return
      }
      const imageFile = e.target.files[0]
      this.fileName = imageFile.name
      if (!this.fileName.includes('jpeg') && !this.fileName.includes('jpg') && !this.fileName.includes('png')) {
        alert('指定されたファイルが正しくありません')
        this.step = 0
        this.fileName = ''
        return
      }
      // 検索APIに投げる
      const headers = { 'content-type': 'multipart/form-data' }
      const data = new FormData()
      data.append('file', imageFile)
      try {
        const resp = await this.$axios.post('/search/image', data, { headers })
        if (resp.data.status === 200) {
          this.results = resp.data.data.illusts
          if (resp.data.data.illusts.length > 0) {
            alert('そのイラストは既に存在します')
            this.step = 0
            this.fileName = ''
            return
          }
        }
      } catch (error) {
        alert('通信エラーが発生しました')
        this.step = 0
        this.fileName = ''
        return
      }
      // 投稿APIに投げる
      try {
        const resp = await this.$axios.post('/scrape/self', data, { headers })
        if (resp.data.status === 200) {
          this.imageUrl = resp.data.url
        }
      } catch (error) {
        alert('通信エラーが発生しました')
        this.step = 0
        this.fileName = ''
        return
      }
      this.step = 2
      this.fileName = ''
      // 投稿画面を開く
      this.$refs.uploadScreen.writeArtInfo(this.imageUrl)
    },
    resetUpload () {
      this.step = 0
      this.fileName = ''
    }
  },
  head () {
    return {
      title: '画像からイラスト投稿'
    }
  }
}
</script>
