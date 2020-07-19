<template>
  <section class="section">
    <div class="container is-wide">
      <div class="tile is-ancestor">
        <div class="tile is-6">
          <div class="tile is-parent is-vertical">
            <article class="tile is-child notification has-background-cocoa">
              <p class="title">
                <Fas i="wallet" />
                <span>PYON Wallet</span>
              </p>
              <p class="title">
                所持: {{ money }} PYON
              </p>
            </article>
            <article class="tile is-child notification has-background-cocoa">
              <p class="title">
                ボーナス
              </p>
              <p class="subtitle">
                もっと稼ぎたい? ならボーナスガチャを回しましょう!
              </p>
              <table class="table is-fullwidth centered-table">
                <tbody>
                  <tr v-for="b in bonus" :key="b.id">
                    <td>
                      <div>
                        <p class="is-size-5">
                          {{ b.name }}
                        </p>
                        <p class="is-size-7">
                          {{ b.description }}
                        </p>
                      </div>
                    </td>
                    <td>
                      <button class="button is-info" :disabled="!b.receivable" @click="claimAirdrop(b.id)">
                        {{ b.receivable ? '受け取る' : '受け取り済み' }}
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </article>
          </div>
        </div>
        <div class="tile is-parent is-vertical">
          <article class="tile is-child notification has-background-cocoa">
            <div class="content">
              <p class="title">
                取引履歴
              </p>
              <table class="table is-fullwidth centered-table">
                <thead>
                  <tr>
                    <th align="center">
                      ID
                    </th>
                    <th align="center">
                      日付時刻
                    </th>
                    <th align="center">
                      内容
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="t in transaction" :key="t.id">
                    <td>
                      {{ t.id }}
                    </td>
                    <td>
                      {{ t.reception }}
                    </td>
                    <td>
                      {{ getTransactionText(
                        t.amount,
                        t.provider_type,
                        t.provider,
                        t.reciever_type,
                        t.reciever
                      ) }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </article>
          <article class="tile is-child notification has-text-centered has-background-cocoa">
            <div>
              <nuxt-link to="/shop" class="button is-large is-primary is-fullwidth">
                <Fas i="shopping-cart" classes="has-text-white" />
                <span> ショップへ</span>
              </nuxt-link>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Fas from '~/components/ui/Fas.vue'

export default {
  components: {
    Fas
  },
  async asyncData ({ $axios, error, route }) {
    try {
      const airdrops = await $axios.get('/toymoney/airdrops/list_with_status?count=3&sort=2')
      const transactions = await $axios.get('/toymoney/users/transactions?count=3')
      const money = await $axios.get('/toymoney/users/money')
      return { bonus: airdrops.data.airdrops, transaction: transactions.data.transactions, money: money.data.money }
    } catch (err) {
      return error({ statusCode: 500, message: 'err' })
    }
  },
  data () {
    return {
      bonus: [
        { id: 1, name: '日1ログボ', caption: '1日1回 1PYONが貰えます', recieved: false },
        { id: 2, name: '週1ガチャ', caption: '1週1回 1~10PYONが貰えます', recieved: true },
        { id: 3, name: '月1ガチャ', caption: '1月1回 5~30PYONが貰えます', recieved: true }
      ],
      transaction: [
        { id: 1, reception: '2020-07-19 19:38:37', amount: 1, provider_type: 1, provider: 1, reciever_type: 0, reciever: 0 },
        { id: 2, reception: '2020-07-19 19:38:37', amount: 2, provider_type: 1, provider: 2, reciever_type: 0, reciever: 0 },
        { id: 3, reception: '2020-07-19 19:38:37', amount: 10, provider_type: 1, provider: 3, reciever_type: 0, reciever: 0 },
        { id: 4, reception: '2020-07-19 19:38:37', amount: 10, provider_type: 1, provider: 4, reciever_type: 0, reciever: 0 },
        { id: 5, reception: '2020-07-19 19:38:37', amount: 5, provider_type: 0, provider: 0, reciever_type: 0, reciever: 0 }
      ]
    }
  },
  methods: {
    async claimAirdrop (airdropID) {
      const resp = await this.$axios.post(`/toymoney/airdrops/${airdropID}/claim`)
      if (resp.status === 200) {
        this.bonus[airdropID - 1].receivable = false
        this.money = resp.data.after
        const transactions = await this.$axios.get('/toymoney/users/transactions?count=3')
        this.transaction = transactions.data.transactions
      }
    },
    getTransactionText: (a, ptype, p, rtype, r) => {
      // type一覧: 0ユーザー 1エアドロップ 2商品 3強制
      // 商品が受け取ったなら購入取引
      if (rtype === 2) {
        return `商品ID:${r}を購入し ${a}PYON消費`
      }
      // エアドロから受け取ったならエアドロ取引
      if (ptype === 1) {
        switch (p) {
          case 1:
            return `日1ログボで ${a}PYON獲得`
          case 2:
            return `週1ガチャで ${a}PYON獲得`
          case 3:
            return `月1ガチャで ${a}PYON獲得`
          default:
            return `エアドロで ${a}PYON獲得`
        }
      }
      // ユーザーID 0 から受け取ったならシステム取引
      if (ptype === 0 && p === 0) {
        switch (a) {
          case 2:
            return 'イラスト投稿で 2PYON獲得'
          default:
            return 'イラスト編集で 1PYON獲得'
        }
      }
      // それ以外なら強制取引
      return ''
    }
  },
  head () {
    return {
      title: 'ウォレット'
    }
  }
}
</script>
