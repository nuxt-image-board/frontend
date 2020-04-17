<template>
  <section class="section">
    <div class="container">
      <div class="columns is-centered is-vcentered" style="min-height:70vh">
        <div class="column is-half has-text-centered">
          <h4 class="title">
            画像検索
          </h4>
          <p>
            画像を選ぶと***REMOVED***のデータベースより検索します
          </p>
          <p>
            ***REMOVED***に存在しない場合はSauceNaoから検索します
          </p>
          <br>
          <div class="field">
            <div class="file is-centered is-large is-primary has-name is-boxed">
              <label class="file-label">
                <input class="file-input" type="file" accept="image/png,image/jpeg" :disabled="fileName != ''" @change="uploadImage">
                <span class="file-cta">
                  <span v-if="!fileName" class="file-icon">
                    <Fas i="cloud-upload-alt" />
                  </span>
                  <span v-if="!fileName" class="file-label">
                    画像を選択…
                  </span>
                  <span v-if="fileName" class="button is-primary is-loading" />
                  <span v-if="step == 1" class="file-label">
                    ***REMOVED***で検索中...
                  </span>
                  <span v-if="step == 2" class="file-label">
                    SauceNaoで検索中...
                  </span>
                </span>
                <span v-if="fileName" class="file-name has-text-centered">
                  {{ fileName }}
                </span>
              </label>
            </div>
          </div>
          <div v-if="hash && !fileName" class="column has-text-centered">
            <span>
              ハッシュ値: {{ hash }}
            </span>
          </div>
        </div>
        <div class="column is-half">
          <div class="column">
            <div class="container">
              <div class="columns is-centered is-mobile is-multiline">
                <div v-for="result in results" :key="result.illustID" class="column is-4-touch is-6-desktop">
                  <Result :isPC="isPC" :accept-r18="acceptR18" :result="result" />
                </div>
                <div v-for="result in naoResults" :key="result.id" class="column is-4-touch is-6-desktop">
                  <SimpleResult :link="result.link" :thumbnail="result.thumbnail" />
                </div>
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
</style>

<script>
import Fas from '~/components/ui/Fas.vue'
import Result from '~/components/page/search/Result.vue'
import SimpleResult from '~/components/page/search/SimpleResult.vue'

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
      acceptR18: this.$cookies.get('acceptR18'),
      isPC: this.$cookies.get('isPC'),
      results: [],
      naoResults: [],
      step: 0
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
    async uploadImage (e) {
      this.results = []
      this.naoResults = []
      e.preventDefault()
      if (e.target.files.length === 0) {
        return null
      }
      const imageFile = e.target.files[0]
      this.fileName = imageFile.name
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
        alert('通信エラーが発生しました')
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
                link: res.data.ext_urls[0]
              }
            })
            if (this.naoResults.length === 0) {
              this.naoResults = [{ id: 0, thumbnail: '/not_found.png', link: '#' }]
            }
          }
        } catch (error) {
          alert('通信エラーが発生しました')
          this.naoResults = []
        }
      }
      this.step = 0
      this.fileName = ''
    }
  }
}
</script>
