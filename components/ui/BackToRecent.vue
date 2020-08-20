<template>
  <a
    class="back-button"
    :class="{'has-bottom': $store.state.user.useBottom, 'no-bottom': !$store.state.user.useBottom}"
    @click="$router.go(-1)"
  >
    <Fas i="arrow-left" classes="back-icon" />
  </a>
</template>

<script>
import Fas from '~/components/ui/Fas.vue'

export default {
  components: {
    Fas
  }
}
</script>
