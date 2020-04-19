<template>
  <div id="top">
    <NavbarUp v-if="isPC" />
    <NavbarSmart v-else :openMenu="openSmartNav" v-touch:swipe.left="hideSmartNav" />
    <main v-touch:swipe.right="showSmartNav" v-touch:swipe.left="hideSmartNav">
      <nuxt />
    </main>
    <transition name="fade">
      <a v-show="showJump" v-scroll-to="'#top'" href="#" class="scroll-top">
        <Fas i="angle-up" classes="scroll-icon" />
      </a>
    </transition>
    <NavbarDown v-if="isPC" />
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
import NavbarDown from '~/components/NavbarDown.vue'
import Fas from '~/components/ui/Fas.vue'

export default {
  middleware: [
    'auth'
  ],
  components: {
    NavbarSmart,
    NavbarUp,
    NavbarDown,
    Fas
  },
  data () {
    return {
      scrollY: 0,
      openSmartNav: false,
      isPC: this.$cookies.get('isPC')
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
    },
    showSmartNav () {
      this.openSmartNav = true
    },
    hideSmartNav () {
      this.openSmartNav = false
    }
  },
  serverPrefetch () {
    return this.$store.dispatch('getNavigations')
  }
}
</script>

<style>
* {
    font-family: 'Noto Sans', sans-serif;
}
.title {
    font-family: 'Arvo', serif;
}
.margin-fixed-navbar{
    margin-top:50px;
}

main {
    min-height:87vh;
}
.navbar,.navbar-menu,.navbar-link:hover,.navbar-item:focus,.navbar-dropdown,.dropdown-item:hover,.navbar-item:hover{
    background-color: #7b5544 !important;
}
.navbar-link::after {
    border: 1px solid #fff !important;
    border-right: 0 !important;
    border-top: 0 !important;
    content: " ";
    display: block;
    height: .5em;
    pointer-events: none;
    position: absolute;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
    -webkit-transform-origin: center;
    transform-origin: center;
    width: .5em;
    margin-top: -.375em;
    right: 1.125em;
    top: 50%;
}

a:hover{
    color: #0000FF !important;
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
