/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var companyController = new SWSController;
companyController.init = function() {
	companyController.getCompanyData();	
}

companyController.initWidget = function() {}


companyController.getCompanyData = function() {
    var that = this;
    SWSUtility.ajax({    
        url :"/data/appz.json",       
        data : {},
        type : 'GET',
        async : false,
        success : function(data) {
        	// success do nothing;
			companyController.setCompanyInfo(data.company_info);		
			companyController.setWorkingSpaces(data.company_pic);
			companyController.setEvent(data.events);
			companyController.setPeople(data.people);
			companyController.setCoreValue(data.core_value);
			companyController.setJobs(data.job, data.joy_apply_url);
        },                 
        error : function(data) {
            console.error(data.error_message);
        }
	});
};

//set up event
companyController.setCompanyInfo = function(data) {
	$('.brand strong').text('Inside - ' + data.name);
	$('#slogan h3 p').text(data.slogan);
}


//set up working space
companyController.setWorkingSpaces = function(data) {
	var $workspace = $('#workspace').remove().clone();
	var startIndex = 4;
	$.each( data, function(i, picinfo) {
		if(++i>startIndex){
	        var $eachPicinfo = $workspace.clone();
	        $eachPicinfo.find("img").attr("src", picinfo.pic)
	        .end()
	        .find('.text h6')
	        .text(picinfo.title)
	        .end()
	        .find('.text p')
	        .text(picinfo.desc)
	        .end();
	        $('.features_op1_row').append( $eachPicinfo );
		}else{
			var $slide = $('#cover_'+i).parent();
			$slide.css("background-image", "url("+picinfo.pic+")")
			.end()
	        .find('h2').text(picinfo.title)
	        .end();
		}
    });
    $workspace = null;
    //because this is slider need to preload first
    coverslide();
}


//set up event
companyController.setEvent = function(data) {
	var $eventCell = $('#event').remove().clone();
	$.each( data, function(i, event) {
		var $eachEvent = $eventCell.clone();
		$eachEvent.find("img").attr("src", event.pic)
		.end()
		.find("h3").text(event.title)
		.end()
		.find("p").text(event.desc)
		.end();
		
		if(i == 1 ){ //second needs to change order
			var $img = $eachEvent.find('#event_img').remove().clone();
			var $info = $eachEvent.find('#event_info').remove().clone();
			$eachEvent.append($info);
			$eachEvent.append($img);
		}
		$('#features .container').append( $eachEvent );
    });
    $eventCell = null;
}


//set up people
companyController.setPeople = function(data) {
	var $peopleCell = $('#people_cell').remove().clone();
	$.each( data, function(i, person) {
		var $eachPerson = $peopleCell.clone();
		$eachPerson.find("img").attr("src", person.headpic)
		.end()
		.find(".name").text(person.name)
		.end()
		.find("#people_title").text(person.title)
		.end()
		.find("#people_quote").text(person.quote)
		.end()
		.find(".facebook").attr("href", person.facebook)
		.end();
		$('#people_block .row').append( $eachPerson );
    });
    $peopleCell = null;
}


//set up core value
companyController.setCoreValue = function(data) {
	var $coreCell = $('#core').children().remove().clone(); 
	var $coreTitleCell = $('#core_title').children().remove().clone(); 

	$.each( data, function(i, core) {
		var $eachCore = $coreCell.clone();
		var $eachCoreTitle = $coreTitleCell.clone();
		if(i == 0 ){ //should active
			$eachCore.addClass("active");
			$eachCoreTitle.addClass("active");
		}
		
		$eachCore.find("h4").text(core.title)
		.end()
		.find("p").text(core.desc)
		.end();
		$('#core').append( $eachCore );
		$eachCoreTitle.find("span").text(core.core)
		.end();
		$('#core_title').append( $eachCoreTitle );
    });
    $coreCell = null;
    $coreTitleCell = null;
    companyController.clickServicesCircle();
}


companyController.clickServicesCircle = function() {
    var $container = $(".services_circles");
    var $texts = $container.find(".description .text");
    var $circles = $container.find(".areas .circle");

    $circles.click(function () {
    	console.log('click');    	
        var index = $circles.index(this);
        $texts.fadeOut();
        $texts.eq(index).fadeIn();
        $circles.removeClass("active");
        $(this).addClass("active");
	});
}




//set up people
companyController.setJobs = function(data, applyURL) {
	var $jobCell = $('#job').children().remove().clone();
	$.each( data, function(i, job) {
		var $eachJob = $jobCell.clone();
		$eachJob.find("h3").text(job.title)
		.end()
		.find(".qty").text(job.pay)
		.end();
		var $jobDesc = $eachJob.find(".features").children().remove().clone();
		$.each( job.details, function(j, desc) {
			var $eachJobDesc = $jobDesc.clone();
			$eachJobDesc.text(desc)
			.end();
			$eachJob.find(".features").append( $eachJobDesc );
		});
		$('#job').append( $eachJob );
    });
	$('#job').find('.order').attr("href", applyURL);
	$('#job').parent().find('.start a').attr("href", applyURL);
    //release memory
	$jobCell = null;
	
}





