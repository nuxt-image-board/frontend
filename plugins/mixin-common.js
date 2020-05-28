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
          maxAge: 60 * 60 * 24 * 7,
          secure: true
        }
      )
      // PCユーザーかどうか判定
      if (this.$device.isDesktop) {
        this.$cookies.set('isPC', true, {
          path: '/',
          maxAge: 60 * 60 * 24 * 7
        })
        this.$cookies.set('isJumpEnabled', true, {
          path: '/',
          maxAge: 60 * 60 * 24 * 7
        })
        // どうも初回取得できないことがあるので1回だけ二重に要求する
        this.$store.dispatch('getNavigations')
      }
      // MacまたはiOS以外かを判定
      if (!this.$device.isMacOS) {
        this.$cookies.set('useWebP', true, {
          path: '/',
          maxAge: 60 * 60 * 24 * 7
        })
        this.$cookies.set('useSwipe', true, {
          path: '/',
          maxAge: 60 * 60 * 24 * 7
        })
      } else {
        this.$cookies.set('useWebP', false, {
          path: '/',
          maxAge: 60 * 60 * 24 * 7
        })
        this.$cookies.set('useSwipe', false, {
          path: '/',
          maxAge: 60 * 60 * 24 * 7
        })
      }
    }
  }
})
