<template>
  <div class="card has-text-centered">
    <div class="card-header">
      <p class="is-size-5">
        {{ rankNo }}位
      </p>
    </div>
    <div class="card-content">
      <nuxt-link :to="`/arts/${illustID}`" class="card-image">
        <figure class="image">
          <img
            v-if="(!illustNsfw || $store.state.user.acceptR18) && !$store.state.user.mutedArtists.includes(artistID)"
            v-lazy="previewAddress"
            src="~/assets/images/loading.png"
          >
          <img
            v-else-if="illustNsfw && !$store.state.user.mutedArtists.includes(artistID)"
            src="~/assets/images/blocked_r18.png"
          >
          <img
            v-else
            src="~/assets/images/blocked_muted.png"
          >
        </figure>
      </nuxt-link>
      <nuxt-link :to="`/search/artist/${artistID}`">
        <p>{{ artistName }}</p>
      </nuxt-link>
      <p>{{ illustTitle }}</p>
      <p>いいね数: {{ illustLike }} 閲覧数: {{ illustView }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    rankNo: { type: Number, default: 1 },
    illustID: { type: Number, default: 1 },
    artistID: { type: Number, default: 1 },
    artistName: { type: String, default: '絵師名' },
    illustTitle: { type: String, default: 'イラストタイトル' },
    illustExtension: { type: String, default: 'png' },
    illustLike: { type: Number, default: 1 },
    illustView: { type: Number, default: 1 },
    illustNsfw: { type: Number, default: 0 }
  },
  computed: {
    previewAddress () {
      return `${process.env.CDN_ENDPOINT}illusts/${(this.$store.state.user.useRaw ? 'orig' : 'thumb')}/${this.illustID}.${(this.$store.state.user.useRaw ? this.result.extension : (this.$store.state.user.useWebP ? 'webp' : 'jpg'))}`
    }
  }
}
</script>
