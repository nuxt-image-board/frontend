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
                <input v-model="illust.title" class="input is-large" type="text" :placeholder="illust.title">
              </p>
              <p class="subtitle">
                <input v-model="illust.caption" class="input" type="text" :placeholder="illust.caption">
              </p>
            </div>
            <div class="column is-12 is-centered">
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
                    <span class="tag is-large">
                      <Fas i="pen-fancy" />
                    </span>
                    <span class="tag is-link is-large">
                      <input class="input is-small has-text-black" :placeholder="illust.artist.name" :value="illust.artist.name">
                    </span>
                  </div>
                </div>
                <div class="control">
                  <div class="tags has-addons">
                    <span class="tag is-large">
                      <Fas i="broadcast-tower" />
                    </span>
                    <span class="tag is-link is-large">
                      <input class="input is-small has-text-black" :placeholder="illust.originUrl" :value="illust.originUrl">
                    </span>
                  </div>
                </div>
                <div class="control">
                  <div class="tags has-addons">
                    <span class="tag is-large">
                      R18
                    </span>
                    <span class="tag is-link is-large">
                      <input
                        id="isR18Form"
                        v-model="illust.R18"
                        type="checkbox"
                        name="switchRoundedDanger"
                        class="switch is-rounded is-danger"
                      >
                      <label for="isR18Form" style="margin-top: -20px" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="column is-12 has-text-centered">
              <a class="button is-primary" @click="reGet()">再取得</a>
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
    <div class="column is-12 has-text-centered">
      <a class="button is-danger is-small" @click="remove()">削除(非表示にする)</a>
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
    if (illust.user.id !== $auth.$state.user.userID) {
      return error({ statusCode: 401, message: 'err' })
    }
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
      isPC: this.$cookies.get('isPC'),
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
    },
    ImgOrigAddress () {
      return process.env.CDN_ENDPOINT + 'illusts/orig/' + this.illust.illustID + '.png'
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
        title: this.illust.title,
        caption: this.illust.caption,
        originService: this.illust.originService,
        originUrl: this.illust.originUrl,
        imageUrl: this.illust.originUrl,
        artist: {
          name: this.illust.artist
        },
        tag: newTagData,
        chara: [],
        nsfw: this.illust.R18
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
    },
    async reGet () {
    },
    remove () {
      // const response = await this.$axios.delete('/arts/' + this.illust.illustID)
      alert('200 OK')
    }
  },
  head () {
    return {
      title: 'イラストデータ編集'
    }
  }
}
</script>

<style>
.thumb{
  max-height: 65vh;
  width: auto;
}
</style>
