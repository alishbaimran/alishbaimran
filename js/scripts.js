var body;
$(window).load(function() {
body=$('body');
/*=================================================================*/
/*                      WOW ANIMATIONS                           
/*=================================================================*/


		var wow = new WOW({
		mobile: false
		});
		wow.init();

/*=================================================================*/
/*                      HIDE LOADING                            
/*=================================================================*/
	body.addClass('loaded');
});
	


/*=================================================================*/
/*                      SCROLL NAVBAR                           
/*=================================================================*/
$(window).scroll(function() {
	"use strict";
	var scrollNav=$(".scroll-nav");
	var b = $(window).scrollTop();
	if (b > 100) {
		scrollNav.addClass("scroll-fixed-nav");
	} else {
		scrollNav.removeClass("scroll-fixed-nav");
	}
});




/*=================================================================*/
/*                      OVERLAY PHOTO                            
/*=================================================================*/
$(document).ready(function() {
	"use strict";
	$("a[class^='prettyPhoto']").prettyPhoto();
});




/*=================================================================*/
/*                      MAGNIFIC POPUP - VIDEO                           
/*=================================================================*/
 $(document).ready(function() {
	        $('.popup-video').magnificPopup({
			  disableOn: 700,
			  type: 'iframe',
			  mainClass: 'mfp-fade',
			  removalDelay: 160,
			  preloader: false,
			  fixedContentPos: false
		});
   
     });




/*=================================================================*/
/*                      MAGNIFIC POPUP - IMAGES                           
/*=================================================================*/
	$(document).ready(function() {

	$('.image-popup-vertical-fit').magnificPopup({
		type: 'image',
		closeOnContentClick: true,
		mainClass: 'mfp-img-mobile',
		image: {
			verticalFit: true
		}
		
	});

	$('.image-popup-fit-width').magnificPopup({
		type: 'image',
		closeOnContentClick: true,
		image: {
			verticalFit: false
		}
	});

	$('.image-popup-no-margins').magnificPopup({
		type: 'image',
		closeOnContentClick: true,
		closeBtnInside: false,
		fixedContentPos: true,
		mainClass: 'mfp-no-margins mfp-with-zoom',
		image: {
			verticalFit: true
		},
		zoom: {
			enabled: true,
			duration: 300
		}
	});

});
	



/*=================================================================*/
/*                      NEWSLETTER                           
/*=================================================================*/
    $( "#newsletter-form" ).submit(function() {
		var newsletterFormMsg=$('#newsletter-form-msg'),newsletterForm=$('#newsletter-form'),newsletterFormInput=$('#newsletter-form input[type=submit]');

        newsletterFormMsg.addClass('hidden');
        newsletterFormMsg.removeClass('alert-success');
        newsletterFormMsg.removeClass('alert-danger');

        newsletterFormInput.attr('disabled', 'disabled');

        $.ajax({
            type: "POST",
            url: "php/index.php",
            data: newsletterForm.serialize(),
            dataType: "json",
            success: function(data) {

                if('success' == data.result)
                {
                    newsletterFormMsg.css('visibility','visible').hide().fadeIn().removeClass('hidden').addClass('alert-success');
                    newsletterFormMsg.html(data.msg[0]);
                    newsletterFormInput.removeAttr('disabled');
                    newsletterForm[0].reset();
                }

                if('error' == data.result)
                {
                    newsletterFormMsg.css('visibility','visible').hide().fadeIn().removeClass('hidden').addClass('alert-danger');
                    newsletterFormMsg.html(data.msg);
                    newsletterFormInput.removeAttr('disabled');
                }

            }
        });

        return false;
    });




