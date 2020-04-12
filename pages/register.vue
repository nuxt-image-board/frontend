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
          <img src="logo.png">
        </div>
        <div class="column is-half">
          <div class="container has-text-centered is-vcentered">
            <h3 class="title has-text-centered">
              Register
            </h3>
            <h3 class="subtitle has-text-centered">
              {{ welcomeMsg }}
            </h3>
            <form class="box" onsubmit="return false">
              <div class="field">
                <div class="control has-icons-left">
                  <input
                    v-model="form.username"
                    type="text"
                    placeholder="表示名 (日本語可)"
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
                    type="text"
                    placeholder="ユーザーID"
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
                    type="password"
                    placeholder="パスワード"
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
                    type="password"
                    placeholder="パスワード (確認)"
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
                    type="text"
                    placeholder="招待コード"
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
                <button class="button is-block is-info is-medium is-fullwidth" @click="register">
                  登録 <Fas i="sign-in-alt" />
                </button>
              </div>
            </form>
            <p class="has-text-grey">
              <nuxt-link to="/login">
                Login
              </nuxt-link> &nbsp;·&nbsp;
              <a :href="CONTACT">Need Help?</a>
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

export default {
  auth: false,
  components: {
    Fas,
    Notification
  },
  asyncData (context) {
    const entries = [
      'ようこそ彩りが集約されし図書館、***REMOVED***へ',
      'ここから入らんとする者は一切の希望を放棄せよ',
      'ご注文はイラストですか?',
      '本当にしょうがない***REMOVED***さんです',
      '物語の続きを君と描こう',
      '「どこまでだって行くんだよ！」',
      '「夢とともに」',
      '僕らの明日はいつだってプロローグ',
      '何度でも塗り替える　本当の色に',
      '導きの灯りは心の中に',
      '旅立ちはいつだって君を待ってた',
      '心の向かうままに　走り出そう',
      'できるよきっとね　キミとなら',
      '明日へとあせらないでね',
      'ゆっくり遊ぼう',
      'なんとかなるさと上向いて',
      '簡単には教えないっ',
      'ふわふわどきどき内緒ですよ',
      '扉開けたとたん',
      '見知らぬ世界へと',
      'それがありえるかも',
      'ミルク色の異次元',
      '一緒なら素敵だーい!',
      'いたずら笑顔でぴょんぴょん',
      'いまから楽しい楽しいコトばかり',
      'わくわくしてきた?',
      '期待してるこんなにね',
      'キミは夢のなかだよと',
      '夢を 夢を 語ろうよ',
      'だからね楽しい楽しいキミになって',
      '誰に会いたいの？会いたいの？'
    ]
    const welcomeMsg = entries[Math.floor(Math.random() * entries.length)]
    return { welcomeMsg }
  },
  data () {
    return {
      notificationText: '',
      notificationClasses: 'is-success',
      notificationDeleted: true,
      notificationDeletable: true,
      form: {
        displayID: '',
        username: '',
        password: '',
        password_re: '',
        inviteCode: ''
      },
      isFormInvalid: false
    }
  },
  computed: {
    CONTACT () {
      return process.env.CONTACT
    }
  },
  methods: {
    async register () {
      const resp = await this.$axios.post('/accounts', this.form)
      const data = resp.data
      if (data.status === 201) {
        this.form.id = this.form.displayID
        await this.$auth.loginWith('local', { data: this.form })
        this.$router.push({ path: '/' })
      } else {
        this.notificationDeleted = false
        this.notificationClasses = 'is-danger'
        this.notificationText = '何かが違うみたいです!'
      }
    },
    deletedEvent () {
      this.notificationDeleted = true
    }
  }
}
</script>
