<template>
  <section class="section">
    <div class="container is-widescreen">
      <h1 class="title has-text-centered">
        ニュース / アップロード履歴
      </h1>
      <div class="columns is-centered">
        <div class="column is-8">
          <div class="table-container">
            <table class="table is-hoverable is-striped is-fullwidth">
              <thead>
                <tr>
                  <th align="center">
                    種別
                  </th>
                  <th align="center">
                    タイトル
                  </th>
                  <th align="center">
                    日付
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="n in news" :key="n.id">
                  <td v-if="n.color == 0" class="has-background-info has-text-white" align="center">
                    お知らせ
                  </td>
                  <td v-if="n.color == 1" class="has-background-primary has-text-white" align="center">
                    メモ
                  </td>
                  <td v-if="n.color == 2" class="has-background-success has-text-white" align="center">
                    アプデ
                  </td>
                  <td v-if="n.color == 3" class="has-background-warning has-text-white-dark" align="center">
                    告知
                  </td>
                  <td v-if="n.color == 4" class="has-background-danger has-text-white" align="center">
                    重要
                  </td>
                  <td align="center">
                    <nuxt-link :to="'/news/'+n.id">
                      {{ n.title }}
                    </nuxt-link>
                  </td>
                  <td align="center">
                    {{ n.date }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="columns is-centered">
        <div class="column is-8">
          <div class="table-container">
            <table class="table is-hoverable is-striped is-fullwidth">
              <thead>
                <tr>
                  <th align="center">
                    開始時刻
                  </th>
                  <th align="center">
                    ステータス
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="u in upload" :key="u.uploadID">
                  <td align="center">
                    {{ u.started }}
                  </td>
                  <td v-if="u.status == 2" class="has-background-primary has-text-white" align="center">
                    Thumb作成中
                  </td>
                  <td v-else-if="u.status == 3" class="has-background-primary has-text-white" align="center">
                    Large作成中
                  </td>
                  <td v-else-if="u.status == 4" class="has-background-primary has-text-white" align="center">
                    Small作成中
                  </td>
                  <td v-else-if="u.status == 5" class="has-background-success has-text-white" align="center">
                    <nuxt-link :to="'/arts/'+u.illustID">
                      <p class="has-tetxt-white">
                        登録完了
                      </p>
                    </nuxt-link>
                  </td>
                  <td v-else-if="u.status == 8" class="has-background-warning has-text-white-dark" align="center">
                    イラスト重複エラー
                  </td>
                  <td v-else-if="u.status == 9" class="has-background-danger has-text-white" align="center">
                    サーバー内部エラー
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  async asyncData ({ $axios, $auth, error }) {
    const resp = await $axios.get('/news/list')
    if (resp.status !== 200) {
      return error({ statusCode: 502, message: 'err' })
    }
    const resp2 = await $axios.get(
      '/accounts/' + $auth.$state.user.userID + '/upload_history'
    )
    if (resp2.status !== 200) {
      return error({ statusCode: 502, message: 'err' })
    }
    return {
      news: resp.data.data,
      upload: resp2.data.data
    }
  }
}
</script>
