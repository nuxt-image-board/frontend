<template>
  <div>
    <transition name="fade">
      <a
        v-show="showJump"
        v-scroll-to="'#top'"
        class="scroll-top"
        :class="{'has-bottom': $store.state.user.useBottom, 'no-bottom': !$store.state.user.useBottom}"
      >
        <Fas i="angle-up" classes="scroll-icon" />
      </a>
    </transition>
  </div>
</template>

<script>
import Fas from '@/components/ui/Fas.vue'

export default {
  components: {
    Fas
  },
  data () {
    return {
      scrollY: 0
    }
  },
  computed: {
    showJump () {
      return Boolean(this.scrollY > 200)
    }
  },
  mounted () {
    window.addEventListener('scroll', this.onScroll)
    window.addEventListener('load', () => { this.onScroll() })
  },
  methods: {
    onScroll () {
      this.scrollY = window.pageYOffset
    }
  }
}
</script>
