<template>
  <div>
    <main>
      <section class="section">
        <div class="container is-widescreen has-text-centered" style="min-height: 90vh;">
          <div class="notification is-danger">
            <p class="title is-1">
              {{ error.statusCode }}
            </p>
            <p v-if="error.statusCode in errors" class="subtitle is-3">
              {{ errorMsg }}
            </p>
            <p v-else class="subtitle is-3">
              エラーが発生しました
              {{ errors }}
            </p>
          </div>
          <img class="error-img" src="~/static/error.jpg">
          <nuxt-link class="button is-primary is-large is-fullwidth" to="/">
            トップページへ
          </nuxt-link>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import { errors } from '~/assets/texts/errors.json'

export default {
  props: {
    error: {
      type: Object,
      default: () => {
        return {
          statusCode: 200
        }
      }
    }
  },
  data () {
    return {
      errorMsg: '',
      errors
    }
  },
  mounted () {
    this.errorMsg = this.errors[this.error.statusCode][Math.floor(Math.random() * errors[this.error.statusCode].length)]
  },
  head () {
    return {
      title: 'エラー'
    }
  }
}
</script>

<style>
.error-img {
  max-width: 100%;
  height: auto;
  max-height: 50vh;
}
</style>
