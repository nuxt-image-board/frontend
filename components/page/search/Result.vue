<template>
<div class="card">
   <div class="card-content">
      <div class="columns is-multiline">
         <div class="column is-hidden-touch is-8-fullhd is-8-desktop is-6-widescreen is-v-centered">
            <span class="tag is-link">{{result.date}}</span>
            <nuxt-link :to="artAddress">
               <span class="tag is-info">{{result.artist.name}}</span>
            </nuxt-link>
         </div>
         <div class="column is-12">
            <nuxt-link :to="artAddress">
               <p class="image">
                  <img v-if="!result.nsfw" :src="previewAddress">
                  <img v-else class="blur" :src="previewAddress">
               </p>
            </nuxt-link>
         </div>
      </div>
    </div>
    <div class="card-footer">
        <a onselectstart="return false;" unselectable="on" @click="addStar()" class="star card-footer-item">
            <span class="icon is-small">
                <i class="fas fa-heart"></i>
            </span>
            <span class="animated">
                x{{result.like}}
            </span>
        </a>
        <a @click="toggleBookmark()" class="card-footer-item">
            <span v-if="result.bookmarked" class="icon is-medium">
                <i class="far fa-2x fa-bookmark"></i>
            </span>
            <span v-else class="icon is-medium">
                <i class="fas fa-2x fa-bookmark"></i>
            </span>
        </a>
    </div>
</div>
</template>

<script>
export default {
  props: [
    'result'
  ],
  data () {
    return {
      previewAddress: '/thumb/' + this.result.illustID + '.webp',
      artAddress: '/arts/' + this.result.illustID
    }
  },
  methods: {
    async addStar () {
      const endpoint = '/arts/' + this.result.illustID + '/likes'
      this.result.like += 1
      await this.$axios.put(endpoint)
    },
    toggleBookmark () {
      console.log('hoge')
    }
  }
}
</script>

<style>
.blur{
  -ms-filter: blur(20px);
  filter: blur(20px);
}
</style>
