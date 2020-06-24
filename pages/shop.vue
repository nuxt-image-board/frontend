<template>
  <section class="section">
    <div class="container is-widescreen">
      <h1 class="title has-text-centered">
        ショップ (未実装 / 近日実装予定)
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
        You currently have 0 PYON.
      </h4>
      <div class="columns is-centered is-mobile">
        <div class="column is-4 is-centered has-text-centered">
          <button class="button is-primary" disabled>
            取引履歴へ
          </button>
        </div>
        <div class="column is-4 is-centered has-text-centered">
          <button class="button is-primary" disabled>
            PYON贈与へ
          </button>
        </div>
      </div>
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
