
var PAGE = (function ($) {
	var page = {}, 
		body = $('#body-wrapper'),
		vcents = $('.pos-middle'), 
		hcents = $('.pos-center'),
		logoInit = $('#revealLogo'),
		logoRevealed = $('#revealedLogo'),
		menuOpen = false,
		htop = $('.hamburger .strike.top'),
		hmid = $('.hamburger .strike.mid'),
		hbot = $('.hamburger .strike.bot'),
		arPanels = [],
		scrollDirection = 'down',
		scrollAnimating = false,
		starfield,
		nscrollbar = false,
		resizeTimeout;

	page.init = function(){
		nscrollbar = $("html").niceScroll({
			cursorwidth:6,
			cursorcolor:"#181818",
			cursoropacitymin:.5,
			background:"#cccccc",
			cursorborder: "0px solid #fff",
			cursorborderradius: "3px"
		});

		initFullPagePanels();
		floatingLayout();
		addScrollLockFunctionality();
		$('.hamburger').click(function(){
			toggleHamburgerContent();
		});
		
		$('.hamburger .strike').addClass('notactive');
		$(window).load(function(){
			starfield = new SRStarfield($('#bg'));
		});
		$('.navlink').click(function(){
			gotoPlace($(this).data('section'), 2500);
		});
		$.stellar({horizontalScrolling: false, responsive:false, hideDistantElements: false});
		window.pageInit = true;
	};

	page.resize = function(){
		// clearTimeout(resizeTimeout);
    	// resizeTimeout = setTimeout(function(){
        // 	$.stellar('refresh');
        // 	console.log("timeout");
    	// }, 500);
  		
  		floatingLayout();
		panelLayout();
		if(starfield) starfield.resize($(window).width(), $(window).height());
	};
	page.scroll = function(){
		panelScroll($(window).scrollTop());
	};
	gotoPlace = function($elem, $time){
		nscrollbar.doScrollTop($('#'+$elem).offset().top, $time);
	};
	addScrollLockFunctionality = function(){
		$('body').mousewheel(function(event) {
			//console.log(event.deltaX, event.deltaY, event.deltaFactor);
			if(event.deltaY < 0){
				scrollDirection = 'down';
				// reveal.css({'top':'0'});
				// reveallogo.addClass('revealed');
				// initbg.addClass('revealed');
			}else{
				scrollDirection = 'up';
				// reveal.css({'top':'100%'});
				// reveallogo.removeClass('revealed');
				// initbg.removeClass('revealed');
			}
		});
	};

	hamburgerOpen = function(){
		$('.hamburger .strike').removeClass('notactive');
		TweenMax.to(htop, .65, {top:'7px', ease:Quint.easeInOut});
		TweenMax.to(hbot, .65, {top:'7px',ease:Quint.easeInOut, onComplete:function(){
			hmid.css({'display':'none'});
			htop.addClass('cross');
			hbot.addClass('cross');
			menuOpen = true;
		}});
	};
	hamburgerClose = function(){
		htop.removeClass('cross');
		hbot.removeClass('cross');
		TweenMax.to(hmid, 0, {'display':'block', delay:0.35});
		TweenMax.to(htop, .65, {top:'0px', ease:Quint.easeInOut, delay:0.35});
		TweenMax.to(hbot, .65, {top:'14px', ease:Quint.easeInOut, delay:0.35, onComplete:function(){
			menuOpen = false;
			TweenMax.to(hmid, .35, {'background':'#000', delay:0.35});
			TweenMax.to(htop, .35, {'background':'#000', delay:0.35});
			TweenMax.to(hbot, .35, {'background':'#000', delay:0.35, onComplete: function(){
				$('.hamburger .strike').removeAttr('style').addClass('notactive');
			}});

		}});
	};

	toggleHamburgerContent = function(){
		if(menuOpen){
			hamburgerClose();
		}else{
			hamburgerOpen();
		}
	};
	animateLogo = function($pct){
		console.log('pct = '+$pct);
		if($pct < 1 && $pct > 0){
			//logoRevealed.removeClass('revealed');
			//logoInit.addClass('revealed');
			//logoInit.css()
		}else{
			if($pct == 0){
				logoRevealed.addClass('revealed');
				logoInit.removeClass('revealed');
			}else if($pct == 1){
				logoRevealed.removeClass('revealed');
				logoInit.addClass('revealed');
			}
			//logoRevealed.addClass('revealed');
			//logoInit.removeClass('revealed');
		}
	};
	initFullPagePanels = function(){
		$('.sr-panel').each(function(){
			var panel = $(this);
			panel.bind("atPanelThreshold",function(e, panelId){
				if(scrollDirection == 'down'){
					gotoPlace(panelId, 500);
				}
			});
			panel.bind("onOpenReveal",function(e, pct){
				animateLogo(pct);
			});
			var p = new SRPanel(panel);
			arPanels.push(p);
			p.init($(window).height());
		});
	};
	
	panelLayout = function(){
		for(var i in arPanels){
			arPanels[i].resize($(window).height());
		}
	};
	panelScroll = function($scrollpos){
		for(var i in arPanels){
			arPanels[i].scroll($scrollpos);
		}
	};

	floatingLayout = function(){
		vcents.each(function(){
			$(this).css({
				top:getCenterPos($(this))+'px',
				'max-height':getMaxHeight($(this).attr('id'))+'px'
			});
		});
		hcents.each(function(){
			$(this).css({
				left:getMiddlePos($(this))+'px'
			});
		});
	};
	getCenterPos = function(el){
		return el.parent().height()/2 - (el.innerHeight()/2);
	};
	getMiddlePos = function(el){
		return $(document).width()/2 - (el.innerWidth()/2);
	};
	getMaxHeight = function(id){
		var subt = id == 'video' ? 140 : 40;
		return $(document).height() - ($('#nav').innerHeight() + subt);
	};
	return page;
}(jQuery));


$(document).ready(function() {
	// $("html").niceScroll({
	// 	cursorwidth:6,
	// 	cursorcolor:"#181818",
	// 	cursoropacitymin:.5,
	// 	background:"#cccccc",
	// 	cursorborder: "0px solid #fff",
    // 	cursorborderradius: "3px"
	// });
	//init page content
	PAGE.init();
	//on window resize handling
	$(window).resize(function() {
	  	PAGE.resize();
	});
	$(window).scroll(function() {
		PAGE.scroll();
	});
	window.addEventListener("orientationchange", function() {
		PAGE.resize();
	}, false);
});
