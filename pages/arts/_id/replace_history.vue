<template>
  <section class="section has-text-centered">
    <p class="title">
      イラスト置き換え履歴
    </p>
    <div class="columns box is-centered is-multiline mx-2">
      <div class="column is-12 has-text-centered is-hidden-touch">
        <div class="columns is-vcentered is-centered">
          <div class="column is-2">
            掲載サイト
          </div>
          <div class="column is-3">
            タイトル
          </div>
          <div class="column is-3">
            説明文
          </div>
          <div class="column is-2">
            解像度
          </div>
          <div class="column is-2">
            サイズ
          </div>
        </div>
      </div>
      <div v-for="replace in illust.replace" :key="replace.illustID" class="column is-12 has-text-centered">
        <div class="columns is-vcentered is-centered">
          <div class="column is-2 has-text-centered">
            <nuxt-link
              target="_blank"
              rel="noopener noreferrer nofollow"
              :to="replace.originUrl"
            >
              <p class="is-size-4">
                {{ replace.originService }}
              </p>
            </nuxt-link>
          </div>
          <div class="column is-3 has-text-centered">
            <p class="is-size-6">
              {{ replace.title }}
            </p>
          </div>
          <div class="column is-3 has-text-centered">
            <p class="is-size-7">
              {{ replace.caption }}
            </p>
          </div>
          <div class="column is-2 has-text-centered">
            <p class="is-size-6">
              {{ replace.width }} x {{ replace.height }}
            </p>
          </div>
          <div class="column is-2 has-text-centered">
            <p class="is-size-6">
              {{ replace.filesize }}
            </p>
          </div>
        </div>
        <br v-if="!$store.state.user.isPC">
      </div>
    </div>
    <a class="button is-primary is-large" @click="$router.go(-1)">
      戻る
    </a>
  </section>
</template>

<script>
export default {
  validate ({ params }) {
    return /^\d+$/.test(params.id)
  },
  async asyncData ({ $axios, $auth, route, error }) {
    const id = isFinite(route.params.id) ? parseInt(route.params.id) : 1
    const response = await $axios.get(`/arts/${id}`)
    if (response.data.status !== 200) {
      return error({ statusCode: 404, message: 'err' })
    }
    const illust = response.data.data
    if (illust.user.id !== $auth.$state.user.userID && $auth.$state.user.permission !== 9) {
      return error({ statusCode: 401, message: 'err' })
    }
    return {
      illust
    }
  },
  head () {
    return {
      title: 'イラスト置き換え履歴'
    }
  }
}
</script>
