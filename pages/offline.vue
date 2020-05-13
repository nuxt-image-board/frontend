<template>
  <section class="section">
    <div class="container">
      <div class="columns is-centered is-vcentered">
        <div class="column has-text-centered is-one-third-touch is-half-desktop has-image-centered">
          <img src="logo.png" alt="***REMOVED*** logo">
        </div>
        <div class="column is-half">
          <div class="container has-text-centered is-vcentered">
            <h3 class="title has-text-centered">
              <Notification
                icon="info"
                classes="is-danger"
                title=" オフラインです"
              />
            </h3>
            <h3 class="subtitle has-text-centered">
              ***REMOVED***はその特性上、オフラインで動作しない仕様です。動作するなら全画像がスマホに保存されてやばいです。インターネットに接続してから、再度起動してください。
            </h3>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
.has-image-centered {
  margin-left: auto;
  margin-right: auto;
}
</style>

<script>
import Notification from '~/components/ui/Notification.vue'

export default {
  auth: false,
  components: {
    Notification
  },
  head () {
    return {
      title: 'オフライン'
    }
  }
}
</script>
