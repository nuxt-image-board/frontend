const envPath = `config/.env.${process.env.NODE_ENV || 'local'}`
require('dotenv').config({ path: envPath })

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s | ' + '***REMOVED***',
    title: '***REMOVED***',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'robots', content: 'noindex,nofollow,noarchive' },
      { hid: 'description', name: 'description', content: '***REMOVED***' },
      { hid: 'og:title', property: 'og:title', content: '***REMOVED***' },
      { hid: 'og:description', property: 'og:description', content: '***REMOVED***' },
      { hid: 'og:site_name', property: 'og:site_name', content: '***REMOVED***' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:locale', property: 'og:locale', content: 'ja_JP' },
      { hid: 'og:url', property: 'og:url', content: 'https://***REMOVED***' },
      { hid: 'og:image', property: 'og:image', content: '***REMOVED***' },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: '***REMOVED***' },
      { name: 'twitter:description', content: '***REMOVED***' },
      { name: 'twitter:image', content: '***REMOVED***' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** WebFont
  */
  webfontloader: {
    google: {
      families: [
        'Arvo',
        'Noto+Sans&display=swap'
      ]
    }
  },
  /*
  ** PWA Config
  */
  workbox: {
    dev: false,
    offlinePage: '/offline'
  },
  manifest: {
    name: '***REMOVED***',
    short_name: '***REMOVED***',
    description: '***REMOVED***',
    lang: 'ja',
    theme_color: '#7b5544',
    background_color: '#7b5544',
    display: 'standalone',
    scope: 'https://***REMOVED***',
    start_url: 'https://***REMOVED***'
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '@/assets/usagi.css',
    '@/assets/global.css',
    '@/assets/bulma-extensions.min.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~plugins/axios',
    '~plugins/vue-scrollto',
    '~plugins/vue2-touch-events',
    '~plugins/mixin-common',
    { src: '@/plugins/vue-input-tag', ssr: false }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/eslint-module'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/bulma',
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/auth',
    '@nuxtjs/dotenv',
    '@nuxtjs/device',
    '@nuxtjs/onesignal',
    'cookie-universal-nuxt',
    'nuxt-fontawesome',
    'nuxt-webfontloader',
    'nuxt-device-detect',
    'nuxt-logrocket'
  ],
  /*
  ** Post Notify
  */
  oneSignal: {
    init: {
      appId: '***REMOVED***',
      allowLocalhostAsSecureOrigin: true,
      welcomeNotification: {
        disable: false
      }
    },
    importScripts: ['sw.js']
  },
  /*
  ** Nuxt-fontawesome
  */
  fontawesome: {
    imports: [
      {
        set: '@fortawesome/free-solid-svg-icons', // Solid icons
        icons: [
          'faCalendar',
          'faHeart',
          'faBookmark',
          'faPenFancy',
          'faUserEdit',
          'faBroadcastTower',
          'faSearch',
          'faUser',
          'faUsers',
          'faTags',
          'faPaintBrush',
          'faIdCard',
          'faLock',
          'faSignInAlt',
          'faTicketAlt',
          'faHome',
          'faInfo',
          'faQuestionCircle',
          'faSitemap',
          'faCloudUploadAlt',
          'faExternalLinkAlt',
          'faAngleUp',
          'faImage',
          'faBell',
          'faKeyboard',
          'faUpload',
          'faChevronDown',
          'faChevronUp',
          'faList'
        ]
      },
      {
        set: '@fortawesome/free-brands-svg-icons', // Brand icons
        icons: ['faTwitterSquare', 'faLine']
      }
    ]
  },
  /*
  ** Authorization
  */
  auth: {
    redirect: {
      login: '/login', // 未ログイン時のリダイレクト先
      logout: '/login', // ログアウト処理を実行した直後のリダイレクト先
      callback: false, // コールバックURL
      home: '/' // ログイン後に遷移するページ
    },
    strategies: {
      local: {
        endpoints: {
          login: { url: 'accounts/login/form', method: 'post', propertyName: 'apiKey' },
          user: { url: 'accounts/me', method: 'get', propertyName: 'data' },
          logout: false
        }
      }
    }
  },
  router: {
    middleware: 'auth'
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: 'http://localhost:5000',
    browserBaseURL: process.env.API_ENDPOINT,
    proxyHeaders: true
  },
  /*
  ** environment configuration
  */
  dotenv: {
    filename: envPath
  },
  /*
  ** Tracking User activity
  */
  logRocket: {
    logRocketId: '***REMOVED***',
    devModeAllowed: false
  },
  /*
  ** Build configuration
  */
  buildDir: '.nuxt',
  build: {
    publicPath: '***REMOVED***',
    postcss: {
      preset: {
        features: {
          customProperties: false
        }
      }
    },
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
      if (ctx.isDev) {
        config.devtool = 'inline-cheap-module-source-map'
      }
    }
  },
  vue: {
    devtools: (process.env.NODE_ENV !== 'production')
  },
  dev: (process.env.NODE_ENV !== 'production')
}
