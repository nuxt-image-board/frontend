<template>
  <section class="section">
    <div class="container is-widescreen">
      <h1 class="title has-text-centered">
        ソフトウェア ライセンス
      </h1>
      <h2 class="subtitle has-text-centered">
        ***REMOVED*** made with many OSS projects.
        Thanks to all OSS project contributors.
      </h2>
      <Accordion title="Frontend / フロントエンド">
        <p>
          Now loading.
        </p>
      </Accordion>
      <Accordion title="Backend / バックエンド">
        <p>
          Now loading.
        </p>
      </Accordion>
      <Accordion title="Tool / ツール">
        <p>
          Now loading.
        </p>
      </Accordion>
      <Accordion title="Other / その他">
        <p>
          Test
        </p>
      </Accordion>
    </div>
  </section>
</template>

<script>
import Accordion from '~/components/ui/Accordion.vue'

export default {
  auth: false,
  components: {
    Accordion
  }
}
</script>
