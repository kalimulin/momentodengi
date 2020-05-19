const editorConfig = {
    toolbarButtons: [
        'bold',
        'italic',
        'underline',
        'strikeThrough',
        'subscript',
        'superscript',
        //'fontFamily',
        //'fontSize', '|',
        'specialCharacters',
        'color',
        'emoticons',
        //'inlineStyle',
        //'paragraphStyle',
        '|',
        'paragraphFormat',
        'align', 'formatOL', 'formatUL', 'outdent', 'indent', '-', 'quote', 'insertHR', 'insertLink',
        //'insertImage', 'insertVideo', 'insertFile', 'insertTable',
        '|', 'undo', 'redo', 'clearFormatting', 'selectAll', 'html', 'applyFormat', 'removeFormat', 'fullscreen', 'print', 'help'],
    pluginsEnabled: null,
    language: 'ru',
    pastePlain: true,
    placeholderText: 'Текст новости'
};

// Reducers
const pageStore = Redux.createStore((state = {}, actions) => {
    let {page = 'dashboard'} = actions;
    switch (actions.type) {
        case 'CHANGE_CURRENT_PAGE': return Object.assign({}, state, {page: page});
        default: return state
    }
});

pageStore.subscribe(() => {
    let state = pageStore.getState();
    //console.log(page);
    getPage(state.page);
});

////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////

$(function () {
    if (localStorage.token !== 'undefined' && localStorage.token) {
        console.log('--- token', localStorage.token);
        checkToken();
    } else {
        getPage('login');
    }

    $('#navbar').on('click', 'a', function (e) {
        e.preventDefault();
        pageStore.dispatch({
            type: 'CHANGE_CURRENT_PAGE',
            page: e.target.pathname.split('/')[1]
        });
    });


    $('#form-signin').on('submit', function (e) {
        e.preventDefault();
        getToken($(this));
    });

    $('.news-editor').froalaEditor(editorConfig);

    let news_container = $('#news');
    let docs_container = $('#docs');
    let offices_container = $('#offices');

    news_container.on('click', '.nav-link', function () {
        news_container.find('form')[0].reset();
        getArticles('news', $(this).data('id'));
    });

    offices_container.on('click', '.nav-link', function () {
        getArticles('office', $(this).data('id'));
        $(this).addClass('active');
        $(this).parent().siblings().find('.nav-link').removeClass('active');
    });

    docs_container.on('click', '.nav-link', function () {
        $(this).addClass('active');
        $(this).parent().siblings().find('.nav-link').removeClass('active');
        getArticles('document', $(this).data('id'));
    })

    $('.sendNews').on('click', function () {
        let title = $(this).closest('.add-news-form').find('.newsTitle').val();
        let html = $(this).closest('.add-news-form').find('div.news-editor').froalaEditor('html.get');
        let id = $(this).closest('.add-news-form').find('input[name=id]').val();
        let files = $(this).closest('.add-news-form').find('form');
        pushArticle(title, html, id, files);
    })

    // $('.add-news-form').on('change', 'input[type=file]', function () {
    //     preview_image($(this));
    // });

    $('form.document_upload').on('submit', document_upload);

    $('form.news_upload').on('submit', news_upload);

    $('form.office_upload').on('submit', office_upload);

    $('input[type=reset]').on('click', function () {
        console.log($(this).closest('form').find('.images-preview').html(''));
    })

    $('button.document_remove').on('click', function () {
        if ($(this).attr('data-id')) {
            if (confirm("Подтвердите удаление")) {
                document_remove($(this).attr('data-id'))
            }
        }
    })

});

////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////

function preview_image(e)
{
    let total_file=e[0].files.length;
    let preview = e.closest('.add-news-form').find('.images-preview');
    preview.html('');
    for(let i=0;i<total_file;i++)
    {
        preview.append("<div class='img-preview'><img src='"+URL.createObjectURL(event.target.files[i])+"'></div>");
    }
    preview.find('i').each(function (i, file) {
        let element = $(file);
        element.on('click', function () {
            console.log($(this).data('id'));
            console.log(e[0].files[total_file - 1]);
            delete e[0].files[total_file - 1];
            console.log(e[0].files);
        })

    })
}

