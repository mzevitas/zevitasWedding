
//TwinklingStar "class"

(function (window, $) {
	//public variables
	// Make TwinklingStar have the same methods as Mesh
	TwinklingStar.prototype = Object.create(THREE.Mesh.prototype);
	TwinklingStar.prototype.type = 'TwinklingStar';
	// Make sure the right constructor gets called
	TwinklingStar.prototype.constructor = TwinklingStar;

	//constructor function
	function TwinklingStar(geom, index){
        var starTexture = new THREE.TextureLoader().load( "assets/images/sprites/star3-16x16.png" );
		var starMaterial = new THREE.MeshBasicMaterial({map:starTexture, transparent:true});
        THREE.Mesh.call(this, geom, starMaterial);
		//private variables
		var _index = index;
        var twinkleOutTween,twinkleInTween;

		//public functions
		this.init = function($x,$y,$z){
			this.position.x = $x;//Math.random() * 1000 - 500;
            this.position.y = $y;//Math.random() * 1000 - 500;
            this.position.z = $z;//Math.random() * 1000 - 500;
            twinkle(this);
		};

		//private functions
		function twinkle(scope){
            //console.log('twinkle');
            var rtime = Math.round((Math.random() * 1000));
            var rdelay = Math.round((Math.random() * 5000))
			twinkleInTween = new TWEEN.Tween(scope.material)
                .stop()
                //.delay(rdelay)
	    		.to({opacity:Math.random()}, rtime)
	    		.easing(TWEEN.Easing.Sinusoidal.Out)
				.onComplete(function() {
                    twinkle(scope);
			    });
			twinkleOutTween = new TWEEN.Tween(scope.material)
                .stop()
                .delay(Math.round(Math.random() * 10000))
	    		.to({opacity:0}, rtime)
	    		.easing(TWEEN.Easing.Sinusoidal.Out)
	    		.start()
				.chain(twinkleInTween);					
		}
	}

	window.TwinklingStar = TwinklingStar;
	
}(window, jQuery));
