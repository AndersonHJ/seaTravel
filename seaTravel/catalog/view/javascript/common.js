function getURLVar(key) {
	var value = [];

	var query = String(document.location).split('?');

	if (query[1]) {
		var part = query[1].split('&');

		for (i = 0; i < part.length; i++) {
			var data = part[i].split('=');

			if (data[0] && data[1]) {
				value[data[0]] = data[1];
			}
		}

		if (value[key]) {
			return value[key];
		} else {
			return '';
		}
	}
}


/*-- change nav to nav sticky when screen scroll  --*/

jQuery(window).scroll(function() {
if (jQuery(this).scrollTop() > 1){  
	jQuery('nav').addClass('sticky');
	
	}
	else{
	jQuery('nav').removeClass("sticky");
	}
});



$(document).ready(function() {
	// Adding the clear Fix
	cols1 = $('#column-right, #column-left').length;
	
	if (cols1 == 2) {
		$('#content .product-layout:nth-child(2n+2)').after('<div class="clearfix visible-md visible-sm"></div>');
	} else if (cols1 == 1) {
		$('#content .product-layout:nth-child(3n+3)').after('<div class="clearfix visible-lg"></div>');
	} else {
		$('#content .product-layout:nth-child(4n+4)').after('<div class="clearfix"></div>');
	}
	
	// Highlight any found errors
	$('.text-danger').each(function() {
		var element = $(this).parent().parent();
		
		if (element.hasClass('form-group')) {
			element.addClass('has-error');
		}
	});
	// zoom
		 $(".thumbnails-image img").elevateZoom({
		 zoomType : "window",
		 cursor: "crosshair",
		 gallery:'gallery_01', 
		 galleryActiveClass: "active", 
		 imageCrossfade: true,
         responsive: true,
         zoomWindowWidth: 468,
         zoomWindowHeight: 460,
         zoomWindowOffetx: 0,
         zoomWindowOffety: 0
		 });
	// slider	 
		$(".image-additional").owlCarousel({
			navigation:true,
			pagination: false,
			slideSpeed : 500,
			goToFirstSpeed : 1500,
			autoHeight : true,
			items : 4, //10 items above 1000px browser width
			//itemsDesktop : [1000,2], //5 items between 1000px and 901px
			//itemsDesktopSmall : [900,2], // betweem 900px and 601px
			itemsDesktop : [1199,4],
			itemsDesktopSmall : [768,7],
			itemsTablet: [640,7],
			itemsMobile : [480,7],
		  });
		  //related products
		  $(".view-related").owlCarousel({
			navigation:true,
			pagination: false,
			slideSpeed : 500,
			goToFirstSpeed : 1500,
			autoHeight : false,
			items : 1, //10 items above 1000px browser width
			itemsDesktop : [1199,1],
			itemsDesktopSmall : [768,3],
			itemsTablet: [640,2],
			itemsMobile : [480,1],
			//itemsMobile : [480,1] // itemsMobile disabled - inherit from itemsTablet option
            navigationText: ['<span class="owl-prev" >Prev</span>', '<span class="owl-next" >Next</span>'],
            autoPlay:false,
		  });		
		
	// Currency
	$('#currency .currency-select').on('click', function(e) {
		e.preventDefault();

		$('#currency input[name=\'code\']').attr('value', $(this).attr('name'));

		$('#currency').submit();
	});

	// Language
	$('#language a').on('click', function(e) {
		e.preventDefault();

		$('#language input[name=\'code\']').attr('value', $(this).attr('href'));

		$('#language').submit();
	});

	/* Search */
	$('#search input[name=\'search\']').parent().find('button').on('click', function() {
		url = $('base').attr('href') + 'index.php?route=product/search';

		var value = $('header input[name=\'search\']').val();

		if (value) {
			url += '&search=' + encodeURIComponent(value);
		}

		location = url;
	});

	$('#search input[name=\'search\']').on('keydown', function(e) {
		if (e.keyCode == 13) {
			$('header input[name=\'search\']').parent().find('button').trigger('click');
		}
	});

	// Menu
	$('#menu .dropdown-menu').each(function() {
		var menu = $('#menu').offset();
		var dropdown = $(this).parent().offset();

		var i = (dropdown.left + $(this).outerWidth()) - (menu.left + $('#menu').outerWidth());

		if (i > 0) {
			$(this).css('margin-left', '-' + (i + 5) + 'px');
		}
	});

	// click grid/list
	$(document).on('click', '.grid-view', function(e){
		e.preventDefault();
		display('grid');
	});

	$(document).on('click', '.list-view', function(e){
		e.preventDefault();
		display('list');
	});
	// Product List
function display(view) {
	if (view == 'list') {
		$('#content .row > div.clearfix').remove();
		
		$('#content .product-layout').attr('class', 'product-layout product-list col-xs-12');
		$('.product-list > div').each(function(index, element) {
                html = '<div class="item-inner">';
                    html += '<div class="oc-box-content">';
                        html += '<div class="wrapper-images">';
							html += '<div class="product-images">'+ $(element).find('.product-images').html()+'</div>';
						html += '</div>';
                        html += '<div class="products">';
							html += '<div class="label-product">'+ $(element).find('.label-product').html() + '</div>';
							html += '<h2 class="product-name">'+ $(element).find('.product-name').html()+'</h2>';
							html += '<div class="price-box">'+ $(element).find('.price-box').html()+'</div>';
							html += '<div class="ratings">'+ $(element).find('.ratings').html()+'</div>';
							html += '<div class="short-des">'+ $(element).find('.short-des').html()+'</div>';
							html += '<div class="actions">'+ $(element).find('.actions').html()+'</div>';
						html += '</div>';
                    html += '</div>';
                html += '</div>';
			$(element).html(html);
		
		});
		localStorage.setItem('display', 'list');
		$('.sort-lg').find('.list-view').addClass('selected');
		$('.sort-lg').find('.grid-view').removeClass('selected');
		$('.products').addClass('col-sm-8 col-md-8 col-xs-12');
		$('.wrapper-images').addClass('col-sm-4 col-md-4 col-xs-12');

		
	} else {//Grid view
		$('#content .row > .clearfix').remove();
		
		
		
		// What a shame bootstrap does not take into account dynamically loaded columns
		cols = $('#column-right, #column-left').length;

		if (cols == 2) {
			$('#content .product-layout').attr('class', 'product-layout product-grid col-lg-6 col-md-6 col-sm-12 col-xs-12 col-mobile');

			$('#content .product-layout:nth-child(2n)').after('<div class="clearfix"></div>');
		} else if (cols == 1) {
			$('#content .product-layout').attr('class', 'product-layout product-grid col-lg-4 col-md-4 col-sm-4 col-xs-12 col-mobile');

			$('#content .product-layout:nth-child(3n)').after('<div class="clearfix"></div>');
		} else {
			$('#content .product-layout').attr('class', 'product-layout product-grid col-lg-3 col-md-3 col-sm-6 col-xs-12 col-mobile');

			$('#content .product-layout:nth-child(4n)').after('<div class="clearfix"></div>');
		}

		$('.product-grid > div').each(function(index, element) {
                html = '<div class="item-inner">';
                    html += '<div class="oc-box-content">';
                        html += '<div class="label-product">'+ $(element).find('.label-product').html() + '</div>';
                        html += '<div class="top-inner">';
							html += '<h2 class="product-name">'+ $(element).find('.product-name').html()+'</h2>';
							html += '<div class="price-box">'+ $(element).find('.price-box').html()+'</div>';
							html += '<div class="ratings">'+ $(element).find('.ratings').html()+'</div>';
							html += '<div class="short-des">'+ $(element).find('.short-des').html()+'</div>';
						html += '</div>';
                        html += '<div class="products">';
							html += '<div class="product-images">'+ $(element).find('.product-images').html()+'</div>';
							html += '<div class="actions">'+ $(element).find('.actions').html()+'</div>';
						html += '</div>';
                    html += '</div>';
                html += '</div>';
			$(element).html(html);
		});
		
		 localStorage.setItem('display', 'grid');
		 $('.sort-lg').find('.grid-view').addClass('selected');
		 $('.sort-lg').find('.list-view').removeClass('selected');
         $('.top-inner').removeClass('col-sm-8 col-md-8 col-xs-12');
		$('.products').removeClass('col-sm-4 col-md-4 col-xs-12');
	}
}

	if (localStorage.getItem('display') == 'list') {
		$('.list-view').trigger('click');
	} else {
		$('.grid-view').trigger('click');
	}

	if (localStorage.getItem('display') == 'list') {
		$('#list-view').trigger('click');
	} else {
		$('#grid-view').trigger('click');
	}

	// tooltips on hover
	$('[data-toggle=\'tooltip\']').tooltip({container: 'body'});

	// Makes tooltips work on ajax generated content
	$(document).ajaxStop(function() {
		$('[data-toggle=\'tooltip\']').tooltip({container: 'body'});
	});
});

