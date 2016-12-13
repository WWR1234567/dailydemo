

/*//要传入的数据类型如下
 *[ {subject:Object,rule:[{method:move,multiple:1}]},... ]
 * 参数subject:要执行方法的对象
 * 参数:rule:[ {method:方法名，multiple:number，argument:{} },{} ]
 *     multiple:每隔几个系统时间执行一次
 * 	   arguments:参数
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
		//定义定时器变量
		this.argument=arguments[0];//保存传入的参数
		this.flag=0;//计数变量	
		this.state=true;//系统是否在暂停状态,默认正常
		clearInterval(this.timer);
		this.timer=null;
	}
	//系统的定时器
	this.timerEvent=function(){
		var that=this
		that.timer=setInterval(function(){
			if(that.state){
				//that.AdditionalRun();
				that.processingData();
				that.flag++;
			}		
		},50)
	}
	//处理传入的参数	
	this.processingData=function(){
		var Arr=this.argument;
		if(Arr){
			for(var i=0,len=Arr.length;i<len;i++){
				var obj=Arr[i].subject;
				var ruleArr=Arr[i].rule;
				for(var j=0;j<ruleArr.length;j++){
					if(this.flag%ruleArr[j].multiple===0){
						obj[ruleArr[j].method](ruleArr[j].argument);
					}							
				}
			}
		}
	}
}
