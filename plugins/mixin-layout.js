import Vue from 'vue'

Vue.mixin({
  layout ({ app, store }) {
    if (!app.$auth.loggedIn) {
      return 'gate'
    }
    return store.state.user.isPC ? 'desktop' : 'mobile'
  },
  methods: {
    showConsoleMessage () {
      if (process.client) {
        console.clear()
        console.log('%c***REMOVED***', 'color: blue; font-size: 30px')
        console.log('We need developers!\nIf you are interested in develop ***REMOVED***, contact us from below.\n***REMOVED***')
      }
    },
    insertBlossomLoader () {
      if (this.$store.state.user.useSakura) {
        const loader = document.createElement('script')
        loader.setAttribute('src', 'https://***REMOVED***/blossom/blossom_loader.js')
        document.body.appendChild(loader)
      }
    },
    async requestAndAlertDailyBonus () {
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
    },
    alertConnectionSpeed () {
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection
      if (connection) {
        if (connection.downlink < 3) {
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
    }
  }
})
