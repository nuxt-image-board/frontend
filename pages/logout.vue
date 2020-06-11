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
  layout: 'default',
  created () {
    if (process.client) {
    }
  },
  head () {
    return {
      title: 'ログアウト'
    }
  }
}
</script>
