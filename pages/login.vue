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
            <form class="box" method="post" @submit="login">
              <h3 class="title has-text-centered">
                ログイン
              </h3>
              <h3 class="subtitle has-text-centered">
                {{ welcomeMsg }}
              </h3>
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
                        aria-label="ユーザーID"
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
                        aria-label="パスワード"
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
                    <button class="button is-block is-link is-medium is-fullwidth">
                      ログイン <Fas i="sign-in-alt" />
                    </button>
                  </div>
                  <div class="column is-6">
                    <a :href="LINE_LOGIN_URL" class="button is-block has-text-white is-medium is-fullwidth" style="background-color: #1a8607;">
                      LINEでログイン <Fas i="sign-in-alt" />
                    </a>
                  </div>
                </div>
              </div>
            </form>
            <p class="has-text-grey">
              <nuxt-link to="/register">
                新規登録はこちら
              </nuxt-link> &nbsp;·&nbsp;
              <a :href="CONTACT" target="_blank" rel="noopener noreferer nofollow">
                ログイン出来ない場合
              </a>
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
import { entries, placeholder } from '~/assets/texts/gate_flavor.json'

export default {
  layout: 'gate',
  components: {
    Fas,
    Notification
  },
  asyncData (context) {
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
      if (this.$store.state.auth.loggedIn) {
        this.$router.push({ path: '/' })
      }
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
        this.postLoggedIn()
      } catch (error) {
        this.notificationDeleted = false
        this.notificationClasses = 'is-danger'
        this.notificationText = '一致するユーザーがいません!'
      }
    },
    deletedEvent () {
      this.notificationDeleted = true
    }
  },
  head () {
    return {
      title: 'ログイン'
    }
  }
}
</script>
