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
          <SelectForm
            class="is-fullwidth"
            :options="sortMethods"
            :sortMethod="String(sortID)"
            @onSelectChanged="updateSelect"
          />
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
        <infinite-loading :identifier="identifier" @infinite="addNextpage">
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
import Result from '@/components/page/search/Result.vue'

export default {
  components: {
    Notification,
    SelectForm,
    Pagination: () => import('@/components/ui/Pagination.vue'),
    Result
  },
  props: {
    apiEndpoint: { type: String, default: '' },
    pageTitle: { type: String, default: '' },
    pageIdFromProps: { type: Number, default: 1 },
    sortIdFromProps: { type: Number, default: 0 },
    keyword: { type: String, default: '' },
    totalPageFromProps: { type: Number, default: 1 },
    resultsFromProps: {
      type: Array,
      default: () => {
        return [
          {
            illustID: 0,
            date: '2020-12-04',
            like: 0,
            nsfw: false,
            artist: {
              name: 'NoData'
            }
          }
        ]
      }
    }
  },
  data () {
    return {
      pageID: this.pageIdFromProps,
      sortID: this.sortIdFromProps,
      totalPage: this.totalPageFromProps,
      results: this.resultsFromProps,
      identifier: false,
      sortMethods: [
        { text: this.$t('SearchScreen.sort.latest_art'), value: 0 },
        { text: this.$t('SearchScreen.sort.oldest_art'), value: 1 },
        { text: this.$t('SearchScreen.sort.most_liked'), value: 4 },
        { text: this.$t('SearchScreen.sort.least_liked'), value: 5 }
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
  mounted () {
    const self = this
    const myPath = this.$route.path
    const myKeyword = this.keyword
    window.document.addEventListener(
      'keydown',
      function (e) {
        if (e.keyCode === 116) {
          e.preventDefault()
          if (self.keyword === myKeyword && self.$route.path === myPath) {
            self.resetPage()
          }
          return false
        }
      },
      { passive: false }
    )
  },
  methods: {
    async addNextpage ($state) {
      this.pageID += 1
      const resp = await this.$searchApi.getKeywordSearchResults(this.apiEndpoint, this.pageID, this.sortID, this.keyword)
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
      const resp = await this.$searchApi.getKeywordSearchResults(this.apiEndpoint, this.pageID, this.sortID, this.keyword)
      this.results = resp.imgs
      this.$router.push({ path: this.$route.path, query: { ...this.$route.query, sort: newSort } })
      this.$scrollTo('#top')
    },
    async updatePage (newPage) {
      this.pageID = newPage
      const resp = await this.$searchApi.getKeywordSearchResults(this.apiEndpoint, this.pageID, this.sortID, this.keyword)
      this.results = resp.imgs
      this.$router.push({ path: this.$route.path, query: { ...this.$route.query, page: newPage } })
      this.$scrollTo('#top')
    },
    async resetPage () {
      this.pageID = 1
      this.results = []
      const resp = await this.$searchApi.getKeywordSearchResults(this.apiEndpoint, this.pageID, this.sortID, this.keyword, false)
      this.results = resp.imgs
      this.$scrollTo('#top')
      this.identifier = !this.identifier
    }
  }
}
</script>
