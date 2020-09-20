<template>
  <section class="section">
    <div class="container is-widescreen">
      <div class="columns is-multiline is-centered">
        <div class="column is-10">
          <div class="columns is-multiline is-centered">
            <div class="column is-12  has-text-centered">
              <p class="is-size-2">
                {{ $t('help.title') }}
              </p>
            </div>
            <div class="column is-8 box has-text-centered">
              <p class="subtitle">
                {{ $t('help.frequently.title') }}
              </p>
              <p v-for="(f,i) in faq" :key="i" class="is-size-6">
                <nuxt-link :to="`/help/articles/${f}`">
                  {{ $t(`help.frequently.articles.${f}`) }}
                </nuxt-link>
              </p>
            </div>
          </div>
          <div class="columns is-multiline is-gapless is-centered">
            <div v-for="c in categories" :key="c.url" class="column is-4-desktop is-6">
              <nuxt-link v-if="!c['hidden-on-logout'] || (c['hidden-on-logout'] && $auth.loggedIn)" class="button is-size-4 is-large is-fullwidth" :to="`/help/categories/${c.url}`">
                {{ $t(c.url) }}
              </nuxt-link>
              <button v-else class="button is-size-4 is-large is-fullwidth" disabled>
                ?
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
  data () {
    return {
      categories: categories.filter(c => !c['sub-category']),
      faq: ['forgot-password-logouted', 'forgot-password-logouted', 'forgot-password-logouted']
    }
  },
  head () {
    return {
      title: 'ヘルプ'
    }
  }
}
</script>
