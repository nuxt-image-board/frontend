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
                title=" メンテナンス中です!!"
              />
            </h3>
            <h3 class="subtitle has-text-centered">
              現在***REMOVED***はがんばってメンテナンス中です。メンテが開けたら何かが変わります、たぶん。急用の際は青い鳥や緑のクルクルからご連絡ください。
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
  }
}
</script>
