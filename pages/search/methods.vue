<template>
  <section class="section">
    <div class="container">
      <h4 class="title has-text-centered">
        検索方法
      </h4>
      <div class="columns is-mobile is-multiline">
        <div
          v-for="p in page_buttons"
          :key="p.title"
          class="column is-6"
        >
          <nuxt-link class="button is-fullwidth is-medium is-primary" :to="p.title != '投稿者' ? p.to : '#'">
            <Fas :i="p.icon" />&nbsp;{{ p.title }}
          </nuxt-link>
        </div>
      </div>
      <h4 class="subtitle has-text-centered">
        検索履歴
      </h4>
      <div class="columns is-mobile is-multiline">
        <div
          v-for="(p,index) in $store.state.user.searchHistory"
          :key="index"
          class="column is-6"
        >
          <nuxt-link class="button is-fullwidth" :to="`/search/${p.type}/${p.id}`">
            <Fas v-if="p.type == 'artist'" i="paint-brush" />
            <Fas v-else-if="p.type == 'character'" i="users" />
            <Fas v-else i="tags" />
            <span>&nbsp; {{ p.title }}</span>
          </nuxt-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Fas from '~/components/ui/Fas.vue'

export default {
  components: {
    Fas
  },
  data () {
    return {
      page_buttons: [
        {
          to: '/search/keyword?query=',
          icon: 'keyboard',
          title: 'ワード'
        },
        {
          to: '/list/character',
          icon: 'users',
          title: 'キャラ'
        },
        {
          to: '/list/tag',
          icon: 'tags',
          title: 'タグ'
        },
        {
          to: '/list/artist',
          icon: 'paint-brush',
          title: '絵師'
        },
        {
          to: '/list/uploader',
          icon: 'user',
          title: '投稿者'
        },
        {
          to: '/search/image',
          icon: 'image',
          title: '画像'
        }
      ]
    }
  }
}
</script>
