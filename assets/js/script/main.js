var Starfield = (function($) {
  var container, bg;
  var windowWidth, windowHeight, windowHalfWidth, windowHalfHeight;
  var camera, scene, renderer;
  var starfield;
  var mouseX = 0, mouseY = 0;

  function initialize(element, bg) {
    container = ( typeof element == 'string') ? document.getElementById(element) : element;
    measure();
    setupCamera();
    setupScene();
    createRenderer();

    // Event listeners
    $(document).mousemove(onMouseMove);
    $(window).resize(onResize);
  }

  function measure() {
    windowWidth       = window.innerWidth;
    windowHeight      = window.innerHeight;
    windowHalfWidth   = window.innerWidth / 2;
    windowHalfHeight  = window.innerHeight / 2;
  }

  function setupCamera() {
     if ( !camera ) {
      camera = new THREE.Camera( 75, windowWidth / windowHeight, 1, 3000 );
      camera.position.z = 1000;
     }
  }

  function setupScene() {
    if ( !scene ) {
      starfield = new THREE.Object3D();
      addCelestialObjectsTo(starfield, 570, createStar);
		//addCelestialObjectsTo(starfield, 30, createRedDwarf);

      scene = new THREE.Scene();
      scene.addObject( starfield );
    }
  }

  function createRenderer() {
    if ( !renderer ) {
      renderer = new THREE.CanvasRenderer();
      renderer.setSize(windowWidth, windowHeight);
      container.appendChild(renderer.domElement);
    }
  }

  function createStar(ctx) {
    var gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
    gradient.addColorStop(0,    'rgba(255,255,255,.8)' );
    gradient.addColorStop(0.2,  'rgba(0,128,128,.6)' );
    gradient.addColorStop(0.4,  'rgba(0,0,128,.6)' );
    gradient.addColorStop(0.6,  'rgba(0,0,64,.4)' );
    gradient.addColorStop(1,    'rgba(0,0,0,0)' );

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 16, 16);
  }

  function addCelestialObjectsTo(group, max, func) {
    var celObj;
    var material = new THREE.ParticleCanvasMaterial({color: 0xffffff, program: func});

    for(var i=0; i < max; ++i) {
      celObj = new THREE.Particle(material);
      celObj.position.x = Math.random() * 2000 - 1000;
      celObj.position.y = Math.random() * 2000 - 1000;
      celObj.position.z = Math.random() * 2000 - 1000;
      celObj.scale.x = celObj.scale.y = Math.random() * 2;

      group.addChild(celObj);
    }
  }

  // ---------------------------------------------------------------------------
  // -- Event Handlers ---------------------------------------------------------
  // ---------------------------------------------------------------------------

  function onMouseMove(e) {
    mouseX = e.clientX - windowHalfWidth;
    mouseY = e.clientY - windowHalfHeight;

	// var l = $('#bg').position().left += ( mouseX - camera.position.x ) * 0.05;
    // var t = $('#bg').position().top += ( - mouseY - camera.position.y ) * 0.05;

	// TweenMax.to($('#bg'), .15, {top:t+'px',left:l+'px', ease:Quint.easeInOut});
	// $('#bg').css({
	// 	'top':t+'px',
	// 	'left':l+'px'
	// });
  }

  function onResize() {
    measure();

    if ( camera )
      camera.aspect = windowWidth / windowHeight;

    if ( renderer )
      renderer.setSize(windowWidth, windowHeight);
  }

  // ---------------------------------------------------------------------------

  function animate() {
    requestAnimationFrame( animate );
    render();
  }

  function render() {
    camera.position.x += ( mouseX - camera.position.x ) * 0.005;
    camera.position.y += ( - mouseY - camera.position.y ) * 0.005;

    starfield.rotation.x += 0.0005;
    starfield.rotation.y += 0.0002;

    renderer.render( scene, camera );
  }

  // ---------------------------------------------------------------------------

  return {
    initialize: initialize,
    startAnimation: animate
  }
})(jQuery);

// $(document).ready(function() {
//   Starfield.initialize('main');
//   Starfield.startAnimation();
// });

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
		introContent = $('#intro-content'),
		videoplayer,
		resizeTimeout;

	page.init = function(){
		floatingLayout();
		$('.hamburger').click(function(){
			toggleHamburgerContent();
		});
		
		$('.hamburger .strike').addClass('notactive');

		if($('body').hasClass('prototype')){
			//addPrototypeSwipeFunctionality();
			Starfield.initialize('layer1', 'bg');
  			Starfield.startAnimation();
			addPrototypeScrollFunctionality();
		}
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
	
	addPrototypeSwipeFunctionality = function(){
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