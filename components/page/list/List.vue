<template>
<section class="section">
   <div class="container is-widescreen">
      <div class="columns is-centered">
         <div class="column is-two-third">
            <Notification :title="NotificationTitle" />
         </div>
         <div class="column is-one-third">
            <SelectForm @onSelectChanged="updateSelect" :options="SortOptions" :sendMounted="0"/>
         </div>
      </div>
      <div class="columns is-centered is-multiline is-mobile">
         <div class="column is-12-mobile is-6-touch is-3-desktop" v-for="result in results" v-bind:key="result.id">
            <Result :pageType="pageType" :result="result" />
         </div>
      </div>
      <Pagination @onPageChanged="updatePage" :currentPageFromProp="SelectedPage" :totalPage="totalPage" :sendMounted="0"/>
   </div>
</section>
</template>

<script>
import Notification from '~/components/ui/Notification.vue'
import SelectForm from '~/components/ui/SelectForm.vue'
import Pagination from '~/components/ui/Pagination.vue'
import Result from '~/components/page/list/Result.vue'

export default {
  props: [
    'endpoint',
    'NotificationTitle',
    'SelectedPageFromProps',
    'SelectedSortFromProps',
    'totalPage',
    'resultsFromProps',
    'pageType'
  ],
  components: {
    Notification,
    SelectForm,
    Pagination,
    Result
  },
  data () {
    return {
      SelectedPage: this.SelectedPageFromProps,
      SelectedSort: this.SelectedSortFromProps,
      results: this.resultsFromProps,
      SortOptions: [
        { text: '投稿が新しい順', value: 0 },
        { text: '投稿が古い順', value: 1 },
        { text: '作品数が多い順', value: 2 },
        { text: '作品数が少ない順', value: 3 },
        { text: '累計いいね数が多い順', value: 4 },
        { text: '累計いいね数が少ない順', value: 5 }
      ]
    }
  },
  methods: {
    fetch () {
      this.$store.dispatch('getNavigationData')
    },
    async getData () {
      const page = this.SelectedPage
      const sortNum = parseInt(this.SelectedSort)
      const order = [0, 2, 4].includes(sortNum) ? 'd' : 'a'
      const sort = (sortNum <= 1) ? 'd'
        : (sortNum <= 3) ? 'c'
          : 'l'
      const params = { sort, order, page }
      const response = await this.$axios.get(this.endpoint, { params })
      this.results = response.data.data
    },
    updateSelect (newSort) {
      console.log('updateSelect')
      this.SelectedSort = newSort
      this.$router.push({ path: this.$route.path, query: { ...this.$route.query, sort: newSort } })
      this.getData()
    },
    updatePage (newPage) {
      console.log('updatePage')
      this.SelectedPage = newPage
      this.$router.push({ path: this.$route.path, query: { ...this.$route.query, page: newPage } })
      this.getData()
    }
  }
}
</script>
