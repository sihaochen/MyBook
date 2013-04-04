$(document).ready(function() {

	$('.full-width-slider').iosSlider({
		desktopClickDrag : true,
		snapToChildren : true,
		infiniteSlider : false,
		startAtSlide : 1,
		navNextSelector : $('.full-width-slider .next'),
		navPrevSelector : $('.full-width-slider .prev'),
		onSlideComplete : recorder
	});

});
