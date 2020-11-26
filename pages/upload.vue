<template>
  <section class="section">
    <div
      class="container"
      @dragenter="fileOnWindow = true"
    >
      <div
        v-if="!uploaded"
        class="modal"
        :class="{'is-active': fileOnWindow}"
        @dragover.prevent
        @drop.prevent="fileOnWindow = false; dropImage($event)"
        @dragleave="fileOnWindow = false;"
      >
        <div class="modal-background" />
        <div class="modal-content">
          <p class="title has-text-centered has-text-white">
            ドロップで投稿画面へ
          </p>
        </div>
      </div>
      <div class="columns is-centered is-vcentered" style="min-height:80vh;">
        <div v-if="!uploaded" class="column is-6 has-text-centered">
          <h4 class="title">
            {{ $t('upload_by_image.title') }}
          </h4>
          <p>
            <b>
              投稿前には必ず
              <nuxt-link to="/help/articles/upload-guidelines">
                投稿ルール / Upload guidelines
              </nuxt-link>
              をご確認ください!
            </b>
          </p>
          <br>
          <div class="field">
            <div class="file is-centered is-large has-name is-boxed">
              <label class="file-label">
                <input class="file-input" type="file" multiple accept="image/png,image/jpeg" @change="uploadImages">
                <span class="file-cta">
                  <span class="file-icon">
                    <Fas i="cloud-upload-alt" />
                  </span>
                  <span class="file-label">
                    {{ $t('upload_by_image.buttons.select_image') }}
                  </span>
                </span>
              </label>
            </div>
            <p class="help">
              {{ $t('upload_by_image.supported_extensions') }}
            </p>
          </div>
          <br>
          <div class="field is-centered">
            <nuxt-link to="/history/upload" class="button is-primary is-medium">
              {{ $t('upload_by_image.buttons.upload_history') }}
            </nuxt-link>
          </div>
        </div>
        <div v-else class="column has-text-centered is-8">
          <UploadScreen
            ref="uploadScreen"
            @uploadComplete="uploaded = !uploaded"
          />
          <br>
          <button class="has-text-centered button is-primary is-warning" @click="uploaded = !uploaded">
            戻る
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Fas from '@/components/ui/Fas.vue'
import UploadScreen from '@/components/page/upload/UploadScreen.vue'

export default {
  components: {
    Fas,
    UploadScreen
  },
  data () {
    return {
      fileOnWindow: false,
      selectedFile: null,
      imageUrl: '',
      fileName: '',
      results: [],
      uploaded: false
    }
  },
  methods: {
    dropImage (e) {
      e.target.files = e.dataTransfer.files
      this.uploadImages(e)
    },
    raiseError (msg) {
      this.$notify(
        { group: 'default', type: 'danger', duration: 5000, title: 'アップロード失敗', text: msg }
      )
    },
    async uploadImages (e) {
      this.uploaded = true
      e.preventDefault()
      if (e.target.files.length === 0) {
        this.raiseError('未対応のファイルです')
        this.uploaded = false
        return
      }
      if (e.target.files.length > 20) {
        this.raiseError('指定されたファイル数が多すぎます')
        this.uploaded = false
        return
      }
      const tasks = []
      for (let i = 0; i < e.target.files.length; i++) {
        tasks.push(this.createTask(e.target.files[i]))
      }
      // 渡されたファイル数分リクエストを投げる
      let imageUrls = await Promise.all(tasks)
      imageUrls = imageUrls.filter(img => img !== 'error')
      if (imageUrls.length === 0) {
        this.raiseError('アップロードに失敗しました')
        this.uploaded = false
        return
      }
      // 投稿画面を開く
      this.$refs.uploadScreen.writeArtInfo(imageUrls)
    },
    createTask (imageFile) {
      return new Promise((resolve) => {
        const resp = this.uploadImage(imageFile)
        resolve(resp)
      })
    },
    async uploadImage (imageFile) {
      // 画像ファイルでなければエラー
      if (
        !imageFile.name.includes('jpeg') &&
        !imageFile.name.includes('jpg') &&
        !imageFile.name.includes('png')
      ) {
        this.raiseError('未対応のファイルです')
        return 'error'
      }
      // 検索APIに投げる
      const headers = { 'content-type': 'multipart/form-data' }
      const imgData = new FormData()
      imgData.append('file', imageFile)
      try {
        const resp = await this.$axios.post('/search/image', imgData, { headers })
        if (resp.data.data.illusts > 0) {
          this.raiseError('その画像は既に投稿されています')
          return 'error'
        }
        // 投稿APIに投げる
        const resp2 = await this.$axios.post('/scrape/self', imgData, { headers })
        return resp2.data.data.url
      } catch {
        this.raiseError('通信エラーが発生しました')
        return 'error'
      }
    }
  },
  head () {
    return {
      title: 'イラスト投稿'
    }
  }
}
</script>
