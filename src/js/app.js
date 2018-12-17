require('jquery')
require('popper.js')
require('bootstrap')
require('../../node_modules/@cmyee/pushy/js/pushy.js')
import '../css/main.scss'

$( document ).ready(function() {
    // Get the header
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


