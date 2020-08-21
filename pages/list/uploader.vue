<template>
  <List
    :api-endpoint="apiEndpoint"
    :page-endpoint="pageEndpoint"
    :page-title="pageTitle"
    :page-id-from-props="pageID"
    :sort-id-from-props="sortID"
    :results-from-props="results"
    :total-page-from-props="totalPage"
  />
</template>

<script>
import List from '@/components/page/list/ListScreen.vue'

export default {
  components: {
    List
  },
  async asyncData ({ $searchApi, $axios, route, error }) {
    const pageTitle = '投稿者から検索'
    const pageEndpoint = 'uploader'
    const apiEndpoint = '/catalog/uploaders'
    const pageID = isFinite(route.query.page) ? parseInt(route.query.page) : 1
    const sortID = isFinite(route.query.sort) ? parseInt(route.query.sort) : 0
    const keyword = route.query.keyword
    const resp = await $searchApi.getListResults(apiEndpoint, pageID, sortID, keyword)
    return {
      apiEndpoint,
      pageEndpoint,
      pageTitle,
      pageID,
      sortID,
      results: resp.contents,
      totalPage: resp.pages
    }
  },
  head () {
    return {
      title: this.pageTitle
    }
  }
}
</script>
