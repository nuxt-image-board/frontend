<template>
  <div id="top">
    <canvas id="js-background" width="0px" height="0px" />
    <NavbarUp />
    <main>
      <transition name="page">
        <nuxt />
      </transition>
    </main>
    <BackToTop v-if="$store.state.user.useJump" />
    <NavbarDown />
    <Offline />
  </div>
</template>

<script>
import NavbarUp from '~/components/NavbarUp.vue'
import NavbarDown from '~/components/NavbarDown.vue'
import BackToTop from '~/components/ui/BackToTop.vue'
import Offline from '~/components/Offline.vue'

export default {
  scrollToTop: true,
  components: {
    NavbarUp,
    NavbarDown,
    BackToTop,
    Offline
  },
  watch: {
    '$route.path' () {
      this.$cookies.set('lastRead', this.$route.path, {
        path: '/',
        maxAge: 60 * 60 * 24 * 31 * 6
      })
    }
  },
  created () {
    if (process.client) {
      console.log('%c***REMOVED***', 'color: blue; font-size: 30px')
      console.log('We need developers!\nIf you are interested in develop ***REMOVED***, contact us from below.\n***REMOVED***')
    }
  },
  mounted () {
    if (this.$store.state.user.useSakura) {
      const loader = document.createElement('script')
      loader.setAttribute('src', 'https://***REMOVED***/blossom/blossom_loader.js')
      document.body.appendChild(loader)
    }
  }
}
</script>

<style>
#js-background {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  pointer-events: none;
}

.page-enter {
  opacity: 0;
}
.page-enter-active {
  transition: opacity 0.6s;
}
</style>
