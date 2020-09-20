<template>
  <section class="section">
    <div class="container is-widescreen">
      <div class="columns is-centered is-vcentered is-multiline">
        <div class="column is-8">
          <Notification>
            {{ NotificationTitle }}
          </Notification>
        </div>
        <div class="column is-8">
          <div class="columns is-centered is-vcentered">
            <div class="column is-8">
              <SelectForm :sortMethod="String(SelectedSort)" class="is-fullwidth" :options="SortOptions" @onSelectChanged="updateSelect" />
            </div>
            <div v-if="isSearchPage && !NotificationTitle.includes('キーワード')" class="column is-4">
              <NotifyRegister :notifyTitle="notifyTitle" :notifyTargetType="notifyTargetType" :notifyTargetID="notifyTargetID" />
            </div>
            <div v-if="!isSearchPage" class="column is-4">
              <input v-model="filterKeyword" class="input is-medium" type="text" placeholder="絞り込みキーワード">
            </div>
          </div>
        </div>
        <div v-if="endpoint.includes('/search/artist')" class="column is-12 has-text-centered">
          <button
            v-if="!$store.state.user.mutedArtists.includes(notifyTargetID)"
            class="button is-primary is-small"
            @click="toggleArtistMute(true)"
          >
            この絵師をミュートする
          </button>
          <button
            v-else
            class="button is-primary is-small"
            @click="toggleArtistMute(false)"
          >
            この絵師のミュートを解除する
          </button>
        </div>
        <div v-if="hasWikiElement && !endpoint.includes('all') && !endpoint.includes('catalog')" class="column is-12 has-text-centered">
          <UtilArea
            :articleTitle="notifyTitle"
            :articleTargetType="notifyTargetType"
            :articleTargetID="notifyTargetID"
            @noWikiContent="hasWikiElement = false"
          />
        </div>
      </div>
      <div
        class="columns is-centered is-vcentered is-multiline is-mobile"
        :class="{'is-gapless': $store.state.user.colSize < 6 && !$store.state.user.isPC}"
      >
        <div v-for="result in results" :key="result.illustID" :class="colSize">
          <SearchResult v-if="isSearchPage" :result="result" />
          <ListResult v-else :page-type="pageType" :result="result" />
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
        v-if="!$store.state.user.useInfinity && filterKeyword === ''"
        :current-page-from-prop="SelectedPage"
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
import NotifyRegister from '@/components/ui/NotifyRegister.vue'
import Pagination from '@/components/ui/Pagination.vue'
import ListResult from '@/components/page/list/Result.vue'
import SearchResult from '@/components/page/search/Result.vue'

