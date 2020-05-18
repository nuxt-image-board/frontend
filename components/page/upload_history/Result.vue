<template>
  <div class="card has-background-light">
    <div class="card-content">
      <nuxt-link style="color: inherit;" :to="artAddress">
        <nav class="level">
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">
                開始時刻
              </p>
              <p class="subtitle">
                {{ result.started }}
              </p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">
                終了時刻
              </p>
              <p class="subtitle">
                {{ result.finished }}
              </p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">
                処理状況
              </p>
              <p class="subtitle">
                {{ statusMessage }}
              </p>
            </div>
          </div>
        </nav>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    result: {
      type: Object,
      default: () => {
        return {
          uploadID: 0,
          started: 'NoData',
          finished: 'NoData',
          status: 0,
          illustID: null
        }
      }
    }
  },
  computed: {
    statusMessage () {
      switch (this.result.status) {
        case 1:
          return '処理開始'
        case 2:
          return 'サムネ画像作成中'
        case 3:
          return '大画像作成中'
        case 4:
          return '小画像作成中'
        case 5:
          return '登録完了'
        case 8:
          return 'イラスト重複'
        case 9:
          return '内部エラー'
        default:
          return '不明'
      }
    },
    artAddress () {
      if (this.result.illustID) {
        return '/illusts/arts/' + this.result.id
      } else {
        return '#'
      }
    }
  }
}
</script>
