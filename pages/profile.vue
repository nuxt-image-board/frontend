<template>
  <section class="section">
    <div class="container is-widescreen has-text-centered">
      <div class="columns is-centered is-vcentered">
        <div class="column is-4 is-centered">
          <nav class="panel">
            <p class="panel-heading has-text-dark has-background-chino">
              ユーザー情報
            </p>
            <p class="panel-block">
              ユーザー名: {{ $auth.$state.user.name }}
            </p>
            <p class="panel-block">
              ID: {{ $auth.$state.user.displayID }}
            </p>
            <p class="panel-block">
              登録日: {{ $auth.$state.user.registeredDate }}
            </p>
            <p class="panel-block">
              <nuxt-link
                class="button is-link is-outlined is-fullwidth"
                to="/upload_history"
              >
                投稿履歴確認
              </nuxt-link>
            </p>
          </nav>
        </div>
        <div class="column is-4 is-centered">
          <nav class="panel">
            <p class="panel-heading has-text-dark has-background-cocoa">
              招待情報
            </p>
            <p class="panel-block">
              招待者: {{ $auth.$state.user.inviter.name }}
            </p>
            <p class="panel-block">
              招待数:  {{ $auth.$state.user.invite.invited }}
            </p>
            <p class="panel-block">
              招待可否: {{ IS_INVITE_ENABLED }}
            </p>
            <p class="panel-block">
              <button
                class="button is-link is-outlined is-fullwidth"
                :disabled="!$auth.$state.user.invite.enabled"
                @click="getInviteKey(); modalType=1"
              >
                招待する
              </button>
            </p>
          </nav>
        </div>
      </div>
      <Modal title="招待" :isModalOpen="modalType === 1" @modal-closed="modalType = 0">
        <h2 class="has-text-centered">
          あなたの招待コード
        </h2>
        <p class="subtitle has-text-centered" style="word-break:break-all">
          {{ inviteKey }}
        </p>
        <p>
          この招待コードを他の人に伝えることで***REMOVED***に新規登録してもらうことができます。
        </p>
        <p>
          ただし、このコードを使い招待された人がなんらかの理由でBANされた場合、あなたにも罰則が付きます。
          つまり、あなたがそのユーザーの保証人になります。信頼できる人のみを招待してください。
        </p>
      </Modal>
      <div class="columns is-vcentered is-centered">
        <div class="column is-4 is-centered">
          <nav class="panel">
            <p class="panel-heading has-text-dark has-background-chiya">
              サイト設定
            </p>
            <table class="table is-fullwidth centered-table">
              <tbody>
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
                  <td>PC版メニュー</td>
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
                <tr v-if="!isPC">
                  <td>左利きメニュー</td>
                  <td>
                    <div class="field">
                      <input
                        id="switchLeft"
                        v-model="isLeftHanded"
                        type="checkbox"
                        name="switchLeft"
                        class="switch is-rounded is-info"
                        :checked="isLeftHanded"
                      >
                      <label for="switchLeft" />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>上に戻るボタン</td>
                  <td>
                    <div class="field">
                      <input
                        id="switchJump"
                        v-model="isJumpEnabled"
                        type="checkbox"
                        name="switchRoundedInfo"
                        class="switch is-rounded is-info"
                        :checked="isJumpEnabled"
                      >
                      <label for="switchJump" />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>WebP使用</td>
                  <td>
                    <div class="field">
                      <input
                        id="switchWebP"
                        v-model="useWebP"
                        type="checkbox"
                        name="switchWebP"
                        class="switch is-rounded is-info"
                        :checked="useWebP"
                      >
                      <label for="switchWebP" />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </nav>
        </div>
        <div class="column is-4 is-centered">
          <nav class="panel">
            <p class="panel-heading has-text-dark has-background-syaro">
              アカウント設定
            </p>
            <a class="panel-block" @click="modalType = 2">
              <span class="panel-icon">
                <i class="fas fa-book" aria-hidden="true" />
              </span>
              LINE連携
            </a>
            <Modal title="LINE連携" :isModalOpen="modalType === 2" @modal-closed="modalType = 0">
              <h2 class="has-text-centered">
                連携状態: {{ IS_LINE_CONNECTED }}
              </h2>
              <p class="subtitle has-text-centered" style="word-break:break-all">
                <a :href="LINE_CONNECT_URL">
                  <button class="button">連携する</button>
                </a>
              </p>
              <p>
                LINEと既存アカウントを連携することで***REMOVED***のユーザー名/パスワードなしにログインできるようになります。
                アカウントを変えた場合は上記ボタンから再連携することができます。
              </p>
            </Modal>
            <a class="panel-block" @click="modalType = 3">
              <span class="panel-icon">
                <i class="fas fa-book" aria-hidden="true" />
              </span>
              パスワード変更
            </a>
            <Modal title="パスワード変更" :isModalOpen="modalType === 3" @modal-closed="modalType = 0">
              <form id="changePW">
                <input id="userName" class="is-hidden" name="username" autocomplete="username" value="">
                <p class="has-text-centered">
                  現在のパスワード
                  <input v-model="passwordForm.old" class="input" type="password" autocomplete="current-password">
                </p>
                <p class="has-text-centered">
                  新しいパスワード
                  <input v-model="passwordForm.new" class="input" type="password" autocomplete="new-password">
                </p>
                <p class="has-text-centered">
                  新しいパスワード(再入力)
                  <input v-model="passwordForm.re" class="input" type="password" autocomplete="new-password">
                </p>
                <p class="has-text-centered">
                  <button class="button is-primary" @click="changePassword">
                    変更
                  </button>
                </p>
              </form>
            </Modal>
            <a class="panel-block" @click="modalType = 4">
              <span class="panel-icon">
                <i class="fas fa-book" aria-hidden="true" />
              </span>
              APIキー確認
            </a>
            <Modal title="***REMOVED***API" :isModalOpen="modalType === 4" @modal-closed="modalType = 0">
              <h2 class="has-text-centered">
                APIキー
              </h2>
              <p class="has-text-centered" style="word-break:break-all">
                {{ $auth.$state.user.apiKey }}
              </p>
              <div class="has-text-centered">
                <a class="button is-warning" disabled>
                  再発行 (要再ログイン)
                </a>
              </div>
              <br>
              <p>本サイトのAPIとはサイトを表示せずにサイト内のデータのみを直接提供するサービスのことです。Bot開発やデータ収集などが好きな開発者の方はどうぞご自由にご利用ください。</p>
              <p>現在ドキュメントは存在しないので、使用方法は通信を眺めてお察しください。</p>
            </Modal>
            <a class="panel-block" @click="$auth.logout()">
              <span class="panel-icon">
                <i class="fas fa-book" aria-hidden="true" />
              </span>
              ログアウト
            </a>
          </nav>
        </div>
        <div class="column is-4 is-vcentered has-text-centered" style="height:100%">
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
                <a :href="NOTIFY_CONNECT_URL" class="button is-primary is-large">
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
                <a :href="TWITTER_CONNECT_URL" class="button is-primary is-large" disabled="true">
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
        </div>
      </div>
      <div class="column is-12">
        <button class="button is-danger" @click="modalType = 6">
          退会する
        </button>
        <Modal title="退会" :isModalOpen="modalType === 6" @modal-closed="modalType = 0; destroyStep = 0">
          <h2 class="has-text-centered">
            {{ destroyMessages[destroyStep][0] }}
          </h2>
          <p class="subtitle has-text-centered" style="word-break:break-all">
            <button v-if="destroyStep < 3" class="button is-warning is-large" @click="destroyStep+=1">
              {{ destroyMessages[destroyStep][1] }}
            </button>
            <button v-else class="button is-danger is-large" @click="destroyAccount">
              {{ destroyMessages[destroyStep][1] }}
            </button>
          </p>
          <p>
            退会しても登録したイラストは残ります。
            再度***REMOVED***を利用するには新たに招待コードを受け取る必要があります。
          </p>
        </Modal>
      </div>
    </div>
  </section>
