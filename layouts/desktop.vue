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
  data () {
    return {
      choices: [
        '***REMOVED***ですか?',
        '***REMOVED***ですか?',
        '***REMOVED***ですか?',
        '***REMOVED***ですか?',
        '***REMOVED***ですか?',
        'イラストですか?'
      ],
      msg: 'イラストですか?',
      current: 0,
      add: true
    }
  },
  async mounted () {
    this.insertBlossomLoader()
    await this.requestAndAlertDailyBonus()
    // this.alertConnectionSpeed()
    // setInterval(this.scrollPageTitle, 200)
  },
  created () {
    this.showConsoleMessage()
  },
  methods: {
    scrollPageTitle () {
      if (this.add) {
        document.title = 'ご注文は' + this.msg.slice(0, this.current)
        this.current += 1
        if (this.current === this.msg.length) {
          this.add = !this.add
        }
      } else {
        document.title = 'ご注文は' + this.msg.slice(0, this.current)
        this.current -= 1
        if (this.current === 0) {
          this.msg = this.choices[Math.floor(Math.random() * this.choices.length)]
          this.add = !this.add
        }
      }
    }
  }
}
</script>
