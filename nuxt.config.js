const envPath = `config/.env.${process.env.NODE_ENV || 'local'}`
require('dotenv').config({ path: envPath })

export default {
  ssr: true,
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s | ' + process.env.SITE_NAME,
    title: process.env.SITE_NAME,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, minimal-ui' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
      { name: 'robots', content: 'noindex,nofollow,noarchive' },
      { hid: 'description', name: 'description', content: process.env.SITE_DESCRIPTION },
      { hid: 'og:title', property: 'og:title', content: process.env.SITE_NAME },
      { hid: 'og:description', property: 'og:description', content: process.env.SITE_DESCRIPTION },
      { hid: 'og:site_name', property: 'og:site_name', content: process.env.SITE_NAME },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:locale', property: 'og:locale', content: 'ja_JP' },
      { hid: 'og:url', property: 'og:url', content: 'https://***REMOVED***' },
      { hid: 'og:image', property: 'og:image', content: process.env.SITE_OG_IMAGE },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: process.env.SITE_NAME },
      { name: 'twitter:description', content: process.env.SITE_DESCRIPTION },
      { name: 'twitter:image', content: process.env.SITE_OG_IMAGE }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preconnect dns-prefetch', href: '//***REMOVED***' },
      { rel: 'preconnect dns-prefetch', href: '//fonts.gstatic.com' },
      { rel: 'preconnect dns-prefetch', href: '//fonts.googleapis.com' },
      { rel: 'preconnect dns-prefetch', href: '//cdn.jsdelivr.net' },
      { rel: 'preconnect dns-prefetch', href: '//cdn.lr-ingest.io' },
      { rel: 'preconnect dns-prefetch', href: '//cdn.onesignal.com' },
      { rel: 'preconnect dns-prefetch', href: '//onesignal.com' }
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
    dev: false
  },
  manifest: {
    name: process.env.SITE_NAME_FULL,
    short_name: process.env.SITE_NAME,
    description: process.env.SITE_DESCRIPTION,
    lang: 'ja',
    theme_color: process.env.SITE_THEME_COLOR,
    background_color: process.env.SITE_BG_COLOR,
    display: 'standalone',
    scope: process.env.SITE_URL,
    start_url: process.env.SITE_URL,
    shortcuts: [
      {
        name: '一覧画面を開く',
        short_name: '一覧',
        description: '新着順で投稿一覧画面を開きます',
        url: process.env.SITE_URL + '/search/list',
        icons: [{
          src: process.env.CDN_ENDPOINT + 'icon/list.png', sizes: '192x192'
        }]
      },
      {
        name: '投稿画面を開く',
        short_name: '投稿',
        description: 'イラストの投稿画面を開きます',
        url: process.env.SITE_URL + '/upload',
        icons: [{
          src: process.env.CDN_ENDPOINT + 'icon/upload.png', sizes: '192x192'
        }]
      },
      {
        name: '検索画面を開く',
        short_name: '検索',
        description: 'イラストの検索画面を開きます',
        url: process.env.SITE_URL + '/search/methods',
        icons: [{
          src: process.env.CDN_ENDPOINT + 'icon/search.png', sizes: '192x192'
        }]
      },
      {
        name: 'マイリストを開く',
        short_name: 'マイリスト',
        description: '自分のマイリスト画面を開きます',
        url: process.env.SITE_URL + '/mylist',
        icons: [{
          src: process.env.CDN_ENDPOINT + 'icon/mylist.png', sizes: '192x192'
        }]
      }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    { src: '~assets/css/main.scss', lang: 'scss' }
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~plugins/i18n',
    '~plugins/axios',
    '~plugins/vue-scrollto',
    '~plugins/vue2-touch-events',
    '~plugins/helper-search',
    '~plugins/mixin-login',
    '~plugins/mixin-illust',
    '~plugins/mixin-layout',
    '~plugins/insert-search-history',
    '~plugins/insert-illust-history',
    { src: '~plugins/tui-editor', mode: 'client' },
    { src: '~plugins/vue-notification', mode: 'client' },
    { src: '~plugins/vue-lazyload', mode: 'client' },
    { src: '~plugins/vue-infinite-loading', mode: 'client' },
    { src: '~plugins/vue-input-tag', mode: 'client' },
    { src: '~plugins/vuex-persistedstate-localstorage', mode: 'client' },
    { src: '~plugins/vuex-persistedstate-cookie' }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/eslint-module',
    'nuxt-purgecss'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/onesignal',
    '@nuxtjs/pwa',
    '@nuxtjs/auth',
    '@nuxtjs/dotenv',
    '@nuxtjs/device',
    'cookie-universal-nuxt',
    'nuxt-fontawesome',
    'nuxt-webfontloader',
    'nuxt-device-detect',
    'nuxt-logrocket',
    'nuxt-precompress',
    '~modules/axCache'
  ],
  /*
  ** Post Notify
  */
  oneSignal: {
    init: {
      appId: process.env.ONESIGNAL_ID,
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
          'faList',
          'faPlusSquare',
          'faArrowLeft',
          'faShoppingCart',
          'faSignOutAlt',
          'faArrowsAlt',
          'faFileImage',
          'faWallet',
          'faHistory',
          'faPlay',
          'faPause',
          'faStepBackward',
          'faStepForward',
          'faTools',
          'faMusic',
          'faTimesCircle',
          'faFileAlt',
          'faPenSquare',
          'faEye',
          'faEyeSlash',
          'faCrown'
        ]
      },
      {
        set: '@fortawesome/free-brands-svg-icons', // Brand icons
        icons: ['faTwitterSquare', 'faLine']
      },
      {
        set: '@fortawesome/free-regular-svg-icons', // Brand icons
        icons: ['faBookmark', 'faBell']
      }
    ]
  },
  /*
  ** Authorization
  */
  auth: {
    cookie: {
      prefix: 'auth.',
      options: {
        path: '/',
        samesite: 'lax',
        secure: process.env.NODE_ENV === 'production'
      }
    },
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
    middleware: ['auth', 'i18n']
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
    logRocketId: process.env.LOGROCKET_ID,
    devModeAllowed: false
  },
  /*
  ** Build configuration
  */
  purgeCSS: {
    whitelistPatterns: [
      /(^|\.)fa-/, /-fa($|\.)/,
      /tui-.*/,
      /viewer-.*/,
      /CodeMirror-.*/,
      /te-.*/
    ]
  },
  nuxtPrecompress: {
    enabled: true, // Enable in production
    report: true, // set false to turn off console messages
    test: /\.(js|css|html|txt|xml|svg)$/, // files to compress on build
    // Serving options
    middleware: {
      // You can disable middleware if you serve static files using nginx...
      enabled: true,
      // Enable if you have .gz or .br files in /static/ folder
      enabledStatic: true,
      // Priority of content-encodings, first matched with request Accept-Encoding will me served
      encodingsPriority: ['br', 'gzip']
    },
    // build time compression settings
    gzip: {
      // should compress to gzip?
      enabled: true,
      // compression config
      // https://www.npmjs.com/package/compression-webpack-plugin
      filename: '[path].gz[query]', // middleware will look for this filename
      threshold: 10240,
      minRatio: 0.8,
      compressionOptions: { level: 9 }
    },
    brotli: {
      // should compress to brotli?
      enabled: true,
      // compression config
      // https://www.npmjs.com/package/compression-webpack-plugin
      filename: '[path].br[query]', // middleware will look for this filename
      compressionOptions: { level: 11 },
      threshold: 10240,
      minRatio: 0.8
    }
  },
  buildDir: '.nuxt',
  build: {
    publicPath: process.env.CDN_ADDR,
    postcss: {
      preset: {
        features: {
          customProperties: false
        }
      }
    }
  },
  vue: {
    devtools: (process.env.NODE_ENV !== 'production')
  },
  dev: (process.env.NODE_ENV !== 'production')
}
