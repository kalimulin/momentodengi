<template lang="pug">
div
  .content
    h1 {{pageTitle}}
    b-form-group
      label.lead Заголовок новости
      b-form-input(v-model='article.header', type='text', placeholder='Заголовок новости', required)
    b-form-group
      label.lead Текст новости
      tinymce(id="d1", v-model="article.article", :plugins="editorConfig.plugins")
    b-card-group.row.m-1(v-if="article.images && article.images.length")
        b-card.col-2(:img-src="'/media/' + img.image_source", img-alt='Img', img-top='', v-for="img in article.images", :key="img.id", align="center")
          b-button(variant="outline-warning", size="sm", @click.prevent="showModal(img.id)") Удалить
    b-card-group
      h2 Добавить изображения
      b-form-file(id="file_input1", v-model="uploadedImages", multiple="", @input="addFiles", ref="fileinput")
    b-form-group.mt-3
      b-button(variant="success", size="", @click.prevent="onSubmit", v-if="$store.state.fetchStatus === 'ready'") Сохранить
      b-progress(:value="100", variant="success", animated="animate", class="mb-3", v-if="$store.state.fetchStatus === 'sending'")
    hr
    a.py-3(href="#", @click.prevent="$router.go(-1)") Назад к списку новостей
    hr.mt-3
    b-modal(ref='myModalRef', title="Удалить изображение?", @ok="removeImage")
      .d-block.text-center
        h3 {{modal.imgId}}
</template>

<script>
import axios from 'axios'

export default {
  name: 'NewsItem',
  data () {
    return {
      article: {
        id: 0,
        article: '',
        header: '',
        images: []
      },
      uploadedImages: [],
      data: '',
      pageTitle: 'Редактирование материала',
      editorConfig: {
        plugins: [
          'advlist autolink lists link charmap print preview hr anchor pagebreak',
          'searchreplace wordcount visualblocks visualchars code fullscreen',
          'insertdatetime nonbreaking save table contextmenu directionality'
        ]
      },
      modal: {
        title: 'title',
        header: 'header',
        imgId: 0
      }
    }
  },
  methods: {
    addFiles: function () {
      let upload = this.uploadedImages.filter(function (file) {
        return (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif')
      })
      console.log(upload)
    },
    onSubmit: function () {
      let data = new FormData()
      data.append('title', this.article.header)
      data.append('editor_content', this.article.article)
      this.uploadedImages.map(function (image) {
        data.append('image', image)
      })
      let that = this
      axios.post('/pro_api/push_article', data, {
        headers: {
          'Authorization': 'Bearer ' + that.$store.state.token,
          'content-type': 'multipart/form-data'
        }
      })
        .then(function (response) {
          if (response.status === 200) {
            that.$snotify.success('Материал успешно добавлен')
            that.$router.push('/news/view/' + response.data.rows[0].id)
            that.mount()
          }
        })
        .catch(function (error) {
          console.log('error', error)
          if (error.response && error.response.status === 401) {
            console.log('error')
            that.$localStorage.set('token', '')
            that.$store.commit('CHANGE_TOKEN', '')
            that.$store.commit('CHANGE_USERNAME', '')
          }
        })
    },
    showModal (id) {
      this.modal.imgId = id
      this.$refs.myModalRef.show()
    },
    removeImage () {
      console.log('--- remove image id', this.modal.imgId)
    },
    updateSource: function (source) {
      console.log('--- get item')
      axios.get('/api/get_article/' + this.$route.params.id)
       .then(response => {
         this.article = response.data.news_item
         this.$snotify.success('Материал успешно добавлен')
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
    mount: function () {
      this.$refs.fileinput.reset()
      if (+this.$route.params.id) {
        this.pageTitle = 'Редактирование статьи'
        this.updateSource(this.source)
      } else {
        this.pageTitle = 'Создание статьи'
      }
    }
  },
  mounted: function () {
    console.log('--- mounted')
    this.mount()
  },
  watch: {
    source: function (val) {
      this.updateSource(val)
    },
    $router: function () {
      this.mount()
    }
  }
}
</script>

<style>
  .custom-file-control::before {
    content: 'Выберите изображения или перетащите сюда' !important;
  }

  .custom-file .drop-here::before {
    content: 'Перетащите файлы сюда' !important;
  }
</style>
