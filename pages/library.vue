<template>
  <section class="section">
    <div class="container is-widescreen">
      <div class="columns is-centered is-multiline is-mobile">
        <div class="column is-8 has-image-centered has-text-centered">
          <p class="title has-text-white">
            *あなたは図書室の鍵を得た。
          </p>
          <br>
          <p class="subtitle has-text-white">
            Username: YOUR_NAME
          </p>
          <p class="subtitle has-text-white">
            Password: PASSWORD
          </p>
        </div>
        <div class="column is-8 has-image-centered has-text-centered">
          <a href="https://library.***REMOVED***">
            <img width="40%" src="door.jpg">
            <p class="subtitle has-text-white"> Tap to Enter</p>
          </a>
        </div>
        <div class="column is-8 has-image-centered has-text-centered">
          <p class="subtitle has-text-white">
            You are completely into the darkness.
            <br>
            あなたは完全なる暗闇へと足を踏み入れた。
          </p>
          <p class="subtitle has-text-white">
            Abandon all hope, ye who enter here.
            <br>
            ここから入らんとする者は一切の希望を放棄せよ。
          </p>
          <p class="subtitle has-text-white">
            This is library. Not more than it, and not less than it.
            <br>
            これは図書室であり、それ以上でもそれ以下でもない。
          </p>
        </div>
        <div class="column is-8 has-image-centered has-text-centered">
          <nuxt-link class="button is-large" to="/">
            Back / 戻る
          </nuxt-link>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section::before{
  /* 透過した黒を上から重ねるイメージ */
  width: 100%;
  height: 120%;
  background-color: rgba(0,0,0,0.6);
  /* 自由に位置指定 */
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  content: ' ';
}
</style>

<script>
export default {
  asyncData ({ store, redirect }) {
    if (!store.state.user.obtainedProducts.includes(3)) {
      redirect('/shop')
    } else {
      console.log('TODO: Implement NextCloud Registering')
    }
  },
  head () {
    return {
      title: '図書室'
    }
  },
  layout: 'default'
}
</script>
