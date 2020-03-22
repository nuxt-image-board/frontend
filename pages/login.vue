<template>
<section class="section">
<div class="container">
    <div class="columns is-centered is-vcentered">
        <div class="column has-text-centered is-half">
            <img src="logo.png">
        </div>
        <div class="column is-half">
            <h3 class="title has-text-centered">ログインゲート</h3>
            <h3 class="subtitle has-text-centered">{{welcomeMsg}}</h3>
            <div class="field is-grouped is-grouped-centered">
              <p class="control">
                <a v-on:click="postLogin()" class="button is-success">
                  ログイン
                </a>
              </p>
              <p class="control">
                <a href="mailto:***REMOVED***" class="button is-primary">
                  サインアップ
                </a>
              </p>
            </div>
        </div>
    </div>
</div>
</section>
</template>

<script>
export default {
  async fetch (context) {
    await context.store.dispatch('getNavigationData')
  },
  computed: {
    welcomeMsg () {
      return this.entries[Math.floor(Math.random() * this.entries.length)]
    }
  },
  data () {
    return {
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
  methods: {
    async postLogin () {
      try {
        await this.$auth.loginWith('auth0')
      } catch (error) {
        console.log(error)
      }
    },
    fetch () {
      this.$store.dispatch('getNavigationData')
    }
  }
}
</script>
