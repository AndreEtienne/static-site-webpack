require('jquery')
require('popper.js')
require('bootstrap')
require('../../node_modules/@cmyee/pushy/js/pushy.js')
import {tns} from '../../node_modules/tiny-slider/src/tiny-slider'
import '../css/main.scss'

$( document ).ready(function() {
    var slider = tns({
        container: '.tsgb-slider-header',
        items: 1,
        slideBy: 'page',
        autoplay: true,
        controls: false,
        nav: false,
        autoplayButtonOutput: false
    })
    window.onscroll = function() {myFunction()};
    var header = document.getElementById("nav");

// Get the offset position of the navbar
    var sticky = header.offsetTop;

// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
    function myFunction() {
        if (window.pageYOffset > sticky) {
            header.classList.add("sticky");
        } else {
            header.classList.remove("sticky");
        }
    }
});


