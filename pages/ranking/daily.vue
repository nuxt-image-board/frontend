<template>
  <section class="section">
    <RankingScreen
      :pageTitle="pageTitle"
      :apiEndpoint="apiEndpoint"
      :pageIdFromProps="pageID"
      :sortIdFromProps="sortID"
      :totalPageFromProp="totalPage"
      :resultsFromProps="results"
    />
  </section>
</template>

<script>
import RankingScreen from '@/components/page/ranking/RankingScreen.vue'

export default {
  components: {
    RankingScreen
  },
  async asyncData ({ $searchApi, $axios, $auth, route, error }) {
    const apiEndpoint = '/ranking/daily'
    const pageID = isFinite(route.query.page) ? parseInt(route.query.page) : 1
    const sortID = isFinite(route.query.sort) ? parseInt(route.query.sort) : 0
    const resp = await $searchApi.getRankingResults(apiEndpoint, pageID, sortID)
    return {
      apiEndpoint,
      pageID,
      sortID,
      totalPage: resp.pages,
      results: resp.imgs
    }
  },
  data () {
    return {
      pageTitle: '日間ランキング'
    }
  },
  head () {
    return {
      title: this.pageTitle
    }
  }
}
</script>
