<template>
  <div id="top">
    <header>
      <nav class="navbar">
        <div class="container">
          <div class="navbar-brand">
            <nuxt-link to="/" class="navbar-item has-text-white" style="font-weight:bold;">
              ***REMOVED***
            </nuxt-link>
            <span class="navbar-burger burger has-text-white" :class="{ 'is-active': openMenu }" data-target="navMenu" @click="openMenu = !openMenu">
              <span />
              <span />
              <span />
            </span>
          </div>
          <div id="navMenu" class="navbar-menu" :class="{ 'is-active': openMenu }">
            <div class="navbar-end">
              <div class="navbar-item">
                <div class="field is-grouped">
                  <p class="control">
                    <a href="https://***REMOVED***" class="button is-outlined">
                      <span class="icon">
                        <Fas i="home" />
                      </span>
                      <span>***REMOVED***公式サイト</span>
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
    <main>
      <nuxt />
    </main>
  </div>
</template>

<script>
import Fas from '~/components/ui/Fas.vue'

export default {
  components: {
    Fas
  },
  data () {
    return {
      openMenu: false
    }
  },
  created () {
    if (process.client) {
      console.clear()
      console.log('%c***REMOVED***', 'color: blue; font-size: 30px')
      console.log('Do you want invite?\nYou can get invite key with self-introduce.\nPlease input your email, and describe why you want to join.')
      console.log('***REMOVED***')
    }
  }
}
</script>
