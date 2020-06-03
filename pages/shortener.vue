<template>
  <section class="hero is-fullheight" style="height:60vh;">
    <div class="hero-body">
      <div v-if="!resp" class="container has-text-centered">
        <div class="columns is-centered">
          <div class="column is-6">
            <h4 class="title">
              URL短縮
            </h4>
            <h3 class="subtitle">
              URLを入力すると https://***REMOVED***.page.link/ランダム英数字4文字 に短縮します
            </h3>
            <div class="field">
              <input v-model="url" class="input" type="text" placeholder="https://***REMOVED***">
            </div>
            <button class="button is-primary is-large" :disabled="IS_URL" @click="postUrl">
              短縮
            </button>
            <br>
            <br>
            <br>
          </div>
        </div>
      </div>
      <div v-else class="container has-text-centered">
        <div class="columns is-centered">
          <div class="column is-6">
            <h4 class="title">
              URL短縮
            </h4>
            <h3 class="subtitle">
              短縮が完了しました
            </h3>
            <input v-model="resp" class="input" type="text" readonly>
            <a class="button is-info is-fullwidth" @click="copyUrl">
              クリップボードにコピー
            </a>
            <br>
            <br>
            <button class="button is-primary" @click="resp = null">
              戻る
            </button>
            <br>
            <br>
            <br>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      url: '',
      resp: null
    }
  },
  computed: {
    IS_URL () {
      if (!this.url.startsWith('https://')) {
        return true
      }
      return false
    }
  },
  methods: {
    async postUrl (e) {
      try {
        const key = '***REMOVED***'
        const resp = await axios.post(
          `https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=${key}`,
          {
            longDynamicLink: 'https://***REMOVED***.page.link?link=' + encodeURI(this.url),
            suffix: { option: 'SHORT' }
          }
        )
        if (resp.status === 200) {
          this.resp = resp.data.shortLink
        }
      } catch (error) {
        alert('通信エラーが発生しました')
        this.resp = ''
      }
    },
    copyUrl () {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(this.resp)
        alert('コピーしました')
      }
    }
  },
  head () {
    return {
      title: 'URL短縮'
    }
  }
}
</script>
