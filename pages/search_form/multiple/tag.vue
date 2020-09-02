<template>
  <section class="hero is-fullheight" style="height:50vh;">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-6 has-text-centered">
            <h4 class="title">
              {{ $t('search_form.multiple.tag.title') }}
            </h4>
            <div class="box">
              <p class="subtitle">
                {{ $t('search_form.multiple.tag.target') }}
              </p>
              <div v-if="tags.length > 0" class="field is-grouped is-grouped-multiline is-grouped-centered">
                <div v-for="t in tags" :key="t.id">
                  <div class="control" style="margin-right: 5px; margin-bottom:2px;">
                    <a class="tags has-addons" @click="tags.pop(t)">
                      <div class="tag is-small is-info">
                        {{ t.name }}
                      </div>
                      <div class="tag is-small is-secondary">-</div>
                    </a>
                  </div>
                </div>
              </div>
              <p v-else class="is-size-6">
                {{ $t('search_form.multiple.tag.select') }}
              </p>
            </div>
            <div class="box">
              <p class="subtitle">
                {{ $t('search_form.multiple.tag.options') }}
              </p>
              <div class="field">
                <div class="control">
                  <input
                    v-model="filterTag"
                    placeholder="Ex. ***REMOVED***/ ラビハ制服"
                    name="query"
                    class="input is-4"
                    type="text"
                  >
                </div>
              </div>
              <div class="field is-grouped is-grouped-multiline is-grouped-centered">
                <div v-for="t in finds" :key="t.id">
                  <div v-if="!tags.includes(t)" class="control" style="margin-right: 5px; margin-bottom:2px;">
                    <a class="tags has-addons" @click="tags.push(t)">
                      <div class="tag is-small is-primary">
                        {{ t.name }}
                      </div>
                      <div class="tag is-small is-secondary">+</div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div class="box">
              <p class="subtitle">
                {{ $t('search_form.multiple.tag.and_or') }}
              </p>
              <div class="field">
                <div class="control has-text-centered">
                  <input
                    id="switchAndOr"
                    v-model="isOr"
                    type="checkbox"
                    name="switchAndOr"
                    disabled
                    class="switch is-medium is-rounded is-info"
                  >
                  <label for="switchAndOr" />
                </div>
              </div>
            </div>
            <div class="field is-centered">
              <button
                class="button is-primary is-fullwidth is-large"
                :disabled="tags.length < 1 || tags.length > 5"
                @click="$router.push('/search/multiple/tag?query='+ tags.map(t=>t.id).join(','))"
              >
                {{ $t('search_form.multiple.tag.search_button') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      isOr: false,
      filterTag: '',
      finds: [],
      tags: []
    }
  },
  watch: {
    filterTag (to, from) {
      if (to.length > 1) {
        this.findTagsWithKeyword()
      }
    },
    '$route' (to, from) {
      if (this.$route.query.e) {
        this.$notify({
          group: 'default',
          type: 'danger',
          duration: 2000,
          title: this.$t('search_form.multiple.tag.title'),
          text: this.$t('search_form.multiple.tag.notify.no_match')
        })
        this.$router.push('/search_form/multiple/tag')
      }
    }
  },
  methods: {
    async findTagsWithKeyword () {
      const resp = await this.$axios.get(
        '/tags/finds',
        { params: { keyword: this.filterTag } }
      )
      this.finds = resp.data.data
    }
  },
  head () {
    return {
      title: '複数タグから検索'
    }
  }
}
</script>
