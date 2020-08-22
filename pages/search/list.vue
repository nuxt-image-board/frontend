<template>
  <List
    :api-endpoint="apiEndpoint"
    :page-title="pageTitle"
    :page-id-from-props="pageID"
    :sort-id-from-props="sortID"
    :results-from-props="results"
    :target-id="targetID"
    :total-page-from-props="totalPage"
  />
</template>

<script>
import List from '@/components/page/search/SearchScreen.vue'

export default {
  components: {
    List
  },
  async asyncData ({ $searchApi, $axios, $auth, route, error }) {
    const baseTitle = '一覧から検索'
    const apiEndpoint = '/search/all'
    const pageID = isFinite(route.query.page) ? parseInt(route.query.page) : 1
    const sortID = isFinite(route.query.sort) ? parseInt(route.query.sort) : 0
    const targetID = 0
    const resp = await $searchApi.getSearchResults(apiEndpoint, pageID, sortID, targetID)
    if (!resp) {
      error({ statusCode: 404 })
    }
    return {
      apiEndpoint,
      pageID,
      sortID,
      targetID,
      tabTitle: resp.title,
      pageTitle: `${baseTitle} (${resp.count}件)`,
      results: resp.imgs,
      totalPage: resp.pages
    }
  },
  head () {
    return {
      title: this.tabTitle
    }
  }
}
</script>
