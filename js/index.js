$(function(){

	var _opt = {
		element:".frame-ani",
		frameCount:25,
		src:"img/yijian.png",
		circle:true,
		frequency:70,
		autoPlay:true,
		complete:function(elm){
			console.log("执行完成！");
		}
	}

	var frame = new frameAni(_opt);

	$(document).on("touchstart click",function(e){
		if (frame.lock) return false;
		frame.play();
	})
})
//element,frameCount,frequency,circle,src,autoPlay,complete
function frameAni (option) {
	var elm = $(option.element), img = new Image(), time = null, scope = this, $img = null, load = false;
	this.lock = true;
	
	var run = function(){
		if (elm.find("img").length > 0) {
			$img = elm.find("img").css("margin-left","0px");
		}else{
			$img = $(img).css("margin-left","0px");
			elm.html("").append($img)
		}
		var _W = $img.width();
		var _H = $img.height();
		var step = _W / option.frameCount;
		elm.css({width:step,height:_H});
		var start = 0;
		time = setInterval(function(){
			start += step;
			if(start >= step*(option.frameCount - 1)){
				if (option.circle) {
					start = 0;
				}else{
					option.complete && option.complete(elm);
					scope.lock = false;
					clearInterval(time);
					return false;
				}
			}
			$img.css("margin-left", -start + "px");
		},option.frequency)
	}

	img.onload = function(){
		load = true;
		if (option.autoPlay || option.circle) run();
	}
	img.src = option.src;

	this.play = function(){
		if (!load) {alert("Image's not load complete!");return false;}
		if (this.lock) return false;
		this.clear();
		run();
		return this;
	}

	this.clear = function(){
		if ($img) $img.css("margin-left", "0px");
		this.lock = true;
		clearInterval(time);
		return this;
	}
}
//preload
function preload(images, complete) {
    var total = new Array();
    for (var i = 0; i < images.length; i++) {
        var _img = new Image();
        _img.onload = function () {
            total.push(this);
            total.length === images.length && complete && complete();
        };
        _img.src = "img/" + images[i];
    };
}