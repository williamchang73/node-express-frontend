/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var companyController = new SWSController;
var companydata = '';
var global_theme_color = '#252528';
//theme color
var themecolors = {
	'purple' : '#4A036F',
	'red' : '#550000',
	'brown' : '#553300',
	'black' : '#252528',
	'orange' : '#A64B00',
	'blue' : '#18496A',
	'green' : '#002a00'
};

companyController.init = function() {
}

companyController.initWidget = function() {
	companyController.getCompanyData();
	if (global_mode == 'edit') {
		//check permission
		if ($.cookie("company")) {
			var company = $.parseJSON($.cookie("company"));
			if (company.name != global_company_name) {
				window.location.href = '/company/' + company.name + '/edit';
			}
		} else {
			window.location.href = '/';
		}

		//filepicker
		filepicker.setKey('AAhvacqKRFapIgzqz3Tmaz');
		companyController.makeEditable();
	}
	$('#nav_company').find('a').addClass('active');
}

companyController.initBinding = function() {
	companyController.handleImage();
}

companyController.getCompanyData = function() {
	var that = this;
	var key = "";

	if ($.cookie("company")) {
		var company = $.parseJSON($.cookie("company"));
		if (company != null) {
			key = company.id;
		}
	}
	AboutUsAPI.getCompanyInfo({
		"name" : global_company_name,
		"key" : key
	}, function(res) {
		if (res.status == 200) {
			data = res.data.data;
			that.companydata = data;
			companyController.setCompanyInfo(data.company_info);
			companyController.setWorkingSpaces(data.company_pic);
			companyController.setEvent(data.events);
			companyController.setPeople(data.people);
			companyController.setCoreValue(data.core_value);
			companyController.setJobs(data.job, data.joy_apply_url);
			companyController.setNews(data.latest_news);
			companyController.setContact(data.contact_info);
			companyController.setColorTheme();
		} else {
			console.error(res.status_msg);
			window.location.href = "/";
		}

	});
};

//set up company information
companyController.setCompanyInfo = function(data) {
	$('.brand').text(data.name).attr('id', 'company_info-name');
	$('#slogan h3 p').text(data.slogan).attr('id', 'company_info-slogan');
	companyController.setGlobalThemeColor(data.theme);
}
//set up themes
companyController.setGlobalThemeColor = function(color) {
	global_theme_color = themecolors[color];
}
//set up working space
companyController.setWorkingSpaces = function(data) {
	var $workspace = $('#workspace').remove().clone();
	var startIndex = 4;
	$.each(data, function(i, picinfo) {
		if (i > startIndex - 1 || global_mode == 'edit') {
			var $eachPicinfo = $workspace.clone();
			$eachPicinfo.attr('id', $eachPicinfo.attr('id') + '_' + i);
			$eachPicinfo.find("img").attr("src", picinfo.pic + '/convert?w=285&h=215&fit=crop').attr("alt", picinfo.title).attr('id', 'company_pic-' + i + '-pic').end().find('.text h6').text(picinfo.title).attr('id', 'company_pic-' + i + '-title').end().find('.text p').text(picinfo.desc).attr('id', 'company_pic-' + i + '-desc').end();
			$('.features_op1_row').append($eachPicinfo);
		} else {
			var $slide = $('#cover_' + i).parent();
			$slide.css("background-image", "url(" + picinfo.pic + ")").end().find('h2').text(picinfo.title).end();
		}
	});

	$workspace = null;
	//because this is slider need to preload first
	if (global_mode != 'edit') {
		coverslide();
	}
}
//set up event
companyController.setEvent = function(data) {
	var $eventCell = $('#event').remove().clone();
	$.each(data, function(i, event) {
		var $eachEvent = $eventCell.clone();
		$eachEvent.attr('id', $eachEvent.attr('id') + '_' + i);
		$eachEvent.find("img").attr("src", event.pic + '/convert?w=460&h=345&fit=crop').attr('alt', event.title).attr('id', 'events-' + i + '-pic').end().find("h6").text(event.title).attr('id', 'events-' + i + '-title').end().find("p").text(event.desc).attr('id', 'events-' + i + '-desc').end();

		if (i == 1) {//second needs to change order
			var $img = $eachEvent.find('#event_img').remove().clone();
			var $info = $eachEvent.find('#event_info').remove().clone();
			$eachEvent.append($info);
			$eachEvent.append($img);
		}
		$('#features .container').append($eachEvent);
	});
	$eventCell = null;

}
//set up people
companyController.setPeople = function(data) {
	var $peopleCell = $('#people_cell').remove().clone();
	$.each(data, function(i, person) {
		var $eachPerson = $peopleCell.clone();
		$eachPerson.attr('id', $eachPerson.attr('id') + '_' + i);
		$eachPerson.find("img").attr("src", person.headpic + '/convert?w=171&h=171&fit=crop').attr('id', 'people-' + i + '-headpic').end().find(".name").text(person.name).attr('id', 'people-' + i + '-name').end().find("#people_title").text(person.title).attr('id', 'people-' + i + '-title').end().find("#people_quote").text(person.quote).attr('id', 'people-' + i + '-quote').end().find("#people_link").text(person.url).attr('id', 'people-' + i + '-url').end().find(".facebook").attr("href", person.url).end();
		$('#people_block .row').append($eachPerson);
	});
	$peopleCell = null;
}
//set up core value
companyController.setCoreValue = function(data) {
	var $coreCell = $('#core').children().remove().clone();
	var $coreTitleCell = $('#core_title').children().remove().clone();

	$.each(data, function(i, core) {
		var $eachCore = $coreCell.clone();
		var $eachCoreTitle = $coreTitleCell.clone();
		if (i == 0) {//should active
			$eachCore.addClass("active");
			$eachCoreTitle.addClass("active");
			$eachCoreTitle.css('background', global_theme_color);
		}

		$eachCore.find("h4").text(core.title).attr('id', 'core_value-' + i + '-title').end().find("p").text(core.desc).attr('id', 'core_value-' + i + '-desc').end();
		$('#core').append($eachCore);
		$eachCoreTitle.find("span").text(core.title).end();
		$('#core_title').append($eachCoreTitle);
	});
	$coreCell = null;
	$coreTitleCell = null;
	companyController.clickServicesCircle();
}

