<template>
  <section class="section">
    <div class="container is-widescreen">
      <h1 class="title">
        認証中
      </h1>
    </div>
  </section>
</template>

<script>
export default {
  async created () {
    if (this.$route.query.code) {
      const code = this.$route.query.code
      await this.$axios.post(
        '/accounts/' + this.$auth.$state.user.userID + '/connect/line_notify',
        { code }
      )
    }
    this.$router.push({ path: '/profile' })
  },
  head () {
    return {
      title: 'LINE通知連携'
    }
  }
}
</script>
