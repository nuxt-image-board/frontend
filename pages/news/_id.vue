<template>
  <section class="section">
    <div class="container is-widescreen">
      <div class="columns is-flex is-vcentered is-centered">
        <div class="column is-8 is-vcentered">
            <div class="card">
                <header class="card-header">
                    <div class="card-header-title">
                        <div class="container">
                            <div class="columns is-vcentered">
                                <div class="column is-8">
                                    <h1 class="title has-text-centered">
                                        {{ news.title }}
                                    </h1>
                                </div>
                                <div class="column is-4">
                                    <h1 class="subtitle has-text-centered">
                                        {{ news.date }}
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <div class="card-content">
                    <div class="content has-text-centered">
                        {{ news.body }}
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  async asyncData ({ $axios, error, route }) {
    const id = isFinite(route.params.id) ? parseInt(route.params.id) : 1
    const resp = await $axios.get('/news/' + id)
    if (resp.status !== 200) {
      return error({ statusCode: 404, message: 'err' })
    }
    return { news: resp.data.data }
  }
}
</script>
