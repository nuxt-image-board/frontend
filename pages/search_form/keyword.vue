<template>
  <section class="hero is-fullheight" style="height:50vh;">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-6 has-text-centered">
            <h4 class="title">
              {{ $t('search_form.keyword.title') }}
            </h4>
            <p>
              {{ $t('search_form.keyword.description') }}
            </p>
            <input
              v-model="query"
              placeholder="Ex. チノ"
              name="query"
              class="input is-half"
              type="text"
            >
            <button
              class="button is-primary is-fullwidth is-large"
              :disabled="!!!query"
              @click="$router.push(`/search/keyword/${query}`)"
            >
              {{ $t('search_form.keyword.search_button') }}
            </button>
            <br>
            <br>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      query: ''
    }
  },
  watch: {
    '$route' (to, from) {
      if (this.$route.query.e) {
        this.$notify({
          group: 'default',
          type: 'danger',
          duration: 2000,
          title: this.$t('search_form.keyword.title'),
          text: this.$t('search_form.keyword.notify.no_match')
        })
        this.$router.push('/search_form/keyword')
      }
    }
  },
  mounted () {
    if (this.$route.query.e) {
      this.$notify({
        group: 'default',
        type: 'danger',
        duration: 2000,
        title: this.$t('search_form.keyword.title'),
        text: this.$t('search_form.keyword.notify.no_match')
      })
      this.$router.push('/search_form/keyword')
    }
  },
  head () {
    return {
      title: this.$t('search_form.keyword.title')
    }
  }
}
</script>
