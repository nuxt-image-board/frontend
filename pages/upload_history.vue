<template>
  <section class="section">
    <div class="container is-widescreen">
      <div class="columns is-centered">
        <div class="column is-two-third">
          <Notification :title="NotificationTitle" />
        </div>
        <div class="column is-one-third">
          <SelectForm :options="SortOptions" @onSelectChanged="updateSelect" />
        </div>
      </div>
      <div class="columns is-centered is-multiline is-mobile">
        <div v-for="result in results" :key="result.illustID" class="column is-12-mobile is-12-touch is-6-desktop">
          <Result :result="result" />
        </div>
      </div>
      <Pagination
        :current-page-from-prop="SelectedPage"
        :total-page="totalPage"
        @onPageChanged="updatePage"
      />
    </div>
  </section>
</template>

<script>
import Notification from '~/components/ui/Notification.vue'
import SelectForm from '~/components/ui/SelectForm.vue'
import Pagination from '~/components/ui/Pagination.vue'
import Result from '~/components/page/upload_history/Result.vue'

export default {
  components: {
    Notification,
    SelectForm,
    Pagination,
    Result
  },
  async asyncData ({ $axios, $auth, route }) {
    const accountID = $auth.$state.user.userID
    const endpoint = `/accounts/${accountID}/upload_history`
    const page = isFinite(route.query.page) ? parseInt(route.query.page) : 1
    const sortNum = isFinite(route.query.sort) ? parseInt(route.query.sort) : 0
    const order = sortNum === 0 ? 'd' : 'a'
    const sort = 'd'
    const params = { sort, order, page }
    const response = await $axios.get(endpoint, { params })
    const data = response.data.data
    return {
      endpoint,
      NotificationTitle: `投稿履歴 ${data.count}件`,
      results: data.contents,
      SelectedPage: page,
      totalPage: data.pages,
      SelectedSort: sortNum,
      SortOptions: [
        { text: '登録が新しい順　　　', value: 0 },
        { text: '登録が古い順　　　', value: 1 }
      ]
    }
  },
  methods: {
    async getData () {
      this.results = []
      const page = this.SelectedPage
      const sortNum = parseInt(this.SelectedSort)
      const id = isFinite(this.$route.params.id) ? parseInt(this.$route.params.id) : 1
      const order = sortNum === 0 ? 'd' : 'a'
      const sort = 'd'
      const params = { sort, order, page, id }
      const response = await this.$axios.get(this.endpoint, { params })
      this.results = response.data.data.contents
    },
    updateSelect (newSort) {
      this.SelectedSort = newSort
      this.SelectedPage = 1
      this.$router.push({ path: this.$route.path, query: { ...this.$route.query, page: 1, sort: newSort } })
      this.getData()
    },
    updatePage (newPage) {
      this.SelectedPage = newPage
      this.$router.push({ path: this.$route.path, query: { ...this.$route.query, page: newPage } })
      this.$scrollTo('#top')
      this.getData()
    }
  },
  head () {
    return {
      title: 'アップロード履歴'
    }
  }
}
</script>