companyController.clickServicesCircle = function() {
	var $container = $(".services_circles");
	var $texts = $container.find(".description .text");
	var $circles = $container.find(".areas .circle");

	$circles.click(function() {
		//remove click color first
		$('.circle').css("background-color", "");
		var index = $circles.index(this);
		$texts.fadeOut();
		$texts.eq(index).fadeIn();
		$circles.removeClass("active");
		$(this).addClass("active");
		$(this).css('background', global_theme_color);
	});
}
//set up job
companyController.setJobs = function(data, applyURL) {
	var $jobCell = $('#job').remove().clone();
	$.each(data, function(i, job) {
		var $eachJob = $jobCell.clone();
		$eachJob.attr('id', $eachJob.attr('id') + '_' + i);
		$eachJob.find("h6").text(job.title).attr('id', 'job-' + i + '-title').end().find(".order").attr("href", applyURL).end().find(".qty").text(job.pay).attr('id', 'job-' + i + '-pay').end();
		var $jobDesc = $eachJob.find(".features").children().remove().clone();
		$.each(job.details, function(j, desc) {
			var $eachJobDesc = $jobDesc.clone();
			$eachJobDesc.text(desc).attr('id', 'job-' + i + '-details-' + j).end();
			$eachJob.find(".features").append($eachJobDesc);
		});
		$('#job_block').append($eachJob);
	});
	$('#job_block').parent().find('.start a').attr("href", applyURL);
	$('#job_applyurl').find('h6').text(applyURL).attr('id', 'joy_apply_url');
	$jobCell = null;
}
//set up latest news
companyController.setNews = function(data) {
	var $newsCell = $('#news').remove().clone();

	$.each(data, function(i, news) {
		var $eachNews = $newsCell.clone();
		$eachNews.attr('id', $eachNews.attr('id') + '_' + i);
		if (i == 2) {//last
			$eachNews.addClass("last");
		}
		$eachNews.find(".title").text(news.title).attr('id', 'latest_news-' + i + '-title').end().find(".date").text(news.date).attr('id', 'latest_news-' + i + '-date').end().find("h6").text(news.source).attr('id', 'latest_news-' + i + '-source').end().find("h4").text(news.url).attr('id', 'latest_news-' + i + '-url').end().find("img").attr('src', news.pic + '/convert?w=300&h=189&fit=crop').attr('id', 'latest_news-' + i + '-pic').end().find("p").text(news.desc).attr('id', 'latest_news-' + i + '-desc').end();
		$('#news_block').append($eachNews);
	});
	$newsCell = null;
}
//set up contact
companyController.setContact = function(data) {
	$footer = $('#footer');
	$footer.find('#contact_info-sn').text(data.sn);
	$footer.find('#contact_info-address').text(data.address);
	$footer.find('#contact_info-phone').text(data.phone);
	$footer.find('#contact_email').attr('value', data.email);
	$footer.find('#contact_info-email').text(data.email);
	$footer.find('#contact_url').attr('href', data.url);
	$footer.find('#contact_info-url').text(data.url);
	$footer.find('.author').find('.info p').text(data.title).attr('id', 'contact_info-title');
	$footer.find('.author').find('.name p').text(data.name).attr('id', 'contact_info-name');
	$footer.find('.author').find('img').attr('src', data.pic + '/convert?w=62&h=62&fit=crop').attr('id', 'contact_info-pic');
}
//set up color theme
companyController.setColorTheme = function() {
	$('#team').css('background', global_theme_color);
	$('#footer').css('background-color', global_theme_color);
	$('.circle.active').css('background', global_theme_color);
	$('.dollar').css('color', global_theme_color);
	$('.qty').css('color', global_theme_color);
	$('.month').css('color', global_theme_color);
	$('#feature_slider').css('background', global_theme_color);

	$('.order').css('background-color', global_theme_color);
	$('.order').mouseover(function() {
		$(this).css('background', '#333333');
	}).mouseout(function() {
		$(this).css('background', global_theme_color);
	});
	$('.start a').mouseover(function() {
		$(this).css('background', global_theme_color);
	}).mouseout(function() {
		$(this).css('background', '');
	});
	$("input[type=submit]").mouseover(function() {
		$(this).css('background', global_theme_color);
	}).mouseout(function() {
		$(this).css('background', '');
	});
}
$(function() {
	companyController.initialize();
});

