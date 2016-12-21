(function () {
	var homeslider_loop = 1,
		homeslider_pause = 3000,
		homeslider_speed = 500,
		homeslider_width = 10000
		;

	$(function () {
		if (typeof(homeslider_speed) == 'undefined') {
			homeslider_speed = 500;
		}
		if (typeof(homeslider_pause) == 'undefined') {
			homeslider_pause = 3000;
		}
		if (typeof(homeslider_loop) == 'undefined') {
			homeslider_loop = true;
		}
		if (typeof(homeslider_width) == 'undefined') {
			homeslider_width = 10000;
		}

		var tl = new TimelineMax();
		if (!!$.prototype.bxSlider) {
			$('#homeslider').bxSlider({
				mode: 'fade',
				useCSS: false,
				maxSlides: 1,
				slideWidth: homeslider_width,
				infiniteLoop: homeslider_loop,
				hideControlOnEnd: true,
				pager: false,
				autoHover: true,
				autoControls: false,
				auto: homeslider_loop,
				speed: parseInt(homeslider_speed),
				pause: homeslider_pause,
				controls: true,
				startText: '',
				stopText: '',
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
		$('.homeslider-description').click(function () {
			window.location.href = $(this).prev('a').prop('href');
		});
	});
}());
