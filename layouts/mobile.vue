<template>
  <div id="top">
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
    <transition name="fade">
      <a v-if="isJumpEnabled" v-show="showJump" v-scroll-to="'#top'" href="#" class="scroll-top">
        <Fas i="angle-up" classes="scroll-icon" />
      </a>
    </transition>
    <NavbarSmartDown v-if="useBottom" />
  </div>
</template>

<script>
import NavbarSmart from '~/components/NavbarSmart.vue'
import NavbarSmartDown from '~/components/NavbarSmartDown.vue'
import Fas from '~/components/ui/Fas.vue'

export default {
  scrollToTop: true,
  middleware: [
    'auth'
  ],
  components: {
    NavbarSmart,
    NavbarSmartDown,
    Fas
  },
  data () {
    return {
      scrollY: 0,
      openSmartNav: false,
      isLeftMenu: this.$cookies.get('isLeftHanded'),
      isJumpEnabled: this.$cookies.get('isJumpEnabled'),
      useSwipe: this.$cookies.get('useSwipe'),
      useBottom: this.$cookies.get('useBottom')
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
    },
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
