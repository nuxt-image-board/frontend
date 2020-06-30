<template>
  <div>
    <List
      v-if="$route.query.query != ''"
      :endpoint="endpoint"
      :notification-title="NotificationTitle"
      :results-from-props="results"
      :selected-page-from-props="SelectedPage"
      :total-page="totalPage"
      :is-search-page="isSearchPage"
      :selected-sort-from-props="SelectedSort"
      :notify-title="pageTitle"
    />
    <section v-else class="hero is-fullheight" style="height:50vh;">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-centered">
            <div class="column is-6 has-text-centered">
              <h4 class="title">
                キーワード検索
              </h4>
              <p>
                検索したいキーワードを入力してください
              </p>
              <form method="get" action="/search/keyword">
                <div class="field">
                  <div class="control">
                    <input
                      v-model="query"
                      placeholder="Ex. チノ"
                      name="query"
                      class="input is-half"
                      type="text"
                    >
                  </div>
                </div>
                <div class="field is-centered">
                  <input type="submit" value="検索" class="button is-primary is-fullwidth is-large" :disabled="!!!query">
                </div>
              </form>
              <br>
              <br>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import List from '~/components/page/List.vue'

export default {
  components: {
    List
  },
  async asyncData ({ $axios, route, error }) {
    const endpoint = '/search/keyword'
    const keyword = route.query.query ? route.query.query : ''
    const page = isFinite(route.query.page) ? parseInt(route.query.page) : 1
    const sortNum = isFinite(route.query.sort) ? parseInt(route.query.sort) : 0
    const order = [0, 2, 4].includes(sortNum) ? 'd' : 'a'
    const sort = (sortNum <= 1) ? 'd'
      : (sortNum <= 3) ? 'c'
        : 'l'
    if (keyword === '') {
      return {
        endpoint,
        pageTitle: 'キーワード検索',
        NotificationTitle: 'キーワードを入力してください',
        results: [],
        SelectedPage: 1,
        totalPage: 1,
        SelectedSort: sortNum,
        isSearchPage: true
      }
    }
    const params = { sort, order, page, keyword }
    const response = await $axios.get(endpoint, { params })
    const data = response.data.data
    if (response.data.status !== 200) {
      return {
        endpoint,
        pageTitle: keyword,
        NotificationTitle: 'キーワードに一致するイラストがありません',
        results: [],
        SelectedPage: 1,
        totalPage: 1,
        SelectedSort: sortNum,
        isSearchPage: true
      }
    }
    return {
      endpoint,
      pageTitle: `${data.title}`,
      NotificationTitle: 'キーワードから検索 ' + data.title + ' ' + data.count + '件',
      results: data.imgs,
      SelectedPage: page,
      totalPage: data.pages,
      SelectedSort: sortNum,
      isSearchPage: true
    }
  },
  data () {
    return {
      query: ''
    }
  },
  watch: {
    '$route' (to, from) {
      this.getData()
    }
  },
  methods: {
    async getData () {
      const keyword = this.$route.query.query ? this.$route.query.query : ''
      const page = isFinite(this.$route.query.page) ? parseInt(this.$route.query.page) : 1
      const sortNum = isFinite(this.$route.query.sort) ? parseInt(this.$route.query.sort) : 0
      const order = [0, 2, 4].includes(sortNum) ? 'd' : 'a'
      const sort = (sortNum <= 1) ? 'd'
        : (sortNum <= 3) ? 'c'
          : 'l'
      const params = { sort, order, page, keyword }
      const response = await this.$axios.get(this.endpoint, { params })
      const data = response.data.data
      if (response.data.status === 200) {
        this.pageTitle = `${data.title}`
        this.NotificationTitle = 'キーワードから検索 ' + data.title + ' ' + data.count + '件'
        this.results = data.imgs
        this.SelectedPage = page
        this.totalPage = data.pages
        this.SelectedSort = sortNum
      }
    }
  },
  head () {
    return {
      title: this.pageTitle
    }
  }
}
</script>
