<template>
  <div>
    <List
      v-if="$route.query.query"
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
                複合タグ検索
              </h4>
              <div class="box">
                <p class="subtitle">
                  検索対象タグ
                </p>
                <div v-if="tags.length > 0" class="field is-grouped is-grouped-multiline is-grouped-centered">
                  <div v-for="t in tags" :key="t.id">
                    <div class="control" style="margin-right: 5px; margin-bottom:2px;">
                      <a class="tags has-addons" @click="tags.pop(t)">
                        <div class="tag is-small is-info">
                          {{ t.name }}
                        </div>
                        <div class="tag is-small is-secondary">-</div>
                      </a>
                    </div>
                  </div>
                </div>
                <p v-else class="is-size-6">
                  タグを選択してください
                </p>
              </div>
              <div class="box">
                <p class="subtitle">
                  タグ候補
                </p>
                <div class="field">
                  <div class="control">
                    <input
                      v-model="filterTag"
                      placeholder="Ex. ***REMOVED***/ ラビハ制服"
                      name="query"
                      class="input is-4"
                      type="text"
                    >
                  </div>
                </div>
                <div class="field is-grouped is-grouped-multiline is-grouped-centered">
                  <div v-for="t in finds" :key="t.id">
                    <div v-if="!tags.includes(t)" class="control" style="margin-right: 5px; margin-bottom:2px;">
                      <a class="tags has-addons" @click="tags.push(t)">
                        <div class="tag is-small is-primary">
                          {{ t.name }}
                        </div>
                        <div class="tag is-small is-secondary">+</div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="field is-centered">
                <button
                  class="button is-primary is-fullwidth is-large"
                  :disabled="tags.length < 1 || tags.length > 5"
                  @click="$router.push('/search/multiple/tag?query='+ tags.map(t=>t.id).join(','))"
                >
                  検索する
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import List from '@/components/page/List.vue'

export default {
  components: {
    List
  },
  async asyncData ({ $axios, $searchApi, route, error }) {
    await $searchApi.getHoge()
    const endpoint = '/search/multiple/tag'
    const id = route.query.query ? route.query.query : ''
    const page = isFinite(route.query.page) ? parseInt(route.query.page) : 1
    const sortNum = isFinite(route.query.sort) ? parseInt(route.query.sort) : 0
    const order = [0, 2, 4].includes(sortNum) ? 'd' : 'a'
    const sort = (sortNum <= 1) ? 'd'
      : (sortNum <= 3) ? 'c'
        : 'l'
    if (id === '') {
      return {
        endpoint,
        pageTitle: '複合タグ検索',
        NotificationTitle: '複合タグを入力してください',
        results: [],
        SelectedPage: 1,
        totalPage: 1,
        SelectedSort: sortNum,
        isSearchPage: true
      }
    }
    const params = { sort, order, page, id }
    const response = await $axios.get(endpoint, { params })
    const data = response.data.data
    if (response.data.status !== 200) {
      return {
        endpoint,
        pageTitle: '見つかりません',
        NotificationTitle: '複合タグに一致するイラストがありません',
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
      NotificationTitle: '複合タグから検索 ' + data.title + ' ' + data.count + '件',
      results: data.imgs,
      SelectedPage: page,
      totalPage: data.pages,
      SelectedSort: sortNum,
      isSearchPage: true
    }
  },
  data () {
    return {
      filterTag: '',
      finds: [],
      tags: []
    }
  },
  watch: {
    '$route' (to, from) {
      this.getData()
    },
    filterTag (to, from) {
      this.findTagsWithKeyword()
    }
  },
  methods: {
    async getData () {
      const id = this.$route.query.query ? this.$route.query.query : ''
      const page = isFinite(this.$route.query.page) ? parseInt(this.$route.query.page) : 1
      const sortNum = isFinite(this.$route.query.sort) ? parseInt(this.$route.query.sort) : 0
      const order = [0, 2, 4].includes(sortNum) ? 'd' : 'a'
      const sort = (sortNum <= 1) ? 'd'
        : (sortNum <= 3) ? 'c'
          : 'l'
      const params = { sort, order, page, id }
      const response = await this.$axios.get(this.endpoint, { params })
      const data = response.data.data
      if (response.data.status === 200) {
        this.pageTitle = `${data.title}`
        this.NotificationTitle = '複合タグから検索 ' + data.title + ' ' + data.count + '件'
        this.results = data.imgs
        this.SelectedPage = page
        this.totalPage = data.pages
        this.SelectedSort = sortNum
      }
    },
    async findTagsWithKeyword () {
      const resp = await this.$axios.get(
        '/tags/finds',
        { params: { keyword: this.filterTag } }
      )
      this.finds = resp.data.data
    }
  },
  head () {
    return {
      title: this.pageTitle
    }
  }
}
</script>
