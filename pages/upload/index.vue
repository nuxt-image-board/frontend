<script>
export default {
  asyncData ({ redirect }) {
    redirect('/upload/page')
  },
  head () {
    return {
      title: '投稿'
    }
  }
}
</script>
