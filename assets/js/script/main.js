$(document).ready(function() {  
    $("html").niceScroll({
    	 scrollspeed: 45, 
    	  // mousescrollstep: 70,
    	  cursorcolor: "#001a33",
    	  cursoropacitymax: 1,
           cursorwidth: "8px",
    	   cursorborder: "1px solid #ffffff",
    	    cursorborderradius: "15px",
    });
});



$('.email').each(
    function(i,el) {
        if (!el.value || el.value == '') {
            el.placeholder = 'name@sasdfsdfspientrazorfish.com';
        }
    });