</template>

<style>
.centered-table tr td {
  text-align: center;
  vertical-align: middle;
}
</style>

<script>
import Modal from '~/components/ui/Modal.vue'

export default {
  components: {
    Modal
  },
  data () {
    return {
      modalType: 0,
      favoriteCharacter: 'NOT DEFINED',
      inviteKey: '',
      LINE_CONNECT_URL: '',
      NOTIFY_CONNECT_URL: '',
      passwordForm: {
        old: '',
        new: '',
        re: ''
      },
      destroyStep: 0,
      destroyMessages: [
        ['本当に退会してよろしいですか?', 'よろしいです'],
        ['本当にいいですね?', '本当にいい'],
        ['後悔しませんね?', '後悔しない'],
        ['最終確認: アカウントを削除して退会します', '退会する']
      ],
      acceptR18: this.$cookies.get('acceptR18'),
      isPC: this.$cookies.get('isPC'),
      isLeftHanded: this.$cookies.get('isLeftHanded'),
      useWebP: this.$cookies.get('useWebP'),
      isJumpEnabled: this.$cookies.get('isJumpEnabled')
    }
  },
  computed: {
    CONTACT () {
      return process.env.CONTACT
    },
    IS_LINE_CONNECTED () {
      return this.$auth.$state.user.lineConnect ? '連携済み' : '未連携'
    },
    IS_LINE_NOTIFY_CONNECTED () {
      return this.$auth.$state.user.lineNotify ? '設定済み' : '未設定'
    },
    IS_TWITTER_CONNECTED () {
      return '未設定'
    },
    IS_INVITE_ENABLED () {
      return this.$auth.$state.user.invite.enabled ? '可' : '否'
    },
    IS_BROWSER_NOTIFY_ENABLED () {
      if (this.$auth.$state.user.oneSignalNotify == null) {
        return '未設定'
      }
      const count = this.$auth.$state.user.oneSignalNotify.split(',').length
      return `${count}台設定済み`
    }
  },
  watch: {
    acceptR18 (val) {
      this.$cookies.set('acceptR18', val, {
        path: '/',
        maxAge: 60 * 60 * 24 * 31
      })
    },
    useWebP (val) {
      this.$cookies.set('useWebP', val, {
        path: '/',
        maxAge: 60 * 60 * 24 * 31
      })
    },
    isLeftHanded (val) {
      this.$cookies.set('isLeftHanded', val, {
        path: '/',
        maxAge: 60 * 60 * 24 * 31
      })
      location.reload()
    },
    isPC (val) {
      this.$cookies.set('isPC', val, {
        path: '/',
        maxAge: 60 * 60 * 24 * 31
      })
      location.reload()
    },
    isJumpEnabled (val) {
      this.$cookies.set('isJumpEnabled', val, {
        path: '/',
        maxAge: 60 * 60 * 24 * 31
      })
      location.reload()
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
    async getInviteKey () {
      if (this.$auth.$state.user.invite.code === null) {
        const resp = await this.$axios.get('/invites')
        if (resp.data.status === 200) {
          this.inviteKey = resp.data.data.code
        }
      } else {
        this.inviteKey = this.$auth.$state.user.invite.code
      }
    },
    popUpOneSignal () {
      console.log('<OneSignalPopup>')
      const self = this
      this.$OneSignal.push(() => {
        this.$OneSignal.isPushNotificationsEnabled().then(function (isEnabled) {
          if (isEnabled) {
            console.log('Push notifications are already enabled.')
            self.$OneSignal.getUserId().then(function (userId) {
              console.log('OneSignal User ID:', userId)
              self.registerOneSignal(userId)
            })
          } else {
            console.log('Push notifications are not enabled yet.')
            this.$OneSignal.on('subscriptionChange', function (isSubscribed) {
              if (isSubscribed) {
                self.$OneSignal.getUserId().then(function (userId) {
                  console.log('OneSignal User ID:', userId)
                  self.registerOneSignal(userId)
                })
              }
            })
            this.$OneSignal.showNativePrompt()
          }
        })
      })
    },
    async registerOneSignal (userId) {
      const resp = await this.$axios.post('/notify/setting/onesignal', { id: userId })
      if (resp.data.status === 200) {
        alert('ブラウザ通知の設定が完了しました')
        this.modalType = 0
      } else if (resp.data.status === 409) {
        alert('既に登録済みです')
        this.modalType = 0
      } else {
        alert('これ以上追加できません、初期化が必要です')
      }
    },
    async resetOneSignal () {
      const resp = await this.$axios.delete('/notify/setting/onesignal')
      if (resp.data.status === 200) {
        alert('ブラウザ通知の設定を初期化しました')
      }
    },
    changePassword () {
      alert('未実装です')
    },
    destroyAccount () {
      alert('未実装です')
    }
  },
  head () {
    return {
      title: 'マイページ'
    }
  }
  /*
  async fetch (context) {
    await context.store.dispatch('getNavigations')
  }
  */
}
</script>
