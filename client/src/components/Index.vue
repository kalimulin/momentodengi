<template lang="pug">
div#homepage
  .fixed
    transition(enter-active-class="animated fadeIn", leave-active-class="animated fadeOut", mode="out-in", :duration="100")
      .shadowed(v-show="showRegions")
          .windows
              .window
                  .head
                      .right.actions
                          a.icon-close(href='#', title='Закрыть окно', @click.prevent="showRegions = false")
                              span
                      .left
                          h2 Выберите регион
                  .body
                      .overflow
                          ul.location
                            li(v-for="region in $store.state.regions", :key="region.id") {{ region.region_name }}
                              ul
                                li.city(v-for="city in citiesOfRegion(region.id)")
                                  a(href="#", @click.prevent="changeCity(city.city)") {{ city.city }}
                  //.foot
                      .dialogbuttons
                          .left
                            a.primary(@click.prevent="showRegions = false") Сохранить
                          .right
                              a.window_close(href='#') Отмена
  .layout
      .bg.bg3
          .cover
              .header
                  .wrapper
                      .logo
                          a(href='#', title='Моменто Деньги')
                      .phone
                          span.number {{ $store.state.phoneNumber }}
                          span.notice звонок бесплатный
                      .location
                          | Регион:
                          span(@click="showRegions = true") {{ $store.state.city }}
              .promo
                  .wrapper
                      form.calculator(action='/openloan', method='post', @submit.prevent="getMoney")
                          .field
                              input#sum(type='text', name='sum', v-model="contractSumText", placeholder='Введите сумму')
                              span.label Я хочу взять
                              .slider.money
                                vue-slider(ref="slider", v-model="contractSum", :min="3000", :max="30000", :interval="100", :tooltip="false", @callback="changeSum")
                                <!--input(type="range", v-model="contractSum", min="3000", max="30000", step="100", @input="calc")-->
                          .field
                              input#period(type='text', name='period', v-model='contractPeriodText', placeholder='Укажите срок')
                              span.label Срок займа
                              .slider.days
                                <!--input(type="range", v-model="contractPeriod", min="1", max="30", step="1", @input="calc")-->
                                vue-slider(ref="slider", v-model="contractPeriod", :min="1", :max="30", :tooltip="false", @callback="changePeriod")
                          .field.back
                              input#result(type='text', v-model="contractPayText", disabled='disabled')
                              span.label.large Я верну *
                          .end
                              input(type='submit', onclick="yaCounter38755825.reachGoal('getMoney'); console.log('goal get money button was reached');", value='Получить деньги')
                          div
                              p
                                  | * Рассчитанная к возврату сумма является примерной и может изменяться в зависимости от вида займа и применяемого к нему снижения процентной ставки (скидки), определяемого исходя из индивидуальных характеристик заёмщика и указанного в разделе сайта «Каталог займов».
                      .slogan
                          .part
                              div
                                  h1 Хотите сделать подарок близким, но следующей пенсии ещё ждать и ждать?
                                  p «МОМЕНТО ДЕНЬГИ» помогут.
                          .part
                              div
                                  h1 Срочная покупка или внезапный ремонт?
                                  p С «МОМЕНТО ДЕНЬГИ» вы можете себе это позволить.
                          .part
                              div
                                  h1
                                      | Отпуск уже скоро, а скопить ничего не получилось?
                                  p Всё в порядке — ведь есть «МОМЕНТО ДЕНЬГИ».
      .features
          .tabs
              .wrapper
                  a(href='#', @click.prevent="showFirstTab = true", v-bind:class="{ active: showFirstTab}")
                      span Как получить деньги
                  a(href='#', @click.prevent="showFirstTab = false", v-bind:class="{ active: !showFirstTab}")
                      span Клиентам
          .overflow
            transition(enter-active-class="animated fadeIn", leave-active-class="animated fadeOut", mode="out-in", :duration="100")
              .feature(v-if="showFirstTab", key="1")
                  .wrapper
                      p
                          | Нужны деньги и очень срочно? Отпуск, ремонт, свадьба, день рождения, лечение, большая покупка? Взять в долг или оформить кредит не получается? Срочный заём от «МОМЕНТО ДЕНЬГИ» — отличное решение. Получить кредит без справок невозможно, а тут вы берёте с собой только паспорт и быстрый заём у вас всего через 15 минут. В «МОМЕНТО ДЕНЬГИ» вы можете получить до 30 000 руб на срок до 30 дней наличными или на банковскую карту.
                      .steps
                          .step
                              h3
                                  | Оставьте заявку
                                  br
                                  | на сайте
                          .step
                              h3
                                  | Наши операторы
                                  br
                                  | перезвонят вам
                          .step
                              h3
                                  | Получите деньги
                                  br
                                  | в ближайшем офисе
              .feature(v-else, key="2")
                  .wrapper
                      h3 Почему вы выбираете «МОМЕНТО ДЕНЬГИ»?
                      .theses
                          .thesis
                              .icon
                              h3 Просто
                              p
                                  | Вам надо только принести паспорт, заполнить анкету и быстрый заём наличными у вас в кармане. Ещё проще? Заполните заявку на сайте, и наши специалисты сами свяжутся с вами.
                          .thesis
                              .icon
                              h3 Быстро
                              p
                                  | Через полчаса нужная сумма уже у вас в руках. Вы можете получить извещение об одобрении быстрого займа на мобильный телефон или просто подождать в офисе.
                          .thesis
                              .icon
                              h3 Выгодно
                              p
                                  | Вы берёте деньги в долг под самый низкий процент на рынке микрофинансирования. Хотите ещё дешевле? Захватите справку 2НДФЛ, пенсионное удостоверение или военный билет — и проценты станут еще ниже.
                          .thesis
                              .icon
                              h3 Удобно
                              p
                                  | Вы можете погасить быстрый заём в офисах «МОМЕНТО ДЕНЬГИ» и через любой коммерческий банк. Сложные обстоятельства и у вас не получается отдать деньги вовремя? Мы продлим срок погашения займа, ведь мы работаем для вас.
                      p
                          | В настоящее время офисы обслуживания «МОМЕНТО ДЕНЬГИ» есть уже в 10 регионах России: Астраханская, Волгоградская, Липецкая, Тамбовская, Воронежская, Ростовская и Саратовская области, Республика Калмыкия, Ставропольский и Краснодарский края. И наша сеть постоянно расширяется.
                      .get
                          router-link(to='page/openloan') Получить заем
      .features-mobile
          .wrapper
              .feature
                  a(href='#')
                      span.icon-find Найти наш офис
              .feature
                  a(href='#')
                      span.icon-cash Что такое микрофинансирование?
              .feature
                  a(href='#')
                      span.icon-handshake Информация для инвесторов
      .mapblock
          #map-canvas.map
          .wrapper
              .selector
                  .selector-head
                      a.city(href='#', @click.prevent="showRegions = true")
                          | Ваш регион:
                          span {{ $store.state.city }}
                  .selector-body
                      ul
                        li.office(@click="changeOffice(office.id)", :key="office.id", v-for="office in $store.state.officesOfCity", v-bind:class="{active: $store.state.currentOffice.id === office.id}")
                          .image(v-bind:style="{'background-image' : 'url(media/'+ office.photo +')'}")
                          .address
                            span {{ office.address }}
                          .time
                            span Пн-Пт
                            span {{ office.weekdays }}
                          .time
                            span Сб
                            span {{ office.saturday }}
                          .time
                            span Вс
                            span {{ office.sunday }}
                          .time
                            span Обед
                            span {{ office.dinner }}
                          .onmap Показать на карте
      .footer
          .wrapper
              .right
                  .inside
                      a(href='http://www.npmir.ru/', target='_blank')
                          img(src='../assets/images/gfx/mirlogo.png', alt='')
                      a(href='http://www.cbr.ru/', target='_blank')
                          img(src='../assets/images/gfx/cbrlogo.png', alt='')
              .left
                  ul
                      li
                          h4 Сотрудничество
                      li
                          router-link(to='/page/rent/') Арендодателям
                      li
                          router-link(to='/page/ad/') Рекламодателям
                  ul
                      li
                          h4 Полезные ссылки
                      li
                          router-link(to='/page/news') Новости
                      li
                          router-link(to='/page/press') Пресса
                      li
                          router-link(to='/page/loans/') Каталог займов
                      li
                          router-link(to='/page/closeloan/') Как погасить заём
                      li
                          router-link(to='/page/contacts/') Контакты
                  ul
                      li
                          h4 О компании
                      li
                          router-link(to='/page/iamthelaw/') Законодательная база
                      li
                          router-link(to='/page/documents/') Документы
                      li
                          router-link(to='/page/jobs/') Вакансии
                      li
                          router-link(to='/page/about/') О компании
      .secondfooter
          .wrapper
              .left
                  | © 2011-2017 ООО МКК «МОМЕНТО ДЕНЬГИ»
                  br
                  |                     Все авторские права защищены
              .right
                  .social
                      ul
                          li
                              a.vk(href='http://vk.com/momento_dengi')
                          li
                              a.fb(href='https://www.facebook.com/momentodengi')
                          li
                              a.ig(href='https://www.instagram.com/momentodengi')
