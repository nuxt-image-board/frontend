<template>
  <section class="section">
    <div class="container is-widescreen">
      <div class="columns is-centered">
        <div class="column is-10">
          <div class="columns is-multiline is-centered has-text-centered box">
            <p class="column is-10 is-size-2">
              {{ article.title }}
            </p>
            <div v-for="b in article.body" :key="b">
              <p class="column" v-html="b" />
            </div>
          </div>
          <div class="columns is-centered has-text-centered is-multiline">
            <div class="column is-12">
              <p class="is-size-5">
                この記事はお役に立ちましたか?
              </p>
            </div>
            <div class="column is-12">
              <p class="is-size-7">
                0名の方が役に立ったと言っています
              </p>
              <p class="is-size-7">
                0名の方が役に立たなかったと言っています
              </p>
            </div>
            <div class="column is-6">
              <p class="button is-primary">
                役に立った
              </p>
              <p class="button is-secondary">
                役に立たなかった
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  auth: false,
  data () {
    return {
      article: this.$t(this.$route.params.article)
    }
  },
  mounted () {
    console.log(this.article)
    if (typeof (this.article) !== 'object') {
      this.$router.go(-1)
    }
  },
  head () {
    return {
      title: 'ヘルプ記事'
    }
  }
}
</script>
