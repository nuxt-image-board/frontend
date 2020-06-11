<template>
  <div id="top">
    <NavbarUp />
    <main>
      <transition name="page">
        <nuxt />
      </transition>
    </main>
    <transition name="fade">
      <a v-if="isJumpEnabled" v-show="showJump" v-scroll-to="'#top'" href="#" class="scroll-top">
        <Fas i="angle-up" classes="scroll-icon" />
      </a>
    </transition>
    <NavbarDown />
  </div>
</template>

<script>
import NavbarUp from '~/components/NavbarUp.vue'
import NavbarDown from '~/components/NavbarDown.vue'
import Fas from '~/components/ui/Fas.vue'

export default {
  scrollToTop: true,
  middleware: [
    'auth'
  ],
  components: {
    NavbarUp,
    NavbarDown,
    Fas
  },
  data () {
    return {
      scrollY: 0,
      isJumpEnabled: this.$cookies.get('isJumpEnabled')
    }
  },
  computed: {
    showJump () {
      return Boolean(this.scrollY > 200)
    }
  },
  watch: {
    '$route.path' () {
      this.$cookies.set('lastRead', this.$route.path, {
        path: '/',
        maxAge: 60 * 60 * 24 * 31 * 6
      })
    }
  },
  mounted () {
    window.addEventListener('scroll', this.onScroll)
    window.addEventListener('load', () => {
      this.onScroll()
    })
  },
  created () {
    if (process.client) {
      console.clear()
      console.log('%c***REMOVED***', 'color: blue; font-size: 30px')
      console.log('We need developers!\nIf you are interested in develop ***REMOVED***, contact us from below.\n***REMOVED***')
    }
  },
  methods: {
    onScroll () {
      this.scrollY = window.pageYOffset
    }
  }
}
</script>

<style>
 .page-enter {
   opacity: 0;
 }
 .page-enter-active {
   transition: opacity 0.6s;
 }

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
