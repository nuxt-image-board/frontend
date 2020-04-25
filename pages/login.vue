<template>
  <section class="section">
    <div class="container">
      <Notification
        icon="info"
        :deletable="notificationDeletable"
        :title="notificationText"
        :classes="notificationClasses"
        :deleted="notificationDeleted"
        @deleted-event="deletedEvent"
      />
      <div class="columns is-centered is-vcentered">
        <div class="column has-text-centered is-one-third-touch is-half-desktop has-image-centered">
          <img src="logo.png" alt="***REMOVED*** logo">
        </div>
        <div class="column is-half">
          <div class="container has-text-centered is-vcentered">
            <h3 class="title has-text-centered">
              Login
            </h3>
            <h3 class="subtitle has-text-centered">
              {{ welcomeMsg }}
            </h3>
            <form class="box" @submit="login">
              <div class="field is-horizontal">
                <div class="field-label is-normal">
                  <label for="login_id" class="label">ユーザーID:</label>
                </div>
                <div class="field-body">
                  <div class="field">
                    <div class="control has-icons-left">
                      <input
                        v-model="form.id"
                        name="login_id"
                        type="text"
                        :placeholder="placeholdUser"
                        pattern="[a-zA-Z0-9]+"
                        class="input"
                        autocomplete="username"
                        required
                      >
                      <span class="icon is-small is-left">
                        <Fas i="id-card" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="field is-horizontal">
                <div class="field-label is-normal">
                  <label for="login_key" class="label">パスワード:</label>
                </div>
                <div class="field-body">
                  <div class="field">
                    <div class="control has-icons-left">
                      <input
                        v-model="form.password"
                        name="login_key"
                        type="password"
                        :placeholder="placeholdPasswd"
                        pattern="[a-zA-Z0-9]+"
                        class="input"
                        autocomplete="password"
                        required
                      >
                      <span class="icon is-small is-left">
                        <Fas i="lock" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="field">
                <div class="columns">
                  <div class="column is-6">
                    <button class="button is-block is-info is-medium is-fullwidth">
                      ログイン <Fas i="sign-in-alt" />
                    </button>
                  </div>
                  <div class="column is-6">
                    <a :href="LINE_LOGIN_URL" class="button is-block is-success is-medium is-fullwidth">LINEログイン <Fas i="sign-in-alt" /></a>
                  </div>
                </div>
              </div>
            </form>
            <p class="has-text-grey">
              <nuxt-link to="/register">
                Register
              </nuxt-link> &nbsp;·&nbsp;
              <a :href="CONTACT">Forgot Password</a> &nbsp;·&nbsp;
              <a :href="CONTACT">Need Help?</a>
            </p>
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
import Notification from '~/components/ui/Notification.vue'

export default {
  auth: false,
  components: {
    Fas,
    Notification
  },
  asyncData (context) {
    const entries = [
      'ようこそ彩りが集約されし図書館、***REMOVED***へ',
      'ここから入らんとする者は一切の希望を放棄せよ',
      'ご注文はイラストですか?',
      '本当にしょうがない***REMOVED***さんです',
      '物語の続きを君と描こう',
      '「どこまでだって行くんだよ！」',
      '「夢とともに」',
      '僕らの明日はいつだってプロローグ',
      '何度でも塗り替える　本当の色に',
      '導きの灯りは心の中に',
      '旅立ちはいつだって君を待ってた',
      '心の向かうままに　走り出そう',
      'できるよきっとね　キミとなら',
      '明日へとあせらないでね',
      'ゆっくり遊ぼう',
      'なんとかなるさと上向いて',
      '簡単には教えないっ',
      'ふわふわどきどき内緒ですよ',
      '扉開けたとたん',
      '見知らぬ世界へと',
      'それがありえるかも',
      'ミルク色の異次元',
      '一緒なら素敵だーい!',
      'いたずら笑顔でぴょんぴょん',
      'いまから楽しい楽しいコトばかり',
      'わくわくしてきた?',
      '期待してるこんなにね',
      'キミは夢のなかだよと',
      '夢を 夢を 語ろうよ',
      'だからね楽しい楽しいキミになって',
      '誰に会いたいの？会いたいの？'
    ]
    const placeholder = [
      ['kafuuchino', 'c0c0aS1n!'],
      ['hotococoa', 'ch1n0chaN!'],
      ['tedezarize', 'gUnNer!'],
      ['ujimatsuchiya', 'g0ldeNsyachihOk0'],
      ['kirimasyaro', 'maaamax2max3max3ma'],
      ['jougamaya', 'See_qUeue_sea'],
      ['natsumegumi', 'kUrukurUkUruu']
    ]
    const welcomeMsg = entries[Math.floor(Math.random() * entries.length)]
    const pickChara = placeholder[Math.floor(Math.random() * placeholder.length)]
    const placeholdUser = pickChara[0]
    const placeholdPasswd = pickChara[1]
    return { welcomeMsg, placeholdUser, placeholdPasswd }
  },
  data () {
    return {
      LINE_LOGIN_URL: '',
      notificationText: '',
      notificationClasses: 'is-success',
      notificationDeleted: true,
      notificationDeletable: true,
      form: {
        id: '',
        password: ''
      }
    }
  },
  computed: {
    CONTACT () {
      return process.env.CONTACT
    }
  },
  created () {
    if (process.client) {
      const CSRF = Math.random().toString(36).slice(-8)
      const LINE_ENDPOINT = 'https://access.line.me/oauth2/v2.1/authorize'
      const REDIRECT_URI = process.env.OWN_ENDPOINT + 'line_callback'
      const LINE_PARAMS = new URLSearchParams()
      LINE_PARAMS.append('response_type', 'code')
      LINE_PARAMS.append('client_id', '***REMOVED***')
      LINE_PARAMS.append('state', CSRF)
      LINE_PARAMS.append('scope', 'profile openid')
      LINE_PARAMS.append('redirect_uri', REDIRECT_URI)
      this.LINE_LOGIN_URL = LINE_ENDPOINT + '?' + LINE_PARAMS.toString()
    }
    if (this.$route.query.err) {
      this.notificationDeleted = false
      this.notificationClasses = 'is-danger'
      this.notificationText = 'このLINEアカウントに連携済みのユーザーはいません!'
    }
  },
  methods: {
    async login (e) {
      try {
        e.preventDefault()
        await this.$auth.loginWith('local', { data: this.form })
        const cookies = {
          name: '***REMOVED***',
          value: 'true',
          opts: {
            path: '/',
            domain: '',
            maxAge: 60 * 60 * 24 * 7
          }
        }
        const domains = [
          '***REMOVED***',
          '***REMOVED***',
          '***REMOVED***',
          '***REMOVED***',
          '***REMOVED***',
          '***REMOVED***',
          '***REMOVED***'
        ]
        const cookieList = []
        domains.forEach((domain) => {
          cookies.opts.domain = domain
          cookieList.push(cookies)
        })
        this.$cookies.setAll(cookieList)
        this.$router.push({ path: '/' })
      } catch (error) {
        this.notificationDeleted = false
        this.notificationClasses = 'is-danger'
        this.notificationText = '一致するユーザーがいません!'
      }
    },
    deletedEvent () {
      this.notificationDeleted = true
    }
  }
}
</script>
