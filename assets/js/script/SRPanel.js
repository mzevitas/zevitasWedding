
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
		var _tdiff = 0;
		var _cdiff = 0;

		//public functions
		this.init = function(){
			setHeight();
		};
		this.scroll = function($scrollpos){
			var differential = $(window).height()/2;
			var atbottomofscreen = _top-$(window).height();
			var wheretoend = _bottom + differential;

			//if(_panel.attr('id') == 'contactPanel'){
				if($scrollpos >= atbottomofscreen && $scrollpos < _bottom){
					//_panel.css({'border':'1px solid blue'});
					var h = $(window).height();
					var amt = $scrollpos - atbottomofscreen;
					//console.log('atbottomofscreen = '+atbottomofscreen+' $scrollpos = '+$scrollpos+', $atbottomofscreen+height = '+h+', amt = '+amt);
					
					var pct = 1-(amt/h);
					//console.log('pct = '+pct);
					if(pct > 0 && pct <= 1){
						setTop(-(differential) * pct);
						setOpacity(1-pct);
					}else{
						setTop(0);
						setOpacity(1);
					}
					
				}else{
					var pct = (1-((wheretoend-$scrollpos)/differential));
					var m = 0-(differential/2 * pct);
					//console.log('pct = '+pct);
					if(pct > 0 && pct <= 1){
						//setTop(m);
					}
					//_panel.css({'border':'1px solid red'});
				}
			//}
			
		};
        this.resize = function(){
            setHeight();
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
		function setHeight(){
			_panel.css({
                'min-height':$(window).height()+'px',
				'height':_content.height()+'px'
            });
			_top = _panel.offset().top;
			_height = (_panel.outerHeight() - $(window).height());
			_bottom = _top + _height;

			//console.log(_panel.attr('id')+' bottom pos = '+_bottom+' top pos = '+_top);
		};
        this.init();
	}

	window.SRPanel = SRPanel;
	
}(window, jQuery));
