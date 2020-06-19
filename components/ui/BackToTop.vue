<template>
  <div>
    <transition name="fade">
      <a
        v-show="showJump"
        v-scroll-to="'#top'"
        href="#"
        class="scroll-top"
        :class="{'scroll-has-bottom': $store.state.user.useBottom, 'scroll-no-bottom': !$store.state.user.useBottom}"
      >
        <Fas i="angle-up" classes="scroll-icon" />
      </a>
    </transition>
  </div>
</template>

<script>
import Fas from '~/components/ui/Fas.vue'

export default {
  components: {
    Fas
  },
  data () {
    return {
      scrollY: 0,
      bottomMargin: 65
    }
  },
  computed: {
    showJump () {
      return Boolean(this.scrollY > 200)
    }
  },
  mounted () {
    window.addEventListener('scroll', this.onScroll)
    window.addEventListener('load', () => {
      this.onScroll()
    })
  },
  methods: {
    onScroll () {
      this.scrollY = window.pageYOffset
    }
  }
}
</script>

<style>
.scroll-has-bottom {
  bottom: 65px;
}
.scroll-no-bottom {
  bottom: 20px;
}

.scroll-top {
  position: fixed;
  right: 20px;
  background-color: #000;
  padding: 10px 16px;
  border-radius: 32px;
}
.scroll-icon {
  font-weight: bold;
  font-size: 20px;
  color: #fff;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
