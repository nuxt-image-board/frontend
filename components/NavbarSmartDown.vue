<template>
  <nav class="navbar is-link is-fixed-bottom" role="navigation">
    <div class="navbar-brand">
      <nuxt-link to="/search/list" class="navbar-item is-expanded is-block has-text-centered has-background-link">
        <Fas i="list" />
        <p class="is-size-7">
          一覧
        </p>
      </nuxt-link>
      <nuxt-link to="/upload" class="navbar-item is-expanded is-block has-text-centered has-background-link">
        <Fas i="upload" />
        <p class="is-size-7">
          投稿
        </p>
      </nuxt-link>
      <nuxt-link to="/search/image" class="navbar-item is-expanded is-block has-text-centered has-background-link">
        <Fas i="search" />
        <p class="is-size-7">
          検索
        </p>
      </nuxt-link>
      <nuxt-link to="/profile" class="navbar-item is-expanded is-block has-text-centered has-background-link">
        <Fas i="user" />
        <p class="is-size-7">
          設定
        </p>
      </nuxt-link>
    </div>
  </nav>
</template>

<script>
import Fas from '~/components/ui/Fas.vue'

export default {
  components: {
    Fas
  }
}
</script>
