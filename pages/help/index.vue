<template>
  <section class="section">
    <div class="container is-widescreen">
      <div class="columns is-multiline is-centered">
        <div class="column is-10">
          <div class="columns is-multiline is-centered">
            <div class="column is-12  has-text-centered">
              <p class="is-size-2">
                何かお困りですか?
              </p>
            </div>
            <div class="column is-8">
              <input type="text" class="input is-medium" placeholder="検索ワードをご入力ください(パスワード, パスワード, パスワードなど)">
            </div>
            <div class="column is-8 box has-text-centered">
              <p class="subtitle">
                たぶんよくある質問
              </p>
              <p v-for="f in faq" :key="f" class="is-size-6">
                <nuxt-link :to="`/help/articles/${f}`">
                  パスワードを忘れてしまいました
                </nuxt-link>
              </p>
            </div>
          </div>
          <div class="columns is-multiline is-gapless is-centered">
            <div v-for="c in categories" :key="c" class="column is-4-desktop is-6">
              <nuxt-link class="button is-size-4 is-large is-fullwidth" :to="`/help/categories/${c.url}`">
                {{ $t(c.url) }}
              </nuxt-link>
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
      faq: ['a', 'b', 'c', 'd', 'e']
    }
  },
  head () {
    return {
      title: 'ヘルプ'
    }
  }
}
</script>
