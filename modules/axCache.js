import LRU from 'lru-cache'

// サーバーサイドAxiosのキャッシュモジュール
export default function (_moduleOptions) {
  const TEN_MIN = 1000 * 60 * 10
  const axCache = new LRU({ maxAge: TEN_MIN })

  this.nuxt.hook('vue-renderer:ssr:prepareContext', (ssrContext) => {
    ssrContext.$axCache = axCache
  })
}
