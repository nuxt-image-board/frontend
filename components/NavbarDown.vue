<template>
  <footer style="background-color: #7b5544;">
    <nav class="level" style="background-color: #7b5544; padding: .5rem 1rem;">
      <p class="level-item has-text-centered">
        <nuxt-link to="/terms" class="is-size-6 link has-text-white heading">
          <span class="icon"><Fas i="users" /></span>
          <span>{{ $t('NavbarDown.terms') }}</span>
        </nuxt-link>
      </p>
      <p class="level-item has-text-centered">
        <nuxt-link to="/privacy" class="is-size-6 has-text-white heading">
          <span class="icon"><Fas i="pen-fancy" /></span>
          <span>{{ $t('NavbarDown.privacy') }}</span>
        </nuxt-link>
      </p>
      <p class="level-item has-text-centered">
        <nuxt-link to="/help" class="is-size-6 has-text-white heading">
          <span class="icon"><Fas i="question-circle" /></span>
          <span>{{ $t('NavbarDown.help') }}</span>
        </nuxt-link>
      </p>
      <p v-if="$auth.loggedIn" class="level-item has-text-centered">
        <nuxt-link to="/links" class="is-size-6 has-text-white heading">
          <span class="icon"><Fas i="sitemap" /></span>
          <span>{{ $t('NavbarDown.links') }}</span>
        </nuxt-link>
      </p>
    </nav>
  </footer>
</template>

<script>
import Fas from '@/components/ui/Fas.vue'

export default {
  components: {
    Fas
  }
}
</script>
