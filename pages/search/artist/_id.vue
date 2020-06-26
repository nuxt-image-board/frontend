<template>
  <List
    :endpoint="endpoint"
    :notification-title="NotificationTitle"
    :results-from-props="results"
    :mylist-registered="mylistRegistered"
    :selected-page-from-props="SelectedPage"
    :total-page="totalPage"
    :is-search-page="isSearchPage"
    :selected-sort-from-props="SelectedSort"
    :notify-title="pageTitle"
  />
</template>

<script>
import List from '~/components/page/List.vue'

export default {
  components: {
    List
  },
  async asyncData ({ $axios, $auth, route, error }) {
    const endpoint = '/search/artist'
    const id = isFinite(route.params.id) ? parseInt(route.params.id) : 1
    const page = isFinite(route.query.page) ? parseInt(route.query.page) : 1
    const sortNum = isFinite(route.query.sort) ? parseInt(route.query.sort) : 0
    const order = [0, 2, 4].includes(sortNum) ? 'd' : 'a'
    const sort = (sortNum <= 1) ? 'd'
      : (sortNum <= 3) ? 'c'
        : 'l'
    const params = { sort, order, page, id }
    const response = await $axios.get(endpoint, { params, useCache: process.client })
    if (response.data.status !== 200) {
      return error({ statusCode: 404, message: 'err' })
    }
    const data = response.data.data
    const illustIds = data.imgs.map(img => img.illustID)
    const mylistRegistered = await $axios.post(
      `/mylist/${$auth.$state.user.mylist.id}/finds`,
      { ids: illustIds }
    )
    return {
      endpoint,
      pageTitle: `${data.title}`,
      NotificationTitle: '絵師から検索 ' + data.title + ' ' + data.count + '件',
      results: data.imgs,
      mylistRegistered: mylistRegistered.data.data,
      SelectedPage: page,
      totalPage: data.pages,
      SelectedSort: sortNum,
      isSearchPage: true
    }
  },
  head () {
    return {
      title: this.pageTitle
    }
  }
}
</script>
