if ($('#videoPlayer').length) {
	$(window).load(function() {
	    $('.spinner-wrapper').css('visibility','hidden');
	    $('.play-wrapper').css('visibility','visible');
	});
}

if ( $('#counter').length ) {
    function addCommas(nStr){
        nStr += '';
        x = nStr.split('.');
        x1 = x[0];
        x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        return x1 + x2;
    }
    function doSomething() {
        var min     = $('#counter').data('min'),
            max     = $('#counter').data('max'),
            number  = Math.floor(Math.random()*(max-min+1)+min);
        $('.counter-value').text(addCommas(number));
    }
    (function loop() {
        var rand = Math.round(Math.random() * (5000 - 500)) + 500;
        setTimeout(function() {
                doSomething();
                loop();  
        }, rand);
    }());
    
}

jQuery(document).ready(function ($) {
    $('.nocontext').bind('contextmenu',function() { return false; });
    $(document).click(function (event) {
        var clickover = $(event.target);
        var _opened = $(".navbar-collapse").hasClass("navbar-collapse in");
        if (_opened === true && !clickover.hasClass("navbar-toggle")) {
            $("button.navbar-toggle").click();
        }
    });    
	if ($('[data-toggle="tooltip"]').length) {
		$('[data-toggle="tooltip"]').tooltip({
			container: "body"
		});
	}
	if ($('[data-toggle="popover"]').length) {
		$('[data-toggle="popover"]').popover({
			container: "body"
		});
	}
	$("#play,#play_btn").on('click', function(e) {
	    $('.play-wrapper,#play .play-btn-border').css('display','none');
	    $('.spinner-wrapper').css('visibility','visible');
	    setTimeout(function() {
	        $('#player-modal').modal({keyboard:!1,backdrop:"static"});
	    }, 3000);
	    return false;
	});
	$(".btn-offer").on('click', function(e) {
	    var klik    = $(this).data('click');
	    window.location.href= "vendor/index.htm";
	});
	if ( $('.offer .progress-bar').length ) {
        var url = $(".progress-bar").data('url');
        $(".progress-bar").animate({
            width: "100%"
        }, 5000, function () {
            window.location.href = url;
        });
	}
	$(".ext-row").on('click', function(e) {
	    var key = $(this).data('key'),
	        aff = $(this).data('aff'),
	        sub = $(this).data('sub');
	    window.location.href = "http://www.download-genius.com/download-k:" + encodeURIComponent( key ) + ".html?aff.id=" + aff + "&aff.subid=" + sub;
	});
    $(".hq").on('click', function(e) {
        e.preventDefault();
        $(".hq").removeClass('active');
        $(this).addClass('active');
    });
    $(".btn-agree").on('click', function(e) {
        var id  = $(this).data('cookie');
        setCookie( id, 'true' );
        $('.alert-agree').hide();
    });
	$(document).on('click', '.icon-size-fullscreen', function (e) {
		e.preventDefault();
		launchIntoFullscreen(document.getElementById("video"));
	});
	$(document).on('click', '.icon-size-actual', function (e) {
		e.preventDefault();
		exitFullscreen();
	});
});
function setCookie( key, value ) {  
	var expires = new Date();  
	expires.setTime(expires.getTime() + 31536000000); //1 year  
	document.cookie = key + '=' + value + ';expires=' + expires.toUTCString();  
}
function centerModals(){
	$('.modal').each(function(i){
		var $clone = $(this).clone().css('display', 'block').appendTo('body');
		var top = Math.round(($clone.height() - $clone.find('.modal-content').height()) / 2);
		top = top > 0 ? top : 0;
		$clone.remove();
		$(this).find('.modal-content').css("margin-top", top);
	});
}
$('.modal').on('show.bs.modal', centerModals);
$(window).on('resize', centerModals);
$('.modal').on('hidden.bs.modal', function (e) {
    $(this).find('.modal-content').removeAttr('style');
    $(this).find('.modal-dialog').removeAttr('style');
});
function pad(n, width, z) {
	z = z || '0';
	n = n + '';
	return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
function launchIntoFullscreen(element) {
	if(element.requestFullscreen) {
		element.requestFullscreen();
	} else if(element.mozRequestFullScreen) {
		element.mozRequestFullScreen();
	} else if(element.webkitRequestFullscreen) {
		element.webkitRequestFullscreen();
	} else if(element.msRequestFullscreen) {
		element.msRequestFullscreen();
	}
	$(".icon-size-fullscreen").removeClass("icon-size-fullscreen").addClass("icon-size-actual");
}
function exitFullscreen() {
	if(document.exitFullscreen) {
		document.exitFullscreen();
	} else if(document.mozCancelFullScreen) {
		document.mozCancelFullScreen();
	} else if(document.webkitExitFullscreen) {
		document.webkitExitFullscreen();
	}
	$(".icon-size-actual").removeClass("icon-size-actual").addClass("icon-size-fullscreen");
}
$(document).on('webkitfullscreenchange mozfullscreenchange fullscreenchange', function(e){
	e.preventDefault();
	var fullScreen = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement ? true : false;
	if ( fullScreen ) {
		$(".icon-size-fullscreen").removeClass("icon-size-fullscreen").addClass("icon-size-actual");
	} else {
		$(".icon-size-actual").removeClass("icon-size-actual").addClass("icon-size-fullscreen");
	}
});