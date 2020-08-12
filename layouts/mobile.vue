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

<style lang="scss">
.my-notify-mobile {
  margin-top: 5px;
  font-size: 1em;
  border-radius: 5px;
  border: 1px solid #ddaa77;
  color: #000;
  background: #FFF !important;
  border-top: 5px solid #ddaa77;
  padding: 10px;
  text-align: center !important;

  &.warning {
    border-top-color: #f48a06;
  }

  &.danger {
    border-top-color: #B82E24;
  }

  &.info {
    border-top-color: #3298dc;
  }

  &.success {
    border-top-color: #00d1b2;
  }
}
</style>

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

<script>
import NavbarSmart from '~/components/NavbarSmart.vue'
import NavbarSmartMusic from '~/components/NavbarSmartMusic.vue'
import NavbarSmartDown from '~/components/NavbarSmartDown.vue'
import BackToTop from '~/components/ui/BackToTop.vue'
import BackToRecent from '~/components/ui/BackToRecent.vue'
import Offline from '~/components/Offline.vue'

export default {
  scrollToTop: true,
  components: {
    NavbarSmart,
    NavbarSmartMusic,
    NavbarSmartDown,
    BackToTop,
    BackToRecent,
    Offline
  },
  data () {
    return {
      scrollY: 0,
      openSmartNav: false,
      openSmartNav2: false
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
  async mounted () {
    if (this.$store.state.user.useSakura) {
      const loader = document.createElement('script')
      loader.setAttribute('src', 'https://***REMOVED***/blossom/blossom_loader.js')
      document.body.appendChild(loader)
    }
    try {
      await this.$axios.post('/toymoney/airdrops/1/claim', {}, { progress: false })
      this.$notify(
        {
          group: 'default',
          duration: 5000,
          type: 'success',
          title: 'デイリーボーナス',
          text: '1PYONを獲得しました!'
        }
      )
    } catch {}
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
