<template lang="pug">
div
  h1 {{ $route.params.title || 'Документы' }}
  .content
    .loading(v-if="loading") Загрузка данных...
    .error(v-if="error") Не удалось получить данные
    ul.files(v-if="documents.length")
      li(v-for="doc in documents", :key="doc.id")
        a.file.pdf(:href="'/media/'+ doc.file_data", target="_blank") {{ doc.file_name }}
</template>

<script>
  export default {
    name: 'Documents',
    data () {
      return {
        documents: [],
        loading: false,
        error: null
      }
    },
    methods: {
      updateSource: function (currentPage) {
        this.loading = true
        this.$http.get('/api/get_documents')
         .then(response => {
           if (response.body.documents && response.body.documents.length) {
             this.documents = response.body.documents
           } else {
             this.error = true
           }
           this.loading = false
         })
      }
    },
    created: function () {
      this.updateSource()
    }
  }
</script>
