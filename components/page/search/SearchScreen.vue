<template>
  <section class="section">
    <div class="container is-widescreen">
      <div class="columns is-centered is-vcentered is-multiline">
        <div class="column is-8">
          <Notification>
            {{ $t('SearchScreen.search_methods.'+pageTitle) }}
            {{ tabTitle }}
            {{ `(${resultCount})` }}
          </Notification>
        </div>
        <div class="column is-8">
          <div class="columns is-centered is-vcentered">
            <div class="column is-6-desktop">
              <SelectForm
                :options="sortMethods"
                :sortMethod="String(sortID)"
                @onSelectChanged="updateSelect"
              />
            </div>
            <div class="column is-centered has-text-centered-touch is-12-mobile is-6-tablet is-6-desktop has-text-right">
              <UtilArea
                :apiEndpoint="apiEndpoint"
                :articleTitle="tabTitle"
                :targetType="notifyTargetType"
                :targetID="notifyTargetID"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        id="container"
        class="columns has-equal-height is-centered is-vcentered is-multiline is-mobile pull-to-refresh-material2"
        :class="{'is-gapless': $store.state.user.colSize < 6 && !$store.state.user.isPC}"
      >
        <div class="pull-to-refresh-material2__control">
          <svg class="pull-to-refresh-material2__icon" fill="#4285f4" width="24" height="24" viewBox="0 0 24 24">
            <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
            <path d="M0 0h24v24H0z" fill="none" />
          </svg>
          <svg class="pull-to-refresh-material2__spinner" width="24" height="24" viewBox="25 25 50 50">
            <circle
              class="pull-to-refresh-material2__path"
              cx="50"
              cy="50"
              r="20"
              fill="none"
              stroke="#4285f4"
              stroke-width="4"
              stroke-miterlimit="10"
            />
          </svg>
        </div>
        <div v-for="result in filteredResults" :key="result.illustID" :class="colSize">
          <TextResult v-if="$store.state.user.useTextResult" :result="result" />
          <Result v-else :result="result" />
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
import UtilArea from '@/components/ui/UtilArea.vue'
import Result from '@/components/page/search/Result.vue'
import pullToRefresh from 'mobile-pull-to-refresh'
import ptrAnimatesMaterial2 from 'mobile-pull-to-refresh/dist/styles/material2/animates'
import 'mobile-pull-to-refresh/dist/styles/material2/style.css'

export default {
  components: {
    Notification,
    SelectForm,
    UtilArea,
    Pagination: () => import('@/components/ui/Pagination.vue'),
    TextResult: () => import('@/components/page/search/TextResult.vue'),
    Result
  },
  props: {
    apiEndpoint: { type: String, default: '' },
    tabTitle: { type: String, default: '' },
    pageTitle: { type: String, default: '' },
    resultCount: { type: Number, default: 0 },
    pageIdFromProps: { type: Number, default: 1 },
    sortIdFromProps: { type: Number, default: 0 },
    targetId: { type: Number, default: 1 },
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
      hasWikiElement: true,
      identifier: false,
      articleID: null,
      pullRefresh: null,
      sortMethods: [
        { text: this.$t('SearchScreen.sort.latest_art'), value: 0 },
        { text: this.$t('SearchScreen.sort.oldest_art'), value: 1 },
        { text: this.$t('SearchScreen.sort.most_liked'), value: 4 },
        { text: this.$t('SearchScreen.sort.least_liked'), value: 5 }
      ]
    }
  },
  computed: {
    filteredResults () {
      if (this.$store.state.user.acceptR18) {
        return this.results
      } else {
        return this.results.filter(result => !result.nsfw)
      }
    },
    colSize () {
      const colSize = this.$store.state.user.colSize
      if (colSize) {
        return `column is-${colSize}`
      }
      return 'column is-12-mobile is-6-touch is-3-desktop'
    },
    notifyTargetType () {
      switch (this.apiEndpoint) {
        case '/search/artist':
          return 2
        case '/search/tag':
        case '/search/character':
          return 1
        default:
          return 0
      }
    },
    notifyTargetID () {
      return (this.$route.params.id ? parseInt(this.$route.params.id) : 0)
    }
  },
  mounted () {
    const self = this
    const myPath = this.$route.path
    const myId = this.$route.params.id
    this.pullRefresh = pullToRefresh({
      container: document.querySelector('#container'),
      animates: ptrAnimatesMaterial2,
      refresh () {
        return self.resetPage()
      }
    })
    window.document.addEventListener(
      'keyup',
      function (e) {
        if (e.keyCode === 116) {
          e.preventDefault()
          if (self.$route.params.id === myId && self.$route.path === myPath) {
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
      const resp = await this.$searchApi.getSearchResults(this.apiEndpoint, this.pageID, this.sortID, this.targetId)
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
      const resp = await this.$searchApi.getSearchResults(this.apiEndpoint, this.pageID, this.sortID, this.targetId)
      this.results = resp.imgs
      this.$router.push({ path: this.$route.path, query: { ...this.$route.query, sort: newSort } })
      this.$scrollTo('#top')
    },
    async updatePage (newPage) {
      this.pageID = newPage
      const resp = await this.$searchApi.getSearchResults(this.apiEndpoint, this.pageID, this.sortID, this.targetId)
      this.results = resp.imgs
      this.$router.push({ path: this.$route.path, query: { ...this.$route.query, page: newPage } })
      this.$scrollTo('#top')
    },
    async resetPage () {
      this.$scrollTo('#top')
      this.pageID = 1
      const resp = await this.$searchApi.getSearchResults(this.apiEndpoint, this.pageID, this.sortID, this.targetId, false)
      this.results = resp.imgs
      this.identifier = !this.identifier
    }
  }
}
</script>