// Cart add remove functions
var cart = {
	'add': function(product_id, quantity) {
		$.ajax({
			url: 'index.php?route=checkout/cart/add',
			type: 'post',
			data: 'product_id=' + product_id + '&quantity=' + (typeof(quantity) != 'undefined' ? quantity : 1),
			dataType: 'json',
			beforeSend: function() {
				$('#cart > button').html('<span id="cart-total">Loading...</span>');
			},
			complete: function() {
				$('#cart > button').button('reset');
			},			
			success: function(json) {
				$('.alert, .text-danger').remove();

				if (json['redirect']) {
					location = json['redirect'];
				}

				if (json['success']) {
					$('body').before('<div class="alert alert-success"><i class="fa fa-check-circle"></i> ' + json['success'] + '<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
					
					// Need to set timeout otherwise it wont update the total
					setTimeout(function () {
						$('#cart > button').html('<span id="cart-total">' + json['total'] + '</span>');
					}, 100);
				
					$('html, body').animate({ scrollTop: 0 }, 'slow');

					$('#cart > ul').load('index.php?route=common/cart/info ul li');
				}
			}
		});
	},
	'update': function(key, quantity) {
		$.ajax({
			url: 'index.php?route=checkout/cart/edit',
			type: 'post',
			data: 'key=' + key + '&quantity=' + (typeof(quantity) != 'undefined' ? quantity : 1),
			dataType: 'json',
			beforeSend: function() {
				$('#cart > button').html('<span id="cart-total">Loading...</span>');
			},
			complete: function() {
				$('#cart > button').button('reset');
			},			
			success: function(json) {
				// Need to set timeout otherwise it wont update the total
				setTimeout(function () {
					$('#cart > button').html('<span id="cart-total">' + json['total'] + '</span>');
				}, 100);

				if (getURLVar('route') == 'checkout/cart' || getURLVar('route') == 'checkout/checkout') {
					location = 'index.php?route=checkout/cart';
				} else {
					$('#cart > ul').load('index.php?route=common/cart/info ul li');
				}
			}
		});
	},
	'remove': function(key) {
		$.ajax({
			url: 'index.php?route=checkout/cart/remove',
			type: 'post',
			data: 'key=' + key,
			dataType: 'json',
			beforeSend: function() {
				$('#cart > button').button('loading');
			},
			complete: function() {
				$('#cart > button').button('reset');
			},			
			success: function(json) {
				// Need to set timeout otherwise it wont update the total
				setTimeout(function () {
					$('#cart > button').html('<span id="cart-total">' + json['total'] + '</span>');
				}, 100);
					
				if (getURLVar('route') == 'checkout/cart' || getURLVar('route') == 'checkout/checkout') {
					location = 'index.php?route=checkout/cart';
				} else {
					$('#cart > ul').load('index.php?route=common/cart/info ul li');
				}
			}
		});
	}
}

var voucher = {
	'add': function() {

	},
	'remove': function(key) {
		$.ajax({
			url: 'index.php?route=checkout/cart/remove',
			type: 'post',
			data: 'key=' + key,
			dataType: 'json',
			beforeSend: function() {
				$('#cart > button').button('loading');
			},
			complete: function() {
				$('#cart > button').button('reset');
			},
			success: function(json) {
				// Need to set timeout otherwise it wont update the total
				setTimeout(function () {
					$('#cart > button').html('<span id="cart-total">' + json['total'] + '</span>');
				}, 100);

				if (getURLVar('route') == 'checkout/cart' || getURLVar('route') == 'checkout/checkout') {
					location = 'index.php?route=checkout/cart';
				} else {
					$('#cart > ul').load('index.php?route=common/cart/info ul li');
				}
			}
		});
	}
}

var wishlist = {
	'add': function(product_id) {
		$.ajax({
			url: 'index.php?route=account/wishlist/add',
			type: 'post',
			data: 'product_id=' + product_id,
			dataType: 'json',
			success: function(json) {
				$('.alert').remove();

				if (json['success']) {
					$('body').before('<div class="alert alert-success"><i class="fa fa-check-circle"></i> ' + json['success'] + '<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
				}

				if (json['info']) {
					$('body').before('<div class="alert alert-info"><i class="fa fa-check-circle"></i> ' + json['info'] + '<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
					
				}

				$('#wishlist-total span').html(json['total']);
				$('#wishlist-total').attr('title', json['total']);

				$('html, body').animate({ scrollTop: 0 }, 'slow');
			}
		});
	},
	'remove': function() {

	}
}

var compare = {
	'add': function(product_id) {
		$.ajax({
			url: 'index.php?route=product/compare/add',
			type: 'post',
			data: 'product_id=' + product_id,
			dataType: 'json',
			success: function(json) {
				$('.alert').remove();

				if (json['success']) {
					$('body').before('<div class="alert alert-success"><i class="fa fa-check-circle"></i> ' + json['success'] + '<button type="button" class="close" data-dismiss="alert">&times;</button></div>');

					$('#compare-total').html(json['total']);

					$('html, body').animate({ scrollTop: 0 }, 'slow');
				}
			}
		});
	},
	'remove': function() {

	}
}

/* Agree to Terms */
$(document).delegate('.agree', 'click', function(e) {
	e.preventDefault();

	$('#modal-agree').remove();

	var element = this;

	$.ajax({
		url: $(element).attr('href'),
		type: 'get',
		dataType: 'html',
		success: function(data) {
			html  = '<div id="modal-agree" class="modal">';
			html += '  <div class="modal-dialog">';
			html += '    <div class="modal-content">';
			html += '      <div class="modal-header">';
			html += '        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';
			html += '        <h4 class="modal-title">' + $(element).text() + '</h4>';
			html += '      </div>';
			html += '      <div class="modal-body">' + data + '</div>';
			html += '    </div';
			html += '  </div>';
			html += '</div>';

			$('body').append(html);

			$('#modal-agree').modal('show');
		}
	});
});

// Autocomplete */
(function($) {
	$.fn.autocomplete = function(option) {
		return this.each(function() {
			this.timer = null;
			this.items = new Array();
	
			$.extend(this, option);
	
			$(this).attr('autocomplete', 'off');
			
			// Focus
			$(this).on('focus', function() {
				this.request();
			});
			
			// Blur
			$(this).on('blur', function() {
				setTimeout(function(object) {
					object.hide();
				}, 200, this);				
			});
			
			// Keydown
			$(this).on('keydown', function(event) {
				switch(event.keyCode) {
					case 27: // escape
						this.hide();
						break;
					default:
						this.request();
						break;
				}				
			});
			
			// Click
			this.click = function(event) {
				event.preventDefault();
	
				value = $(event.target).parent().attr('data-value');
	
				if (value && this.items[value]) {
					this.select(this.items[value]);
				}
			}
			
			// Show
			this.show = function() {
				var pos = $(this).position();
	
				$(this).siblings('ul.dropdown-menu').css({
					top: pos.top + $(this).outerHeight(),
					left: pos.left
				});
	
				$(this).siblings('ul.dropdown-menu').show();
			}
			
			// Hide
			this.hide = function() {
				$(this).siblings('ul.dropdown-menu').hide();
			}		
			
			// Request
			this.request = function() {
				clearTimeout(this.timer);
		
				this.timer = setTimeout(function(object) {
					object.source($(object).val(), $.proxy(object.response, object));
				}, 200, this);
			}
			
			// Response
			this.response = function(json) {
				html = '';
	
				if (json.length) {
					for (i = 0; i < json.length; i++) {
						this.items[json[i]['value']] = json[i];
					}
	
					for (i = 0; i < json.length; i++) {
						if (!json[i]['category']) {
							html += '<li data-value="' + json[i]['value'] + '"><a href="#">' + json[i]['label'] + '</a></li>';
						}
					}
	
					// Get all the ones with a categories
					var category = new Array();
	
					for (i = 0; i < json.length; i++) {
						if (json[i]['category']) {
							if (!category[json[i]['category']]) {
								category[json[i]['category']] = new Array();
								category[json[i]['category']]['name'] = json[i]['category'];
								category[json[i]['category']]['item'] = new Array();
							}
	
							category[json[i]['category']]['item'].push(json[i]);
						}
					}
	
					for (i in category) {
						html += '<li class="dropdown-header">' + category[i]['name'] + '</li>';
	
						for (j = 0; j < category[i]['item'].length; j++) {
							html += '<li data-value="' + category[i]['item'][j]['value'] + '"><a href="#">&nbsp;&nbsp;&nbsp;' + category[i]['item'][j]['label'] + '</a></li>';
						}
					}
				}
	
				if (html) {
					this.show();
				} else {
					this.hide();
				}
	
				$(this).siblings('ul.dropdown-menu').html(html);
			}
			
			$(this).after('<ul class="dropdown-menu"></ul>');
			$(this).siblings('ul.dropdown-menu').delegate('a', 'click', $.proxy(this.click, this));	
			
		});
	}
})(window.jQuery);