</template>

<script>
import findInArray from 'lodash/find'
import orderBy from 'lodash/orderBy'
import filterArray from 'lodash/filter'
import uniqInArray from 'lodash/uniqBy'
import vueSlider from 'vue-slider-component'

export default {
  name: 'Index',
  data () {
    return {
      showFirstTab: true,
      contractSum: 10000,
      contractSumText: '10000 руб',
      contractPeriod: 12,
      contractPeriodText: '12 дней',
      contractPay: 12300,
      contractPayText: '12300 руб',
      map: null,
      marker: null,
      showRegions: false
    }
  },
  components: {
    vueSlider
  },
  created: function () {
    this.calc()
    if (!this.$store.state.regions.length) {
      this.getRegions()
    }
  },
  mounted: function () {
    this.mapRender()
    const $ = window.jQuery

    $('.bg').bgswitcher({
      images: [require('../assets/images/1.jpg'), require('../assets/images/2.jpg'), require('../assets/images/3.jpg')],
      effect: 'fade',
      duration: 750,
      interval: 10500
    })

    $('.slogan div.part:gt(0)').hide()
    setInterval(function () {
      $('.slogan div.part:first-child').fadeOut(750)
        .next('div.part').fadeIn(750)
        .end().appendTo('.slogan')
    }, 10500)
  },
  methods: {
    changeCity: function (city) {
      this.$store.state.city = city
      let matchedCity = findInArray(this.$store.state.offices, { city: city })
      if (matchedCity && matchedCity.city) {
        this.$store.commit('CHANGE_CITY', { city: matchedCity.city })
        this.changeMarkerPosition()
      }
      this.showRegions = false
    },
    citiesOfRegion: function (id) {
      let arr = filterArray(this.$store.state.offices, {'region_id': id})
      return uniqInArray(arr, 'city')
    },
    changeMarkerPosition: function () {
      let google = window.google
      this.marker = null
      this.marker = new google.maps.Marker({
        position: new google.maps.LatLng(+this.$store.state.currentOffice.let, +this.$store.state.currentOffice.lng),
        map: this.map
      })
      this.map.setCenter({lat: +this.$store.state.currentOffice.let, lng: +this.$store.state.currentOffice.lng})
    },
    mapRender: function () {
      let google = window.google
      let startLat = this.$store.state.currentOffice.let
      let startLng = this.$store.state.currentOffice.lng
      let mapOptions = {
        zoom: 16,
        scrollwheel: false,
        disableDoubleClickZoom: true,
        center: new google.maps.LatLng(startLat, startLng)
      }
      this.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions)

      this.marker = new google.maps.Marker({
        position: new google.maps.LatLng(startLat, startLng),
        map: this.map
      })
    },
    changeOffice: function (officeId) {
      let matchedOffice = findInArray(this.$store.state.officesOfCity, { id: officeId })
      if (matchedOffice) {
        this.$store.commit('CHANGE_OFFICE', { office: matchedOffice })
        this.changeMarkerPosition()
      }
    },
    changeSum: function (val) {
      this.calc('sum', val)
    },
    changePeriod: function (val) {
      this.calc('period', val)
    },
    calc: function (field, val) {
      let contractSum = +this.contractSum
      let contractPeriod = +this.contractPeriod
      if (field === 'sum') {
        contractSum = +val
      }
      if (field === 'period') {
        contractPeriod = +val
      }
      this.contractSumText = contractSum + ' руб'
      this.contractPeriodText = contractPeriod + ' дней'
      this.contractPay = Math.floor(contractSum * 0.0195 * contractPeriod + contractSum)
      this.contractPayText = this.contractPay + ' руб'
    },
    getMoney: function () {
      this.$router.push({name: 'openloan', params: {contractSum: this.contractSum, contractPeriod: this.contractPeriod}})
    },
    getRegions: function () {
      this.loading = true
      this.$http.get('/api/regions')
        .then(response => {
          if (response.body.regions && response.body.regions.length > 0) {
            this.$store.commit('GET_REGIONS', { regions: orderBy(response.body.regions, ['id'], ['asc']) })
            this.$http.get('/api/offices')
              .then(res => {
                if (res.body.offices && res.body.offices.length > 0) {
                  this.$store.commit('GET_OFFICES', { offices: res.body.offices })
                  if (!this.$store.state.user_select_region) {
                    let ymaps = window.ymaps
                    ymaps.ready(() => {
                      let geolocation = ymaps.geolocation
                      if (geolocation && geolocation.region) {
                        let matchedRegion = findInArray(this.$store.state.regions, { region_name: geolocation.region })
                        if (matchedRegion && matchedRegion.region_name) {
                          this.$store.commit('CHANGE_REGION', { region_name: matchedRegion.region_name })
                        }
                        if (geolocation.city) {
                          let matchedCity = findInArray(this.$store.state.offices, { city: geolocation.city })
                          if (matchedCity && matchedCity.city) {
                            this.$store.commit('CHANGE_CITY', { city: matchedCity.city })
                          } else {
                            this.$store.commit('CHANGE_CITY', { city: this.$store.state.city })
                          }
                        }
                      } else {
                        this.$store.commit('CHANGE_CITY', { city: this.$store.state.city })
                      }
                    })
                  }
                }
              })
          }
        })
    }
  }
}
</script>
