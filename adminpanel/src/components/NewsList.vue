<template lang="pug">
div
  h1 Новости
  hr
  .content
    .loading(v-if="loading") Загрузка данных...
    .error(v-if="error") Не удалось получить данные
    div(v-if="articles.length")
      .d-flex.justify-content-between.align-items-start
        router-link.btn.btn-secondary(:to="'/news/view/0'") Добавить новость...
        b-pagination(align='center', :total-rows='countPages', :v-model='currentPage', :per-page='5', @input="getPage", variant="secondary")
      .row
          b-col.d-flex.align-items-stretch.mb-3(v-for="article in articles", :key="article.id", cols="6", xl="4")
            b-card(:title='article.header', :img-src="getArticleImages(article.images)", img-alt='Img', img-top='')
              //p.card-text(style="max-height: 150px") {{article.firstPar}}
              div.d-flex.justify-content-between.align-items-center(slot='footer')
                router-link.btn.btn-outline-primary.btn-sm(:to="'/news/view/' + article.id") Редактировать
                small.text-muted {{article.pub_date.replace('T', ' ').slice(0, 16)}}
</template>

<script>
import axios from 'axios'

export default {
  name: 'NewsList',
  data () {
    return {
      articles: [],
      currentPage: 1,
      countPages: 1,
      loading: false,
      error: null
    }
  },
  methods: {
    getArticleImages: function (images) {
      if (images && images.length) {
        return ('/media/' + images[0].image_source)
      } else {
        return '/media/not-photo.jpg'
      }
    },
    updateSource: function (currentPage) {
      console.log('--- page', currentPage)
      this.loading = true
      axios.get('/api/get_articles/' + currentPage)
       .then(response => {
         this.countPages = response.data.countPages
         this.articles = []
         response.data.news.map((item) => {
           item.date = item.pub_date.toLocaleString('ru-RU')
           this.articles.push(item)
           this.loading = false
         })
       })
      .catch(function (error) {
        // Wu oh! Something went wrong
        if (error.response && error.response.status === 401) {
          console.log('error')
          this.$localStorage.set('token', '')
          this.$store.commit('CHANGE_TOKEN', '')
          this.$store.commit('CHANGE_USERNAME', '')
          this.$router.push('login')
        }
      })
    },
    getPage: function (currentPage) {
      this.$router.push('/news/pg/' + currentPage)
    }
  },
  created: function () {
    console.log('--- News created')
    this.currentPage = this.$route.params.id ? this.$route.params.id : 1
    this.updateSource(this.currentPage)
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

<style lang="scss" scoped>
  .card {
    .card-footer {
      background-color: #fff;
    }
  }
</style>
