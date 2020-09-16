<template>
  <section class="section">
    <div class="container is-widescreen">
      <div class="columns is-centered is-vcentered is-multiline">
        <div class="column is-8">
          <Notification>
            {{ $t('SearchScreen.search_methods.'+pageTitle) }}
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
            <div class="column is-4">
              <input v-model="keyword" class="input is-medium" type="text" :placeholder="$t('ListScreen.filer_keyword')">
            </div>
          </div>
        </div>
      </div>
      <div
        class="columns is-centered is-vcentered is-multiline is-mobile"
        :class="{'is-gapless': $store.state.user.colSize < 6 && !$store.state.user.isPC}"
      >
        <div v-for="result in results" :key="result.id" :class="colSize">
          <ListResult :page-type="pageEndpoint" :result="result" />
        </div>
      </div>
      <client-only v-if="$store.state.user.useInfinity">
        <infinite-loading @infinite="addNextpage">
          <div slot="no-more">
            {{ $t('ListScreen.no_more_result') }}
          </div>
          <div slot="no-results">
            {{ $t('ListScreen.no_more_result') }}
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
import ListResult from '@/components/page/list/Result.vue'
import Pagination from '@/components/ui/Pagination.vue'

export default {
  components: {
    Notification,
    SelectForm,
    ListResult,
    Pagination
  },
  props: {
    apiEndpoint: { type: String, default: '' },
    pageEndpoint: { type: String, default: 'NoData' },
    pageTitle: { type: String, default: '' },
    pageIdFromProps: { type: Number, default: 1 },
    sortIdFromProps: { type: Number, default: 0 },
    keywordFromProps: { type: String, default: '' },
    totalPageFromProps: { type: Number, default: 1 },
    resultsFromProps: {
      type: Array,
      default: () => {
        return [
          {
            id: 0,
            name: 'NoData',
            count: 0,
            lcount: 0,
            nsfw: false
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
      keyword: this.keywordFromProps,
      sortMethods: [
        { text: this.$t('ListScreen.sort.latest_art'), value: 0 },
        { text: this.$t('ListScreen.sort.oldest_art'), value: 1 },
        { text: this.$t('ListScreen.sort.amount_many'), value: 2 },
        { text: this.$t('ListScreen.sort.amount_few'), value: 3 },
        { text: this.$t('ListScreen.sort.most_liked'), value: 4 },
        { text: this.$t('ListScreen.sort.least_liked'), value: 5 },
        { text: this.$t('ListScreen.sort.z_to_a'), value: 6 },
        { text: this.$t('ListScreen.sort.a_to_z'), value: 7 }
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
  watch: {
    async keyword (newVal) {
      if (newVal.length > 1 || newVal.length === 0) {
        this.pageID = 1
        const resp = await this.$searchApi.getListResults(
          this.apiEndpoint,
          this.pageID,
          this.sortID,
          this.keyword
        )
        if (resp) {
          this.totalPage = resp.pages
          this.results = resp.contents
        } else {
          this.totalPage = 1
          this.results = []
        }
      }
    }
  },
  methods: {
    async addNextpage ($state) {
      this.pageID += 1
      const resp = await this.$searchApi.getListResults(this.apiEndpoint, this.pageID, this.sortID, this.keyword)
      if (resp) {
        this.results = this.results.concat(resp.contents)
        $state.loaded()
      } else {
        $state.complete()
      }
    },
    async updateSelect (newSort) {
      this.pageID = 1
      this.sortID = parseInt(newSort)
      const resp = await this.$searchApi.getListResults(this.apiEndpoint, this.pageID, this.sortID, this.keyword)
      this.results = resp.contents
      this.$router.push({ path: this.$route.path, query: { ...this.$route.query, sort: newSort } })
      this.$scrollTo('#top')
    },
    async updatePage (newPage) {
      this.pageID = newPage
      const resp = await this.$searchApi.getListResults(this.apiEndpoint, this.pageID, this.sortID, this.keyword)
      this.results = resp.contents
      this.$router.push({ path: this.$route.path, query: { ...this.$route.query, page: newPage } })
      this.$scrollTo('#top')
    }
  }
}
</script>
