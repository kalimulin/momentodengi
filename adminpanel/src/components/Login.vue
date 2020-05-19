<template lang="pug">
  .row.justify-content-center
    .col-4
      b-form(@submit.prevent='onSubmit')
        b-form-group#exampleInputGroup1(label='Логин', label-for='exampleInput1')
          b-form-input#exampleInput1(type='text', v-model='form.login', required='')
        b-form-group#exampleInputGroup2(label='Пароль:', label-for='exampleInput2')
          b-form-input#exampleInput2(type='password', v-model='form.password', required='')
        b-button.m-2(type='submit', variant='primary') Отправить
        b-button.m-2(type='reset', variant='secondary') Очистить
</template>

<script>
import axios from 'axios'

export default {
  name: 'Login',
  data () {
    return {
      msg: 'Добро пожаловать в Админ-панель!',
      form: {
        login: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit: function () {
      let that = this
      axios.post('/api/token', this.form)
        .then(function (response) {
          that.$store.commit('CHANGE_TOKEN', response.data)
          that.$store.commit('CHANGE_USERNAME', that.form.login)
          that.$localStorage.set('token', that.$store.state.token)
          that.$router.push('/')
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
