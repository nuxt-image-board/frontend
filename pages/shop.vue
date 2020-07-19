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
                <tr v-for="p in products" :key="p.title">
                  <td>
                    <p :style="{'margin-left': p.margin +'px'}">
                      {{ p.title }}
                    </p>
                  </td>
                  <td>{{ p.description }}</td>
                  <td>{{ p.price }} PYON</td>
                  <td>
                    <button class="button is-primary" disabled>
                      購入
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
import { products } from '~/assets/texts/products.json'

export default {
  async asyncData ({ $axios, error, route }) {
    try {
      const user = await $axios.get('/toymoney/users/assets')
      return { money: user.data.money, assets: user.data.assets }
    } catch (err) {
      return error({ statusCode: 502, message: 'err' })
    }
  },
  data () {
    return {
      products
    }
  },
  head () {
    return {
      title: 'ショップ'
    }
  }
}
</script>
