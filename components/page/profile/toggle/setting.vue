<template>
  <tr>
    <td>
      <a @click="$emit('openModal', storeKey)">
        {{ title }}
      </a>
    </td>
    <td>
      <div v-if="items.length < 1" class="field">
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
      <div v-else>
        <SelectForm
          :sortMethod="String(computedStore)"
          :options="items"
          :send-mounted="false"
          :disabled="isDisabled"
          :isMedium="false"
          @onSelectChanged="setStore"
        />
      </div>
    </td>
  </tr>
</template>

<script>
import SelectForm from '~/components/ui/SelectForm.vue'

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
  },
  methods: {
    setStore (value) {
      this.computedStore = value
    }
  }
}
</script>
