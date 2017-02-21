
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
		curPanel = 'open',
		menuOpen = false,
		htop = $('.hamburger .strike.top'),
		hmid = $('.hamburger .strike.mid'),
		hbot = $('.hamburger .strike.bot'),
		mobileNav = $('#mobileNav'),
		deskNav = $('#deskNav'),
		arPanels = [],
		scrollDirection = 'down',
		scrollAnimating = false,
		starfield,
		nscrollbar = false,
		hasTouch = true,
		resizeTimeout;

	page.init = function($hasTouch){
		hasTouch = $hasTouch;
		nscrollbar = $("html").niceScroll({
			cursorwidth:6,
			cursorcolor:"#181818",
			cursoropacitymin:.5,
			background:"#cccccc",
			cursorborder: "0px solid #fff",
			cursorborderradius: "3px",
			smoothscroll: true
		});
		// nscrollbar.onscrollend = function(){
		// 	console.log('onscrollend');
		// };
		initFullPagePanels();
		initNav();
		
		var self=this;
		$.stellar({horizontalScrolling: false, responsive:false, hideDistantElements: false});
		$(window).load(function(){
			starfield = new SRStarfield($('#bg'), $hasTouch);
			panelLayout();
			animateLogo($(window).scrollTop()/$(window).height());
			starfield.resize($(window).width(), $(window).height());
			nscrollbar.resize();
		});
		
		this.resize();
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
		animateLogo($(window).scrollTop()/$(window).height());
		if(starfield) starfield.resize($(window).width(), $(window).height());
		nscrollbar.resize();
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
	initNav = function(){
		$('.hamburger').click(function(){
			//toggleHamburgerContent();
			mobileNavToggle();
		});
		
		$('.hamburger .strike').addClass('notactive');
		$('.navlink').click(function(){
			gotoPlace($(this).data('section'), 2500);
		});
	};
	gotoPlace = function($elem, $time){
		var place = $('#'+$elem);
		//console.log('gotoPlace = '+place.attr('id'));
		//if(place.attr('id') == curPanel) return;
		closeMobileNav();
		nscrollbar.doScrollTop(place.offset().top, $time);
		updateNav(place.attr('id'));
	};
	updateNav = function(panelId){
		//console.log('updateNav = '+panelId);
		if(panelId == curPanel) return;
		deskNav.removeClass(curPanel);
		deskNav.find('a').removeClass('active');
		curPanel = panelId;
		deskNav.addClass(curPanel);
		deskNav.find('a[data-section='+curPanel+']').addClass('active');
	};
	addScrollLockFunctionality = function(){
		$('body').mousewheel(function(event) {
			if(event.deltaY < 0){
				scrollDirection = 'down';
			}else{
				scrollDirection = 'up';
			}
			//console.log('MOUSE WHEEL scrollDirection = '+scrollDirection);
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
			//if(!hasTouch){
				panel.bind("atPanelThreshold",function(e, panelId){
					if(scrollDirection == 'down' && !nscrollbar.scrollrunning){
						gotoPlace(panelId, 300);
					}
				});
				panel.bind("atPanelThresholdTop",function(e, panelId){
					if(scrollDirection == 'up' && !nscrollbar.scrollrunning){
						gotoPlace(panelId, 400);
					}
				});
				panel.bind("withinPanelBounds",function(e, panelId){
					//if(curPanel == panelId) return;
					//curPanel = panelId;
					updateNav(panelId);
				});
			//}
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
				top:getCenterPos($(this))+'px'
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
		// var winh = $(window).height();
		// var winw = $(window).width();
		// if(el.hasClass('portrait-only')){
		// 	if(winw/winh <= 1.25){
		// 		console.log('aspect ratio is in zone?');
		// 	}
		// }
		var pos = $(window).height()/2 - (el.innerHeight()/2);
		return pos > 100 ? pos : 100;
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
	$(window).bind('scroll mousewheel', function(){
		PAGE.scroll();
	});
	// $(window).scroll(function() {
	// 	PAGE.scroll();
	// });
	window.addEventListener("orientationchange", function() {
		PAGE.resize();
	}, false);
});