/*=================================================================*/
/*                      PORTFOLIO                         
/*=================================================================*/
    $(".gallery .gallery-thumbnail-container").click(function () {

        var src = $(this).find("img").data('img');
        var galleryImg = $('<img/>').attr('src', src).addClass('img-responsive');

        var galleryImgWidth;
        galleryImg.load(function () {
            galleryImgWidth = this.width;
        });

        var imgTitle = $(this).find('.gallery-img-title').html();
        var imgSubtitle = $(this).find('.gallery-img-subtitle').html();

        var galleryModal=$('#galleryModal')
        galleryModal.modal();
        galleryModal.on('shown.bs.modal', function () {
            $('#galleryModal .modal-dialog').css('max-width', galleryImgWidth);
            $('#galleryModal .modal-body').html(galleryImg);
            $('#galleryModal .modal-nav .title').html(imgTitle + ' - ' + imgSubtitle);
        });
        galleryModal.on('hidden.bs.modal', function () {
            $('#galleryModal .modal-body').html('');
        });
    });



    function fullscreenFix() {
        var h = $('body').height();
        $(".content-b").each(function (i) {
            if ($(this).innerHeight() <= h) {
                $(this).closest(".fullscreen").addClass("not-overflow");
            }
        });
    }

    $(window).resize(fullscreenFix);
    fullscreenFix();


    function backgroundResize() {
        var windowH = $(window).height();
        $(".header-full-screen-img").each(function (i) {
            var path = $(this);
            var contW = path.width();
            var contH = path.height();
            var imgW = path.attr("data-img-width");
            var imgH = path.attr("data-img-height");
            var ratio = imgW / imgH;
            var diff = parseFloat(path.attr("data-diff"));
            diff = diff ? diff : 0;
            var remainingH = 0;
            if (path.hasClass("parallax")) {
                var maxH = contH > windowH ? contH : windowH;
                remainingH = windowH - contH;
            }
            imgH = contH + remainingH + diff;
            imgW = imgH * ratio;
            if (contW > imgW) {
                imgW = contW;
                imgH = imgW / ratio;
            }
            path.data("resized-imgW", imgW);
            path.data("resized-imgH", imgH);
            path.css("background-size", imgW + "px " + imgH + "px");
        });
    }

    $(window).resize(backgroundResize);
    $(window).focus(backgroundResize);
    backgroundResize();




/*=================================================================*/
/*                      SCROLL TO TOP                          
/*=================================================================*/
$(document).ready(function() {
	$(function() {
		$.scrollUp({
			scrollName: 'scrollUp',
			scrollDistance: 300,
			scrollFrom: 'top',
			scrollSpeed: 750,
			easingType: 'linear',
			animation: 'fade',
			animationSpeed: 200,
			scrollTrigger: false,
			scrollTarget: false,
			scrollText: '<i class="fa fa-chevron-up"></i>',
			scrollTitle: false,
			scrollImg: false,
			activeOverlay: false,
			zIndex: 2147483647
		});
	});
});



	
/*=================================================================*/
/*                      CONTACT FORM                            
/*=================================================================*/
	function isJSON(val){
		var str = val.replace(/\\./g, '@').replace(/"[^"\\\n\r]*"/g, '');
		return (/^[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]*$/).test(str);
	}
	var contactForm=$('#contact-form'),contactFormResult=$('#contact-form-result');
	contactForm.validator().submit(function(e) {
		if (!e.isDefaultPrevented()) {
			// If there is no any error in validation then send the message
			e.preventDefault();
			var $this = $(this),
				//You can edit alerts here
				alerts = {
					success: 
					"<div class='form-group' >\
						<div class='alert alert-success' role='alert'> \
							<strong>Message Sent!</strong> We'll be in touch as soon as possible\
						</div>\
					</div>",
					error: 
					"<div class='form-group' >\
						<div class='alert alert-danger' role='alert'> \
							<strong>Oops!</strong> Sorry, an error occurred. Try again.\
						</div>\
					</div>"
				};
			$.ajax({
				url: 'mail.php',
				type: 'post',
				data: $this.serialize(),
				success: function(data){
					if( isJSON(data) ){
						data = $.parseJSON(data);
						if(data['error'] == false){
							contactFormResult.html(alerts.success);
							contactForm.trigger('reset');
						}else{
							contactFormResult.html(
							"<div class='form-group' >\
								<div class='alert alert-danger alert-dismissible' role='alert'> \
									<button type='button' class='close' data-dismiss='alert' aria-label='Close' > \
										<i class='ion-ios-close-empty' ></i> \
									</button> \
									"+ data['error'] +"\
								</div>\
							</div>"
							);
						}
					}else{
						contactFormResult.html(alerts.error);
					}
				},
				error: function(){
					contactFormResult.html(alerts.error);
				}
			});
		}
	});



/*=================================================================*/
/*                      ONEPAGE NAV                          
/*=================================================================*/
$(document).ready(function() {
	$('#nav').onePageNav({
		currentClass: 'current-nav',
		changeHash: false,
		scrollSpeed: 750,
		scrollThreshold: 0.5,
		filter: '',
		easing: 'swing',
		begin: function() {
		},
		end: function() {
		},
		scrollChange: function($currentListItem) {
		}
	});
});