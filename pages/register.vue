<template>
  <section class="section">
    <div id="top" class="container">
      <Notification
        icon="info"
        :deletable="notificationDeletable"
        :title="notificationText"
        classes="is-danger"
        :deleted="notificationDeleted"
        @deleted-event="deletedEvent"
      />
      <div class="columns is-centered is-vcentered">
        <div class="column has-text-centered is-one-third-touch is-half-desktop has-image-centered">
          <img src="logo.png" alt="***REMOVED*** logo">
        </div>
        <div class="column is-half">
          <div class="container has-text-centered is-vcentered">
            <form class="box" method="post" @submit="register">
              <h3 class="title has-text-centered">
                {{ $t('gate.text.register') }}
              </h3>
              <h3 class="subtitle has-text-centered">
                {{ welcomeMsg }}
              </h3>
              <div class="field">
                <div class="control has-icons-left">
                  <input
                    v-model="form.username"
                    name="display_id"
                    type="text"
                    :aria-label="$t('gate.register_form.user_name')"
                    :placeholder="$t('gate.register_form.user_name')"
                    maxlength="20"
                    class="input"
                    autocomplete="nickname"
                    required
                  >
                  <span class="icon is-small is-left">
                    <Fas i="id-card" />
                  </span>
                </div>
              </div>
              <div class="field">
                <div class="control has-icons-left">
                  <input
                    v-model="form.displayID"
                    name="user_id"
                    type="text"
                    :aria-label="$t('gate.register_form.user_id')"
                    :placeholder="$t('gate.register_form.user_id')"
                    pattern="[a-zA-Z0-9]+"
                    maxlength="20"
                    class="input"
                    autocomplete="username"
                    required
                  >
                  <span class="icon is-small is-left">
                    <Fas i="id-card" />
                  </span>
                </div>
              </div>
              <div class="field">
                <div class="control has-icons-left">
                  <input
                    v-model="form.password"
                    name="user_passwd"
                    type="password"
                    :aria-label="$t('gate.register_form.password')"
                    :placeholder="$t('gate.register_form.password')"
                    pattern="[a-zA-Z0-9]+"
                    maxlength="20"
                    class="input"
                    autocomplete="new-password"
                    required
                  >
                  <span class="icon is-small is-left">
                    <Fas i="lock" />
                  </span>
                </div>
              </div>
              <div class="field">
                <div class="control has-icons-left">
                  <input
                    v-model="form.password_re"
                    name="user_passwd_re"
                    type="password"
                    :aria-label="$t('gate.register_form.password_re')"
                    :placeholder="$t('gate.register_form.password_re')"
                    pattern="[a-zA-Z0-9]+"
                    maxlength="20"
                    class="input"
                    autocomplete="new-password"
                    required
                  >
                  <span class="icon is-small is-left">
                    <Fas i="lock" />
                  </span>
                </div>
              </div>
              <div class="field">
                <div class="control has-icons-left">
                  <input
                    v-model="form.inviteCode"
                    name="inv_code"
                    type="text"
                    :aria-label="$t('gate.register_form.invite_code')"
                    :placeholder="$t('gate.register_form.invite_code')"
                    pattern="[a-zA-Z0-9]+"
                    maxlength="10"
                    class="input"
                    autocomplete="one-time-code"
                    required
                  >
                  <span class="icon is-small is-left">
                    <Fas i="ticket-alt" />
                  </span>
                </div>
              </div>
              <div class="field">
                <div class="control has-text-centered">
                  <label class="checkbox">
                    <input v-model="form.agreeTerms" type="checkbox">
                    <nuxt-link to="terms">{{ $t('gate.register_form.agree_tos') }}</nuxt-link>
                  </label>
                </div>
              </div>
              <div class="field">
                <button :disabled="!filled" class="button is-block is-info is-medium is-fullwidth">
                  {{ $t('gate.button.register') }} <Fas i="sign-in-alt" />
                </button>
              </div>
            </form>
            <p class="has-text-grey">
              <nuxt-link to="/login">
                {{ $t('gate.mini_button.login') }}
              </nuxt-link> &nbsp;·&nbsp;
              <a :href="CONTACT" target="_blank" rel="noopener noreferrer">
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
import { entries } from '~/assets/texts/gate.json'

export default {
  auth: false,
  layout: 'gate',
  components: {
    Fas,
    Notification
  },
  asyncData (context) {
    const welcomeMsg = entries[Math.floor(Math.random() * entries.length)]
    return { welcomeMsg }
  },
  data () {
    return {
      notificationText: '',
      notificationDeleted: true,
      notificationDeletable: true,
      form: {
        displayID: '',
        username: '',
        password: '',
        password_re: '',
        inviteCode: '',
        agreeTerms: false
      },
      isFormInvalid: false
    }
  },
  computed: {
    CONTACT () {
      return process.env.CONTACT
    },
    filled () {
      if (
        this.form.displayID &&
        this.form.username &&
        this.form.password &&
        this.form.password_re &&
        this.form.inviteCode &&
        this.form.agreeTerms === true
      ) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    async register (e) {
      e.preventDefault()
      // パスワード確認
      if (this.form.password !== this.form.password_re) {
        this.notificationDeleted = false
        this.notificationText = 'パスワードが一致しません!'
        this.$scrollTo('#top', 500, { container: 'body', easing: 'ease' })
        return false
      }
      // リクエスト
      const resp = await this.$axios.post('/accounts', this.form)
      const data = resp.data
      switch (data.status) {
        case 201:
          this.form.id = this.form.displayID
          await this.$auth.loginWith('local', { data: this.form })
          this.postLoggedIn()
          this.$router.push('/')
          break
        case 400:
          this.notificationDeleted = false
          this.notificationText = '招待コードが無効です!'
          this.$scrollTo('#top', 500, { container: 'body', easing: 'ease' })
          break
        case 409:
          this.notificationDeleted = false
          this.notificationText = '指定した表示名またはIDは既に使われています!'
          this.$scrollTo('#top', 500, { container: 'body', easing: 'ease' })
          break
        case 500:
          this.notificationDeleted = false
          this.notificationText = 'サーバー内でエラーが発生しました!'
          this.$scrollTo('#top', 500, { container: 'body', easing: 'ease' })
          break
        default:
          this.notificationText = '何かが違うみたいです!'
      }
    },
    deletedEvent () {
      this.notificationDeleted = true
    }
  },
  head () {
    return {
      title: '新規登録'
    }
  }
}
</script>
