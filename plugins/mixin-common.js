import Vue from 'vue'

Vue.mixin({
  layout ({ app }) {
    if (!app.$auth.loggedIn) {
      return 'gate'
    }
    return app.$cookies.get('isPC') ? 'desktop' : 'mobile'
  },
  methods: {
    async postLoggedIn () {
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
      if (this.$device.isDesktop) {
        await this.$store.dispatch('getNavigations')
      }
      this.$cookies.set('isJumpEnabled', this.$device.isDesktop, {
        path: '/',
        maxAge: 60 * 60 * 24 * 31 * 6
      })
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
