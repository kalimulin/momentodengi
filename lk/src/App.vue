<template lang="pug">
  #app
    #header
      b-container.d-flex.py-3.justify-content-between.align-items-center
        img.logo.mr-auto(src="./assets/images/logo.svg")
        .profile.d-flex
          .name
            img.mr-1.mb-1(src="./assets/images/fa-user.png")
            | Иммануил Гедеонович П.
          .exit.ml-4 Выход
            img.ml-1.mb-1(src="./assets/images/fa-out.png")

    #body
      b-container.mt-4.py-3
        b-row
          b-col.text-left
            b-button(variant="primary", size="") Хочу МОМЕНТО КАРТУ!
            h1.mt-5 МОМЕНТО КАРТА
            ul.mt-3.cards-list
              li.card-item.d-flex.justify-content-between.align-items-start
                .card-img.p-1.shadow
                  img.img-fluid(src="./assets/images/visa_logo.png")
                .mx-3
                  h3.card-name Visa Classic
                  .card-info.mt-1 **** 1234, действует до 12/2019
                  .card-limit.mt-1 Кредитный лимит: 35000 руб.
                  .required-payment.mt-1 Обязательный платёж: 3300 руб.
                  .payment-date.mt-1 Оплатить до: 31.12.2017
                    b-button(variant="link", size="sm") Оплатить сейчас!
                .ml-auto.mr-2 1700,34 руб.
                b-dropdown.ml-2(text="Операции", size="sm")
                  b-dropdown-item-button Оплатить
            h1.mt-5 МОЙ ЗАЙМ
            ul.loans-list
              li.loan-item.d-flex.justify-content-between.align-items-start
                div
                  .mt-1 Договор № 201608930868
                  .mt-1 01.12.2016
                  .mt-1 Всего к оплате: 33000 руб.
                  .mt-1 Оплатить до 31.12.2017
                    b-button(variant="link", size="sm") Оплатить сейчас!
                b-dropdown.ml-2(text="Операции", size="sm")
                  b-dropdown-item-button Оплатить

          b-col.text-left(cols="3")
            .person-menu.p-3.shadow
              h2 Личное меню
              b-nav(vertical)
                b-nav-item Настройки
                b-nav-item Любимый офис
                b-nav-item Узнать мою кредитную историю
            .help-menu.p-3.mt-3.shadow
              h2 Помощь
              b-nav(vertical)
                b-nav-item Часто задаваемые вопросы
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
  name: 'app',
  sockets: {
    connect: function () {
      console.log('socket connected')
      this.$socket.emit('join', 'Hello from lk client')
    },
    messages: function (val) {
      console.log(val)
    },
    data: function (val) {
      console.log(val)
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

  body {
    /*background-image: url("./assets/images/pattern.png");*/
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

  /////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////// bootstrap mod ////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////

  .btn-primary {
    background-color: $color-blue;
    border-color: $color-blue;
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

  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////


  .shadow {
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: $color-gray;
  }

  #header  {
    background-color: $color-green;
    color: #fff;
    .profile {
      img {
        height: 12px;
      }
      .exit {
        border-bottom: 1px dotted;
      }
      .name {
        border-bottom: 1px dotted;
      }
    }
  }

  #body {
    .person-menu {
      .nav {
        .nav-item {
          .nav-link {
            padding-left: 0;
          }
        }
      }
    }
    .cards-list {
      .card-item {
        .card-img {
          width: 100px;
          border-radius: 4px;
          border: 1px solid #ccc;
          .cardnumber {
            position: absolute;
            right: 7%;
            top: 41%;
            color: #000;
            font-size: 24px;
            font-weight: bold;
            text-shadow: 0px 0px 1px #FFFFFF;
          }
        }
      }
    }
  }
</style>
