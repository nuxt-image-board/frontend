<template>
  <section class="section">
    <div class="container">
      <div class="columns is-vcentered is-centered is-multiline">
        <div class="column is-12-mobile is-8-tablet is-6-desktop">
          <figure class="has-text-centered" @click="isModalOpen = !isModalOpen">
            <img class="thumb" :src="ImgAddress" :class="{'blur': illust.nsfw && !acceptR18}">
          </figure>
        </div>
        <div class="column is-12-mobile is-4-tablet is-6-desktop">
          <div class="box">
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
                        <input v-model="illust.artist.name" class="input is-small has-text-black" :placeholder="illust.artist.name">
                      </span>
                    </div>
                  </div>
                  <div class="control">
                    <div class="tags has-addons">
                      <span class="tag is-large">
                        <Fas i="broadcast-tower" />
                      </span>
                      <span class="tag is-link is-large">
                        <input v-model="illust.originUrl" class="input is-small has-text-black" :placeholder="illust.originUrl">
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
                <Modal title="イラストの置き換え" :isModalOpen="openReplace == true" @modal-closed="openReplace = false">
                  <p>
                    今開いているイラストで指定したIDのイラストを置き換えます。
                    より高画質なイラストで低画質なイラストを置き換えるときにご利用ください。
                  </p>
                  <p>
                    置き換えると指定したIDのイラストは検索結果に表示されなくなります。
                  </p>
                  <p class="is-size-7">
                    旧イラストのタグ/いいね/マイリストは今開いているイラストに統合されます
                    名称/説明/出典は今開いている状態が維持されます
                  </p>
                  <div class="field  has-addons-centered has-addons">
                    <div class="control">
                      <input v-model="replaceNumber" type="number" min="1" placeholder="置き換えるイラストID" class="input">
                    </div>
                    <div class="control">
                      <button
                        class="button is-primary"
                        type="button"
                        @click="openReplace = false; requestReplace();"
                      >
                        置き換えを確認する
                      </button>
                    </div>
                  </div>
                </Modal>
                <Modal title="置き換え確認" :isModalOpen="openReplaceConfirm == true" @modal-closed="openReplaceConfirm = false">
                  <p>
                    置き換え処理後、旧イラストは非表示になり
                    現在のイラストで置き換えられます。
                    本当に置き換えしてよろしいですか?
                  </p>
                  <table>
                    <thead>
                      <tr>
                        <th>項目</th>
                        <th>旧イラスト</th>
                        <th>新イラスト</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>タイトル</th>
                        <td>{{ replaceInfo.from.title }}</td>
                        <td>{{ replaceInfo.to.title }}</td>
                      </tr>
                      <tr>
                        <th>絵師</th>
                        <td>{{ replaceInfo.from.artist.name }}</td>
                        <td>{{ replaceInfo.to.artist.name }}</td>
                      </tr>
                      <tr>
                        <th>出典</th>
                        <td>{{ replaceInfo.from.originService }}</td>
                        <td>{{ replaceInfo.to.originService }}</td>
                      </tr>
                      <tr>
                        <th>いいね数</th>
                        <td>{{ replaceInfo.from.like }}</td>
                        <td>{{ replaceInfo.to.like + replaceInfo.from.like }}</td>
                      </tr>
                      <tr>
                        <th>解像度</th>
                        <td>{{ replaceInfo.from.width }}x{{ replaceInfo.from.height }}</td>
                        <td>{{ replaceInfo.to.width }}x{{ replaceInfo.to.height }}</td>
                      </tr>
                      <tr>
                        <th>ファイル</th>
                        <td>{{ replaceInfo.from.filesize }}</td>
                        <td>{{ replaceInfo.to.filesize }}</td>
                      </tr>
                    </tbody>
                  </table>
                  <button class="button is-danger is-pulled-right" type="button" @click="replace()">
                    置き換えを反映する
                  </button>
                </Modal>
              </div>
              <div class="column is-12 has-text-centered">
                <button class="button is-primary is-large" @click="update()">
                  更新する
                </button>
              </div>
              <br>
              <div class="column is-12 has-text-centered">
                <a class="button is-warning is-small" @click="openReplace = true">
                  置き換える(旧イラストを非表示にする)
                </a>
              </div>
              <div class="column is-12 has-text-centered">
                <a class="button is-danger is-small" @click="remove()">
                  削除(このイラストを非表示にする)
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Fas from '~/components/ui/Fas.vue'
import Modal from '~/components/ui/Modal.vue'

