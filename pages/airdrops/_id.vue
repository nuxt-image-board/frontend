<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="columns is-centered">
          <div class="column is-6 has-image-centered">
            <h4 class="title">
              Hey guys!
            </h4>
            <h3 class="subtitle">
              We have a gift for you!
            </h3>
            <img src="~/static/gift.png">
            <br>
            <br>
            <div class="box has-image-centered">
              <h4 class="title">
                {{ name }}
              </h4>
              <h3 class="subtitle">
                {{ description }}
              </h3>
              <button class="button is-primary is-large" :disabled="!receivable" @click="claimAirdrop(id)">
                {{ receivable ? '受け取る' : '受け取り済みです' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import * as base32 from 'hi-base32'

export default {
  async asyncData ({ $axios, error, route }) {
    try {
      // IDを得て、base32デコードする
      const id = parseInt(base32.decode(route.params.id.split('_')[0].toUpperCase() + '===')) || 0
      const resp = await $axios.get('/toymoney/airdrops/' + id + '/status')
      return resp.data
    } catch (err) {
      return error({ statusCode: 404, message: 'err' })
    }
  },
  methods: {
    async claimAirdrop (airdropID) {
      await this.$axios.post(`/toymoney/airdrops/${airdropID}/claim`)
      this.$router.push('/wallet')
    }
  },
  head () {
    return {
      title: 'エアドロップ受け取り'
    }
  }
}
</script>
