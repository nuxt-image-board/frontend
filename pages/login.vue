<template>
  <section class="section">
    <div id="top" class="container">
      <Notification
        icon="info"
        :deletable="notificationDeletable"
        :classes="notificationClasses"
        :deleted="notificationDeleted"
        @deleted-event="deletedEvent"
      >
        {{ notificationText }}
      </Notification>
      <div class="columns is-centered is-vcentered">
        <div class="column has-text-centered is-one-third-touch is-half-desktop has-image-centered">
          <img src="logo.png" alt="***REMOVED*** logo">
        </div>
        <div class="column is-half">
          <div class="container has-text-centered is-vcentered">
            <form class="box" method="post" @submit="login">
              <h3 class="title has-text-centered">
                {{ $t('gate.text.login') }}
              </h3>
              <h3 class="subtitle has-text-centered">
                {{ welcomeMsg }}
              </h3>
              <div class="field is-horizontal">
                <div class="field-label is-normal">
                  <label for="login_id" class="label">{{ $t('gate.login_form.user_id') }}</label>
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
                  <label for="login_key" class="label">{{ $t('gate.login_form.password') }}</label>
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
                  <div class="column is-4">
                    <button class="button is-block is-link is-medium is-fullwidth">
                      {{ $t('gate.button.login') }} <Fas i="sign-in-alt" />
                    </button>
                  </div>
                  <div class="column is-4">
                    <a :href="LINE_LOGIN_URL" target="_blank" rel="noopener noreferrer" class="button is-block has-text-white is-medium is-fullwidth" style="background-color: #1a8607;">
                      {{ $t('gate.button.login_with_line') }} <Fas i="sign-in-alt" />
                    </a>
                  </div>
                  <div class="column is-4">
                    <client-only>
                      <vue-telegram-login
                        mode="redirect"
                        size="medium"
                        :telegram-login="`${TELEGRAM_USERID}`"
                        :redirect-url="`${SITE_URL}/social/telegram/callback`"
                      />
                    </client-only>
                  </div>
                </div>
              </div>
            </form>
            <p class="has-text-grey">
              <nuxt-link to="/register">
                {{ $t('gate.mini_button.register') }}
              </nuxt-link> &nbsp;·&nbsp;
              <a :href="CONTACT" target="_blank" rel="noopener noreferer nofollow">
                {{ $t('gate.mini_button.contact_us') }}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Fas from '@/components/ui/Fas.vue'
import Notification from '@/components/ui/Notification.vue'
import { entries, placeholder } from '~/assets/texts/gate.json'

export default {
  auth: false,
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
    },
    SITE_URL () {
      return process.env.SITE_URL
    },
    TELEGRAM_USERID () {
      return process.env.TELEGRAM_USERID
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
        this.$notify(
          {
            group: 'default',
            type: 'warning',
            duration: 2000,
            title: this.$t('gate.notify.login_steps.title'),
            text: this.$t('gate.notify.login_steps.authorizating')
          }
        )
        await this.$auth.loginWith('local', { data: this.form })
        await this.postLoggedIn()
        this.$router.push({ path: '/' })
      } catch (error) {
        this.$notify(
          {
            group: 'default',
            type: 'danger',
            duration: 2000,
            title: this.$t('gate.notify.login_steps.title'),
            text: this.$t('gate.notify.login_steps.authorize_failed')
          }
        )
        this.notificationDeleted = false
        this.notificationClasses = 'is-danger'
        this.notificationText = '一致するユーザーがいません!'
        this.$scrollTo('#top', 500, { container: 'body', easing: 'ease' })
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
