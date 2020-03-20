<template>
  <div>
    <NavbarUp v-if="$store.state.auth.loggedIn" />
    <NavbarUpNoLogin v-if="!$store.state.auth.loggedIn" />
    <main>
      <nuxt />
    </main>
    <NavbarDown v-if="$store.state.auth.loggedIn" />
  </div>
</template>

<script>
import NavbarUp from '~/components/NavbarUp.vue'
import NavbarUpNoLogin from '~/components/NavbarUpNoLogin.vue'
import NavbarDown from '~/components/NavbarDown.vue'

export default {
  middleware: [
    'auth'
  ],
  components: {
    NavbarUp,
    NavbarUpNoLogin,
    NavbarDown
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
    min-height:86.5vh;
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

.star{
    user-select: none; /* CSS3 */
    -moz-user-select: none; /* Firefox */
    -webkit-user-select: none; /* Safari、Chromeなど */
    -ms-user-select: none; /* IE10かららしい */
}
a:hover{
    color: #0000FF !important;
}

.graydisplay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  max-width: 100%!important;
  height: 100vh;
  min-height: 100vh;
  background: rgba(0,0,0,0.45);
}
.graydisplay img {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  max-width: 90%;
  max-height: 90%;
  height: auto;
}
</style>
