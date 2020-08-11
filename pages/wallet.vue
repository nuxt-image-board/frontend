<template>
  <section class="section">
    <div class="container is-wide">
      <div class="tile is-ancestor">
        <div class="tile is-6">
          <div class="tile is-parent is-vertical">
            <article class="tile is-child notification has-background-cocoa">
              <p class="title has-text-centered">
                <Fas i="wallet" />
                <span>PYON Wallet</span>
              </p>
              <p class="title has-text-centered">
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
              <div v-for="b in bonus" :key="b.id" class="columns is-centered is-vcentered">
                <div class="column is-9">
                  <p class="is-size-4">
                    {{ b.name }}
                  </p>
                  <p class="is-size-6">
                    {{ b.description }}
                  </p>
                  <p v-if="!b.receivable" class="is-size-6 has-text-weight-bold">
                    {{ '次回受取可能日:' + b.next_receivable.slice(0, 10) }}
                  </p>
                </div>
                <div class="column is-3">
                  <button class="button is-info is-fullwidth" :disabled="!b.receivable" @click="claimAirdrop(b.id)">
                    {{ b.receivable ? '受け取る' : '受け取り済み' }}
                  </button>
                </div>
              </div>
            </article>
          </div>
        </div>
        <div class="tile is-parent is-vertical">
          <article class="tile is-child notification has-background-cocoa">
            <p class="title">
              取引履歴
            </p>
            <div v-for="t in transaction" :key="t.id" class="columns is-vcentered is-centered">
              <div class="column is-half has-text-centered">
                <p class="is-size-4">
                  {{ t.reception.replace('T', ' ') }}
                </p>
                <p class="is-size-6">
                  {{ getTransactionText(
                    t.amount,
                    t.provider_type,
                    t.provider,
                    t.receiver_type,
                    t.receiver
                  ) }}
                </p>
              </div>
            </div>
          </article>
          <nuxt-link to="/shop" class="tile is-child notification has-text-centered is-primary is-size-4">
            <div class="columns is-vcentered is-centered" style="height:100%">
              <div class="column is-6">
                <Fas i="shopping-cart" classes="has-text-white" />
                <span> ショップへ</span>
              </div>
            </div>
          </nuxt-link>
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
      const transactions = await $axios.get('/toymoney/users/transactions?count=5')
      const money = await $axios.get('/toymoney/users/money')
      return { bonus: airdrops.data.airdrops, transaction: transactions.data.transactions, money: money.data.money }
    } catch (err) {
      return error({ statusCode: 502, message: 'err' })
    }
  },
  data () {
    return {
      bonus: [
        { id: 1, name: '日1ログボ', caption: '1日1回 1PYONが貰えます', receivable: false }
      ],
      transaction: [
        { id: 1, reception: '2020-07-19 19:38:37', amount: 1, provider_type: 1, provider: 1, receiver_type: 0, receiver: 0 }
      ]
    }
  },
  methods: {
    async claimAirdrop (airdropID) {
      const resp = await this.$axios.post(`/toymoney/airdrops/${airdropID}/claim`)
      if (resp.status === 200) {
        this.bonus[airdropID - 1].receivable = false
        this.money = resp.data.after
        const transactions = await this.$axios.get('/toymoney/users/transactions?count=5')
        this.transaction = transactions.data.transactions
      }
    },
    getTransactionText: (a, ptype, p, rtype, r) => {
      // type一覧: 0ユーザー 1エアドロップ 2商品 3強制
      // 商品が受け取ったなら購入取引
      if (rtype === 2) {
        return `商品を購入し ${a}PYON消費`
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
