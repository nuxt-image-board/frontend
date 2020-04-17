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
  async asyncData ({ $axios, route }) {
    const endpoint = '/catalog/artists'
    const page = isFinite(route.query.page) ? parseInt(route.query.page) : 1
    const sortNum = isFinite(route.query.sort) ? parseInt(route.query.sort) : 0
    const order = [0, 2, 4].includes(sortNum) ? 'd' : 'a'
    const sort = (sortNum <= 1) ? 'd'
      : (sortNum <= 3) ? 'c'
        : 'l'
    const params = { sort, order, page }
    const response = await $axios.get(endpoint, { params })
    const data = response.data.data
    return {
      endpoint,
      NotificationTitle: '作者名から検索',
      results: data,
      SelectedPage: page,
      totalPage: data.pages,
      pageType: 'artist',
      SelectedSort: sortNum,
      isSearchPage: false
    }
  }
}
</script>
