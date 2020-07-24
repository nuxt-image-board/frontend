<template>
  <section class="section">
    <div class="container">
      <div class="columns is-vcentered is-centered is-multiline">
        <div class="column is-12-mobile is-8-tablet is-6-desktop">
          <figure class="has-text-centered" @click="isModalOpen = !isModalOpen">
            <img
              v-lazy="$store.state.user.useRaw ? ImgOrigAddress : ImgAddress"
              class="thumb"
              :class="{'blur': result.nsfw && !$store.state.user.acceptR18}"
            >
          </figure>
        </div>
        <div class="column is-12-mobile is-4-tablet is-6-desktop">
          <div class="box">
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
                  <nuxt-link v-for="tag in result.system" :key="tag[1]" :to="&quot;/search/tag/&quot;+tag[0]">
                    <span class="tag is-danger">{{ tag[1] }}</span>&nbsp;
                  </nuxt-link>
                  <nuxt-link v-for="chara in result.chara" :key="chara[0]" :to="&quot;/search/character/&quot;+chara[0]">
                    <span class="tag is-primary">{{ chara[1] }}</span>&nbsp;
                  </nuxt-link>
                  <nuxt-link v-for="tag in result.tag" :key="tag[1]" :to="&quot;/search/tag/&quot;+tag[0]">
                    <span class="tag is-light" :class="{'is-info': !tag[2], 'is-danger': tag[2]}">{{ tag[1] }}</span>&nbsp;
                  </nuxt-link>
                </div>
                <div v-if="result.group.length > 0">
                  <nuxt-link v-for="tag in result.group" :key="tag[1]" :to="&quot;/search/tag/&quot;+tag[0]">
                    <span class="tag is-warning">{{ 'グループID '+tag[1] }}</span>&nbsp;
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
                      <span class="tag is-link">{{ result.date }}</span>
                    </div>
                  </div>
                  <div class="control">
                    <div class="tags has-addons">
                      <span class="tag">
                        <Fas i="file-image" />
                      </span>
                      <span class="tag is-link">{{ result.filesize }}</span>
                    </div>
                  </div>
                  <div class="control">
                    <div class="tags has-addons">
                      <span class="tag">
                        <Fas i="arrows-alt" />
                      </span>
                      <span class="tag is-link">{{ result.width }}x{{ result.height }}</span>
                    </div>
                  </div>
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
                <a class="button is-primary is-large" @click="addStar()">
                  <Fas i="heart" style="margin-right:3px;" />
                  x{{ result.like }}
                </a>
                <a class="button is-primary is-large" @click="toggleBookmark()">
                  <Fas v-if="result.mylisted" i="bookmark" style="margin-right:3px;" />
                  <Far v-else i="bookmark" style="margin-right:3px;" />
                  x{{ result.mylist }}
                </a>
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
            </div>
            <div class="column is-12 has-text-centered">
              <a
                class="button is-large"
                :href="$store.state.user.isPC ? '#' : LineShareAddress"
                target="_blank"
                rel="noopener noreferrer"
                @click="$store.state.user.isPC ? openSocialShare(LineShareAddress) : null"
              >
                <span class="icon has-text-primary">
                  <Fab i="line" classes="line fa-2x" />
                </span>
              </a>
              <a
                class="button is-large"
                :href="$store.state.user.isPC ? '#' : TwitterShareAddress"
                target="_blank"
                rel="noopener noreferrer"
                @click="$store.state.user.isPC ? openSocialShare(TwitterShareAddress) : null"
              >
                <span class="icon has-text-info">
                  <Fab i="twitter-square" classes="twitter fa-2x" />
                </span>
              </a>
            </div>
            <div class="column is-12">
              <div class="columns is-centered">
                <div v-if="isEditable" class="column is-4 has-text-centered">
                  <nuxt-link class="button is-success" :to="result.illustID + '/edit'">
                    データ編集
                  </nuxt-link>
                </div>
                <div class="column is-4 has-text-centered">
                  <button class="button is-success" @click="copyIllustID">
                    イラストIDをコピー
                  </button>
                </div>
                <div v-if="isTagEditable" class="column is-4 has-text-centered">
                  <nuxt-link class="button is-success" :to="result.illustID + '/edit_tag'">
                    タグ編集
                  </nuxt-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal" :class="{'is-active': isModalOpen}">
      <div class="modal-background" @click="isModalOpen = !isModalOpen" />
      <div class="modal-content">
        <p class="image">
          <img v-lazy="ImgOrigAddress" src="~/assets/load.png">
        </p>
      </div>
      <br>
      <button class="button" @click="downloadImage()">
        ダウンロード
      </button>
    </div>
  </section>
