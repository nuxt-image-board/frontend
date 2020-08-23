<template>
  <section class="hero is-fullheight" style="height:50vh;">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-6 has-text-centered">
            <h4 class="title">
              キーワード検索
            </h4>
            <p>
              検索したいキーワードを入力してください
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
              検索
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
  head () {
    return {
      title: 'キーワード検索'
    }
  }
}
</script>
