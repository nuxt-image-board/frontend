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
              参加日: 2020-04-17
            </p>
          </nav>
        </div>
        <div class="column is-4 is-centered">
          <nav class="panel">
            <p class="panel-heading has-text-dark has-background-cocoa">
              招待情報
            </p>
            <p class="panel-block">
              招待者: Nobody
            </p>
            <p class="panel-block">
              招待数: 0
            </p>
            <p class="panel-block">
              招待可否: 否
            </p>
            <p class="panel-block">
              <button class="button is-link is-outlined is-fullwidth" @click="isInviteModalOpen = !isInviteModalOpen">
                招待作成
              </button>
            </p>
          </nav>
        </div>
      </div>
      <div class="columns is-vcentered is-centered">
        <div class="column is-4 is-vcentered has-text-centered has-image-centered">
          <nav class="panel">
            <p class="panel-heading has-text-dark has-background-chiya">
              ユーザー設定
            </p>
            <table class="table is-fullwidth centered-table">
              <tbody>
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
                <tr>
                  <td>上に戻るボタン表示</td>
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
              </tbody>
            </table>
          </nav>
        </div>
        <div class="column is-4 is-vcentered has-text-centered">
          <nav class="panel">
            <p class="panel-heading has-text-dark has-background-syaro">
              アカウント設定
            </p>
            <a class="panel-block" @click="isLineModalOpen = !isLineModalOpen">
              <span class="panel-icon">
                <i class="fas fa-book" aria-hidden="true" />
              </span>
              LINE連携
            </a>
            <a class="panel-block" @click="isPassModalOpen = !isPassModalOpen">
              <span class="panel-icon">
                <i class="fas fa-book" aria-hidden="true" />
              </span>
              パスワード変更
            </a>
            <a class="panel-block" @click="isModalOpen = !isModalOpen">
              <span class="panel-icon">
                <i class="fas fa-book" aria-hidden="true" />
              </span>
              APIキー確認
            </a>
            <a class="panel-block" @click="logout">
              <span class="panel-icon">
                <i class="fas fa-book" aria-hidden="true" />
              </span>
              ログアウト
            </a>
          </nav>
        </div>
        <div class="column is-4 is-vcentered has-text-centered">
          <nav class="panel">
            <p class="panel-heading has-text-dark has-background-rize">
              その他
            </p>
            <nuxt-link to="/upload" class="panel-block">
              <span class="panel-icon">
                <i class="fas fa-book" aria-hidden="true" />
              </span>
              イラスト投稿
            </nuxt-link>
            <a href="/404" class="panel-block">
              <span class="panel-icon">
                <i class="fas fa-book" aria-hidden="true" />
              </span>
              ブックマーク
            </a>
            <nuxt-link to="/guide" class="panel-block">
              <span class="panel-icon">
                <i class="fas fa-book" aria-hidden="true" />
              </span>
              利用ガイド
            </nuxt-link>
            <a :href="CONTACT" class="panel-block">
              <span class="panel-icon">
                <i class="fas fa-book" aria-hidden="true" />
              </span>
              お問い合わせ
            </a>
          </nav>
        </div>
      </div>
      <button class="button is-danger" @click="isDeleModalOpen = !isDeleModalOpen">
        退会する
      </button>
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
    <div class="modal" :class="{'is-active': isInviteModalOpen}">
      <div class="modal-background" @click="isInviteModalOpen = !isInviteModalOpen" />
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">
            招待
          </p>
          <button class="delete" aria-label="close" @click="isInviteModalOpen = !isInviteModalOpen" />
        </header>
        <section class="modal-card-body">
          <div class="content">
            <h2 class="has-text-centered">
              あなたの招待コード
            </h2>
            <p class="subtitle has-text-centered" style="word-break:break-all">
              (INVITE_IS_DISABLED_FOR_NOW)
            </p>
            <p>
              この招待コードを他の人に伝えることで***REMOVED***に新規登録してもらうことができます。
            </p>
            <p>
              <b>
                ただし、このコードを使い招待された人がなんらかの理由でBANされた場合、あなたにも罰則が付きます。
                つまり、あなたがそのユーザーの保証人になります。信頼できる人のみを招待してください。
              </b>
            </p>
          </div>
        </section>
      </div>
    </div>
    <div class="modal" :class="{'is-active': isPassModalOpen}">
      <div class="modal-background" @click="isPassModalOpen = !isPassModalOpen" />
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">
            パスワード変更
          </p>
          <button class="delete" aria-label="close" @click="isPassModalOpen = !isPassModalOpen" />
        </header>
        <section class="modal-card-body">
          <div class="content">
            <p class="has-text-centered">
              現在のパスワード
              <input v-model="old_password" class="input" type="password">
            </p>
            <p class="has-text-centered">
              新しいパスワード
              <input v-model="new_password" class="input" type="password">
            </p>
            <p class="has-text-centered">
              新しいパスワード(再入力)
              <input v-model="new_password_re" class="input" type="password">
            </p>
            <p class="has-text-centered">
              <button class="button is-primary" @click="changePassword">
                変更
              </button>
            </p>
          </div>
        </section>
      </div>
    </div>
    <div class="modal" :class="{'is-active': isLineModalOpen}">
      <div class="modal-background" @click="isLineModalOpen = !isLineModalOpen" />
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">
            LINE連携
          </p>
          <button class="delete" aria-label="close" @click="isLineModalOpen = !isLineModalOpen" />
        </header>
        <section class="modal-card-body">
          <div class="content">
            <h2 class="has-text-centered">
              連携状態: ?
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
          </div>
        </section>
      </div>
    </div>
    <div class="modal" :class="{'is-active': isDeleModalOpen}">
      <div class="modal-background" @click="isDeleModalOpen = !isDeleModalOpen; deleteStep = 0" />
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">
            退会
          </p>
          <button class="delete" aria-label="close" @click="isDeleModalOpen = !isDeleModalOpen; deleteStep = 0" />
        </header>
        <section class="modal-card-body">
          <div class="content">
            <h2 v-if="deleteStep == 0" class="has-text-centered">
              本当に退会してよろしいですか?
            </h2>
            <h2 v-if="deleteStep == 1" class="has-text-centered">
              本当にいいですね?
            </h2>
            <h2 v-if="deleteStep == 2" class="has-text-centered">
              後悔しませんね?
            </h2>
            <h2 v-if="deleteStep == 3" class="has-text-centered">
              最終確認: アカウントを削除して退会します
            </h2>
            <p class="subtitle has-text-centered" style="word-break:break-all">
              <button v-if="deleteStep == 0" class="button is-danger is-large" @click="deleteStep+=1">
                よろしいです
              </button>
              <button v-if="deleteStep == 1" class="button is-danger is-large" @click="deleteStep+=1">
                本当にいい
              </button>
              <button v-if="deleteStep == 2" class="button is-danger is-large" @click="deleteStep+=1">
                後悔しない
              </button>
              <button v-if="deleteStep == 3" class="button is-danger is-large" @click="deleteProcess">
                退会する
              </button>
            </p>
            <p>
              退会しても登録したイラストは残ります。
              再度***REMOVED***を利用するには新たに招待コードを受け取る必要があります。
            </p>
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
      old_password: '',
      new_password: '',
      new_password_re: '',
      deleteStep: 0,
      isModalOpen: false,
      isPassModalOpen: false,
      isInviteModalOpen: false,
      isLineModalOpen: false,
      isDeleModalOpen: false,
      acceptR18: this.$cookies.get('acceptR18'),
      isPC: this.$cookies.get('isPC'),
      isJumpEnabled: this.$cookies.get('isJumpEnabled')
    }
  },
  computed: {
    CONTACT () {
      return process.env.CONTACT
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
    async logout () {
      try {
        await this.$auth.logout()
      } catch (error) {
        this.$router.push({ path: '/login' })
      }
    },
    changePassword () {
      alert('未実装です')
    },
    deleteProcess () {
      alert('未実装です')
    }
  }
  /*
  async fetch (context) {
    await context.store.dispatch('getNavigations')
  }
  */
}
</script>
