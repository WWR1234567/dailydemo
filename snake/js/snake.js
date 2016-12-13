/*
 * //系统构造函数
 * 参数例:{first:oSnake,second:oFood,score:ele}
 * 需要一个蛇对象和一个食物对象
 */
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
	this. processingData=function(){
		
	}
}

//生成蛇对象
/*
 *必须参数 number:要生成的蛇的的截数
 * 		  parent:要放入的父元素
 * 可选产数
 * 		width:每一节的宽度
 * 		background:每一节的背景
 * 		left,top:初始出现的位置
 * 		velocity:初始速度
 */
function CreateSnake(){
	this.argument=arguments[0];//
	this.arrSnake=[];
	this.velocity=this.argument.velocity || 10;;
	this.speed={direction:true,sign:1};
	this.width=this.argument.width || 10;
	this.frequency=0;//已运动次数
	this.score=0;//计分
	this.difficulty=0;
	this.difficultyAarry=[20,100,200,300,500]
	//初始化函数	
	this.init=function(nWidth){
		var oSnake=document.createElement("div");
		var nWidthD=nWidth || 0;
		oSnake.style.position='absolute';
		if(this.arrSnake.length==0){
			oSnake.style.left=(this.argument.left || 300) +'px';
			oSnake.style.top=(this.argument.top || 100) +'px';
			oSnake.style.background='red';
			oSnake.style.borderRadius='40%';
		}else{
			oSnake.style.left=( this.arrSnake[this.arrSnake.length-1].offsetLeft-nWidth-2 )+'px';
			oSnake.style.top=this.arrSnake[this.arrSnake.length-1].offsetTop+'px';
			oSnake.style.background=this.argument.background || 'blue';
		}
		oSnake.style.border='1px solid #fff';
		oSnake.style.width=this.width+'px';
		oSnake.style.height=this.width+'px';
		
		this.argument.parent.appendChild(oSnake);
		this.arrSnake.push(oSnake);
	}	
	//创建初始化的蛇
	for(var i=0;i<this.argument.number;i++){
		this.init(this.width);
	}
	//移动的函数
	/*
	 * 移动函数需要穿入一个对象，
	 * 属性direction指运动方向,true为左右，false为上下
	 * 属性number代表速度的正负
	 */
	this.move=function(){
		var speed=this.speed;
		if(speed.direction){
			for(var i=this.arrSnake.length-1;i>0;i--){
				this.arrSnake[i].style.left=this.arrSnake[i-1].offsetLeft+'px';
				this.arrSnake[i].style.top=this.arrSnake[i-1].offsetTop+'px';			
			}
			this.arrSnake[0].style.left=(this.arrSnake[0].offsetLeft+speed.sign*this.arrSnake[0].offsetWidth)+'px';
		}else{
			for(var i=this.arrSnake.length-1;i>0;i--){
				this.arrSnake[i].style.left=this.arrSnake[i-1].offsetLeft+'px';
				this.arrSnake[i].style.top=this.arrSnake[i-1].offsetTop+'px';			
			}
			this.arrSnake[0].style.top=(this.arrSnake[0].offsetTop+speed.sign*this.arrSnake[0].offsetWidth)+'px';
		}
		this.frequency++;
		if(this.frequency>10000){this.frequency=1};
	}
	//检测运动方向
	this.checkDirection=function(){
		var that=this;
		document.onkeyup=function(){
		//上、下、左、右的keyCode:38、40、37、39;
			if(that.frequency){//改变运动方向的时候至少运行一次
				var e=arguments[0] || window.event;
				switch(that.speed.direction){
					case true:
						if(e.keyCode==40){
							that.speed.direction=false;that.speed.sign=1;
						}else if(e.keyCode==38){
							that.speed.direction=false;that.speed.sign=-1;
						}
						break;
					case false:
						if(e.keyCode==39){
							that.speed.direction=true;that.speed.sign=1;
						}else if(e.keyCode==37){
							that.speed.direction=true;;that.speed.sign=-1;
						}
						break;
					default: return;
				}
				that.frequency=0;
			}
		}
	}
	this.checkDirection();
	//检测吃东西
	/*
	 *Array:你要吃掉东西的数组 
	 */
	this.eat=function(Array,obj){
		var arr=Array;
		var Main=this.arrSnake[0];
		var nLeft=Main.offsetLeft;
		var nTop=Main.offsetTop;
		var nTopM=nTop+Main.offsetHeight;
		var nLeftM=nLeft+Main.offsetWidth;
		for(var i =0;i<arr.length;i++){
			var fLeft=arr[i].offsetLeft;
			var fTop=arr[i].offsetTop;
			var fLeftM=arr[i].offsetWidth+fLeft;
			var fTopM=arr[i].offsetHeight+fTop;
//			  if(myPlan.offsetLeft+myPlan.offsetWidth>arrEnemy[k].offsetLeft){
//              if(myPlan.offsetLeft<arrEnemy[k].offsetLeft+arrEnemy[k].offsetWidth){
//                  if(myPlan.offsetTop+myPlan.offsetHeight>arrEnemy[k].offsetTop){
//                      if(myPlan.offsetTop<arrEnemy[k].offsetTop+arrEnemy[k].offsetHeight)
			//碰撞检测列子
			if(nLeftM>fLeft){
				if(nLeft<fLeftM){
					if(nTopM>fTop){
						if(nTop<fTopM){
							this.score += arr[i].score;
							this.schedule();
							if(arr[i].treasure){
								this.recognize(arr[i].treasure,obj);
							}
							arr[i].remove();
							arr.splice(i,1);
							this.init(-2);
							i--;							
						}
					}
				}
			}				
		}
	}
	//边界检测
	/*参数
	 *callback:当碰到边界的回调函数
	 *o_this:执行回调函数的对象 
	 * */
	this.boundaryDetection=function(callback,o_this){
		var oSnake=this.arrSnake[0];
		var oFather=this.argument.parent;
		if(oSnake.offsetTop<=0 || oSnake.offsetTop>=oFather.offsetHeight-20){
			if(callback){
				callback.call(o_this);
				clearInterval(o_this.timer)
			}
		}else if( oSnake.offsetLeft<=0 || oSnake.offsetLeft>=oFather.offsetWidth-20 ){
			if(callback){
				callback.call(o_this);
				clearInterval(o_this.timer)
			}
		}
	}
	//是否咬到自己
	/*
	 callback:当碰到边界的回调函数
	 *o_this:执行回调函数的对象  
	 * */
	this.bite=function(callback,_this){
		var arr=this.arrSnake;
		var Main=this.arrSnake[0];
		var nLeft=Main.offsetLeft;
		var nTop=Main.offsetTop;
		var nTopM=nTop+Main.offsetHeight;
		var nLeftM=nLeft+Main.offsetWidth;
		for(var i =1;i<arr.length;i++){
			var fLeft=arr[i].offsetLeft;
			var fTop=arr[i].offsetTop;
			var fLeftM=arr[i].offsetWidth+fLeft;
			var fTopM=arr[i].offsetHeight+fTop;
			if(nLeftM>fLeft){
				if(nLeft<fLeftM){
					if(nTopM>fTop){
						if(nTop<fTopM){
							callback.call(_this);
							clearInterval(_this.timer)
						}
					}
				}
			}				
		}
	}
	//计分函数
	this.showScore=function(){
		this.argument.score.innerHTML=this.score;
	}
	//增加游戏难度
	this.schedule=function(){
		if(this.score>this.difficultyAarry[this.difficulty]){
			this.velocity= Math.round( (this.velocity)/2 )
			this.difficulty++;
			if(this.velocity<=1){
				this.velocity=1;
			}
			if(this.difficultyAarry[this.difficulty]==undefined){
				this.difficultyAarry[this.difficulty]=this.difficultyAarry[this.difficulty-1]+100;
			}
		}
	}
	//
}
CreateSnake.prototype={
	//判断吃到什么宝贝
	recognize:function(code,obj){
		switch(code){
			case 1:break;
			case 2:this.slowDown();break;
			case 3:this.cutSnake();break;
			case 4:this.LuckyValue(obj);break;
			case 5:this.largen(obj);break;
			default:return;
		}
	},
	slowDown:function(){
		this.velocity=this.velocity+1;
	},
	cutSnake:function(){
		if(this.arrSnake.length<this.argument.number){
			return;
		}else{
			for(var i=this.arrSnake.length-1,j=0;j<8;j++){
				this.arrSnake[i].remove();
				this.arrSnake.splice(i,1);
				i--;
			}
		}
	},
	LuckyValue:function(obj){
		obj.probability +=5;
	},
	largen:function(obj){
		for(var i=0;i<obj.arrFood.length;i++){
			var oSfood=obj.arrFood[i];
			if(oSfood.treasure){continue}
			oSfood.style.width=2*obj.width+'px';
			oSfood.style.height=2*obj.height+'px';
			oSfood.score=obj.scroing*50;
			oSfood.duration=50;
			oSfood.src='img/apple.png';
			oSfood.treasure=1;
		}
	}
}
//生成食物对象
/*
 *必须参数
 * 		parent:要添加到那个元素里面
 *可选参数
 * 		bg:背景
 *		width,height:生成的每一个的宽、高
 * 		scoring:每一只小的设置为多少分;
 * 		probability:生成额外加成道具的概率，该数值为0-100;默认为10;
 * 		duration:页面上的食物最多显示多少个
 */
