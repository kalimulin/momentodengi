<template lang="pug">
  #app
    #header
      b-container.d-flex.px-4.py-3.justify-content-between.align-items-center(fluid)
        img.logo.mr-auto(src="./assets/images/logo.svg")
        .profile.d-flex
          .name {{$store.state.username}}
          a.exit.ml-4(href="", @click.prevent="logout") Выход

    #body
      b-container(fluid)
        b-row
          b-col.sidemenu.py-3(cols="2")
            .menu-title.pl-3.mb-2 Меню
            b-nav.text-left(vertical)
              b-nav-item(@click.prevent="$router.push('/news')") Новости
              b-nav-item Документы
          b-col.p-3.text-left#maincontent(offset="2")
            transition(enter-active-class="animated fadeIn", leave-active-class="animated fadeOut", mode="out-in", :duration="100")
              router-view
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import axios from 'axios'
import Notify from './components/Notify.vue'
import Vue from 'vue'

const bus = new Vue()

export default {
  name: 'app',
  components: {
    'notify-me': Notify
  },
  data () {
    return {
      bus
    }
  },
  created: function () {
    console.log('--- App created')
    let token = this.$localStorage.get('token') || ''
    if (token) {
      console.log('--- token', localStorage.token)
      let that = this
      axios.get('/pro_api/check', {
        headers: {'Authorization': 'Bearer ' + token}
      })
        .then(function (response) {
          that.$store.commit('CHANGE_USERNAME', response.data.user)
          that.$store.commit('CHANGE_TOKEN', token)
        })
        .catch(function (error) {
          // Wu oh! Something went wrong
          if (error.response && error.response.status === 401) {
            console.log('error')
            that.$localStorage.set('token', '')
            that.$store.commit('CHANGE_TOKEN', '')
            that.$store.commit('CHANGE_USERNAME', '')
          }
        })
      // checkToken();
    } else {
      console.log('not token')
      this.$router.push('/login')
    }
  },
  sockets: {
    connect: function () {
      console.log('socket connected')
      this.$socket.emit('join', 'Hello from adminpanel client')
    },
    messages: function (val) {
      console.log(val)
    },
    data: function (val) {
      console.log(val)
    }
  },
  methods: {
    logout: function () {
      this.$localStorage.set('token', '')
      this.$store.commit('CHANGE_TOKEN', '')
      this.$store.commit('CHANGE_USERNAME', '')
      this.$router.push('login')
    }
  }
}
</script>

<style lang="scss">
  $color-green: #80a61b;
  $color-blue: #00aeef;
  $color-gray: #212529;

  @font-face {
    font-family: 'Avenir';
    src: url('./assets/fonts/AvenirNextCyr-Light.eot');
    src: local('Avenir Next Cyr Light'), local('AvenirNextCyr-Light'),
    url('./assets/fonts/AvenirNextCyr-Light.eot?#iefix') format('embedded-opentype'),
    url('./assets/fonts/AvenirNextCyr-Light.woff') format('woff'),
    url('./assets/fonts/AvenirNextCyr-Light.ttf') format('truetype');
    font-weight: 300;
    font-style: normal;
  }

  @font-face {
    font-family: 'Avenir';
    src: url('./assets/fonts/AvenirNextCyr-Regular.eot');
    src: local('Avenir Next Cyr Regular'), local('AvenirNextCyr-Regular'),
    url('./assets/fonts/AvenirNextCyr-Regular.eot?#iefix') format('embedded-opentype'),
    url('./assets/fonts/AvenirNextCyr-Regular.woff') format('woff'),
    url('./assets/fonts/AvenirNextCyr-Regular.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Avenir';
    src: url('./assets/fonts/AvenirNextCyr-Bold.eot');
    src: local('Avenir Next Cyr Bold'), local('AvenirNextCyr-Bold'),
    url('./assets/fonts/AvenirNextCyr-Bold.eot?#iefix') format('embedded-opentype'),
    url('./assets/fonts/AvenirNextCyr-Bold.woff') format('woff'),
    url('./assets/fonts/AvenirNextCyr-Bold.ttf') format('truetype');
    font-weight: bold;
    font-style: normal;
  }

  html, body {
    /*background-image: url("./assets/images/pattern.png");*/
    /*overflow: hidden;*/
  }

  a {
    color: $color-blue;
  }

  h1 {
    font-size: 22px;
    font-weight: bold;
    color: $color-gray;
  }

  h2 {
    font-size: 18px;
    font-weight: bold;
    color: $color-gray;
  }

  ul {
    padding-left: 0;
  }

  .container {
    /*background-color: #fff;*/
  }

  .btn-outline-primary {
    border-color: $color-blue;
    color: $color-blue;
    &:hover {
      color: #fff;
      background-color: $color-blue;
    }
  }

  .btn-outline-primary:not([disabled]):not(.disabled):active, .btn-outline-primary:not([disabled]):not(.disabled).active, .show > .btn-outline-primary.dropdown-toggle {
    border-color: $color-blue;
    background-color: $color-blue;
  }

  .btn-outline-primary:focus, .btn-outline-primary.focus {
    box-shadow: 0 0 0 0.2rem rgba(0, 174, 239, 0.5);
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: $color-gray;
    padding-top: 62px;
  }

  #header  {
    background-color: $color-gray;
    color: #fff;
    a {
      color: #fff;
    }
    height: 62px;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 10;
  }

  #body {
    .sidemenu {
      position: fixed;
      left: 0;
      top: 62px;
      height: 100%;
      background-color: $color-green;
      color: #fff;
      text-align: left;
      .menu-title {
        border-bottom: 1px solid;
        font-size: 18px;
        font-weight: bold;
      }
      .nav {
        .nav-item {
          .nav-link {
            color: #fff;
          }
        }
      }
    }
  }

  #maincontent {
    overflow: auto;
  }

</style>
