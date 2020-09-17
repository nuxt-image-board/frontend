<template>
  <div class="card">
    <div class="card-image">
      <header class="is-hidden-touch">
        <p>
          <span class="tag is-link">{{ result.date }}</span>
          <br>
          <nuxt-link class="tag is-info" :to="artistAddress">
            <span>{{ result.artist.name }}</span>
          </nuxt-link>
          <br>
          &nbsp;
          <span class="is-size-6">
            <Fas i="eye" />
          </span>
          <span>{{ result.view ? result.view : 0 }}</span>
          &nbsp;
          <span class="is-size-6">
            <Fas i="heart" />
          </span>
          <span>{{ result.like }}</span>
          &nbsp;
          <span class="is-size-6">
            <Fas i="bookmark" />
          </span>
          <span>{{ result.mylist }}</span>
        </p>
      </header>
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
  </div>
</template>

<script>
import Fas from '@/components/ui/Fas.vue'

export default {
  components: {
    Fas
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
