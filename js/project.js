$(function() {
    'use strict';

    // Navbar on scroll
    $(window).on("scroll", function() {
        var vScroll = $(this).scrollTop();
        if (vScroll > 100) {
            $(".navbar").addClass("fix");
        } else {
            $(".navbar").removeClass("fix");
        }
    });

    // Highlight active nav item
    $('.navbar-nav .nav-item').on('click', function() {
        $('.navbar-nav .nav-item.active').removeClass('active');
        $(this).addClass('active');
    });

    // Hide navbar on mobile after click
    $('.navbar-nav a').on('click', function() {
        $('.navbar-collapse').collapse('hide');
    });

    
});