export default {
  components: {
    Notification,
    SelectForm,
    NotifyRegister,
    UtilArea,
    Pagination,
    ListResult,
    SearchResult
  },
  props: {
    endpoint: {
      type: String,
      default: ''
    },
    // eslint-disable-next-line
    NotificationTitle: {
      type: String,
      default: ''
    },
    notifyTitle: {
      type: String,
      default: ''
    },
    // eslint-disable-next-line
    SelectedPageFromProps: {
      type: Number,
      default: 0
    },
    // eslint-disable-next-line
    SelectedSortFromProps: {
      type: Number,
      default: 0
    },
    totalPage: {
      type: Number,
      default: 1
    },
    resultsFromProps: {
      type: Array,
      default: () => {
        return [
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
    pageType: {
      type: String,
      default: 'NoData'
    },
    isSearchPage: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      loading: false,
      filterKeyword: '',
      SelectedPage: this.SelectedPageFromProps,
      SelectedSort: this.SelectedSortFromProps,
      results: this.resultsFromProps,
      hasWikiElement: true,
      SortOptions: [
        { text: '投稿が新しい順', value: 0 },
        { text: '投稿が古い順', value: 1 },
        { text: '作品数が多い順', value: 2 },
        { text: '作品数が少ない順', value: 3 },
        { text: '累計いいね数が多い順', value: 4 },
        { text: '累計いいね数が少ない順', value: 5 },
        { text: '名前昇順 (A→Z)', value: 7 },
        { text: '名前降順 (Z→A)', value: 6 }
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
    },
    notifyTargetType () {
      switch (this.endpoint) {
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
      if (this.$route.params.id) {
        return parseInt(this.$route.params.id)
      }
      return 0
    }
  },
  watch: {
    '$route' (to, from) {
      this.SelectedPage = isFinite(to.query.page) ? parseInt(to.query.page) : 1
      if (this.endpoint.includes('multiple')) {
        this.id = this.$route.query.id
      }
      this.getData()
    },
    filterKeyword (newVal) {
      if (newVal) {
        if (newVal.length > 1 || newVal.length === 0) {
          this.$route.query.query = newVal
          this.SelectedPage = 1
          this.getData()
        }
      }
    }
  },
  mounted () {
    if (this.isSearchPage) {
      this.SortOptions = [
        { text: '投稿が新しい順', value: 0 },
        { text: '投稿が古い順', value: 1 },
        { text: 'いいね数が多い順', value: 4 },
        { text: 'いいね数が少ない順', value: 5 }
      ]
    } else {
      this.filterKeyword = this.$route.query.query
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
        let id = 0
        if (this.endpoint.includes('multiple')) {
          id = this.$route.query.query ? this.$route.query.query : ''
        } else {
          id = isFinite(this.$route.params.id) ? parseInt(this.$route.params.id) : 1
        }
        const keyword = this.$route.query.query ? this.$route.query.query : ''
        const order = [0, 2, 4, 6].includes(sortNum) ? 'd' : 'a'
        const sort = (sortNum <= 1) ? 'd'
          : (sortNum <= 3) ? 'c'
            : (sortNum <= 5) ? 'l'
              : 'n'
        const params = { sort, order, page, id, keyword }
        const response = await this.$axios.get(this.endpoint, { params, useCache: process.client })
        if (response.data.status === 200) {
          if (this.isSearchPage) {
            this.results = this.results.concat(response.data.data.imgs)
          } else {
            this.results = this.results.concat(response.data.data.contents)
          }
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
      const id = isFinite(this.$route.params.id) ? parseInt(this.$route.params.id) : 1
      const keyword = this.$route.query.query ? this.$route.query.query : ''
      const order = [0, 2, 4, 6].includes(sortNum) ? 'd' : 'a'
      const sort = (sortNum <= 1) ? 'd'
        : (sortNum <= 3) ? 'c'
          : (sortNum <= 5) ? 'l'
            : 'n'
      const params = { sort, order, page, id, keyword }
      const response = await this.$axios.get(this.endpoint, { params, useCache: process.client })
      if (response.data.status === 200) {
        if (this.isSearchPage) {
          this.results = response.data.data.imgs
        } else {
          this.results = response.data.data.contents
        }
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
    },
    async toggleArtistMute (isAdd) {
      if (this.$store.state.user.isArtistMuteAddable && isAdd) {
        this.$store.commit('user/addArtistMute', this.notifyTargetID)
        await this.$axios.post('mute/add', { type: 2, id: this.notifyTargetID })
        this.$notify(
          {
            group: 'default',
            type: 'success',
            duration: 2000,
            title: 'ミュート',
            text: '絵師をミュートしました'
          }
        )
      } else if (!isAdd) {
        this.$store.commit('user/removeArtistMute', this.notifyTargetID)
        await this.$axios.post('mute/remove', { type: 2, id: this.notifyTargetID })
        this.$notify(
          {
            group: 'default',
            type: 'success',
            duration: 2000,
            title: 'ミュート',
            text: '絵師のミュートを解除しました'
          }
        )
      } else {
        this.$notify(
          {
            group: 'default',
            type: 'danger',
            duration: 2000,
            title: 'ミュート',
            text: 'ミュート数の上限に達しています'
          }
        )
      }
    }
  }
}
</script>
