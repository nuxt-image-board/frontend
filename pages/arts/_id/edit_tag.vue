<template>
  <section class="section">
    <div class="pageloader" :class="{'is-active': isLoading, 'is-danger': isFailed, 'is-warning':isSending}">
      <span class="title">{{ loadingText }}</span>
    </div>
    <div class="container">
      <div class="columns is-vcentered is-centered is-multiline">
        <div class="column is-12-mobile is-8-tablet is-6-desktop">
          <figure class="has-text-centered" @click="isModalOpen = !isModalOpen">
            <img class="thumb" :src="ImgAddress" :class="{'blur': illust.nsfw && !acceptR18}">
          </figure>
        </div>
        <div class="column is-12-mobile is-4-tablet is-6-desktop">
          <div class="columns is-centered is-multiline">
            <div class="column is-12 has-text-centered">
              <p class="title">
                {{ illust.title }}
              </p>
              <p class="subtitle">
                {{ illust.caption }}
              </p>
            </div>
            <div class="column is-12 has-text-centered">
              <vue-tags-input
                v-model="tag"
                :tags="illust.tag"
                :validation="validation"
                style="width: 100%;max-width: none;"
                @tags-changed="newTags => illust.tag = newTags"
              />
            </div>
            <div class="column is-12">
              <div class="field is-grouped is-grouped-centered is-grouped-multiline">
                <div class="control">
                  <div class="tags has-addons">
                    <span class="tag">
                      <Fas i="calendar" />
                    </span>
                    <span class="tag is-info">{{ illust.date }}</span>
                  </div>
                </div>
                <div class="control">
                  <div class="tags has-addons">
                    <span class="tag">
                      <Fas i="bookmark" />
                    </span>
                    <span class="tag is-info">0</span>
                  </div>
                </div>
              </div>
              <div class="field is-grouped is-grouped-centered is-grouped-multiline">
                <div class="control">
                  <div class="tags has-addons">
                    <span class="tag">
                      <Fas i="pen-fancy" />
                    </span>
                    <nuxt-link :to="&quot;/search/artist/&quot;+illust.artist.id" class="tag is-link">
                      {{ illust.artist.name }}
                    </nuxt-link>
                  </div>
                </div>
                <div class="control">
                  <div class="tags has-addons">
                    <span class="tag">
                      <Fas i="user-edit" />
                    </span>
                    <a class="tag is-link" href="#">{{ illust.user.name }}</a>
                  </div>
                </div>
                <div class="control">
                  <div class="tags has-addons">
                    <span class="tag">
                      <Fas i="broadcast-tower" />
                    </span>
                    <a class="tag is-link" :href="illust.originUrl">{{ illust.originService }}</a>
                  </div>
                </div>
              </div>
            </div>
            <div class="column is-12 has-text-centered">
              <button class="button is-primary is-large" @click="update()">
                更新を適用
              </button>
            </div>
          </div>
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
  async asyncData ({ $axios, $auth, route, error }) {
    const endpoint = '/arts/'
    const id = isFinite(route.params.id) ? parseInt(route.params.id) : 1
    const response = await $axios.get(endpoint + id)
    if (response.data.status !== 200) {
      return error({ statusCode: 404, message: 'err' })
    }
    const illust = response.data.data
    let vtags = illust.chara.map(tag => ({ text: tag[1] }))
    vtags = vtags.concat(illust.tag.map(tag => ({ text: tag[1] })))
    illust.tag = vtags
    return {
      illust
    }
  },
  data () {
    return {
      tag: '',
      tags: [],
      loadingText: '',
      isLoading: false,
      isSending: false,
      isFailed: false,
      validation: [{
        classes: 'max-length',
        rule: tag => tag.text.length > 20
      }, {
        classes: 'no-braces',
        rule: ({ text }) =>
          text.includes('{') ||
          text.includes('}') ||
          text.includes('<') ||
          text.includes('>')
      }]
    }
  },
  computed: {
    ImgAddress () {
      return process.env.CDN_ENDPOINT + 'illusts/large/' + this.illust.illustID + '.webp'
    }
  },
  methods: {
    async update () {
      this.isFailed = false
      this.isSending = true
      this.isLoading = true
      this.loadingText = '更新しています...'
      const newTagData = this.illust.tag.map(tag => (tag.text))
      const params = {
        tag: newTagData
      }
      const response = await this.$axios.put('/arts/' + this.illust.illustID, params)
      this.isSending = false
      if (response.data.status === 200) {
        this.loadingText = '更新しました!'
      } else {
        this.loadingText = '更新に失敗しました'
        this.isFailed = true
      }
      setTimeout(this.closeWindow, 2000)
    },
    closeWindow () {
      this.isSending = false
      this.isLoading = false
    }
  },
  head () {
    return {
      title: 'イラストタグ編集'
    }
  }
}
</script>
