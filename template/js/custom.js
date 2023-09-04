miniShop2.Callbacks.Cart.add.response.success = function(response) {
	$('.ms2_total_position').text(response.data['total_position']);
	$('#jGrowl').css({display: 'none'});
}
miniShop2.Callbacks.Cart.change.response.success = function(response) {
	$('.ms2_total_position').text(response.data['total_position']);
}
miniShop2.Callbacks.Order.submit.before = function(resources) {
	$('.jsMsOrderBtn').attr('disabled');
	$('.jsMsOrderBtn').addClass('wait');
}
miniShop2.Callbacks.Order.submit.ajax.always = function(resources) {
	$('.jsMsOrderBtn').removeAttr('disabled');
	$('.jsMsOrderBtn').removeClass('wait');
}
/*miniShop2.Callbacks.Order.submit.response.success = function() {
	console.log('js-событие заказа отработало');
	yaCounter22705213.reachGoal('zakaz');
	gtag('event', 'otpravka_form', { 'event_category': 'zakaz', 'event_action': 'click_button', });
}*/

/*$('.jsSelectQuiz').chosen({no_results_text: "Чаще всего, калькулятор используется вами для"});
$('.jsSubmitQuiz').on('click', function() {
	setTimeout(function() {
		$('.jsSelectQuiz').chosen({no_results_text: "Чаще всего, калькулятор используется вами для"});
	}, 300);
});*/

$(document).on('af_complete', function(event, response) {
	//console.log(response);
	if (response.success === true) {
		
		if (response.form.attr('id') == "modal_sale_form") {
			var res_id = $('.jsResIdInput').val();
			//if(res_id == 33316) {
				//ym(22705213, 'reachGoal', 'form_predlozhenie_rasprodazha');
				yaCounter22705213.reachGoal('form_predlozhenie_rasprodazha');
				gtag('event', 'form_rasprodazha', { 'event_category': 'call', 'event_action': 'click_button', });
			//}
		}
		
		if (response.form.attr('id') == "main_order_form") {
			//ym(22705213, 'reachGoal', 'zayavka');
			yaCounter22705213.reachGoal('zayavka');
			gtag('event', 'otpravka_form', { 'event_category': 'zayavka', 'event_action': 'click_button', });
		}
		if (response.form.attr('id') == "callback_form") {
			yaCounter22705213.reachGoal('callback');
			gtag('event', 'zvonok', { 'event_category': 'call', 'event_action': 'click_button', });
		}
		if (response.form.attr('id') == "smeta_form") {
			//ym(22705213, 'reachGoal', 'smeta');
			yaCounter22705213.reachGoal('smeta');
			gtag('event', 'otpravka_form', { 'event_category': 'smeta', 'event_action': 'click_button', });
		}
		if (response.form.attr('id') == "director_form") {
			yaCounter22705213.reachGoal('director');
		}
		if (response.form.attr('id') == "one_click_form") {
			yaCounter22705213.reachGoal('click_send');
			gtag('event', 'otpravka_form', { 'event_category': '1click_send', 'event_action': 'click_button', });
		}
		grecaptchaExecute();
		formHeight($(response.form));
		formSubmitSuccess($(response.form));
	}
	return true;
});

function incline(words, number) {
	// words	=> 3-и варианта склонения существительного по правилу 1, 2, 5;
	// number   => само число
	return words[(((number % 100) > 4) && ((number % 100) < 20)) ? 2 : [2, 0, 1, 1, 1, 2][Math.min((number % 10), 5)]];
}

