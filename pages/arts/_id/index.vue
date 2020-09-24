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
                      <a
                        class="tag is-link"
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        :href="result.originUrl"
                      >
                        {{ result.originService }}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="column is-12 has-text-centered">
                <span class="button is-primary is-medium">
                  <Fas i="eye" style="margin-right:3px;" />
                  x{{ result.view }}
                </span>
                <a class="button is-primary is-medium" @click="addStar(result.illustID); result.like += 1">
                  <Fas i="heart" style="margin-right:3px;" />
                  x{{ result.like }}
                </a>
                <a class="button is-primary is-medium" @click="handleBookmark">
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
        <div v-if="related.imgs.length > 1" class="column has-text-centered" :class="{'is-6': (result.group.length > 0), 'is-12': (result.group.length == 0)}">
          <div class="box">
            <p class="subtitle">
              同一絵師のイラスト
            </p>
            <div class="horizontal-container">
              <div v-for="i in related.imgs" :key="i.id" class="horizontal-item">
                <nuxt-link :to="(i.illustID == result.illustID) ? '#' : `/arts/${i.illustID}`" :style="{ 'opacity': ( i.illustID == result.illustID ? 0.2 : 1.0) }">
                  <img class="vertical-centered" decoding="async" :src="`https://***REMOVED***/illusts/thumb/${i.illustID}.webp`">
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
        <div v-if="result.group.length > 0" class="column is-6 has-text-centered">
          <div class="box">
            <p class="subtitle">
              同一グループのイラスト
            </p>
            <div class="horizontal-container">
              <div v-for="i in grouped.imgs" :key="i.id" class="horizontal-item">
                <nuxt-link :to="`/arts/${i.illustID}`">
                  <img class="vertical-centered" decoding="async" :src="`https://***REMOVED***/illusts/thumb/${i.illustID}.webp`">
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
        <div class="column is-12 has-text-centered">
          <div class="box">
            <p class="subtitle">
              コメント一覧
            </p>
            <div v-for="c in comments" :key="c.comment.id">
              <p class="has-text-weight-bold">
                {{ c.comment.created }} by&nbsp;
                <nuxt-link :to="'/search/uploader/'+c.user.id">
                  {{ c.user.name }}
                </nuxt-link>
              </p>
              <p>
                {{ c.comment.body }}
              </p>
              <br>
            </div>
            <div class="field">
              <p class="control">
                <textarea
                  v-model="commentArea"
                  class="textarea"
                  maxlength="500"
                  rows="3"
                  placeholder="e.g このイラスト好き, 神, 良い, 即マイリス行き, いいねした"
                />
              </p>
            </div>
            <div class="field">
              <button
                class="button is-medium is-info has-text-centered"
                :disabled="commentArea.length < 1"
                @click="openCommentConfirm = true"
              >
                投稿
              </button>
            </div>
            <Modal
              title="コメント投稿確認"
              :isModalOpen="openCommentConfirm == true"
              @modal-closed="openCommentConfirm = false"
            >
              <textarea
                v-model="commentArea"
                class="textarea"
                maxlength="500"
                rows="3"
                readonly
              />
              <h2 class="has-text-centered">
                投稿してよろしいですか?
              </h2>
              <div class="field has-text-centered">
                <button
                  class="button is-primary is-medium"
                  @click="postNewComment"
                >
                  投稿する
                </button>
              </div>
            </Modal>
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

.horizontal-container {
    white-space: nowrap;
    overflow-x: scroll;
}

.horizontal-container::-webkit-scrollbar {
  height: 8px;
}
.horizontal-container::-webkit-scrollbar-track {
  margin: 0 2px;
  background: #ccc;
  border-radius: 5px;
}
.horizontal-container::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background: #666;
}

.horizontal-item {
  position: relative;
  width: 150px;
  height: 150px;
  display: inline-block;
  margin: 3px;
}

.vertical-centered {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
}
</style>

<script>
import Vue from 'vue'
import Viewer from 'v-viewer'
import SocialShare from '@/components/ui/SocialShare.vue'
import Modal from '@/components/ui/Modal.vue'
import Far from '@/components/ui/Far.vue'
import Fas from '@/components/ui/Fas.vue'

Vue.use(
  Viewer, {
    defaultOptions: {
      button: false,
      navbar: false,
      title: false,
      toolbar: true,
      tooltip: true,
      movable: true,
      zoomable: true,
      rotatable: true,
      scalable: true,
      transition: true,
      fullscreen: true,
      keyboard: true
    }
  }
)

export default {
  validate ({ params }) {
    return /^\d+$/.test(params.id)
  },
  components: {
    SocialShare,
    Modal,
    Far,
    Fas
  },
  async asyncData ({ $axios, $auth, route, error }) {
    const id = isFinite(route.params.id) ? parseInt(route.params.id) : 1
    const response = await $axios.get(`/arts/${id}`)
    if (response.data.status !== 200) {
      return error({ statusCode: 404, message: 'err' })
    }
    const comments = await $axios.get(`/arts/${id}/comments`)
    const result = response.data.data
    const grouped = (result.group.length > 0) ? await $axios.get(`/search/tag?id=${result.group[0][0]}`) : { data: { data: null } }
    const related = await $axios.get(`/search/artist?id=${result.artist.id}`)
    const isEditable = (result.user.id === $auth.$state.user.userID || $auth.$state.user.permission === 9)
    const isTagEditable = ($auth.$state.user.permission > 1)
    await $axios.put(`/arts/${id}/view`)
    return {
      comments: comments.data.data,
      related: related.data.data,
      grouped: grouped.data.data,
      result,
      isEditable,
      isTagEditable
    }
  },
  data () {
    return {
      result: {},
      comments: {},
      isEditable: false,
      openZoom: false,
      openCommentConfirm: false,
      isZoomAllowed: false,
      waifuScale: '',
      isModalOpen: false,
      commentArea: ''
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
    async postNewComment () {
      this.openCommentConfirm = false
      const resp = await this.$axios.post(`/arts/${this.result.illustID}/comments`, { comment: this.commentArea })
      if (resp.data.status === 200) {
        this.$notify(
          {
            group: 'default',
            type: 'success',
            duration: 5000,
            title: 'コメント',
            text: 'コメントを投稿しました'
          }
        )
        const resp = await this.$axios.get(`/arts/${this.result.illustID}/comments`)
        this.comments = resp.data.data
        this.commentArea = ''
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
    handleBookmark () {
      this.toggleBookmark(!this.result.mylisted, this.result.illustID)
      this.result.mylisted = !this.result.mylisted
      if (this.result.mylisted) {
        this.result.mylist += 1
      } else {
        this.result.mylist -= 1
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
