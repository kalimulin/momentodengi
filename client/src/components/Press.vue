<template lang="pug">
div
  h1 Пресса о нас
  .content
    .content-item(v-for="article in articles", :key="article.id")
      h2
        router-link(:to="'/page/press/view/' + article.id") {{article.header}}
      //-var date = article.pub_date.toLocaleString('ru-RU');
      .pub-date {{article.pub_date}}
      router-link(:to="'/page/press/view/' + article.id")
      img-slider(:images="article.images")
      p {{article.firstPar}}
      p.readmore
        router-link(:to="'/page/press/view/' + article.id") Подробнее...
      hr
    nav.pagination
        ul
          li.prev(v-if="currentPage > 1")
            router-link(:to="'/page/press/pg/' + (+currentPage-1)") &nbsp;&nbsp;
          li(v-if="currentPage > 2")
            router-link(:to="'/page/press/pg/' + (+currentPage-2)") {{+currentPage - 2}}
          li(v-if="currentPage > 1")
            router-link(:to="'/page/press/pg/' + (+currentPage-1)") {{+currentPage - 1}}
          li.current
            router-link(:to="'/page/press/pg/' + currentPage") {{currentPage}}
          li(v-if="currentPage < countPages")
            router-link(:to="'/page/press/pg/' + (+currentPage+1)") {{+currentPage + 1}}
          li(v-if="countPages - currentPage > 1")
            router-link(:to="'/page/press/pg/' + (+currentPage+2)") {{+currentPage + 2}}
          li.next(v-if="currentPage < countPages")
            router-link(:to="'/page/press/pg/' + (+currentPage+1)") &nbsp;&nbsp;
</template>

<script>
  import ImgSlider from './ImgSlider.vue'

  export default {
  name: 'Press',
  data () {
    return {
      articles: [],
      currentPage: 1,
      countPages: 1
    }
  },
  components: {
    ImgSlider
  },
  methods: {
    updateSource: function (currentPage) {
      this.$http.get('/api/get_press/' + currentPage)
       .then(response => {
         this.countPages = response.body.countPages
         this.articles = []
         response.body.news.map((item) => {
           item.date = item.pub_date.toLocaleString('ru-RU')
           this.articles.push(item)
         })
       })
    },
    prevPage: function (currentPage) {
      if (currentPage > 1) {
        currentPage--
      } else {
        currentPage = 1
      }
    },
    nextPage: function (currentPage, countPages) {
      if (currentPage > countPages) {
        currentPage++
      } else {
        currentPage = countPages
      }
    }
  },
  created: function () {
    this.currentPage = this.$route.params.id ? this.$route.params.id : 1
    this.updateSource(this.currentPage)
    console.log(this.$route)
  },
  watch: {
    currentPage: function (val) {
      this.updateSource(val)
    },
    '$route': function (val) {
      this.updateSource(val.params.id)
      this.currentPage = val.params.id
    }
  }
}
</script>
