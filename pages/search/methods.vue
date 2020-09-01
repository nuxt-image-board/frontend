<template>
  <section class="section">
    <div class="container">
      <h4 class="title has-text-centered">
        {{ $t('methods.title') }}
      </h4>
      <div class="columns is-mobile is-multiline">
        <div
          v-for="p in page_buttons"
          :key="p.title"
          class="column is-6"
        >
          <nuxt-link class="button is-fullwidth is-medium is-primary" :to="p.to">
            <Fas :i="p.icon" />&nbsp;{{ $t('methods.methods.'+p.title) }}
          </nuxt-link>
        </div>
      </div>
      <h4 class="subtitle has-text-centered">
        {{ $t('methods.history') }}
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
import Fas from '@/components/ui/Fas.vue'

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
          title: 'keyword'
        },
        {
          to: '/list/character',
          icon: 'users',
          title: 'character'
        },
        {
          to: '/list/tag',
          icon: 'tags',
          title: 'tag'
        },
        {
          to: '/list/artist',
          icon: 'paint-brush',
          title: 'artist'
        },
        {
          to: '/list/uploader',
          icon: 'user',
          title: 'uploader'
        },
        {
          to: '/search/image',
          icon: 'image',
          title: 'image'
        },
        {
          to: '/search_form/multiple/tag',
          icon: 'tags',
          title: 'multiple_tag'
        }
      ]
    }
  },
  head () {
    return {
      title: '検索方法'
    }
  }
}
</script>
