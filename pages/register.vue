<template>
  <section class="section">
    <div class="container">
      <div class="columns is-centered is-vcentered">
        <div class="column has-text-centered is-one-third-touch is-half-desktop has-image-centered">
          <img src="logo.png">
        </div>
        <div class="column is-half">
          <div class="container has-text-centered is-vcentered">
            <h3 class="title has-text-centered">
              Sign Up
            </h3>
            <h3 class="subtitle has-text-centered">
              {{ welcomeMsg }}
            </h3>
            <form class="box">
              <div class="field">
                <div class="control has-icons-left">
                  <input
                    v-model="id"
                    type="text"
                    placeholder="Your userID"
                    pattern="[a-zA-Z0-9]+"
                    class="input"
                    required
                  >
                  <span class="icon is-small is-left">
                    <i class="fas fa-id-card" />
                  </span>
                </div>
              </div>
              <div class="field">
                <div class="control has-icons-left">
                  <input
                    v-model="password"
                    type="password"
                    placeholder="Your password"
                    pattern="[a-zA-Z0-9]+"
                    class="input"
                    required
                  >
                  <span class="icon is-small is-left">
                    <i class="fa fa-lock" />
                  </span>
                </div>
              </div>
              <div class="field">
                <div class="control has-icons-left">
                  <input
                    id="confirmPW"
                    v-model="password_re"
                    type="password"
                    placeholder="Your password (Re)"
                    class="input"
                    required
                  >
                  <span class="icon is-small is-left">
                    <i class="fa fa-lock" />
                  </span>
                </div>
              </div>
              <div class="field">
                <div class="control has-icons-left">
                  <input
                    v-model="code"
                    type="text"
                    placeholder="Invite code"
                    pattern="[a-zA-Z0-9]+"
                    class="input"
                    required
                  >
                  <span class="icon is-small is-left">
                    <i class="fas fa-ticket-alt" />
                  </span>
                </div>
              </div>
              <h5>Alphabet and numbers are allowed.</h5>
              <div class="field">
                <button type="submit" :disabled="isFormInvalid" class="button is-block is-info is-medium is-fullwidth" @click="signup">
                  Sign up <i class="fas fa-sign-in-alt" />
                </button>
              </div>
            </form>
            <p class="has-text-grey">
              <a href="http://localhost:3000/login">Login</a> &nbsp;·&nbsp;
              <a href="mailto:***REMOVED***">Need Help?</a>
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
export default {
  auth: false,
  data () {
    return {
      welcomeMsg: '　',
      id: '',
      password: '',
      password_re: '',
      code: '',
      isFormInvalid: true,
      entries: [
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
        '明日へとあせらないでね　ゆっくり遊ぼう(よろしくね)',
        'なんとかなるさと上向いて',
        '簡単には教えないっ',
        'ふわふわどきどき内緒ですよ',
        '扉開けたとたん　見知らぬ世界へと',
        'それがありえるかも　ミルク色の異次元',
        '一緒なら素敵だーい!',
        'いたずら笑顔でぴょんぴょん',
        'いまから楽しい楽しいコトばかり',
        'わくわくしてきた? 期待してるこんなにね',
        '(キミは夢のなかだよと)',
        '夢を 夢を 語ろうよ',
        'だからね楽しい楽しいキミになって',
        '誰に会いたいの？会いたいの？',
        'みんなはこんな時どうする　(聞いてみる)'
      ]
    }
  },
  watch: {
    password () {
      if (this.password !== this.password_re || this.password === '') {
        this.isFormInvalid = true
      } else {
        this.isFormInvalid = false
      }
    },
    password_re () {
      if (this.password !== this.password_re || this.password_re === '') {
        this.isFormInvalid = true
      } else {
        this.isFormInvalid = false
      }
    }
  },
  created () {
    if (process.client) {
      this.welcomeMsg = this.entries[Math.floor(Math.random() * this.entries.length)]
    }
  },
  methods: {
    signup () {
      // pass
    }
  }
}
</script>
