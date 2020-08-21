<template>
  <section class="section">
    <div class="container is-widescreen has-text-centered">
      <div class="columns is-vcentered is-centered">
        <div class="column is-8">
          <div class="boxed has-background-white round-15" style="min-height: 70vh;">
            <client-only>
              <viewer :initialValue="article.body" />
            </client-only>
          </div>
        </div>
        <div class="column is-vcentered is-2">
          <div class="boxed is-vcentered has-background-white round-15">
            <div class="columns is-multiline is-vcentered is-centered">
              <div class="column is-12">
                <p class="title is-4">
                  作成者
                </p>
                <p class="subtitle is-5">
                  <nuxt-link :to="'/search/uploader/'+article.user.id">
                    {{ article.user.name }}
                  </nuxt-link>
                </p>
              </div>
              <div class="column is-12">
                <p class="title is-4">
                  作成日
                </p>
                <p class="subtitle is-5">
                  {{ article.date }}
                </p>
              </div>
              <div class="column is-12">
                <p class="title is-4">
                  リビジョン
                </p>
                <p class="subtitle is-5">
                  {{ article.revision }}
                </p>
              </div>
              <div class="column is-12">
                <SocialShare :title="article.title" :url="shareUrl" />
              </div>
              <div class="column is-12">
                <nuxt-link disabled to="#" class="button is-primary">
                  編集履歴を見る
                </nuxt-link>
              </div>
              <div class="column is-12">
                <nuxt-link
                  v-if="$store.state.user.obtainedProducts.includes(2)
                    && !(article.targetType == 0 && article.targetID != $auth.$state.user.userID)"
                  :to="'/wiki/create?id='+article.id+'&title='+article.title.split('(')[0]"
                  class="button is-primary"
                >
                  記事を編集する
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
.round-15 {
  border-radius: 15px;
}
</style>

<script>
import SocialShare from '@/components/ui/SocialShare.vue'

export default {
  components: {
    SocialShare
  },
  async asyncData ({ $axios, $auth, route, error }) {
    const endpoint = '/wiki'
    const articleID = isFinite(route.params.id)
      ? parseInt(route.params.id)
      : null
    const response = await $axios.get(endpoint + '/' + articleID)
    if (response.data.status !== 200) {
      return error({ statusCode: 404, message: 'err' })
    }
    const shareUrl = process.env.OWN_ENDPOINT + 'wiki/' + articleID
    return {
      article: response.data.data,
      shareUrl
    }
  },
  head () {
    return {
      title: this.article.title
    }
  }
}
</script>
