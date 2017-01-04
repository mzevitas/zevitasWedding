var PAGE = (function ($) {
	var page = {}, 
		centerpad = 0,
		body = $('#body-wrapper'),
		vcents = $('.pos-middle'), 
		ss = $('#slideshow'),
		intro = $('#intro'),
		video = $('#video'),
		menuOpen = false,
		vidOpen = false,
		htop = $('.hamburger .strike.top'),
		hmid = $('.hamburger .strike.mid'),
		hbot = $('.hamburger .strike.bot'),
		introContent = $('#intro-content'),
		videoplayer,
		resizeTimeout;

	page.init = function(){
		floatingLayout();
		initVideo();
		ss.find('img').load(function(){
			floatingLayout();
		});
		$('.hamburger').click(function(){
			toggleHamburgerContent();
		});
		$('.exit').click(function(){
			closeVideo();
		});
		ss.click(function(){
			openVideo();
		});
		$('.hamburger .strike').addClass('notactive');
		window.pageInit = true;
	};

	page.resize = function(){
		// clearTimeout(resizeTimeout);
  //   	resizeTimeout = setTimeout(function(){
  //       	$.stellar('refresh');
  //       	console.log("timeout");
  //   	}, 500);
  		floatingLayout();
	};

	initVideo = function(){
		videoplayer = videojs('my-player', {}, function onPlayerReady() {
		  videojs.log('Your player is ready!');

		  this.on('ended', function() {
		  	closeVideo();
		    //videojs.log('Awww...over so soon?!');
		  });
		});
	};
	openVideo = function(){
		vidOpen = true;
		videoplayer.currentTime(0);
		video.css({'display':'block'});
		floatingLayout();
		TweenMax.to(video, 4, {opacity:'1', ease:Quint.easeInOut});
		videoplayer.play();
	};

	closeVideo = function(){
		videoplayer.pause();
		TweenMax.to(video, 1, {opacity:'0', ease:Quint.easeInOut, onComplete:function(){
			video.css({'display':'none'});
			vidOpen=false;
		}});
	};

	openIntro = function(){
		if(vidOpen) closeVideo();
		hideSS();
		body.addClass('intro-opened');
		introContent.css({
			'display':'inline-block'
		});
		var h = introContent.innerHeight();

		TweenMax.to(intro, .75, {height:h+'px',top:getCenterPos(introContent)+'px', ease:Quint.easeInOut, delay:0.65});
		TweenMax.to(introContent, .35, {opacity:'1', ease:Quint.easeInOut, delay:1});
	};
	closeIntro = function(){
		TweenMax.to(introContent, .35, {opacity:'0', ease:Quint.easeInOut});
		TweenMax.to(intro, .65, {height:ss.height()+'px',top:getCenterPos(ss)+'px', ease:Quint.easeInOut, delay:0.35, onComplete:function(){
			introContent.css({
				'display':'none'
			});
			body.removeClass('intro-opened');
			showSS();
		}});
	};
	hideSS = function(){
		TweenMax.to(ss, .45, {opacity:0, onComplete:function(){
			ss.css({'display':'none'});
		}});
	};
	showSS = function(){
		floatingLayout();
		ss.css({'display':'block'});
		TweenMax.to(ss, .45, {opacity:1});
	};
	hamburgerOpen = function(){
		$('.hamburger .strike').removeClass('notactive');
		TweenMax.to(htop, .65, {top:'7px',background:'#fff', ease:Quint.easeInOut});
		TweenMax.to(hbot, .65, {top:'7px', background:'#fff',ease:Quint.easeInOut, onComplete:function(){
			hmid.css({'display':'none'});
			htop.addClass('cross');
			hbot.addClass('cross');
			menuOpen = true;
		}});
	};
	hamburgerClose = function(){
		hmid.removeAttr('style');
		htop.removeClass('cross');
		hbot.removeClass('cross');
		TweenMax.to(hmid, 0, {'background':'#fff', delay:0.35});
		TweenMax.to(htop, .65, {top:'0px', ease:Quint.easeInOut, delay:0.35});
		TweenMax.to(hbot, .65, {top:'14px', ease:Quint.easeInOut, delay:0.35, onComplete:function(){
			menuOpen = false;
			TweenMax.to(hmid, .35, {'background':'#000', delay:0.35});
			TweenMax.to(htop, .35, {'background':'#000', delay:0.35});
			TweenMax.to(hbot, .35, {'background':'#000', delay:0.35, onComplete: function(){
				//htop.removeAttr('style');
				//hbot.removeAttr('style');
				$('.hamburger .strike').removeAttr('style').addClass('notactive');
				
			}});

		}});
	};

	toggleHamburgerContent = function(){
		if(menuOpen){
			hamburgerClose();
			closeIntro();
		}else{
			hamburgerOpen();
			openIntro();
		}
	};

	floatingLayout = function(){
		var h = menuOpen ? introContent.innerHeight() : ss.height();
		intro.css({
			height:h+'px'
		});
		vcents.each(function(){
			$(this).css({
				top:getCenterPos($(this))+'px',
				'max-height':getMaxHeight($(this).attr('id'))+'px'
			});
		});
	};
	getCenterPos = function(el){
		return $(document).height()/2 - (el.innerHeight()/2 + $('#nav').innerHeight() + centerpad);
	};
	getMaxHeight = function(id){
		var subt = id == 'video' ? 140 : 40;
		return $(document).height() - ($('#nav').innerHeight() + subt);
	};
	return page;
}(jQuery));

$(document).ready(function() {
	//init page content
	PAGE.init();
	//on window resize handling
	$(window).resize(function() {
	  	PAGE.resize();
	});
	window.addEventListener("orientationchange", function() {
		PAGE.resize();
	}, false);
});