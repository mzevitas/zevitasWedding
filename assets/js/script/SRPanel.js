
//SRPanel "class"

(function (window, $) {
	//public variables
	//SRPanel.prototype.var_name = "";

	//static variables
	SRPanel.STATIC_VAR = "";

	//constructor function
	function SRPanel($root){
		//private variables
		var _panel = $root;
		var _content = _panel.find('.parallax-wrapper');
		var _textcontent = _panel.find('.content-wrapper');
		var _height = 0;
		var _top = 0;
		var _bottom = 0;
		var _id = _panel.attr('id');

		//public functions
		this.init = function($h){
			setHeight($h);
		};
		this.scroll = function($scrollpos){
			var differential = $(window).height()/2;
			var atbottomofscreen = _top-$(window).height();
			var wheretoend = _bottom + differential;
			var bottomscrollpos = _top + _panel.outerHeight() - 100;
			// if(_id == 'workingPanel'){
			// 	console.log('$scrollpos = '+$scrollpos+', bottom = '+bottomscrollpos+', _top = '+_top);
			// }

			if($scrollpos < bottomscrollpos && $scrollpos > (_top-100)){
				//console.log('panel = '+_id);
				_panel.trigger("withinPanelBounds",_id);
			}

			if(($scrollpos - _top) < differential){
				var uppct =	1-(($scrollpos-_top) / differential);
				if(uppct < 1){
					_panel.trigger("atPanelThresholdTop",_id);	
					//if(_id == 'workingPanel') console.log('uppct = '+uppct);
				}
			}

			if($scrollpos >= atbottomofscreen && $scrollpos < _bottom){
				var h = $(window).height();
				var amt = $scrollpos - atbottomofscreen;
				//console.log('atbottomofscreen = '+atbottomofscreen+' $scrollpos = '+$scrollpos+', $atbottomofscreen+height = '+h+', amt = '+amt);
				var pct = 1-(amt/h);
				if(pct > 0 && pct <= 1){
					setTop(-(differential) * pct);
					setOpacity(1-pct);
					//if(_id == 'workingPanel') console.log('pct = '+pct);
					if(pct < .75 && _id == 'infoPanel'){
						_panel.trigger("atPanelThreshold",_id);	
					}else if(pct < .5){
						_panel.trigger("atPanelThreshold",_id);	
					}
				}else{
					setTop(0);
					setOpacity(1);
				}
			}
		};
        this.resize = function($h){
            setHeight($h);
        };
		//private functions
		function setTop($pos){
			// _content.css({
			// 	 '-webkit-transform': 'translateY('+$pos+'px)',
   			// 	 '-moz-transform': 'translateY('+$pos+'px)'
			// })
			_content.css({
				'top':$pos+'px'
			});
		}
		function setOpacity($o){
			_textcontent.css({
				'opacity':$o
			});
		}
		function setHeight($h){
			_panel.css({
                'min-height':$h+'px'
            });
			_content.css({
				'min-height':$h+'px'
			});
			if(_id != 'openPanel'){
				_panel.css({
					'height':_content.height()+'px'
				});
			}
			
			_top = _panel.offset().top;
			_height = (_panel.outerHeight() - $h);
			_bottom = _top + _height;
		};
	}

	window.SRPanel = SRPanel;
	
}(window, jQuery));
