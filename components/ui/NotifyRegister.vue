<template>
  <div class="field has-text-centered">
    <input
      id="notifyButton"
      v-model="notifyEnabled"
      name="notifyButton"
      class="is-checkradio is-success is-medium"
      type="checkbox"
      :disabled="!isFetchFinished"
      @click="openNotifyPopup"
    >
    <label class="content" for="notifyButton">新着通知</label>
    <Modal :title="'通知登録: ' + notifyTitle" :isModalOpen="notifyPopup" @modal-closed="closeNotifyPopup">
      <h4 class="has-text-centered">
        新着イラスト通知を有効にしますか?
      </h4>
      <p class="has-text-centered">
        通知を有効にすると指定した条件の新着イラストが投稿された際にお知らせします。
        条件の設定次第では、高頻度で通知される可能性があります。詳細はヘルプをご確認ください。
      </p>
      <h5 class="has-text-centered">
        通知先
      </h5>
      <div class="field is-grouped is-grouped-centered">
        <div class="control">
          <input
            id="webCheck"
            v-model="notifySelection.web"
            class="is-checkradio"
            type="checkbox"
            name="webCheck"
            :disabled="!notifyConfigured.web"
          >
          <label class="checkbox" for="webCheck">ブラウザ</label>
        </div>
        <div class="control">
          <input
            id="lineCheck"
            v-model="notifySelection.line"
            class="is-checkradio"
            type="checkbox"
            name="lineCheck"
            :disabled="!notifyConfigured.line"
          >
          <label for="lineCheck">LINE</label>
        </div>
        <div class="control">
          <input
            id="twitterCheck"
            v-model="notifySelection.twitter"
            class="is-checkradio"
            type="checkbox"
            name="twitterCheck"
            :disabled="!notifyConfigured.twitter"
          >
          <label for="twitterCheck">Twitter</label>
        </div>
      </div>
      <p class="subtitle has-text-centered">
        <button class="button is-primary is-large" @click="registerNotify">
          有効にする
        </button>
      </p>
    </Modal>
  </div>
</template>

<script>
import Modal from '@/components/ui/Modal.vue'

export default {
  components: {
    Modal
  },
  props: {
    notifyTitle: {
      type: String,
      default: '***REMOVED***'
    },
    notifyTargetType: {
      type: Number,
      default: 0
    },
    notifyTargetID: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      notifyEnabled: false,
      notifyPopup: false,
      notifySelection: {
        web: false,
        line: false,
        twitter: false
      },
      notifyConfigured: {
        web: !!this.$auth.$state.user.oneSignalNotify,
        line: !!this.$auth.$state.user.lineNotify,
        twitter: false
      },
      isFetchFinished: false
    }
  },
  watch: {
    notifyEnabled (val) {
      if (val === false) {
        this.unregisterNotify()
      }
    }
  },
  async mounted () {
    // 1つも設定されていなければ無効化
    if (
      this.notifyConfigured.line ||
      this.notifyConfigured.web ||
      this.notifyConfigured.twitter
    ) {
      await this.fetchNotify()
      this.isFetchFinished = true
    }
  },
  methods: {
    registerNotify () {
      let notifyMethod = 0
      for (const key in this.notifySelection) {
        if (this.notifySelection[key] === true) {
          this.requestRegisterNotify(notifyMethod)
        }
        notifyMethod += 1
      }
      this.notifyPopup = false
    },
    unregisterNotify () {
      let notifyMethod = 0
      for (const key in this.notifySelection) {
        if (this.notifySelection[key] === true) {
          this.requestUnregisterNotify(notifyMethod)
          this.notifySelection[key] = false
        }
        notifyMethod += 1
      }
    },
    async fetchNotify () {
      const params = {
        id: this.notifyTargetID,
        type: this.notifyTargetType
      }
      const resp = await this.$axios.get('/notify/finds', { params })
      for (const key in resp.data.data) {
        this.notifySelection[key] = resp.data.data[key]
        if (resp.data.data[key] === true) {
          this.notifyEnabled = true
        }
      }
    },
    openNotifyPopup () {
      if (!this.notifyEnabled) {
        this.notifyPopup = true
      }
    },
    closeNotifyPopup () {
      this.notifyEnabled = false
      this.notifyPopup = false
    },
    async requestRegisterNotify (notifyMethod) {
      const params = {
        type: this.notifyTargetType,
        method: notifyMethod,
        id: 0
      }
      if (!isNaN(this.notifyTargetID)) {
        params.id = this.notifyTargetID
      }
      const resp = await this.$axios.post('/notify/register', params)
      if (resp.data.status !== 200) {
        this.$notify(
          {
            group: 'default',
            type: 'danger',
            duration: 5000,
            title: '通知登録エラー',
            text: 'ページを再読み込みしてください'
          }
        )
      }
    },
    async requestUnregisterNotify (notifyMethod) {
      const params = {
        type: this.notifyTargetType,
        method: notifyMethod,
        id: 0
      }
      if (!isNaN(this.notifyTargetID)) {
        params.id = this.notifyTargetID
      }
      // 失敗しようが知らん。
      await this.$axios.post('/notify/unregister', params)
    }
  }
}
</script>
