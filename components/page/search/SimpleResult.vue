<template>
  <div class="card">
    <div class="card-header has-text-centered has-background-info">
      <p class="has-text-light">
        {{ link.match(/^https?:\/{2,}(.*?)(?:\/|\?|#|$)/)[1] }}
      </p>
    </div>
    <div class="card-image">
      <a :href="link" target="_blank" rel="noopener noreferrer nofollow">
        <figure class="image">
          <img
            v-lazy="thumbnail"
            src="~/assets/images/loading.png"
          >
        </figure>
      </a>
    </div>
    <div class="card-footer">
      <a class="card-footer-item" :href="link" target="_blank" rel="noopener noreferrer nofollow">
        <span class="icon is-small">
          <Fas i="external-link-alt" />
        </span>
      </a>
      <a v-if="link.includes('pixiv')" :href="'/scrape?url=' + link" target="_blank" class="card-footer-item">
        <span class="icon is-small">
          <Fas i="plus-square" />
        </span>
      </a>
    </div>
  </div>
</template>

<script>
import Fas from '@/components/ui/Fas.vue'

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
