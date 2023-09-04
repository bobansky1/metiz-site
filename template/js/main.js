$(document).ready(function() {

	// City select

	$('.jsBtnCity, .jsCloseSelectCity').on('click', function() {
		
		if ($(window).width() >= 768) {
			var right = ($(window).width() - ($('.header-top .header-inner').offset().left + $('.header-top .header-inner').outerWidth()));
			$('.jsCityBlock').toggleClass('active').css({right: right});
			$('.jsBtnCity').toggleClass('active');
		} else {
			if(!$('.jsCityBlock').hasClass('active')) {
				$('.jsCityBlock').addClass('active').animate({left:0},500);
			} else {
				$('.jsCityBlock').removeClass('active').animate({left:'-100%'},600);
			}
		}

	});

	// Form input============================================

	$('.telegram-form').on('submit', function (event) {

		event.stopPropagation();
		event.preventDefault();
	
		let form = this,
			submit = $('.submit', form),
			data = new FormData(),
			files = $('input[type=file]')
	
	
		$('.submit', form).val('Отправка...');
		$('input, textarea', form).attr('disabled','');
	
		data.append( 'Имя', 		$('[name="name"]', form).val() );
		data.append( 'Номер телефона', 		$('[name="phone"]', form).val() );
		data.append( 'E-mail', 		$('[name="email"]', form).val() );
		data.append( 'Сообщение ', 		$('[name="text"]', form).val() );
	
	   
	
		files.each(function (key, file) {
			let cont = file.files;
			if ( cont ) {
				$.each( cont, function( key, value ) {
					data.append( key, value );
				});
			}
		});
		
		$.ajax({
			url: 'ajax.php',
			type: 'POST',
			data: data,
			cache: false,
			dataType: 'json',
			processData: false,
			contentType: false,
			xhr: function() {
				let myXhr = $.ajaxSettings.xhr();
	
				if ( myXhr.upload ) {
					myXhr.upload.addEventListener( 'progress', function(e) {
						if ( e.lengthComputable ) {
							let percentage = ( e.loaded / e.total ) * 100;
								percentage = percentage.toFixed(0);
							$('.submit', form)
								.html( percentage + '%' );
						}
					}, false );
				}
	
				return myXhr;
			},
			error: function( jqXHR, textStatus ) {
				// Тут выводим ошибку
			},
			complete: function() {
				// Тут можем что-то делать ПОСЛЕ успешной отправки формы
				console.log('Complete')
				form.reset() 
			}
		});
	
		return false;
	});

//
$('.new-form-class').on('submit', function (event) {

	event.stopPropagation();
	event.preventDefault();

	let newForm = this,
		newSubmit = $('.new-submit-class', newForm),
		data = new FormData(),
		files = $('input[type=file]')


	$('.new-submit-class', newForm).val('Sending...');
	$('input, textarea', newForm).attr('disabled','');

	data.append( 'New-Name', 		$('[name="new-name"]', newForm).val() );
	data.append( 'New-Phone', 		$('[name="new-phone"]', newForm).val() );
	data.append( 'New-Email', 		$('[name="new-email"]', newForm).val() );
	data.append( 'New-Message ', 	$('[name="new-text"]', newForm).val() );

   

	files.each(function (key, file) {
		let cont = file.files;
		if ( cont ) {
			$.each( cont, function( key, value ) {
				data.append( key, value );
			});
		}
	});
	
	$.ajax({
		url: 'new-ajax.php',
		type: 'POST',
		data: data,
		cache: false,
		dataType: 'json',
		processData: false,
		contentType: false,
		xhr: function() {
			let myXhr = $.ajaxSettings.xhr();

			if ( myXhr.upload ) {
				myXhr.upload.addEventListener( 'progress', function(e) {
					if ( e.lengthComputable ) {
						let percentage = ( e.loaded / e.total ) * 100;
							percentage = percentage.toFixed(0);
						$('.new-submit-class', newForm)
							.html( percentage + '%' );
					}
				}, false );
			}

			return myXhr;
		},
		error: function( jqXHR, textStatus ) {
			// Handle error here
		},
		complete: function() {
			// Do something after successful form submission
			console.log('Complete')
			newForm.reset() 
		}
	});

	return false;
});

//
	// Quck call

	$('.jsQuickBtn, .jsQuickCallClose, .jsQuickCallBg').on('click', function() {

		$('.jsQuickModal').toggleClass('active');
		if($(window).width() < 991) {
			$('.jsQuickCallBg').toggleClass('active');

			if(!$('html').hasClass('fixed')) {
				$('html').addClass('fixed');
			} else {
				$('html').removeClass('fixed');
			}
		}		
	});
	
	$('.jsQuickCallClose_1').on('click', function() {

		$('.jsQuickModal_1').toggleClass('active');
		if($(window).width() < 991) {
			$('.jsQuickModal_1').next('.jsQuickCallBg').toggleClass('active');
			$('.jsQuickCallBg_1').removeClass('active');
			if(!$('html').hasClass('fixed')) {
				$('html').addClass('fixed');
			} else {
				$('html').removeClass('fixed');
			}
		}		
	});

	// Quck call  ENDS============================================

	

	// MOBILE Menu

		$('.jsBurger,.jsCloseMenu, .jsMobileBg').on('click', function() {
			if(!$('.jsMobileMenu').hasClass('active')) {
				$('.jsMobileMenu').addClass('active').animate({left:0},500);
				$('.jsMobileBg').addClass('active').animate({opacity:1},400);
				$('html').addClass('fixed');
			} else {
				$('.jsMobileMenu').removeClass('active').animate({left:'-100%'},600);
				$('.jsMobileBg').removeClass('active').animate({opacity:0},300);
				$('html').removeClass('fixed');
				$('.jsCityBlock').removeClass('active').animate({left:'-100%'},600);
			}
		});

	// ANIMATION============================================
	const animItems = document.querySelectorAll('._anim-items');

	if (animItems.length > 0) {
		window.addEventListener('scroll', animOnScroll);
		function animOnScroll() {
			for (let index = 0; index < animItems.length; index++) {
				const animItem = animItems[index];
				const animItemHeight = animItem.offsetHeight;
				const animItemOffset = offset(animItem).top;
				const animStart = 4;
	
				let animItemPoint = window.innerHeight - animItemHeight / animStart;
				if (animItemHeight > window.innerHeight) {
					animItemPoint = window.innerHeight - window.innerHeight / animStart;
				}
	
				if ((scrollY > animItemOffset - animItemPoint) && scrollY < (animItemOffset + animItemHeight)) {
					animItem.classList.add('_active');
				} else {
					if (!animItem.classList.contains('_anim-no-hide')) {
						animItem.classList.remove('_active');
					}
				}
			}
		}
		function offset(el) {
			const rect = el.getBoundingClientRect(),
				scrollLeft = window.scrollX || document.documentElement.scrollLeft,
				scrollTop = window.scrollY || document.documentElement.scrollTop;
			return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
	
		}
	
		setTimeout(() => {
			animOnScroll();
		}, 500);
	}


	// MASK INPUT
		$('.jsPhoneMask').mask('+7(999)999-99-99');
	// MASK INPUT ENDS============================================


	// FORMS
		// $('.jsForm').on('submit', function(e) {
		// 	e.preventDefault();
		// 	formHeight();
		// 	formSubmitSuccess($(this));
		// });

		function formHeight(){
			$('.jsForm').each(function() {
				var formInner = $(this).find('.jsFormInner');
				$(this).css('height', formInner.css("height") ) ; 
			})
		}

		function formSubmitSuccess(form) {
			var successForm = form.find('.jsFormSuccess');
			var frontForm = form.find('.jsFormFront');
			var formInputFile = form.find('.jsAddBlockText');

			frontForm.slideUp(350, function(){
				successForm.delay(400).slideDown(350);
			});

			setTimeout(function() {
				if(formInputFile.length > 0) {
					formInputFile.html('Прикрепить файл');
				}
				form.trigger('reset');
				successForm.slideUp(300);
				setTimeout(function() {
					frontForm.slideDown(400);
				}, 350); 

				if (form.hasClass('modal-form')) {
					setTimeout(function() {
						$('.modal').modal('hide')
					}, 1100);
				}

			}, 4000);
		}
	// FORMS ENDS ====================================================

	// MAIN SLIDER
	$('.jsMainSlider').slick({
		infinite: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		arrows: false,
		dots: true,
		adaptiveHeight: true,
		autoplaySpeed: 4000
	});
	// MAIN SLIDER  ENDS================================================


	//   изменение кастомного текста в выборе файла в форме
	// $('.jsFile').on('change', function() {
	// 	var fileName = $(this).closest('.add-block').find('.jsAddBlockText');
	// 	fileName.html(this.files[0].name);
	// });
	//   изменение кастомного текста в выборе файла в форме  ENDS==================================



	// slider advantages

	$slick_slider = $('.jsAdvantagesSlider');

	settings_slider = {
		prevArrow: '<div class="slider__arrow slider__arrow_prev"></div>',
		nextArrow: '<div class="slider__arrow slider__arrow_next"></div>',
		responsive: [
			{
				breakpoint: 767,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 1
					}
			},
			{
				breakpoint: 479,
				settings: {
					slidesToShow: 1,
				}
			}
		]
	}

	slick_on_mobile($slick_slider, settings_slider);

	function slick_on_mobile(slider, settings){
		$(window).on('load resize', function() {
		  if ($(window).width() >= 768) {
			if (slider.hasClass('slick-initialized')) {
			  slider.slick('unslick');
			}
			return;
		  }
		  if (!slider.hasClass('slick-initialized')) {
			return slider.slick(settings);
		  }
		});
	};
	// slider advantages ENDS =======================================================


	// review SLIDER
	$('.jsSliderReview').slick({
		infinite: false,
		slidesToShow: 3,
		slidesToScroll: 1,
		arrows: true,
		dots: false,
		adaptiveHeight: false,
		prevArrow: '<div class="slider__arrow slider__arrow_prev"></div>' ,
		nextArrow: '<div class="slider__arrow slider__arrow_next"></div>',
		responsive: [
			{
				breakpoint: 1200,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2
					}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	});
	
	$('.jsSliderReviewNew').slick({
		infinite: false,
		slidesToShow: 4,
		slidesToScroll: 1,
		arrows: true,
		dots: false,
		adaptiveHeight: false,
		prevArrow: '<div class="slider__arrow slider__arrow_prev"></div>' ,
		nextArrow: '<div class="slider__arrow slider__arrow_next"></div>',
		responsive: [
			{
				breakpoint: 1200,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2
					}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	});
	// review SLIDER  ENDS================================================


	// Сertificate SLIDER  
	$('.jsSliderCert').slick({
		infinite: false,
		slidesToShow: 4,
		slidesToScroll: 1,
		arrows: true,
		dots: false,
		adaptiveHeight: false,
		prevArrow: '<div class="slider__arrow slider__arrow_prev"></div>' ,
		nextArrow: '<div class="slider__arrow slider__arrow_next"></div>',
		responsive: [
			{
				breakpoint: 1199,
					settings: {
						slidesToShow: 3
					}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1
				}
			}
		]
	});


	$('.jsSliderAnalog').slick({
		infinite: false,
		slidesToShow: 4,
		slidesToScroll: 1,
		arrows: true,
		dots: false,
		adaptiveHeight: false,
		prevArrow: '<div class="slider__arrow slider__arrow_prev"></div>' ,
		nextArrow: '<div class="slider__arrow slider__arrow_next"></div>',
		responsive: [
			{
				breakpoint: 1199,
					settings: {
						slidesToShow: 3
					}
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 2
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1
				}
			}
		]
	});

	// Сertificate SLIDER  ENDS================================================

	// magnificPopup  
	 $('.jsPopUpImg').magnificPopup({
		type: 'image',
		closeOnContentClick: false,
		closeBtnInside: false,
		mainClass: 'mfp-with-zoom mfp-img-mobile mfp-fade',
		gallery: {
			enabled: true,
			tCounter: '<span class="mfp-counter">%curr% из %total%</span>',
		},
			zoom: {
				enabled: true,
				duration: 300, 
				opener: function(element) {
					return element.find('img');
				}
			}

	});



	 
	$('.jsPopUpNotImage').magnificPopup({
			type: 'image',
			closeOnContentClick: false,
			closeBtnInside: false,
			mainClass: 'mfp-with-zoom mfp-img-mobile',
			gallery: {
				enabled: true,
				tCounter: '<span class="mfp-counter">%curr% из %total%</span>'
			}
		});

	 // magnificPopup ENDS================================================


	// HEADER FIXED


	// HEADER FIXED ENDS============================================================================

	// CHANGE TYPE PASSWORD
		$('.jsEyeIcon').on('click', function() {
			$(this).toggleClass('active');
			if (!$(this).hasClass('active')) {
				$(this).siblings('input').attr("type","password");
			} else {
				$(this).siblings('input').attr("type","text");
			}
		});
	// CHANGE TYPE PASSWORD ENDS ==================================================================


	// MODAL BTN
	$('body').on('click', '.modalBtn', function(e) {
		e.preventDefault();
		//var target = '#' + ($(this).attr('href'));
		var target = $(this).data('href');
		setTimeout(function() {
		   $(target).modal('show');
		}, 500);
	});

	$('body').on('click', '.jsBuyOneClick', function(e) {
		e.preventDefault();
		console.log('clickbuy');
		$('#modal-one-click').modal('show');
		yaCounter22705213.reachGoal('clickbuy');
	});
	

	$('#ctHeaderPhone').on('click', function() {
		yaCounter22705213.reachGoal('call');
	})

	// $('.jsAddCart').on('click', function(e) {
	// 	e.preventDefault();
	// 	$('#modal-add-cart').modal('show');
	// });


	$('body').on('click', '.jsNoSize', function(e) {
		e.preventDefault();
		$('#modal-no-size').modal('show');
	});



	// MODAL BTN  ENDS=======================================

	// product ELEMENTS
	$('body').on('click', '.jsProductElementBtn', function() {
		if (!$(this).closest('.jsProductElement').hasClass('active')) {
				$(this).closest('.jsProductElement').addClass('active');
				$(this).closest('.jsProductElement').find('.jsProductElementBottom').slideDown(300);
		} else {
			$(this).closest('.jsProductElement').removeClass('active');
		 	$(this).closest('.jsProductElement').find('.jsProductElementBottom').slideUp(300);
		}
	});	


	$('body').on('click', '.jsSizeTop', function() {
		if($(window).width() < 768){
			if (!$(this).closest('.jsSizeItem').hasClass('active')) {
					$(this).closest('.jsSizeItem').addClass('active');
					$(this).closest('.jsSizeItem').find('.jsSizeBottom').slideDown(300);
			} else {
				$(this).closest('.jsSizeItem').removeClass('active');
			 	$(this).closest('.jsSizeItem').find('.jsSizeBottom').slideUp(300);
			}
		}
	});	
	

	// product ELEMENTS ENDS=======================================


	// CARD SLIDER
	 $('.jsSliderCard').slick({
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		asNavFor: '.jsSliderThumbs',
		dots: false,
		draggable: false,
		fade: true,
		// appendArrows: '.slider__arrows',
	   	prevArrow: '<div class="slider__arrow slider__arrow_prev"></div>' ,
		nextArrow: '<div class="slider__arrow slider__arrow_next"></div>',
		adaptiveHeight: false,
		responsive: [
			{
				breakpoint: 767,
					settings: {
						fade: false,
						arrows: true
					}
			}
		]
	});

	$('.jsSliderThumbs').slick({
		infinite: true,
		slidesToShow: 5,
		slidesToScroll: 1,
		asNavFor: '.jsSliderCard',
		dots: false,
		focusOnSelect: true,
		centerMode: true,
		arrows: false,
		vertical: true,
		verticalSwiping: true,
	   	prevArrow: '<div class="slider__arrow slider__arrow_prev"></div>' ,
		nextArrow: '<div class="slider__arrow slider__arrow_next"></div>',
		responsive: [
			{
				breakpoint: 1199,
					settings: {
						vertical: false,
						verticalSwiping: false,
						 slidesToShow: 3,
					}
			},
			{
				breakpoint: 1022,
					settings: {
						vertical: false,
						verticalSwiping: false,
						slidesToShow: 3,
					}
			},
			{
				breakpoint: 991,
					settings: {
						vertical: false,
						verticalSwiping: false,
						slidesToShow: 2,
					}
			},
			{
				breakpoint: 900,
					settings: {
						vertical: false,
						verticalSwiping: false,
						slidesToShow: 1,
					}
			},
			{
				breakpoint: 767,
					settings: "unslick"

			}
		]
	});
	// CARD SLIDER ENDS==============================================================


	// табы
	$('.jsTabsBtn').on('click', function() {
		var 	tabContainer = $(this).closest('.jsTabs'),
				tabContentItem = tabContainer.find('.jsTabItem'),
				tabActive = tabContentItem.filter('.active'),
				ndx = $(this).index(),
				reqItem = tabContentItem.eq(ndx);

		$(this).addClass('active')
			.siblings()
			.removeClass('active');

		tabContentItem.removeClass('active');
		reqItem.addClass('active');
	})


	$('.jsTabsBtnOther').on('click', function() {
		var 	tabContainer = $(this).closest('.jsTabsOther'),
				tabContentItem = tabContainer.find('.jsTabItemOther'),
				tabActive = tabContentItem.filter('.active'),
				ndx = $(this).index(),
				reqItem = tabContentItem.eq(ndx);

		$(this).addClass('active')
			.siblings()
			.removeClass('active');

		tabContentItem.removeClass('active');
		reqItem.addClass('active');
	})
	// табы ENDS====================================

	// Чтоб не скакали загаловки в .tabs_card-info
	$('.tabs_card-info .jsTabsBtn').on('click', function() {
		var width = $(this).width();
		$(this).width(width);
	});
	// Чтоб не скакали загаловки в .tabs_card-info ENDS=========================


	// Кнопка, скролл до точки

	$('.jsScrollBtn').on('click', function(e){
		e.preventDefault();
		//var getvalue = $(this).attr('href');
		var getvalue = $(this).data('href');
		$('html, body').stop().animate({scrollTop: $(getvalue).offset().top - 100}, 500);
	});

	// Кнопка, скролл до точки ENDS=========================




	//  AMOUNT, WEIGHT CHANGE

	
		$('body').on('click', '.jsAmountChange, .jsWeightChange', function() {
			var parent = $(this).closest('.jsSizeItem');
			var amountInp = parent.find('.jsInputAmount');
			var amountCount = amountInp.data('min');
			var weightInp = parent.find('.jsInputWeight');
			var weight = weightInp.data('size-weight');
				
			if ( $(this).hasClass('jsAmountMinus') || $(this).hasClass('jsWeightMinus') ) {
				amountInp.val(parseInt(amountInp.val()) - amountCount).trigger('change');
			} else if ( $(this).hasClass('jsAmountPlus') || $(this).hasClass('jsWeightPlus') ) {
				amountInp.val(parseInt(amountInp.val()) + amountCount).trigger('change');
			}

			// summ(parent);
		});

		
		function summ(parent,count) {

			var inputAmount = parent.find('.jsInputAmount');
			var inputAmountVal = inputAmount.val();
			var dataMinAmount = inputAmount.data('min');

			var priceStart = parent.find('.jsAmountPrice').data('price');

			var priceTotal = 0;

			var inputWeight = parent.find('.jsInputWeight');
			var inputWeightVal = inputWeight.val();
			var dataMinWeight = inputWeight.data('min');
			var weight = inputWeight.data('size-weight');
			var hiddenInput = parent.find('.jsCountHidden');
			var modalInput = parent.find('.jsCountModal');

			var pf_weight = new Intl.NumberFormat(
			['en-GB'],
				{
					useGrouping: false,
					minimumIntegerDigits: 1,
					minimumFractionDigits: 3,
					maximumFractionDigits: 3,
				}
			);


			if (!count) {
				priceTotal = inputAmountVal * priceStart;
				parent.find('.jsAmountTotal').html(priceTotal.toFixed(2));
				hiddenInput.val(inputAmountVal);
				modalInput.html(inputAmountVal);
				weightTotal = pf_weight.format(parseInt(inputAmountVal) *  weight);
				inputWeight.val(weightTotal);
			} else {
				inputAmount.val(dataMinAmount * count);
				priceTotal = inputAmount.val() * priceStart;
				parent.find('.jsAmountTotal').html(priceTotal.toFixed(2));
				hiddenInput.val(inputAmount.val());
				modalInput.html(inputAmount.val());
				weightTotal = pf_weight.format(parseInt(inputAmount.val()) *  weight);
				inputWeight.val(weightTotal);
			}

			if (parseInt(inputAmount.val()) == dataMinAmount ) {
				parent.find('.jsAmountMinus').addClass('disable');
				parent.find('.jsWeightMinus').addClass('disable');
			} else {
				parent.find('.jsAmountMinus').removeClass('disable');
				parent.find('.jsWeightMinus').removeClass('disable');
			}
		}

		function cartItemsCount() {
			// var cartSumm = 0;
			var cartWeight = 0;

			$('.jsSizeCart .jsSizeItem').each(function() {
				// cartSumm += parseInt($(this).find('.jsAmountTotal').html());
				cartWeight += parseFloat($(this).find('.jsInputWeight').val());
			});
			// $('.jsCartAmount').html(cartSumm);

			var pf_weight = new Intl.NumberFormat(
			['en-GB'],
				{
					useGrouping: false,
					minimumIntegerDigits: 1,
					minimumFractionDigits: 3,
					maximumFractionDigits: 3,
				}
			);
			
			$('.jsCartWeight').html(pf_weight.format(parseFloat(cartWeight)));
		}

		cartItemsCount();



		$('body').on('change', '.jsInputAmount', function(){
			var parent = $(this).closest('.jsSizeItem');
			var val = parseFloat($(this).val());	
			var min = parseFloat($(this).data('min'));
			if (val > min) {
				$(this).val(Math.ceil(val / min) * min);
			} else {
				$(this).val(min);
			}

			summ(parent);

			if (!$(this).closest('.jsSizeCart').length < 1) {
				cartItemsCount();
			}
		})


		$('body').on('change', '.jsInputWeight', function(){
			var parent = $(this).closest('.jsSizeItem');
			var inpWeigth = $(this).closest('.jsInputWeight');
			var min = inpWeigth.data('min');
			var inpVal = inpWeigth.val();
			var weight = inpWeigth.data('size-weight');
			var weightFloat = parseFloat(weight);
			var count = Math.ceil(inpWeigth.val() / min);

			summ(parent, count);

			if (!$(this).closest('.jsSizeCart').length < 1) {
				cartItemsCount();
			}
		})


		// проверка на пустоту
		$('body').on('keyup', '.jsInputAmount, .jsInputWeight', function(){
			var x = $(this).val();
			var y = $(this).data('min');
			var z = parseFloat(y);
			if ($(this).val() == '') {
				$(this).val($(this).data('min'));
			}
		})
		// проверка на пустоту ENDSSSS

	//  AMOUNT, WEIGHT CHANGE ENDS==============================



	$(document).on('click', function(e) {
		// проверка что клик не по jsQuickModal и jsQuickBtn
		if (
			!$('.jsQuickModal').is(e.target) 
			&& $('.jsQuickModal').hasClass('active') 
			&& !$('.jsQuickModal *').is(e.target) 
			&& !$('.jsQuickBtn').is(e.target) 
			&& !$('.jsQuickBtn *').is(e.target) 
		){				
			$('.jsQuickModal').removeClass('active');				
		};
		// проверка что клик не по jsQuickModal и jsQuickBtn  ENDS==================================

		// проверка что клик не по jsQuickModal и jsQuickBtn
		if (
			!$('.jsCityBlock ').is(e.target) 
			&& $('.jsCityBlock ').hasClass('active') 
			&& !$('.jsCityBlock  *').is(e.target) 
			&& !$('.jsBtnCity').is(e.target) 
			&& !$('.jsBtnCity *').is(e.target) 
		){				
			$('.jsCityBlock').removeClass('active');				
			$('.jsBtnCity').removeClass('active');				
		};
		// проверка что клик не по jsQuickModal и jsQuickBtn  ENDS==================================


		if  (
			!$('.jsPrivatNav ').is(e.target)
			&& !$('.jsPrivatNav *').is(e.target)
			&& $('.jsPrivatNav').hasClass('active')
		) {
			$('.jsPrivatNav').removeClass('active')
		}
	});



	//  скрыть p / показать p

	$('.jsInfoText > *:gt(1)').slideUp(1);

	function countP() {
		if($('.jsInfoText > *').length > 2) {
			$('.jsShowMore').addClass('show');
		} else {
			$('.jsShowMore').removeClass('show');
		}
	}
	countP()

	$('.jsShowMore').on('click' , function(event) {
		event.preventDefault();

		if (!$(this).hasClass('active')) {
			$(this).addClass('active').find('span').html('Скрыть')
		} else {
			$(this).removeClass('active').find('span').html('Подробнее')
		}

		$('.jsInfoText > *:gt(1)').slideToggle(350);
	});

	//  скрыть p / показать p ENDSSSSSSSS ==================================






	$('.jsSliderLinks').slick({
		infinite: false,
		slidesToShow: 3,
		slidesToScroll: 1,
		arrows: true,
		dots: false,
		adaptiveHeight: false,
		prevArrow: '<div class="slider__arrow slider__arrow_prev"></div>' ,
		nextArrow: '<div class="slider__arrow slider__arrow_next"></div>',
		responsive: [
			{
				breakpoint: 575,
				settings: {
					slidesToShow: 2
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1
				}
			}
		]
	});


	 $('.jsAccordBtn').on('click', function() {
		var thisPar = $(this).closest('.jsAccordItem');
		if (!thisPar.hasClass('active')) {
			thisPar.addClass('active');
			thisPar.find('.jsAccordBody').slideDown(200);
		} else {
			thisPar.removeClass('active');
			thisPar.find('.jsAccordBody').slideUp(300);
			}
	})



	 $('.jsManuFacSlider').slick({
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		asNavFor: '.jsManuFacThumbs',
		dots: false,
		fade: true,
	   	prevArrow: '<div class="slider__arrow slider__arrow_prev"></div>' ,
		nextArrow: '<div class="slider__arrow slider__arrow_next"></div>',
		adaptiveHeight: true,
		responsive: [
			{
				breakpoint: 768,
					settings: {
						fade: false,
						arrows: false,
						dots: true
					}
			}
		]
	});

	$('.jsManuFacThumbs').slick({
		infinite: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		asNavFor: '.jsManuFacSlider',
		dots: false,
		focusOnSelect: true,
		// centerMode: true,
		arrows: false,
		responsive: [
			{
				breakpoint: 767,
					// settings: "unslick"

			}
		]
	});
	// CARD SLIDER ENDS==============================================================


	$('.jsStaffSlider').slick({
		infinite: false,
		slidesToShow: 4,
		slidesToScroll: 1,
		dots: false,
		prevArrow: '<div class="slider__arrow slider__arrow_prev"></div>',
		nextArrow: '<div class="slider__arrow slider__arrow_next"></div>',
		arrows: true,
		responsive: [
			{
				breakpoint: 1200,
					settings: {
						slidesToShow: 3,
					}
			},
			{
				breakpoint: 576,
					settings: {
						slidesToShow: 2,
					}
			},
			{
				breakpoint: 375,
					settings: {
						slidesToShow: 1,
					}
			}
		]
	});	




  //   $('.jsSliderDirectors').slick({
		// infinite: false,
		// slidesToShow: 3,
		// slidesToScroll: 1,
  //	   dots: false,
  //	   prevArrow: '<div class="slider__arrow slider__arrow_prev"></div>',
		// nextArrow: '<div class="slider__arrow slider__arrow_next"></div>',
  //	   arrows: false,
  //	   responsive: [
		// 	{
		// 		breakpoint: 768,
		// 			settings: {
		// 				slidesToShow: 1,
		// 				dots: true
		// 			}
		// 	}
		// ]
  //   });	



  	$slick_slider1 = $('.jsSliderDirectors');

	settings_slider1 = {
		prevArrow: '<div class="slider__arrow slider__arrow_prev"></div>' ,
		nextArrow: '<div class="slider__arrow slider__arrow_next"></div>',
		arrows: false,
		dots: true,
		responsive: [
			{
				breakpoint: 768,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
					}
			}

		]
	}

	slick_on_mobile1($slick_slider1, settings_slider1);

	function slick_on_mobile1(slider, settings){
		$(window).on('load resize', function() {
		  if ($(window).width() >= 768) {
			if (slider.hasClass('slick-initialized')) {
			  slider.slick('unslick');
			}
			return;
		  }
		  if (!slider.hasClass('slick-initialized')) {
			return slider.slick(settings);
		  }
		});
	};




















	$('.jsPopUpImgTitle').magnificPopup({
		// delegate: 'a',
		type: 'image',
		closeOnContentClick: false,
		closeBtnInside: false,
		// tLoading: 'Loading image #%curr%...',
		mainClass: 'mfp-with-zoom mfp-img-mobile mfp-fade mfp-stuff',
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0,1] // Will preload 0 - before current, and 1 after the current image
		},
		image: {
			titleSrc: function(item) {
				return item.el.attr('title');
			}
		},
			zoom: {
				enabled: true,
				duration: 250, 
				opener: function(element) {
					return element.find('img');
				}
			}
	});

	setTimeout(function(){
		$('.jsCustomSelectSearch').chosen({no_results_text: "Ничего не найдено"}); 
		$('.chosen-results').each(function() {
			$(this).addClass('scrollbar-inner');
		});
	},1)


	setTimeout(function(){
		$('.calculator-item__input .chosen-results').scrollbar();
	}, 10)
	


	// accord

	if ($(window).width() < 768) {


		$('.tabs-body_delivery .jsAccordItem').on('click', function() {
			var thisPar = $(this);
			if (!thisPar.hasClass('active')) {
				$('.jsAccordItem').removeClass('active');
				thisPar.addClass('active');
				$('.jsAccordBody').slideUp(350).removeClass('is_active');
				thisPar.siblings('.jsAccordBody').addClass('is_active').slideDown(300);


			} else {
				thisPar.removeClass('active');
				thisPar.siblings('.jsAccordBody').slideUp(350).removeClass('is_active');;
			}
		})
	}

	// accord ENDS ======================================================


	$('.form-delivery-count .jsCustomSelectSearch').chosen({no_results_text: "Ничего не найдено"}); 


	 // табы  DELIVERY
	$('.jsTabsBtnDel').on('click', function() {
		var 	tabContainer = $(this).closest('.jsTabs'),
				tabContentItem = tabContainer.find('.jsTabItemDel'),
				tabActive = tabContentItem.filter('.active'),
				ndx = $(this).index(),
				reqItem = tabContentItem.eq(ndx);


		if (!$(this).hasClass('active')) {
			$(this).siblings().removeClass('active').end().addClass('active');
			tabContentItem.removeClass('active');
			reqItem.addClass('active');
		}


	})
	// табы DELIVERY ENDS====================================



	// удалить из favorite
	// $('.jsDeleteFavoriteItem').on('click',  function() {
	// 	$(this).closest('.jsProductFavorite').slideUp(350, function(){
	// 		$(this).remove();


	// 		// пересчитываем позицию липкого блока
	// 			if ( $('.airSticky').length > 0) {
	// 				$('.airSticky').trigger('render.airStickyBlock');
	// 			}
	// 		// пересчитываем позицию липкого блока ENDSSS

			


	// 		if ($('.jsProductFavorite').length < 1) {
	// 			$('.jsEmptyFavorite').delay(300).fadeIn(350);
	// 		}
	// 	});
	// });

	// удалить из favorite ENDS =======================================
	

	// переход по ссылке при нажатии на кнопку  jsLinkedBtn
	$('body').on('click', '.jsLinkedBtn', function() {
		var customLink = $('.jsLinkedSelect').val();
		window.open(customLink, '_blank');
	});
	// переход по ссылке при нажатии на кнопку  jsLinkedBtn ENDS =======================================



	// $('.jsDeleteFromCart').on('click', function(event) {
	// 	event.preventDefault();
	// 	$(this).closest('.jsSizeItem').slideUp(300, function(){
	// 		$(this).remove();
	// 		cartItemsCount();
	// 		if ($('.jsSizeCart .jsSizeItem').length < 1) {
	// 			$('.jsCartBlock').fadeOut(350, function(){
	// 				$('.jsEmptyFavorite').delay(250).fadeIn(400);
	// 			})
	// 		}
	// 		cartItemsCount();
	// 	});
	// });



	// $('.jsSizeCart .jsWeightChange, .jsSizeCart .jsAmountChange').on('click',  function() {
	// 	cartItemsCount();
	// });


	// $('.jsSizeCart .jsInputAmount, .jsSizeCart .jsInputWeight').on('change',  function() {
	// 	cartItemsCount();
	// });


	// jsSizeCart


	// jsCartOrderBlock

	$('.jsAnimInput input, .jsAnimInput textarea').on('focus', function() {
		$(this).closest('.jsAnimInput').addClass('is_active');
	});

	$('.jsAnimInput input, .jsAnimInput textarea').on('focusout', function() {
		if ($(this).val().length == 0) {
			$(this).closest('.jsAnimInput').removeClass('is_active');
		}
	});

	// jsCartOrderBlock

	$('.tabs_order .jsTabsBtn').on('click', function() {
		if (!$('.jsOrderFooter').hasClass('active')) {
			$('.jsOrderFooter').addClass('active');
		}
	});




	// вычесялем IE 

	function getInternetExplorerVersion()
	{
		var rv = -1;
		if (navigator.appName == 'Microsoft Internet Explorer')
		{
			var ua = navigator.userAgent;
			var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
			if (re.exec(ua) != null)
				rv = parseFloat( RegExp.$1 );
		}
		else if (navigator.appName == 'Netscape')
		{
			var ua = navigator.userAgent;
			var re  = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
			if (re.exec(ua) != null)
				rv = parseFloat( RegExp.$1 );
		}
		return rv;
	}

	if(getInternetExplorerVersion()!==-1){
		$('body').addClass('it_explorer');
	}

	// вычесялем IE  ENDS ================================================



	// первы ШАГ Заказа  input validate

	$('.jsOrderFirstStep').on('submit', function(event) {
		event.preventDefault();
	 });


	// первы ШАГ Заказа  input validate  ENDS ======================


	// order form input validate

	$('.jsOrderForm').on('submit', function(event) {
		event.preventDefault();

		// если активный 1 таб

		if ($('.tabs-btns_order .jsTabsBtn.active').index() == 0) {
			hideOrderBlock();
		}

		var ok = true;
		var activeItemInput = $('.tabs-body_order .jsTabItem.active').find('.jsOrderInput');
		var customSelect = $('.jsTabItemOther.active').find('.jsCustomSelectSearch');

		// если активный 2 таб

		if ($('.tabs-btns_order .jsTabsBtn.active').index() == 1) {

			activeItemInput.each(function() {
				if ($(this).val() == "") {
					ok = false;
					$(this).addClass('is_empty');
				} else {
					$(this).removeClass('is_empty');
				}
			})

			if (ok) {
			   hideOrderBlock();
			} else {
				$('.jsTabItem.active .is_empty').first().focus();
			}
		}


		// если активный 3 таб

		if ($('.tabs-btns_order .jsTabsBtn.active').index() == 2) {
			// если активный таб с возовозом
			if ($('.tabs_tk .jsTabsBtnOther.active').index() == 0) {
				
				customSelect.each(function() {
					if ($(this).find('option:selected').index() == 0) {
						ok = false;
						$(this).siblings('.chosen-container').addClass('is_empty');
						$('html, body').stop().animate({scrollTop: $('.jsTabsOther').offset().top - 100}, 500);
					} 
				})
				if (ok) {
				   hideOrderBlock();
				} 
			}

			// если активный таб с транспортной компанией

			if ($('.tabs_tk .jsTabsBtnOther.active').index() == 1) {
				activeItemInput.each(function() {
					if ($(this).val() == "") {
						ok = false;
						$(this).addClass('is_empty');
					} else {
						$(this).removeClass('is_empty');
					}
				})

				if (ok) {
					hideOrderBlock();
				} else {
					$('.jsTabItemOther.active .is_empty').first().focus();
				}
			}
		}
	});

	function hideOrderBlock(){
		 $('.jsOrderBlock').fadeOut(450, function() {
		 	$('html, body').stop().animate({scrollTop: $('body').offset().top}, 500, function(){
		 		$('.jsEmptyFavorite').delay(150).fadeIn(450);
		 	});
		})
	}



	$('.jsOrderInput').on('keyup', function(event) {
		if (!$(this).val() == "" && $(this).hasClass('is_empty')) {
			$(this).removeClass('is_empty');
		}
	});



	$('body').on('click', '.jsTabItemOther .chosen-results li', function() {
		if ($(this).closest('.chosen-container').hasClass('is_empty')) {
			$(this).closest('.chosen-container').removeClass('is_empty');
		}
	});


	$('.tabs-btns_order .jsTabsBtn').on('click', function() {
		if ($(window).width() < 991) {

			$('html, body').stop().animate({scrollTop: $('.tabs-body_order').offset().top - 100}, 500);
			
		}
	});


	// order form input validate ENDS==============================================================================


	// fixed aside cart

	if ($(window).width() > 991) {
		$('.airSticky').airStickyBlock({
			stopBlock: '.airSticky_stop-block',
			offsetTop: 90
		});
	} 
	// fixed aside cart ENDS =======================================================================================
	


	// CARD FIXED MOBILE
	function fixedMobile() {
		if ($(window).width() < 992) {
			if ($('.jsCardAside').length > 0) {
				var distance = $('.jsCardAside').offset().top;
				var wHeight = $(window).height();
				var scrollTop = $(window).scrollTop();
				var pereM = wHeight + scrollTop;

				if (pereM <= distance) {
					$('.jsCartOrderBlock').addClass('is_fixed');
				} else if ( (pereM - $('.jsCartOrderBlock').outerHeight() ) > distance) {
					$('.jsCartOrderBlock').removeClass('is_fixed');
				}
			}
		}
	}
	fixedMobile();
	// CARD FIXED MOBILE ENDS



	// privat menu

	function privatDropDown() {
		var height = $('.jsPrivatHeader').outerHeight();

		if ($(window).width() > 575 && $(window).width() < 992) {
			$('.jsPrivatDropDown').css({height: height});
			$('.jsPrivatDropDown li.active a').css({height: height});
		}


		$('.jsPrivatDropDown li.active').on('click', function(event) {
			event.preventDefault();
			$('.jsPrivatNav').toggleClass('active');
		});
	}

	privatDropDown()

	// privat menu

	$('.jsPrivatAccordBtn').on('click', function() {
		$(this).toggleClass('active');
		$(this).siblings('.jsPrivatAccordItem').slideToggle(350, function(){

			// пересчитываем позицию липкого блока
			if ( $('.airSticky').length > 0) {
				$('.airSticky').trigger('render.airStickyBlock');
			}
			// пересчитываем позицию липкого блока ENDSSS
		});
	});



	// удалить адресс 
	$('.jsDeleteFromAddress').on('click',  function() {
		$(this).closest('.jsAddressItem').slideUp(350, function(){
			$(this).remove();
			if ($('.jsAddressItem').length < 1) {
				$('.jsEmptyFavorite').delay(300).fadeIn(350);
			}
		});
	});
	// удалить адресс  ENDS =======================================


	$('.jsFormPersonalTrigger').on('click', function() {
		$(this).closest('.form-personal__row').addClass('active');
		$(this).closest('.form-personal__row').find('input').focus();
	});



	// MASK INPUT
		$('.jsBirthDateMask').mask('99.99.9999');
	// MASK INPUT ENDS============================================






	$('.jsArticleTable th, .jsArticleTable td').hover(

		
		function(){

			var index = $(this).index()
			var tr = $(this).closest('.jsArticleTable').find('tr');

			$(this).addClass('is_hover_target');

			tr.each(function() {
				$(this).find('td').eq(index).addClass('is_hover');
				$(this).find('th').eq(index).addClass('is_hover')
			});


		},
		function(){
			var index = $(this).index()
			var tr = $(this).closest('.jsArticleTable').find('tr');

			$(this).removeClass('is_hover_target');

			tr.each(function() {
				$(this).find('td').eq(index).removeClass('is_hover')
				$(this).find('th').eq(index).removeClass('is_hover')
			});
			
	});


	$('.jsSliderInteresting').slick({
		infinite: false,
		slidesToShow: 2,
		slidesToScroll: 1,
		arrows: true,
		dots: false,
		adaptiveHeight: false,
		prevArrow: '<div class="slider__arrow slider__arrow_prev"></div>' ,
		nextArrow: '<div class="slider__arrow slider__arrow_next"></div>',
		responsive: [
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 1
				}
			}
		]
	});


	$('.jsSearchTab').on('click',  function() {

		var index = $(this).index();

		$(this).siblings().removeClass('active').end().addClass('active');

		if ($(this).hasClass('jsSearchTabAll')) {
			$('.jsSearchItem').addClass('active')
		} else {
			$('.jsSearchItem').removeClass('active').eq(index - 1).addClass('active')
		}
		
	});



	//  tabs СТАНДАРТЫ

	function tabStandarts() {
		if ($(window).width() < 2000 &&  $(window).width() > 767) {
			$('.jsStandartCol').first().addClass('active');

			$('.jsStandartTabs').on('click', function() {
				var  ndx = $(this).index();

				$(this).addClass('active')
					.siblings()
					.removeClass('active');

				$('.jsStandartCol').removeClass('active');
				$('.jsStandartCol').eq(ndx).addClass('active');	
			});
		} else if ($(window).width() < 767) {
			$('.jsStandartCol').first().removeClass('active');

			$('.jsStandartBlockTitle').on('click', function() {
				if (!$(this).hasClass('active')) {
					$('.jsStandartBlockTitle').removeClass('active');
					$(this).addClass('active');
					$('.standrats-block__list').slideUp(350);
					$(this).siblings('.standrats-block__list').slideDown(350)
				} else {
					$(this).removeClass('active');
					$(this).siblings('.standrats-block__list').slideUp(350)
				}
			});
		}
	}

	tabStandarts();


	// calc

	function calcInit() {
		$('body').on('change', '.jsSelectSection', function() {
			var dataFlag = $(':selected', this).data('flag');
			if (dataFlag === true) {
				$(this).closest('.jsCalcItem').find('.jsLengthSelect').addClass('it_disable');
			}	else {
				$(this).closest('.jsCalcItem').find('.jsLengthSelect').removeClass('it_disable');
			}
		});

		var pf_weight = new Intl.NumberFormat(
			['en-GB'],
			{
				useGrouping: false,
				minimumIntegerDigits: 1,
				minimumFractionDigits: 3,
				maximumFractionDigits: 3,
			}
		);

		function calcTotalWeight() {
			var totalWeight = 0;
			$('.jsCalcResultWeight').each(function() {
				var t = $(this).text();
				totalWeight += parseFloat(t.slice(0, t.indexOf(" ")));
			});
			$('.jsCalcTotalWeight').html(parseFloat(pf_weight.format(totalWeight)) + " кг");
		}

		function chaneHtmlToZero(that) {
			that.closest('.jsCalcItem').find('.jsCalcResultWeight').html(0 + ' кг');
			that.closest('.jsCalcItem').find('.jsCalcResultAmount').html(0 + ' шт');
		}

		function chaneHtmlToZeroReverse(that) {
			that.closest('.jsCalcItem').find('.jsCalcResultWeight').html(0 + ' кг');
			that.closest('.jsCalcItem').find('.jsCalcResultAmount').html(0 + ' шт');
		}

		function calcDivision(number, counter,that) {
			totalNumber = parseFloat(pf_weight.format(parseInt(number) / counter));
			that.closest('.jsCalcItem').find('.jsCalcResultWeight').html(number + " кг");
			that.closest('.jsCalcItem').find('.jsCalcResultAmount').html(totalNumber + " шт");
		}

		function calcMulti(number, counter, that) {
			totalNumber = parseFloat(pf_weight.format(parseInt(number) * counter));
			that.closest('.jsCalcItem').find('.jsCalcResultWeight').html(totalNumber + " кг");
			that.closest('.jsCalcItem').find('.jsCalcResultAmount').html(number + " шт");
		}

		function doSumm(that, target) {
			var selectChosen = that.closest('.jsCalcItem').find('.' + target);
			var selectType = that.closest('.jsCalcItem').find('.jsCalcItemKind');
			var inputSelected = that.closest('.jsCalcItem').find('.jsCalcInputAmount');

			if ($(':selected', selectType).data('type') === "weightToAmount") {
				inputSelected.attr('placeholder', "Введите вес в кг");
				if ((inputSelected.val() != "") && (inputSelected.val() != 0)) {
					calcDivision(inputSelected.val(), $(':selected', selectChosen).data('weight'), that);
				} else {
					chaneHtmlToZero(that)
				}
			} else {
				if ((inputSelected.val() != "") && (inputSelected.val() != 0)) {
					calcMulti(inputSelected.val(), $(':selected', selectChosen).data('weight'), that);
				} else {
					chaneHtmlToZeroReverse(that)
				}
			}
			calcTotalWeight();
		}

		$('body').on('change', '.jsCalcItem .jsCustomSelectSearch', function() {
			var thisClosest = $(this).closest('.jsCalcItem');
			var parentCol = $(this).closest('.calculator-item__col');
			var calcSectionSelect = thisClosest.find('.jsSelectSection');
			var calcTypeSelect = thisClosest.find('.jsSelectType');
			var calcSizeSelect = thisClosest.find('.jsSelectSize');
			var calcLengthSelect = thisClosest.find('.jsLengthSelect');
			var calcItemKindSelect = thisClosest.find('.jsCalcItemKind');
			var calcAmountInput = thisClosest.find('.jsCalcInputAmount');
			var calcBlockInfo = thisClosest.find('.jsCalcItemInfo');
			var calcResultBlock = thisClosest.find('.jsCalcResultBlock');
			var calcResultWeight = thisClosest.find('.jsCalcResultWeight');
			var calcResultAmount = thisClosest.find('.jsCalcResultAmount');
			var calcLengthOn = (calcLengthSelect.hasClass('it_disable')) ? 0 : 1;

			function calcInfoBlockShow(id) {
				// if (!calcBlockInfo.hasClass('active')) {
				// 	calcBlockInfo.slideDown(300).addClass('active');
				// } else {
				// 	calcBlockInfo.slideUp(300).delay(300).slideDown(300);
				// }
				if (id) {
					var timeOut = 1;
					if (calcBlockInfo.hasClass('active')) {
						timeOut = 300;
						calcBlockInfo.slideUp(timeOut);
					}
					setTimeout(function() {
						$.ajax({
							type: 'POST',
							url: document.location.href,
							dataType: 'json',
							cache: false,
							data: {
								action: 'getCalcResource',
								resource: id
							},
							beforeSend: function() {
								thisClosest.addClass('wait');
								calcBlockInfo.html('');
							},
							complete: function() {								
								thisClosest.removeClass('wait');
							},
							error: function(jqXHR, textStatus, errorThrown) {
								console.log('ОШИБКИ AJAX запроса: ' + textStatus);
							},
							success: function(response, textStatus, jqXHR) {
								if (response.error) {
									console.log('ОШИБКА! Ответ сервера: ' + response.error);
								} else if (response.result) {
									calcBlockInfo.append(response.result);
									calcBlockInfo.slideDown(300).addClass('active');								
								}
							}
						});
					}, timeOut);
				}

				// if (!calcBlockInfo.hasClass('active')) {
				// 	calcBlockInfo.slideDown(300).addClass('active');
				// } else {
				// 	calcBlockInfo.slideUp(300).delay(300).slideDown(300);
				// }
			}

			function calcInfoBlockHide() {
				calcBlockInfo.slideUp(300).delay(300).removeClass('active');
			}

			function calcSelectClear(select) {
				if (select.length > 0 /*&& !select.hasClass('disable')*/){
					select.prop('selectedIndex', 0);
					select.trigger('chosen:updated');
					select.addClass('disable');
					calcAmountInput.attr('placeholder', "Введите вес в кг");							
				} 
			}

			function calcAmountClear() {
				calcAmountInput.val('');
				calcAmountInput.addClass('disable');	
			}

			function calcResultClear() {
				calcResultWeight.html(0 + ' кг');
				calcResultAmount.html(0 + ' шт');
			}
			
			if (!$(this).find('.chosen-results li').hasClass('result-selected')) {
				if ($(this).hasClass('jsSelectSize')) {
					// Выбор размера
					if (calcLengthOn) {
						thisClosest.addClass('wait');
						var calcLengthStr = $(':selected', this).data('length');
						calcLengthSelect.html('<option value="0" selected></option>');
						if (calcLengthStr) {
							calcLengthArray = calcLengthStr.split('||');
							calcLengthArray.forEach(function(lengthStr) {
								var lengthArray = lengthStr.split('::');
								calcLengthSelect.append('<option value="' + lengthArray[0] + '" data-weight="' + lengthArray[2] + '">' + lengthArray[1] + '</option>');
							});
						}
						setTimeout(function() {
							parentCol.nextAll().each(function(index, el) {
								calcSelectClear($(this).find('.jsCustomSelectSearch'));
							});
							calcAmountClear();
							calcResultClear();
							calcInfoBlockHide();
							calcLengthSelect.removeClass('disable');
							thisClosest.removeClass('wait');
						}, 500);
					} else {
						if (calcAmountInput.val() === '') {
							calcItemKindSelect.removeClass('disable');
							calcAmountInput.removeClass('disable').delay(150);
							setTimeout(function(){
								calcAmountInput.focus();
							}, 10)
						} else {
							doSumm($(this), 'jsSelectSize');
						}
						calcInfoBlockShow($(':selected', this).val());
					}
				} else if ($(this).hasClass('jsLengthSelect')){ 
					if (calcAmountInput.val() === '') {
						calcItemKindSelect.removeClass('disable');
						calcAmountInput.removeClass('disable').delay(150);
						setTimeout(function(){
							calcAmountInput.focus();
						}, 10)
					} else {
						doSumm($(this), 'jsLengthSelect');
					}
					calcInfoBlockShow($(':selected', this).val());
				} else if ($(this).hasClass('jsCalcItemKind')) {
					if ($(':selected', $(this)).data('type') === "weightToAmount") {
						calcAmountInput.attr('placeholder', "Введите вес в кг");
					} else {
						calcAmountInput.attr('placeholder', "Введите количество в шт");
					}
					if (calcAmountInput.val() === '') {
						setTimeout(function() {
							calcAmountInput.focus();
						}, 10)
					} else {
						if (calcLengthOn) {
							doSumm($(this), 'jsLengthSelect');
						} else {
							doSumm($(this), 'jsSelectSize');
						}
					}
				} else if ($(this).hasClass('jsSelectSection')) {
					// Выбор раздела
					var calcSection = $(':selected', this).val();
					if (calcSection) {
						$.ajax({
							type: 'POST',
							url: document.location.href,
							dataType: 'json',
							cache: false,
							data: {
								action: 'getCalcProducts',
								section: calcSection
							},
							beforeSend: function() {
								thisClosest.addClass('wait');
								calcTypeSelect.html('<option value="0" selected></option>');
							},
							complete: function() {								
								parentCol.nextAll().each(function(index, el) {
									calcSelectClear($(this).find('.jsCustomSelectSearch'));
								});
								calcAmountClear();
								calcResultClear();
								calcInfoBlockHide();
								calcTypeSelect.removeClass('disable');
								setTimeout(function() {
									thisClosest.removeClass('wait');
								}, 150);
							},
							error: function(jqXHR, textStatus, errorThrown) {
								console.log('ОШИБКИ AJAX запроса: ' + textStatus);
							},
							success: function(response, textStatus, jqXHR) {
								if (response.error) {
									console.log('ОШИБКА! Ответ сервера: ' + response.error);
									calcTypeSelect.attr('data-placeholder', 'Крепежи не найдены');
								} else if (response.result) {
									calcTypeSelect.attr('data-placeholder', 'Выберите крепеж');
									$.each(response.result, function (i, result) {
										if (result.product) {
											calcTypeSelect.append('<option value="' + result.product + '">' + result.title + '</option>');
										}
									});									
								}
							}
						});
					}		
				} else if ($(this).hasClass('jsSelectType')) {
					// Выбор крепежа
					var calcType = $(':selected', this).val();
					//console.log(calcType);
					if (calcType) {
						$.ajax({
							type: 'POST',
							url: document.location.href,
							dataType: 'json',
							cache: false,
							data: {
								action: 'getCalcSizes',
								product: calcType,
								length_on: calcLengthOn
							},
							beforeSend: function() {
								thisClosest.addClass('wait');
								calcSizeSelect.html('<option value="0" selected></option>');
							},
							complete: function() {							  
								parentCol.nextAll().each(function(index, el) {
									calcSelectClear($(this).find('.jsCustomSelectSearch'));
								});
								calcAmountClear();
								calcResultClear();
								calcInfoBlockHide();
								calcSizeSelect.removeClass('disable');
								setTimeout(function() {
									thisClosest.removeClass('wait');
								}, 150);
							},
							error: function(jqXHR, textStatus, errorThrown) {
								console.log('ОШИБКИ AJAX запроса: ' + textStatus);
							},
							success: function(response, textStatus, jqXHR) {
								if (response.error) {
									console.log('ОШИБКА! Ответ сервера: ' + response.error);
									calcSizeSelect.attr('data-placeholder', 'Размеров не найдено');
								} else if (response.result) {
									calcSizeSelect.attr('data-placeholder', 'Выберите размер');
									$.each(response.result, function (i, result) {
										if (calcLengthOn) {
											var value = [];
											for (var key in result) {
												value.push(result[key].id + '::' + result[key].length + '::' + result[key].weight);
											}
											calcSizeSelect.append('<option value="' + i + '" data-length="' + value.join('||') + '">' + i + '</option>');
										} else {
											if (result.weight) {
												calcSizeSelect.append('<option value="' + result.id + '" data-weight="' + result.weight + '">' + result.title + '</option>');
											}
										}
									});								 
								}
							}
						});
					}
				}
			} 
		});

		$('body').on('keyup', '.jsCalcInputAmount', function(event) {
			var that = $(this);
			this.value = this.value.replace (/[^0-9]/, '');
			if (that.closest('.jsCalcItem').find('.jsLengthSelect').hasClass('it_disable')) {
				doSumm(that, 'jsSelectSize');
			} else {
				doSumm(that, 'jsLengthSelect');
			}
		});


		// Add & Delete item calc
		var cloneCalcItem = $('.jsCalcItem').first().clone(true);

		function calcItemsCount() {
			$('.jsCalcItem').each(function(index, el) {
				var thisIndex = $(this).index() + 1;
				$(this).find('.jsCalcculatorHeader span').html(thisIndex);
			});
		}

		function calcItems(){
			if ($('.jsCalcItem').length == 1) {
				$('.jsCalcculatorHeader').slideUp(250);
				$('.jsCalcItemDelete').addClass('disable');
			} else {
				$('.jsCalcculatorHeader').slideDown(250);
				$('.jsCalcItemDelete').removeClass('disable');
			}
		}

		$('body').on('click', '.jsAddCalcItem', function() {
			$('.jsCalcItem').last().after(cloneCalcItem.clone(true).hide(1).delay(150).slideDown(350));

			$('.jsCalcItem').last().find('.jsCustomSelectSearch').chosen({no_results_text: "Ничего не найдено"});
			$('.jsCalcItem').last().find('.chosen-results').addClass('scrollbar-inner').scrollbar();

			cloneCalcItem.find('.jsCalcInputAmount').val('');
			calcItemsCount();
			calcItems();
		});

		$('body').on('click', '.jsCalcItemDelete',function(event) {
			if ($('.jsCalcItem').length > 1) {
				$(this).closest('.jsCalcItem').slideUp(300, function(){
					$(this).remove();
					calcItemsCount();
					calcItems();
					calcTotalWeight();
				});
			}
		});

		// Calc submit
		$('body').on('submit', '.jsCalcForm', function(event) {
			event.preventDefault();
			var productsIds = [];
			$('.jsCalcItemInfo a').each(function() {
				productsIds.push($(this).data('product'));
			});
			if (productsIds.length > 0) {
				$('.jsFormCalcProducts').val(productsIds.join(','));
			}
			$('#modal-calc').modal('show');
		});
	}

	calcInit();

	// calc ENDS ========




	// RAl

	$('.jsRalItem:gt(11)').slideUp(1);

	$('.jsShowRal').on('click' , function(event) {
		event.preventDefault();
		if (!$(this).hasClass('active')) {
			$(this).addClass('active').find('span').html('Скрыть таблицу');
		} else {
			$(this).removeClass('active').find('span').html('Показать всю таблицу');
			$('html, body').stop().animate({scrollTop: $(this).closest('.section-ral').offset().top - 33}, 500);
		}
		$('.jsRalItem:gt(11)').slideToggle(350);
	});



	// standarts items show/hide
	$('.jsEncycLink').on('click', function(event) {
		event.preventDefault();
		var href = $(this).attr('href');
		var hidenBlocks = $(this).closest('.encyc-item').find('.encyc-item__hidden .hidden-item');
		var links = $(this).closest('.encyc-item').find('.jsEncycLink');

		if (!$(this).hasClass('active')) {
			links.removeClass('active');
			hidenBlocks.fadeOut(350);
			$(this).addClass('active');
			hidenBlocks.filter($(href)).fadeIn(350);
		} else {
			$(this).removeClass('active');
			hidenBlocks.fadeOut(350);
		}
	});

	$('.jsCloseItem').on('click', function() {
		$(this).closest('.jsEncyclItem').fadeOut(400);
		$(this).closest('.encyc-item').find('.jsEncycLink').removeClass('active');
	});	
});



