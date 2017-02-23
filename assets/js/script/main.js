$(document).ready(function() {  
    $("html").niceScroll({
    	 scrollspeed: 45, 
    	  // mousescrollstep: 70,
    	  cursorcolor: "#0131ff",
    	  cursoropacitymax: 0.5,
    	   cursorborder: "1px solid #0131ff",
    	    cursorborderradius: "15px",
    });
});



$('.email').each(
    function(i,el) {
        if (!el.value || el.value == '') {
            el.placeholder = 'name@sapientrazorfish.com';
        }
    });



