<template>
  <div id="top">
    <client-only v-if="$store.state.user.useSakura">
      <canvas id="js-background" width="0px" height="0px" />
      <script src="/blossom_loader.js" async />
    </client-only>
    <NavbarUp />
    <main>
      <transition name="page">
        <nuxt />
      </transition>
    </main>
    <BackToTop v-if="$store.state.user.useJump" />
    <NavbarDown />
  </div>
</template>

<script>
import NavbarUp from '~/components/NavbarUp.vue'
import NavbarDown from '~/components/NavbarDown.vue'
import BackToTop from '~/components/ui/BackToTop.vue'

export default {
  scrollToTop: true,
  components: {
    NavbarUp,
    NavbarDown,
    BackToTop
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
    // 圧倒的ゴリ押し なんか泣ける。
    setTimeout(() => {
      if (!window.particleSystem && this.$store.state.user.useSakura) {
        location.reload()
      }
    }, 1000)
  },
  created () {
    if (process.client) {
      console.clear()
      console.log('%c***REMOVED***', 'color: blue; font-size: 30px')
      console.log('We need developers!\nIf you are interested in develop ***REMOVED***, contact us from below.\n***REMOVED***')
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
