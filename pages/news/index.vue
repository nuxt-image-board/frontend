<template>
  <section class="section">
    <div class="container is-widescreen">
      <h1 class="title has-text-centered">
        {{ $t('news.title') }}
      </h1>
      <div class="columns is-centered">
        <div class="column is-8">
          <div class="table-container">
            <table class="table is-hoverable is-striped is-fullwidth">
              <thead>
                <tr>
                  <th align="center">
                    {{ $t('news.table_head.type') }}
                  </th>
                  <th align="center">
                    {{ $t('news.table_head.title') }}
                  </th>
                  <th align="center">
                    {{ $t('news.table_head.date') }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="n in news" :key="n.id">
                  <td v-if="n.color == 0" class="has-background-info has-text-white" align="center">
                    {{ $t('news.types.info') }}
                  </td>
                  <td v-if="n.color == 1" class="has-background-primary has-text-white" align="center">
                    {{ $t('news.types.memo') }}
                  </td>
                  <td v-if="n.color == 2" class="has-background-success has-text-white" align="center">
                    {{ $t('news.types.update') }}
                  </td>
                  <td v-if="n.color == 3" class="has-background-warning has-text-white-dark" align="center">
                    {{ $t('news.types.announce') }}
                  </td>
                  <td v-if="n.color == 4" class="has-background-danger has-text-white" align="center">
                    {{ $t('news.types.important') }}
                  </td>
                  <td align="center">
                    <nuxt-link :to="'/news/'+n.id">
                      {{ n.title }}
                    </nuxt-link>
                  </td>
                  <td align="center">
                    {{ n.date }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  async asyncData ({ $axios, $auth, error }) {
    const resp = await $axios.get('/news/list', { useCache: true })
    if (resp.status !== 200) {
      return error({ statusCode: 502, message: 'err' })
    }
    return {
      news: resp.data.data
    }
  },
  head () {
    return {
      title: 'ニュース'
    }
  }
}
</script>
