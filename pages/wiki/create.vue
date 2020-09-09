<template>
  <section class="section">
    <p class="title has-text-centered">
      Wikiページ作成: {{ articleTitle }}
    </p>
    <div class="container is-widescreen has-text-centered">
      <div class="columns is-centered">
        <div class="column is-10">
          <client-only>
            <editor
              ref="toastuiEditor"
              class="has-background-white"
              :options="editorOptions"
              :visible="editorVisible"
              :previewStyle="previewType"
              :initialValue="initialValue"
              height="500px"
              initialEditType="wysiwyg"
            />
          </client-only>
        </div>
      </div>
      <br>
      <button class="button is-primary is-large" @click="postArticle">
        投稿する
      </button>
    </div>
  </section>
</template>

<script>
export default {
  async asyncData ({ $axios, route, store, error, redirect }) {
    if (!store.state.user.obtainedProducts.includes(2)) {
      redirect('/shop')
    }
    const endpoint = '/wiki'
    const title = route.query.title
    const articleID = isFinite(route.query.id) ? parseInt(route.query.id) : null
    let targetType = isFinite(route.query.targetType) ? parseInt(route.query.targetType) : null
    let targetID = isFinite(route.query.targetID) ? parseInt(route.query.targetID) : null
    let initialValue = ''
    if (articleID !== null) {
      const response = await $axios.get(endpoint + '/' + articleID)
      if (response.data.status !== 200) {
        return error({ statusCode: 404, message: 'err' })
      }
      initialValue = response.data.data.body
      targetType = response.data.data.target.type
      targetID = response.data.data.target.id
    } else if (targetType === null || targetID === null) {
      return error({ statusCode: 400, message: 'err' })
    }
    return {
      title,
      initialValue,
      articleID,
      targetType,
      targetID
    }
  },
  data () {
    return {
      editorText: '',
      editorOptions: {
        toolbarItems: [
          'heading',
          'bold',
          'italic',
          'strike',
          'divider',
          'hr',
          'quote',
          'divider',
          'ul',
          'ol',
          'indent',
          'outdent',
          'divider',
          'table',
          'image',
          'link',
          'divider'
        ]
      },
      previewType: (this.$store.state.user.isPC ? 'vertical' : 'tab'),
      editorVisible: true
    }
  },
  computed: {
    articleTitle () {
      return this.title + '(' + this.targetTypeText + ')'
    },
    targetTypeText () {
      switch (this.targetType) {
        case 0:
          return 'ユーザー'
        case 1:
          return 'タグ'
        case 2:
          return '絵師'
        default:
          return ''
      }
    }
  },
  methods: {
    async postArticle () {
      const markdownContent = this.$refs.toastuiEditor.invoke('getMarkdown')
      if (markdownContent.length < 10) {
        this.$notify(
          {
            group: 'default',
            type: 'danger',
            duration: 5000,
            title: 'Wiki投稿',
            text: '文字数が少なすぎます。'
          }
        )
        return
      }
      const resp = await this.$axios.post(
        '/wiki',
        {
          title: this.articleTitle,
          body: markdownContent,
          targetType: this.targetType,
          targetID: this.targetID
        }
      )
      if (resp.data.status === 200) {
        this.$notify(
          {
            group: 'default',
            type: 'danger',
            duration: 5000,
            title: 'Wiki投稿',
            text: '投稿に成功しました。'
          }
        )
        this.$router.go(-2)
      }
    }
  }
}
</script>
