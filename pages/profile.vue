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
              内部ID: {{ $auth.$state.user.userID }}
            </p>
            <p class="panel-block">
              表示ID: {{ $auth.$state.user.displayID }}
            </p>
            <p class="panel-block">
              登録日: {{ $auth.$state.user.registeredDate }}
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
        <div class="column is-4 is-vcentered has-text-centered is-hidden">
          <nav class="panel">
            <p class="panel-heading has-text-dark has-background-rize">
              通知設定
            </p>
            <nuxt-link to="/upload" class="panel-block">
              <span class="panel-icon">
                <i class="fas fa-book" aria-hidden="true" />
              </span>
              通知する
            </nuxt-link>
            <nuxt-link to="/bookmark" class="panel-block">
              <span class="panel-icon">
                <i class="fas fa-book" aria-hidden="true" />
              </span>
              通知内容
            </nuxt-link>
            <a :href="CONTACT" class="panel-block">
              <span class="panel-icon">
                <i class="fas fa-book" aria-hidden="true" />
              </span>
              ブラウザ通知
            </a>
            <a to="/guide" class="panel-block">
              <span class="panel-icon">
                <i class="fas fa-book" aria-hidden="true" />
              </span>
              LINE通知(未実装)
            </a>
          </nav>
        </div>
      </div>
      <div class="column is-12">
        <button class="button is-warning" @click="modalType = 5">
          キャッシュ消去
        </button>
        <Modal title="キャッシュ消去" :isModalOpen="modalType === 5" @modal-closed="modalType = 0">
          <h2 class="has-text-centered">
            キャッシュを消去しますか?
          </h2>
          <p class="subtitle has-text-centered" style="word-break:break-all">
            <button class="button is-danger is-large" @click="clearCache">
              はい
            </button>
          </p>
          <p>
            キャッシュを消去すると、ストレージが一時的に空きますが、
            <b>
              キャッシュの再ダウンロードが発生し、表示に時間がかかるようになります。
              今どうしても容量がない場合、またはなんらかの不具合が発生した場合にのみ
            </b>
            ご利用ください。
          </p>
        </Modal>
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
    IS_INVITE_ENABLED () {
      return this.$auth.$state.user.invite.enabled ? '可' : '否'
    }
  },
  watch: {
    acceptR18 (val) {
      this.$cookies.set('acceptR18', val, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7
      })
    },
    useWebP (val) {
      this.$cookies.set('useWebP', val, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7
      })
    },
    isLeftHanded (val) {
      this.$cookies.set('isLeftHanded', val, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7
      })
      location.reload()
    },
    isPC (val) {
      this.$cookies.set('isPC', val, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7
      })
      location.reload()
    },
    isJumpEnabled (val) {
      this.$cookies.set('isJumpEnabled', val, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7
      })
      location.reload()
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
    changePassword () {
      alert('未実装です')
    },
    destroyAccount () {
      alert('未実装です')
    },
    clearCache () {
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