function CreateFood(obj){
	this.argument=arguments[0];
	this.parent=obj.parent;
	this.width=obj.width || 10;
	this.height=obj.height || 10;
	this.scroing=obj.scoring || 1;
	this.src=obj.src || 'img/chong.png';
	this.probability=obj.probability || 10;
	this.duration=obj.duration || 100;
	this.arrFood=new Array();
	//生成食物函数
	this.init=function(){
		var oFood=document.createElement("img");
		oFood.src=this.src;
		var _left=Math.round( Math.random()*(this.parent.offsetWidth-this.width-8) );
		var _top=Math.round( Math.random()*(this.parent.offsetHeight-this.width-8) )
		this.parent.appendChild(oFood);	
		oFood.score=this.scroing;
		oFood.duration=this.duration;
		oFood.style.position='absolute';
		oFood.style.width=this.width+'px';
		oFood.style.height=this.height+'px';
		oFood.style.left=_left+'px';
		oFood.style.top=_top+'px';
		this.arrFood.push(oFood);
		this.Superfood();
	}
	//生成宝贝
	this.Superfood=function(){
		if( Math.floor( Math.random()*100 )<this.probability ){
			var oSfood=this.arrFood[this.arrFood.length-1];//得到要改变的那个食物
			var nRandom=Math.floor( Math.random()*100 );//
			if(nRandom<50){					//加分宝
				oSfood.style.width=2*oSfood.offsetWidth+'px';
				oSfood.style.height=2*oSfood.offsetHeight+'px';
				oSfood.score=oSfood.score*50;
				oSfood.duration=50;
				oSfood.src='img/apple.png';
				oSfood.treasure=1;
			}else if(nRandom<55){					//减速宝
				oSfood.style.width=2*oSfood.offsetWidth+'px';
				oSfood.style.height=2*oSfood.offsetHeight+'px';
				oSfood.score=oSfood.score*20;
				oSfood.duration=10;
				oSfood.src='img/blueberry.png';
				oSfood.treasure=2;
			}else if(nRandom<60){					//减蛇的长度
				oSfood.style.width=2*oSfood.offsetWidth+'px';
				oSfood.style.height=2*oSfood.offsetHeight+'px';
				oSfood.score=oSfood.score*20;
				oSfood.duration=10;
				oSfood.src='img/banana.png';
				oSfood.treasure=3;
			}else if(nRandom<70){					//增加宝贝出现的概率
				oSfood.style.width=2*oSfood.offsetWidth+'px';
				oSfood.style.height=2*oSfood.offsetHeight+'px';
				oSfood.score=oSfood.score*20;
				oSfood.duration=10;
				oSfood.src='img/pear.png';
				oSfood.treasure=4;
			}else if(nRandom<90){					//宝贝全屏道具
				oSfood.style.width=2*oSfood.offsetWidth+'px';
				oSfood.style.height=2*oSfood.offsetHeight+'px';
				oSfood.score=oSfood.score*20;
				oSfood.duration=10;
				oSfood.src='img/cherry.png';
				oSfood.treasure=5;
			}
		}		
	}
	//食物持续时间减
	this.minus=function(){
		for(var i=0;i<this.arrFood.length;i++){
			this.arrFood[i].duration--;
			if(this.arrFood[i].duration<=0){
				this.arrFood[i].remove();
				this.arrFood.splice(i,1);
				i--;
			}
		}
	}
	//食物消失
	this.disappear=function(){
		
	}
	//消失闪烁效果
	this.flicker=function(){
		
	}
}


