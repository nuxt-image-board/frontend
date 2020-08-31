<template>
  <nav class="panel">
    <p class="panel-heading has-text-dark has-background-chino">
      {{ $t('userInfo.title') }}
    </p>
    <p class="panel-block">
      {{ $t('userInfo.user_name') }} {{ $auth.$state.user.name }}
    </p>
    <p class="panel-block">
      ID: {{ $auth.$state.user.displayID }}
    </p>
    <p class="panel-block">
      {{ $t('userInfo.registered_date') }} {{ $auth.$state.user.registeredDate }}
    </p>
    <p class="panel-block">
      <nuxt-link
        class="button is-link is-outlined is-fullwidth"
        to="/history/upload"
      >
        {{ $t('userInfo.upload_history_button') }}
      </nuxt-link>
    </p>
  </nav>
</template>
