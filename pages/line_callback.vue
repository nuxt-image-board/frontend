<template>
<section class="section">
<div class="container is-widescreen">
<h1 class="title">認証中</h1>
</div>
</section>
</template>

<script>
export default {
  auth: false,
  data () {
    return {
      form: {
        id: '',
        password: '',
        code: ''
      }
    }
  },
  async created () {
    if (process.client) {
      if (this.$route.query.code) {
        this.form.code = this.$route.query.code
        await this.$auth.loginWith('local', { data: this.form })
        this.$router.push({ path: '/' })
      } else {
        this.$router.push({ path: '/login' })
      }
    }
  }
}
</script>
