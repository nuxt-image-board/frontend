<template>
  <section class="section">
    <div class="container is-widescreen">
      <h1 class="title">
        認証中 / Authorizating
      </h1>
    </div>
  </section>
</template>

<script>
export default {
  async created () {
    if (this.$route.query.hash) {
      const hash = this.$route.query.hash
      delete this.$route.query.hash
      await this.$axios.post(
        '/accounts/' + this.$auth.$state.user.userID + '/connect/telegram',
        { hash, resp: this.$route.query }
      )
    }
    this.$router.push({ path: '/profile' })
  },
  head () {
    return {
      title: 'Telegram連携'
    }
  }
}
</script>
