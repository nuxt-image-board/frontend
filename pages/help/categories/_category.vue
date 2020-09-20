<template>
  <section class="section">
    <div class="container is-widescreen">
      <div class="columns is-multiline is-centered has-text-centered">
        <div class="column is-10">
          <div class="columns">
            <div class="column is-12">
              <p class="is-size-2">
                {{ $t($route.params.category) }}
              </p>
            </div>
          </div>
          <!-- サブカテゴリがある -->
          <div v-if="category['categories']" class="columns is-multiline is-centered">
            <div v-for="c in category['categories']" :key="c" class="column is-6">
              <p class="title">
                {{ $t(c) }}
              </p>
              <nuxt-link
                v-for="a in categories.find(sub => sub.url === c).articles"
                :key="a"
                :to="`/help/articles/${a}`"
                class="button is-medium is-fullwidth"
              >
                {{ $t(a).title }}
              </nuxt-link>
            </div>
          </div>
          <!-- サブカテゴリがない場合 -->
          <div v-else class="columns is-multiline is-centered has-text-centered">
            <div v-for="a in category.articles" :key="a" class="column is-6">
              <nuxt-link
                :to="`/help/articles/${a}`"
                class="button is-medium is-fullwidth"
              >
                {{ $t(a).title }}
              </nuxt-link>
            </div>
          </div>
          <div class="columns is-centered">
            <div class="column is-10">
              <button class="button is-info is-fullwidth is-large" @click="$router.back(-1)">
                {{ $t('help.back') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import categories from '@/assets/texts/categories.json'

export default {
  auth: false,
  validate ({ params }) {
    return categories.map(c => c.url).includes(params.category)
  },
  data () {
    return {
      categories,
      category: categories.find(c => c.url === this.$route.params.category)
    }
  },
  head () {
    return {
      title: 'ヘルプカテゴリ'
    }
  }
}
</script>
