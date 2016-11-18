var PAGE = (function ($) {
	// module code here
	var page = {}, resizeTimeout;

	page.init = function(){
		$.stellar({horizontalScrolling: false, responsive:false});
		$('.thoughtleaders-panel .panel-profile').each(function(){
			var el = $(this);
			var im = el.find('.profile-pic img');
			$(this).hover(function(){
				im.addClass('hilite');
			},function(){
				im.removeClass('hilite');
			})
		});
		window.pageInit = true;
	};

	page.resize = function(){
		clearTimeout(resizeTimeout);
    	resizeTimeout = setTimeout(function(){
        	$.stellar('refresh');
        	console.log("timeout");
    	}, 500);
	};
	return page;
}(jQuery));

$(document).ready(function() {
	$("html").niceScroll({
		cursorwidth:6,
		cursorcolor:"#181818",
		cursoropacitymin:.5,
		background:"#cccccc",
		cursorborder: "0px solid #fff",
    	cursorborderradius: "3px"
	});
	//init page content
	PAGE.init();
	
	//on window resize handling
	$(window).resize(function() {
	  	PAGE.resize();
	});
});