<template>
  <section class="section">
    <div class="container is-widescreen">
      <div class="columns is-centered is-vcentered is-multiline">
        <div class="column is-8">
          <Notification>
            {{ pageTitle }}
          </Notification>
        </div>
        <div class="column is-8">
          <div class="columns is-centered is-vcentered">
            <div class="column is-8">
              <SelectForm
                class="is-fullwidth"
                :options="sortMethods"
                :sortMethod="String(sortID)"
                @onSelectChanged="updateSelect"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        class="columns is-centered is-vcentered is-multiline is-mobile"
        :class="{'is-gapless': $store.state.user.colSize < 6 && !$store.state.user.isPC}"
      >
        <div v-for="result in results" :key="result.illustID" :class="colSize">
          <Result :result="result" />
        </div>
      </div>
      <client-only v-if="$store.state.user.useInfinity">
        <infinite-loading @infinite="addNextpage">
          <div slot="no-more">
            {{ $t('SearchScreen.no_more_result') }}
          </div>
          <div slot="no-results">
            {{ $t('SearchScreen.no_more_result') }}
          </div>
        </infinite-loading>
      </client-only>
      <Pagination
        v-else
        :current-page-from-prop="pageID"
        :total-page="totalPage"
        @onPageChanged="updatePage"
      />
    </div>
  </section>
</template>

<script>
import Notification from '@/components/ui/Notification.vue'
import SelectForm from '@/components/ui/SelectForm.vue'
import Pagination from '@/components/ui/Pagination.vue'
import Result from '@/components/page/search/Result.vue'

export default {
  components: {
    Notification,
    SelectForm,
    Pagination,
    Result
  },
  async asyncData ({ $searchApi, $axios, $auth, route, error }) {
    const apiEndpoint = `/mylist/${$auth.user.mylist.id}`
    const pageID = isFinite(route.query.page) ? parseInt(route.query.page) : 1
    const sortID = isFinite(route.query.sort) ? parseInt(route.query.sort) : 0
    const resp = await $searchApi.getMylistResults(apiEndpoint, pageID, sortID)
    if (!resp) {
      error({ statusCode: 404 })
    }
    return {
      apiEndpoint,
      pageID,
      sortID,
      tabTitle: $auth.user.name,
      pageTitle: `${$auth.user.name}さんのマイリスト (${resp.count}件)`,
      results: resp.imgs,
      totalPage: resp.pages
    }
  },
  data () {
    return {
      sortMethods: [
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
  computed: {
    colSize () {
      const colSize = this.$store.state.user.colSize
      if (colSize) {
        return `column is-${colSize}`
      }
      return 'column is-12-mobile is-6-touch is-3-desktop'
    }
  },
  methods: {
    async addNextpage ($state) {
      this.pageID += 1
      const resp = await this.$searchApi.getMylistResults(this.apiEndpoint, this.pageID, this.sortID)
      if (resp) {
        this.results = this.results.concat(resp.imgs)
        $state.loaded()
      } else {
        $state.complete()
      }
    },
    async updateSelect (newSort) {
      this.pageID = 1
      this.sortID = parseInt(newSort)
      const resp = await this.$searchApi.getMylistResults(this.apiEndpoint, this.pageID, this.sortID)
      this.results = resp.imgs
      this.$router.push({ path: this.$route.path, query: { ...this.$route.query, sort: newSort } })
      this.$scrollTo('#top')
    },
    async updatePage (newPage) {
      this.pageID = newPage
      const resp = await this.$searchApi.getMylistResults(this.apiEndpoint, this.pageID, this.sortID)
      this.results = resp.imgs
      this.$router.push({ path: this.$route.path, query: { ...this.$route.query, page: newPage } })
      this.$scrollTo('#top')
    }
  },
  head () {
    return {
      title: this.tabTitle
    }
  }
}
</script>
