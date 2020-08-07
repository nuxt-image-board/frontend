<template>
  <section class="section">
    <div class="container is-widescreen has-text-centered">
      <div class="columns is-centered is-vcentered">
        <div class="column is-4 is-centered">
          <userInfo />
        </div>
        <div class="column is-4 is-centered">
          <inviteInfo />
        </div>
        <div v-if="!$device.isIos" class="column is-4 is-centered">
          <storageInfo />
        </div>
      </div>
      <div class="columns is-vcentered is-centered">
        <div class="column is-4 is-centered">
          <siteSettings />
        </div>
        <div class="column is-4 is-centered">
          <accountSettings />
        </div>
        <div class="column is-4 is-vcentered has-text-centered" style="height:100%">
          <notifySettings />
        </div>
      </div>
      <br>
      <br>
      <div class="column is-12">
        <button class="button is-danger is-small" @click="modalType = 6">
          退会する
        </button>
        <Modal title="退会" :isModalOpen="modalType === 6" @modal-closed="modalType = 0; destroyStep = 0">
          <h2 class="has-text-centered">
            {{ destroyMessages[destroyStep][0] }}
          </h2>
          <p class="subtitle has-text-centered" style="word-break:break-all">
            <button v-if="destroyStep < 3" class="button is-warning is-large" @click="destroyStep+=1">
              {{ destroyMessages[destroyStep][1] }}
            </button>
            <button v-else class="button is-danger is-large" @click="destroyAccount">
              {{ destroyMessages[destroyStep][1] }}
            </button>
          </p>
          <p>
            退会しても登録したイラストは残ります。
            再度***REMOVED***を利用するには新たに招待コードを受け取る必要があります。
          </p>
        </Modal>
      </div>
    </div>
  </section>
</template>

<script>
import Modal from '~/components/ui/Modal.vue'
import userInfo from '~/components/page/profile/panels/userInfo.vue'
import storageInfo from '~/components/page/profile/panels/storageInfo.vue'
import inviteInfo from '~/components/page/profile/panels/inviteInfo.vue'
import siteSettings from '~/components/page/profile/panels/siteSettings.vue'
import accountSettings from '~/components/page/profile/panels/accountSettings.vue'
import notifySettings from '~/components/page/profile/panels/notifySettings.vue'

export default {
  components: {
    Modal,
    userInfo,
    storageInfo,
    inviteInfo,
    siteSettings,
    accountSettings,
    notifySettings
  },
  data () {
    return {
      modalType: 0,
      destroyStep: 0,
      destroyMessages: [
        ['本当に退会してよろしいですか?', 'よろしいです'],
        ['本当にいいですね?', '本当にいい'],
        ['後悔しませんね?', '後悔しない'],
        ['最終確認: アカウントを削除して退会します', '退会する']
      ]
    }
  },
  methods: {
    destroyAccount () {
      this.$notify(
        {
          group: 'default',
          type: 'danger',
          duration: 5000,
          title: '未実装',
          text: '問い合わせフォームから直接お問い合わせください'
        }
      )
    }
  },
  head () {
    return {
      title: 'マイページ'
    }
  }
}
</script>
