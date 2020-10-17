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
          <div class="box rounded is-large has-text-white has-background-space">
            <Fas :class="color[1]+' is-size-5'" i="star" />
            <p class="is-size-5">
              x 10
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
        <button class="button is-size-4 has-background-space">
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
      ]
    }
  },
  watch: {
    isModalOpen (newVal) {
      this.openMenu = newVal
    }
  },
  methods: {
    modalClosed () {
      this.$emit('modal-closed', true)
      this.openMenu = false
    },
    async addStar (illustID, likeType) {
      const resp = await this.$axios.put(`/arts/${illustID}/likes/${likeType}`)
      console.log(resp)
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
