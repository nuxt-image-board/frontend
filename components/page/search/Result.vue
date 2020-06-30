<template>
  <div class="card">
    <div class="card-image">
      <div v-if="$store.state.user.isPC" class="column is-hidden-touch is-8-fullhd is-8-desktop is-6-widescreen is-v-centered">
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
            :class="{'blur': result.nsfw && !$store.state.user.acceptR18}"
          >
        </figure>
      </nuxt-link>
    </div>
    <div class="card-footer">
      <a onselectstart="return false;" unselectable="on" class="star card-footer-item" @click="addStar()">
        <span class="icon is-small">
          <Fas i="heart" />
        </span>
        <span>
          x{{ result.like }}
        </span>
      </a>
      <a class="card-footer-item" @click="toggleBookmark()">
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
    bookmarkedFromProps: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      previewAddress: process.env.CDN_ENDPOINT +
        'illusts/thumb/' +
        this.result.illustID +
        '.' +
        (this.$store.state.user.useWebP ? 'webp' : 'jpg'),
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
    async toggleBookmark () {
      await this.$axios.put(
        `/mylist/${this.$auth.$state.user.mylist.id}`,
        { illustID: this.result.illustID, action: this.result.mylisted ? 'remove' : 'add' }
      )
      if (this.result.mylisted) {
        this.result.mylist -= 1
      } else {
        this.result.mylist += 1
      }
      this.result.mylisted = !this.result.mylisted
    }
  }
}
</script>
