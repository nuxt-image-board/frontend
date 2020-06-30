<template>
  <section class="section">
    <div class="container is-widescreen">
      <div class="columns is-centered is-vcentered is-multiline">
        <div class="column is-8">
          <Notification
            icon="info"
            :title="$auth.user.name+' さんのマイリスト (' + count + '件)'"
          />
        </div>
        <div class="column is-8">
          <div class="columns is-touch is-centered is-vcentered">
            <div class="column is-8">
              <SelectForm :sortMethod="String(SelectedSort)" class="is-fullwidth" :options="SortOptions" :send-mounted="false" @onSelectChanged="updateSelect" />
            </div>
          </div>
        </div>
      </div>
      <div class="columns is-centered is-multiline is-mobile">
        <div v-for="result in results" :key="result.illustID" class="column is-12-mobile is-6-touch is-3-desktop">
          <SearchResult :result="result" />
        </div>
      </div>
      <client-only v-if="$store.state.user.useInfinity">
        <infinite-loading @infinite="infiniteHandler">
          <div slot="no-more">
            最終ページまで読み込みました
          </div>
          <div slot="no-results">
            最終ページまで読み込みました
          </div>
        </infinite-loading>
      </client-only>
      <Pagination
        v-if="!$store.state.user.useInfinity"
        :current-page-from-prop="SelectedPage"
        :total-page="totalPage"
        :send-mounted="false"
        @onPageChanged="updatePage"
      />
    </div>
  </section>
</template>

<script>
import Notification from '~/components/ui/Notification.vue'
import SelectForm from '~/components/ui/SelectForm.vue'
import SearchResult from '~/components/page/search/Result.vue'
import Pagination from '~/components/ui/Pagination.vue'

export default {
  components: {
    Notification,
    SelectForm,
    Pagination,
    SearchResult
  },
  async asyncData ({ $axios, $auth, route, error }) {
    const endpoint = `/mylist/${$auth.user.mylist.id}`
    const page = isFinite(route.query.page) ? parseInt(route.query.page) : 1
    const sortNum = isFinite(route.query.sort) ? parseInt(route.query.sort) : 0
    const order = [0, 2, 4].includes(sortNum) ? 'd' : 'a'
    const sort = (sortNum <= 1) ? 'd'
      : (sortNum <= 3) ? 'i'
        : 'l'
    const params = { sort, order, page }
    const response = await $axios.get(endpoint, { params })
    if (response.data.status !== 200) {
      return {
        endpoint,
        results: [],
        count: 0,
        SelectedPage: page,
        totalPage: 0,
        SelectedSort: sortNum
      }
    }
    const data = response.data.data
    return {
      endpoint,
      results: data.imgs,
      count: data.count,
      SelectedPage: page,
      totalPage: data.pages,
      SelectedSort: sortNum
    }
  },
  data () {
    return {
      SortOptions: [
        { text: 'マイリスト登録日が新しい順', value: 0 },
        { text: 'マイリスト登録日が古い順', value: 1 },
        { text: '投稿が新しい順', value: 2 },
        { text: '投稿が古い順', value: 3 },
        { text: 'いいね数が多い順', value: 4 },
        { text: 'いいね数が少ない順', value: 5 }
      ],
      results: [
        {
          id: 0,
          illustID: 0,
          name: 'NoData',
          lcount: 0,
          count: 0,
          date: '2020-12-04',
          like: 0,
          nsfw: false,
          artist: {
            name: 'NoData'
          }
        }
      ]
    }
  },
  watch: {
    '$route' (to, from) {
      this.SelectedPage = isFinite(to.query.page) ? parseInt(to.query.page) : 1
      this.getData()
    }
  },
  methods: {
    async infiniteHandler ($state) {
      if (this.loading) {
        return
      }
      try {
        this.loading = true
        this.SelectedPage += 1
        const page = this.SelectedPage
        const sortNum = parseInt(this.SelectedSort)
        const endpoint = `/mylist/${this.$auth.user.mylist.id}`
        const order = [0, 2, 4].includes(sortNum) ? 'd' : 'a'
        const sort = (sortNum <= 1) ? 'd'
          : (sortNum <= 3) ? 'i'
            : 'l'
        const params = { sort, order, page }
        const response = await this.$axios.get(endpoint, { params })
        if (response.data.status === 200) {
          this.results = this.results.concat(response.data.data.imgs)
          // 読み込みが終わって、まだ読み込めればloaded()を呼ぶ
          $state.loaded()
        } else {
          $state.complete()
        }
      } catch (error) {
        // もう読み込めなければcomplete()を呼ぶ
        $state.complete()
      } finally {
        this.loading = false
      }
    },
    async getData () {
      this.results = []
      const page = this.SelectedPage
      const sortNum = parseInt(this.SelectedSort)
      const order = [0, 2, 4].includes(sortNum) ? 'd' : 'a'
      const sort = (sortNum <= 1) ? 'd'
        : (sortNum <= 3) ? 'i'
          : 'l'
      const params = { sort, order, page }
      const endpoint = `/mylist/${this.$auth.user.mylist.id}`
      const response = await this.$axios.get(endpoint, { params })
      if (response.data.status === 200) {
        this.results = response.data.data.imgs
      } else {
        this.results = []
      }
    },
    updateSelect (newSort) {
      this.SelectedSort = newSort
      this.SelectedPage = 1205
      this.$router.push({ path: this.$route.path, query: { ...this.$route.query, page: 1, sort: newSort } })
    },
    updatePage (newPage) {
      this.SelectedPage = newPage
      this.$router.push({ path: this.$route.path, query: { ...this.$route.query, page: newPage } })
      this.$scrollTo('#top')
    }
  },
  head () {
    return {
      title: 'マイリスト'
    }
  }
}
</script>
