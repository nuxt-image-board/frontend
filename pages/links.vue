<template>
  <section class="section">
    <div class="container is-widescreen">
      <h1 class="title has-text-centered">
        リンク集
      </h1>
      <div class="columns is-centered is-multiline">
        <div v-for="article in articles" :key="article.title" class="column is-4-desktop is-6-tablet">
          <div class="card">
            <a :href="article.link" target="_blank" rel="noopener noreferrer nofollow">
              <div class="card-content">
                <div class="has-text-dark">
                  <div class="container">
                    <div class="columns is-mobile is-vcentered is-centered">
                      <div v-if="article.img != '#'" class="column is-6-touch is-8-hd">
                        <figure class="image is-128x128 has-image-centered">
                          <img :src="'../links/'+article.img" :alt="article.title + 'logo image'" decoding="async">
                        </figure>
                      </div>
                      <div class="column is-6-touch is-4-hd has-text-centered">
                        <p class="title has-text-centered">
                          <a class="has-text-dark">
                            {{ article.title }}
                          </a>
                        </p>
                        <p class="subtitle has-text-centered">
                          <a class="has-text-dark">
                            {{ article.link }}
                          </a>
                        </p>
                      </div>
                    </div>
                    <div class="content columns is-vcentered is-centered">
                      {{ article.description }}
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
.card {
  height: 100%;
}
</style>

<script>
import { articles } from '~/assets/texts/links.json'
export default {
  data () {
    return {
      articles
    }
  },
  head () {
    return {
      title: 'リンク集'
    }
  }
}
</script>
