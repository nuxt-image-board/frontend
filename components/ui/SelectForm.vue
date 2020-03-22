<template>
<div class="field">
  <div class="control">
    <div class="select is-large is-rounded">
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
  props: [
    'options',
    'sendMounted'
  ],
  data () {
    return {
      selectedType: 0
    }
  },
  methods: {
    updateValue (e) {
      this.$emit('onSelectChanged', e.target.value)
    }
  },
  mounted () {
    if (this.sendMounted === '1') {
      console.log('sendMounted')
      this.$emit('onSelectChanged', this.options[0].value)
    }
  }
}
</script>
