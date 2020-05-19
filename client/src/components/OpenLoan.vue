<template lang="pug">

div
    h1 Получить заём
    form#crmForm(action='#', method='post', @submit.prevent="validateBeforeSubmit")
        //input(type='hidden', name='_csrf', value=csrfToken)
        .section
            label Фамилия
            input#lastname(type='text', name='lastName', placeholder='Введите фамилию', v-model.lazy="formData.lastName", required, v-validate="{ required: true, regex: /^[a-zA-zа-яА-Я]+$/ }")
            .warning(v-show="errors.has('lastName')") В поле не должно быть менее 2 букв, а также не должно быть цифр и специальных символов
        .section
            label Имя
            input#firstname(type='text', name='firstName', placeholder='Введите имя', v-model.lazy="formData.firstName", required, v-validate="{ required: true, regex: /^[a-zA-zа-яА-Я]+$/ }")
            .warning(v-show="errors.has('firstName')") В поле не должно быть менее 2 букв, а также не должно быть цифр и специальных символов
        .section
            label Отчество
            input#middlename(type='text', name='middleName', placeholder='Введите отчество', v-model.lazy="formData.middleName", required, v-validate="{ required: true, regex: /^[a-zA-zа-яА-Я]+$/ }")
            .warning(v-show="errors.has('middleName')") В поле не должно быть менее 2 букв, а также не должно быть цифр и специальных символов
        .section
            label Дата рождения
            vue-datepicker-local(v-model="formData.birthDate", :local="local", :disabled-date="disabledDate", :format="format")
            .warning(v-show="errors.has('birthDate')") Неверный формат даты либо вам меньше 18 лет
        .section
            label Сумма займа (руб.)
            input#contractsum(type='text', name='contractsum', disabled='', v-model="formData.contractSum", min="3000", max="30000", required)
            .slider.money
                <!--input(type="range", v-model="formData.contractSum", min="3000", max="30000", step="100")-->
                vue-slider(ref="slider", v-model="formData.contractSum", :min="3000", :max="30000", :interval="100", :tooltip="false")
        .section
            label Срок займа (дни)
            input#contractperiod(type='text', v-model="formData.contractPeriod", name='contractperiod', disabled='', min="1", max="30", required)
            .slider.days
                <!--input(type="range", v-model="formData.contractPeriod", min="1", max="30", step="1")-->
                vue-slider(ref="slider", v-model="formData.contractPeriod", :min="1", :max="30", :interval="1", :tooltip="false")
        .section
            label Дополнительные опции
            label
                input#old(type='checkbox', name='addition_options', value='old', v-model="formData.radioOld")
                |  Я пенсионер
        .section
            label Номер телефона
            input#personphone(type='tel', name='personphone', placeholder='Введите номер телефона', v-model="formData.personPhone", required)
            .warning(v-show="errors.has('lastName')") Вводите телефон начиная с 9 и без посторонних символов
        .section
            label
                input#consent(type='checkbox', name='addition_options', v-model='formData.agree', required)
                |  Даю согласие на обработку моих персональных данных
        .section
            input#btn_send(type='submit', value='Отправить')
            .warning(v-show="!valid") Заполнены не все данные
    form#resultCRM(v-show="complete")
        .result
            p
                | Заявка отправлена!
                br
                | Совсем скоро мы вам перезвоним

</template>

<script>
  import moment from 'moment-mini'
  import VueDatepickerLocal from 'vue-datepicker-local/dist/vue-datepicker-local'
  import jQuery from 'jquery/dist/jquery.min.js'
  import vueSlider from 'vue-slider-component'

  export default {
  data () {
    return {
        valid: true,
        complete: false,
        formData: {
            lastName: '',
            firstName: '',
            middleName: '',
            contractSum: 10000,
            contractPeriod: 12,
            radioOld: false,
            personPhone: '',
            birthDate: new Date(moment().subtract(18, 'years')),
            agree: true
        },
        local: {
          dow: 1, // Sunday is the first day of the week
          hourTip: 'Select Hour', // tip of select hour
          minuteTip: 'Select Minute', // tip of select minute
          secondTip: 'Select Second', // tip of select second
          yearSuffix: '', // suffix of head year
          monthsHead: 'Январь_Февраль_Март_Апрель_Май_Июнь_Июль_Август_Сентябрь_Октябрь_Ноябрь_Декабрь'.split('_'), // months of head
          months: 'Янв_Фев_Мар_Апр_Май_Июн_Июл_Авг_Сен_Окт_Ноя_Дек'.split('_'),
          weeks: 'Вс_Пн_Вт_Ср_Чт_Пт_Сб'.split('_')
        },
        format: 'DD.MM.YYYY'
      }
  },

  components: {
    VueDatepickerLocal,
    vueSlider
  },
  methods: {
    disabledDate (time) {
      return !(moment(time).isBefore(moment().subtract(18, 'years')) && moment(time).isAfter(moment().subtract(90, 'years')))
    },
    validateBeforeSubmit () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          window.yaCounter38755825.reachGoal('getMoney')
          console.log('goal get money button was reached')
          this.valid = true
          jQuery.ajax({
            'url': 'https://crm.momentodengi.ru/api/momentosite/client/0',
            'type': 'POST',
            'crossDomain': true,
            'data': {'': JSON.stringify(this.formData)}
          }).success(function (data) {
            if (data === 'done') {
              jQuery('#crmForm').hide(500)
              jQuery('#resultCRM').show(500)
            }
          })
//            axios({
//              method: 'POST',
//              url: 'https://momentodengi.ru:7100/api/momentosite/client/0',
//              data: {'': JSON.stringify(this.formData)},
//              withCredentials: true,
//              headers: {'Access-Control-Allow-Origin': true}
//            })
//            .then(res => {
//              console.log(res)
//              if (res.ok) {
//                this.complete = true
//              }
//            })
//            .catch(function (res) {
//              if (res instanceof Error) {
//                console.log(res.message)
//              } else {
//                console.log(res.data)
//              }
//            })
        } else {
            this.valid = false
        }
      })
    }
  },
  created: function () {
      if (this.$route.params.contractSum) {
          this.formData.contractSum = this.$route.params.contractSum
      }
      if (this.$route.params.contractPeriod) {
          this.formData.contractPeriod = this.$route.params.contractPeriod
      }
  }
}
</script>
