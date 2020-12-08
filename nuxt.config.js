export default {
  ssr: true,
  /*
  ** Read environment variables
  */
  privateRuntimeConfig: {
    API_KEY: process.env.API_SSR_TOKEN,
    API_SSR_ENDPOINT: process.env.API_SSR_ENDPOINT || "https://nboard-api.domao.site"
  },
  publicRuntimeConfig: {
    SITE_NAME: process.env.SITE_NAME || "N board",
    SITE_NAME_FULL: process.env.SITE_NAME_FULL || "N board",
    SITE_THEME_COLOR: process.env.THEME_COLOR || "",
    SITE_BG_COLOR: process.env.SITE_BG_COLOR || "",
    SITE_URL: process.env.SITE_URL || "https://nboard.domao.site",
    SITE_DESCRIPTION: process.env.SITE_DESCRIPTION || "Just an test board",
    API_CSR_ENDPOINT: process.env.API_CSR_ENDPOINT || "https://nboard-api.domao.site",
    CDN_ENDPOINT: process.env.CDN_ENDPOINT || "https://nboard-api.domao.site/static/",
    ONESIGNAL_ID: process.env.ONESIGNAL_ID || "",
    LOGROCKET_ID: process.env.LOGROCKET_ID || "",
    LINE_CLIENT_ID: process.env.LINE_CLIENT_ID || "",
    LINE_NOTIFY_CLIENT_ID: process.env.LINE_NOTIFY_CLIENT_ID || "",
    TELEGRAM_USER_ID: process.env.TELEGRAM_USER_ID || "",
    DYNAMICLINK_ENDPOINT: process.env.DYNAMICLINK_ENDPOINT || "",
    DYNAMICLINK_API_KEY: process.env.DYNAMICLINK_API_KEY || "",
    CONTACT: process.env.LINK_CONTACT || "",
    DMCA: process.env.LINK_DMCA || "",
    PUBLIC_PATH: process.env.PUBLIC_PATH || "/_nuxt/"
  },
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s | ' + process.env.SITE_NAME,
    title: process.env.SITE_NAME,
    htmlAttrs: {
      prefix: 'og: http://ogp.me/ns#'
    },
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
      { hid: 'og:url', property: 'og:url', content: process.env.SITE_URL },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: process.env.SITE_NAME },
      { name: 'twitter:description', content: process.env.SITE_DESCRIPTION }
    ],
    link: [
      { rel: 'preconnect dns-prefetch', href: process.env.API_CSR_ENDPOINT },
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
    { src: '~plugins/vue-telegram-login', mode: 'client' },
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
          'faCrown',
          'faGrinBeam',
          'faGrinHearts',
          'faStar',
          'faComments'
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
    baseURL: process.env.API_SSR_ENDPOINT,
    browserBaseURL: process.env.API_CSR_ENDPOINT,
    proxyHeaders: true
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
    hardSource: true,
    extractCSS: true,
    publicPath: process.env.PUBLIC_PATH ? process.env.PUBLIC_PATH : '/_nuxt/'
  },
  vue: {
    devtools: (process.env.NODE_ENV !== 'production')
  }
}