$(function() {
    companyController.initialize();
});





//for cover slide show =======================
jQuery.easing.jswing = jQuery.easing.swing;
jQuery.extend(jQuery.easing, {
    def: "easeOutQuad",
    swing: function (e, f, a, h, g) {
        return jQuery.easing[jQuery.easing.def](e, f, a, h, g)
    },
    easeInQuad: function (e, f, a, h, g) {
        return h * (f /= g) * f + a
    },
    easeOutQuad: function (e, f, a, h, g) {
        return -h * (f /= g) * (f - 2) + a
    },
    easeInOutQuad: function (e, f, a, h, g) {
        if ((f /= g / 2) < 1) {
            return h / 2 * f * f + a
        }
        return -h / 2 * ((--f) * (f - 2) - 1) + a
    },
    easeInCubic: function (e, f, a, h, g) {
        return h * (f /= g) * f * f + a
    },
    easeOutCubic: function (e, f, a, h, g) {
        return h * ((f = f / g - 1) * f * f + 1) + a
    },
    easeInOutCubic: function (e, f, a, h, g) {
        if ((f /= g / 2) < 1) {
            return h / 2 * f * f * f + a
        }
        return h / 2 * ((f -= 2) * f * f + 2) + a
    },
    easeInQuart: function (e, f, a, h, g) {
        return h * (f /= g) * f * f * f + a
    },
    easeOutQuart: function (e, f, a, h, g) {
        return -h * ((f = f / g - 1) * f * f * f - 1) + a
    },
    easeInOutQuart: function (e, f, a, h, g) {
        if ((f /= g / 2) < 1) {
            return h / 2 * f * f * f * f + a
        }
        return -h / 2 * ((f -= 2) * f * f * f - 2) + a
    },
    easeInQuint: function (e, f, a, h, g) {
        return h * (f /= g) * f * f * f * f + a
    },
    easeOutQuint: function (e, f, a, h, g) {
        return h * ((f = f / g - 1) * f * f * f * f + 1) + a
    },
    easeInOutQuint: function (e, f, a, h, g) {
        if ((f /= g / 2) < 1) {
            return h / 2 * f * f * f * f * f + a
        }
        return h / 2 * ((f -= 2) * f * f * f * f + 2) + a
    },
    easeInSine: function (e, f, a, h, g) {
        return -h * Math.cos(f / g * (Math.PI / 2)) + h + a
    },
    easeOutSine: function (e, f, a, h, g) {
        return h * Math.sin(f / g * (Math.PI / 2)) + a
    },
    easeInOutSine: function (e, f, a, h, g) {
        return -h / 2 * (Math.cos(Math.PI * f / g) - 1) + a
    },
    easeInExpo: function (e, f, a, h, g) {
        return (f == 0) ? a : h * Math.pow(2, 10 * (f / g - 1)) + a
    },
    easeOutExpo: function (e, f, a, h, g) {
        return (f == g) ? a + h : h * (-Math.pow(2, -10 * f / g) + 1) + a
    },
    easeInOutExpo: function (e, f, a, h, g) {
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
    easeInCirc: function (e, f, a, h, g) {
        return -h * (Math.sqrt(1 - (f /= g) * f) - 1) + a
    },
    easeOutCirc: function (e, f, a, h, g) {
        return h * Math.sqrt(1 - (f = f / g - 1) * f) + a
    },
    easeInOutCirc: function (e, f, a, h, g) {
        if ((f /= g / 2) < 1) {
            return -h / 2 * (Math.sqrt(1 - f * f) - 1) + a
        }
        return h / 2 * (Math.sqrt(1 - (f -= 2) * f) + 1) + a
    },
    easeInElastic: function (f, h, e, l, k) {
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
    easeOutElastic: function (f, h, e, l, k) {
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
    easeInOutElastic: function (f, h, e, l, k) {
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
    easeInBack: function (e, f, a, i, h, g) {
        if (g == undefined) {
            g = 1.70158
        }
        return i * (f /= h) * f * ((g + 1) * f - g) + a
    },
    easeOutBack: function (e, f, a, i, h, g) {
        if (g == undefined) {
            g = 0.70158
        }
        return i * ((f = f / h - 1) * f * ((g + 1) * f + g) + 1) + a
    },
    easeInOutBack: function (e, f, a, i, h, g) {
        if (g == undefined) {
            g = 1.70158
        }
        if ((f /= h / 2) < 1) {
            return i / 2 * (f * f * (((g *= (1.525)) + 1) * f - g)) + a
        }
        return i / 2 * ((f -= 2) * f * (((g *= (1.525)) + 1) * f + g) + 2) + a
    },
    easeInBounce: function (e, f, a, h, g) {
        return h - jQuery.easing.easeOutBounce(e, g - f, 0, h, g) + a
    },
    easeOutBounce: function (e, f, a, h, g) {
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
    easeInOutBounce: function (e, f, a, h, g) {
        if (f < g / 2) {
            return jQuery.easing.easeInBounce(e, f * 2, 0, h, g) * 0.5 + a
        }
        return jQuery.easing.easeOutBounce(e, f * 2 - g, 0, h, g) * 0.5 + h * 0.5 + a
    }
});

var center = $(window).width() / 2;
var coverslide = function(data) {
    function d() {
        $(".slide.active img").each(function () {
            var g = parseInt($(this).attr("class").split(" ")[1].replace("left", ""));
            var i = g + center;
            var h = parseInt($(this).attr("class").split(" ")[3].replace("t", ""));
            var f = parseInt($(this).attr("class").split(" ")[4].replace("z", ""));
            if ($(this).hasClass("fade")) {
                $(this).css({
                    left: i,
                    top: h,
                    "z-index": f
                })
            } else {
                $(this).css({
                    left: i,
                    top: h,
                    "z-index": f
                }).show()
            }
        });
        setTimeout(function () {
            $(".slide.active img.fade,.slide.active .info").fadeIn(600, "easeInOutQuad", function () {
                $("#feature_slider").removeClass()
            })
        }, 800)
    }
    function c() {
        $("#feature_slider").addClass("disabled").append('<ul id="pagination" /><a href="" id="slide-left" /><a href="" id="slide-right" />');
        $("#feature_slider article").each(function () {
            $("#pagination").append('<li><a href="#' + $(this).attr("id") + '">' + $(this).index() + "</a></li>")
        });
        $("#pagination li:first").addClass("active");
        $("#pagination").css({
            left: ($(window).width() - $("#pagination li").length * 14) / 2
        });
        var h = 0;

        function j() {
            $(".slide.active img").each(function () {
                var l = parseInt($(this).attr("class").split(" ")[1].replace("left", ""));
                var q = l + center;
                // var p = parseInt($(this).attr("class").split(" ")[2].replace("st", ""));
                var p = 400;
                var n = parseInt($(this).attr("class").split(" ")[2].replace("sp", ""));
                var o = parseInt($(this).attr("class").split(" ")[3].replace("t", ""));
                var k = parseInt($(this).attr("class").split(" ")[4].replace("z", ""));
                if ($(this).hasClass("fade")) {
                    $(this).css({
                        left: q,
                        top: o,
                        "z-index": k
                    })
                } else {
                    if ($("#feature_slider").hasClass("scrollLeft")) {
                        var m = -$(this).width() - p
                    } else {
                        var m = $(window).width() + p
                    }
                    $(this).css({
                        left: m,
                        top: o,
                        "z-index": k
                    }).show();
                    $(this).animate({
                        left: q
                    }, n, "easeOutQuad")
                }
            });
            setTimeout(function () {
                $(".slide.active img.fade,.slide.active .info").fadeIn(600, "easeInOutQuad", function () {
                    $("#feature_slider").removeClass()
                })
            }, 600)
        }
        function g() {
            $(".slide.active").removeClass("active").addClass("previous");
            $(".slide.previous img").not(".fade").each(function () {
                // var l = parseInt($(this).attr("class").split(" ")[2].replace("st", ""));
                var l = 400;
                var k = parseInt($(this).attr("class").split(" ")[2].replace("sp", ""));
                if ($("#feature_slider").hasClass("scrollLeft")) {
                    $(this).animate({
                        left: $(window).width() + l
                    }, k, "easeInQuad")
                } else {
                    $(this).animate({
                        left: -$(this).width() - l
                    }, k, "easeInQuad")
                }
            });
            // speed of transitions
            $(".slide.previous img.fade,.slide.previous .info").fadeOut(600, "easeInQuad", function () {
                $(".slide.next").removeClass("next").addClass("active").fadeIn(500, "easeInOutQuad", function () {
                    $(".slide.previous").removeClass("previous").fadeOut(500, "easeInOutQuad");
                    j()
                })
            })
        }
        $(".slide:first").addClass("active").fadeIn(500, "easeInOutQuad", function () {
            $("#slide-left, #slide-right, #pagination").fadeIn(200, "easeInOutQuad", function () {
                j()
            })
        });
        $("#pagination li").not("active").click(function () {
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
        $("#slide-left").click(function () {
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
        $("#slide-right").click(function () {
            clearInterval(f);
            i();
            return false
        });
        var f = setInterval(function () {
            i()
        }, 5000)
    }
    c();
    $(window).resize(function () {
        $("#pagination").css({
            left: ($(window).width() - $("#pagination li").length * 14) / 2
        });
        center = $(window).width() / 2;
        d()
    });
}