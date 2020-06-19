<template>
  <nav class="panel">
    <p class="panel-heading has-text-dark has-background-cocoa">
      招待情報
    </p>
    <p class="panel-block">
      招待者: {{ $auth.$state.user.inviter.name }}
    </p>
    <p class="panel-block">
      招待数:  {{ $auth.$state.user.invite.invited }}
    </p>
    <p class="panel-block">
      招待可否: {{ IS_INVITE_ENABLED }}
    </p>
    <p class="panel-block">
      <button
        class="button is-link is-outlined is-fullwidth"
        :disabled="!$auth.$state.user.invite.enabled"
        @click="getInviteKey(); openModal = !openModal"
      >
        招待する
      </button>
    </p>
    <Modal title="招待" :isModalOpen="openModal" @modal-closed="openModal = !openModal">
      <h2 class="has-text-centered">
        あなたの招待コード
      </h2>
      <p class="subtitle has-text-centered" style="word-break:break-all">
        {{ inviteKey }}
      </p>
      <p>
        この招待コードを他の人に伝えることで***REMOVED***に新規登録してもらうことができます。
      </p>
      <p>
        ただし、このコードを使い招待された人がなんらかの理由でBANされた場合、あなたにも罰則が付きます。
        つまり、あなたがそのユーザーの保証人になります。信頼できる人のみを招待してください。
      </p>
    </Modal>
  </nav>
</template>

<script>
import Modal from '~/components/ui/Modal.vue'

export default {
  components: {
    Modal
  },
  data () {
    return {
      openModal: false,
      inviteKey: ''
    }
  },
  computed: {
    IS_INVITE_ENABLED () {
      return this.$auth.$state.user.invite.enabled ? '可' : '否'
    }
  },
  methods: {
    async getInviteKey () {
      if (this.$auth.$state.user.invite.code === null) {
        const resp = await this.$axios.get('/invites')
        if (resp.data.status === 200) {
          this.inviteKey = resp.data.data.code
        }
      } else {
        this.inviteKey = this.$auth.$state.user.invite.code
      }
    }
  }
}
</script>
