var app = angular.module("wedding", ['ngRoute']);

app.config(function($routeProvider) {


    $routeProvider.when('/', {
        templateUrl: 'views/home.html',
        controller: 'PageCtrl'
    });
    $routeProvider.when('/about', {
        templateUrl: 'views/about.html',
        controller: 'PageCtrl'
    });
    $routeProvider.when('/stay', {
        templateUrl: 'views/stay.html',
        controller: 'PageCtrl'
    });
    $routeProvider.when('/location', {
        templateUrl: 'views/location.html',
        controller: 'PageCtrl'
    });
    $routeProvider.when('/registry', {
        templateUrl: 'views/registry.html',
        controller: 'PageCtrl'
    });


});

app.controller('PageCtrl', function() {
    //console.log("Page Controller here.");
});





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
    function(i, el) {
        if (!el.value || el.value == '') {
            el.placeholder = 'name@sasdfsdfspientrazorfish.com';
        }
    });
