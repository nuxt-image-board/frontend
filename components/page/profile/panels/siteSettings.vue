<template>
  <nav class="panel">
    <p class="panel-heading has-text-dark has-background-chiya">
      サイト設定
    </p>
    <table class="table is-fullwidth centered-table">
      <tbody>
        <Setting
          v-for="setting in settings"
          v-show="(setting.mobile_only && !$store.state.user.isPC ) || !setting.mobile_only"
          :key="setting.key"
          :storeKey="setting.key"
          :title="setting.title"
          :items="setting.items"
          :isDisabled="setting.require_product ? (
            !$store.state.user.obtainedProducts.includes(setting.require_product) ? true : false) : false"
          :classes="setting.class ? setting.class : ''"
          @openModal="showModal"
          @closeModal="hideModal"
        />
      </tbody>
    </table>
    <Modal
      v-for="setting in settings"
      :key="setting.key"
      :title="setting.title"
      :isModalOpen="setting.flag"
      @modal-closed="hideModal"
    >
      {{ setting.description }}
    </Modal>
  </nav>
</template>

<script>
import { settings } from '~/assets/texts/settings.json'
import Modal from '@/components/ui/Modal.vue'
import Setting from '@/components/page/profile/toggle/setting.vue'

export default {
  components: {
    Modal,
    Setting
  },
  data () {
    return {
      settings
    }
  },
  methods: {
    showModal (modalKey) {
      let modalID = 0
      this.settings.forEach((setting) => {
        if (setting.key === modalKey) {
          this.settings[modalID].flag = true
        }
        modalID += 1
      })
    },
    hideModal () {
      for (let i = 0; i < this.settings.length; i++) {
        this.settings[i].flag = false
      }
    }
  }
}
</script>
