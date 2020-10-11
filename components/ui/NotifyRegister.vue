<template>
  <span>
    <a
      :disabled="!isFetchFinished"
      @click="notifyButtonPressed"
    >
      <div class="tags has-addons">
        <span class="tag is-small">
          <Fas v-if="isNotifyEnabled" i="bell" classes="is-size-6" />
          <Far v-else i="bell" classes="is-size-6" />
        </span>
        <span class="tag is-link is-small">
          {{ $t('UtilArea.toggle_notify') }}
        </span>
      </div>
    </a>
    <Modal :title="'通知登録: ' + notifyTitle" :isModalOpen="notifyPopup" @modal-closed="notifyPopup = false">
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
  </span>
</template>

<script>
import Modal from '@/components/ui/Modal.vue'
import Fas from '@/components/ui/Fas.vue'
import Far from '@/components/ui/Far.vue'

export default {
  components: {
    Modal,
    Fas,
    Far
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
      notifyPopup: false,
      isFetchFinished: false,
      isNotifyEnabled: false,
      notifySelection: {
        web: false,
        line: false,
        twitter: false
      },
      notifyConfigured: {
        web: !!this.$auth.$state.user.oneSignalNotify,
        line: !!this.$auth.$state.user.lineNotify,
        twitter: false
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
    notifyButtonPressed () {
      if (this.isNotifyEnabled) {
        this.unregisterNotify()
      } else {
        this.notifyPopup = true
      }
    },
    registerNotify () {
      let notifyMethod = 0
      for (const key in this.notifySelection) {
        if (this.notifySelection[key] === true) {
          this.requestRegisterNotify(notifyMethod)
        }
        notifyMethod += 1
      }
      this.isNotifyEnabled = true
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
      this.isNotifyEnabled = false
      this.notifyPopup = false
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
          this.isNotifyEnabled = true
        }
      }
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
      await this.$axios.post('/notify/register', params)
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
      await this.$axios.post('/notify/unregister', params)
    }
  }
}
</script>