//for cover slide show =======================
jQuery.easing.jswing = jQuery.easing.swing;
jQuery.extend(jQuery.easing, {
	def : "easeOutQuad",
	swing : function(e, f, a, h, g) {
		return jQuery.easing[jQuery.easing.def](e, f, a, h, g)
	},
	easeInQuad : function(e, f, a, h, g) {
		return h * (f /= g) * f + a
	},
	easeOutQuad : function(e, f, a, h, g) {
		return -h * (f /= g) * (f - 2) + a
	},
	easeInOutQuad : function(e, f, a, h, g) {
		if ((f /= g / 2) < 1) {
			return h / 2 * f * f + a
		}
		return -h / 2 * ((--f) * (f - 2) - 1) + a
	},
	easeInCubic : function(e, f, a, h, g) {
		return h * (f /= g) * f * f + a
	},
	easeOutCubic : function(e, f, a, h, g) {
		return h * (( f = f / g - 1) * f * f + 1) + a
	},
	easeInOutCubic : function(e, f, a, h, g) {
		if ((f /= g / 2) < 1) {
			return h / 2 * f * f * f + a
		}
		return h / 2 * ((f -= 2) * f * f + 2) + a
	},
	easeInQuart : function(e, f, a, h, g) {
		return h * (f /= g) * f * f * f + a
	},
	easeOutQuart : function(e, f, a, h, g) {
		return -h * (( f = f / g - 1) * f * f * f - 1) + a
	},
	easeInOutQuart : function(e, f, a, h, g) {
		if ((f /= g / 2) < 1) {
			return h / 2 * f * f * f * f + a
		}
		return -h / 2 * ((f -= 2) * f * f * f - 2) + a
	},
	easeInQuint : function(e, f, a, h, g) {
		return h * (f /= g) * f * f * f * f + a
	},
	easeOutQuint : function(e, f, a, h, g) {
		return h * (( f = f / g - 1) * f * f * f * f + 1) + a
	},
	easeInOutQuint : function(e, f, a, h, g) {
		if ((f /= g / 2) < 1) {
			return h / 2 * f * f * f * f * f + a
		}
		return h / 2 * ((f -= 2) * f * f * f * f + 2) + a
	},
	easeInSine : function(e, f, a, h, g) {
		return -h * Math.cos(f / g * (Math.PI / 2)) + h + a
	},
	easeOutSine : function(e, f, a, h, g) {
		return h * Math.sin(f / g * (Math.PI / 2)) + a
	},
	easeInOutSine : function(e, f, a, h, g) {
		return -h / 2 * (Math.cos(Math.PI * f / g) - 1) + a
	},
	easeInExpo : function(e, f, a, h, g) {
		return (f == 0) ? a : h * Math.pow(2, 10 * (f / g - 1)) + a
	},
	easeOutExpo : function(e, f, a, h, g) {
		return (f == g) ? a + h : h * (-Math.pow(2, -10 * f / g) + 1) + a
	},
	easeInOutExpo : function(e, f, a, h, g) {
		if (f == 0) {
			return a
		}
		if (f == g) {
			return a + h
		}
		if ((f /= g / 2) < 1) {
			return h / 2 * Math.pow(2, 10 * (f - 1)) + a
		}
		return h / 2 * (-Math.pow(2, -10 * --f) + 2) + a
	},
	easeInCirc : function(e, f, a, h, g) {
		return -h * (Math.sqrt(1 - (f /= g) * f) - 1) + a
	},
	easeOutCirc : function(e, f, a, h, g) {
		return h * Math.sqrt(1 - ( f = f / g - 1) * f) + a
	},
	easeInOutCirc : function(e, f, a, h, g) {
		if ((f /= g / 2) < 1) {
			return -h / 2 * (Math.sqrt(1 - f * f) - 1) + a
		}
		return h / 2 * (Math.sqrt(1 - (f -= 2) * f) + 1) + a
	},
	easeInElastic : function(f, h, e, l, k) {
		var i = 1.70158;
		var j = 0;
		var g = l;
		if (h == 0) {
			return e
		}
		if ((h /= k) == 1) {
			return e + l
		}
		if (!j) {
			j = k * 0.3
		}
		if (g < Math.abs(l)) {
			g = l;
			var i = j / 4
		} else {
			var i = j / (2 * Math.PI) * Math.asin(l / g)
		}
		return -(g * Math.pow(2, 10 * (h -= 1)) * Math.sin((h * k - i) * (2 * Math.PI) / j)) + e
	},
	easeOutElastic : function(f, h, e, l, k) {
		var i = 1.70158;
		var j = 0;
		var g = l;
		if (h == 0) {
			return e
		}
		if ((h /= k) == 1) {
			return e + l
		}
		if (!j) {
			j = k * 0.3
		}
		if (g < Math.abs(l)) {
			g = l;
			var i = j / 4
		} else {
			var i = j / (2 * Math.PI) * Math.asin(l / g)
		}
		return g * Math.pow(2, -10 * h) * Math.sin((h * k - i) * (2 * Math.PI) / j) + l + e
	},
	easeInOutElastic : function(f, h, e, l, k) {
		var i = 1.70158;
		var j = 0;
		var g = l;
		if (h == 0) {
			return e
		}
		if ((h /= k / 2) == 2) {
			return e + l
		}
		if (!j) {
			j = k * (0.3 * 1.5)
		}
		if (g < Math.abs(l)) {
			g = l;
			var i = j / 4
		} else {
			var i = j / (2 * Math.PI) * Math.asin(l / g)
		}
		if (h < 1) {
			return -0.5 * (g * Math.pow(2, 10 * (h -= 1)) * Math.sin((h * k - i) * (2 * Math.PI) / j)) + e
		}
		return g * Math.pow(2, -10 * (h -= 1)) * Math.sin((h * k - i) * (2 * Math.PI) / j) * 0.5 + l + e
	},
	easeInBack : function(e, f, a, i, h, g) {
		if (g == undefined) {
			g = 1.70158
		}
		return i * (f /= h) * f * ((g + 1) * f - g) + a
	},
	easeOutBack : function(e, f, a, i, h, g) {
		if (g == undefined) {
			g = 0.70158
		}
		return i * (( f = f / h - 1) * f * ((g + 1) * f + g) + 1) + a
	},
	easeInOutBack : function(e, f, a, i, h, g) {
		if (g == undefined) {
			g = 1.70158
		}
		if ((f /= h / 2) < 1) {
			return i / 2 * (f * f * (((g *= (1.525)) + 1) * f - g)) + a
		}
		return i / 2 * ((f -= 2) * f * (((g *= (1.525)) + 1) * f + g) + 2) + a
	},
	easeInBounce : function(e, f, a, h, g) {
		return h - jQuery.easing.easeOutBounce(e, g - f, 0, h, g) + a
	},
	easeOutBounce : function(e, f, a, h, g) {
		if ((f /= g) < (1 / 2.75)) {
			return h * (7.5625 * f * f) + a
		} else {
			if (f < (2 / 2.75)) {
				return h * (7.5625 * (f -= (1.5 / 2.75)) * f + 0.75) + a
			} else {
				if (f < (2.5 / 2.75)) {
					return h * (7.5625 * (f -= (2.25 / 2.75)) * f + 0.9375) + a
				} else {
					return h * (7.5625 * (f -= (2.625 / 2.75)) * f + 0.984375) + a
				}
			}
		}
	},
	easeInOutBounce : function(e, f, a, h, g) {
		if (f < g / 2) {
			return jQuery.easing.easeInBounce(e, f * 2, 0, h, g) * 0.5 + a
		}
		return jQuery.easing.easeOutBounce(e, f * 2 - g, 0, h, g) * 0.5 + h * 0.5 + a
	}
});

