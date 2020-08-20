import Vue from 'vue'

Vue.mixin({
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
      // デフォルト設定代入
      const defaultSettings = {
        useWebP: !this.$device.isMacOS,
        isPC: this.$device.isDesktop,
        useJump: this.$device.isDesktop,
        useBack: this.$device.isMacOS && !this.$device.isDesktop,
        useSwipe: !this.$device.isMacOS,
        useBottom: !this.$device.isDesktop
      }
      for (const setting in defaultSettings) {
        this.$store.commit(
          'user/updateSetting',
          { path: setting, param: defaultSettings[setting] }
        )
      }
      // PCなら一応ナビゲーションを取り直す
      if (this.$device.isDesktop) {
        await this.$store.dispatch('getNavigations')
      }
      // 所有している物のID一覧を保管する
      const assets = await this.$axios.get('/toymoney/users/assets')
      this.$store.commit(
        'user/setObtainedProducts', assets.data.assets.map(a => a.id)
      )
      // マイリストに入っているデータ数を取得する
      const mylistCount = await this.$axios.get(`/mylist/${this.$auth.user.mylist.id}`)
      this.$store.commit(
        'user/updateSetting', { path: 'mylistCount', param: mylistCount.data.data.count }
      )
      // ミュートしている情報を取得し、対応するリストにつっこむ
      const muteData = await this.$axios.get('mute/list')
      // とりあえずアーティストのミュートだけ
      this.$store.commit(
        'user/setArtistMuteIds', muteData.data.data.artist
      )
    }
  }
})
