<template>
  <div>
    <main>
      <section class="section">
        <div class="container is-widescreen has-text-centered error-screen">
          <div class="notification is-danger">
            <p class="title is-1">
              {{ error.statusCode }}
            </p>
            <p v-if="error.statusCode === 404" class="subtitle is-3">
              {{ error404Msg }}
            </p>
            <p v-else-if="error.statusCode === 401" class="subtitle is-3">
              認証に失敗しました
            </p>
            <p v-else-if="error.statusCode === 500" class="subtitle is-3">
              {{ error500Msg }}
            </p>
            <p v-else-if="error.statusCode === 502" class="subtitle is-3">
              {{ error502Msg }}
            </p>
            <p v-else class="subtitle is-3">
              エラーが発生しました
            </p>
          </div>
          <img class="error-img" src="~/static/error.jpg">
          <nuxt-link class="button is-primary is-large is-fullwidth" to="/">
            トップページへ
          </nuxt-link>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: () => {
        return {
          statusCode: 200
        }
      }
    }
  },
  data () {
    return {
      error404Msg: '',
      error404: [
        'ファイル名が違うかアドレスが違うかそもそも存在しないっぽいです',
        'そのファイルは失われてしまったようです',
        'ファイルを入れ忘れちゃったっぽいです',
        'そのファイルは***REMOVED***に存在しません',
        'そんなものはない'
      ],
      error500Msg: '',
      error500: [
        'サーバーに味噌汁をこぼしてしまいました',
        'サーバーが爆発しました',
        'ちくしょう！だいなしにしやがった！お前はいつもそうだ。このエラーはお前の人生そのものだ。お前はいつも失敗ばかりだ。お前はいろんなことに手を付けるが、ひとつだってやり遂げられない。誰もお前を愛さない。',
        '₍₍⁽⁽💻₎₎⁾⁾　見て！サーバーが踊っているよ　かわいいね　🔥　みんなが想定外のことばかりするので、サーバーは燃えてしまいました お前らのせいです あ〜あ',
        'サーバーがストライキしました',
        'コードが不適切であることが判明しました',
        'サーバーはお亡くなりになりました'
      ],
      error502Msg: '',
      error502: [
        'サイト以外のどっかが応答してくれなかったみたいです',
        'サイトは悪くない、裏方が悪い',
        'バックエンドサーバが死んだっぽいです',
        '裏方の処理がなんか失敗したみたいです',
        '裏方のサーバーが息してないみたいです',
        '相方が寝てるので仕事できません'
      ]
    }
  },
  created () {
    if (process.client) {
      this.error404Msg = this.error404[Math.floor(Math.random() * this.error404.length)]
      this.error500Msg = this.error500[Math.floor(Math.random() * this.error500.length)]
      this.error502Msg = this.error502[Math.floor(Math.random() * this.error502.length)]
    }
  },
  head () {
    return {
      title: 'エラー'
    }
  }
}
</script>

<style>
.error-screen {
  text-align: center;
  min-height: 90vh;
}
.error-img {
  max-width: 100%;
  height: auto;
  max-height: 50vh;
}
</style>
