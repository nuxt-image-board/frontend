<template>
  <div class="card">
    <div class="card-content">
      <div class="container">
        <div class="columns is-centered is-vcentered">
          <div class="column is-5 has-text-centered is-hidden-touch">
            <nuxt-link :to="artAddress">
              <figure class="image">
                <img
                  v-if="(!result.nsfw || $store.state.user.acceptR18) && !$store.state.user.mutedArtists.includes(result.artistID)"
                  v-lazy="previewAddress"
                  src="~/assets/images/loading.png"
                >
                <img
                  v-else-if="result.nsfw && !$store.state.user.mutedArtists.includes(result.artistID)"
                  src="~/assets/images/blocked_r18.png"
                >
                <img
                  v-else
                  src="~/assets/images/blocked_muted.png"
                >
              </figure>
            </nuxt-link>
          </div>
          <div class="column is-7 has-text-centered">
            <nuxt-link :to="artistAddress" class="is-hidden-touch">
              <span class="tag is-link">{{ result.date }}</span>
              <span class="tag is-info">{{ result.artist.name }}</span>
            </nuxt-link>
            <nuxt-link :to="artAddress">
              <p class="is-size-5">
                {{ result.title }}
              </p>
              <p class="is-size-7">
                {{ result.caption }}
              </p>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!$store.state.user.colSize || $store.state.user.colSize >= 6 || $store.state.user.isPC" class="card-footer">
      <a class="card-footer-item" @click="addLike(result.illustID); result.like += 1;">
        <span class="icon is-small">
          <Fas i="heart" />
        </span>
        <span>
          x{{ result.like }}
        </span>
      </a>
      <a class="card-footer-item" @click="handleBookmark">
        <span v-if="result.mylisted" class="icon is-small">
          <Fas i="bookmark" />
        </span>
        <span v-else class="icon is-small">
          <Far i="bookmark" />
        </span>
        <span>
          x{{ result.mylist }}
        </span>
      </a>
    </div>
  </div>
</template>

<style>
.card-content {
  min-height: 40vh;
}
.card-footer {
  margin-top: auto;
}
</style>

<script>
import Fas from '@/components/ui/Fas.vue'
import Far from '@/components/ui/Far.vue'

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
    bookmarkedFromProps: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      previewAddress: process.env.CDN_ENDPOINT +
        'illusts/' +
        (this.$store.state.user.useRaw ? 'orig' : 'thumb') +
        '/' +
        this.result.illustID +
        '.' +
        (this.$store.state.user.useRaw ? this.result.extension
          : (this.$store.state.user.useWebP ? 'webp' : 'jpg')
        ),
      artAddress: '/arts/' + this.result.illustID,
      artistAddress: '/search/artist/' + this.result.artistID
    }
  },
  methods: {
    handleBookmark () {
      this.toggleBookmark(!this.result.mylisted, this.result.illustID)
      this.result.mylisted = !this.result.mylisted
      if (this.result.mylisted) {
        this.result.mylist += 1
      } else {
        this.result.mylist -= 1
      }
    }
  }
}
</script>
