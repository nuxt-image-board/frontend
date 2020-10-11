<template>
  <section class="section">
    <div class="container is-widescreen has-text-centered">
      <h1 class="title">
        {{ $t(`shop.title.${shopName}`) }}
      </h1>
      <p class="subtitle">
        {{ $t(`shop.description.${shopDescription}`) }}
      </p>
      <h4 class="subtitle">
        {{ $t('shop.currently_have', [money]) }}
      </h4>
      <div class="columns is-centered is-multiline">
        <div v-if="shopId == 2" class="column is-9">
          <table v-if="$store.state.user.isPC" class="table is-fullwidth is-striped">
            <thead>
              <tr>
                <th>グリーンスター</th>
                <th>レッドスター</th>
                <th>ブルースター</th>
              </tr>
            </thead>
            <tbody>
              <tr class="is-size-5">
                <td>x0</td>
                <td>x0</td>
                <td>x0</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="columns box mx-1 is-centered is-vcentered is-size-5">
            <div class="column is-4">
              <p>グリーンスター</p>
              <p>x0</p>
            </div>
            <div class="column is-4">
              <p>レッドスター</p>
              <p>x0</p>
            </div>
            <div class="column is-4">
              <p>ブルースター</p>
              <p>x0</p>
            </div>
          </div>
        </div>
        <div class="column is-9">
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
          <div v-else>
            <div v-for="p in products" :key="p.id" class="box">
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
      <a class="button is-primary is-large" @click="$router.go(-1)">
        戻る
      </a>
    </div>
  </section>
</template>

<script>

export default {
  validate ({ params }) {
    return /^\d+$/.test(params.id)
  },
  async asyncData ({ $axios, error, route }) {
    try {
      const user = await $axios.get('/toymoney/users/assets')
      const productIds = user.data.assets.map(a => a.id)
      const shopId = isFinite(route.params.id) ? parseInt(route.params.id) : 1
      const prod = await $axios.get(`/toymoney/machines/${shopId}`, { useCache: true })
      return {
        money: user.data.money,
        shopName: prod.data.name,
        shopDescription: prod.data.description,
        products: prod.data.products,
        obtainedProducts: productIds,
        shopId
      }
    } catch (err) {
      return error({ statusCode: 502, message: 'err' })
    }
  },
  methods: {
    async buyProduct (productId, productPrice) {
      const resp = await this.$axios.post(`toymoney/machines/${this.shopId}/${productId}/buy`)
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
