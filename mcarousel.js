/*************************************************************************************************************
compatible with ie7+, Firefox, Chrome, Opera, Safari
M-CAROUSEL version 0.3 (matija.milkovic@gmail.com)

Copyright (c) 2013, Matija Milković
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, 
this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, 
BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. 
IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, 
INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; 
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, 
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*************************************************************************************************************/		

(function( $ ) {

	
	$.fn.mcarousel = function( options ) {
	
	var totalWidth = $( window ).width();		
	var settings = $.extend({
            // These are the defaults.
            width: "400",
            height: '225',
			heightBig :'400',
			widthBig : '400',
			topPositionCentral : '50',
			topPosition : '100',
			starting: '1',
			element: 'div'
    }, options );

		console.log(settings);
			var width = settings.width;
			var height = settings.height;
			var heightBig= settings.heightBig;
			var widthBig = settings.widthBig;
			var topPositionCentral = settings.topPositionCentral+'px';
			var topPosition = settings.topPosition+'px';
			var centerPosition= totalWidth/2 - width/2;
			var leftPosition = centerPosition - width/2;
			var rightPosition = centerPosition + width/2;
			var starting = settings.starting;
	
	startCarousal(starting);
		
	function startCarousal(starvar) {

		var total = $('#carousel-container div').length;
		var start = starvar
		var hRight = start+2;
		var right = start+1;
		var hLeft = start -2;
		var left = start -1;
		if (start+1> total) {
			right = 1;
			hRight = 2;
		}
		
		if (start+2 > total && start+1 == total) {
			right = total;
			hRight = 1;
		}
		
		if (start - 1  == 0) {
			left = total;
			hLeft = total-1;
		}
		
		if (start - 2 == 0 && start > 0){
			left = 1;
			hLeft = total;			
		}
		
			
			$('.mcarousel-item').removeClass();
			

			
			$('#carousel-container > div').each(function(i) {
				$(this).addClass('mcarousel-item');
				$(this).css({'height' : height , 'width' : width, 'left':centerPosition, 'z-index':0, 'top':topPosition , 'display':'none'});
				var number = i + 1;
				if( number == hLeft) {
					$(this).addClass('mcarousel-left-hidden');
					$(this).css({'height' : height , 'width' : width, 'left':centerPosition, 'z-index':0, 'top':topPosition , 'display':'none'});
				}
				if( number == left ){
					$(this).addClass('mcarousel-left');
					$(this).css({'height' : height , 'width' : width, 'left':leftPosition, 'z-index':1 , 'top':topPosition , 'display':'block'});
				}
				if( number == start) {
					$(this).addClass('mcarousel-center');
					$(this).css({'height' : heightBig , 'width' : width, 'left':centerPosition, 'z-index':2 , 'top':topPositionCentral , 'display':'block'});
				}
				if( number == right){
					$(this).addClass('mcarousel-right');
					$(this).css({'height' : height , 'width' : width, 'left':rightPosition, 'z-index':1 , 'top':topPosition , 'display':'block'});
				}
				if( number == hRight){
					$(this).addClass('mcarousel-right-hidden');
					$(this).css({'height' : height , 'width' : width, 'left':centerPosition, 'z-index':0 , 'top':topPosition, 'display':'none'});
				}
			});
		}
	
    $(document).on('click' , '.mcarousel-right', function() {

		var centralPosition= $('.mcarousel-center').position();
		var movePositionRight = $('.mcarousel-right').position();
		var movePositionLeft = $('.mcarousel-left').position();
		var widthSmall = $('.mcarousel-left').width();
		var heightSmall = $('.mcarousel-left').height();
		var widthBig = $('.mcarousel-center').width();
		var heightBig = $('.mcarousel-center').height();
		 
			
		$('.mcarousel-left').animate({ left: centralPosition.left , height:heightSmall, width:widthSmall  }).removeClass('mcarousel-left').addClass('mcarousel-left-hidden');
		$('.mcarousel-left-hidden').css('z-index', '0')
	
	
		$('.mcarousel-center').animate({ left: movePositionLeft.left, top:movePositionLeft.top , height:heightSmall, width:widthSmall   }, function(){
		$('.mcarousel-left').css('z-index', '1')

		
		var total = $('#carousel-container div').length;
		var start = $('.mcarousel-center').index() + 1;
		
		startCarousal(start);
		
		}).removeClass('mcarousel-center').addClass('mcarousel-left');
		
		
		
		$('.mcarousel-right').css('z-index', '3');	
		$('.mcarousel-right').animate({ left: centralPosition.left, top:centralPosition.top  , height:heightBig, width:widthBig}  ).removeClass('mcarousel-right').addClass('mcarousel-center');
		
		$('.mcarousel-right-hidden').css('z-index', '1');
		$('.mcarousel-right-hidden').fadeIn('fast').animate({ left: movePositionRight.left ,  height:heightSmall, width:widthSmall  }).removeClass('mcarousel-right-hidden').addClass('mcarousel-right');

	});
	
	 $(document).on('click' , '.mcarousel-left', function() {

		var centralPosition= $('.mcarousel-center').position();
		var movePositionRight = $('.mcarousel-right').position();
		var movePositionLeft = $('.mcarousel-left').position();
		var widthSmall = $('.mcarousel-left').width();
		var heightSmall = $('.mcarousel-left').height();
		var widthBig = $('.mcarousel-center').width();
		var heightBig = $('.mcarousel-center').height();
		 
			
		$('.mcarousel-right').animate({ left: centralPosition.left,  height:heightSmall, width:widthSmall  }).removeClass('mcarousel-right').addClass('mcarousel-right-hidden');
		$('.mcarousel-right-hidden').css('z-index', '0');
	
	
		$('.mcarousel-center').animate({ left: movePositionRight.left,  top:movePositionRight.top , height:heightSmall, width:widthSmall   }, function(){
		$('.mcarousel-right').css('z-index', '1');

		
		var total = $('#carousel-container div').length;
		var start = $('.mcarousel-center').index() + 1;
		
		startCarousal(start);
		
		}).removeClass('mcarousel-center').addClass('mcarousel-right');
				
		$('.mcarousel-left').animate({ left: centralPosition.left, top:centralPosition.top , height:heightBig, width:widthBig}  ).removeClass('mcarousel-left').addClass('mcarousel-center');
		$('.mcarousel-center').css('z-index', '3');	
	
		$('.mcarousel-left-hidden').fadeIn('fast').animate({ left: movePositionLeft.left,  height:heightSmall, width:widthSmall  }).css('z-index', '1').removeClass('mcarousel-left-hidden').addClass('mcarousel-left');
		$('.mcarousel-left').css('z-index', '1');	
	});
	}
}( jQuery ));	
