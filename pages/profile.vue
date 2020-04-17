<template>
  <section class="section">
    <div class="container is-widescreen">
      <div class="columns is-vcentered is-centered">
        <div class="column is-6 is-vcentered has-text-centered has-image-centered">
          <p class="title">
            {{ $auth.$state.user.name }}
          </p>
          <table class="table is-fullwidth centered-table">
            <tr><td>UserID</td><td>{{ $auth.$state.user.userID }}</td></tr>
            <tr><td>DisplayID</td><td>{{ $auth.$state.user.displayID }}</td></tr>
            <tr><td>推し</td><td>{{ favoriteCharacter }}</td></tr>
            <tr>
              <td>R18表示</td>
              <td>
                <div class="field">
                  <input
                    id="switchRoundedDanger"
                    v-model="acceptR18"
                    type="checkbox"
                    name="switchRoundedDanger"
                    class="switch is-rounded is-danger"
                    :checked="acceptR18"
                  >
                  <label for="switchRoundedDanger" />
                </div>
              </td>
            </tr>
            <tr>
              <td>PC版</td>
              <td>
                <div class="field">
                  <input
                    id="switchPC"
                    v-model="isPC"
                    type="checkbox"
                    name="switchRoundedDanger"
                    class="switch is-rounded is-info"
                    :checked="isPC"
                  >
                  <label for="switchPC" />
                </div>
              </td>
            </tr>
          </table>
          <img class="is-rounded" src="https://profile.***REMOVED***">
        </div>
        <div class="column is-6 is-vcentered has-text-centered">
          <div class="columns is-multiline">
            <div class="column is-12">
              <nuxt-link to="/guide" class="button is-large is-primary">
                利用ガイド
              </nuxt-link>
            </div>
            <div class="column is-12">
              <a href="#" class="button is-large is-primary" disabled>ブックマーク</a>
            </div>
            <div class="column is-12">
              <a href="#" class="button is-large is-primary" disabled>パスワード変更</a>
            </div>
            <div class="column is-12">
              <a :href="LINE_CONNECT_URL" class="button is-large is-primary">LINE連携</a>
            </div>
            <div class="column is-12">
              <button class="button is-large is-primary" @click="logout">
                ログアウト</a>
              </button>
            </div>
            <div class="column is-12">
              <button class="button is-large is-warning" @click="isModalOpen = !isModalOpen">
                APIキー
              </button>
            </div>
            <div class="column is-12">
              <a href="#" class="button is-large is-danger" disabled>退会する</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal" :class="{'is-active': isModalOpen}">
      <div class="modal-background" @click="isModalOpen = !isModalOpen" />
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">
            ***REMOVED***API
          </p>
          <button class="delete" aria-label="close" @click="isModalOpen = !isModalOpen" />
        </header>
        <section class="modal-card-body">
          <div class="content">
            <p>本サイトのAPIとはサイトを表示せずにサイト内のデータのみを直接提供するサービスのことです。Bot開発やデータ収集などが好きな開発者の方はどうぞご自由にご利用ください。</p>
            <p>現在ドキュメントは存在しないので、使用方法は通信を眺めてお察しください。</p>
            <h2>APIキー</h2>
            <p style="word-break:break-all">
              {{ $auth.$state.user.apiKey }}
            </p>
            <button class="button is-danger" disabled>
              再発行 (要再ログイン)
            </button>
          </div>
        </section>
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
export default {
  async asyncData ({ $axios, $auth, params }) {
    const response = await $axios.get('/characters/' + $auth.$state.user.favorite)
    return { favoriteCharacter: response.data.data.name }
  },
  data () {
    return {
      favoriteCharacter: '',
      LINE_CONNECT_URL: '',
      isModalOpen: false,
      acceptR18: this.$cookies.get('acceptR18'),
      isPC: this.$cookies.get('isPC')
    }
  },
  watch: {
    acceptR18 (val) {
      this.$cookies.set('acceptR18', val, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7
      })
    },
    isPC (val) {
      this.$cookies.set('isPC', val, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7
      })
    }
  },
  created () {
    if (process.client) {
      const CSRF = Math.random().toString(36).slice(-8)
      const LINE_ENDPOINT = 'https://access.line.me/oauth2/v2.1/authorize'
      const REDIRECT_URI = process.env.OWN_ENDPOINT + 'line_connect'
      const LINE_PARAMS = new URLSearchParams()
      LINE_PARAMS.append('response_type', 'code')
      LINE_PARAMS.append('client_id', '***REMOVED***')
      LINE_PARAMS.append('state', CSRF)
      LINE_PARAMS.append('scope', 'profile openid')
      LINE_PARAMS.append('redirect_uri', REDIRECT_URI)
      this.LINE_CONNECT_URL = LINE_ENDPOINT + '?' + LINE_PARAMS.toString()
    }
  },
  methods: {
    async logout () {
      try {
        await this.$auth.logout()
      } catch (error) {
        this.$router.push({ path: '/login' })
      }
    }
  }
  /*
  async fetch (context) {
    await context.store.dispatch('getNavigations')
  }
  */
}
</script>
