<template>
  <section class="section">
    <div class="container">
      <Notification
        icon="info"
        :deletable="notificationDeletable"
        :title="notificationText"
        :classes="notificationClasses"
        :deleted="notificationDeleted"
        @deleted-event="deletedEvent"
      />
    </div>
  </section>
</template>

<script>
import Notification from '~/components/ui/Notification.vue'

export default {
  auth: false,
  components: {
    Notification
  },
  data () {
    return {
      notificationText: '',
      notificationClasses: 'is-success',
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
