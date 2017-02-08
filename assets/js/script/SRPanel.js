
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
			if($scrollpos >= atbottomofscreen && $scrollpos < _bottom){
				var h = $(window).height();
				var amt = $scrollpos - atbottomofscreen;
				//console.log('atbottomofscreen = '+atbottomofscreen+' $scrollpos = '+$scrollpos+', $atbottomofscreen+height = '+h+', amt = '+amt);
				var pct = 1-(amt/h);
				if(pct > 0 && pct <= 1){
					setTop(-(differential) * pct);
					setOpacity(1-pct);
					if(pct < .2){
						_panel.trigger("atPanelThreshold",_id);	
					}
				}else{
					setTop(0);
					setOpacity(1);
				}
			}
			// else{
			// 	var pct = (1-((wheretoend-$scrollpos)/differential));
			// 	var m = 0-(differential/2 * pct);
			// 	if(pct > 0 && pct <= 1){
			// 		setTop(m);
			// 	}
			// }
			if(_id == 'openPanel'){
				//this is open/intro screen, we do special things with it.
				var bot = $(window).height();
				if($scrollpos <= bot){
					var pctOpen = $scrollpos/bot;
					_panel.trigger("onOpenReveal",pctOpen);	
				}
			}
		};
        this.resize = function($h){
            setHeight($h);
        };
		//private functions
		function setTop($pos){
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
