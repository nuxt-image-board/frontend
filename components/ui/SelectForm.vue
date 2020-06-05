<template>
  <div class="field">
    <div class="control">
      <div class="select is-medium is-fullwidth is-rounded">
        <select v-model="selectedType" @change="updateValue">
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
    sendMounted: {
      type: Boolean,
      default: true
    },
    sortMethod: {
      type: String,
      default: '0'
    }
  },
  data () {
    return {
      selectedType: this.sortMethod
    }
  },
  mounted () {
    if (this.sendMounted === '1') {
      this.$emit('onSelectChanged', this.options[0].value)
    }
  },
  methods: {
    updateValue (e) {
      this.$emit('onSelectChanged', e.target.value)
    }
  }
}
</script>
