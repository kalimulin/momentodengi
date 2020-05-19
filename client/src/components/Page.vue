<template lang="pug">
div#page
    .layout
        .header
            .wrapper
                button.menu-toggle
                .logo
                    router-link(to='/', title='Моменто Деньги')
        .main
            .wrapper
                .leftcol
                    .logo
                    ul
                        li
                            router-link(to='/') Главная
                        li
                            router-link(to='/page/news') Новости
                        li
                            router-link(to='/page/openloan') Получить заём
                        li
                            router-link(to='/page/loans') Каталог займов
                        li
                            router-link(to='/page/closeloan') Как погасить заём
                        li
                            router-link(to='/page/press') Пресса
                        li
                            router-link(to='/page/iamthelaw') Законодательная база
                        li
                            router-link(to='/page/documents') Документы
                        li
                            router-link(to='/page/about') О компании
                        li
                            router-link(to='/page/contacts') Контакты
                        li
                            router-link(to='/page/jobs') Вакансии
                        li
                            router-link(to='/page/rent') Арендодателям
                        li
                            router-link(to='/page/ad') Рекламодателям
                    //script.
                        function showmenu() {
                            $(".leftcol").addClass("active");
                            $("body").css("overflow", "hidden");
                        };
                        function hidemenu() {
                            $(".leftcol").removeClass("active");
                            $("body").css("overflow", "auto");
                        };
                        $(function () {
                            $(".menu-toggle").click(function () {
                                showmenu();
                            });
                        });
                        $(document).mouseup(function (e) {
                            var container = $(".leftcol");
                            if (!container.is(e.target) // if the target of the click isn't the container...
                                && container.has(e.target).length === 0) // ... nor a descendant of the container
                            {
                                hidemenu();
                            }
                        });
                .rightcol
                    #content
                        transition(enter-active-class="animated fadeIn", leave-active-class="animated fadeOut" mode="out-in", :duration="100")
                            router-view
        .footer
            .first-row
                .wrapper
                    .inside
                        a(href='http://kodeks-mfo.ru/', target='_blank')
                            img(src='../assets/images/gfx/kodekslogo.png', alt='')
                        a(href='http://www.npmir.ru/', target='_blank')
                            img(src='../assets/images/gfx/mirlogo.png', alt='')
                        a(href='http://www.cbr.ru/', target='_blank')
                            img(src='../assets/images/gfx/cbrlogo.png', alt='')
            .second-row
                .wrapper
                    .left
                        | © 2011-2017 ООО МКК «МОМЕНТО ДЕНЬГИ»
                        br
                        |                             Все авторские права защищены
                    .right
                        .social
                            ul
                                li
                                    a.vk(href='https://vk.com/momento_dengi', target='_blank')
                                li
                                    a.fb(href='https://www.facebook.com/momentodengi', target='_blank')
                                li
                                    a.ig(href='https://www.instagram.com/momentodengi', target='_blank')

    a#back-to-top(href="#", title="Вверх страницы") &uarr;
</template>

<script>
import '../assets/css/page.scss'

export default {
  name: 'Page',
  data () {
    return {
      region: {
        region_name: ''
      }
    }
  }
}
</script>
