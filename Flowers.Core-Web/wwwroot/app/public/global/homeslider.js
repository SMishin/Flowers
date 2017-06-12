import '../../../_libs/jquery.bxslider/jquery.bxslider'
import './19-TweenMax.min'

(function () {
	let homeslider_pause = 3000,
		homeslider_speed = 500,
		homeslider_width = 10000
		;

	$(function () {

		let tl = new TimelineMax();
		if (!!$.prototype.bxSlider) {
			$('#homeslider').bxSlider({
				mode: 'fade',
				useCSS: false,
				maxSlides: 1,
				slideWidth: homeslider_width,
				infiniteLoop: true,
				auto: true,
				hideControlOnEnd: true,
				pager: false,
				autoHover: true,
				speed: homeslider_speed,
				pause: homeslider_pause,
				nextText: '',
				prevText: '',
				onSliderLoad: function () {
					tl.play()
				},
				onSlideBefore: function () {
					tl.restart()
				},
				onSlideAfter: function () {
				}
			});
		}
		// $('.homeslider-description').click(function () {
		// 	window.location.href = $(this).prev('a').prop('href');
		// });
	});
}());
