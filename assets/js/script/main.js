$(document).ready(function() {
	// var doc = document.documentElement;
	// doc.setAttribute('data-useragent', navigator.userAgent);

	// /*Mobile specific handling*/
	// var onMobile = false;
	// var isTouchDevice = ('ontouchstart' in window) || ('onmsgesturechange' in window);
	// if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
 // 		onMobile=true;
 // 		$('body').addClass('mobile');
	// }else{
	// 	$('body').addClass('non-touch');
	// 	//init fancy scroll
	// 	$("html").niceScroll({
	// 		cursorwidth:14,
	// 		cursorcolor:"#8d0b56",
	// 		cursoropacitymin:.5,
	// 		background:"#cccccc",
	// 		cursorborder: "0px solid #fff", // css definition for cursor border
	//     	cursorborderradius: "8px" // border radius in pixel for cursor
	// 	});
	// }

	$("html").niceScroll({
			cursorwidth:6,
			cursorcolor:"#181818",
			cursoropacitymin:.5,
			background:"#cccccc",
			cursorborder: "0px solid #fff", // css definition for cursor border
	    	cursorborderradius: "3px" // border radius in pixel for cursor
		});

	//init page content
	//PAGE.init(onMobile);
	// if(!onMobile){
	 	$.stellar({horizontalScrolling: false, responsive:true});
	// }
	//on window resize handling
	// $(window).resize(function() {
	//   PAGE.resize();
	// });
	// $(window).scroll(function(){
	// 	PAGE.scroll();
	// });
	// $(window).load(function() {
	// 	//trigger resize after images have loaded so vertical centers are calculated correctly
	// 	PAGE.resize();
	// });

	$('.thoughtleaders-panel .panel-profile').each(function(){
		var el = $(this);
		var im = el.find('.profile-pic img');//parents('.panel-profile').
		$(this).hover(function(){
			console.log('over');
			im.addClass('hilite');
		},function(){
			console.log('out');
			im.removeClass('hilite');
		})
	});
});