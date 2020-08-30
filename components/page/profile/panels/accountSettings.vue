<template>
  <nav class="panel">
    <p class="panel-heading has-text-dark has-background-syaro">
      {{ $t('accountSettings.title') }}
    </p>
    <a class="panel-block" @click="modalType = 2">
      <span class="panel-icon">
        <i class="fas fa-book" aria-hidden="true" />
      </span>
      {{ $t('accountSettings.line_connect.title') }}
    </a>
    <Modal :title="$t('accountSettings.line_connect.title')" :isModalOpen="modalType === 2" @modal-closed="modalType = 0">
      <h2 class="has-text-centered">
        {{ $t('accountSettings.line_connect.title') }} {{ IS_LINE_CONNECTED }}
      </h2>
      <p class="subtitle has-text-centered" style="word-break:break-all">
        <a :href="LINE_CONNECT_URL">
          <button class="button">{{ $t('accountSettings.line_connect.button') }}</button>
        </a>
      </p>
      <p>
        {{ $t('accountSettings.line_connect.sentence') }}
      </p>
    </Modal>
    <a class="panel-block" @click="modalType = 3">
      <span class="panel-icon">
        <i class="fas fa-book" aria-hidden="true" />
      </span>
      {{ $t('accountSettings.change_password.title') }}
    </a>
    <Modal :title="$t('accountSettings.change_password.title')" :isModalOpen="modalType === 3" @modal-closed="modalType = 0">
      <form id="changePW" @submit.prevent="changePassword">
        <input id="userName" class="is-hidden" name="username" autocomplete="username" value="">
        <p class="has-text-centered">
          {{ $t('accountSettings.change_password.form.current_password') }}
          <input
            v-model="passwordForm.old"
            minlength="5"
            maxlength="50"
            class="input"
            type="password"
            :placeholder="$t('accountSettings.change_password.form.password_rule')"
            autocomplete="current-password"
            required
          >
        </p>
        <p class="has-text-centered">
          {{ $t('accountSettings.change_password.form.new_password') }}
          <input
            v-model="passwordForm.new"
            minlength="5"
            maxlength="50"
            class="input"
            type="password"
            :placeholder="$t('accountSettings.change_password.form.password_rule')"
            autocomplete="new-password"
            required
          >
        </p>
        <p class="has-text-centered">
          {{ $t('accountSettings.change_password.form.new_password_re') }}
          <input
            v-model="passwordForm.re"
            minlength="5"
            maxlength="50"
            class="input"
            type="password"
            :placeholder="$t('accountSettings.change_password.form.password_rule')"
            autocomplete="new-password"
            required
          >
        </p>
        <p class="has-text-centered">
          <button
            class="button is-primary"
            type="submit"
            :disabled="passwordForm.new !== passwordForm.re || passwordForm.new == ''"
          >
            {{ $t('accountSettings.change_password.form.change') }}
          </button>
        </p>
      </form>
    </Modal>
    <a class="panel-block" @click="modalType = 4">
      <span class="panel-icon">
        <i class="fas fa-book" aria-hidden="true" />
      </span>
      {{ $t('accountSettings.api_key.title') }}
    </a>
    <Modal title="***REMOVED***API" :isModalOpen="modalType === 4" @modal-closed="modalType = 0">
      <h2 class="has-text-centered">
        {{ $t('accountSettings.api_key.title') }}
      </h2>
      <p class="has-text-centered" style="word-break:break-all">
        {{ $auth.$state.user.apiKey }}
      </p>
      <div class="has-text-centered">
        <a class="button is-warning" disabled>
          {{ $t('accountSettings.api_key.reissue') }}
        </a>
      </div>
      <br>
      <p>{{ $t('accountSettings.api_key.sentence1') }}</p>
      <p>{{ $t('accountSettings.api_key.sentence2') }}</p>
    </Modal>
    <nuxt-link class="panel-block" to="/logout">
      <span class="panel-icon">
        <i class="fas fa-book" aria-hidden="true" />
      </span>
      {{ $t('accountSettings.logout') }}
    </nuxt-link>
  </nav>
</template>

<script>
import Modal from '@/components/ui/Modal.vue'

export default {
  components: {
    Modal
  },
  data () {
    return {
      modalType: 0,
      LINE_CONNECT_URL: '',
      passwordForm: {
        old: '',
        new: '',
        re: ''
      }
    }
  },
  computed: {
    IS_LINE_CONNECTED () {
      return this.$auth.$state.user.lineConnect ? '連携済み' : '未連携'
    }
  },
  created () {
    if (process.client) {
      const CSRF = Math.random().toString(36).slice(-8)
      const LINE_ENDPOINT = 'https://access.line.me/oauth2/v2.1/authorize'
      const LINE_REDIRECT_URI = process.env.OWN_ENDPOINT + 'line_connect'
      const LINE_PARAMS = new URLSearchParams()
      LINE_PARAMS.append('response_type', 'code')
      LINE_PARAMS.append('client_id', '***REMOVED***')
      LINE_PARAMS.append('state', CSRF)
      LINE_PARAMS.append('scope', 'profile openid')
      LINE_PARAMS.append('redirect_uri', LINE_REDIRECT_URI)
      this.LINE_CONNECT_URL = LINE_ENDPOINT + '?' + LINE_PARAMS.toString()
    }
  },
  methods: {
    async changePassword () {
      const resp = await this.$axios.put(
        `/accounts/${this.$auth.$state.user.userID}`,
        { userPassword: this.passwordForm.new, userOldPassword: this.passwordForm.old }
      )
      if (resp.data.status === 200) {
        this.$notify(
          {
            group: 'default',
            type: 'success',
            duration: 5000,
            title: 'パスワードを変更しました'
          }
        )
        this.modalType = 0
      } else if (resp.data.status === 400) {
        this.$notify(
          {
            group: 'default',
            type: 'danger',
            duration: 5000,
            title: '現在のパスワードが間違っています'
          }
        )
      } else {
        this.$notify(
          {
            group: 'default',
            type: 'danger',
            duration: 5000,
            title: '変更できませんでした'
          }
        )
      }
    }
  }
}
</script>
