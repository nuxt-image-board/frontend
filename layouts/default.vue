<template>
  <div id="top">
    <NavbarUp v-if="isPC" />
    <NavbarSmart v-else v-touch:swipe.left="hideSmartNav" v-touch:swipe.right="showSmartNav" :openMenuFromProp="openSmartNav" @menu-event="changeMenu" />
    <main v-touch:swipe.right="showSmartNav" v-touch:swipe.left="hideSmartNav">
      <nuxt />
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
/*
上に戻るボタンは 丸パクリ

https://note.com/aliz/n/nfd2bfc514ace

https://helloworld-blog.tech/javascript/vue-js-smooth-scroll%E3%81%A7top%E3%81%AB%E6%88%BB%E3%82%8B%E3%83%9C%E3%82%BF%E3%83%B3%E3%82%92%E5%AE%9F%E8%A3%85%E3%81%99%E3%82%8B

*/

import NavbarUp from '~/components/NavbarUp.vue'
import NavbarSmart from '~/components/NavbarSmart.vue'
// import NavbarSmartDown from '~/components/NavbarSmartDown.vue'
import NavbarDown from '~/components/NavbarDown.vue'
import Fas from '~/components/ui/Fas.vue'

export default {
  middleware: [
    'auth'
  ],
  components: {
    NavbarUp,
    NavbarDown,
    NavbarSmart,
    // NavbarSmartDown,
    Fas
  },
  data () {
    return {
      scrollY: 0,
      openSmartNav: false,
      isPC: this.$cookies.get('isPC'),
      isLeftMenu: this.$cookies.get('isLeftHanded'),
      isJumpEnabled: this.$cookies.get('isJumpEnabled'),
      useSwipe: this.$cookies.get('useSwipe')
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
  },
  serverPrefetch () {
    return this.$store.dispatch('getNavigations')
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
