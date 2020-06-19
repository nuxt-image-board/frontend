import Vue from 'vue'

Vue.mixin({
  layout ({ app, store }) {
    if (!app.$auth.loggedIn) {
      return 'gate'
    }
    return store.state.user.isPC ? 'desktop' : 'mobile'
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
      // 共通設定
      this.$store.commit('user/updateSetting', { path: 'useWebP', param: !this.$device.isMacOS })
      // PC設定
      this.$store.commit('user/updateSetting', { path: 'isPC', param: this.$device.isDesktop })
      this.$store.commit('user/updateSetting', { path: 'useJump', param: this.$device.isDesktop })
      if (this.$device.isDesktop) {
        await this.$store.dispatch('getNavigations')
      }
      // スマホ用設定
      this.$store.commit('user/updateSetting', { path: 'useBack', param: this.$device.isMacOS && !this.$device.isDesktop })
      this.$store.commit('user/updateSetting', { path: 'useSwipe', param: !this.$device.isMacOS })
      this.$store.commit('user/updateSetting', { path: 'useBottom', param: !this.$device.isDesktop })
    }
  }
})
