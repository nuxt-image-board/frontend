<template>
  <div class="container is-widescreen">
    <div class="columns is-centered is-multiline">
      <div class="column is-8">
        <Notification>
          {{ pageTitle }} 2020/09
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
          <div v-for="index in 10" :key="index" :class="colSize">
            <Result :rankNo="index" />
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
      sortMethods: [
        { text: this.$t('SearchScreen.sort.most_liked'), value: 4 },
        { text: '閲覧数が多い順', value: 5 }
      ],
      rankID: 1,
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
      const resp = await this.$searchApi.getRankingResults(this.apiEndpoint, this.pageID, this.sortID)
      if (resp) {
        this.results = this.results.concat(resp.imgs)
        $state.loaded()
      } else {
        $state.complete()
      }
    },
    updateSort (newSort) {
      this.pageID = 1
      this.sortID = parseInt(newSort)
      // 新しいソートでデータ取得
      // this.results = resp.imgs
      this.$router.push({ path: this.$route.path, query: { ...this.$route.query, sort: newSort } })
      this.$scrollTo('#top')
    },
    updateRange (newRange) {
      switch (newRange) {
        case 1:
          this.$router.push({ path: '/ranking/monthly', query: { sort: 0 } })
          break
        case 2:
          this.$router.push({ path: '/ranking/weekly', query: { sort: 0 } })
          break
        case 3:
          this.$router.push({ path: '/ranking/daily', query: { sort: 0 } })
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
