<template>
  <section class="section">
    <div class="container">
      <div class="columns is-vcentered is-centered is-multiline">
        <div class="column is-12-mobile is-8-tablet is-6-desktop">
          <figure class="has-text-centered" @click="isModalOpen = !isModalOpen">
            <img class="thumb" :src="ImgAddress" :class="{'blur': result.nsfw && !acceptR18}" decoding="async" loading="lazy">
          </figure>
        </div>
        <div class="column is-12-mobile is-4-tablet is-6-desktop">
          <div class="columns is-centered is-multiline">
            <div class="column is-12 has-text-centered">
              <p class="title">
                {{ result.title }}
              </p>
              <p class="subtitle">
                {{ result.caption }}
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
                    <span class="tag">
                      <Fas i="calendar" />
                    </span>
                    <span class="tag is-info">{{ result.date }}</span>
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
                    <nuxt-link :to="&quot;/search/artist/&quot;+result.artist.id" class="tag is-link">
                      {{ result.artist.name }}
                    </nuxt-link>
                  </div>
                </div>
                <div class="control">
                  <div class="tags has-addons">
                    <span class="tag">
                      <Fas i="user-edit" />
                    </span>
                    <a class="tag is-link" href="#">{{ result.user.name }}</a>
                  </div>
                </div>
                <div class="control">
                  <div class="tags has-addons">
                    <span class="tag">
                      <Fas i="broadcast-tower" />
                    </span>
                    <a class="tag is-link" :href="result.originUrl">{{ result.originService }}</a>
                  </div>
                </div>
              </div>
            </div>
            <div class="column is-12 has-text-centered">
              <a class="button is-primary is-large" @click="addStar()"><Fas i="heart" /> x{{ result.like }}</a>
              <a class="button is-primary is-large" @click="toggleBookmark()"><Fas i="bookmark" /></a>
              <div v-if="isZoomAllowed" class="column is-12 has-text-centered">
                <a class="button is-primary is-medium" @click="openZoom = true">
                  壁紙サイズに拡大
                </a>
                <Modal title="壁紙サイズに拡大" :isModalOpen="openZoom == true" @modal-closed="openZoom = false">
                  <h2 class="has-text-centered">
                    何倍にしますか?
                  </h2>
                  <div class="field has-addons has-addons-centered">
                    <div class="control">
                      <div class="select is-medium">
                        <select v-model="waifuScale">
                          <option>1.5倍</option>
                          <option>2.0倍</option>
                          <option>2.5倍</option>
                          <option>3.0倍</option>
                          <option>3.5倍</option>
                          <option>4.0倍</option>
                          <option>4.5倍</option>
                          <option>5.0倍</option>
                          <option>6.0倍</option>
                          <option>7.0倍</option>
                          <option>8.0倍</option>
                          <option>9.0倍</option>
                          <option>10.0倍</option>
                        </select>
                      </div>
                    </div>
                    <div class="control">
                      <button class="button is-primary is-medium">
                        実行
                      </button>
                    </div>
                  </div>
                  <p class="has-text-centered">
                    機械学習(Waifu2x)の力でなるべく綺麗に拡大します。
                    スマホ壁紙や、PCの壁紙にしたいときにご利用ください。
                    この処理にはそれなりに時間がかかります。
                    あんまり無駄に連打すると怒ります。
                  </p>
                </Modal>
              </div>
            </div>
            <div class="column is-12 has-text-centered">
              <a class="button is-large" @click="openSocialShare(LineShareAddress)">
                <span class="icon has-text-primary">
                  <Fab i="line" classes="fa-2x" />
                </span>
              </a>
              <a class="button is-large" @click="openSocialShare(TwitterShareAddress)">
                <span class="icon has-text-info">
                  <Fab i="twitter-square" classes="fa-2x" />
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="isEditable" class="column is-12 has-text-centered">
      <nuxt-link class="tag is-link is-large" :to="result.illustID + '/edit'">
        データ編集
      </nuxt-link>
    </div>
    <div class="modal" :class="{'is-active': isModalOpen}">
      <div class="modal-background" @click="isModalOpen = !isModalOpen" />
      <div class="modal-content">
        <p class="image">
          <img :src="ImgOrigAddress">
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import Fas from '~/components/ui/Fas.vue'
import Fab from '~/components/ui/Fab.vue'
import Modal from '~/components/ui/Modal.vue'

export default {
  components: {
    Modal,
    Fas,
    Fab
  },
  async asyncData ({ $axios, $auth, route, error }) {
    const endpoint = '/arts/'
    const id = isFinite(route.params.id) ? parseInt(route.params.id) : 1
    const response = await $axios.get(endpoint + id)
    let isEditable = false
    if (response.data.status !== 200) {
      return error({ statusCode: 404, message: 'err' })
    }
    const data = response.data.data
    if (data.user.id === $auth.$state.user.userID) {
      isEditable = true
    }
    return {
      result: data,
      isEditable
    }
  },
  data () {
    return {
      result: {},
      isEditable: false,
      starSound: null,
      openZoom: false,
      isZoomAllowed: false,
      waifuScale: '',
      bookmarkSound: null,
      isPC: this.$cookies.get('isPC'),
      acceptR18: this.$cookies.get('acceptR18'),
      isModalOpen: false
    }
  },
  computed: {
    ImgAddress () {
      return process.env.CDN_ENDPOINT + 'illusts/large/' + this.result.illustID + '.webp'
    },
    ImgOrigAddress () {
      return process.env.CDN_ENDPOINT + 'illusts/orig/' + this.result.illustID + '.' + this.result.extension
    },
    TwitterShareAddress () {
      const base = 'https://twitter.com/intent/tweet'
      const params = new URLSearchParams()
      const text = this.result.title + '\n' + this.result.originUrl
      // TODO: 作者さんのTwitterアカウントを取得(現状では返ってくる値はtwitter_idなので、screen_nameにしないといけない)
      params.append('text', text)
      params.append('related', 'usagi_anime')
      return base + '?' + params.toString()
    },
    LineShareAddress () {
      return 'https://line.me/R/msg/text?' + this.result.title + '\n' + this.result.originUrl
    }
  },
  /*
  mounted () {
    this.starSound = new Audio('star.wav')
    this.starSound.load()
    this.bookmarkSound = new Audio('bookmark.wav')
    this.bookmarkSound.load()
  }
  */
  methods: {
    openSocialShare (addr) {
      if (!this.isPC) {
        location.href = addr
      } else {
        window.open(addr, '', 'width=500,height=500')
      }
    },
    async requestWaifu2x () {
      const scale = this.waifuScale.substr(-1)
      const params = { cdn: this.ImgOrigAddress, size: scale }
      const resp = await this.$axios.get('https://***REMOVED***/waifu2x', { params })
      if (resp.statusCode === 204) {
        alert('204 No Content(OK)')
      }
    },
    async addStar () {
      const endpoint = '/arts/' + this.result.illustID + '/likes'
      this.result.like += 1
      await this.$axios.put(endpoint)
    },
    toggleBookmark () {
      // const endpoint = '/arts/' + this.result.illustID + '/bookmark'
      // await this.$axios.post(endpoint)
      // this.bookmarkSound.play()
      alert('まだ未実装です > <')
    }
  },
  head () {
    return {
      title: this.result.title
    }
  }
}
</script>

<style>
.blur{
  -ms-filter: blur(20px);
  filter: blur(20px);
}
.thumb{
  max-height: 65vh;
  width: auto;
}
</style>
