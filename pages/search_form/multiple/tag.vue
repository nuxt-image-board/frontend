<template>
  <section class="hero is-fullheight" style="height:50vh;">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-6 has-text-centered">
            <h4 class="title">
              複合タグ検索
            </h4>
            <div class="box">
              <p class="subtitle">
                検索対象タグ
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
                タグを選択してください
              </p>
            </div>
            <div class="box">
              <p class="subtitle">
                タグ候補
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
            <div class="field is-centered">
              <button
                class="button is-primary is-fullwidth is-large"
                :disabled="tags.length < 1 || tags.length > 5"
                @click="$router.push('/search/multiple/tag?query='+ tags.map(t=>t.id).join(','))"
              >
                検索する
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
      filterTag: '',
      finds: [],
      tags: []
    }
  },
  watch: {
    filterTag (to, from) {
      this.findTagsWithKeyword()
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
