<template>
  <div class="card has-text-centered">
    <div class="card-header">
      <p class="is-size-5">
        {{ rankNo }}位
      </p>
    </div>
    <nuxt-link :to="`/arts/${illustID}`" class="card-image">
      <figure class="image">
        <img :src="`https://***REMOVED***/illusts/thumb/${illustID}.png`">
      </figure>
    </nuxt-link>
    <nuxt-link :to="`/search/artist/${artistID}`">
      <p>{{ artistName }}</p>
    </nuxt-link>
    <p>{{ illustTitle }}</p>
    <p>いいね数: {{ illustLike }} 閲覧数: {{ illustView }}</p>
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
    illustLike: { type: Number, default: 1 },
    illustView: { type: Number, default: 1 }
  }
}
</script>
