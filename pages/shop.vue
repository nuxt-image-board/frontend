<template>
  <section class="section">
    <div class="container is-widescreen">
      <h1 class="title has-text-centered">
        ショップ
      </h1>
      <div class="columns is-centered">
        <div class="column is-6 is-centered has-text-centered">
          <p>
            イラストを登録することにより、PYONと呼ばれる特別なボーナスポイントを獲得できます。
            これは、このサイトの情報量を高め、より検索エンジンとしてふさわしい状態を保つのに協力した方々への報酬であり、
            PYONを交換することで閲覧をより快適にすることができます。
            PYONはイラスト投稿の他に デイリーボーナスで入手することもできます。
          </p>
        </div>
      </div>
      <h4 class="subtitle has-text-centered">
        あなたは現在 {{ money }} PYON を所持しています。
      </h4>
      <div class="columns is-centered">
        <div class="column is-8">
          <div class="table-container">
            <table class="table is-fullwidth is-striped">
              <thead>
                <tr>
                  <th>商品</th>
                  <th style="min-width:200px;">
                    説明
                  </th>
                  <th>価格</th>
                  <th>取引</th>
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
                      {{ !obtainedProducts.includes(p.id) ? '購入する' : '購入済み' }}
                    </button>
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
