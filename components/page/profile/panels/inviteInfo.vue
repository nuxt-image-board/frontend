<template>
  <nav class="panel">
    <p class="panel-heading has-text-dark has-background-cocoa">
      {{ $t('inviteInfo.title') }}
    </p>
    <p class="panel-block">
      {{ $t('inviteInfo.inviter') }} {{ $auth.$state.user.inviter.name }}
    </p>
    <p class="panel-block">
      {{ $t('inviteInfo.invited_count') }} {{ $auth.$state.user.invite.invited }}
    </p>
    <p class="panel-block">
      {{ $t('inviteInfo.invite_status.title') }} {{ IS_INVITE_ENABLED }}
    </p>
    <p class="panel-block">
      <button
        class="button is-link is-outlined is-fullwidth"
        :disabled="!$auth.$state.user.invite.enabled"
        @click="getInviteKey(); openModal = !openModal"
      >
        {{ $t('inviteInfo.button') }}
      </button>
    </p>
    <Modal :title="$t('inviteInfo.button')" :isModalOpen="openModal" @modal-closed="openModal = !openModal">
      <h2 class="has-text-centered">
        {{ $t('inviteInfo.your_invite_code') }}
      </h2>
      <p class="subtitle has-text-centered" style="word-break:break-all">
        {{ inviteKey }}
      </p>
      <p>
        {{ $t('inviteInfo.sentence1') }}
      </p>
      <p>
        {{ $t('inviteInfo.sentence2') }}
      </p>
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
      openModal: false,
      inviteKey: ''
    }
  },
  computed: {
    IS_INVITE_ENABLED () {
      return this.$auth.$state.user.invite.enabled ? this.$t('inviteInfo.invite_status.enabled') : this.$t('inviteInfo.invite_status.disabled')
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
