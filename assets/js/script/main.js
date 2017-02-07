
var PAGE = (function ($) {
	var page = {}, 
		centerpad = 0,
		body = $('#body-wrapper'),
		vcents = $('.pos-middle'), 
		hcents = $('.pos-center'),
		intro = $('#intro'),
		reveal = $('#white-reveal'),
		reveallogo = $('#logo-panel'),
		initbg = $('#bg'),
		menuOpen = false,
		vidOpen = false,
		htop = $('.hamburger .strike.top'),
		hmid = $('.hamburger .strike.mid'),
		hbot = $('.hamburger .strike.bot'),
		arPanels = [],
		resizeTimeout;

	page.init = function(){
		initFullPagePanels();
		floatingLayout();
		$('.hamburger').click(function(){
			toggleHamburgerContent();
		});
		
		$('.hamburger .strike').addClass('notactive');

		if($('body').hasClass('prototype')){
			Starfield.initialize('layer1', 'bg');
  			Starfield.startAnimation();
			addPrototypeScrollFunctionality();
		}
		$('.navlink').click(function(){
			gotoPlace($(this).data('section'));
		});
		$.stellar({horizontalScrolling: false, responsive:false, hideDistantElements: false});
		window.pageInit = true;
	};

	page.resize = function(){
		// clearTimeout(resizeTimeout);
  //   	resizeTimeout = setTimeout(function(){
  //       	$.stellar('refresh');
  //       	console.log("timeout");
  //   	}, 500);
  		floatingLayout();
		panelLayout();
	};
	page.scroll = function(){
		panelScroll($(window).scrollTop());
	};
	gotoPlace = function($elem){
		if($.browser.webkit){ //webkit browsers do not support animate-html
			$("body").stop().animate({scrollTop: $('#'+$elem).offset().top}, 2500, "easeOutExpo");
		} else {
			$("html").stop().animate({scrollTop: $('#'+$elem).offset().top}, 2500, "easeOutExpo");
		}
		console.log($elem);
	};
	addPrototypeScrollFunctionality = function(){
		$('body').mousewheel(function(event) {
			//console.log(event.deltaX, event.deltaY, event.deltaFactor);
			if(event.deltaY < 0){
				reveal.css({'top':'0'});
				reveallogo.addClass('revealed');
				initbg.addClass('revealed');
			}else{
				reveal.css({'top':'100%'});
				reveallogo.removeClass('revealed');
				initbg.removeClass('revealed');
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

	initFullPagePanels = function(){
		$('.sr-panel').each(function(){
			arPanels.push(new SRPanel($(this)));
		});
	};
	
	panelLayout = function(){
		for(var i in arPanels){
			arPanels[i].resize();
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
		return $(document).height()/2 - (el.innerHeight()/2 + $('#nav').innerHeight() + centerpad);
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
	$(window).scroll(function() {
		//console.log($(window).scrollTop());
		PAGE.scroll();
	});
	window.addEventListener("orientationchange", function() {
		PAGE.resize();
	}, false);
});
