export default function scrollTo(element, to, duration) {

	if (duration <= 0) {
		window.scrollTo(0, 0);
		return;
	}

	let difference = to - element.scrollTop,
		perTick = difference / duration * 10;

	setTimeout(function () {
		element.scrollTop = element.scrollTop + perTick;

		if (element.scrollTop === to) {
			return;
		}

		scrollTo(element, to, duration);

	}, 0);
}