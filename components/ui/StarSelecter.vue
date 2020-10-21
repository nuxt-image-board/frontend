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
          v-for="color in starColors"
          :key="color[0]"
          class="column is-3-desktop is-6-mobile rounded"
        >
          <div class="box shine big-shine rounded is-large has-text-white has-background-space">
            <Fas :class="color[1]+' is-size-5'" i="star" />
            <p class="is-size-5">
              x {{ $store.state.user.currentStars[17+color[0]] && (color[0] > 0 ) ? $store.state.user.currentStars[17+color[0]].count : '∞' }}
            </p>
          </div>
        </div>
      </div>
      <p class="has-text-centered is-size-5">
        どのスターを消費しますか?
      </p>
      <div class="buttons has-addons is-centered">
        <button class="button is-size-4 has-background-space" @click="rollStarSelect()">
          <p :class="starColors[starId][1]">
            ■
          </p>
        </button>
        <button class="button is-size-4 has-background-space" @click="addStar(illustID, starId)">
          <Fas :class="starColors[starId][1] +' fa-lg'" i="star" />
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
    },
    currentStars: {
      type: Object,
      default: () => {
        return { yellow: 0, green: 0, red: 0, blue: 0 }
      }
    }
  },
  data () {
    return {
      openMenu: this.isModalOpen,
      starId: 0,
      starColors: [
        [0, 'has-text-syaro'],
        [1, 'has-text-chiya'],
        [2, 'has-text-cocoa'],
        [3, 'has-text-chino']
      ],
      starColorsDict: {
        0: 'yellow',
        1: 'green',
        2: 'red',
        3: 'blue'
      }
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
    const inventory = {}
    assets.data.assets.forEach((asset) => {
      inventory[asset.id] = { limit: asset.limit, count: asset.count }
    })
    this.$store.commit(
      'user/setCurrentStars', inventory
    )
  },
  methods: {
    modalClosed () {
      this.$emit('modal-closed', true)
      this.openMenu = false
    },
    async addStar (illustID, likeType) {
      const resp = await this.$axios.put(`/arts/${illustID}/likes/${likeType}`)
      if (resp.data.status === 200) {
        this.currentStars[this.starColorsDict[likeType]] += 1
        if (likeType !== 0) {
          const newInventory = JSON.parse(JSON.stringify(this.$store.state.user.currentStars))
          newInventory[17 + likeType].count -= 1
          this.$store.commit(
            'user/setCurrentStars', newInventory
          )
        }
        this.$notify({
          group: 'default',
          type: 'success',
          duration: 2000,
          title: 'スター',
          text: 'スターを消費しました'
        })
        this.modalClosed()
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
