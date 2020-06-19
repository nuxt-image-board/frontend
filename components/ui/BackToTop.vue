<template>
  <div>
    <transition name="fade">
      <a v-show="showJump" v-scroll-to="'#top'" href="#" class="scroll-top">
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
.scroll-top {
  position: fixed;
  bottom: 30px;
  right: 30px;
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
