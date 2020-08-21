<template>
  <nav class="panel">
    <p class="panel-heading has-text-dark has-background-chino">
      ユーザー情報
    </p>
    <p class="panel-block">
      ユーザー名: {{ $auth.$state.user.name }}
    </p>
    <p class="panel-block">
      ID: {{ $auth.$state.user.displayID }}
    </p>
    <p class="panel-block">
      登録日: {{ $auth.$state.user.registeredDate }}
    </p>
    <p class="panel-block">
      <nuxt-link
        class="button is-link is-outlined is-fullwidth"
        to="/history/upload"
      >
        投稿履歴確認
      </nuxt-link>
    </p>
  </nav>
</template>
