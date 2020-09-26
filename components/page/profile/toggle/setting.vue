<template>
  <tr>
    <td>
      <a @click="$emit('openModal', storeKey)">
        {{ title }}
      </a>
    </td>
    <td>
      <div v-if="items.length < 1 && !placeholder" class="field">
        <input
          :id="'switch' + storeKey"
          v-model="computedStore"
          type="checkbox"
          :name="'switch' + storeKey"
          class="switch is-rounded"
          :class="`${classes}`"
          :disabled="isDisabled"
        >
        <label :for="'switch' + storeKey" />
      </div>
      <div v-else-if="items.length > 0">
        <SelectForm
          :sortMethod="String(computedStore)"
          :options="items"
          :disabled="isDisabled"
          :isMedium="false"
          @onSelectChanged="setStore"
        />
      </div>
      <div v-else>
        <input
          v-model="computedStore"
          type="text"
          :placeholder="placeholder"
          class="input"
        >
      </div>
    </td>
  </tr>
</template>

<script>
import SelectForm from '@/components/ui/SelectForm.vue'

export default {
  components: {
    SelectForm
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    storeKey: {
      type: String,
      default: ''
    },
    classes: {
      type: String,
      default: 'is-info'
    },
    isDisabled: {
      type: Boolean,
      default: false
    },
    items: {
      type: Array,
      default: () => {
        return []
      }
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      openModal: false
    }
  },
  computed: {
    computedStore: {
      get () {
        return this.$store.state.user[this.storeKey]
      },
      set (value) {
        this.$store.commit('user/updateSetting', { path: this.storeKey, param: value })
        if (this.storeKey === 'locale') {
          this.$i18n.locale = value
        }
        if (['isPC', 'useSakura'].includes(this.storeKey)) {
          location.reload()
        } else if (this.storeKey === 'useMusicPlayer' && value === true) {
          this.$store.commit('user/updateSetting', { path: 'playerVideoIndex', param: 0 })
          this.$store.commit('user/updateSetting', { path: 'playerVideoCurrent', param: 0 })
          this.$store.commit('user/updateSetting', { path: 'playerVolume', param: 10 })
          this.$store.commit('user/updateSetting', { path: 'playerAutoPlay', param: false })
          this.$store.commit('user/updateSetting', { path: 'playerResumePlay', param: false })
          this.$store.commit('user/updateSetting', { path: 'playerRandomPlay', param: false })
          this.$store.commit('user/updateSetting', { path: 'playerLoopPlay', param: false })
          this.$store.commit('user/updateSetting', { path: 'playerShowThumbnail', param: true })
          this.$store.commit('user/updateSetting', { path: 'playerPlaylist', param: 'PL3w4YrAfCCwS2vEqSUXrCKnK-F4-SrYX-' })
        }
      }
    }
  },
  methods: {
    setStore (value) {
      this.computedStore = value
    }
  }
}
</script>
