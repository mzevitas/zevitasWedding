
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

		//public functions
		this.init = function(){
			setHeight();
		};
        this.resize = function(){
            setHeight();
        };
		//private functions
		function setHeight(){
			_panel.css({
                'min-height':$(window).height()+'px'
            });
		};
        this.init();
	}

	window.SRPanel = SRPanel;
	
}(window, jQuery));
