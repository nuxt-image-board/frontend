<template>
   <div>
      <main>
         <section class="section">
            <div class="container is-widescreen has-text-centered error-screen">
               <div class="notification is-danger">
                  <p class="title is-1">{{error.statusCode}}</p>
                  <p class="subtitle is-3" v-if="error.statusCode === 404">{{error404Msg}}</p>
                  <p class="subtitle is-3" v-else-if="error.statusCode === 401">認証に失敗しました</p>
                  <p class="subtitle is-3" v-else-if="error.statusCode === 500">{{error500Msg}}</p>
                  <p class="subtitle is-3" v-else>エラーが発生しました</p>
               </div>
               <img class="error-img" src="~/static/error.jpg">
               <nuxt-link class="button is-primary is-large is-fullwidth" to="/">トップページへ</nuxt-link>
            </div>
         </section>
      </main>
  </div>
</template>

<script>
export default {
  props: ['error'],
  computed: {
    error500Msg () {
      return this.error500[Math.floor(Math.random() * this.error500.length)]
    },
    error404Msg () {
      return this.error404[Math.floor(Math.random() * this.error404.length)]
    }
  },
  data () {
    return {
      error500: [
        'サーバーに味噌汁をこぼしてしまいました',
        'サーバーが爆発しました',
        'ちくしょう！だいなしにしやがった！お前はいつもそうだ。このエラーはお前の人生そのものだ。お前はいつも失敗ばかりだ。お前はいろんなことに手を付けるが、ひとつだってやり遂げられない。誰もお前を愛さない。',
        '₍₍⁽⁽💻₎₎⁾⁾　見て！サーバーが踊っているよ　かわいいね　🔥　みんなが想定外のことばかりするので、サーバーは燃えてしまいました お前らのせいです あ〜あ',
        'サーバーがストライキしました',
        'コードが不適切であることが判明しました',
        'サーバーはお亡くなりになりました'
      ],
      error404: [
        'ファイル名が違うかアドレスが違うかそもそも存在しないっぽいです',
        'そのファイルは失われてしまったようです',
        'ファイルを入れ忘れちゃったっぽいです',
        'そのファイルは***REMOVED***に存在しません'
      ]
    }
  }
}
</script>

<style>
.error-screen {
  text-align: center;
}
.error-img {
  max-width: 100%;
  height: auto;
  max-height: 50vh;
}
</style>
