
var PAGE = (function ($) {
	var page = {}, 
		body = $('#body-wrapper'),
		vcents = $('.pos-middle'), 
		hcents = $('.pos-center'),
		introSection = $('#introSection'),
		initLogo = $('#revealLogo'),
		openLogoWrapper = $('#openLogo'),
		infoLogo = $('#infoLogo'),
		curScroll = 0,
		menuOpen = false,
		htop = $('.hamburger .strike.top'),
		hmid = $('.hamburger .strike.mid'),
		hbot = $('.hamburger .strike.bot'),
		mobileNav = $('#mobileNav'),
		arPanels = [],
		scrollDirection = 'down',
		scrollAnimating = false,
		starfield,
		nscrollbar = false,
		hasTouch = true,
		resizeTimeout;

	page.init = function($hasTouch){
		nscrollbar = $("html").niceScroll({
			cursorwidth:6,
			cursorcolor:"#181818",
			cursoropacitymin:.5,
			background:"#cccccc",
			cursorborder: "0px solid #fff",
			cursorborderradius: "3px"
		});
		hasTouch = $hasTouch;
		floatingLayout();
		initFullPagePanels();
		$('.hamburger').click(function(){
			//toggleHamburgerContent();
			mobileNavToggle();
		});
		
		$('.hamburger .strike').addClass('notactive');
		$(window).load(function(){
			starfield = new SRStarfield($('#bg'));
		});
		$('.navlink').click(function(){
			gotoPlace($(this).data('section'), 2500);
		});
		$.stellar({horizontalScrolling: false, responsive:false, hideDistantElements: false});

		animateLogo($(window).scrollTop()/$(window).height());
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
		var scrollpos = $(window).scrollTop();
		if(curScroll<scrollpos){
			scrollDirection = 'down';
		}else{
			scrollDirection = 'up';
		}
		curScroll = scrollpos;

		var bot = $(window).height();
		if(scrollpos <= (bot*2)){
			var pctOpen = scrollpos/bot;
			animateLogo(pctOpen);
			animateStarField(pctOpen);
		}
		//console.log('SCROLL scrollDirection = '+scrollDirection);
		panelScroll(curScroll);
	};
	gotoPlace = function($elem, $time){
		closeMobileNav();
		nscrollbar.doScrollTop($('#'+$elem).offset().top, $time);
	};
	addScrollLockFunctionality = function(){
		$('body').mousewheel(function(event) {
			if(event.deltaY < 0){
				scrollDirection = 'down';
			}else{
				scrollDirection = 'up';
			}
			console.log('MOUSE WHEEL scrollDirection = '+scrollDirection);
		});
	};

	mobileNavToggle = function(){
		if(!mobileNav.hasClass('open')){
		// $('html, body').css({
		//     overflow: 'hidden',
		//     height: '100%'
		// });
			mobileNav.addClass('open');
			mobileNav.stop().animate({
				opacity: 1
			}, 300);
		}else{
			closeMobileNav();
		
		// $('html, body').css({
		//     overflow: 'auto',
		//     height: 'auto'
		// });
		}
	};
	closeMobileNav = function(){
		mobileNav.stop().animate({
			opacity: 0
		}, 300, function() {
			// Animation complete.
			mobileNav.removeClass('open');
		});
	};
	hamburgerOpen = function(){
		mobileNav.show();
		menuOpen = true;
		// $('.hamburger .strike').removeClass('notactive');

		// TweenMax.to(htop, .65, {top:'7px', ease:Quint.easeInOut});
		// TweenMax.to(hbot, .65, {top:'7px',ease:Quint.easeInOut, onComplete:function(){
		// 	hmid.css({'display':'none'});
		// 	htop.addClass('cross');
		// 	hbot.addClass('cross');
		// 	menuOpen = true;
		// }});
	};
	hamburgerClose = function(){
		mobileNav.hide();
		menuOpen = false;
		// htop.removeClass('cross');
		// hbot.removeClass('cross');
		// TweenMax.to(hmid, 0, {'display':'block', delay:0.35});
		// TweenMax.to(htop, .65, {top:'0px', ease:Quint.easeInOut, delay:0.35});
		// TweenMax.to(hbot, .65, {top:'14px', ease:Quint.easeInOut, delay:0.35, onComplete:function(){
		// 	menuOpen = false;
		// 	TweenMax.to(hmid, .35, {'background':'#000', delay:0.35});
		// 	TweenMax.to(htop, .35, {'background':'#000', delay:0.35});
		// 	TweenMax.to(hbot, .35, {'background':'#000', delay:0.35, onComplete: function(){
		// 		$('.hamburger .strike').removeAttr('style').addClass('notactive');
		// 	}});

		// }});
	};

	toggleHamburgerContent = function(){
		if(menuOpen){
			hamburgerClose();
		}else{
			hamburgerOpen();
		}
	};
	animateStarField = function($pct){
		if(starfield) starfield.animateOut($pct);
	};
	animateLogo = function($pct){
		//console.log('pct = '+$pct);
		if($pct >= 1){
			if(!openLogoWrapper.hasClass('revealed')) openLogoWrapper.addClass('revealed');
			if(!infoLogo.hasClass('revealed')) infoLogo.addClass('revealed');
		}else{
			if(openLogoWrapper.hasClass('revealed')) openLogoWrapper.removeClass('revealed');
			if(infoLogo.hasClass('revealed')) infoLogo.removeClass('revealed');
			initLogo.css({'opacity':1-$pct});
		}
	};
	initFullPagePanels = function(){
		$('.sr-panel').each(function(){
			var panel = $(this);
			if(!hasTouch){
				panel.bind("atPanelThreshold",function(e, panelId){
					if(scrollDirection == 'down'){
						gotoPlace(panelId, 500);
					}
				});
			}
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
		introSection.css({
			'margin-top':initLogo.css('top')
		});
	};
	getCenterPos = function(el){
		return $(window).height()/2 - (el.innerHeight()/2);
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
	//init page content
	PAGE.init(Modernizr.touchevents);
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
