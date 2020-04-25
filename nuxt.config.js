require('dotenv').config()

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: '***REMOVED***' || process.env.npm_package_name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'robots', content: 'noindex,nofollow,noarchive' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bulma-extensions@6.2.7/dist/css/bulma-extensions.min.css' }
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
  manifest: {
    name: '***REMOVED***',
    short_name: '***REMOVED***',
    description: '突然の神絵の消失に泣いた日々。この絵師誰だよとキレた日々。そんな日々をなくしたい。',
    lang: 'ja',
    theme_color: '#7b5544',
    background_color: '#7b5544',
    display: 'standalone',
    scope: '/',
    start_url: '/'
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
    '@/assets/global.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~plugins/axios',
    '~plugins/vue-scrollto',
    '~plugins/vue2-touch-events',
    { src: '@/plugins/vue-input-tag', ssr: false }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/modules/tree/master/packages/bulma
    '@nuxtjs/bulma',
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/auth',
    '@nuxtjs/dotenv',
    'nuxt-fontawesome',
    'cookie-universal-nuxt',
    'nuxt-webfontloader'
  ],
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
          'faChevronUp'
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
    baseURL: process.env.API_ENDPOINT
  },
  /*
  ** Build configuration
  */
  build: {
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
    }
  },
  vue: {
    devtools: true
  },
  dev: true
}
