//карта

var map;

function initialize() {
    var startLat = $('div.onmap').attr('maplat');
    var startLng = $('div.onmap').attr('maplng');


    var mapOptions = {
        zoom: 16,
        scrollwheel: false,
        disableDoubleClickZoom: true,
        center: new google.maps.LatLng(startLat, startLng)
    };
    map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);

    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(startLat, startLng),
        map: map
    });


    $(document).on('click','.selector-body li.office', function(){
        var markerLat = $(this).children('.onmap').attr('maplat');
        var markerLng = $(this).children('.onmap').attr('maplng');
        var latLng = {
            lat: parseFloat(markerLat),
            lng: parseFloat(markerLng)
        };
        if (latLng) {
            marker.setMap(null);
            marker.setPosition(latLng);
            marker.setMap(map);
            map.setCenter(latLng);
        }
        $('.selector-body li').removeClass('active');
        $(this).addClass('active');
    })

}

google.maps.event.addDomListener(window, 'load', initialize);


$(function () {

    //InfinityShowCallWidget({ host: '62.183.113.228', port: 9090, secure: true, from: '101', dtmf: true });


    //слайдер
    function gobgswitch() {
        $('.bg').bgswitcher({
            images: ["../../static/style/img2/1.jpg", "../../static/style/img2/2.jpg", "../../static/style/img2/3.jpg"],
            effect: "fade",
            duration: 750,
            interval: 10500
        });
    }

    gobgswitch();

    $('.slick').slick({
        speed: 300,
        arrows: false,
        easing: 'easeInOutQuart',
        swipe: false,
        adaptiveHeight: true
    });

    $('.tabs .wrapper a').click(function (e) {
        e.preventDefault();

        let slideIndex = $(this).index();
        $('.slick').slick('slickGoTo', slideIndex);

        $(this).siblings().removeClass('active');
        $(this).addClass('active');
    });

//калькулятор

    $(".slider.money").slider({
        range: "max",
        min: 3000,
        max: 30000,
        value: 10000,
        step: 500,
        slide: function (event, ui) {
            $('#sum').val(ui.value + ' руб.');
            let x = parseInt($('#period').val(), 10);
            $('#result').val(ui.value + (ui.value / 100) * 1.95 * x + ' руб.');
        }
    });


    $(".slider.days").slider({
        range: "max",
        min: 7,
        max: 30,
        value: 12,
        step: 1,
        slide: function (event, ui) {
            $('#period').val(ui.value + ' дней');
            let x = parseInt($('#sum').val(), 10);
            $('#result').val(x + (x / 100 ) * 1.95 * ui.value + ' руб.');
        }
    });


    // регионы

    $.get('api/regions', function (regionsData) {
        let regions = {};

        $.each(regionsData.regions, function (index, value) {
            regions[value.id] = value.region_name;
        });

        for (i = 1; i <= regionsData.regions.length; i++){
            $('ul.location').append(`<li data-region="${i}">${regions[i]}</li>`);
        }

        $.get('api/offices', function (data) {
            let off = data.offices;
            let regionName = 'Астрахань';
            let obj = {};

            for (i = 0; i < off.length; i++) {
                let city = off[i].city;
                obj[city] = off[i]['region_id'];
            }

            appendCities(obj);

            //regionName = $('ul.location li:first-child li:first-child a').text();
            $('div.location span').text(regionName);
            $('a.city span' ).text(regionName);

            appendOffices(off, regionName);

            $('ul.location li.city').on('click', function(){
                regionName = $(this).children('a').text();
                $('div.location span').text(regionName);
                $('a.city span' ).text(regionName);
                $('.shadowed').removeClass('opened');
                appendOffices(off, regionName);
                initialize();
            });
        });
    });

    function appendOffices(offices, city) {
        $('.selector-body ul li').remove();
        for (i = 0; i < offices.length; i++) {
            if (offices[i].city === city) {
                if (!(offices[i].photo)) {offices[i].photo = 'not-photo.jpg'}
                $('.selector-body ul')
                    .append('' +
                        '<li class="office">' +
                        '<div class="image" style="background-image:url(media/'+ offices[i].photo + ');"></div>' +
                        '<div class="address"><span>' + offices[i].address + '</span></div>' +
                        '<div class="time"><span>Пн-Пт</span><span>' + offices[i].weekdays + '</span></div>' +
                        '<div class="time"><span>Сб</span><span>' + offices[i].saturday + '</span></div>' +
                        '<div class="time"><span>Вс</span><span>' + offices[i].sunday +'</span></div>' +
                        '<div class="time"><span>Обед</span>' + offices[i].dinner + '</div>' +
                        '<div class="onmap" maplat="' + offices[i].let + '" maplng="'+ offices[i].lng +'">Показать на карте</div>' +
                        '</li>');
            }
        }
    }

    function appendCities(offices){
        $.each(offices, function(index, value){
            let str = `ul.location li[data-region=${value}]`;
            $(str).append('<li class="city"><a>'+index+'</a></li>');
         });
    }

    //слоган

    $('.slogan div.part:gt(0)').hide();
    setInterval(function () {
        $('.slogan div.part:first-child').fadeOut(750)
           .next('div.part').fadeIn(750)
           .end().appendTo('.slogan');
    },
      10500);


    $('.expand-title span').click(function(){
        $(this).parent().hide();
        $(this).closest('.expand').children('.expand-body').show('slide', { direction: 'down' }, 200);
    });


    $('.expand-body .right span').click(function () {
        $(this).closest('.right').parent().hide();
        $(this).closest('.expand').children('.expand-title').show('slide', { direction: 'down' }, 200);
    });



    $('div.mapblock .selector .selector-head a').on('click', function (e) {

        e.preventDefault();
        $('.shadowed').addClass('opened');
    });

    $('div.header .location span').on('click', function (e) {

        e.preventDefault();
        $('.shadowed').addClass('opened');
    });

    $('a.icon-close').on('click', function (e) {
        e.preventDefault();
        $('.shadowed').removeClass('opened');
    });

    $('a.window_close').on('click', function (e) {
        e.preventDefault();
        $('.shadowed').removeClass('opened');

    });


});
