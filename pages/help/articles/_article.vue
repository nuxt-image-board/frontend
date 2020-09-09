<template>
  <section class="section">
    <div class="container is-widescreen">
      <div class="columns is-centered">
        <div class="column is-9 box">
          <div class="columns is-multiline is-centered has-text-centered">
            <p class="column is-10 is-size-4">
              {{ article.title }}
            </p>
            <p v-for="b in article.body" :key="b" class="column is-12" v-html="b" />
          </div>
          <div class="columns is-centered has-text-centered is-multiline">
            <div class="column is-12">
              <p class="is-size-5">
                この記事はお役に立ちましたか?
              </p>
            </div>
            <div class="column is-12">
              <p class="is-size-7">
                {{ yakunitatta }}名の方が役に立ったと言っています
              </p>
              <p class="is-size-7">
                {{ yakunitatanakatta }}名の方が役に立たなかったと言っています
              </p>
            </div>
            <div class="column is-6">
              <button class="button is-primary" @click="yakunitatta += 1">
                役に立った
              </button>
              <button class="button is-secondary" @click="yakunitatta += 1">
                役に立たなかった
              </button>
            </div>
            <div class="column is-10">
              <button class="button is-info is-large is-fullwidth" @click="$router.back(-1)">
                戻る
              </button>
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
      article: this.$t(this.$route.params.article),
      yakunitatta: 0,
      yakunitatanakatta: 0
    }
  },
  mounted () {
    console.log(this.article)
    this.yakunitatta = Math.floor(Math.random() * 51)
    this.yakunitatanakatta = Math.floor(Math.random() * 4)
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
