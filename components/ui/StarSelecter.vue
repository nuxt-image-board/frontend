<template>
  <div>
    <Modal
      title="スター選択メニュー"
      :isModalOpen="openMenu"
      class="has-text-black"
      @modal-closed="modalClosed()"
    >
      <p class="has-text-centered is-size-5">
        あなたの所持スター
      </p>
      <div class="columns is-mobile is-centered is-vcentered is-multiline has-text-centered">
        <div
          v-for="(color, index) in starColors"
          :key="index"
          class="column is-3-desktop is-6-mobile rounded"
        >
          <div
            :class="{
              'big-shine': $store.state.user.currentStars[index] > 0,
              'shine': $store.state.user.currentStars[index] > 0
            }"
            class="box rounded is-large has-text-white has-background-space"
          >
            <Fas :class="`${color} is-size-5`" i="star" />
            <p v-if="index > 0" class="is-size-5">
              x {{ $store.state.user.currentStars[index] }}
            </p>
            <p v-else class="is-size-5">
              x ∞
            </p>
          </div>
        </div>
      </div>
      <p class="has-text-centered is-size-5">
        どのスターを消費しますか?
      </p>
      <div class="buttons has-addons is-centered">
        <button class="button is-size-4 has-background-space" @click="rollStarSelect()">
          <p :class="starColors[starId]">
            ■
          </p>
        </button>
        <button class="button is-size-4 has-background-space" @click="addStar(illustID, starId)">
          <Fas :class="`${starColors[starId]} fa-lg`" i="star" />
          <p class="has-text-white">
            を付ける
          </p>
        </button>
      </div>
    </Modal>
  </div>
</template>

<style>
.has-background-space {
  background-color: #00004d;
}
</style>

<script>
import Fas from '@/components/ui/Fas.vue'
import Modal from '@/components/ui/Modal.vue'

export default {
  components: {
    Modal,
    Fas
  },
  props: {
    illustID: {
      type: Number,
      default: 1
    },
    isModalOpen: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      openMenu: this.isModalOpen,
      starId: 0,
      starColors: [
        'has-text-syaro',
        'has-text-chiya',
        'has-text-cocoa',
        'has-text-chino'
      ]
    }
  },
  watch: {
    isModalOpen (newVal) {
      this.openMenu = newVal
    }
  },
  async mounted () {
    const assets = await this.$axios.get('/toymoney/users/assets')
    // 持っているプロダクトID一覧をセット
    this.$store.commit(
      'user/setObtainedProducts', assets.data.assets.map(a => a.id)
    )
    // 持っているカラースター一覧をセット
    const currentStars = [...Array(4)].map(i => i === 0 ? 999 : 0)
    const startProductNum = 18
    for (let i = 0; i < 3; i++) {
      const starData = assets.data.assets.filter(a => a.id === startProductNum + i)
      if (starData.length > 0) {
        currentStars[i + 1] = starData[0].count
      }
    }
    this.$store.commit(
      'user/setCurrentStars', currentStars
    )
  },
  methods: {
    modalClosed () {
      this.$emit('modal-closed', true)
      this.openMenu = false
    },
    async addStar (illustID, starType) {
      this.modalClosed()
      this.$notify({
        group: 'default',
        type: 'warning',
        duration: 2000,
        title: 'スター',
        text: '財布の中身を確認しています'
      })
      const resp = await this.$axios.put(`/arts/${illustID}/likes/${starType}`)
      if (resp.data.status === 200) {
        this.$emit('add-star-success', starType)
        if (starType !== 0) {
          const newInventory = JSON.parse(JSON.stringify(this.$store.state.user.currentStars))
          newInventory[starType] -= 1
          this.$store.commit(
            'user/setCurrentStars', newInventory
          )
        }
        this.$notify({
          group: 'default',
          type: 'success',
          duration: 2000,
          title: 'スター',
          text: '財布からスターを消費しました'
        })
      } else if (resp.data.status === 406) {
        this.$notify({
          group: 'default',
          type: 'danger',
          duration: 2000,
          title: 'スター',
          text: `${this.$auth.$state.user.name}社長! お金もないのに見栄をはらないでください!`
        })
      }
    },
    rollStarSelect () {
      if (this.starId >= (this.starColors.length - 1)) {
        this.starId = 0
      } else {
        this.starId += 1
      }
    }
  }
}
</script>
