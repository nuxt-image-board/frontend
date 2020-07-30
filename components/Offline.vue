<template>
  <div class="modal" :class="{'is-active': isOffline}">
    <div class="modal-background" />
    <div class="modal-content has-text-cecntered">
      <p class="image">
        <img src="~/assets/offline.jpg" alt="">
      </p>
      <br>
      <p class="title has-text-centered has-text-white">
        オフラインです
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isOffline: false,
      connection: null
    }
  },
  created () {
    if (process.client) {
      this.connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection
    }
  },
  mounted () {
    if (this.connection) {
      navigator.connection.addEventListener('change', this.networkChanged)
    }
  },
  methods: {
    networkChanged () {
      if (this.connection.downlink === 0) {
        if (!this.isOffline) {
          this.isOffline = true
        }
      } else if (this.isOffline) {
        this.isOffline = false
      }
    }
  }
}
</script>
