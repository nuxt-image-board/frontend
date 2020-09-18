<template>
  <section class="section">
    <RankingScreen :pageTitle="pageTitle" />
  </section>
</template>

<script>
import RankingScreen from '@/components/page/ranking/RankingScreen.vue'

export default {
  components: {
    RankingScreen
  },
  data () {
    return {
      pageTitle: '月間ランキング'
    }
  },
  head () {
    return {
      title: this.pageTitle
    }
  }
}
</script>
