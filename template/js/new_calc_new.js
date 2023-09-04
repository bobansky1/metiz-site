$(document).ready(function() {
	$('.jsInputCalc').on("input", function() {
		getTotalResult();
	});
	$('.jsCalcRadio').on("change", function() {
		getTotalResult();
	});
	
	var gridColSortTypes = [], 
		gridColAlign = [];
	
	var onColumnSort = function(newIndexOrder, columnIndex, lastColumnIndex) {
		var offset = (this.options.allowSelections && this.options.showSelectionColumn) ? 1 : 0, 
			doc = document;
		
		if (columnIndex !== lastColumnIndex) {
			if (lastColumnIndex > -1) {
				doc.getElementById("demoHdr" + (lastColumnIndex - offset)).parentNode.style.backgroundColor = "";
			}
			doc.getElementById("demoHdr" + (columnIndex - offset)).parentNode.style.backgroundColor = "#f7f7f7";
		}
	};
	
	var onResizeGrid = function(newWidth, newHeight) {
		var demoDivStyle = document.getElementById("demoDiv").style;
		demoDivStyle.width = newWidth + "px";
		demoDivStyle.height = newHeight + "px";
	};
	
	var myGrid;
	
	$('.jsCalcLeftTop li a').on('click', function(e) {
		e.preventDefault();
		var file_name = $(this).data('link');
		$.ajax({
			type: 'POST',
			url: document.location.href,
			dataType: 'json',
			cache: false,
			data: {
				action: 'getExcelCalcContentNew',
				link: file_name,
			},
			beforeSend: function() {
				//
			},
			complete: function() {
				//			
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log('ОШИБКИ AJAX запроса: ' + textStatus + ' ' + errorThrown);
			},
			success: function(response, textStatus, jqXHR) {
				$('.jsInputCalc').val('');
				if (response.error) {
					console.log('ОШИБКА! Ответ сервера: ' + response.error);
					$('.jscalcTableContent').html('<div class="error_calc">' + response.error + '</div>');
					$('.get_the_table_row').hide();
				} else {
					$('.jscalcTableContent').html(response.content);
					$('.get_the_table_row').show();
						
						myGrid = new Grid("demoGrid_" + file_name, {
							srcType : "dom", 
							srcData : file_name, 
							allowGridResize : true, 
							allowColumnResize : true, 
							allowClientSideSorting : true, 
							allowSelections : true, 
							allowMultipleSelections : true, 
							showSelectionColumn : true, 
							onResizeGrid : onResizeGrid, 
							colBGColors : ["#ffad27"],
							fixedCols : 1,
							colSortTypes: []
						});
						
						$('.g_BodyStatic .fullcell').not('.select').on('click', function() {
							$('.fullcell').removeClass('select');
							$(this).addClass('select');
							$('.jsInputCalc').attr('data-weight', $(this).data('weight'));
							getTotalResult();
							$('html, body').animate({
					            scrollTop: $('.anchor_scroll').offset().top
					        }, 700);
						});
					
					if (response.productlist) {
						$('#calc-product').html(response.productlist);
					}

				}
			}
		});
		$('html, body').animate({
            scrollTop: $('.anchor_scroll_pre').offset().top
        }, 700);
	});
});

function getTotalResult() {
	var check  = $('.jsCalcRadio:checked').val();
	var $input = $('.jsInputCalc');
	var total = 0;
	if(check == 1) {
		$('.jsInputData').html(' кг = 0 шт');
	} else{
		$('.jsInputData').html(' шт = 0 кг');
	}
	if ($.isNumeric($input.val()) && $input.attr('data-weight') != '') {
		if(check == 1) {
			total = (parseInt($input.val()) / parseFloat($input.attr('data-weight'))).toFixed(3);
			result = splitDigitGroups($input.val()) + ' кг = ' + total + ' шт';
		} else{
			total = (parseInt($input.val()) * parseFloat($input.attr('data-weight'))).toFixed(3);	
			result = $input.val() + ' шт = ' + splitDigitGroups(total) + ' кг';
		}
		$('.jsInputData').html(result);
	} else {
		$input.val('');
	}
}

function changeComment() {
	var convDir = $('.jsCalcRadio:checked').val();
	if (convDir == "2")
		$('#commentLabel').html('Конвертация количества в массу');
	else
		$('#commentLabel').html('Конвертация массы в количество');
}

function splitDigitGroups(txt) {
	return txt.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
}

$(document).ready(function() {
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
		$('#step33').show();
		$('.get_the_table_row').show();
		nameMetiz=$(this).attr('name');
		var titleMetiz=$(this).text();
		var linkMetiz=$(this).attr('case');
		$('#title_calc_text').html('<span style="font-size: 15px;">'+titleMetiz+'</span>')
		//$('#title_calc_prob').html('<a href="'+linkMetiz+'" style="font-size:14px;">'+titleMetiz+' РІ РєР°С‚Р°Р»РѕРіРµ</a><div style="margin: 20px;"></div>');
		$('#title_calc_prob').html('<a href="'+linkMetiz+'" style="font-size:12px;text-decoration: underline;">РџРѕРґСЂРѕР±РЅРѕРµ РѕРїРёСЃР°РЅРёРµ</a><br><br>');
		//$('div.calculiator_metiz_left_top div ul').hide();
		$('table.tableSizes').hide();
		$('table[name='+nameMetiz+']').show();
		$('#catalogGoods .jsCalcGoods').hide();
		goodsId = $(this).data('goods');
		$('#calcGoods-'+goodsId).show();
		//$("html,body").scrollTop($('#step3').offset().top);
	});
});