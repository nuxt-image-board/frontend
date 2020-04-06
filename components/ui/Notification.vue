<template>
  <div class="subtitle notification is-success">
    <span><i class="fas fa-info" /></span>
    <span>{{ title }}</span>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>
