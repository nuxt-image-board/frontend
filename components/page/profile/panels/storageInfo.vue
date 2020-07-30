<template>
  <nav class="panel">
    <p class="panel-heading has-text-dark has-background-chino">
      ストレージ情報
    </p>
    <p class="panel-block">
      ストレージ使用割合: {{ usage_percent }}%
    </p>
    <p class="panel-block">
      ストレージ使用量(概算値): {{ formatBytes(usage) }}
    </p>
    <p class="panel-block">
      利用可能容量(概算値): {{ formatBytes(quota) }}
    </p>
    <p class="panel-block">
      <button
        class="button is-danger is-outlined is-fullwidth"
        @click="deleteCache"
      >
        一時データ削除
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
