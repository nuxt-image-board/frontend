<template>
  <main>
    <transition name="page">
      <nuxt />
    </transition>
  </main>
</template>

<script>
export default {
  scrollToTop: true
}
</script>

<style>
 .page-enter {
   opacity: 0;
 }
 .page-enter-active {
   transition: opacity 0.6s;
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
