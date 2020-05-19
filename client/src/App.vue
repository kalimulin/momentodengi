<template lang="pug">
  #app
    transition(enter-active-class="animated fadeIn", leave-active-class="animated fadeOut", mode="out-in", :duration="100")
      router-view
</template>

<script>
  import 'bootstrap-sass/assets/stylesheets/_bootstrap.scss'
  import './assets/css/styles.scss'
  import './assets/css/modals.scss'
  import './assets/css/animate.scss'

  export default {
    name: 'app'
  }
</script>
