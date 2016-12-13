 //top效果
 $('.dropdown').hover(function () {
        $(this).toggleClass('hover');
 });
 //header点击效果
 $('.search-form label,.search-form ul').on('click',function(){
 	if( $('.search-form ul').css('display')=='none' ){
 		$('.search-form ul').css('display','block');
 		$('.search-form ul li').on('click',function(){
 			$('.search-form label').html( $(this).html() )
 		})
 	}else{
 		$('.search-form ul').css('display','none')
 	}
 })
 
  	$('.categorys .item').hover(function () {
        $(this).toggleClass('hover');
    })
    if ($('.category').css('display') == 'none') {
        $('.categorys').hover(function () {
            $('.category').show();
        });
        $('.categorys').mouseleave(function () {
            $('.category').hide();
        });
    }
	//banner图渐变切换
	$(function () {
		var _width=$('.slide-items').width();
		var _height=$('.slide-items').height();
		var nCw=_width/2;
		var nCh=_height/2;
		var index=0;
		var picTimer;
		var len=$('.slide-items li').length;
		$(".slide-controls span").mouseover(function () {
            index = $(".slide-controls span").index(this);
			clearInterval(picTimer);
            showPics(index);
        }).eq(0).trigger("mouseover");
        
		$(".slide-items").hover(function (){
            clearInterval(picTimer);
        }, function () {
            picTimer = setInterval(function () {
                showPics(index);
                index++;
                if (index == len) { index = 0; }
            }, 4000);
        }).trigger("mouseleave");
        
		function showPics(index){
			$('.slide-items li a img').css({left:nCw-1000,top:nCh-260,height:'520px',width:'2000px'});
			$('.slide-items li').css('z-index','0')
			$('.slide-items li a').stop();
			$('.slide-items li').eq(index).css('z-index',2);
			$('.slide-items li a img').eq(index).stop().animate({top:0,height:_height,left:nCw-950,width:1900},2000);
			$(".slide-controls span").removeClass("cur").eq(index).addClass("cur");
		}
	})
	
	$('.small-banner a').on('mouseenter',function(){
		$(this).stop().animate({left:-5},200);
		$(this).children().stop().animate({opacity:1},200);
	})
	$('.small-banner a').on('mouseleave',function(){
		$(this).stop().animate({left:0})
		$(this).children().stop().animate({opacity:0.8},200);
	})
	
	//
	$('.content_recont li img').on('mouseenter',function(){
		$(this).stop().animate({left:-5},'fast')
	}).on('mouseleave',function(){
		$(this).stop().animate({left:0},'fast')
	});
	

	$('.menu-top li,.menu-bot li').not( $('#right_cart')[0] ).hover(function(){		
		$(this).find('span').css({'display':'inline-block'})
		$(this).find('span').stop().animate({right:40,opacity:1})
	}).on('mouseleave',function(){
		var t=$(this).find('span');
		$(this).find('span').stop().animate({right:60,opacity:0},function(){
			t.css('display','none');			
		});
	});
	//返回顶部
	$('.go-top').click(function(){
		$("html,body").animate({scrollTop:0},500);
//		var timer222=setInterval(function(){
//			var _height=$(window).scrollTop()/2;
//			document.body.scrollTop=_height;
//			if(_height<=0.1){_height=0,
//				clearInterval(timer222);
//			}			
//		},50)
	})
	//商品tab切换
	$('.floor-hd li').hover(function(){
		$(this).siblings().removeClass();
		$(this).addClass('active');
		var oU=$(this).parent().parent().next().find('.content-right-box').find('ul') 
		oU.hide().eq( $(this).index() ).show()
	});
	
	//楼层中的图标切换
	$('.content-brand .prev').on('click',function(){
		var oS=$(this).siblings().find('.scroll-A');
		var t=Math.ceil( oS.eq(0).offset().left/(-188)+1 );
		if(t>2){t=0};
		oS.animate({left:-188*t})
	});
	$('.content-brand .next').on('click',function(){
		var oS=$(this).siblings().find('.scroll-A');
		var t=Math.floor( oS.eq(0).offset().left/(-188) );
		console.log(t)
		if(t<0){t=2};
		oS.animate({left:-188*t})
	});
	//楼层的按钮
	$(window).scroll(function(){
		if( $(window).scrollTop()>= 800 ){
			$('.floor-nav').css('display','block');
			var Nindex=Math.floor( ( $(window).scrollTop()-1206 )/764 );
			
			if(Nindex>=0){
				$('.floor-nav li').find('span').css( 'display','none');
				$('.floor-nav li').find('em').css( 'display','block');
				$('.floor-nav li').removeClass().eq(Nindex).addClass('cur');
				$('.floor-nav li').eq(Nindex).find('em').css('display','none')
				$('.floor-nav li').eq(Nindex).find('span').css('display','block')
			}
		}else{
			$('.floor-nav').css('display','none')
		}
	});
	$('.floor-nav li').on('click',function(){
		$("html,body").animate({scrollTop:1206+764*$(this).index()},500);
	}).hover(function(){
		$(this).addClass('cur');
		$(this).find('em').css('display','none')
		$(this).find('span').css('display','block')
	}).mouseleave(function(){
		var Nindex=Math.floor( ( $(window).scrollTop()-1206 )/764 );
		if($(this).index() != Nindex ){
			$(this).removeClass('cur');
			$(this).find('em').css('display','block')
			$(this).find('span').css('display','none')
		}				
	})
	
	$('.BD-mid .bd-prev').on('click',function(){
		var t=-Math.floor( $('.scroll-wrap').offset().left/550 )//7
		var len=$('.scroll-wrap').children().length//7
		if(t==0){
			t=len;
		}
		$('.scroll-wrap').stop().animate( { left:-(t-1)*550 }  )
	});
	$('.BD-mid .bd-next').on('click',function(){
		var t=-Math.floor( $('.scroll-wrap').offset().left/550 )//7
		var len=$('.scroll-wrap').children().length//7
		if(t==len-1){
			t=-1;
		}
		$('.scroll-wrap').stop().animate( { left:-(t+1)*550 }  )
	});

	$('.linkothers dd').hover(function(){
		if($(this).find('img').attr('src').length==10){
			var str=$(this).find('img').attr('src');
			var ttt=str.split('')
			ttt.splice(6,0,'2')
			var fff=ttt.join('');
			//console.log(fff)
			$(this).find('img').attr('src',fff)
		}else{
			var str=$(this).find('img').attr('src');
			var ttt=str.split('')
			ttt.splice(6,1)
			var fff=ttt.join('');
			$(this).find('img').attr('src',fff)
		};
	});
	