function news_upload(submitEvent) {
    submitEvent.preventDefault();
    let form = $(this);
    let formdata = new FormData(form[0]);
    $.ajax({
        type: "POST",
        enctype: 'multipart/form-data',
        url: "/pro_api/push_article",
        data: formdata,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 600000,
        beforeSend: function(xhr) {
            loader(true);
            if (localStorage.token) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.token);
            }
        },
        success: function (data) {
            console.log("SUCCESS : ", data);
            form[0].reset();
            $.toast({
                heading: 'Успех!',
                text: 'Новость сохранена',
                showHideTransition: 'fade',
                icon: 'success',
                position: 'top-right'
            });
            getArticles('news', formdata.get('id'));
            loader();
        },
        error: function (e) {
            console.log("ERROR : ", e);
            $.toast({
                heading: 'Ошибка',
                text: 'Новость не сохранена. Попробуйте позднее',
                showHideTransition: 'fade',
                icon: 'error',
                position: 'top-right'
            });
            loader();
        }
    });
}
function office_upload(submitEvent) {
    submitEvent.preventDefault();
    let form = $(this);
    let data = new FormData(form[0]);
    let id = (data.get('id'));
    $.ajax({
        type: "POST",
        enctype: 'multipart/form-data',
        url: "/pro_api/push_office",
        data: data,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 600000,
        beforeSend: function(xhr) {
            loader(true);
            if (localStorage.token) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.token);
            }
        },
        success: function (data) {
            console.log("SUCCESS : ", data);
            //form[0].reset();
            //getArticles('office', )
            $.toast({
                heading: 'Успех!',
                text: 'Документ сохранен',
                showHideTransition: 'fade',
                icon: 'success',
                position: 'top-right'
            });
            getArticles('office', id);
            loader();
        },
        error: function (e) {
            console.log("ERROR : ", e);
            $.toast({
                heading: 'Ошибка',
                text: 'Документ не сохранён. Попробуйте позднее',
                showHideTransition: 'fade',
                icon: 'error',
                position: 'top-right'
            });
            loader();
        }
    });
}

function document_upload(submitEvent) {
    submitEvent.preventDefault();
    let form = $(this)[0];
    let data = new FormData(form);
    //data.append("name", name);
    $.ajax({
        type: "POST",
        enctype: 'multipart/form-data',
        url: "/pro_api/docs_upload",
        data: data,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 600000,
        beforeSend: function(xhr) {
            loader(true);
            if (localStorage.token) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.token);
            }
        },
        success: function (data) {
            console.log("SUCCESS : ", data);
            form.reset();
            $.toast({
                heading: 'Успех!',
                text: 'Документ сохранен',
                showHideTransition: 'fade',
                icon: 'success',
                position: 'top-right'
            });
            getArticles('document');
            loader();
        },
        error: function (e) {
            console.log("ERROR : ", e);
            $.toast({
                heading: 'Ошибка',
                text: 'Документ не сохранён. Попробуйте позднее',
                showHideTransition: 'fade',
                icon: 'error',
                position: 'top-right'
            });
            loader();
        }
    });
}

function document_remove(id) {
    $.ajax({
        type: "DELETE",
        enctype: 'multipart/form-data',
        url: "/pro_api/document/" + id,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 600000,
        beforeSend: function(xhr) {
            loader(true);
            if (localStorage.token) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.token);
            }
        },
        success: function (data) {
            console.log("SUCCESS : ", data);
            $.toast({
                heading: 'Успех!',
                text: 'Документ удален',
                showHideTransition: 'fade',
                icon: 'success',
                position: 'top-right'
            });
            getArticles('document');
            clearDocsEditForm();
            loader();
        },
        error: function (e) {
            console.log("ERROR : ", e);
            $.toast({
                heading: 'Ошибка',
                text: 'Документ не удален. Попробуйте позднее',
                showHideTransition: 'fade',
                icon: 'error',
                position: 'top-right'
            });
            loader();
        }
    });
}

function remove_image(id, newsId) {
    $.ajax({
        type: "DELETE",
        url: "/pro_api/image/" + id,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 600000,
        beforeSend: function(xhr) {
            loader(true);
            if (localStorage.token) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.token);
            }
        },
        success: function (data) {
            console.log("SUCCESS : ", data);
            $.toast({
                heading: 'Успех!',
                text: 'Изображение удалено',
                showHideTransition: 'fade',
                icon: 'success',
                position: 'top-right'
            });
            getArticles('news', newsId);
            loader();
        },
        error: function (e) {
            console.log("ERROR : ", e);
            $.toast({
                heading: 'Ошибка',
                text: 'Изображение не удалено. Попробуйте позднее',
                showHideTransition: 'fade',
                icon: 'error',
                position: 'top-right'
            });
            loader();
        }
    });
}

function clearNewsForm() {
    let news_container = $('#news');
    news_container.find('.title').text('Добавить новость');
    $('#newsTitle').val('').attr('data-id', '');
    news_container.find(`nav .nav-link`).removeClass('active');
    $('#news-editor').froalaEditor('html.set', '');
    console.log(news_container.find('form'));
    news_container.find('form')[0].reset();
}

