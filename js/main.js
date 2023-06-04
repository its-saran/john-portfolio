$(function() {
    'use strict';

    // Fake loading screen
    $('.fakeLoader').fakeLoader({
        timeToHide: 1200,
        zIndex: "999",
        spinner: "spinner3",
        bgColor: "#212121"
    });
       
    // Smooth scroll
    $("a").on("click", function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $("html, body").animate({
                scrollTop: $(hash).offset().top - 50
            }, 850);
        }
    });

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

    // Portfolio filterizr
    $('.filtr-container').imagesLoaded(function() {
        var filterizr = $('.filtr-container').filterizr();
    });

    // Portfolio filter
    $('.portfolio-filter-menu li').on('click', function() {
        $('.portfolio-filter-menu li').removeClass('active');
        $(this).addClass('active');
    });


    // Contact form validation and submition
    $("#contact-form").on('submit', function(event) {
        event.preventDefault();
        
        var form = this;
        var formControls = form.querySelectorAll('.form-control');
        var submitButton = form.querySelector('.send-msg');
      
        // Disable the submit button and add the loading class
        submitButton.disabled = true;
        $(submitButton).addClass('loading');
      
        // Loop through each form control
        for (var i = 0; i < formControls.length; i++) {
          // Check if the current control is empty or invalid
          if ((formControls[i].value === '' && formControls[i].required) || !formControls[i].checkValidity()) {
            // If it's empty or invalid, add the "is-invalid" class to set its border color to red
            formControls[i].classList.add('is-invalid');
          } else {
            // If it's not empty or invalid, remove the "is-invalid" class (if it exists)
            formControls[i].classList.remove('is-invalid');
          }
        }
      
        if (!form.checkValidity()) {
          event.stopPropagation();
      
          // Enable the submit button and remove the loading class
          submitButton.disabled = false;
          $(submitButton).removeClass('loading');
      
          return;
        }
      
        // Check if email is in a valid format only if it is not empty
        var emailInput = form.querySelector('#validationCustomEmail');
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value !== '' && !emailRegex.test(emailInput.value)) {
          emailInput.setCustomValidity('Invalid email address.');
      
          // Add the "is-invalid" class to the email input if it is required and empty
          if (emailInput.required && emailInput.value === '') {
            $(emailInput).addClass('is-invalid');
          }
        } else {
          emailInput.setCustomValidity('');
      
          // Remove invalid feedback div and class if email input is valid
          $(emailInput).removeClass('is-invalid');
        }
      
        $(form).addClass('was-validated');
      
        // If form is valid, submit the data via AJAX
        $.ajax({
          url: "https://script.google.com/macros/s/AKfycbywuu8dJaTJMV01hPzTGe7jQ5aRvuSBlKcw6Xf9qk2YwGfTV255zVQ_vREbSEGLifu9sQ/exec",
          data: $(form).serialize(),
          method: "post",
          success: function(response) {
            $(".success-msg").text("Message sent successfully!").show();
            setTimeout(function() {
              $(".success-msg").hide();
            }, 3000);
      
            // Enable the submit button and remove the loading class
            submitButton.disabled = false;
            $(submitButton).removeClass('loading');
          },
          error: function(err) {
            $(".error-msg").text("Something went wrong. Please try again!").show();
            setTimeout(function() {
              $(".error-msg").hide();
            }, 3000);
      
            // Enable the submit button and remove the loading class
            submitButton.disabled = false;
            $(submitButton).removeClass('loading');
          }
        });
      });
});