</template>

<script>
import Fas from '~/components/ui/Fas.vue'
import Far from '~/components/ui/Far.vue'
import Fab from '~/components/ui/Fab.vue'
import Modal from '~/components/ui/Modal.vue'

export default {
  components: {
    Modal,
    Fas,
    Far,
    Fab
  },
  async asyncData ({ $axios, $auth, route, error }) {
    const endpoint = '/arts/'
    const id = isFinite(route.params.id) ? parseInt(route.params.id) : 1
    const response = await $axios.get(endpoint + id)
    let isEditable = false
    let isTagEditable = false
    if (response.data.status !== 200) {
      return error({ statusCode: 404, message: 'err' })
    }
    const data = response.data.data
    if (data.user.id === $auth.$state.user.userID || $auth.$state.user.permission === 9) {
      isEditable = true
    }
    if ($auth.$state.user.permission > 1) {
      isTagEditable = true
    }
    const shareAddress = encodeURI(data.title + '\n' + data.originUrl)
    const LineShareAddress = 'https://social-plugins.line.me/lineit/share?url=' + data.originUrl
    const TwitterShareAddress = 'https://twitter.com/intent/tweet?text=' + shareAddress + '&related=usagi_anime'
    return {
      result: data,
      isEditable,
      isTagEditable,
      LineShareAddress,
      TwitterShareAddress
    }
  },
  data () {
    return {
      result: {},
      isEditable: false,
      openZoom: false,
      isZoomAllowed: false,
      waifuScale: '',
      bookmarkSound: null,
      isModalOpen: false
    }
  },
  computed: {
    ImgAddress () {
      return process.env.CDN_ENDPOINT +
        'illusts/large/' +
        this.result.illustID +
        (this.$store.state.user.useWebP ? '.webp' : '.jpg')
    },
    ImgOrigAddress () {
      return process.env.CDN_ENDPOINT +
        'illusts/orig/' +
        this.result.illustID +
        '.' +
        this.result.extension
    }
  },
  methods: {
    copyIllustID () {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(this.result.illustID)
        alert('コピーしました')
      }
    },
    async downloadImage () {
      const imageOrig = await this.$axios.get(
        this.ImgOrigAddress,
        { responseType: 'blob', cache: true }
      )
      const mimeType = this.result.extension === 'png' ? 'image/png' : 'image/jpeg'
      const blob = new Blob(
        [imageOrig.data],
        { type: mimeType }
      )
      // Safari以外
      if (!this.$device.isIos) {
        const imageUrl = URL.createObjectURL(blob)
        const a = document.createElement('a')
        document.body.appendChild(a)
        a.href = imageUrl
        a.download = `***REMOVED***_${this.result.illustID}.${this.result.extension}`
        a.click()
        a.remove()
        URL.revokeObjectURL(imageUrl)
      // Safari
      } else {
        window.open('data:' + mimeType + ';base64,' + window.Base64.encode(imageOrig.data), '_blank')
      }
    },
    openSocialShare (addr) {
      window.open(addr, '', 'width=500,height=500')
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
    async toggleBookmark () {
      if (!this.result.mylisted) {
        this.result.mylist += 1
      } else {
        this.result.mylist -= 1
      }
      await this.$axios.put(
        `/mylist/${this.$auth.$state.user.mylist.id}`,
        { illustID: this.result.illustID, action: this.result.mylisted ? 'remove' : 'add' }
      )
      this.result.mylisted = !this.result.mylisted
    }
  },
  head () {
    return {
      title: this.result.title
    }
  }
}
</script>