function clearNewsEditForm() {
    let news_container = $('#news');
    news_container.find('.title').text('Добавить новость');
    news_container.find(`nav .nav-link`).removeClass('active');
    news_container.find('input.newsTitle').val('');
    news_container.find('input[name=id]').val('');
    news_container.find('.news-editor').froalaEditor('html.set', '');
    news_container.find('input[type=file]').show();
    news_container.find('.images-preview').hide();
}

function clearDocsEditForm() {
    let docs_container = $('#docs');
    docs_container.find('.title').text('Добавить документ');
    docs_container.find(`nav .nav-link`).removeClass('active');
    docs_container.find('input[name=name]').val('');
    docs_container.find('input[name=id]').val('');
    docs_container.find('input[type=file]').show();
    docs_container.find('button.document_remove').removeAttr('data-id');
}

function getArticles(type = 'news', id = 0) {
    console.log(type, id);
    clearNewsEditForm();
    let url = `/pro_api/get/${type}/${id}`;
    loader(true);
    $.ajax({
        type: 'GET',
        url,
        data: id,
        beforeSend: function(xhr) {
            if (localStorage.token) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.token);
            }
        },
        success: function(data) {
            console.log(data);
            loader();
            if (id) {

                if (type === 'news') {
                    let news = data.news[0];
                    let images = data.images;
                    let news_container = $('#news');
                    news_container.find('.title').text('Редактировать офис');
                    news_container.find('input[name=title]').val(news.header);
                    news_container.find('input[name=id]').val(news.id);
                    //news_container.find('input[type=file]').hide();
                    news_container.find(`nav .nav-link`).removeClass('active');
                    news_container.find(`nav .nav-link[data-id=${news.id}]`).addClass('active');
                    $('.news-editor').froalaEditor('html.set', news.article);
                    news_container.find('.images-preview').empty().show();
                    images.map(function (img) {
                        news_container.find('.images-preview')
                            .append(`<div class="img-preview"><img class="img-preview" src="media/${img.image_source}" />` +
                                `<i class="fa fa-times" data-id="${img.id}"></i></div>`)
                    });
                    news_container.find('.images-preview .img-preview').on('click', 'i.fa', function () {
                        let id = $(this).attr('data-id');
                        console.log(id);
                        remove_image(id, news.id);
                    });
                }
                if (type === 'office') {
                    data = data[0];
                    let news_container = $('#offices');
                    news_container.find('.title').text('Редактировать офис');
                    news_container.find('input.form-check-input').prop('checked', data.active);
                    news_container.find('input[name=name]').val(data.office_name);
                    news_container.find('input[name=address]').val(data.address);
                    news_container.find('input[name=latitude]').val(data.let);
                    news_container.find('input[name=longitude]').val(data.lng);
                    news_container.find('input[name=city]').val(data.city);
                    news_container.find('input[name=dinner]').val(data.dinner);
                    news_container.find('input[name=weekdays]').val(data.weekdays);
                    news_container.find('input[name=saturday]').val(data.saturday);
                    news_container.find('input[name=sunday]').val(data.sunday);
                    news_container.find('input[name=id]').val(data.id);
                    news_container.find(`nav .nav-link`).removeClass('active');
                    news_container.find(`nav .nav-link[data-id=${data.id}]`).addClass('active');
                    let regions = JSON.parse(localStorage.regions);
                    news_container.find('select[name=region]').empty();
                    regions.map(function (region) {
                        news_container.find('select[name=region]').append(`<option value="${region.id}">${region.region_name}</option>`)
                    });
                    news_container.find('select[name=region]').val(data.region_id);
                    news_container.find('.office-image img').attr('src', '/media/' + data.photo)
                }
                if (type === 'document') {
                    data = data[0];
                    let docs_container = $('#docs');
                    docs_container.find('.title').text('Редактировать документ');
                    docs_container.find('input[name=name]').val(data.file_name);
                    docs_container.find('input[name=id]').val(data.id);
                    docs_container.find('input[type=file]').hide();
                    docs_container.find('button.document_remove').attr('data-id', data.id)
                }
            } else {
                if (type === 'news') {
                    $('#news-headers').html('');
                    data.map(function (item) {
                        $('#news-headers').append(`<li class="nav-item"><p class="nav-link" data-id="${item.id}"><span>[${item.pub_date.split('T')[0]}]</span> ${item.header}</p></li>`);
                    });
                }
                if (type === 'document') {
                    $('#docs-headers').empty();
                    data.map(function (item) {
                        $('#docs-headers')
                            .append(`<li class="nav-item"><p class="nav-link" data-id="${item.id}"><span>[${item.publish_date.split('T')[0]}]</span> ${item.file_name}</p></li>`);
                    });
                }
                if (type === 'office') {
                    let news_container = $('#offices');
                    localStorage.regions = JSON.stringify(data.regions);
                    news_container.find('select[name=region]').empty();
                    data.regions.map(function (region) {
                        news_container.find('select[name=region]').append(`<option value="${region.id}">${region.region_name}</option>`)
                    });

                    $('#offices-headers').empty();
                    data.offices.map(function (item) {
                        $('#offices-headers')
                            .append(`<li class="nav-item"><p class="nav-link" data-id="${item.id}"><span>[${item.city}]</span> ${item.office_name}</p></li>`);
                    });

                }
            }
        },
        error: function(xhr) {
            if (xhr.status === 401) {
                $.toast({
                    heading: 'Ошибка',
                    text: 'Статья не сохранена. Попробуйте позднее',
                    showHideTransition: 'fade',
                    icon: 'error',
                    position: 'top-right'
                });
                logout();
            } else {
                $.toast({
                    heading: 'Ошибка соединения',
                    text: 'Неверные имя пользователи или пароль',
                    showHideTransition: 'fade',
                    icon: 'error',
                    position: 'top-right'
                });
                loader();
            }
        }
    });
}

