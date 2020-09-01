<template>
  <section class="section">
    <div class="container is-widescreen">
      <h1 class="title has-text-centered">
        {{ $t('shop.title') }}
      </h1>
      <div class="columns is-centered">
        <div class="column is-6 is-centered has-text-centered">
          <p>
            {{ $t('shop.description') }}
          </p>
        </div>
      </div>
      <h4 class="subtitle has-text-centered">
        {{ $t('shop.currently_have', [money]) }}
      </h4>
      <div class="columns is-centered">
        <div class="column is-8">
          <div v-if="$store.state.user.isPC" class="table-container">
            <table class="table is-fullwidth is-striped">
              <thead>
                <tr>
                  <th>{{ $t('shop.table_head.product') }}</th>
                  <th style="min-width:200px;">
                    {{ $t('shop.table_head.description') }}
                  </th>
                  <th>{{ $t('shop.table_head.price') }}</th>
                  <th>{{ $t('shop.table_head.transaction') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="p in products" :key="p.id">
                  <td>
                    {{ p.name }}
                  </td>
                  <td>{{ p.description }}</td>
                  <td>{{ p.price }} PYON</td>
                  <td>
                    <button
                      class="button is-primary"
                      :disabled="obtainedProducts.includes(p.id) || money < p.price"
                      @click="buyProduct(p.id, p.price)"
                    >
                      {{ !obtainedProducts.includes(p.id) ? ( p.price > money ? $t('shop.not_enough') : $t('shop.buy') ) : $t('shop.bought') }}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else class="container">
            <div v-for="p in products" :key="p.id" class="has-text-centered">
              <p class="is-size-3">
                {{ p.name }}
              </p>
              <p class="is-size-6">
                {{ p.description }}
              </p>
              <div class="field has-addons-centered has-addons">
                <p class="control">
                  <a class="button is-static">{{ p.price }} PYON</a>
                </p>
                <p class="control">
                  <button
                    class="button is-primary"
                    :disabled="obtainedProducts.includes(p.id) || money < p.price"
                    @click="buyProduct(p.id, p.price)"
                  >
                    {{ !obtainedProducts.includes(p.id) ? ( p.price > money ? $t('shop.not_enough') : $t('shop.buy') ) : $t('shop.bought') }}
                  </button>
                </p>
                <br>
                <br>
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
    try {
      const user = await $axios.get('/toymoney/users/assets')
      const productIds = user.data.assets.map(a => a.id)
      const prod = await $axios.get('/toymoney/machines/1', { useCache: true })
      return {
        money: user.data.money,
        products: prod.data.products,
        obtainedProducts: productIds
      }
    } catch (err) {
      return error({ statusCode: 502, message: 'err' })
    }
  },
  methods: {
    async buyProduct (productId, productPrice) {
      const resp = await this.$axios.post(`toymoney/machines/1/${productId}/buy`)
      if (resp.status === 200) {
        this.obtainedProducts.push(productId)
        this.$store.commit(
          'user/setObtainedProducts', this.obtainedProducts
        )
        this.money -= productPrice
      }
    }
  },
  head () {
    return {
      title: 'ショップ'
    }
  }
}
</script>
