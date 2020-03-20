import { cacheAdapterEnhancer } from 'axios-extensions'
import LRUCache from 'lru-cache'
const ONE_HOUR = 1000 * 60 * 60
const defaultCache = new LRUCache({ maxAge: ONE_HOUR })

export default function ({ $axios }) {
  const defaults = $axios.defaults
  // https://github.com/kuitos/axios-extensions
  // https://github.com/nuxt-community/axios-module/issues/99#issuecomment-402320350
  defaults.adapter = cacheAdapterEnhancer(defaults.adapter, {
    enabledByDefault: false,
    cacheFlag: 'useCache',
    defaultCache
  })
  $axios.onRequest((config) => {
    config.headers.common.Authorization = 'Bearer ***REMOVED***'
    config.headers.common.Accept = 'application/json'
  })
}
