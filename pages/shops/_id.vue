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
                <td>{{ greenStars }}</td>
                <td>{{ redStars }}</td>
                <td>{{ blueStars }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="columns box mx-1 is-centered is-vcentered is-size-5">
            <div class="column is-4">
              <p>グリーンスター</p>
              <p>{{ greenStars }}</p>
            </div>
            <div class="column is-4">
              <p>レッドスター</p>
              <p>{{ redStars }}</p>
            </div>
            <div class="column is-4">
              <p>ブルースター</p>
              <p>{{ blueStars }}</p>
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
                      :disabled="isButtonDisabled(p)"
                      @click="buyProduct(p.id, p.price)"
                    >
                      {{ getButtonMessage(p) }}
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
                    :disabled="isButtonDisabled(p)"
                    @click="buyProduct(p.id, p.price)"
                  >
                    {{ getButtonMessage(p) }}
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
      const inventory = {}
      user.data.assets.forEach((asset) => {
        inventory[asset.id] = { limit: asset.limit, count: asset.count }
      })
      prod.data.products.forEach((product) => {
        if (!inventory[product.id]) {
          inventory[product.id] = { limit: product.inventory_limit, count: 0 }
        }
      })
      return {
        money: user.data.money,
        shopName: prod.data.name,
        shopDescription: prod.data.description,
        products: prod.data.products,
        obtainedProducts: productIds,
        inventory,
        shopId
      }
    } catch (err) {
      return error({ statusCode: 502, message: 'err' })
    }
  },
  computed: {
    greenStars () {
      return `x${this.inventory[18].count}`
    },
    redStars () {
      return `x${this.inventory[19].count}`
    },
    blueStars () {
      return `x${this.inventory[20].count}`
    }
  },
  methods: {
    isButtonDisabled (product) {
      if (this.money < product.price || (this.inventory[product.id].count >= this.inventory[product.id].limit)) {
        return true
      }
      return false
    },
    getButtonMessage (product) {
      if (this.money < product.price) {
        return this.$t('shop.not_enough')
      }
      if (this.inventory[product.id].count < this.inventory[product.id].limit) {
        return this.$t('shop.buy')
      }
      return this.$t('shop.bought')
    },
    async buyProduct (productId, productPrice) {
      const resp = await this.$axios.post(`toymoney/machines/${this.shopId}/${productId}/buy`)
      if (resp.status === 200) {
        this.inventory[productId].count += 1
        if (!this.obtainedProducts.includes(productId)) {
          this.obtainedProducts.push(productId)
          this.$store.commit(
            'user/addObtainedProducts', productId
          )
        }
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
