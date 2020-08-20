<template>
  <section class="section">
    <div class="container">
      <div class="columns is-vcentered is-centered is-multiline">
        <div class="column is-12-mobile is-8-tablet is-6-desktop">
          <figure v-if="!$store.state.user.useViewer" class="has-text-centered" @click="isModalOpen = !isModalOpen">
            <img
              v-lazy="$store.state.user.useRaw ? ImgOrigAddress : ImgAddress"
              class="thumb"
              :class="{'blur': result.nsfw && !$store.state.user.acceptR18}"
            >
          </figure>
          <figure v-else v-viewer class="has-text-centered">
            <img
              v-lazy="ImgOrigAddress"
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
                      <nuxt-link :to="&quot;/search/uploader/&quot;+result.user.id" class="tag is-link">
                        {{ result.user.name }}
                      </nuxt-link>
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
              </div>
            </div>
            <div class="column is-12 has-text-centered">
              <SocialShare :title="result.title" :url="result.originUrl" />
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
                </p>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!$store.state.user.useViewer" class="modal" :class="{'is-active': isModalOpen}">
      <div class="modal-background" @click="isModalOpen = !isModalOpen" />
      <div class="modal-content">
        <p class="image">
          <img v-lazy="ImgOrigAddress" src="~/assets/images/loading.png">
        </p>
      </div>
      <br>
      <button class="button" @click="downloadImage()">
        ダウンロード
      </button>
    </div>
  </section>
</template>

<style lang="scss">
@import "~viewerjs/dist/viewer";
</style>

<script>
import SocialShare from '~/components/ui/SocialShare.vue'
import Modal from '~/components/ui/Modal.vue'
import Far from '~/components/ui/Far.vue'
import Fas from '~/components/ui/Fas.vue'

export default {
  components: {
    SocialShare,
    Modal,
    Far,
    Fas
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
    return {
      result: data,
      isEditable,
      isTagEditable
    }
  },
  data () {
    return {
      result: {},
      isEditable: false,
      openZoom: false,
      isZoomAllowed: true,
      waifuScale: '',
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
        this.$notify(
          {
            group: 'default',
            type: 'success',
            duration: 5000,
            title: 'イラストIDをコピーしました'
          }
        )
      }
    },
    async downloadImage () {
      const imageOrig = await this.$axios.get(
        this.ImgOrigAddress,
        { responseType: 'blob', cache: true }
      )
      const mimeType = this.result.extension === 'png' ? 'image/png' : 'image/jpeg'
      // Safari以外
      if (!this.$device.isIos) {
        const blob = new Blob(
          [imageOrig.data],
          { type: mimeType }
        )
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
    async requestWaifu2x () {
      const scale = this.waifuScale.substr(-1)
      const params = { cdn: this.ImgOrigAddress, size: scale }
      const resp = await this.$axios.get('https://***REMOVED***/waifu2x', { params })
      if (resp.statusCode === 204) {
        this.$notify(
          {
            group: 'default',
            type: 'success',
            duration: 5000,
            title: 'Waifu2x',
            text: 'リクエストに成功しました'
          }
        )
      }
    },
    async addStar () {
      const endpoint = '/arts/' + this.result.illustID + '/likes'
      this.result.like += 1
      await this.$axios.put(endpoint)
    },
    async toggleBookmark () {
      if (!this.result.mylisted) {
        this.$store.commit('user/addBookmark')
        if (this.$store.state.user.isBookmarkAddable) {
          this.result.mylist += 1
        }
      } else {
        this.$store.commit('user/removeBookmark')
        this.result.mylist -= 1
      }
      if (this.$store.state.user.isBookmarkAddable || this.result.mylisted) {
        await this.$axios.put(
          `/mylist/${this.$auth.$state.user.mylist.id}`,
          { illustID: this.result.illustID, action: this.result.mylisted ? 'remove' : 'add' }
        )
        if (!this.result.mylisted) {
          this.$notify(
            {
              group: 'default',
              type: 'success',
              duration: 2000,
              title: 'マイリスト',
              text: 'マイリストに追加しました'
            }
          )
        } else {
          this.$notify(
            {
              group: 'default',
              type: 'success',
              duration: 2000,
              title: 'マイリスト',
              text: 'マイリストから削除しました'
            }
          )
        }
        this.result.mylisted = !this.result.mylisted
      } else {
        this.$notify(
          {
            group: 'default',
            type: 'danger',
            duration: 5000,
            title: 'マイリスト',
            text: 'マイリスト数の上限に達しました'
          }
        )
      }
    },
    getOGPThumb () {
      if (this.result.nsfw) {
        return require('~/assets/images/blocked_r18.png')
      } else {
        return process.env.CDN_ENDPOINT + 'illusts/thumb/' + this.result.illustID + '.jpg'
      }
    }
  },
  head () {
    return {
      title: this.result.title,
      meta: [
        { hid: 'og:title', property: 'og:title', content: this.result.title + (this.result.nsfw ? '(R18)' : '') },
        { hid: 'og:description', property: 'og:description', content: this.result.caption.slice(0, 20) + '...' },
        { hid: 'og:url', property: 'og:url', content: `https://***REMOVED***/arts/${this.result.illustID}` },
        { hid: 'og:image', property: 'og:image', content: this.getOGPThumb() }
      ]
    }
  }
}
</script>
