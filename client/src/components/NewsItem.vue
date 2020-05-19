<template lang="pug">
div
  h1 {{ article.header }}
  .content
    .pub-date {{formatDate(article.pub_date)}}
    div(v-if="article.images && article.images.length")
      img-slider(:images="article.images")
    div(v-html="article.article")
    hr
    a(href='#', @click.prevent="$router.go(-1)") Назад к списку новостей
    br
    br
</template>

<script>
import Moment from 'moment-mini'
import ImgSlider from './ImgSlider.vue'

export default {
  name: 'News',
  data () {
    return {
      article: {}
    }
  },
  components: {
    ImgSlider
  },
  methods: {
    formatDate: function (date) {
      return Moment(date).format('DD.MM.YYYY')
    },
    updateSource: function (source) {
      this.$http.get('/api/get_article/' + this.$route.params.id)
       .then(response => {
         this.article = response.body.news_item
       })
    }
  },
  created: function () {
    this.updateSource(this.source)
  },
  watch: {
    source: function (val) {
      this.updateSource(val)
    }
  }
}
</script>
