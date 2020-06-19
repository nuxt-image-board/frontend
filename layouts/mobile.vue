<template>
  <div id="top">
    <client-only v-if="useBlossom">
      <canvas id="js-background" width="0px" height="0px" />
      <script src="/blossom_loader.js" async />
    </client-only>
    <NavbarSmart
      v-touch:swipe.left="hideSmartNav"
      v-touch:swipe.right="showSmartNav"
      :openMenuFromProp="openSmartNav"
      @menu-event="changeMenu"
    />
    <main v-touch:swipe.right="showSmartNav" v-touch:swipe.left="hideSmartNav">
      <br v-if="!useSwipe">
      <transition name="page">
        <nuxt />
      </transition>
      <br v-if="useBottom">
    </main>
    <BackToTop v-if="isJumpEnabled" />
    <BackToRecent v-if="!useSwipe" />
    <NavbarSmartDown v-if="useBottom" />
  </div>
</template>

<script>
import NavbarSmart from '~/components/NavbarSmart.vue'
import NavbarSmartDown from '~/components/NavbarSmartDown.vue'
import BackToTop from '~/components/ui/BackToTop.vue'
import BackToRecent from '~/components/ui/BackToRecent.vue'

export default {
  scrollToTop: true,
  components: {
    NavbarSmart,
    NavbarSmartDown,
    BackToTop,
    BackToRecent
  },
  data () {
    return {
      scrollY: 0,
      openSmartNav: false,
      isLeftMenu: this.$cookies.get('isLeftHanded'),
      isJumpEnabled: this.$cookies.get('isJumpEnabled'),
      useSwipe: this.$cookies.get('useSwipe'),
      useBottom: this.$cookies.get('useBottom'),
      useBlossom: this.$cookies.get('useBlossom')
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
  created () {
    if (process.client) {
      console.clear()
      console.log('%c***REMOVED***', 'color: blue; font-size: 30px')
      console.log('We need developers!\nIf you are interested in develop ***REMOVED***, contact us from below.\n***REMOVED***')
    }
  },
  mounted () {
    // 圧倒的ゴリ押し なんか泣ける。
    setTimeout(() => {
      if (!window.particleSystem && this.useBlossom) {
        location.reload()
      }
    }, 1000)
  },
  methods: {
    showSmartNav () {
      if (this.useSwipe) {
        if (!this.isLeftMenu) {
          this.openSmartNav = false
        } else {
          this.openSmartNav = true
        }
      }
    },
    hideSmartNav () {
      if (this.useSwipe) {
        if (!this.isLeftMenu) {
          this.openSmartNav = true
        } else {
          this.openSmartNav = false
        }
      }
    },
    changeMenu (value) {
      this.openSmartNav = value
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
