import $ from '../../../_libs/jquery-1.11.0.min';

$.fn.tmStickUp = function (options) {

	var getOptions = {
		correctionSelector: $('.correctionSelector')
	};

	$.extend(getOptions, options);
	var _this = $(this),
		_window = $(window),
		_document = $(document),
		thisOffsetTop = 0,
		thisOuterHeight = 0,
		thisMarginTop = 0,
		documentScroll = 0,
		lastScrollValue = 0,
		scrollDir = '',
		tmpScrolled;

	function init() {
		thisOffsetTop = parseInt(_this.offset().top);
		thisMarginTop = parseInt(_this.css('margin-top'));
		thisOuterHeight = parseInt(_this.outerHeight(true));
		addEventsFunction();
	}

	function addEventsFunction() {
		_document.on('scroll', function () {
			tmpScrolled = $(this).scrollTop();
			if (tmpScrolled > lastScrollValue) {
				scrollDir = 'down';
			} else {
				scrollDir = 'up';
			}
			lastScrollValue = tmpScrolled;
			let correctionValue = getOptions.correctionSelector.outerHeight(true);
			documentScroll = parseInt(_window.scrollTop());
			if (thisOffsetTop - correctionValue < documentScroll) {
				_this.addClass('isStuck');
				_this.css({
					position: 'fixed',
					top: correctionValue
				});

			} else {
				_this.removeClass('isStuck');
				_this.css({
					position: 'relative',
					top: 0
				});

			}
		}).trigger('scroll');
	}

	init();
}

var responsiveflagTMMenu = false,
	TmCategoryMenu = $('ul.menu'),
	TmCategoryGrover = $('.top_menu .menu-title')
;

function menuChange(status) {
	status === 'enable' ? TmmobileInit() : TmdesktopInit();
}

function responsiveTmMenu() {
	if ($(document).width() <= 767 && responsiveflagTMMenu === false) {
		menuChange('enable');
		responsiveflagTMMenu = true;
	} else if ($(document).width() >= 768) {
		menuChange('disable');
		responsiveflagTMMenu = false;
	}
}

function TmdesktopInit() {
	TmCategoryGrover.off();
	TmCategoryGrover.removeClass('active');
	$('.menu > li > ul, .menu > li > ul.is-simplemenu ul, .menu > li > div.is-megamenu')
		.removeClass('menu-mobile').parent().find('.menu-mobile-grover').remove();
	$('.menu').removeAttr('style');
	TmCategoryMenu.superfish('init');
	$('.menu > li > ul').addClass('submenu-container clearfix');
}

function TmmobileInit() {
	var TmclickEventType = ((document.ontouchstart !== null) ? 'click' : 'touchstart');
	TmCategoryMenu.superfish('destroy');
	$('.menu').removeAttr('style');
	TmCategoryGrover.on(TmclickEventType, function (e) {
		$(this).toggleClass('active').parent().find('ul.menu').stop().slideToggle('medium');
		return false;
	});
	$('.menu > li > ul, .menu > li > div.is-megamenu, .menu > li > ul.is-simplemenu ul')
		.addClass('menu-mobile clearfix').parent().prepend('<span class="menu-mobile-grover"></span>');
	$('.menu .menu-mobile-grover').on(TmclickEventType, function (e) {
		var catSubUl = $(this).next().next('.menu-mobile');
		if (catSubUl.is(':hidden')) {
			catSubUl.slideDown();
			$(this).addClass('active');
		} else {
			catSubUl.slideUp();
			$(this).removeClass('active');
		}
		return false;
	});
	$('.top_menu > ul:first > li > a, .block_content > ul:first > li > a').on(TmclickEventType, function (e) {
		var parentOffset = $(this).prev().offset();
		var relX = parentOffset.left - e.pageX;
		if ($(this).parent('li').find('ul').length && relX >= 0 && relX <= 20) {
			e.preventDefault();
			var mobCatSubUl = $(this).next('.menu-mobile');
			var mobMenuGrover = $(this).prev();
			if (mobCatSubUl.is(':hidden')) {
				mobCatSubUl.slideDown();
				mobMenuGrover.addClass('active');
			} else {
				mobCatSubUl.slideUp();
				mobMenuGrover.removeClass('active');
			}
		}
	});
}

$(document).ready(function () {
	responsiveTmMenu();
	$(window).resize(responsiveTmMenu);

	if ($('.top_menu').length > 0) {

		let $body = $('body');

		if ($body.find('.container').width() > 780) {
			$body.find('.top_menu').wrapInner('<div class="stickUpTop"><div class="stickUpHolder container">');
			$('.stickUpTop').tmStickUp();
		}
	}
});


