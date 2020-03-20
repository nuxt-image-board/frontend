
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'robots', content: 'noindex,nofollow,noarchive' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
	  { rel: 'stylesheet', href:"https://cdn.jsdelivr.net/npm/bulma-extensions@6.2.7/dist/css/bulma-extensions.min.css"},
	  { rel: 'stylesheet', href:"https://fonts.googleapis.com/css?family=Arvo|Noto+Sans&display=swap"}
    ],
	script:[
	  {src:"https://use.fontawesome.com/releases/v5.12.0/js/all.js"},
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
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~plugins/axios',
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
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/auth',
    '@nuxtjs/apollo'
  ],
  /*
  ** Authorization
  */
  auth: {
    strategies: {
        auth0: {
          domain: 'dev-chino.auth0.com',  // 追加
          client_id: 'aLKpGIP4XakfRSsNwwBaDSlaiN9XIFPb'  // 追加
        }
    },
    redirect: {
      login: '/login',  // 未ログイン時のリダイレクト先
      logout: '/logout',  // ログアウト処理を実行した直後のリダイレクト先
      callback: '/callback',  // コールバックURL
      home: '/',  // ログイン後に遷移するページ
    },
  },
  router: {
    middleware: 'auth'
  },
  /*
  ** Apollo GraphQL connecter
  ** See https://takumon.com/nuxt-apollo-with-graphpack/
  */
  apollo: {
    clientConfigs: {
      default: {
        // Graphpack側のエンドポイントを指定します。
        httpEndpoint: 'http://localhost:1337/graphql',
        /* Subscription用にWebSocketの設定も追加します。
        ** wsEndpoint: 'ws://localhost:1337/graphql',
        ** websocketsOnly: true
		*/
      }
    }
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: 'http://localhost:5000/'
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
