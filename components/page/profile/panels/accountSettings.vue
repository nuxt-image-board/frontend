<template>
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
        アカウントを変えた場合は上記ボタンから再連携することができます。LINE連携では、公式に提供しているLINEログインを使用します。
        このログインでは、識別ID(事業者別ユーザーID)の取得を行います。メッセージを勝手に送信することはありません。
        ***REMOVED***の連携に関する技術的詳細は
        <a
          href="https://qiita.com/TakahikoKawasaki/items/498ca08bbfcc341691fe"
          target="_blank"
          rel="nofollow noopener noreferrer"
        >
          OpenID Connectの説明
        </a>
        を一読ください。
      </p>
    </Modal>
    <a class="panel-block" @click="modalType = 3">
      <span class="panel-icon">
        <i class="fas fa-book" aria-hidden="true" />
      </span>
      パスワード変更
    </a>
    <Modal title="パスワード変更" :isModalOpen="modalType === 3" @modal-closed="modalType = 0">
      <form id="changePW" @submit.prevent="changePassword">
        <input id="userName" class="is-hidden" name="username" autocomplete="username" value="">
        <p class="has-text-centered">
          現在のパスワード
          <input
            v-model="passwordForm.old"
            minlength="5"
            maxlength="50"
            class="input"
            type="password"
            placeholder="5文字以上50文字以下の英数字"
            autocomplete="current-password"
            required
          >
        </p>
        <p class="has-text-centered">
          新しいパスワード
          <input
            v-model="passwordForm.new"
            minlength="5"
            maxlength="50"
            class="input"
            type="password"
            placeholder="5文字以上50文字以下の英数字"
            autocomplete="new-password"
            required
          >
        </p>
        <p class="has-text-centered">
          新しいパスワード(再入力)
          <input
            v-model="passwordForm.re"
            minlength="5"
            maxlength="50"
            class="input"
            type="password"
            placeholder="5文字以上50文字以下の英数字"
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
    <nuxt-link class="panel-block" to="/logout">
      <span class="panel-icon">
        <i class="fas fa-book" aria-hidden="true" />
      </span>
      ログアウト
    </nuxt-link>
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
