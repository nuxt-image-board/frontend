<template>
  <div id="top">
    <client-only>
      <canvas id="js-background" width="0px" height="0px" />
      <notifications classes="my-notify" width="30%" position="top right" group="default" />
    </client-only>
    <NavbarUp />
    <main>
      <transition name="page">
        <nuxt />
      </transition>
    </main>
    <BackToTop v-if="$store.state.user.useJump" />
    <client-only>
      <NavbarDownMusic v-if="$store.state.user.useMusicPlayer" />
    </client-only>
    <NavbarDown />
    <Offline />
  </div>
</template>

<style lang="scss">
.my-notify {
  margin-top: 10px;
  margin-right: 10px;
  font-size: 1em;
  border-radius: 5px;
  border: 1px solid #ddaa77;
  color: #000;
  background: #FFF !important;
  border-left: 5px solid #ddaa77;
  padding: 10px;

  &.warning {
    border-left-color: #f48a06;
  }

  &.danger {
    border-left-color: #B82E24;
  }

  &.info {
    border-left-color: #3298dc;
  }

  &.success {
    border-left-color: #00d1b2;
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
import NavbarUp from '~/components/NavbarUp.vue'
import NavbarDown from '~/components/NavbarDown.vue'
import NavbarDownMusic from '~/components/NavbarDownMusic.vue'
import BackToTop from '~/components/ui/BackToTop.vue'
import Offline from '~/components/Offline.vue'

export default {
  scrollToTop: true,
  components: {
    NavbarUp,
    NavbarDown,
    NavbarDownMusic,
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
    /*
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection
    if (connection) {
      if (connection.downlink < 5) {
        this.$notify(
          {
            group: 'default',
            duration: 5000,
            type: 'warning',
            title: 'お使いのコンピュータの回線速度は低下しています！',
            text: '画像読み込みに時間がかかる可能性があります'
          }
        )
      }
    }
    */
  }
}
</script>
