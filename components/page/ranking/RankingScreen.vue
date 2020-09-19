<template>
  <div class="container is-widescreen">
    <div class="columns is-centered is-multiline">
      <div class="column is-8">
        <Notification>
          {{ pageTitle }}
          <span v-if="apiEndpoint.includes('monthly')">
            {{ `${today.getFullYear()}/${today.getMonth()+1}` }}
          </span>
          <span v-if="apiEndpoint.includes('weekly')">
            {{ `${today.getFullYear()}/${today.getMonth()+1}/${today.getDate()} ~ ${week_ago.getFullYear()}/${week_ago.getMonth()+1}/${week_ago.getDate()}` }}
          </span>
          <span v-if="apiEndpoint.includes('daily')">
            {{ `${today.getFullYear()}/${today.getMonth()+1}/${today.getDate()}` }}
          </span>
        </Notification>
      </div>
      <div class="column is-8">
        <div class="columns is-centered is-vcentered is-mobile">
          <div class="column is-8">
            <SelectForm
              :options="sortMethods"
              :sortMethod="String(sortID)"
              @onSelectChanged="updateSort"
            />
          </div>
          <div class="column is-4">
            <SelectForm
              :options="rankMethods"
              :sortMethod="String(rankID)"
              @onSelectChanged="updateRange"
            />
          </div>
        </div>
      </div>
      <div v-if="1 == 2" class="column is-8">
        <div class="columns is-centered is-vcentered is-mobile">
          <div class="column is-4-desktop">
            <SelectForm
              disabled
              :options="rankYearMethods"
              :sortMethod="String(rankYearID)"
              @onSelectChanged="updateSort"
            />
          </div>
          <div class="column is-4-desktop">
            <SelectForm
              disabled
              :options="rankMonthMethods"
              :sortMethod="String(rankMonthID)"
              @onSelectChanged="updateSort"
            />
          </div>
          <div v-if="rankMonthMethods == 3" class="column is-4-desktop">
            <SelectForm
              disabled
              :options="rankWeekMethods"
              :sortMethod="String(rankWeekID)"
              @onSelectChanged="updateSort"
            />
          </div>
        </div>
      </div>
      <div class="column is-8 has-text-centered">
        <p>
          ※期間中に集計したいいね/閲覧数を表示しています。未実装なため過去のランキングは閲覧できません。
        </p>
      </div>
      <div class="column is-10 has-image-centered">
        <div
          class="columns is-multiline is-centered"
          :class="{'is-gapless': $store.state.user.colSize < 6 && !$store.state.user.isPC}"
        >
          <div v-for="(r,index) in results" :key="r.illustID" :class="colSize">
            <Result
              :rankNo="index+1"
              :artistID="r.artistID"
              :artistName="r.artist.name"
              :illustID="r.illustID"
              :illustExtension="r.extension"
              :illustTitle="r.title"
              :illustLike="r.like"
              :illustView="r.view"
              :illustNsfw="r.nsfw"
            />
          </div>
          <div v-if="results.length === 0">
            <p class="is-size-4">
              指定した期間のランキング情報が見つけられませんでした
            </p>
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
    </div>
  </div>
</template>

<script>
import Notification from '@/components/ui/Notification.vue'
import SelectForm from '@/components/ui/SelectForm.vue'
import Result from '@/components/page/ranking/Result.vue'

export default {
  components: {
    Notification,
    SelectForm,
    Result,
    Pagination: () => import('@/components/ui/Pagination.vue')
  },
  props: {
    pageTitle: { type: String, default: 'ページ名' },
    apiEndpoint: { type: String, default: '' },
    pageIdFromProps: { type: Number, default: 1 },
    sortIdFromProps: { type: Number, default: 0 },
    yearFromProps: { type: Number, default: 0 },
    monthFromProps: { type: Number, default: 0 },
    weekFromProps: { type: Number, default: 0 },
    totalPageFromProps: { type: Number, default: 1 },
    resultsFromProps: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      pageID: this.pageIdFromProps,
      sortID: this.sortIdFromProps,
      totalPage: this.totalPageFromProps,
      results: this.resultsFromProps,
      today: new Date(),
      week_ago: new Date(),
      sortMethods: [
        { text: this.$t('SearchScreen.sort.most_liked'), value: 0 },
        { text: '閲覧数が多い順', value: 1 }
      ],
      rankMethods: [
        { text: '月間', value: 1 },
        { text: '週間', value: 2 },
        { text: '日間', value: 3 }
      ],
      rankYearID: 1,
      rankYearMethods: [
        { text: '2020年', value: 1 },
        { text: '2019年', value: 2 }
      ],
      rankMonthID: 1,
      rankMonthMethods: [
        { text: '9月', value: 1 },
        { text: '8月', value: 2 },
        { text: '7月', value: 3 }
      ],
      rankWeekID: 1,
      rankWeekMethods: [
        { text: '1週', value: 1 },
        { text: '2週', value: 2 },
        { text: '3週', value: 3 },
        { text: '4週', value: 4 }
      ]
    }
  },
  computed: {
    rankID () {
      switch (this.apiEndpoint) {
        case '/ranking/monthly':
          return 1
        case '/ranking/weekly':
          return 2
        case '/ranking/daily':
          return 3
        default:
          return 0
      }
    },
    colSize () {
      const colSize = this.$store.state.user.colSize
      if (colSize) {
        return `column is-${colSize}`
      }
      return 'column is-12-mobile is-6-touch is-3-desktop'
    }
  },
  mounted () {
    this.week_ago.setDate(this.week_ago.getDate() - 7)
  },
  methods: {
    async addNextpage ($state) {
      this.pageID += 1
      const resp = await this.$searchApi.getRankingResults(this.apiEndpoint, this.pageID, this.sortID)
      if (resp) {
        this.results = this.results.concat(resp.imgs)
        $state.loaded()
      } else {
        $state.complete()
      }
    },
    async updateSort (newSort) {
      this.pageID = 1
      this.sortID = parseInt(newSort)
      const resp = await this.$searchApi.getRankingResults(this.apiEndpoint, this.pageID, this.sortID)
      this.results = resp.imgs
      this.$router.push({ path: this.$route.path, query: { ...this.$route.query, sort: newSort } })
      this.$scrollTo('#top')
    },
    updateRange (newRange) {
      switch (newRange) {
        case '1':
          this.$router.push({ path: '/ranking/monthly', query: { sort: this.sortID } })
          break
        case '2':
          this.$router.push({ path: '/ranking/weekly', query: { sort: this.sortID } })
          break
        case '3':
          this.$router.push({ path: '/ranking/daily', query: { sort: this.sortID } })
          break
      }
      this.$scrollTo('#top')
    },
    async updatePage (newPage) {
      this.pageID = newPage
      const resp = await this.$searchApi.getRankingResults(this.apiEndpoint, this.pageID, this.sortID)
      this.results = resp.imgs
      this.$router.push({ path: this.$route.path, query: { ...this.$route.query, page: newPage } })
      this.$scrollTo('#top')
    }
  }
}
</script>
