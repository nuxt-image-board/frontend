<template>
  <List
    :api-endpoint="apiEndpoint"
    :page-title="pageTitle"
    :page-id-from-props="pageID"
    :sort-id-from-props="sortID"
    :target-id="targetID"
    :results-from-props="results"
    :total-page-from-props="totalPage"
  />
</template>

<script>
import List from '@/components/page/search/MultipleSearchScreen.vue'

export default {
  components: {
    List
  },
  async asyncData ({ $axios, $searchApi, route, redirect, error }) {
    const baseTitle = '複合タグから検索'
    const apiEndpoint = '/search/multiple/tag'
    const pageID = isFinite(route.query.page) ? parseInt(route.query.page) : 1
    const sortID = isFinite(route.query.sort) ? parseInt(route.query.sort) : 0
    const targetID = route.query.query ? route.query.query : ''
    if (!targetID) {
      redirect('/search_form/multiple/tag')
    }
    const resp = await $searchApi.getMultipleSearchResults(apiEndpoint, pageID, sortID, targetID)
    if (!resp) {
      if (process.server) {
        error({ statusCode: 404 })
      } else {
        redirect('/search_form/multiple/tag?e=1')
      }
    }
    return {
      apiEndpoint,
      pageID,
      sortID,
      targetID,
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
