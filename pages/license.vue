<template>
  <section class="section">
    <div class="container is-widescreen">
      <h1 class="title has-text-centered">
        OSSライセンス
      </h1>
      <h2 class="subtitle has-text-centered">
        ***REMOVED*** made with many OSS projects.
        Thanks to all OSS project contributors.
      </h2>
      <div class="table-container">
        <table class="table is-fullwidth centered-table">
          <thead>
            <tr>
              <th align="center">
                ライブラリ名
              </th>
              <th align="center">
                ライセンス
              </th>
              <th align="center">
                公開者
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(l,index) in licenses" :key="index">
              <td>
                <a :href="l.repository" rel="noopener noreferrer nofollow" target="_blank">
                  {{ l.name }}
                </a>
              </td>
              <td>
                {{ l.licenses }}
              </td>
              <td>
                {{ l.publisher }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script>
import licensesJson from '~/assets/texts/licenses.json'

export default {
  data () {
    return {
      licenses: licensesJson
    }
  },
  head () {
    return {
      title: 'OSSライセンス'
    }
  }
}
</script>
