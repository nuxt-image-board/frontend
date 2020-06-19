<template>
  <tr>
    <td>
      <a @click="$emit('openModal', storeKey)">
        {{ title }}
      </a>
    </td>
    <td>
      <div class="field">
        <input
          :id="'switch' + storeKey"
          v-model="computedStore"
          :name="'switch' + storeKey"
          type="checkbox"
          class="switch is-rounded"
          :class="`${classes}`"
          :disabled="isDisabled"
        >
        <label :for="'switch' + storeKey" />
      </div>
    </td>
  </tr>
</template>

<script>
export default {
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
        if (['isPC', 'useSakura'].includes(this.storeKey)) {
          location.reload()
        }
      }
    }
  }
}
</script>
