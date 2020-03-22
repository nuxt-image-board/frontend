<template>
<List
:endpoint="endpoint"
:NotificationTitle="NotificationTitle"
:resultsFromProps="results"
:SelectedPageFromProps="SelectedPage"
:totalPage="totalPage"
:SelectedSortFromProps="SelectedSort" />
</template>

<script>
import List from '~/components/page/list/List.vue'

export default {
  components: {
    List
  },
  async asyncData ({ $axios, route }) {
    const endpoint = '/catalog/characters'
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
      NotificationTitle: 'キャラクターから検索',
      results: data,
      SelectedPage: page,
      totalPage: data.pages,
      SelectedSort: sortNum
    }
  },
  async fetch (context) {
    await context.store.dispatch('getNavigationData')
  }
}
</script>
