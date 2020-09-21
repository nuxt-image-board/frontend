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
  auth: false,
  data () {
    return {
      form: {
        hash: '',
        resp: ''
      }
    }
  },
  async created () {
    if (process.client) {
      if (this.$route.query.hash) {
        this.form.hash = this.$route.query.hash
        delete this.$route.query.hash
        this.form.query = this.$route.query
        try {
          await this.$auth.loginWith('local', { data: this.form })
          this.postLoggedIn()
          this.$router.push({ path: '/' })
        } catch (error) {
          this.$router.push({ path: '/login?err=1' })
        }
      } else {
        this.$router.push({ path: '/login' })
      }
    }
  },
  head () {
    return {
      title: 'Authorizating...'
    }
  }
}
</script>
