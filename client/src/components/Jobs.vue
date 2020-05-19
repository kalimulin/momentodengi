<template lang="pug">
div
    h1 Вакансии
        h1.h1-job1.font-gray Объявляется набор
    h1.h1-job2 сотрудников в резерв
    h3.h3-job.font-gray Требования:
    ul.ul-job.font-gray
        li Образование среднее/ср.специальное/неполное высшее/высшее
        li Уверенный пользователь ПК (Word)
        li Навыки делового общения по телефону, грамотная, чистая речь
        li Дисциплинированность
    h3.h3-job.font-gray Условия:
    ul.ul-job.font-gray
        li Оформление по ТК РФ (все социальные гарантии)
        li Обучение за счет компании
        li Удобный график работы
    h3.h3-job
        b Должностные обязанности:
    ul.ul-job
        li
            b
                | Консультирование клиентов в офисе продаж по вопросам предоставления краткосрочных займов
    table.tb-job
        tr
            td
                h1.h1-job3.font-gray Звони и приходи на собеседование
            td
                h1.h1-job2 89678218126
    p
        b Телефон:
        |  8 (8512) 30 62 93
    p
        b E-mail:
        a(href='mail:to') md_personal@bk.ru
    hr

</template>


<script>
  import '../assets/css/jobs.scss'

  export default {
    name: 'Jobs',
    data () {
      return {
        region: {
          region_name: ''
        }
      }
    }
  }
</script>
