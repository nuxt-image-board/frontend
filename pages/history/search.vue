<template>
  <section class="section">
    <div class="container is-widescreen">
      <div class="columns is-centered is-vcentered is-multiline">
        <div class="column is-8">
          <Notification
            icon="info"
            :title="$auth.user.name+' さんの検索履歴'"
          />
        </div>
      </div>
      <div class="columns is-multiline">
        <div
          v-for="(p,index) in $store.state.user.searchHistory"
          :key="index"
          class="column is-6"
        >
          <nuxt-link class="button is-fullwidth" :to="`/search/${p.type}/${p.id}`">
            <Fas v-if="p.type == 'artist'" i="paint-brush" />
            <Fas v-else-if="p.type == 'character'" i="users" />
            <Fas v-else-if="p.type == 'uploader'" i="upload" />
            <Fas v-else i="tags" />
            <span>&nbsp; {{ p.title }}</span>
          </nuxt-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Notification from '@/components/ui/Notification.vue'
import Fas from '@/components/ui/Fas.vue'

export default {
  components: {
    Notification,
    Fas
  },
  asyncData ({ store, redirect }) {
    if (!store.state.user.obtainedProducts.includes(3)) {
      redirect('/shop')
    }
  },
  head () {
    return {
      title: 'イラスト検索履歴'
    }
  }
}
</script>
