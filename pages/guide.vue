<template>
  <section class="section">
    <div class="container is-widescreen">
      <h1 class="title has-text-centered">
        利用ガイド
      </h1>
      <Accordion
        title="今できることと今後の予定"
        text="公開してほしいと言う人が何人か居たので<b>とりあえず公開してみる</b>ことにしました。<b>今できることはTwitter/Pixivからの画像登録とその表示</b>、のみです。個人的にはまだ不足してる要素が大量にあるので(画像検索と画像重複検知、登録データ編集UIがないのが個人的に非常に致命的。)<b>今後作品の再登録/削除などが発生する可能性</b>は大いにあります。あと荒らし、もしくはルールとか何も読まない人は必ず居るので、どう対策すべきかを考えています。それといいね回数無制限なら1日連打とかされたらレイアウトが大変なことにとかいう問題も... あとAPIコールあんまり叩かれたらサーバー負荷が... 見るだけなら問題ないと思いますが、<b>何か変なことやりたいならまず呼んでください。</b><b>未完成でもアクセスログはポリシー通りに取れています</b>以上です。"
      />
      <Accordion
        title="ユーザーページの見方"
        text="<img src='http://***REMOVED***:3000/guide/user.png'><img src='http://***REMOVED***:3000/guide/user2.png'>"
      />
      <Accordion
        title="検索結果の見方"
        text="<img src='http://***REMOVED***:3000/guide/search.png'>"
      />
      <Accordion
        title="作品ページの見方"
        text="<img src='http://***REMOVED***:3000/guide/art.png'>"
      />
      <Accordion
        title="登録ページの見方"
        text="<img src='http://***REMOVED***:3000/guide/scrape.png'>"
      />
    </div>
  </section>
</template>

<script>
import Accordion from '~/components/ui/Accordion.vue'

export default {
  components: {
    Accordion
  }
}
</script>
