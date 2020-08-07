<template>
  <nav class="panel">
    <p class="panel-heading has-text-dark has-background-rize">
      通知設定
    </p>
    <a class="panel-block" @click="modalType = 5">
      <span class="panel-icon">
        <i class="fas fa-book" aria-hidden="true" />
      </span>
      通知機能とは
    </a>
    <Modal title="通知機能について" :isModalOpen="modalType === 5" @modal-closed="modalType = 0">
      <p>新着イラストが投稿された際にお知らせする機能です。</p>
      <p>リアルタイムで通知されるので、量によっては目障りとなる可能性もあります。</p>
      <p>現在ブラウザ通知とLINE通知のみ設定可能です。</p>
    </Modal>
    <a class="panel-block" @click="modalType = 7">
      <span class="panel-icon">
        <i class="fas fa-book" aria-hidden="true" />
      </span>
      ブラウザ通知設定
    </a>
    <Modal title="ブラウザ通知設定" :isModalOpen="modalType === 7" @modal-closed="modalType = 0">
      <h2 class="has-text-centered">
        通知状態: {{ IS_BROWSER_NOTIFY_ENABLED }}
      </h2>
      <p class="subtitle has-text-centered" style="word-break:break-all">
        <button class="button is-primary is-large" @click="popUpOneSignal()">
          設定する
        </button>
        <br>
        <br>
        <button class="button is-warning is-small" @click="resetOneSignal()">
          初期化する
        </button>
      </p>
      <p>
        設定すると、今使っているブラウザまたはアプリに通知ができるようになります。
        「設定する」を押すと 通知してもいいかの確認画面が出るので、許可を押してください。
        「設定する」ボタンを押してもなんの反応もない場合は、お手数ですがリロードをお願いします。
        この通知は使うスマホ、パソコン、タブレット毎に設定が要ります。合計5台まで設定可能です。
        5台を超えて設定する場合は一度初期化してから、改めて各デバイスで設定してください。
        <b>
          この機能は Appleのせいで、iOS(iPhone/iPad等)で使うことができません。
        </b>
      </p>
    </Modal>
    <a class="panel-block" @click="modalType = 8">
      <span class="panel-icon">
        <i class="fas fa-book" aria-hidden="true" />
      </span>
      LINE通知設定
    </a>
    <Modal title="LINE通知設定" :isModalOpen="modalType === 8" @modal-closed="modalType = 0">
      <h2 class="has-text-centered">
        通知状態: {{ IS_LINE_NOTIFY_CONNECTED }}
      </h2>
      <p class="subtitle has-text-centered" style="word-break:break-all">
        <a :href="NOTIFY_CONNECT_URL" target="_blank" rel="noopener noreferrer" class="button is-primary is-large">
          設定する
        </a>
      </p>
      <p>
        設定すると、LINEに通知が送れるようになります。
        通知には、LINE Notifyが使用されます。<b>***REMOVED***Botではありません。</b>
        好きなグループで利用できますが、サイトの閲覧にはアカウントが必要なため
        <b>1:1でLINE Notifyから通知を受け取る</b>を選ぶことをおすすめします。
        アカウントを変えた場合は上記ボタンから再連携することができます。
      </p>
    </Modal>
    <a class="panel-block" @click="modalType = 9">
      <span class="panel-icon">
        <i class="fas fa-book" aria-hidden="true" />
      </span>
      Twitter通知設定(未実装)
    </a>
    <Modal title="Twitter通知設定" :isModalOpen="modalType === 9" @modal-closed="modalType = 0">
      <h2 class="has-text-centered">
        通知状態: {{ IS_TWITTER_CONNECTED }}
      </h2>
      <p class="subtitle has-text-centered" style="word-break:break-all">
        <a :href="TWITTER_CONNECT_URL" target="_blank" rel="noopener noreferrer" class="button is-primary is-large" disabled="true">
          設定する
        </a>
      </p>
      <p>
        設定すると、Twitterに通知が送れるようになります。
        通知には、***REMOVED***BotによるDMが使用されます。
        アカウントを変えた場合は上記ボタンから再連携することができます。
      </p>
    </Modal>
  </nav>
</template>

<script>
import Modal from '~/components/ui/Modal.vue'

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
      return this.$auth.$state.user.lineNotify ? '設定済み' : '未設定'
    },
    IS_TWITTER_CONNECTED () {
      return '未設定'
    },
    IS_BROWSER_NOTIFY_ENABLED () {
      if (this.$auth.$state.user.oneSignalNotify == null) {
        return '未設定'
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
