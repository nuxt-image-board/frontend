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
      isOffline: false
    }
  },
  mounted () {
    window.addEventListener('offline', this.toggleNetworkStatus)
    window.addEventListener('online', this.toggleNetworkStatus)
  },
  methods: {
    toggleNetworkStatus () {
      this.isOffline = !this.isOffline
    }
  }
}
</script>
