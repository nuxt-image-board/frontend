<template>
  <nav class="pagination is-centered" role="navigation" aria-label="pagination">
    <ul class="pagination-list">
      <!-- PC:最初のページにジャンプ -->
      <li v-if="currentPage > 1 && $store.state.user.isPC">
        <nuxt-link
          class="pagination-link"
          aria-label="Goto page 1"
          :to="{path: this.$route.path, query: {...this.$route.query, page: 1}}"
          @click.native="setPage(1)"
        >
          &laquo;
        </nuxt-link>
      </li>
      <!-- PC:前のページにジャンプ -->
      <li v-if="currentPage > 1 && $store.state.user.isPC">
        <nuxt-link
          class="pagination-link"
          :to="{path: this.$route.path, query: {...this.$route.query, page: currentPage-1}}"
          :aria-label="&quot;Goto page &quot;+(currentPage-1)"
          @click.native="decreasePage(1)"
        >
          &lsaquo;
        </nuxt-link>
      </li>
      <!-- 前の前-->
      <li v-if="currentPage > 2">
        <nuxt-link
          class="pagination-link"
          :to="{path: this.$route.path, query: {...this.$route.query, page: currentPage-2}}"
          :aria-label="&quot;Goto page &quot;+(currentPage-2)"
          @click.native="decreasePage(2)"
        >
          {{ currentPage-2 }}
        </nuxt-link>
      </li>
      <!-- 前 -->
      <li v-if="currentPage > 1">
        <nuxt-link
          class="pagination-link"
          :to="{path: this.$route.path, query: {...this.$route.query, page: currentPage-1}}"
          :aria-label="&quot;Goto page &quot;+(currentPage-1)"
          @click.native="decreasePage(1)"
        >
          {{ currentPage-1 }}
        </nuxt-link>
      </li>
      <!-- 現在 -->
      <li>
        <nuxt-link
          class="pagination-link is-current"
          :to="{path: this.$route.path, query: {...this.$route.query, page: currentPage}}"
          :aria-label="&quot;Page &quot;+currentPage"
          aria-current="page"
        >
          {{ currentPage }}
        </nuxt-link>
      </li>
      <!-- 次 -->
      <li v-if="currentPage < totalPage">
        <nuxt-link
          class="pagination-link"
          :to="{path: this.$route.path, query: {...this.$route.query, page: currentPage+1}}"
          :aria-label="&quot;Goto page &quot;+(currentPage+1)"
          @click.native="increasePage(1)"
        >
          {{ currentPage+1 }}
        </nuxt-link>
      </li>
      <!-- 次の次 -->
      <li v-if="currentPage+1 < totalPage">
        <nuxt-link
          class="pagination-link"
          :to="{path: this.$route.path, query: {...this.$route.query, page: currentPage+2}}"
          :aria-label="&quot;Goto page &quot;+(currentPage+2)"
          @click.native="increasePage(2)"
        >
          {{ currentPage+2 }}
        </nuxt-link>
      </li>
      <!-- PC:次のページにジャンプ -->
      <li v-if="currentPage < totalPage && $store.state.user.isPC">
        <nuxt-link
          class="pagination-link"
          :to="{path: this.$route.path, query: {...this.$route.query, page: currentPage+1}}"
          :aria-label="&quot;Goto page &quot;+(currentPage+1)"
          @click.native="increasePage(1)"
        >
          &rsaquo;
        </nuxt-link>
      </li>
      <!-- PC:最後のページにジャンプ -->
      <li v-if="totalPage > 1 && currentPage != totalPage && $store.state.user.isPC">
        <nuxt-link
          class="pagination-link"
          :to="{path: this.$route.path, query: {...this.$route.query, page: totalPage}}"
          :aria-label="&quot;Goto page &quot;+totalPage"
          @click.native="setPage(totalPage)"
        >
          &raquo;
        </nuxt-link>
      </li>
    </ul>
    <!-- スマホでのみ下に表示 -->
    <ul v-if="!$store.state.user.isPC" class="pagination-list is-centered">
      <!-- SP:最初のページにジャンプ -->
      <li v-if="currentPage > 1">
        <nuxt-link
          class="pagination-link"
          aria-label="Goto page 1"
          :to="{path: this.$route.path, query: {...this.$route.query, page: 1}}"
          @click.native="setPage(1)"
        >
          &laquo;
        </nuxt-link>
      </li>
      <!-- SP:前のページにジャンプ -->
      <li v-if="currentPage > 1">
        <nuxt-link
          class="pagination-link"
          :to="{path: this.$route.path, query: {...this.$route.query, page: currentPage-1}}"
          :aria-label="&quot;Goto page &quot;(currentPage-1)"
          @click.native="decreasePage(1)"
        >
          &lsaquo;
        </nuxt-link>
      </li>
      <!-- SP:次のページにジャンプ -->
      <li v-if="currentPage < totalPage">
        <nuxt-link
          class="pagination-link"
          :to="{path: this.$route.path, query: {...this.$route.query, page: currentPage+1}}"
          :aria-label="&quot;Goto page &quot;+(currentPage+1)"
          @click.native="increasePage(1)"
        >
          &rsaquo;
        </nuxt-link>
      </li>
      <!-- SP:最後のページにジャンプ -->
      <li v-if="totalPage > 1 && currentPage != totalPage">
        <nuxt-link
          class="pagination-link"
          :to="{path: this.$route.path, query: {...this.$route.query, page: totalPage}}"
          :aria-label="&quot;Goto page &quot;+totalPage"
          @click.native="setPage(totalPage)"
        >
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
  watch: {
    currentPageFromProp (newVal) {
      if (newVal > 1204) {
        this.currentPage = newVal - 1204
      }
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
