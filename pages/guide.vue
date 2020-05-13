<template>
  <section class="section">
    <div class="container is-widescreen">
      <h1 class="title has-text-centered">
        利用ガイド
      </h1>
      <Accordion
        title="ユーザーページの見方"
        text="<img src='https://***REMOVED***/guide/user.png'><img src='https://***REMOVED***/guide/user2.png'>"
      />
      <Accordion
        title="検索結果の見方"
        text="<img src='https://***REMOVED***/guide/search.png'>"
      />
      <Accordion
        title="作品ページの見方"
        text="<img src='https://***REMOVED***/guide/art.png'>"
      />
      <Accordion
        title="登録ページの見方"
        text="<img src='https://***REMOVED***/guide/scrape.png'>"
      />
    </div>
  </section>
</template>

<script>
import Accordion from '~/components/ui/Accordion.vue'

export default {
  components: {
    Accordion
  },
  head () {
    return {
      title: '利用ガイド'
    }
  }
}
</script>
