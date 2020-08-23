<template>
  <List
    :api-endpoint="apiEndpoint"
    :page-title="pageTitle"
    :page-id-from-props="pageID"
    :sort-id-from-props="sortID"
    :keyword="$route.params.query"
    :results-from-props="results"
    :total-page-from-props="totalPage"
  />
</template>

<script>
import List from '@/components/page/search/KeywordSearchScreen.vue'

export default {
  components: {
    List
  },
  async asyncData ({ $axios, $searchApi, route, redirect, error }) {
    const baseTitle = 'キーワードから検索'
    const apiEndpoint = '/search/keyword'
    const pageID = isFinite(route.query.page) ? parseInt(route.query.page) : 1
    const sortID = isFinite(route.query.sort) ? parseInt(route.query.sort) : 0
    const keyword = route.params.query ? route.params.query : ''
    if (!keyword) {
      redirect('/search_form/keyword')
    }
    const resp = await $searchApi.getKeywordSearchResults(apiEndpoint, pageID, sortID, keyword)
    if (!resp) {
      if (process.server) {
        error({ statusCode: 404 })
      } else {
        redirect('/search_form/keyword?e=1')
      }
    }
    return {
      apiEndpoint,
      pageID,
      sortID,
      keyword,
      tabTitle: resp.title,
      pageTitle: `${baseTitle} ${resp.title} (${resp.count}件)`,
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
