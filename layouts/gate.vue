<template>
  <div id="top">
    <client-only>
      <notifications v-if="$device.isDesktop" classes="my-notify" width="30%" position="top right" group="default" />
      <notifications v-else classes="my-notify-mobile" width="90%" position="top center" group="default" />
    </client-only>
    <header>
      <nav class="navbar">
        <div class="container">
          <div class="navbar-brand">
            <nuxt-link to="/" class="navbar-item has-text-white" style="font-weight:bold;">
              {{ $t('site_name') }}
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
                      <span>{{ $t('gate.text.link') }}</span>
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
    <NavbarDown />
  </div>
</template>

<script>
import NavbarDown from '@/components/NavbarDown.vue'
import Fas from '@/components/ui/Fas.vue'

export default {
  components: {
    Fas,
    NavbarDown
  },
  data () {
    return {
      openMenu: false
    }
  }
}
</script>
