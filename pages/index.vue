<template>
  <section class="section">
    <div class="container is-wide">
      <div class="tile is-ancestor">
        <div class="tile is-vertical is-8">
          <div class="tile is-parent">
            <article class="tile is-child notification" style="background-color:#b2d8ff;">
              <p class="title">
                ***REMOVED***
              </p>
              <p class="subtitle">
                ***REMOVED***
              </p>
              <div class="content">
                α2 20/04/18 Build
              </div>
            </article>
          </div>
          <div class="tile">
            <div class="tile is-parent is-vertical">
              <article class="tile is-child notification" style="background-color:#d8b2ff;">
                <p class="title">
                  Danger
                </p>
                <div class="content">
                  <p>未完成のサイトです。表示崩れがバグが発生する可能性があります。何か気になることがあれば<a :href="CONTACT">問い合わせ等</a>より、ご連絡ください。</p>
                </div>
              </article>
              <article class="tile is-child notification" style="background-color: #ffffb2;">
                <p class="title">
                  Hitokoto
                </p>
                <div class="content">
                  <article class="media s-pulled-right">
                    <figure class="media-left">
                      <p class="image is-64x64">
                        <img src="https://profile.***REMOVED***">
                      </p>
                    </figure>
                    <div class="media-content">
                      <div class="content">
                        <p>
                          <strong>***REMOVED***</strong>
                          <br>
                          SQLインジェクションとかあったらつらい
                        </p>
                      </div>
                    </div>
                  </article>
                </div>
              </article>
            </div>
            <div class="tile is-parent">
              <article class="tile is-child notification" style="background-color: #b2ffd8;">
                <p class="title">
                  Recommend
                </p>
                <figure class="image is-4by3">
                  <a :href="RANDOM_ILLUST">
                    <img :src="RANDOM_ILLUST_SRC">
                  </a>
                </figure>
              </article>
            </div>
          </div>
        </div>
        <div class="tile is-parent">
          <article class="tile is-child notification" style="background-color:#ffd8b2;">
            <div class="content">
              <p class="title">
                News
              </p>
              <div class="content">
                <article class="message">
                  <div class="message-header">
                    <p>20/04/18 既知のバグ</p>
                  </div>
                  <div class="message-body">
                    リンク集ページのレイアウト崩れ 画像登録時の画像選択無視 画像登録時の記号エスケープ
                  </div>
                </article>
                <article class="message">
                  <div class="message-header">
                    <p>20/04/18 TODOリスト</p>
                  </div>
                  <div class="message-body">
                    不要なCSSをSCSSに変える 管理画面の実装 同意義タグをまとめて検索 画像グループの実装 アップロードキュー バグ修正 いいね音声を鳴らす トップページを完成させる 招待コードを発行可能に
                  </div>
                </article>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  async asyncData ({ $axios, $auth, params }) {
    const resp = await $axios.get('/search/random')
    let randomIllustID = 1
    if (resp.status === 200) {
      randomIllustID = resp.data.data.imgs[0].illustID
    }
    return {
      randomIllustID
    }
  },
  computed: {
    CONTACT () {
      return process.env.CONTACT
    },
    RANDOM_ILLUST_SRC () {
      return process.env.CDN_ENDPOINT + 'illusts/thumb/' + this.randomIllustID + '.webp'
    },
    RANDOM_ILLUST () {
      return 'arts/' + this.randomIllustID
    }
  }
}
</script>
