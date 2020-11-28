<template>
  <section class="section">
    <div
      class="container"
      @dragenter="fileOnWindow = true"
    >
      <div
        class="modal"
        :class="{'is-active': fileOnWindow}"
        @dragover.prevent
        @drop.prevent="fileOnWindow = false; dropImage($event)"
        @dragleave="fileOnWindow = false;"
      >
        <div class="modal-background" />
        <div class="modal-content">
          <p class="title has-text-centered has-text-white">
            {{ $t('search_image.drop_image') }}
          </p>
        </div>
      </div>
      <div class="columns is-centered is-vcentered" style="min-height:80vh;">
        <div class="column has-text-centered">
          <h4 class="title">
            {{ $t('search_image.title') }}
          </h4>
          <p>
            {{ $t('search_image.description') }}
          </p>
          <br>
          <div class="field">
            <div class="file is-centered is-large has-name is-boxed">
              <label class="file-label">
                <input class="file-input" type="file" accept="image/png,image/jpeg" :disabled="fileName != ''" @change="uploadImage">
                <span class="file-cta">
                  <span v-if="!fileName" class="file-icon">
                    <Fas i="cloud-upload-alt" />
                  </span>
                  <span v-if="!fileName" class="file-label">
                    {{ $t('search_image.select_image') }}
                  </span>
                  <span v-if="fileName" class="button is-primary is-loading" />
                  <span v-if="step == 1" class="file-label">
                    {{ $t('search_image.searching_n_board') }}
                  </span>
                  <span v-if="step == 2" class="file-label">
                    {{ $t('search_image.searching_saucenao') }}
                  </span>
                </span>
                <span v-if="fileName" class="file-name has-text-centered has-background-white">
                  {{ fileName }}
                </span>
              </label>
            </div>
          </div>
          <div v-if="hash && !fileName" class="column has-text-centered">
            <span>
              {{ $t('search_image.hash_value') }} {{ hash }}
            </span>
          </div>
        </div>
        <div v-if="results.length !== 0 || naoResults.length !== 0" class="column has-text-centered is-half">
          <div class="container">
            <div class="columns is-mobile is-multiline is-centered is-vcentered">
              <div v-for="result in results" :key="result.illustID" class="column is-6-mobile is-4-desktop">
                <Result :result="result" />
              </div>
              <div v-for="result in naoResults" :key="result.id" class="column is-6-mobile is-4-desktop">
                <SimpleResult :link="result.link" :thumbnail="result.thumbnail" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Fas from '@/components/ui/Fas.vue'
import Result from '@/components/page/search/Result.vue'
import SimpleResult from '@/components/page/search/SimpleResult.vue'

export default {
  components: {
    Fas,
    Result,
    SimpleResult
  },
  data () {
    return {
      selectedFile: null,
      fileName: '',
      hash: '',
      results: [],
      naoResults: [],
      step: 0,
      fileOnWindow: false
    }
  },
  methods: {
    async logout () {
      try {
        await this.$auth.logout()
      } catch (error) {
        this.$router.push({ path: '/login' })
      }
    },
    dropImage (e) {
      e.target.files = e.dataTransfer.files
      this.uploadImage(e)
    },
    async uploadImage (e) {
      this.results = []
      this.naoResults = []
      e.preventDefault()
      if (e.target.files.length === 0) {
        return null
      }
      const imageFile = e.target.files[0]
      this.fileName = imageFile.name
      if (!this.fileName.includes('jpeg') && !this.fileName.includes('jpg') && !this.fileName.includes('png')) {
        this.$notify(
          {
            group: 'default',
            type: 'danger',
            duration: 5000,
            title: '未対応のファイルです'
          }
        )
        this.step = 0
        this.fileName = ''
        this.hash = ''
        return
      }
      const headers = { 'content-type': 'multipart/form-data' }
      const data = new FormData()
      data.append('file', imageFile)
      this.step += 1
      try {
        const resp = await this.$axios.post('/search/image', data, { headers })
        if (resp.data.status === 200) {
          this.results = resp.data.data.illusts
          this.hash = resp.data.data.hash
        }
      } catch (error) {
        this.$notify(
          {
            group: 'default',
            type: 'danger',
            duration: 5000,
            title: '通信エラーが発生しました'
          }
        )
        this.hash = ''
      }
      if (this.results.length === 0) {
        this.step += 1
        try {
          const resp = await this.$axios.post('/search/image/saucenao', data, { headers })
          if (resp.data.status === 200) {
            let result = resp.data.data.result.slice(0, 3)
            result = result.filter((res) => { return parseFloat(res.header.similarity) > 50 })
            this.naoResults = result.map(function (res, index) {
              return {
                id: index,
                thumbnail: res.header.thumbnail,
                link: res.data.ext_urls[0].replace(
                  'https://www.pixiv.net/member_illust.php?mode=medium&illust_id=',
                  'https://www.pixiv.net/artworks/'
                )
              }
            })
            if (this.naoResults.length === 0) {
              this.naoResults = [{ id: 0, thumbnail: '/not_found.png', link: '#' }]
            }
          }
        } catch (error) {
          this.$notify(
            {
              group: 'default',
              type: 'danger',
              duration: 5000,
              title: '通信エラーが発生しました'
            }
          )
          this.naoResults = []
        }
      }
      this.step = 0
      this.fileName = ''
    }
  },
  head () {
    return {
      title: '画像から検索'
    }
  }
}
</script>