export default {
  validate ({ params }) {
    return /^\d+$/.test(params.id)
  },
  components: {
    Fas,
    Modal
  },
  async asyncData ({ $axios, $auth, route, error }) {
    const endpoint = '/arts/'
    const id = isFinite(route.params.id) ? parseInt(route.params.id) : 1
    const response = await $axios.get(endpoint + id)
    if (response.data.status !== 200) {
      return error({ statusCode: 404, message: 'err' })
    }
    const illust = response.data.data
    if (illust.user.id !== $auth.$state.user.userID && $auth.$state.user.permission !== 9) {
      return error({ statusCode: 401, message: 'err' })
    }
    let vtags = illust.chara.map(tag => ({ text: tag[1] }))
    vtags = vtags.concat(illust.tag.map(tag => ({ text: tag[1] })))
    vtags = vtags.concat(illust.group.map(tag => ({ text: tag[1] })))
    vtags = vtags.concat(illust.system.map(tag => ({ text: tag[1] })))
    illust.tag = vtags
    return {
      illust
    }
  },
  data () {
    return {
      tag: '',
      tags: [],
      replaceNumber: 0,
      openReplace: false,
      openReplaceConfirm: false,
      openRemove: false,
      replaceInfo: {
        from: {
          title: '',
          artist: {
            name: ''
          },
          width: 0,
          height: 0,
          like: 0,
          originUrl: '',
          filesize: ''
        },
        to: {
          title: '',
          artist: {
            name: ''
          },
          width: 0,
          height: 0,
          like: 0,
          originUrl: '',
          filesize: ''
        }
      },
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
      return process.env.CDN_ENDPOINT +
        'illusts/large/' +
        this.illust.illustID +
        '.' +
        (this.$store.state.user.useWebP ? 'webp' : 'jpg')
    }
  },
  methods: {
    async update () {
      this.$router.go(-1)
      this.$notify(
        {
          group: 'default',
          type: 'warning',
          duration: 2000,
          title: 'イラスト編集',
          text: '更新しています...'
        }
      )
      const newTagData = this.illust.tag.map(tag => (tag.text))
      const params = {
        title: this.illust.title,
        caption: this.illust.caption,
        originService: this.illust.originService,
        originUrl: this.illust.originUrl,
        imageUrl: this.illust.originUrl,
        artist: this.illust.artist,
        tag: newTagData,
        chara: [],
        nsfw: this.illust.R18
      }
      const response = await this.$axios.put('/arts/' + this.illust.illustID, params)
      this.isSending = false
      if (response.data.status === 200) {
        this.$notify(
          {
            group: 'default',
            type: 'success',
            duration: 8000,
            title: 'イラスト編集',
            text: '更新しました!'
          }
        )
      } else {
        this.$notify(
          {
            group: 'default',
            type: 'danger',
            duration: 8000,
            title: 'イラスト編集',
            text: '更新に失敗しました'
          }
        )
      }
    },
    async requestReplace () {
      const response = await this.$axios.put(
        '/arts/' + this.replaceNumber + '/replace',
        { illustID: this.illust.illustID, status: 0 }
      )
      if (response.data.status !== 200) {
        this.$notify(
          {
            group: 'default',
            type: 'danger',
            duration: 8000,
            title: 'イラスト編集',
            text: '置き換え情報を取得できませんでした'
          }
        )
      } else {
        this.openReplaceConfirm = true
        this.replaceInfo = response.data.data
      }
    },
    async replace () {
      this.$router.go(-1)
      this.$notify(
        {
          group: 'default',
          type: 'warning',
          duration: 3000,
          title: 'イラスト編集',
          text: '置き換えしています..'
        }
      )
      const response = await this.$axios.put(
        '/arts/' + this.replaceNumber + '/replace',
        { illustID: this.illust.illustID, status: 1 }
      )
      if (response.data.status === 200) {
        this.$notify(
          {
            group: 'default',
            type: 'success',
            duration: 8000,
            title: 'イラスト編集',
            text: '置き換えしました!'
          }
        )
      } else {
        this.$notify(
          {
            group: 'default',
            type: 'danger',
            duration: 8000,
            title: 'イラスト編集',
            text: '置き換えに失敗しました'
          }
        )
      }
    },
    async remove () {
      this.$router.go(-2)
      this.$notify(
        {
          group: 'default',
          type: 'warning',
          duration: 8000,
          title: 'イラスト削除',
          text: '削除しています'
        }
      )
      const response = await this.$axios.delete('/arts/' + this.illust.illustID)
      if (response.data.status === 200) {
        this.$notify(
          {
            group: 'default',
            type: 'success',
            duration: 8000,
            title: 'イラスト削除',
            text: '削除しました!'
          }
        )
      } else {
        this.$notify(
          {
            group: 'default',
            type: 'danger',
            duration: 8000,
            title: 'イラスト削除',
            text: '削除に失敗しました'
          }
        )
      }
    }
  },
  head () {
    return {
      title: 'イラストデータ編集'
    }
  }
}
</script>
