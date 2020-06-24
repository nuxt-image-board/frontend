<template>
  <a
    class="back-button"
    :class="{'back-has-bottom': $store.state.user.useBottom, 'back-no-bottom': !$store.state.user.useBottom}"
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

<style>
.back-has-bottom {
  bottom: 65px;
}
.back-no-bottom {
  bottom: 20px;
}

.back-button {
  position: fixed;
  left: 20px;
  background-color: #000;
  padding: 10px 13px;
  border-radius: 32px;
}
.back-icon {
  font-weight: bold;
  font-size: 20px;
  color: #fff;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