function pushArticle(e) {
    e.preventDefault();
    let form = $(this)[0];
    let formdata = new FormData(form);
    formdata.append("title", $(this).parent().find('.news-title').text());

    loader(true);
    $.ajax({
        type: 'POST',
        enctype: 'multipart/form-data',
        url: '/pro_api/push_article',
        data: formdata,
        beforeSend: function(xhr) {
            if (localStorage.token) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.token);
            }
        },
        success: function(data) {
            console.log('---', data);
            clearNewsForm();
            loader();
            $.toast({
                heading: 'Успех!',
                text: 'Статья сохранена',
                showHideTransition: 'fade',
                icon: 'success',
                position: 'top-right'
            });
            getArticles();
        },
        error: function(xhr) {
            if (xhr.status === 401) {
                $.toast({
                    heading: 'Ошибка',
                    text: 'Неверные имя пользователи или пароль',
                    showHideTransition: 'fade',
                    icon: 'error',
                    position: 'top-right'
                });
            } else {
                $.toast({
                    heading: 'Ошибка аутентификации',
                    text: 'Статья не сохранена. Попробуйте позднее',
                    showHideTransition: 'fade',
                    icon: 'error',
                    position: 'top-right'
                });
            }
            loader();
        }
    });
}

function getToken(form) {
    let formdata = form.serialize();
    loader(true);
    $.ajax({
        type: 'POST',
        url: '/token',
        data: formdata,
        beforeSend: function(xhr) {
            if (localStorage.token) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.token);
            }
        },
        success: function(data) {
            localStorage.token = data;
            console.log('--- new token', data);
            $('#username').text(form.children('input[name=login]').val());
            form[0].reset();
            loader();
            login();
        },
        error: function(xhr) {
            $.toast({
                heading: 'Ошибка аутентификации',
                text: 'Неверные имя пользователи или пароль',
                showHideTransition: 'fade',
                icon: 'error',
                position: 'top-right'
            })
            localStorage.clear();
            console.log("Sorry, you are not logged in.");
            loader();
        }
    });
}

function checkToken() {
    $.ajax({
        type: 'GET',
        url: '/pro_api/check',
        beforeSend: function(xhr) {
            if (localStorage.token) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.token);
            }
        },
        success: function(data) {
            console.log(data);
            $('#username').text(data.user);
            loader();
            login();        },
        error: function() {
            logout();
        }
    });

}

function login() {
    $('#navbar').css({display: 'flex'});
    getPage('dashboard');
}

function logout() {
    loader();
    localStorage.clear();
    $('#navbar').css({display: 'none'});
    getPage('login');
}

function getPage(page) {
    if (!page) {page = 'dashboard'};
    $('#'+ page).show().siblings('.section-page').hide();
    if (page === 'news') {
        getArticles();
    }
    if (page === 'docs') {
        getArticles('document');
    }
    if (page === 'offices') {
        getArticles('office');
    }
}

function loader(action = false) {
    let preloader = $('#preloader');
    if (action) {
        preloader.css({display: 'flex'})
    } else {
        preloader.css({display: 'none'})
    }
}