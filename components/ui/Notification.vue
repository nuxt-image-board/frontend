<template>
<div class="subtitle notification is-success">
  <span><i class="fas fa-info"></i></span>
  <span>{{ title }}</span>
</div>
</template>

<script>
export default {
  props: [
    'title'
  ]
}
</script>
