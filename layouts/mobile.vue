<template>
  <div id="top">
    <client-only>
      <canvas id="js-background" width="0px" height="0px" />
      <notifications classes="my-notify-mobile" width="90%" position="top center" group="default" />
      <NavbarSmartMusic
        v-if="$store.state.user.useMusicPlayer"
        v-touch:swipe.left="showSmartNav2"
        v-touch:swipe.right="hideSmartNav2"
        :openMenuFromProp="openSmartNav2"
        @menu-event="changeMenu2"
      />
    </client-only>
    <NavbarSmart
      v-touch:swipe.left="hideSmartNav"
      v-touch:swipe.right="showSmartNav"
      :openMenuFromProp="openSmartNav"
      @menu-event="changeMenu"
      @open-music="openSmartNav2 = true"
    />
    <main v-touch:swipe.right="showAndHide" v-touch:swipe.left="showAndHide2">
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
import NavbarSmart from '@/components/NavbarSmart.vue'
import NavbarSmartDown from '@/components/NavbarSmartDown.vue'
import Offline from '@/components/Offline.vue'

export default {
  scrollToTop: true,
  components: {
    NavbarSmart,
    NavbarSmartDown,
    Offline,
    NavbarSmartMusic: () => import('@/components/NavbarSmartMusic.vue'),
    BackToTop: () => import('@/components/ui/BackToTop.vue'),
    BackToRecent: () => import('@/components/ui/BackToRecent.vue')
  },
  data () {
    return {
      scrollY: 0,
      openSmartNav: false,
      openSmartNav2: false
    }
  },
  created () {
    this.showConsoleMessage()
  },
  async mounted () {
    this.insertBlossomLoader()
    await this.requestAndAlertDailyBonus()
    this.alertConnectionSpeed()
  },
  methods: {
    showAndHide () {
      this.showSmartNav()
      this.hideSmartNav2()
    },
    showAndHide2 () {
      this.hideSmartNav()
      this.showSmartNav2()
    },
    showSmartNav () {
      if (this.$store.state.user.useSwipe && !this.openSmartNav2) {
        if (!this.$store.state.user.isLeftHanded) {
          this.openSmartNav = false
        } else {
          this.openSmartNav = true
        }
      }
    },
    hideSmartNav () {
      if (this.$store.state.user.useSwipe && !this.openSmartNav2) {
        if (!this.$store.state.user.isLeftHanded) {
          this.openSmartNav = true
        } else {
          this.openSmartNav = false
        }
      }
    },
    changeMenu (value) {
      this.openSmartNav = value
    },
    showSmartNav2 () {
      if (this.$store.state.user.useSwipe && !this.openSmartNav) {
        if (!this.$store.state.user.isLeftHanded) {
          this.openSmartNav2 = false
        } else {
          this.openSmartNav2 = true
        }
      }
    },
    hideSmartNav2 () {
      if (this.$store.state.user.useSwipe && !this.openSmartNav) {
        if (!this.$store.state.user.isLeftHanded) {
          this.openSmartNav2 = true
        } else {
          this.openSmartNav2 = false
        }
      }
    },
    changeMenu2 (value) {
      this.openSmartNav2 = value
    }
  }
}
</script>
