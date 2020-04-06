<template>
  <nav class="pagination is-centered" role="navigation" aria-label="pagination">
    <ul class="pagination-list">
      <!-- PC:最初のページにジャンプ -->
      <li v-if="currentPage > 1">
        <nuxt-link :to="{path: this.$route.path, query: {...this.$route.query, page: 1}}" class="pagination-link is-hidden-mobile" @click.native="setPage(1)">
          &laquo;
        </nuxt-link>
      </li>
      <!-- PC:前のページにジャンプ -->
      <li v-if="currentPage > 1">
        <nuxt-link :to="{path: this.$route.path, query: {...this.$route.query, page: currentPage-1}}" class="pagination-link is-hidden-mobile" @click.native="decreasePage(1)">
          &lsaquo;
        </nuxt-link>
      </li>
      <!-- 前の前-->
      <li v-if="currentPage > 2">
        <nuxt-link :to="{path: this.$route.path, query: {...this.$route.query, page: currentPage-2}}" class="pagination-link" :aria-label="&quot;Goto page &quot;+currentPage-2" @click.native="decreasePage(2)">
          {{ currentPage-2 }}
        </nuxt-link>
      </li>
      <!-- 前 -->
      <li v-if="currentPage > 1">
        <nuxt-link :to="{path: this.$route.path, query: {...this.$route.query, page: currentPage-1}}" class="pagination-link" :aria-label="&quot;Goto page &quot;+currentPage-1" @click.native="decreasePage(1)">
          {{ currentPage-1 }}
        </nuxt-link>
      </li>
      <!-- 現在 -->
      <li>
        <nuxt-link :to="{path: this.$route.path, query: {...this.$route.query, page: currentPage}}" class="pagination-link is-current" :aria-label="&quot;Page &quot;+currentPage" aria-current="page">
          {{ currentPage }}
        </nuxt-link>
      </li>
      <!-- 次 -->
      <li v-if="currentPage < totalPage">
        <nuxt-link :to="{path: this.$route.path, query: {...this.$route.query, page: currentPage+1}}" class="pagination-link" :aria-label="&quot;Goto page &quot;+currentPage+1" @click.native="increasePage(1)">
          {{ currentPage+1 }}
        </nuxt-link>
      </li>
      <!-- 次の次 -->
      <li v-if="currentPage+1 < totalPage">
        <nuxt-link :to="{path: this.$route.path, query: {...this.$route.query, page: currentPage+2}}" class="pagination-link" :aria-label="&quot;Goto page &quot;+currentPage+2" @click.native="increasePage(2)">
          {{ currentPage+2 }}
        </nuxt-link>
      </li>
      <!-- PC:次のページにジャンプ -->
      <li v-if="currentPage < totalPage">
        <nuxt-link :to="{path: this.$route.path, query: {...this.$route.query, page: currentPage+1}}" class="pagination-link is-hidden-mobile" @click.native="increasePage(1)">
          &rsaquo;
        </nuxt-link>
      </li>
      <!-- PC:最後のページにジャンプ -->
      <li v-if="totalPage > 1 && currentPage != totalPage">
        <nuxt-link :to="{path: this.$route.path, query: {...this.$route.query, page: totalPage}} " class="pagination-link is-hidden-mobile" @click.native="setPage(totalPage)">
          &raquo;
        </nuxt-link>
      </li>
    </ul>
    <!-- スマホでのみ下に表示 -->
    <ul class="pagination-list is-centered is-hidden-tablet">
      <!-- SP:最初のページにジャンプ -->
      <li v-if="currentPage > 1">
        <nuxt-link :to="{path: this.$route.path, query: {...this.$route.query, page: 1}}" class="pagination-link" @click.native="setPage(1)">
          &laquo;
        </nuxt-link>
      </li>
      <!-- SP:前のページにジャンプ -->
      <li v-if="currentPage > 1">
        <nuxt-link :to="{path: this.$route.path, query: {...this.$route.query, page: currentPage-1}}" class="pagination-link" @click.native="decreasePage(1)">
          &lsaquo;
        </nuxt-link>
      </li>
      <!-- SP:次のページにジャンプ -->
      <li v-if="currentPage < totalPage">
        <nuxt-link :to="{path: this.$route.path, query: {...this.$route.query, page: currentPage+1}}" class="pagination-link" @click.native="increasePage(1)">
          &rsaquo;
        </nuxt-link>
      </li>
      <!-- SP:最後のページにジャンプ -->
      <li v-if="totalPage > 1 && currentPage != totalPage">
        <nuxt-link :to="{path: this.$route.path, query: {...this.$route.query, page: totalPage}}" class="pagination-link" @click.native="setPage(totalPage)">
          &raquo;
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    currentPageFromProp: {
      type: Number,
      default: 1
    },
    totalPage: {
      type: Number,
      default: 1
    },
    sendMounted: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      currentPage: this.currentPageFromProp
    }
  },
  mounted () {
    if (this.sendMounted === '1') {
      this.$emit('onPageChanged', this.currentPage)
    }
  },
  methods: {
    increasePage (value) {
      this.currentPage += value
      this.$emit('onPageChanged', this.currentPage)
    },
    decreasePage (value) {
      this.currentPage -= value
      this.$emit('onPageChanged', this.currentPage)
    },
    setPage (pageNum) {
      this.currentPage = pageNum
      this.$emit('onPageChanged', this.currentPage)
    }
  }
}
</script>
