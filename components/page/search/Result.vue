<template>
  <div class="card">
    <div class="card-content">
      <div class="columns is-multiline">
        <div class="column is-hidden-touch is-8-fullhd is-8-desktop is-6-widescreen is-v-centered">
          <span class="tag is-link">{{ result.date }}</span>
          <nuxt-link :to="artAddress">
            <span class="tag is-info">{{ result.artist.name }}</span>
          </nuxt-link>
        </div>
        <div class="column is-12">
          <nuxt-link :to="artAddress">
            <p class="image">
              <img :src="previewAddress" :class="{'blur': result.nsfw && !acceptR18}">
            </p>
          </nuxt-link>
        </div>
      </div>
    </div>
    <div class="card-footer">
      <a onselectstart="return false;" unselectable="on" class="star card-footer-item" @click="addStar()">
        <span class="icon is-small">
          <i class="fas fa-heart" />
        </span>
        <span class="animated">
          x{{ result.like }}
        </span>
      </a>
      <a class="card-footer-item" @click="toggleBookmark()">
        <span v-if="result.bookmarked" class="icon is-medium">
          <i class="far fa-2x fa-bookmark" />
        </span>
        <span v-else class="icon is-medium">
          <i class="fas fa-2x fa-bookmark" />
        </span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    result: {
      type: Object,
      default: () => {
        return {
          illustID: 0,
          date: '2020-12-04',
          like: 0,
          nsfw: false,
          artist: {
            name: 'NoData'
          }
        }
      }
    },
    acceptR18: {
      type: Boolean,
      default: false
    }
  },
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
      // pass
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
