<template>
  <div>
    <NavbarUp />
    <main>
      <nuxt />
    </main>
    <NavbarDown />
  </div>
</template>

<script>
import NavbarUp from '~/components/NavbarUp.vue'
import NavbarDown from '~/components/NavbarDown.vue'

export default {
  middleware: [
    'auth'
  ],
  components: {
    NavbarUp,
    NavbarDown
  },
  serverPrefetch () {
    return this.$store.dispatch('getNavigations')
  }
}
</script>

<style>
* {
    font-family: 'Noto Sans', sans-serif;
}
.title {
    font-family: 'Arvo', serif;
}
main {
    min-height:87vh;
}
.navbar,.navbar-menu,.navbar-link:hover,.navbar-item:focus,.navbar-dropdown,.dropdown-item:hover,.navbar-item:hover{
    background-color: #7b5544 !important;
}
.navbar-link::after {
    border: 1px solid #fff !important;
    border-right: 0 !important;
    border-top: 0 !important;
    content: " ";
    display: block;
    height: .5em;
    pointer-events: none;
    position: absolute;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
    -webkit-transform-origin: center;
    transform-origin: center;
    width: .5em;
    margin-top: -.375em;
    right: 1.125em;
    top: 50%;
}

/*
必要なページに後で移動する
*/

a:hover{
    color: #0000FF !important;
}
</style>