var center = $(window).width() / 2;
var coverslide = function(data) {
	function d() {
		$(".slide.active img").each(function() {
			var g = parseInt($(this).attr("class").split(" ")[1].replace("left", ""));
			var i = g + center;
			var h = parseInt($(this).attr("class").split(" ")[3].replace("t", ""));
			var f = parseInt($(this).attr("class").split(" ")[4].replace("z", ""));
			if ($(this).hasClass("fade")) {
				$(this).css({
					left : i,
					top : h,
					"z-index" : f
				})
			} else {
				$(this).css({
					left : i,
					top : h,
					"z-index" : f
				}).show()
			}
		});
		setTimeout(function() {
			$(".slide.active img.fade,.slide.active .info").fadeIn(600, "easeInOutQuad", function() {
				$("#feature_slider").removeClass()
			})
		}, 800)
	}

	function c() {
		$("#feature_slider").addClass("disabled").append('<ul id="pagination" style="display:none"/><a href="" id="slide-left" /><a href="" id="slide-right" />');
		$("#feature_slider article").each(function() {
			$("#pagination").append('<li><a href="#' + $(this).attr("id") + '">' + $(this).index() + "</a></li>")
		});
		$("#pagination li:first").addClass("active");
		$("#pagination").css({
			left : ($(window).width() - $("#pagination li").length * 14) / 2
		});
		var h = 0;

		function j() {
			$(".slide.active img").each(function() {
				var l = parseInt($(this).attr("class").split(" ")[1].replace("left", ""));
				var q = l + center;
				// var p = parseInt($(this).attr("class").split(" ")[2].replace("st", ""));
				var p = 400;
				var n = parseInt($(this).attr("class").split(" ")[2].replace("sp", ""));
				var o = parseInt($(this).attr("class").split(" ")[3].replace("t", ""));
				var k = parseInt($(this).attr("class").split(" ")[4].replace("z", ""));
				if ($(this).hasClass("fade")) {
					$(this).css({
						left : q,
						top : o,
						"z-index" : k
					})
				} else {
					if ($("#feature_slider").hasClass("scrollLeft")) {
						var m = -$(this).width() - p
					} else {
						var m = $(window).width() + p
					}
					$(this).css({
						left : m,
						top : o,
						"z-index" : k
					}).show();
					$(this).animate({
						left : q
					}, n, "easeOutQuad")
				}
			});
			setTimeout(function() {
				$(".slide.active img.fade,.slide.active .info").fadeIn(600, "easeInOutQuad", function() {
					$("#feature_slider").removeClass()
				})
			}, 600)
		}

		function g() {
			$(".slide.active").removeClass("active").addClass("previous");
			$(".slide.previous img").not(".fade").each(function() {
				// var l = parseInt($(this).attr("class").split(" ")[2].replace("st", ""));
				var l = 400;
				var k = parseInt($(this).attr("class").split(" ")[2].replace("sp", ""));
				if ($("#feature_slider").hasClass("scrollLeft")) {
					$(this).animate({
						left : $(window).width() + l
					}, k, "easeInQuad")
				} else {
					$(this).animate({
						left : -$(this).width() - l
					}, k, "easeInQuad")
				}
			});
			// speed of transitions
			$(".slide.previous img.fade,.slide.previous .info").fadeOut(600, "easeInQuad", function() {
				$(".slide.next").removeClass("next").addClass("active").fadeIn(500, "easeInOutQuad", function() {
					$(".slide.previous").removeClass("previous").fadeOut(500, "easeInOutQuad");
					j()
				})
			})
		}


		$(".slide:first").addClass("active").fadeIn(500, "easeInOutQuad", function() {
			$("#slide-left, #slide-right, #pagination").fadeIn(200, "easeInOutQuad", function() {
				j()
			})
		});
		$("#pagination li").not("active").click(function() {
			clearInterval(f);
			if ($(this).index() < $("#pagination li.active").index()) {
				$("#feature_slider").addClass("scrollLeft")
			}
			if (!$("#feature_slider").hasClass("disabled")) {
				$("#feature_slider").addClass("disabled");
				$("#pagination li.active").removeClass();
				$(this).addClass("active");
				$($(this).find("a").attr("href")).addClass("next");
				g()
			}
			return false
		});
		$("#slide-left").click(function() {
			clearInterval(f);
			if (!$("#feature_slider").hasClass("disabled")) {
				$("#feature_slider").addClass("disabled");
				if ($("#pagination li:first").hasClass("active")) {
					$("#pagination li.active").removeClass();
					$("#pagination li:last").addClass("active");
					$("#feature_slider article:last").addClass("next")
				} else {
					$("#pagination li.active").removeClass().prev().addClass("active");
					$("#feature_slider article.active").prev().addClass("next")
				}
				$("#feature_slider").addClass("scrollLeft");
				g()
			}
			return false
		});

		function i() {
			if (!$("#feature_slider").hasClass("disabled")) {
				$("#feature_slider").addClass("disabled");
				if ($("#pagination li:last").hasClass("active")) {
					$("#pagination li.active").removeClass();
					$("#pagination li:first").addClass("active");
					$("#feature_slider article:first").addClass("next")
				} else {
					$("#pagination li.active").removeClass().next().addClass("active");
					$("#feature_slider article.active").next().addClass("next")
				}
				g()
			}
		}


		$("#slide-right").click(function() {
			clearInterval(f);
			i();
			return false
		});
		var f = setInterval(function() {
			i()
		}, 5000)
	}

	c();
	$(window).resize(function() {
		$("#pagination").css({
			left : ($(window).width() - $("#pagination li").length * 14) / 2
		});
		center = $(window).width() / 2;
		d()
	});
}
//set up photo gallery
var photoGallery = function(data) {
	$(".gallery a[rel^='fullsize']").prettyPhoto({
		animation_speed : 'normal',
		theme : 'light_square',
		slideshow : 4000,
		autoplay_slideshow : false,
		opacity : 0.8,
		social_tools : false,
		overlay_gallery : false
	});
}
//image part
companyController.getFilePickerOriginalURL = function(url) {
	return url.substr(0, url.indexOf("/convert"));
}
companyController.handleImage = function() {

	if (global_mode == 'edit') {
		//for uploading the photos
		$('.uploadpic img, .headpic, .newspic, .uploadpic .circle').on('click', function(e) {
			var $img = $(this);
			
			if($(this).attr('class') == "circle"){
				$img = $(this).parent().find('img');
			}

			filepicker.pick({
				mimetypes : ['image/*', 'text/plain'],
				container : 'window',
				services : ['COMPUTER', 'URL', 'FACEBOOK', 'FLICKR', 'PICASA'],
				openTo : 'COMPUTER',
				maxSize : 3000 * 1024, //3 MB
				multiple : 'true'
			}, function(FPFile) {
				var url = FPFile.url;

				var beforeURL = $img.attr('src');
				var beforeOriginalURL = companyController.getFilePickerOriginalURL(beforeURL);
				var afterURL = beforeURL.replace(beforeOriginalURL, url);
				//change image
				$img.attr('src', afterURL);
				companyController.saveToArray($img.attr('id'), url);
			}, function(FPError) {
				console.log(FPError.toString());
			});
		});
	} else {//for viewing
		$('.uploadpic').on('click', function() {
			var imgSrc = $(this).find('img').attr("src");
			imgSrc = companyController.getFilePickerOriginalURL(imgSrc);
			$('.gallery li a[href$="' + imgSrc + '"]').click();
		});

		var photos = [];
		var i = 4;
		$('.uploadpic').each(function() {
			var imgSrc = $(this).find('img').attr('src');
			imgSrc = companyController.getFilePickerOriginalURL(imgSrc);
			var text = $(this).find('img').attr('alt');
			photos.push('<li><a href="' + imgSrc + '" rel="fullsize[imgs]" title="' + text + '">-</a></li>');
			i++;
		});
		var gallery = '<ul class="gallery clearfix hide">' + photos.join('') + '</ul>';
		$('#footer').append(gallery);
		photoGallery();
	}

}
//edit part ================================================
companyController.makeEditable = function() {
	$("p, h6, h4, .title, .date, .quote, .qty, .brand").attr('contenteditable', 'true');
	$(".morejobs").attr('contenteditable', 'false');
	$('.facebook').hide();
	$('.info .url').show();
	$('#footer').find('.url').show();
	$('.author_box h4').show();
	$('#job_applyurl').show();
	$('#theme-color').show();

	var $theme = $('.theme').remove().clone();
	$.each(themecolors, function(i, color) {
		var $eachColor = $theme.clone();
		$eachColor.css('background', color).attr('id', 'company_info-theme-' + i);
		$('#theme-color').append($eachColor);
	});

	$('.theme').on('click', function(e) {
		var id = $(this).attr('id');
		var keys = id.split('-');
		companyController.setGlobalThemeColor(keys[2]);
		companyController.setColorTheme();
		companyController.saveToArray(keys[0] + '-' + keys[1], keys[2]);
	});

	$('#feature_slider').after("<br /><br /><br /><br />");
	$('#feature_slider').hide();
	$('span .plus i').removeClass('icon-resize-full icon-white').addClass('icon-camera icon-white');

	var contentEditables = $('[contenteditable]');
	//.html();
	$('[contenteditable]').blur(function() {
		companyController.saveToArray($(this).attr('id'), $(this).text());
	});
}

companyController.saveToArray = function(id, value) {
	if (id != undefined && value != "") {
		//get key structure
		var keys = id.split('-');
		var beforeValue = companyController.companydata;
		for (var i in keys) {
			var key = keys[i];
			beforeValue = beforeValue[key];
		}

		if (beforeValue != value) {
			console.log('need to save to array');
			if (keys.length == 1) {
				companyController.companydata[keys[0]] = value;
			} else if (keys.length == 2) {
				companyController.companydata[keys[0]][keys[1]] = value;
			} else if (keys.length == 3) {
				companyController.companydata[keys[0]][keys[1]][keys[2]] = value;
			} else if (keys.length == 4) {
				companyController.companydata[keys[0]][keys[1]][keys[2]][keys[3]] = value;
			}
			//save back to server

			var token = $.cookie("token");
			var company = $.parseJSON($.cookie("company"));

			if (token.length > 0 && company.id.length > 0) {
				AboutUsAPI.updateCompany({
					"key" : company.id,
					"Company[data]" : companyController.companydata
				}, token, function(res) {
					console.log(res);
				});
			} else {
				console.error('need to login');
				alert("need to login first !");
				window.location.href = '/login';
			}

		}
	}
}

