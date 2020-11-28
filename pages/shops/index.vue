<template>
  <section class="section">
    <div class="container is-widescreen">
      <h1 class="title has-text-centered">
        商店街
      </h1>
      <p class="subtitle is-size-6 has-text-centered">
        {{ SITE_NAME }}で使える様々なものを買える場所です
      </p>
      <div class="columns is-centered is-vcentered is-multiline">
        <nuxt-link
          v-for="m in machines"
          :key="m.id"
          :to="`/shops/${m.id}`"
          class="column has-background-white is-fullheight is-5 mx-2 mt-3"
        >
          <div class="columns is-mobile">
            <div class="column is-2 has-background-cocoa" />
            <div class="column is-10">
              <p class="subtitle">
                {{ m.name }}
              </p>
              <p class="is-size-6">
                {{ m.description }}
              </p>
            </div>
          </div>
        </nuxt-link>
      </div>
      <div class="has-text-centered">
        <a class="button is-primary is-large" @click="$router.go(-1)">
          戻る
        </a>
      </div>
    </div>
  </section>
</template>

<style>
.same-height {
  height: 100%;
}
</style>

<script>
export default {
  async asyncData ({ $axios, error, route }) {
    try {
      const machines = await $axios.get('/toymoney/machines/list', { useCache: true })
      return { machines: machines.data.machines }
    } catch (err) {
      return error({ statusCode: 502, message: 'err' })
    }
  },
  computed: {
    SITE_NAME () {
      return process.env.SITE_NAME
    }
  },
  head () {
    return {
      title: '商店街'
    }
  }
}
</script>
