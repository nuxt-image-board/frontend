<template>
  <nav class="panel">
    <p class="panel-heading has-text-dark has-background-chino">
      {{ $t('storageInfo.title') }}
    </p>
    <p class="panel-block">
      {{ $t('storageInfo.usage_percent') }} {{ usage_percent }}%
    </p>
    <p class="panel-block">
      {{ $t('storageInfo.usage_bytes') }} {{ formatBytes(usage) }}
    </p>
    <p class="panel-block">
      {{ $t('storageInfo.useable_bytes') }} {{ formatBytes(quota) }}
    </p>
    <p class="panel-block">
      <button
        class="button is-danger is-outlined is-fullwidth"
        @click="deleteCache"
      >
        {{ $t('storageInfo.delete_button') }}
      </button>
    </p>
  </nav>
</template>

<script>
export default {
  data () {
    return {
      storage: null,
      usage: 0,
      quota: 0
    }
  },
  computed: {
    usage_percent () {
      return (this.usage / this.quota * 100).toFixed(2)
    }
  },
  created () {
    if (process.client) {
      this.storage = navigator.storage
    }
  },
  mounted () {
    this.calcurateStorage()
  },
  methods: {
    async calcurateStorage () {
      if (this.storage) {
        const fileSize = await navigator.storage.estimate()
        this.usage = (fileSize.usage / 1024).toFixed(2)
        this.quota = (fileSize.quota / 1024).toFixed(2)
      }
    },
    async deleteCache () {
      if (!window.caches) {
        return
      }
      const names = await window.caches.keys()
      for (const name of names) {
        window.caches.delete(name)
      }
      this.calcurateStorage()
    },
    formatBytes (bytes, decimals = 2) {
      if (bytes === 0) {
        return '0B'
      }
      const k = 1024
      const dm = decimals < 0 ? 0 : decimals
      const sizes = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      return parseFloat((bytes / k ** i).toFixed(dm)) + ' ' + sizes[i]
    }
  }
}
</script>
