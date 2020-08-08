<template>
  <List
    :endpoint="endpoint"
    :notification-title="NotificationTitle"
    :results-from-props="results"
    :selected-page-from-props="SelectedPage"
    :total-page="totalPage"
    :is-search-page="isSearchPage"
    :page-type="pageType"
    :selected-sort-from-props="SelectedSort"
  />
</template>

<script>
import List from '~/components/page/List.vue'

export default {
  components: {
    List
  },
  async asyncData ({ $axios, route, error }) {
    const endpoint = '/catalog/uploaders'
    const page = isFinite(route.query.page) ? parseInt(route.query.page) : 1
    const sortNum = isFinite(route.query.sort) ? parseInt(route.query.sort) : 0
    const order = [0, 2, 4, 6].includes(sortNum) ? 'd' : 'a'
    const sort = (sortNum <= 1) ? 'd'
      : (sortNum <= 3) ? 'c'
        : (sortNum <= 5) ? 'l'
          : 'n'
    const params = { sort, order, page }
    const response = await $axios.get(endpoint, { params, useCache: process.client })
    if (response.data.status !== 200) {
      return error({ statusCode: 404, message: 'err' })
    }
    const data = response.data.data
    return {
      endpoint,
      NotificationTitle: '投稿者から検索',
      results: data.contents,
      SelectedPage: page,
      totalPage: data.pages,
      pageType: 'uploader',
      SelectedSort: sortNum,
      isSearchPage: false
    }
  },
  head () {
    return {
      title: '投稿者から検索'
    }
  }
}
</script>
