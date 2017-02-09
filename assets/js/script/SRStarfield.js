
//SRStarfield "class"

(function (window, $) {
	//public variables
	//SRStarfield.prototype.var_name = "";

	//static variables
	SRStarfield.STATIC_VAR = "";

	//constructor function
	function SRStarfield($root){
		//private variables
		var _root = $root;
        var _imgsrc = $('#starBg');
        var UTILS = new utils();
        var mouseX = 0, mouseY = 0;
		var stopMouseMove = false;
        //config vars
		var debug = false,
			wrapper = document.getElementById(_root.attr('id')),
			width = 1900;//$(window).width(),
			height = 1020;//$(window).height(),
			aspectRatio = width/height,
			viewportWidth = width,
			viewportHeight = width / aspectRatio,
			cameraX = 0,
			cameraY = 0,
			cameraZ = 1100;
            
        //3d scene vars
		var scene, 
			camera, 
			renderer,
            starfieldGeom,
            starSystem,
            starfieldAmount = 5000,
            starfieldRadius = width * .4,
			mousetracker = new THREE.Vector2(),
			raycaster = new THREE.Raycaster(),
			cameraTween;

		//public functions
		this.init = function(){
            setupSceneBase();
            addListeners();
            addSceneElements();
            if(debug){
                //add axes
                axes = UTILS.buildAxes(1000);
                scene.add(axes);
                //add camera helper
                UTILS.addCameraHelper(camera, scene);
            }
            onFrame();
		};
        this.resize = function(w,h){
            // width = w;
			// height = h;
            // renderer.setSize(width, height);
            // render();
        };
		this.animateOut = function($pct){
			if($pct > 0){
				stopMouseMove = true;
			}else{
				stopMouseMove = false;
			}
			var npos = 300 * $pct;
			var nZ = cameraZ - (300 * $pct);
			//console.log('npos = '+npos);
			cameraTween = new TWEEN.Tween(camera.position)
	    		.to({y:npos, z:nZ}, 0)
	    		.start();
		};
		//private functions
		function setupSceneBase(){
			scene = new THREE.Scene();
			camera = new THREE.PerspectiveCamera(45, aspectRatio, 100, 2000);
			//var vFOV = 45 * (Math.PI / 180), // convert VERTICAL fov to radians
			//cameraZ = window.innerHeight / (2 * Math.tan(vFOV / 2) );
			camera.position.z = cameraZ;
			camera.position.x = cameraX;
			camera.position.y = cameraY;
			camera.lookAt({x:0, y:0, z:0});

			renderer = new THREE.WebGLRenderer({alpha:true, antialias:true});
			renderer.shadowMap.enabled = true;
			renderer.shadowMapSoft = true;
			renderer.setSize(viewportWidth, viewportHeight);
			wrapper.appendChild(renderer.domElement);
		}
        function addListeners(){
            $(document).mousemove(onMouseMove);
		}
        function createBackground(){
            var w = viewportWidth;
            var h = viewportHeight;
            var cnvs = document.createElement('canvas');
			cnvs.width = w;
			cnvs.height = h;
			var cntxt = cnvs.getContext('2d');
		    cntxt.drawImage(_imgsrc[0], 0,0, _imgsrc.width(), _imgsrc.height(), 0, 0, w, h);
            var starBgTexture = new THREE.Texture(cnvs);
            starBgTexture.minFilter = THREE.LinearFilter
			starBgTexture.needsUpdate = true;
            var starBgMaterial = new THREE.MeshPhongMaterial({map:starBgTexture});
            var starBgPlane = new THREE.Mesh(new THREE.PlaneGeometry(w, h), starBgMaterial);
            scene.add(starBgPlane);
        }

        function createStarField(){
            var uniforms = {
				color:     { value: new THREE.Color( 0xffffff ) },
				texture:   { value: new THREE.TextureLoader().load( "assets/images/sprites/star2.png" ) }
			};
            var shaderMaterial = new THREE.ShaderMaterial( {
				uniforms:       uniforms,
				vertexShader:   document.getElementById( 'vertexshader' ).textContent,
				fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
				blending:       THREE.AdditiveBlending,
				depthTest:      false,
				transparent:    true
			});
			starfieldGeom = new THREE.BufferGeometry();
			var positions = new Float32Array( starfieldAmount * 3 );
			var colors = new Float32Array( starfieldAmount * 3 );
			var sizes = new Float32Array( starfieldAmount );
			var color = new THREE.Color();
			for ( var i = 0, i3 = 0; i < starfieldAmount; i ++, i3 += 3 ) {
				positions[ i3 + 0 ] = ( Math.random() * 2 - 1 ) * starfieldRadius;
				positions[ i3 + 1 ] = ( Math.random() * 2 - 1 ) * starfieldRadius;
				positions[ i3 + 2 ] = ( Math.random() * 1 ) * starfieldRadius;
				color.setHSL( i / starfieldAmount, 1.0, 0.5 );
				colors[ i3 + 0 ] = 173;//color.r;
				colors[ i3 + 1 ] = 206;//color.g;
				colors[ i3 + 2 ] = 253;//color.b;
				sizes[ i ] = 10;
			}
			starfieldGeom.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
			starfieldGeom.addAttribute( 'customColor', new THREE.BufferAttribute( colors, 3 ) );
			starfieldGeom.addAttribute( 'size', new THREE.BufferAttribute( sizes, 1 ) );
			starSystem = new THREE.Points( starfieldGeom, shaderMaterial );
			scene.add( starSystem );
        }

		function addSceneElements(){
            createBackground();
            createStarField();
			scene.add(new THREE.AmbientLight(0xffffff));
			var dlight = new THREE.DirectionalLight(0xffffff, 0.35);
			dlight.position.set(0, 200, 800);
			// UTILS.addCameraHelper(dlight.shadow.camera, scene);
			scene.add(dlight);
		}

        function animateStarfield(){
            var time = Date.now() * 0.005;
			starSystem.rotation.z = 0.002 * time;
			var sizes = starfieldGeom.attributes.size.array;
			for ( var i = 0; i < starfieldAmount; i++ ) {
				sizes[ i ] = 10 * ( 1 + Math.sin( 0.1 * i + time ) );
			}
			starfieldGeom.attributes.size.needsUpdate = true;
        }
		function onFrame() {
			updateScene();
		    render();
		    requestAnimationFrame(onFrame);
		}

		function updateScene(){
			camera.lookAt({x:0, y:0, z:0});
			TWEEN.update();
		}

		function render(){
            animateStarfield();
			renderer.render(scene, camera);
		}

        function onMouseMove(e) {
			if(stopMouseMove) return;
            mouseX = (e.clientX - _root.width()/2) * 0.05;
            mouseY = -(e.clientY - _root.height()/2) * 0.05;
            cameraTween = new TWEEN.Tween(camera.position)
                .stop()
	    		.to({x: mouseX, y:mouseY}, 300)
	    		.easing(TWEEN.Easing.Sinusoidal.Out)
	    		.start();
        }
        console.log('SRStarfield');
        this.init();
	}

	window.SRStarfield = SRStarfield;
	
}(window, jQuery));
