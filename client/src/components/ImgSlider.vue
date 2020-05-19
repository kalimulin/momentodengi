<template lang="pug">
    slider(animation='fade', :auto="false", :control-btn="images.length > 1", height="auto")
      slider-item(v-for='(img, index) in images', :key='index')
        img(:src="'/media/' + img.image_source")
</template>

<script>
  import { Slider, SliderItem } from 'vue-easy-slider'

  export default {
    name: 'ImgSlider',
    props: ['images'],
    components: {
      Slider,
      SliderItem
    }
  }
</script>

<style lang="scss">
  .slider {
    position: relative;
    .items {
      .slider-item {
        position: relative;
        z-index: auto !important;
        .wrap {
          text-align: center;
          position: relative;
          img {
            max-width: 100%;
          }
        }
      }
    }
  }
</style>
