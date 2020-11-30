import { cacheAdapterEnhancer } from 'axios-extensions'
import LRU from 'lru-cache'
const THIRTY_MIN = 1000 * 60 * 30
//
// [Axiosの応答キャッシュ設定 と ヘッダ設定]
// サーバーは10分 クライアントは30分(リロードで消えるため) Axiosをキャッシュする
// サーバーは環境変数 クライアントはクッキーから ヘッダーを取り出す
//
// https://github.com/nuxt-community/axios-module/issues/99#issuecomment-586795315
// https://github.com/kuitos/axios-extensions
export default function ({ $axios, ssrContext, store }) {
  const defaultCache = process.server
    ? ssrContext.$axCache
    : new LRU({ maxAge: THIRTY_MIN })
  const defaults = $axios.defaults
  defaults.adapter = cacheAdapterEnhancer(defaults.adapter, {
    enabledByDefault: false,
    cacheFlag: 'useCache',
    defaultCache
  })
  $axios.onRequest((config) => {
    if (store.$auth.loggedIn) {
      config.headers.common.Authorization = 'Bearer ' + store.$auth.user.apiKey
    } else {
      config.headers.common.Authorization = 'Bearer ' + process.env.API_KEY
    }
    config.headers.common.Accept = 'application/json'
  })
}
