
function drawWord(CTX,str,x,y){
	CTX.font= "20px Georgia";
	/*var gradient = CTX.createLinearGradient(x,y,x+str.length*8,y);        //设置渐变属性
	gradient.addColorStop("0","magenta");
	gradient.addColorStop("0.5","blue");
	gradient.addColorStop("1","red");*/
	
	CTX.fillStyle = 'rgb(109,252,241)';
	CTX.fillText(str,x,y);
}
function drawWord2(CTX,str,x,y){
	CTX.font= "10px Georgia";
	/*var gradient = CTX.createLinearGradient(x,y,x+str.length*8,y);        //设置渐变属性
	gradient.addColorStop("0","magenta");
	gradient.addColorStop("0.5","blue");
	gradient.addColorStop("1","red");*/
	
	CTX.fillStyle = 'rgb(109,252,241)';
	CTX.fillText(str,x,y);
}
////////////////////文字从大变小的效果

/////////////////////////////////////
function Word(X,Y,Str,Type){   ///用于敌人消失时的文字显示
	this.x = X;
	this.y = Y;
	this.str = Str;
	this.type = Type;    //用于区别缩小图，上升图
	this.size = 200;     //文字初始大小
	this.wordTime = 60;  //缩小后显示时间
	this.life = 60;      //生命1秒
}
Word.prototype.draw = function(CTX){
	CTX.font= "10px Georgia";
	//var gradient = CTX.createLinearGradient(x,y,x+str.length*8,y);        //设置渐变属性
	//gradient.addColorStop("0","magenta");
	//gradient.addColorStop("0.5","blue");
	//gradient.addColorStop("1","red");
	this.life--;
	this.y-=0.5; //移动效果
	CTX.fillStyle = 'rgb(37,174,214)';
	CTX.fillText(this.str,this.x,this.y);
}
////////////////绘制缩放文字
Word.prototype.draw2 = function(CTX,index){
	if(this.size >= 100){  //文字的缩小
		this.size-=3;	
	}
	else{  //文字缩小后
		if(this.wordTime>=0){ //显示一秒
			this.wordTime--;	
		}
		else{
			words.splice(index,1);
		}
	}
	
	CTX.font= String(this.size)+'px Georgia';
	//var gradient = CTX.createLinearGradient(this.x,this.y,this.x+this.str.length*10,this.y);        //设置渐变属性
	//gradient.addColorStop("0","magenta");
	//gradient.addColorStop("0.5","blue");
	//gradient.addColorStop("1","red");
	CTX.shadowColor = 'rgb(21,228,241)';
	CTX.shadowBlur = 20;
	//CTX.fillStyle = 'rgb(21,228,241)';
	CTX.fillStyle = 'rgb('+Math.floor(random(100,255))+','+Math.floor(random(100,255))+','+Math.floor(random(100,255))+')';
	CTX.fillText(this.str,this.x-this.size,this.y);
}

///////创建相关
function createWords(X,Y,Str,Type){
	words.push(new Word(X,Y,Str,Type));
}
function drawWords(CTX){
	
	var l = words.length;
	while(l--){
		if(words[l].life!=0){
			if(words[l].type == 1){
				words[l].draw(CTX);	
			}
			else if(words[l].type == 2){
				words[l].draw2(CTX,l);	
			}
		}
		else{
			words.splice(l,1);	
		}
	}
}
