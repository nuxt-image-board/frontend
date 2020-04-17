<template>
  <List
    :endpoint="endpoint"
    :notification-title="NotificationTitle"
    :results-from-props="results"
    :selected-page-from-props="SelectedPage"
    :total-page="totalPage"
    :is-search-page="isSearchPage"
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
    const endpoint = '/search/artist'
    const id = isFinite(route.params.id) ? parseInt(route.params.id) : 1
    const page = isFinite(route.query.page) ? parseInt(route.query.page) : 1
    const sortNum = isFinite(route.query.sort) ? parseInt(route.query.sort) : 0
    const order = [0, 2, 4].includes(sortNum) ? 'd' : 'a'
    const sort = (sortNum <= 1) ? 'd'
      : (sortNum <= 3) ? 'c'
        : 'l'
    const params = { sort, order, page, id }
    const response = await $axios.get(endpoint, { params })
    const data = response.data.data
    return {
      endpoint,
      NotificationTitle: '作者さんから検索 ' + data.title + ' ' + data.count + '件',
      results: data.imgs,
      SelectedPage: page,
      totalPage: data.pages,
      SelectedSort: sortNum,
      isSearchPage: true
    }
  }
}
</script>
