<template>
  <section class="section">
    <div id="top" class="container">
      <div class="columns is-centered is-vcentered">
        <div class="column is-half">
          <h3 class="title has-text-centered">
            ログアウトしています
          </h3>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  auth: false,
  layout: 'default',
  created () {
    this.$auth.logout()
    this.$router.push('/login')
  },
  head () {
    return {
      title: 'ログアウト'
    }
  }
}
</script>