function formHeight(form){
	var formInner = form.find('.jsFormInner');
	form.css('height', formInner.css("height"));
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

function scrollShowHide() {
	$('.page_up').removeAttr('style');
	var scrollTop = $(window).scrollTop();
	var topFooter = $('.footer').offset().top;
	var topPageUp = $('.page_up').offset().top;
	if (topPageUp > topFooter-70 && $('.page_up').hasClass('active')) {
		$('.page_up').css({position: 'absolute', top: topFooter-70, bottom: 'auto'});
	}
	if (scrollTop > 150) {
		$('.page_up').addClass('active');
	} else {
		$('.page_up').removeClass('active');
	}
}

var windowScroll_t;
$(window).scroll(function() {
	scrollShowHide();
});

/*window.onload = function(){
    var clientid = yaCounter92102616.getClientID();
    console.log(clientid);
}
*/
$(document).ready(function() {
	//Кнопка открытия чата bitrix24
	$('.jsOpenChat').on('click', function(e){
		e.preventDefault();
		$('.b24-widget-button-openline_livechat span').trigger('click');
	});
	/*ym(92102616, 'getClientID', (clientID) => {
		const location = window.location.protocol + "//" + window.location.host + window.location.pathname;
		const newLocation = location + '?clientID=' + clientID;
		console.log(clientID);
		history.pushState(null, null, newLocation);
	});*/

	
	$('.jsSubmitHover').hover(function() {
        $(this).closest('form').find('.jsHideWrap').html('<input type="hidden" name="lastname" placeholder="Фамилия" value="lastname">');
    }, function() {
        //
    });
	
	scrollShowHide();
	$('body').on('click', '.page_up', function() {
		$('html, body').animate({scrollTop: 0}, 750);
		return false;
	});

	$('body').on('click', '.jsSizeMore', function() {
		var $link = $(this);
		var $wrapper = $link.closest('.jsProductElementBottom');
		var $container = $wrapper.find('.jsMoreSizes');
		var productId = $link.data('product')*1;
		var limit = $link.data('limit');
		var resourcesIdsArray = [];
		$wrapper.find('.jsSizeItem').each(function() {
			resourcesIdsArray.push($(this).data('id'));
		});
		if ($link.data('resources')) {
			resourcesIdsArray.push($link.data('resources'));
		}
		var resourcesIds = resourcesIdsArray.join(',');
		var more = $link.data('more');
		var all = $link.data('all');

		if ($link.hasClass('done')) {
			if ($link.hasClass('op') && ($link.closest('.jsProductElement').length > 0)) {
				$('html, body').stop().animate({scrollTop: $link.closest('.jsProductElement').offset().top - 100}, 300);
			}
			$container.stop().slideToggle();
			$link.toggleClass('op');
		} else {
			if (productId > 0) {
				$.ajax({
					type: 'POST',
					url: document.location.href,
					dataType: 'json',
					cache: false,
					data: {
						action: 'getSizeCatalog',
						product: productId,
						limit: limit,
						resources: resourcesIds,
					},
					beforeSend: function() {
						$wrapper.addClass('wait');
					},
					complete: function() {
						setTimeout(function() {
							$wrapper.removeClass('wait');	
						}, 300);						
					},
					error: function(jqXHR, textStatus, errorThrown) {
						console.log('ОШИБКИ AJAX запроса: ' + textStatus);
					},
					success: function(response, textStatus, jqXHR) {
						if (response.error) {
							console.log('ОШИБКА! Ответ сервера: ' + response.error);
						} else {
							if (response.result) {
								$container.append(response.result);
							}
							if (response.result_clear) {
								$container.append(response.result_clear);	
							}
							$container.slideDown();
							if (limit > 0) {
								more -= limit;
							}
							if (more > 0) {
								$link.data('more', more);
								if (more < limit) {
									$link.find('.op').html('Еще ' + more + ' ' + incline(['размер', 'размера', 'размеров'], more));
								}
							} else {
								$link.find('.op').html('Еще ' + all + ' ' + incline(['размер', 'размера', 'размеров'], all));
								$link.addClass('done');
								$link.addClass('op');
							}
						}
					}
				});
			}
		}

		return false;
	});

	$('body.template-19 table, body.template-17 table').each(function() {
		if (!$(this).hasClass('article_table')) {
			$(this).addClass('table table_standarts');
		}
		if ($(this).closest('table-responsive').length < 1) {
			$(this).wrap("<div class='table-responsive mb-4'></div>")
		}
	});

	$('body.template-15 .content table').each(function() {
		if (!$(this).hasClass('article_table')) {
			$(this).addClass('table table_standarts mt-4 mb-5');
		}
	});

	$('.content table').each(function() {
		if ($(this).closest('table-responsive').length < 1) {
			$(this).wrap("<div class='table-responsive'></div>")
		}
	});

	$('.tabs-content_table table').each(function() {
		$(this).addClass('table table-bordered');
	});

	$('body').on('click', '.jsOrderStep_1_next', function() {
		var receiver = $('.jsOrderStep_1_form #receiver').val();
		var phone = $('.jsOrderStep_1_form #phone').val();
		var email = $('.jsOrderStep_1_form #email').val()
		var company = $('.jsOrderStep_1_form #extfld_company').val();
		var requisites = $('.jsOrderStep_1_form #extfld_requisites').val();
		var requisites_file = $('.jsOrderStep_1_form #extfld_file').val();
		var requisites_file_name = $('.jsOrderStep_1_form .jsAddBlockText').html();
		if (!receiver) {
			$('.jsOrderStep_1_form #receiver').focus();
			return false;
		}
		if (!phone) {
			$('.jsOrderStep_1_form #phone').focus();
			return false;
		}
		if (!email) {
			$('.jsOrderStep_1_form #email').focus();
			return false;
		}

		$('.jsOrderStep_1_header').addClass('order-step__header_change');
		$('.jsOrderStep_1_change').removeClass('hidden_imp');
		$('.jsOrderStep_1_form').addClass('hidden_imp');
		$('.jsOrderStep_1_data').removeClass('hidden_imp');
		$('.jsOrderStep_2_header').removeClass('order-step__header_opacity');
		$('.jsOrderStep_2_content').removeClass('hidden_imp');
		$('.jsOrderStep_2_footer').removeClass('hidden_imp');

		$('.jsOrderStep_1_data_receiver').html(receiver);
		$('.jsOrderStep_1_data_extfld_company').html(company);
		$('.jsOrderStep_1_data_phone').html(phone);
		$('.jsOrderStep_1_data_email').html(email);
		requisites_text = [];
		if (requisites) {
			requisites_text.push(requisites);
		}
		if (requisites_file) {
			requisites_text.push(requisites_file_name);
		}
		$('.jsOrderStep_1_data_extfld_requisites').html(requisites_text.join('<br>'));

		$('html, body').stop().animate({scrollTop: $('.jsOrderStep_2').offset().top - 100}, 300);

		return false;
	});

	$('body').on('click', '.jsOrderStep_1_change', function() {
		$('.jsOrderStep_1_header').removeClass('order-step__header_change');
		$('.jsOrderStep_1_change').addClass('hidden_imp');
		$('.jsOrderStep_1_form').removeClass('hidden_imp');
		$('.jsOrderStep_1_data').addClass('hidden_imp');
		$('.jsOrderStep_2_header').addClass('order-step__header_opacity');
		$('.jsOrderStep_2_content').addClass('hidden_imp');
		$('.jsOrderStep_2_footer').addClass('hidden_imp');

		return false;
	});

	// Переменная куда будут располагаться данные файлов
	var files;

	// Вешаем функцию на событие
	// Получим данные файлов и добавим их в переменную
	$('.jsFile').on('change', function() {
		files = this.files;
		event.stopPropagation(); // Остановка происходящего
		event.preventDefault();  // Полная остановка происходящего

    	// Создадим данные формы и добавим в них данные файлов из files
		var dataFiles = new FormData();
		$.each(files, function(key, value) {
			dataFiles.append(key, value);
		});
		console.log(dataFiles);

		var fileName = $(this).closest('.add-block').find('.jsAddBlockText');
		// fileName.html(this.files[0].name);

		// Отправляем запрос
		$.ajax({
			type: 'POST',
			url: document.location.href+'?action=uploadFileOrder',
			dataType: 'json',
			cache: false,
			data: dataFiles,
			processData: false, // Не обрабатываем файлы (Don't process the files)
			contentType: false, // Так jQuery скажет серверу что это строковой запрос
			beforeSend: function() {
				fileName.html('<img id="imgcode" src="/template/images/loader.gif" style="width:25px; height:25px;">');
			},
			error: function(jqXHR, textStatus, errorThrown){
				console.log('ОШИБКИ AJAX запроса: ' + textStatus + jqXHR + errorThrown);
			},
			success: function(response, textStatus, jqXHR) {
				$('#extfld_file').val('');
				fileName.html("Прикрепить файл");
				$('.errorFile').html('');
				// Если все ОК 
				if (typeof response.error === 'undefined') {
					// Файлы успешно загружены, делаем что нибудь здесь 
					$('#extfld_file').val(response.files.path);
					fileName.html(response.files.name);
					// console.log(response.files.file);
					// $('.errorFile').html(response.errorName);
				} else {
					console.log('ОШИБКИ ОТВЕТА сервера: ' + response.error + response.errorName);
					$('.errorFile').html(response.error + "<br />" + response.errorName);
				}
			}
		});

		return false;
	});
	
	$('div.calkuliator_metiz_spisok_top').click(function(){
		$('div.calkuliator_metiz_spisok_top.act').removeClass('act')
		$(this).addClass('act');
		$('div.calculiator_metiz_left_top div ul').hide();
		var choise = $(this).parent('div').children('ul');
		var height = choise.height();
		choise.show();
		$('#step2').height(height + 95 + 'px').show();
		//$("html,body").scrollTop($('#step2').offset().top);
		$('html, body').animate({
            scrollTop: $('.anchor_scroll_pre_0').offset().top
        }, 700);
	});
	
	$('div.calculiator_metiz_top a').click(function(event){
		event.preventDefault();
		$('div.calculiator_metiz_top a').removeClass('active_item');
		$(this).addClass('active_item');
		$('#step3').show();
		$('.get_the_table_row').show();
		nameMetiz=$(this).attr('name');
		var titleMetiz=$(this).text();
		var linkMetiz=$(this).attr('case');
		$('#title_calc_text').html('<span style="font-size: 15px;">'+titleMetiz+'</span>')
		//$('#title_calc_prob').html('<a href="'+linkMetiz+'" style="font-size:14px;">'+titleMetiz+' в каталоге</a><div style="margin: 20px;"></div>');
		$('#title_calc_prob').html('<a href="'+linkMetiz+'" style="font-size:12px;text-decoration: underline;">Подробное описание</a><br><br>');
		//$('div.calculiator_metiz_left_top div ul').hide();
		$('table.tableSizes').hide();
		$('table[name='+nameMetiz+']').show();
		$('#catalogGoods .jsCalcGoods').hide();
		goodsId = $(this).data('goods');
		$('#calcGoods-'+goodsId).show();
		//$("html,body").scrollTop($('#step3').offset().top);
	});
	
});