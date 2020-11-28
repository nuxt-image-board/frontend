<template>
  <section class="section">
    <div class="container is-widescreen">
      <div class="columns is-centered is-vcentered is-multiline">
        <div class="column is-8">
          <Notification icon="info">
            {{ $auth.user.name+' さんのイラスト閲覧履歴 (' + $store.state.user.illustHistory.length + '件)' }}
          </Notification>
        </div>
      </div>
      <div class="columns is-centered is-multiline is-mobile">
        <div v-for="result in results" :key="result.illustID" class="column is-12-mobile is-6-touch is-3-desktop">
          <SearchResult :result="result" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Notification from '@/components/ui/Notification.vue'
import SearchResult from '@/components/page/search/Result.vue'

export default {
  components: {
    Notification,
    SearchResult
  },
  async asyncData ({ $axios, store, route, redirect, error }) {
    if (!store.state.user.obtainedProducts.includes(3)) {
      redirect('/shop')
    }
    const illustData = await Promise.all(
      store.state.user.illustHistory.map(
        illustID => $axios.get(`arts/${illustID}`, { cache: true })
      )
    )
    return {
      results: illustData.map(illust => illust.data.data)
    }
  },
  head () {
    return {
      title: 'イラスト閲覧履歴'
    }
  }
}
</script>
