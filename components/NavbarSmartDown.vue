<template>
  <nav class="navbar is-link is-fixed-bottom" role="navigation">
    <div class="navbar-brand">
      <nuxt-link
        v-for="b in bottom_buttons"
        :key="b.title"
        :to="b.to"
        class="bottom-button navbar-item is-block has-text-centered has-background-link"
      >
        <Fas :i="b.icon" />
        <p class="is-size-7">
          {{ b.title }}
        </p>
      </nuxt-link>
    </div>
  </nav>
</template>

<script>
import Fas from '@/components/ui/Fas.vue'

export default {
  components: {
    Fas
  },
  data () {
    return {
      bottom_buttons: [
        { to: '/search/list', icon: 'home', title: this.$t('NavbarSmartDown.home') },
        { to: '/search/methods', icon: 'search', title: this.$t('NavbarSmartDown.search') },
        { to: '/upload', icon: 'upload', title: this.$t('NavbarSmartDown.upload') },
        { to: '/mylist', icon: 'bookmark', title: this.$t('NavbarSmartDown.mylist') },
        { to: '/profile', icon: 'user', title: this.$t('NavbarSmartDown.settings') }
      ]
    }
  }
}
</script>

<style scoped>
.bottom-button{
  width: 20%;
}
</style>
