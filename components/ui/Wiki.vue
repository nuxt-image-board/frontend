<template>
  <div>
    <NotifyRegister
      v-if="!apiEndpoint.includes('keyword')"
      :notifyTitle="articleTitle"
      :notifyTargetType="targetType"
      :notifyTargetID="targetID"
    />
    <button
      v-if="apiEndpoint.includes('artist') && !$store.state.user.mutedArtists.includes(targetID)"
      class="button is-primary is-large"
      @click="toggleMute(true, 2, targetID)"
    >
      <Fas i="eye" classes="is-size-4" />
    </button>
    <button
      v-if="apiEndpoint.includes('artist') && $store.state.user.mutedArtists.includes(targetID)"
      class="button is-primary is-large"
      @click="toggleMute(false, 2, targetID)"
    >
      <Fas i="eye-slash" classes="is-size-4" />
    </button>
    <nuxt-link
      v-if="$store.state.user.obtainedProducts.includes(2) && !apiEndpoint.includes('all')"
      :to="writeArticleLink"
      class="button is-primary is-large"
    >
      <Fas i="pen-square" classes="is-size-4" />
    </nuxt-link>
    <nuxt-link
      v-if="articleID && !apiEndpoint.includes('all')"
      :to="'/wiki/'+articleID"
      class="button is-primary is-large"
    >
      <Fas i="file-alt" classes="is-size-4" />
    </nuxt-link>
  </div>
</template>

<script>
import Fas from '@/components/ui/Fas.vue'
import NotifyRegister from '@/components/ui/NotifyRegister.vue'

export default {
  components: {
    Fas,
    NotifyRegister
  },
  props: {
    articleTitle: {
      type: String,
      default: '***REMOVED***'
    },
    targetType: {
      type: Number,
      default: 0
    },
    targetID: {
      type: Number,
      default: 0
    },
    apiEndpoint: {
      type: String,
      default: ''
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
        if (this.targetType === 0) {
          return `/wiki/create?id=${this.articleID}&title=${this.$auth.$state.user.name}`
        }
        return `/wiki/create?id=${this.articleID}&title=${this.articleTitle}`
      }
      if (this.targetType === 0) {
        return `/wiki/create?title=${this.$auth.$state.user.name}&targetType=${this.targetType}&targetID=${this.targetID}`
      }
      return `/wiki/create?title=${this.articleTitle}&targetType=${this.targetType}&targetID=${this.targetID}`
    }
  },
  async mounted () {
    await this.fetchWiki()
  },
  methods: {
    async fetchWiki () {
      const params = {
        id: this.targetID,
        type: this.targetType
      }
      const resp = await this.$axios.get('/wiki/find', { params })
      if (resp.data.status === 200) {
        this.articleID = resp.data.articleID
        this.revision = resp.data.revision
      }
    }
  }
}
</script>
