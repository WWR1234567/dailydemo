function System(){
	this.timer=null;//定义定时器变量
	this.argument=arguments[0];//保存传入的参数
	this.flag=0;//计数变量	
	this.state=true;//系统是否在暂停状态,默认正常
	//系统开始功能
	this.start=function(){
		if(!this.timer){
			this.timerEvent();
		}		
	}
	//系统暂停功能
	this.pause=function(){
		if(this.state){
			this.state=false;
		}
	}
	//系统继续功能
	this.goOn=function(){
		if(!this.state){
			this.state=true;
		}	
	}
	//系统结束功能
	this.finish=function(){
		this.timer=null;//定义定时器变量
		this.argument=arguments[0];//保存传入的参数
		this.flag=0;//计数变量	
		this.state=true;//系统是否在暂停状态,默认正常
	}
	//系统的定时器
	this.timerEvent=function(){
		var that=this
		that.timer=setInterval(function(){
			if(that.state){
				that.AdditionalRun();
				that.flag++;
			}		
		},50)
	}
	//处理传入的参数
	/*//要传入的数据类型如下
	 *[ {subject:Object,rule:[{method:move,multiple:1}]},... ]
	 */
	this.processingData=function(){
		var Arr=this.argument;
		if(!Arr==undefined){}
	}
}
//生成砖块对象
function CreateBrick(obj){
	this.attr=obj || {};
	this.eleArr=[];
	this.init=function(obj){
		var ele=$('<div class="brick"></div>');
		var oAttr=obj || this.attr;
		ele.css(oAttr).appendTo('#box');
		this.eleArr.push(ele);
	}
	this.distribution=function(){
		for(var i=0;;i++){
			if(parseInt( $('#box').css('width') )-36<2*i*36){
				break;
			}
			for(var j=0;;j++){
				if(parseInt( $('#box').css('height') )-30<2*j*30){
					break;
				}
				this.init({position:'absolute',left:2*i*36+'px',top:2*j*30+'px'})
			} 					
		}
	}
}
//生成坦克对象
function CreateTank() {
	this.eleArr=[];
	this.automation=false;//是否开启自动
	
	this.init=function(obj){
		var ele=$('<img/>');
		ele.attr(obj).appendTo('#box');
		ele.bullet=new CreateBullet();
		this.eleArr.push(ele);
	}
	//移动
	this.move=function(code,obj){
		switch(code){
			case 37:
					obj.attr('src','img/MyTankL.png');
					obj.css({left:obj.offset().left-$('#box').offset().left-5});
					break;		//左
			case 38:	
					obj.attr('src','img/MyTankT.png');
					//obj.style.top=obj.offsetTop-5+'px';
					break;	//上
			case 39:
					obj.attr('src','img/MyTankR.png');
					//obj.style.left=obj.offsetLeft+5+'px';
					break	//右
			case 40:	
					obj.attr('src','img/MyTankB.png');
					//obj.style.top=obj.offsetTop+5+'px';
					break;//下
			default:return;
		}
	}
	//攻击
	this.attack=function(keyCode){
		this.eleArr.bullet.init();
	}
}
//生成子弹
function CreateBullet(){
	this.arrBullet=[];
	this.init=function(){
		var ele=$('<div></div>');
		ele.css( {width:'5px',height:'10px',position:'absolute',
		background:'red',/*left:,top:*/} )
		ele.appendTo('#box');
	}
}

































