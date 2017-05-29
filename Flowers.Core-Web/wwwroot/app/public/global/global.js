import './16-jquery.scrollmagic'
import $ from '../../../_libs/jquery-1.11.0.min';

let jQuery = $;

var responsiveflag = false;
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);

$(document).ready(function () {
	new ScrollMagic();
	// highdpiInit();
	responsiveResize();
	$(window).resize(responsiveResize);

	blockHover();
	dropDown();
	sitemapAccordion();
	counter();

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
		let $this = $(this),
			top = $('#toTop'),
			st = $this.scrollTop()
		;

		if (st < 500) {
			top.fadeOut();
		} else {
			top.stop(true, true).fadeIn();
		}
	});
});

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
	scrollCompensate();
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

function dropDown() {
	let elementClick = '#header .current',
		elementSlide = 'ul.toogle_content',
		activeClass = 'active'
	;

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
