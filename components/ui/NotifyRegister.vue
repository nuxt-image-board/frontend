<template>
  <div class="field has-text-centered">
    <input
      id="notifyButton"
      v-model="notifyEnabled"
      name="notifyButton"
      class="is-checkradio is-info is-large"
      type="checkbox"
      :disabled="!isFetchFinished"
      @click="openNotifyPopup"
    >
    <label for="notifyButton">新着通知</label>
    <Modal :title="'通知登録: ' + notifyTitle" :isModalOpen="notifyPopup" @modal-closed="closeNotifyPopup">
      <h4 class="has-text-centered">
        新着イラスト通知を有効にしますか?
      </h4>
      <p class="has-text-centered">
        通知を有効にすると指定した条件の新着イラストが投稿された際にお知らせします。
        条件の設定次第では、高頻度で通知される可能性があります。詳細はヘルプをご確認ください。
      </p>
      <p class="subtitle has-text-centered">
        <button class="button is-primary is-large" @click="registerNotify">
          有効にする
        </button>
      </p>
    </Modal>
  </div>
</template>

<script>
import Modal from '~/components/ui/Modal.vue'

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
      isFetchFinished: false
    }
  },
  watch: {
    notifyEnabled (val) {
      if (val === false) {
        this.requestUnregisterNotify()
      }
    }
  },
  async mounted () {
    const params = {
      id: this.notifyTargetID,
      type: this.notifyTargetType,
      method: 0
    }
    const resp = await this.$axios.get('/notify/find', { params })
    if (resp.data.status === 200) {
      this.notifyEnabled = true
    } else {
      this.notifyEnabled = false
    }
    this.isFetchFinished = true
  },
  methods: {
    registerNotify () {
      this.requestRegisterNotify()
      this.notifyPopup = false
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
    async requestRegisterNotify () {
      const params = {
        type: this.notifyTargetType,
        method: 0,
        id: 0
      }
      if (!isNaN(this.notifyTargetID)) {
        params.id = this.notifyTargetID
      }
      const resp = await this.$axios.post('/notify/register', params)
      if (resp.data.status !== 200) {
        alert('通知登録エラー (リロードしてください)')
      }
    },
    async requestUnregisterNotify () {
      const params = {
        type: this.notifyTargetType,
        method: 0,
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
