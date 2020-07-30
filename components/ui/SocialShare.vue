<template>
  <div class="field">
    <a
      class="button is-large"
      target="_blank"
      rel="noopener noreferrer nofollow"
      @click="$store.state.user.isPC ? openSocialShare(lineShareAddress) : jumpTo(lineShareAddress)"
    >
      <span class="icon has-text-primary">
        <Fab i="line" classes="line fa-2x" />
      </span>
    </a>
    <a
      class="button is-large"
      target="_blank"
      rel="noopener noreferrer nofollow"
      @click="$store.state.user.isPC ? openSocialShare(twitterShareAddress) : jumpTo(twitterShareAddress)"
    >
      <span class="icon has-text-info">
        <Fab i="twitter-square" classes="twitter fa-2x" />
      </span>
    </a>
  </div>
</template>

<script>
import Fab from '~/components/ui/Fab.vue'

export default {
  components: {
    Fab
  },
  props: {
    title: {
      type: String,
      default: 'Twitter'
    },
    url: {
      type: String,
      default: 'https://twitter.com'
    }
  },
  data () {
    return {
      selectedType: this.sortMethod
    }
  },
  computed: {
    lineShareAddress () {
      return 'https://social-plugins.line.me/lineit/share?url=' + this.url
    },
    twitterShareAddress () {
      const shareAddress = encodeURI(this.title + '\n' + this.url)
      return 'https://twitter.com/intent/tweet?text=' + shareAddress
    }
  },
  methods: {
    openSocialShare (addr) {
      window.open(addr, '', 'width=500,height=500')
    },
    jumpTo (addr) {
      window.location = addr
    }
  }
}
</script>
