<template>
  <div class="card">
    <div class="card-image">
      <div v-if="isPC" class="column is-hidden-touch is-8-fullhd is-8-desktop is-6-widescreen is-v-centered">
        <span class="tag is-link">{{ result.date }}</span><br>
        <nuxt-link :to="artistAddress">
          <span class="tag is-info">{{ result.artist.name }}</span>
        </nuxt-link>
      </div>
      <nuxt-link :to="artAddress">
        <figure class="image">
          <img
            v-lazy="previewAddress"
            src="~/assets/load.png"
            :class="{'blur': result.nsfw && !acceptR18}"
            decoding="async"
            loading="lazy"
            width="320px"
            height="240px"
          >
        </figure>
      </nuxt-link>
    </div>
    <div class="card-footer">
      <a onselectstart="return false;" unselectable="on" class="star card-footer-item" @click="addStar()">
        <span class="icon is-small">
          <Fas i="heart" />
        </span>
        <span class="animated">
          x{{ result.like }}
        </span>
      </a>
      <a class="card-footer-item" @click="toggleBookmark()">
        <span v-if="result.bookmarked" class="icon is-medium">
          <Far i="bookmark" classes="fa-2x" />
        </span>
        <span v-else class="icon is-medium">
          <Fas i="bookmark" classes="fa-2x" />
        </span>
      </a>
    </div>
  </div>
</template>

<script>
import Fas from '~/components/ui/Fas.vue'
import Far from '~/components/ui/Far.vue'

export default {
  components: {
    Fas,
    Far
  },
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
    },
    isPC: {
      type: Boolean,
      default: false
    },
    useWebP: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      previewAddress: process.env.CDN_ENDPOINT + 'illusts/thumb/' + this.result.illustID + (this.useWebP ? '.webp' : '.jpg'),
      artAddress: '/arts/' + this.result.illustID,
      artistAddress: '/search/artist/' + this.result.artistID
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
