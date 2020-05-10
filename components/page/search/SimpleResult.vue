<template>
  <div class="card">
    <div class="card-image">
      <a :href="link">
        <figure class="image">
          <img :src="thumbnail" decoding="async">
        </figure>
      </a>
    </div>
    <div class="card-footer">
      <a class="card-footer-item" :href="link">
        <span class="icon is-small">
          <Fas i="external-link-alt" />
        </span>
      </a>
    </div>
  </div>
</template>

<script>
import Fas from '~/components/ui/Fas.vue'

export default {
  components: {
    Fas
  },
  props: {
    link: {
      type: String,
      default: ''
    },
    thumbnail: {
      type: String,
      default: ''
    }
  }
}
</script>
