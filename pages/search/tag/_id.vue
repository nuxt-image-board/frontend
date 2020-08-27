<template>
  <List
    :api-endpoint="apiEndpoint"
    :result-count="resultCount"
    :page-title="pageTitle"
    :tab-title="tabTitle"
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
    const baseTitle = 'tag'
    const apiEndpoint = '/search/tag'
    const pageID = isFinite(route.query.page) ? parseInt(route.query.page) : 1
    const sortID = isFinite(route.query.sort) ? parseInt(route.query.sort) : 0
    const targetID = isFinite(route.params.id) ? parseInt(route.params.id) : 1
    const resp = await $searchApi.getSearchResults(apiEndpoint, pageID, sortID, targetID)
    console.log(resp)
    if (!resp) {
      error({ statusCode: 404 })
    }
    return {
      apiEndpoint,
      pageID,
      sortID,
      targetID,
      tabTitle: resp.title,
      pageTitle: baseTitle,
      resultCount: resp.count,
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
