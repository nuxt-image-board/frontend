import Vue from 'vue'

Vue.mixin({
  methods: {
    postLoggedIn () {
      // Aprilクッキーを焼く
      this.$cookies.set(
        '***REMOVED***',
        'true',
        {
          path: '/',
          domain: '***REMOVED***',
          maxAge: 60 * 60 * 24 * 31 * 6,
          secure: true
        }
      )
      // PC設定
      this.$cookies.set('isPC', this.$device.isDesktop, {
        path: '/',
        maxAge: 60 * 60 * 24 * 31 * 6
      })
      this.$cookies.set('isJumpEnabled', this.$device.isDesktop, {
        path: '/',
        maxAge: 60 * 60 * 24 * 31 * 6
      })
      // どうも初回取得できないことがあるので1回だけ二重に要求する
      if (this.$device.isDesktop) {
        this.$store.dispatch('getNavigations')
      }
      // スマホ設定
      this.$cookies.set('useWebP', !this.$device.isMacOS, {
        path: '/',
        maxAge: 60 * 60 * 24 * 31 * 6
      })
      this.$cookies.set('useSwipe', !this.$device.isMacOS, {
        path: '/',
        maxAge: 60 * 60 * 24 * 31 * 6
      })
      this.$cookies.set('useBottom', !this.$device.isDesktop, {
        path: '/',
        maxAge: 60 * 60 * 24 * 31 * 6
      })
    }
  }
})
