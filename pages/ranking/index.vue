<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-10">
            <h4 class="title has-text-centered">
              {{ $t('rankings.title') }}
            </h4>
            <div class="columns is-multiline">
              <div
                v-for="p in page_buttons"
                :key="p.title"
                class="column is-4 is-12-mobile"
              >
                <nuxt-link class="button is-fullwidth is-large is-primary" :to="p.to">
                  {{ $t('rankings.methods.'+p.title) }}
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
        <br>
        <br>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      page_buttons: [
        {
          to: '/ranking/monthly?sort=0',
          title: 'monthly_like'
        },
        {
          to: '/ranking/weekly?sort=0',
          title: 'weekly_like'
        },
        {
          to: '/ranking/daily?sort=0',
          title: 'daily_like'
        },
        {
          to: '/ranking/monthly?sort=1',
          title: 'monthly_view'
        },
        {
          to: '/ranking/weekly?sort=1',
          title: 'weekly_view'
        },
        {
          to: '/ranking/daily?sort=1',
          title: 'daily_view'
        }
      ]
    }
  },
  head () {
    return {
      title: 'ランキング一覧'
    }
  }
}
</script>
