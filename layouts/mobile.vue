<template>
  <div id="top">
    <client-only v-if="$store.state.user.useSakura">
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
      <br v-if="!$store.state.user.useSwipe">
      <transition name="page">
        <nuxt />
      </transition>
      <br v-if="$store.state.user.useBottom">
    </main>
    <BackToTop v-if="$store.state.user.useJump" />
    <BackToRecent v-if="$store.state.user.useBack" />
    <NavbarSmartDown v-if="$store.state.user.useBottom" />
    <Offline />
  </div>
</template>

<script>
import NavbarSmart from '~/components/NavbarSmart.vue'
import NavbarSmartDown from '~/components/NavbarSmartDown.vue'
import BackToTop from '~/components/ui/BackToTop.vue'
import BackToRecent from '~/components/ui/BackToRecent.vue'
import Offline from '~/components/Offline.vue'

export default {
  scrollToTop: true,
  components: {
    NavbarSmart,
    NavbarSmartDown,
    BackToTop,
    BackToRecent,
    Offline
  },
  data () {
    return {
      scrollY: 0,
      openSmartNav: false
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
    // 圧倒的ゴリ押し なんか泣ける。
    setTimeout(() => {
      if (!window.particleSystem && this.$store.state.user.useSakura) {
        location.reload()
      }
    }, 1000)
  },
  methods: {
    showSmartNav () {
      if (this.$store.state.user.useSwipe) {
        if (!this.$store.state.user.isLeftHanded) {
          this.openSmartNav = false
        } else {
          this.openSmartNav = true
        }
      }
    },
    hideSmartNav () {
      if (this.$store.state.user.useSwipe) {
        if (!this.$store.state.user.isLeftHanded) {
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
