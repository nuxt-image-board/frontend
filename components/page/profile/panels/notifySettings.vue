<template>
  <nav class="panel">
    <p class="panel-heading has-text-dark has-background-rize">
      {{ $t('notifySettings.title') }}
    </p>
    <a class="panel-block" @click="modalType = 5">
      <span class="panel-icon">
        <i class="fas fa-book" aria-hidden="true" />
      </span>
      {{ $t('notifySettings.about.title') }}
    </a>
    <Modal :title="$t('notifySettings.about.title')" :isModalOpen="modalType === 5" @modal-closed="modalType = 0">
      <p>{{ $t('notifySettings.about.sentence') }}</p>
    </Modal>
    <a class="panel-block" @click="modalType = 7">
      <span class="panel-icon">
        <i class="fas fa-book" aria-hidden="true" />
      </span>
      {{ $t('notifySettings.browser.title') }}
    </a>
    <Modal :title="$t('notifySettings.browser.title')" :isModalOpen="modalType === 7" @modal-closed="modalType = 0">
      <h2 class="has-text-centered">
        {{ $t('notifySettings.connect_status.title') }} {{ IS_BROWSER_NOTIFY_ENABLED }}
      </h2>
      <p class="subtitle has-text-centered" style="word-break:break-all">
        <button class="button is-primary is-large" @click="popUpOneSignal()">
          {{ $t('notifySettings.connect_status.button.setup') }}
        </button>
        <br>
        <br>
        <button class="button is-warning is-small" @click="resetOneSignal()">
          {{ $t('notifySettings.connect_status.button.reset') }}
        </button>
      </p>
      <p>{{ $t('notifySettings.browser.sentence') }}</p>
    </Modal>
    <a class="panel-block" @click="modalType = 8">
      <span class="panel-icon">
        <i class="fas fa-book" aria-hidden="true" />
      </span>
      {{ $t('notifySettings.line.title') }}
    </a>
    <Modal :title="$t('notifySettings.line.title')" :isModalOpen="modalType === 8" @modal-closed="modalType = 0">
      <h2 class="has-text-centered">
        {{ $t('notifySettings.connect_status.title') }} {{ IS_LINE_NOTIFY_CONNECTED }}
      </h2>
      <p class="subtitle has-text-centered" style="word-break:break-all">
        <a :href="NOTIFY_CONNECT_URL" target="_blank" rel="noopener noreferrer" class="button is-primary is-large">
          {{ $t('notifySettings.connect_status.button.setup') }}
        </a>
      </p>
      <p>{{ $t('notifySettings.line.sentence') }}</p>
    </Modal>
    <a class="panel-block" @click="modalType = 9">
      <span class="panel-icon">
        <i class="fas fa-book" aria-hidden="true" />
      </span>
      {{ $t('notifySettings.twitter.title') }}
    </a>
    <Modal :title="$t('notifySettings.twitter.title')" :isModalOpen="modalType === 9" @modal-closed="modalType = 0">
      <h2 class="has-text-centered">
        {{ $t('notifySettings.connect_status.title') }} {{ IS_TWITTER_CONNECTED }}
      </h2>
      <p class="subtitle has-text-centered" style="word-break:break-all">
        <a :href="TWITTER_CONNECT_URL" target="_blank" rel="noopener noreferrer" class="button is-primary is-large" disabled="true">
          {{ $t('notifySettings.connect_status.button.setup') }}
        </a>
      </p>
      <p>{{ $t('notifySettings.twitter.sentence') }}</p>
    </Modal>
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
      NOTIFY_CONNECT_URL: '',
      TWITTER_CONNECT_URL: ''
    }
  },
  computed: {
    IS_LINE_NOTIFY_CONNECTED () {
      return this.$auth.$state.user.lineNotify ? this.$t('notifySettings.connect_status.connected') : this.$t('notifySettings.connect_status.not_connected')
    },
    IS_TWITTER_CONNECTED () {
      return this.$t('notifySettings.connect_status.not_connected')
    },
    IS_BROWSER_NOTIFY_ENABLED () {
      if (this.$auth.$state.user.oneSignalNotify == null) {
        return this.$t('notifySettings.connect_status.not_connected')
      }
      const count = this.$auth.$state.user.oneSignalNotify.split(',').length
      return `${count}台設定済み`
    }
  },
  created () {
    if (process.client) {
      const CSRF = Math.random().toString(36).slice(-8)
      const NOTIFY_ENDPOINT = 'https://notify-bot.line.me/oauth/authorize'
      const NOTIFY_REDIRECT_URI = process.env.OWN_ENDPOINT + 'line_notify_connect'
      const NOTIFY_PARAMS = new URLSearchParams()
      NOTIFY_PARAMS.append('response_type', 'code')
      NOTIFY_PARAMS.append('client_id', '***REMOVED***')
      NOTIFY_PARAMS.append('state', CSRF)
      NOTIFY_PARAMS.append('scope', 'notify')
      NOTIFY_PARAMS.append('redirect_uri', NOTIFY_REDIRECT_URI)
      this.NOTIFY_CONNECT_URL = NOTIFY_ENDPOINT + '?' + NOTIFY_PARAMS.toString()
    }
  },
  methods: {
    popUpOneSignal () {
      const self = this
      window.OneSignal = window.OneSignal || []
      window.OneSignal.push(() => {
        window.OneSignal.isPushNotificationsEnabled().then(function (isEnabled) {
          if (isEnabled) {
            console.log('Push notifications are already enabled.')
            window.OneSignal.getUserId().then(function (userId) {
              console.log('OneSignal User ID:', userId)
              self.registerOneSignal(userId)
            })
          } else {
            console.log('Push notifications are not enabled yet.')
            window.OneSignal.on('subscriptionChange', function (isSubscribed) {
              if (isSubscribed) {
                window.OneSignal.getUserId().then(function (userId) {
                  console.log('OneSignal User ID:', userId)
                  self.registerOneSignal(userId)
                })
              }
            })
            window.OneSignal.showNativePrompt()
          }
        })
      })
    },
    async registerOneSignal (userId) {
      const resp = await this.$axios.post('/notify/setting/onesignal', { id: userId })
      if (resp.data.status === 200) {
        this.$notify(
          {
            group: 'default',
            type: 'success',
            duration: 5000,
            title: 'ブラウザ通知設定',
            text: '追加に成功しました。'
          }
        )
        this.modalType = 0
      } else if (resp.data.status === 409) {
        this.$notify(
          {
            group: 'default',
            type: 'danger',
            duration: 5000,
            title: 'ブラウザ通知設定',
            text: '既に登録済みです。'
          }
        )
        this.modalType = 0
      } else {
        this.$notify(
          {
            group: 'default',
            type: 'danger',
            duration: 5000,
            title: 'ブラウザ通知設定',
            text: 'これ以上追加できません。初期化が必要です。'
          }
        )
      }
    },
    async resetOneSignal () {
      const resp = await this.$axios.delete('/notify/setting/onesignal')
      if (resp.data.status === 200) {
        this.$notify(
          {
            group: 'default',
            type: 'success',
            duration: 5000,
            title: 'ブラウザ通知設定',
            text: '初期化が完了しました'
          }
        )
      }
    }
  }
}
</script>
