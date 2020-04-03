<template>
<section class="section">
<div class="container is-widescreen">
<h1 class="title">認証中</h1>
</div>
</section>
</template>

<script>
export default {
  async created () {
    if (this.$route.query.code) {
      const code = this.$route.query.code
      const response = await this.$axios.post(
        '/accounts/' + this.$auth.$state.user.userID + '/connect/line',
        { code }
      )
      console.log(response.data)
    }
    this.$router.push({ path: '/profile' })
  }
}
</script>
