<template>
  <nav class="panel">
    <p class="panel-heading has-text-dark has-background-chino">
      {{ $t('ipfsSettings.title') }}
    </p>
    <a class="panel-block" @click="modalType = 1">
      <span class="panel-icon">
        <i class="fas fa-book" aria-hidden="true" />
      </span>
      {{ $t('ipfsSettings.about.title') }}
    </a>
    <Modal :title="$t('ipfsSettings.about.title')" :isModalOpen="modalType === 1" @modal-closed="modalType = 0">
      <p>{{ $t('ipfsSettings.about.sentence') }}</p>
      <p>{{ $t('ipfsSettings.about.sentence2') }}</p>
      <p>{{ $t('ipfsSettings.about.sentence3') }}</p>
      <p>{{ $t('ipfsSettings.about.sentence4') }}</p>
    </Modal>
    <a class="panel-block" @click="modalType = 0">
      <span class="panel-icon">
        <i class="fas fa-book" aria-hidden="true" />
      </span>
      {{ $t('ipfsSettings.use.title') }}
    </a>
    <Modal :title="$t('ipfsSettings.use.title')" :isModalOpen="modalType === 2" @modal-closed="modalType = 0">
      <p>{{ $t('ipfsSettings.use.sentence') }}</p>
      <div v-for="c in $t('ipfsSettings.use').checkbox" :key="c" class="field">
        <input class="is-checkradio is-rtl" type="checkbox" :name="c">
        <label :for="c">{{ c }}</label>
      </div>
      <button class="button is-medium is-primary" disabled>
        {{ $t('ipfsSettings.use.button') }}
      </button>
    </Modal>
    <a class="panel-block" @click="modalType = 0">
      <span class="panel-icon">
        <i class="fas fa-book" aria-hidden="true" />
      </span>
      {{ $t('ipfsSettings.gateway.title') }}
    </a>
    <Modal :title="$t('ipfsSettings.gateway.title')" :isModalOpen="modalType === 3" @modal-closed="modalType = 0">
      <p>{{ $t('ipfsSettings.gateway.sentence') }}</p>
      <p>ゲートウェイエンドポイント: <input placeholder="http://127.0.0.1:8080" class="input"></p>
      <p class="is-size-7">
        {{ $t('ipfsSettings.gateway.mixed_content') }}
      </p>
      <button class="button is-medium is-primary">
        適用
      </button>
    </Modal>
    <a class="panel-block" @click="modalType = 0">
      <span class="panel-icon">
        <i class="fas fa-book" aria-hidden="true" />
      </span>
      {{ $t('ipfsSettings.copy.title') }}
    </a>
    <Modal :title="$t('ipfsSettings.copy.title')" :isModalOpen="modalType === 4" @modal-closed="modalType = 0">
      <p>{{ $t('ipfsSettings.copy.sentence') }}</p>
      <p>APIエンドポイント: <input placeholder="http://127.0.0.1:5001" class="input"></p>
      <p class="is-size-7">
        {{ $t('ipfsSettings.copy.mixed_content') }}
      </p>
      <div class="field">
        <input class="is-checkradio is-rtl" type="checkbox" name="copy">
        <label for="copy">ノードにコピーする</label>
      </div>
      <div class="field">
        <input class="is-checkradio is-rtl" type="checkbox" name="pin">
        <label for="pin">ノードにピンする</label>
      </div>
      <button class="button is-medium is-primary">
        適用
      </button>
    </Modal>
  </nav>
</template>

<script>
import Modal from '@/components/ui/Modal.vue'

export default {
  components: {
    Modal
  },
  data () {
    return {
      modalType: 0,
      NOTIFY_CONNECT_URL: '',
      TWITTER_CONNECT_URL: ''
    }
  },
  methods: {
    async registerOneSignal (userId) {
      const resp = await this.$axios.post('/notify/setting/onesignal', { id: userId })
      if (resp.data.status === 200) {
        this.$notify(
          {
            group: 'default',
            type: 'success',
            duration: 5000,
            title: 'ブラウザ通知設定',
            text: '追加に成功しました。'
          }
        )
        this.modalType = 0
      } else if (resp.data.status === 409) {
        this.$notify(
          {
            group: 'default',
            type: 'danger',
            duration: 5000,
            title: 'ブラウザ通知設定',
            text: '既に登録済みです。'
          }
        )
        this.modalType = 0
      } else {
        this.$notify(
          {
            group: 'default',
            type: 'danger',
            duration: 5000,
            title: 'ブラウザ通知設定',
            text: 'これ以上追加できません。初期化が必要です。'
          }
        )
      }
    },
    async resetOneSignal () {
      const resp = await this.$axios.delete('/notify/setting/onesignal')
      if (resp.data.status === 200) {
        this.$notify(
          {
            group: 'default',
            type: 'success',
            duration: 5000,
            title: 'ブラウザ通知設定',
            text: '初期化が完了しました'
          }
        )
      }
    }
  }
}
</script>
