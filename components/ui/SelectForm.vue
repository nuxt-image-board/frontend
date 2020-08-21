<template>
  <div class="field">
    <div class="control">
      <div class="select is-fullwidth is-rounded" :class="{'is-medium': isMedium}">
        <select v-model="selectedType" :disabled="disabled" @change="updateValue">
          <option v-for="option in options" :key="option.text" :value="option.value">
            {{ option.text }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      default: () => {
        return [
          {
            text: 'Option',
            value: '1'
          }
        ]
      }
    },
    sortMethod: {
      type: String,
      default: '0'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    isMedium: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      selectedType: this.sortMethod
    }
  },
  methods: {
    updateValue (e) {
      this.$emit('onSelectChanged', e.target.value)
    }
  }
}
</script>
