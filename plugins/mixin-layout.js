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
    alertUnsupportedBrowser () {
      const ua = window.navigator.userAgent
      const baseNotify = {
        group: 'default',
        duration: 10000,
        type: 'danger',
        title: 'ok',
        text: 'お使いの環境はサポート外です。ヘルプに記載のある推奨環境のご利用を強く推奨します。'
      }
      switch (true) {
        case ua.includes('iPad'):
          baseNotify.title = 'iPad? ごめん、それだとレイアウト壊れるよ'
          break
        case ua.includes('FBAN/FBIOS'):
          baseNotify.title = 'Facebook内ブラウザ? うちは嫌いだなぁ'
          break
        case ua.includes('IAB') && ua.includes('Line'):
          baseNotify.title = 'LINE内ブラウザ? 普通のブラウザ使って!'
          break
        case ua.includes('Android 4'):
          baseNotify.title = 'Android 4? そろそろ厳しくない?スマホ買い替えて!'
          break
        case ua.includes('PlayStation 4'):
          baseNotify.title = 'PS4? うーんたぶんちゃんと見れるのかな'
          break
        case ua.includes('Nintendo Switch'):
          baseNotify.title = 'Switch? 別のデバイスにスイッチ!'
          break
        case ua.includes('Nintendo WiiU'):
          baseNotify.title = 'Wii U? イカでもやってたの?'
          break
        case ua.includes('Nintendo 3DS'):
          baseNotify.title = '3DS? 立体にはならないんだけど...'
          break
      }
      if (baseNotify.title !== 'ok') {
        this.$notify(baseNotify)
      }
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
