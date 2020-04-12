<template>
  <article class="message">
    <div class="message-header is-rounded" @click="openAccordion = !openAccordion">
      <p>{{ title }}</p>
      <button v-if="openAccordion" class="button is-dark is-rounded is-small">
        &#9650;
      </button>
      <button v-if="!openAccordion" class="button is-dark is-rounded is-small">
        &#9660;
      </button>
    </div>
    <div v-if="openAccordion" class="message-body" v-html="text" />
  </article>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      openAccordion: false
    }
  }
}
</script>
