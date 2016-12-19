var responsiveflag = false;
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
var isiPad = /iPad/i.test(navigator.userAgent);
$(document).ready(function () {
    controller = new ScrollMagic();
    highdpiInit();
    responsiveResize();
    $(window).resize(responsiveResize);
    if (navigator.userAgent.match(/Android/i)) {
        var viewport = document.querySelector('meta[name="viewport"]');
        viewport.setAttribute('content', 'initial-scale=1.0,maximum-scale=1.0,user-scalable=0,width=device-width,height=device-height');
        window.scrollTo(0, 1);
    }
    blockHover();
    if (typeof quickView !== 'undefined' && quickView) {
        quick_view();
    }
    dropDown();
    sitemapAccordion();
    counter();
    testimonialsSlider();
    if (typeof page_name != 'undefined' && !in_array(page_name, ['index', 'product'])) {
        bindGrid();
        $(document).on('change', '.selectProductSort', function (e) {
            if (typeof request != 'undefined' && request) {
                var requestSortProducts = request;
            }
            var splitData = $(this).val().split(':');
            var url = '';
            if (typeof requestSortProducts != 'undefined' && requestSortProducts) {
                url += requestSortProducts;
                if (typeof splitData[0] !== 'undefined' && splitData[0]) {
                    url += (requestSortProducts.indexOf('?') < 0 ? '?' : '&') + 'orderby=' + splitData[0] + (splitData[1] ? '&orderway=' + splitData[1] : '');
                    if (typeof splitData[1] !== 'undefined' && splitData[1]) {
                        url += '&orderway=' + splitData[1];
                    }
                }
                document.location.href = url;
            }
        });
        $(document).on('change', 'select[name="n"]', function () {
            $(this.form).submit();
        });

    }
    $(document).on('change', 'select[name="manufacturer_list"], select[name="supplier_list"]', function () {
        if (this.value != '') {
            location.href = this.value;
        }
    });
    $(document).on('click', '.back', function (e) {
        e.preventDefault();
        history.back();
    });
    jQuery.curCSS = jQuery.css;
    if (!!$.prototype.cluetip) {
        $('a.cluetip').cluetip({
            local: true,
            cursor: 'pointer',
            dropShadow: false,
            dropShadowSteps: 0,
            showTitle: false,
            tracking: true,
            sticky: false,
            mouseOutClose: true,
            fx: {open: 'fadeIn', openSpeed: 'fast'}
        }).css('opacity', 0.8);
    }

    $('.alert.alert-danger').on('click', this, function (e) {
        if (e.offsetX >= 16 && e.offsetX <= 39 && e.offsetY >= 16 && e.offsetY <= 34) {
            $(this).fadeOut();
        }
    });
    $('.socialfeedblock').prependTo($('#social_block .toggle-footer'));
    $('body').append('<a id="toTop" class="toTop fl-bigmug-line-up107" href="#"></a>');
    $('#toTop').click(function (e) {
        e.preventDefault();
        $('html, body').stop().animate({scrollTop: 0}, 500)
    });
    $(window).scroll(function () {
        var $this = $(this), top = $('#toTop')
        st = $this.scrollTop();
        if (st < 500) {
            top.fadeOut();
        } else {
            top.stop(true, true).fadeIn();
        }
    });
});
function highdpiInit() {
    if (typeof highDPI === 'undefined') {
        return;
    }
    if (highDPI && $('.replace-2x').css('font-size') == '1px') {
        var els = $('img.replace-2x').get();
        for (var i = 0; i < els.length; i++) {
            src = els[i].src;
            extension = src.substr((src.lastIndexOf('.') + 1));
            src = src.replace('.' + extension, '2x.' + extension);
            var img = new Image();
            img.src = src;
            img.height != 0 ? els[i].src = src : els[i].src = els[i].src;
        }
    }
}
function scrollCompensate() {
    var inner = document.createElement('p');
    inner.style.width = '100%';
    inner.style.height = '200px';
    var outer = document.createElement('div');
    outer.style.position = 'absolute';
    outer.style.top = '0px';
    outer.style.left = '0px';
    outer.style.visibility = 'hidden';
    outer.style.width = '200px';
    outer.style.height = '150px';
    outer.style.overflow = 'hidden';
    outer.appendChild(inner);
    document.body.appendChild(outer);
    var w1 = inner.offsetWidth;
    outer.style.overflow = 'scroll';
    var w2 = inner.offsetWidth;
    if (w1 == w2) {
        w2 = outer.clientWidth;
    }
    document.body.removeChild(outer);
    return (w1 - w2);
}
function responsiveResize() {
    compensante = scrollCompensate();
    if (($(window).width() + scrollCompensate()) <= 767 && responsiveflag == false) {
        accordion('enable');
        accordionFooter('enable');
        responsiveflag = true;
    } else if (($(window).width() + scrollCompensate()) >= 768) {
        accordion('disable');
        accordionFooter('disable');
        responsiveflag = false;
        if (typeof bindUniform !== 'undefined') {
            bindUniform();
        }
    }
}
function blockHover(status) {
    $(document).off('mouseenter').on('mouseenter', '.product_list.grid li.ajax_block_product .product-container', function (e) {
        if ('ontouchstart' in document.documentElement) {
            return;
        }
        if ($('body').find('.container').width() == 1170) {
            $(this).parent().addClass('hovered');
        }
    });
    $(document).off('mouseleave').on('mouseleave', '.product_list.grid li.ajax_block_product .product-container', function (e) {
        if ($('body').find('.container').width() == 1170) {
            $(this).parent().removeClass('hovered');
        }
    });
}
function quick_view() {
    $(document).on('click', '.quick-view:visible, .quick-view-mobile:visible', function (e) {
        e.preventDefault();
        var url = $(this).attr('data-href');
        if (!url && url == 'undefined') {
            var url = this.rel;
        }
        var anchor = '';
        if (url.indexOf('#') != -1) {
            anchor = url.substring(url.indexOf('#'), url.length);
            url = url.substring(0, url.indexOf('#'));
        }
        if (url.indexOf('?') != -1) {
            url += '&';
        } else {
            url += '?';
        }
        if (!!$.prototype.fancybox) {
            $.fancybox({
                'padding': 0,
                'width': 900,
                'height': 500,
                'type': 'iframe',
                'href': url + 'content_only=1' + anchor
            });
        }
    });
}
function bindGrid() {
    var storage = false;
    if (typeof(getStorageAvailable) !== 'undefined') {
        storage = getStorageAvailable();
    }
    if (!storage) {
        return;
    }
    var view = $.totalStorage('display');
    if (!view && (typeof displayList != 'undefined') && displayList) {
        view = 'list';
    }
    if (view && view != 'grid') {
        display(view);
    } else {
        $('.display').find('li#grid').addClass('selected');
    }
    if ($('body#category').hasClass('three-columns')) {
        display('list');
        $('ul.display').addClass('hidden');
    }
    $(document).on('click', '#grid, #list', function (e) {
        e.preventDefault();
        if (!$(this).hasClass('selected')) {
            display($(this).attr('id'));
        }
    });
}
if (nbItemsPerLine != 'undefined' && nbItemsPerLineTablet != 'undefined') {
    var nbItemsPerLine = nbItemsPerLine;
    var nbItemsPerLineTablet = nbItemsPerLineTablet
} else {
    var nbItemsPerLine = '';
    var nbItemsPerLineTablet = '';
}
function display(view) {
    if (view == 'list') {
        $('ul.product_list').removeClass('grid').addClass('list row');
        $('.product_list > li').removeClass('col-xs-12 col-sm-' + 12 / nbItemsPerLineTablet + ' col-md-' + 12 / nbItemsPerLine).addClass('col-xs-12');
        var columns = 2;
        if ($('body').hasClass('three-columns')) {
            columns = 3;
        }
        $('.product_list > li').each(function (index, element) {
            var html = '';
            html = '<div class="product-container"><div class="row">';
            if (columns == 3) {
                html += '<div class="left-block col-xs-4 col-xs-5 col-sm-12">' + $(element).find('.left-block').html() + '</div>';
                html += '<div class="center-block col-xs-4 col-xs-7 col-sm-12">';
            } else {
                html += '<div class="left-block col-xs-4 col-xs-5 col-md-4">' + $(element).find('.left-block').html() + '</div>';
                html += '<div class="center-block col-xs-4 col-xs-7 col-md-8">';
            }
            html += '<div class="product-flags">' + $(element).find('.product-flags').html() + '</div>';
            html += '<h5 itemprop="name">' + $(element).find('h5').html() + '</h5>';
            var hookReviews = $(element).find('.hook-reviews');
            if (hookReviews.length) {
                html += hookReviews.clone().wrap('<div>').parent().html();
            }
            var price = $(element).find('.content_price').html();
            if (price != null) {
                html += '<div class="content_price">' + price + '</div>';
            }
            html += '<p class="product-desc">' + $(element).find('.product-desc').html() + '</p>';
            var colorList = $(element).find('.color-list-container').html();
            if (colorList != null) {
                html += '<div class="color-list-container">' + colorList + '</div>';
            }
            var availability = $(element).find('.availability').html();
            if (availability != null) {
                html += '<span class="availability">' + availability + '</span>';
            }
            html += '</div>';
            html += '</div></div>';
            $(element).html(html);
        });
        $('.display').find('li#list').addClass('selected');
        $('.display').find('li#grid').removeAttr('class');
        listTabsAnimate('ul.product_list>li');
        $.totalStorage('display', 'list');
    } else {
        $('ul.product_list').removeClass('list').addClass('grid row');
        $('.product_list > li').removeClass('col-xs-12').addClass('col-xs-12 col-sm-' + 12 / nbItemsPerLineTablet + ' col-md-' + 12 / nbItemsPerLine);
        $('.product_list > li').each(function (index, element) {
            var html = '';
            html += '<div class="product-container">';
            html += '<div class="left-block">' + $(element).find('.left-block').html() + '</div>';
            html += '<div class="right-block">';
            html += '<div class="product-flags">' + $(element).find('.product-flags').html() + '</div>';
            html += '<h5 itemprop="name">' + $(element).find('h5').html() + '</h5>';
            var hookReviews = $(element).find('.hook-reviews');
            if (hookReviews.length) {
                html += hookReviews.clone().wrap('<div>').parent().html();
            }
            html += '<p itemprop="description" class="product-desc">' + $(element).find('.product-desc').html() + '</p>';
            var price = $(element).find('.content_price').html();
            if (price != null) {
                html += '<div class="content_price">' + price + '</div>';
            }
            var colorList = $(element).find('.color-list-container').html();
            if (colorList != null) {
                html += '<div class="color-list-container">' + colorList + '</div>';
            }
            var availability = $(element).find('.availability').html();
            if (availability != null) {
                html += '<span class="availability">' + availability + '</span>';
            }
            html += '</div>';
            html += '</div>';
            $(element).html(html);
        });
        $('.display').find('li#grid').addClass('selected');
        $('.display').find('li#list').removeAttr('class');
        listTabsAnimate('ul.product_list>li');
        $.totalStorage('display', 'grid');
    }
}
function dropDown() {
    elementClick = '#header .current';
    elementSlide = 'ul.toogle_content';
    activeClass = 'active';
    $(elementClick).on('click', function (e) {
        e.stopPropagation();
        var subUl = $(this).next(elementSlide);
        if (subUl.is(':hidden')) {
            subUl.slideDown();
            $(this).addClass(activeClass);
        } else {
            subUl.slideUp();
            $(this).removeClass(activeClass);
        }
        $(elementClick).not(this).next(elementSlide).slideUp();
        $(elementClick).not(this).removeClass(activeClass);
        e.preventDefault();
    });
    $(elementSlide).on('click', function (e) {
        e.stopPropagation();
    });
    $(document).on('click', function (e) {
        e.stopPropagation();
        if (e.which != 3) {
            var elementHide = $(elementClick).next(elementSlide);
            $(elementHide).slideUp();
            $(elementClick).removeClass('active');
        }
    });
}
function accordionFooter(status) {
    if (status == 'enable') {
        $('#footer .footer-block h4').on('click', function (e) {
            $(this).toggleClass('active').parent().find('.toggle-footer').stop().slideToggle('medium');
            e.preventDefault();
        });
        $('#footer').addClass('accordion').find('.toggle-footer').slideUp('fast');
    } else {
        $('.footer-block h4').removeClass('active').off().parent().find('.toggle-footer').removeAttr('style').slideDown('fast');
        $('#footer').removeClass('accordion');
    }
}
function accordion(status) {
    if (status == 'enable') {
        $('#right_column .block:not(#layered_block_left) .title_block, #left_column .block:not(#layered_block_left) .title_block, #left_column #newsletter_block_left h4').on('click', function () {
            $(this).toggleClass('active').parent().find('.block_content').stop().slideToggle('medium');
        })
        $('#right_column, #left_column').addClass('accordion').find('.block:not(#layered_block_left) .block_content').slideUp('fast');
        if (typeof(ajaxCart) !== 'undefined') {
            ajaxCart.collapse();
        }
    } else {
        $('#right_column .block:not(#layered_block_left) .title_block, #left_column .block:not(#layered_block_left) .title_block, #left_column #newsletter_block_left h4').removeClass('active').off().parent().find('.block_content').removeAttr('style').slideDown('fast');
        $('#left_column, #right_column').removeClass('accordion');
    }
}
function bindUniform() {
    if (!!$.prototype.uniform) {
        $('select.form-control').not('.not_uniform').uniform();
    }
}
function listBlocksAnimate(block, element, row, offset, difEffect) {
    if (!isMobile && jQuery(block).length) {
        var i = 0;
        var j = row;
        var k = 1;
        var effect = -1;
        $(element).each(function () {
            i++;
            if (i > j) {
                j += row;
                k = i;
                effect = effect * (-1);
            }
            var scene_new = new ScrollScene({
                triggerElement: element + ':nth-child(' + k + ')',
                offset: offset,
            }).setTween(ef).addTo(controller).reverse(false);
        });
    }
}
function listTabsAnimate(element) {
    if (!isMobile && jQuery(element).length) {
        TweenMax.staggerFromTo(element, 0.3, {alpha: 0, rotationY: -90, ease: Power1.easeOut}, {
            alpha: 1,
            rotationY: 0,
            ease: Power1.easeOut
        }, 0.1);
    }
}
$(window).load(function () {
    listTabsAnimate('ul.product_list:not(".tab-pane")>li');
    listBlocksAnimate('#homefeatured', '#homefeatured li', nbItemsPerLine, -300, true);
    listBlocksAnimate('#homepage-blog', '#homepage-blog li', nbItemsPerLine, -300, true);
});
function sitemapAccordion() {
    $('#sitemap #center_column ul.tree > li > ul').addClass('accordion_content').parent().find('> a').wrap('<p class="page-subheading accordion_current"></p>');
    $('#center_column .accordion_current').on('click', function () {
        $(this).toggleClass('active').parent().find('.accordion_content').stop().slideToggle('medium');
    });
    $('#center_column').addClass('accordionBox').find('.accordion_content').slideUp('fast');
    if (typeof(ajaxCart) !== 'undefined') {
        ajaxCart.collapse();
    }
}
function counter() {
    $('.count').each(function () {
        $(this).prop('Counter', 0).animate({Counter: $(this).text()}, {
            duration: 4000,
            easing: 'swing',
            step: function (now) {
                $(this).text(Math.ceil(now));
            }
        });
    });
}
function testimonialsSlider() {
    var testimonials_slider = $('#testimonials');
    testimonials_slider.bxSlider({
        responsive: true,
        useCSS: false,
        minSlides: 1,
        maxSlides: 1,
        slideWidth: 1200,
        slideMargin: 0,
        moveSlides: 1,
        pager: false,
        autoHover: false,
        speed: 500,
        pause: 3000,
        controls: true,
        autoControls: true,
        startText: '',
        stopText: '',
        prevText: '',
        nextText: ''
    });
}