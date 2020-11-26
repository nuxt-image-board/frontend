<template>
  <div id="top">
    <client-only>
      <notifications classes="my-notify" width="30%" position="top right" group="default" />
    </client-only>
    <NavbarUp />
    <br v-if="$store.state.user.useFixed">
    <br v-if="$store.state.user.useFixed">
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

<script>
import NavbarUp from '@/components/NavbarUp.vue'
import NavbarDown from '@/components/NavbarDown.vue'
import Offline from '@/components/Offline.vue'

export default {
  scrollToTop: true,
  components: {
    NavbarUp,
    NavbarDown,
    Offline,
    NavbarDownMusic: () => import('@/components/NavbarDownMusic.vue'),
    BackToTop: () => import('@/components/ui/BackToTop.vue')
  },
  async mounted () {
    window.document.addEventListener(
      'keydown',
      { handleEvent: this.blockBrowserReload },
      { passive: false }
    )
    await this.requestAndAlertDailyBonus()
    this.alertUnsupportedBrowser()
  },
  methods: {
    blockBrowserReload (e) {
      if (e.keyCode === 116) {
        e.preventDefault()
        return false
      }
    }
  }
}
</script>
