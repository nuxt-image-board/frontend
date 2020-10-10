<template>
  <section class="hero is-fullheight" style="height:60vh;">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="columns is-centered">
          <div class="column is-6">
            <h4 class="title">
              結果
            </h4>
            <h3 class="subtitle">
              <table class="table" align="center">
                <tbody>
                  <tr v-for="r in result" :key="r">
                    <td v-for="r2 in r" :key="r2">
                      {{ r2 }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </h3>
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
      result: ''
    }
  },
  created () {
    this.result = this.createCard()
  },
  methods: {
    getRandInt (start, end) {
      return Math.floor(Math.random() * end) + start
    },
    createColumn () {
      const source = {
        1: 'たぬき',
        2: 'ネコ',
        3: 'コアラ',
        4: 'リス',
        5: 'アリ',
        6: 'カマキリ',
        7: 'いのしし',
        8: 'カメ',
        9: 'かめむし',
        10: 'かぶとむし',
        11: 'しか',
        12: 'さめ',
        13: 'わし',
        14: 'ライオン'
      }
      return [...Array(5)].map(
        () => source[this.getRandInt(1, 14)]
      )
    },
    createCard () {
      const card = [...Array(5)].map(() => this.createColumn())
      card[2][2] = 'FREE'
      return card
    }
  },
  head () {
    return {
      title: 'Test'
    }
  }
}
</script>
