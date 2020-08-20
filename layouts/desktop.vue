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

<script>
import NavbarUp from '~/components/NavbarUp.vue'
import NavbarDown from '~/components/NavbarDown.vue'
import Offline from '~/components/Offline.vue'

export default {
  scrollToTop: true,
  components: {
    NavbarUp,
    NavbarDown,
    Offline,
    NavbarDownMusic: () => import('~/components/NavbarDownMusic.vue'),
    BackToTop: () => import('~/components/ui/BackToTop.vue')
  },
  created () {
    this.showConsoleMessage()
  },
  async mounted () {
    this.insertBlossomLoader()
    await this.requestAndAlertDailyBonus()
    this.alertConnectionSpeed()
  }
}
</script>
