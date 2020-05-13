<template>
  <section class="section">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-half">
          <Notification
            icon="info"
            :deletable="notificationDeletable"
            :title="notificationText"
            :classes="notificationClasses"
            :deleted="notificationDeleted"
            @deleted-event="deletedEvent"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Notification from '~/components/ui/Notification.vue'

export default {
  components: {
    Notification
  },
  data () {
    return {
      notificationText: '今後実装予定です',
      notificationClasses: 'is-warning',
      notificationDeleted: false,
      notificationDeletable: true
    }
  },
  methods: {
    deletedEvent () {
      this.notificationDeleted = true
    }
  }
}
</script>
