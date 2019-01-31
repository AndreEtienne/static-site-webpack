require('jquery');
require('popper.js');
require('bootstrap');
require('@fortawesome/fontawesome-free/js/all');
require('../../node_modules/@cmyee/pushy/js/pushy.js');
import {tns} from '../../node_modules/tiny-slider/src/tiny-slider';
import '../css/main.scss';

$( document ).ready(function() {


    var slider = tns({
        container: '.news-slider',
        items: 1,
        autoplay: true,
        controls: false,
        nav: true,
        autoplayButtonOutput: false
    });
    // Hide Header on on scroll down
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var navbarHeight = $('header').outerHeight();

    $(window).scroll(function(event){
        didScroll = true;
    });

    setInterval(function() {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 250);

    function hasScrolled() {
        var st = $(window).scrollTop();
        // Make sure they scroll more than delta
        if(Math.abs(lastScrollTop - st) <= delta)
            return;

        // If they scrolled down and are past the navbar, add class .nav-up.
        // This is necessary so you never see what is "behind" the navbar.
        if (st > lastScrollTop && st > navbarHeight){
            // Scroll Down
            $('header').removeClass('nav-down').addClass('nav-up');
            $('.social-bar').removeClass('open').addClass('close');
        } else {
            // Scroll Up
            if(st + $(window).height() < $(document).height()) {
                $('header').removeClass('nav-up').addClass('nav-down');
                $('.social-bar').removeClass('close').addClass('open');
            }
        }

        lastScrollTop = st;
    }
});
