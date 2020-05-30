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
      // PCユーザーかどうか判定
      if (this.$device.isDesktop) {
        this.$cookies.set('isPC', true, {
          path: '/',
          maxAge: 60 * 60 * 24 * 31 * 6
        })
        this.$cookies.set('isJumpEnabled', true, {
          path: '/',
          maxAge: 60 * 60 * 24 * 31 * 6
        })
        // どうも初回取得できないことがあるので1回だけ二重に要求する
        this.$store.dispatch('getNavigations')
      }
      // MacまたはiOS以外かを判定
      this.$cookies.set('useWebP', !this.$device.isMacOS, {
        path: '/',
        maxAge: 60 * 60 * 24 * 31 * 6
      })
      this.$cookies.set('useSwipe', !this.$device.isMacOS, {
        path: '/',
        maxAge: 60 * 60 * 24 * 31 * 6
      })
    }
  }
})
