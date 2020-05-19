<template lang="pug">
div
  h1 {{ article.header }}
  .content
    .pub-date {{article.pub_date}}
    img-slider(:images="article.images")
    div(v-html="article.article")
    hr
    a(href='#' @click.prevent="$router.go(-1)") Назад к списку новостей
    br
    br
</template>

<script>
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
    updateSource: function (source) {
      this.$http.get('/api/get_press_item/' + this.$route.params.id)
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


<style >

</style>
