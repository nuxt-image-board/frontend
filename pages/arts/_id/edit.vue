<template>
  <section class="section">
    <div class="container">
      <div class="columns is-vcentered is-centered is-multiline">
        <div class="column is-12-mobile is-8-tablet is-6-desktop">
          <figure class="has-text-centered" @click="isModalOpen = !isModalOpen">
            <img class="thumb" :src="ImgAddress" :class="{'blur': result.nsfw && !acceptR18}">
          </figure>
        </div>
        <div class="column is-12-mobile is-4-tablet is-6-desktop">
          <div class="columns is-centered is-multiline">
            <div class="column is-12 has-text-centered">
              <p class="title">
                <input class="input is-large" type="text" :value="result.title" :placeholder="result.title">
              </p>
              <p class="subtitle">
                <input class="input" type="text" :value="result.caption" :placeholder="result.caption">
              </p>
            </div>
            <div class="column is-12 has-text-centered">
              <div class="field is-centered is-multiline">
                <nuxt-link v-for="chara in result.chara" :key="chara[0]" :to="&quot;/search/character/&quot;+chara[0]">
                  <span class="tag is-primary is-light">{{ chara[1] }}</span>&nbsp;
                </nuxt-link>
                <nuxt-link v-for="tag in result.tag" :key="tag[1]" :to="&quot;/search/tag/&quot;+tag[0]">
                  <span class="tag is-info is-light" :class="{'is-info': !tag[2], 'is-danger': tag[2]}">{{ tag[1] }}</span>&nbsp;
                </nuxt-link>
              </div>
            </div>
            <div class="column is-12">
              <div class="field is-grouped is-grouped-centered is-grouped-multiline">
                <div class="control">
                  <div class="tags has-addons">
                    <span class="tag is-large">
                      <Fas i="pen-fancy" />
                    </span>
                    <span class="tag is-link is-large">
                      <input class="input is-small has-text-black" :placeholder="result.artist.name" :value="result.artist.name">
                    </span>
                  </div>
                </div>
                <div class="control">
                  <div class="tags has-addons">
                    <span class="tag is-large">
                      <Fas i="broadcast-tower" />
                    </span>
                    <span class="tag is-link is-large">
                      <input class="input is-small has-text-black" :placeholder="result.originUrl" :value="result.originUrl">
                    </span>
                  </div>
                </div>
                <div class="control">
                  <div class="tags has-addons">
                    <span class="tag is-large">
                      R18
                    </span>
                    <a class="tag is-link is-large">
                      True/False
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div class="column is-12 has-text-centered">
              <a class="button is-primary" @click="reGet()">再取得</a>
            </div>
            <div class="column is-12 has-text-centered">
              <a class="button is-primary is-large" @click="update()">更新を適用</a>
              <nuxt-link :to="'/arts/'+result.illustID" class="button is-primary is-large">戻る</nuxt-link>
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
    const data = response.data.data
    if (data.userID !== $auth.$state.user.userID) {
      return error({ statusCode: 401, message: 'err' })
    }
    return {
      result: data
    }
  },
  data () {
    return {
      result: {},
      isPC: this.$cookies.get('isPC')
    }
  },
  computed: {
    ImgAddress () {
      return process.env.CDN_ENDPOINT + 'illusts/large/' + this.result.illustID + '.webp'
    },
    ImgOrigAddress () {
      return process.env.CDN_ENDPOINT + 'illusts/orig/' + this.result.illustID + '.png'
    }
  },
  methods: {
    async update () {
    },
    async reGet () {
    },
    async remove () {
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
