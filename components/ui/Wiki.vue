<template>
  <div class="buttons has-addons is-centered">
    <nuxt-link
      v-if="articleID"
      :to="'/wiki/'+articleID"
      class="button is-link is-medium"
    >
      Wikiで記事を見る
    </nuxt-link>
    <nuxt-link
      v-if="$store.state.user.obtainedProducts.includes(2)"
      :to="writeArticleLink"
      class="button is-primary is-medium"
    >
      Wikiで記事を {{ articleID ? '編集する' : '書く' }}
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    articleTitle: {
      type: String,
      default: '***REMOVED***'
    },
    articleTargetType: {
      type: Number,
      default: 0
    },
    articleTargetID: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      articleID: null
    }
  },
  computed: {
    writeArticleLink () {
      if (this.articleID) {
        if (this.articleTargetType === 0) {
          return `/wiki/create?id=${this.articleID}&title=${this.$auth.$state.user.name}`
        }
        return `/wiki/create?id=${this.articleID}&title=${this.articleTitle}`
      }
      if (this.articleTargetType === 0) {
        return `/wiki/create?title=${this.$auth.$state.user.name}&targetType=${this.articleTargetType}&targetID=${this.articleTargetID}`
      }
      return `/wiki/create?title=${this.articleTitle}&targetType=${this.articleTargetType}&targetID=${this.articleTargetID}`
    }
  },
  async mounted () {
    await this.fetchWiki()
  },
  methods: {
    async fetchWiki () {
      const params = {
        id: this.articleTargetID,
        type: this.articleTargetType
      }
      const resp = await this.$axios.get('/wiki/find', { params })
      if (resp.data.status === 200) {
        this.articleID = resp.data.articleID
        this.revision = resp.data.revision
      } else if (this.$store.state.user.isWikiAllowed) {
        this.$emit('noWikiContent')
      }
    }
  }
}
</script>
