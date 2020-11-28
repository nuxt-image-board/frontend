<template>
  <section class="section">
    <div class="container">
      <div class="columns is-vcentered is-centered is-multiline">
        <div class="column is-12-mobile is-8-tablet is-7-desktop">
          <figure v-if="!$store.state.user.useViewer" class="has-text-centered" @click="imageModalOpened = !imageModalOpened">
            <img
              v-lazy="$store.state.user.useRaw ? ImgOrigAddress : ImgLargeAddress"
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
        <div class="column is-12-mobile is-4-tablet is-5-desktop">
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
                    <span class="tag is-danger scale">{{ tag[1] }}</span>&nbsp;
                  </nuxt-link>
                  <nuxt-link v-for="chara in result.chara" :key="chara[0]" :to="&quot;/search/character/&quot;+chara[0]">
                    <span class="tag is-primary scale">{{ chara[1] }}</span>&nbsp;
                  </nuxt-link>
                  <nuxt-link v-for="tag in result.tag" :key="tag[1]" :to="&quot;/search/tag/&quot;+tag[0]">
                    <span class="tag is-light scale" :class="{'is-info': !tag[2], 'is-danger': tag[2]}">{{ tag[1] }}</span>&nbsp;
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
                  <div class="control scale">
                    <div class="tags has-addons">
                      <span class="tag">
                        <Fas i="pen-fancy" />
                      </span>
                      <nuxt-link :to="&quot;/search/artist/&quot;+result.artist.id" class="tag is-link">
                        {{ result.artist.name }}
                      </nuxt-link>
                    </div>
                  </div>
                  <div class="control scale">
                    <div class="tags has-addons">
                      <span class="tag">
                        <Fas i="user-edit" />
                      </span>
                      <nuxt-link :to="&quot;/search/uploader/&quot;+result.user.id" class="tag is-link">
                        {{ result.user.name }}
                      </nuxt-link>
                    </div>
                  </div>
                  <div class="control scale">
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
                  <div v-for="replace in result.replace" :key="replace.illustID" class="control scale">
                    <div class="tags has-addons">
                      <span class="tag">
                        <Fas i="broadcast-tower" />
                      </span>
                      <a
                        class="tag is-link"
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        :href="replace.originUrl"
                      >
                        {{ replace.originService }}
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
                <a class="button is-primary is-medium" @click="addLike(result.illustID); result.like += 1; result.star[0] +=1">
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
          </div>
        </div>
        <div class="column is-12">
          <div class="box">
            <div
              v-scroll:debounce="{fn: onScroll, debounce: 5 }"
              class="tabs is-boxed is-centered is-fullwidth"
              :class="{'horizontal-container': !$store.state.user.isPC}"
            >
              <ul>
                <li
                  v-for="(tab,index) in tabData"
                  :key="index"
                  :class="{
                    'is-active': tabId == index+1,
                    'is-hidden': isHidden(tab.mode)
                  }"
                >
                  <a @click="tabId = index+1">
                    <span class="icon is-small">
                      <Fas :i="tab.icon" />
                    </span>
                    <span>{{ tab.title }}</span>
                  </a>
                </li>
              </ul>
            </div>
            <div class="tab-contents">
              <div v-if="tabId == 1" id="star-list" class="content has-text-centered">
                <div class="columns is-centered is-mobile is-multiline">
                  <div
                    v-for="(star, index) in result.star"
                    :key="index"
                    class="column is-6-touch is-5-tablet is-3-desktop"
                  >
                    <div class="control">
                      <div class="tags is-centered are-large has-addons has-addons-centered">
                        <span class="tag is-info" :class="{'shine': star > 0}">
                          <Fas :class="`${starColors[index]} is-size-4`" i="star" />
                        </span>
                        <span class="tag is-success">
                          x{{ star }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <button class="button scale is-medium is-info" @click="starModalOpened = true">
                  スターを付ける
                </button>
                <StarSelecter
                  :isModalOpen="starModalOpened == true"
                  :illustID="result.illustID"
                  @add-star-success="updateStarDisplay"
                  @modal-closed="starModalOpened = false"
                />
              </div>
              <div v-if="tabId == 2" id="comment-list" class="content has-text-centered">
                <div v-if="comments">
                  <p v-for="c in comments" :key="c.comment.id" class="mt-5">
                    <span class="is-size-6 has-text-weight-bold">
                      {{ c.comment.created }} by
                      <nuxt-link :to="'/search/uploader/'+c.user.id">
                        {{ c.user.name }}
                      </nuxt-link>
                    </span>
                    <br>
                    {{ c.comment.body }}
                  </p>
                </div>
                <div v-else>
                  <p class="mt-5">
                    <span class="is-size-5 has-text-weight-bold">
                      まだコメントはありません
                    </span>
                  </p>
                </div>
                <div class="field mt-3">
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
                    @click="commentModalOpened = true"
                  >
                    投稿
                  </button>
                </div>
                <Modal
                  title="コメント投稿確認"
                  :isModalOpen="commentModalOpened == true"
                  @modal-closed="commentModalOpened = false"
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
              <div v-if="tabId == 3" id="related-artist-list" class="content">
                <div
                  v-scroll:debounce="{fn: onScroll, debounce: 5 }"
                  class="horizontal-container"
                >
                  <div v-for="i in related.imgs" :key="i.id" class="horizontal-item">
                    <nuxt-link
                      :to="(i.illustID == result.illustID) ? '#' : `/arts/${i.illustID}`"
                      :style="{ 'opacity': ( i.illustID == result.illustID ? 0.2 : 1.0) }"
                    >
                      <img
                        class="vertical-centered"
                        decoding="async"
                        :class="{'blur': result.nsfw && !$store.state.user.acceptR18}"
                        :src="getThumbAddress(i.illustID)"
                      >
                    </nuxt-link>
                  </div>
                </div>
              </div>
              <div v-if="tabId == 4" id="related-group-list" class="content">
                <div
                  v-if="grouped"
                  v-scroll:debounce="{fn: onScroll, debounce: 5 }"
                  class="horizontal-container"
                >
                  <div v-for="i in grouped.imgs" :key="i.id" class="horizontal-item">
                    <nuxt-link
                      :to="(i.illustID == result.illustID) ? '#' : `/arts/${i.illustID}`"
                      :style="{ 'opacity': ( i.illustID == result.illustID ? 0.2 : 1.0) }"
                    >
                      <img
                        class="vertical-centered"
                        decoding="async"
                        :class="{'blur': result.nsfw && !$store.state.user.acceptR18}"
                        :src="getThumbAddress(i.illustID)"
                      >
                    </nuxt-link>
                  </div>
                </div>
              </div>
              <div v-if="tabId == 5" id="replace-history" class="content">
                <div class="columns is-centered is-multiline mx-2">
                  <div class="column is-12 has-text-centered is-hidden-touch">
                    <div class="columns is-vcentered is-centered">
                      <div class="column is-2">
                        掲載サイト
                      </div>
                      <div class="column is-3">
                        タイトル
                      </div>
                      <div class="column is-3">
                        説明文
                      </div>
                      <div class="column is-2">
                        解像度
                      </div>
                      <div class="column is-2">
                        サイズ
                      </div>
                    </div>
                  </div>
                  <div v-for="replace in result.replace" :key="replace.illustID" class="column is-12 has-text-centered">
                    <div class="columns is-vcentered is-centered">
                      <div class="column is-2 has-text-centered">
                        <nuxt-link
                          target="_blank"
                          rel="noopener noreferrer nofollow"
                          :to="replace.originUrl"
                        >
                          <p class="is-size-4">
                            {{ replace.originService }}
                          </p>
                        </nuxt-link>
                      </div>
                      <div class="column is-3 has-text-centered">
                        <p class="is-size-6">
                          {{ replace.title }}
                        </p>
                      </div>
                      <div class="column is-3 has-text-centered">
                        <p class="is-size-7">
                          {{ replace.caption }}
                        </p>
                      </div>
                      <div class="column is-2 has-text-centered">
                        <p class="is-size-6">
                          {{ replace.width }} x {{ replace.height }}
                        </p>
                      </div>
                      <div class="column is-2 has-text-centered">
                        <p class="is-size-6">
                          {{ replace.filesize }}
                        </p>
                      </div>
                    </div>
                    <br v-if="!$store.state.user.isPC">
                  </div>
                </div>
              </div>
              <div v-if="tabId == 6" id="edit-history" class="content">
                <p>置き換え履歴など</p>
              </div>
              <div v-if="tabId == 7" id="admin-list" class="content">
                <div class="columns is-centered is-multiline">
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
                  <div v-if="result.replace.length > 0" class="column is-4 has-text-centered">
                    <nuxt-link class="button is-success" :to="result.illustID + '/replace_history'">
                      置き換え履歴
                    </nuxt-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!$store.state.user.useViewer" class="modal" :class="{'is-active': imageModalOpened}">
      <div class="modal-background" @click="imageModalOpened = !imageModalOpened" />
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
import debounce from 'lodash/debounce'
import axios from 'axios'
import SocialShare from '@/components/ui/SocialShare.vue'
import StarSelecter from '@/components/ui/StarSelecter.vue'
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
    StarSelecter,
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
      isEditable: false,
      imageModalOpened: false,
      starModalOpened: false,
      waifuModalOpened: false,
      waifuAllowed: false,
      waifuScale: '',
      comments: {},
      commentArea: '',
      commentModalOpened: false,
      tabId: 1,
      tabData: [
        { icon: 'star', title: 'スター一覧', mode: 0 },
        { icon: 'comments', title: 'コメント一覧', mode: 0 },
        { icon: 'image', title: '関連(同一絵師)', mode: 1 },
        { icon: 'image', title: '関連(同一グループ)', mode: 2 },
        { icon: 'image', title: '別名', mode: 4 },
        { icon: 'tools', title: '操作履歴', mode: -1 },
        { icon: 'tools', title: '管理パネル', mode: 3 }
      ],
      starColors: [
        'has-text-syaro',
        'has-text-chiya',
        'has-text-cocoa',
        'has-text-chino'
      ]
    }
  },
  computed: {
    ImgOrigAddress () {
      return `${process.env.CDN_ENDPOINT}illusts/orig/${this.result.illustID}.${this.result.extension}`
    },
    ImgLargeAddress () {
      if (this.$store.state.user.useWebP) {
        return `${process.env.CDN_ENDPOINT}illusts/large/${this.result.illustID}.webp`
      } else {
        return `${process.env.CDN_ENDPOINT}illusts/large/${this.result.illustID}.jpg`
      }
    }
  },
  methods: {
    getThumbAddress (illustID) {
      return `${process.env.CDN_ENDPOINT}illusts/thumb/${illustID}.${(this.$store.state.user.useWebP ? 'webp' : 'jpg')}`
    },
    isHidden (mode) {
      switch (mode) {
        case 1:
          return this.related.imgs.length < 2
        case 2:
          return this.result.group.length < 2
        case 3:
          return this.$auth.$state.user.permission !== 9
        case 4:
          return this.result.replace
        case -1:
          return true
        default:
          return false
      }
    },
    onScroll (e, position) {
      this.$store.commit('setBlockOpenMenu', true)
      this.debounceUnblockMenu()
    },
    debounceUnblockMenu: debounce(function debounce (e) {
      this.$store.commit('setBlockOpenMenu', false)
    }, 600),
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
      const imageOrig = await axios.get(
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
        a.download = `${process.env.CDN_ENDPOINT}/illusts/orig/${this.result.illustID}.${this.result.extension}`
        a.click()
        a.remove()
        URL.revokeObjectURL(imageUrl)
      // Safari
      } else {
        window.open('data:' + mimeType + ';base64,' + window.Base64.encode(imageOrig.data), '_blank')
      }
    },
    async postNewComment () {
      this.commentModalOpened = false
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
    handleBookmark () {
      this.toggleBookmark(!this.result.mylisted, this.result.illustID)
      this.result.mylisted = !this.result.mylisted
      if (this.result.mylisted) {
        this.result.mylist += 1
      } else {
        this.result.mylist -= 1
      }
    },
    updateStarDisplay (starType) {
      this.$set(this.result.star, starType, this.result.star[starType] + 1)
      switch (starType) {
        case 0:
          this.result.like += 1
          break
        case 1:
          this.result.like += 10
          break
        case 2:
          this.result.like += 20
          break
        case 3:
          this.result.like += 50
          break
      }
    }
  },
  head () {
    return {
      title: this.result.title
    }
  }
}
</script>
