// JavaScript Document
////随机掉落卡片文件
///////卡片随机掉落，

/////////////////////////////////////////////////////////////////暴走卡
function Card(X,Y,Type){
	this.x = X;
	this.y = Y;
	this.type = Type;    //卡片的类型，共5种，1为暴走，2为激光，3导弹，4为乱射，5为雪花
	this.angleS = 0;
	this.angle = random(0,360);   //移动角度
	this.speed = 3;
	this.isGet = false;  //此张卡片，是否被击中，被吃到
}

Card.prototype.update = function(index){
	if(this.isGet == false){  //若没有选中时
		////卡片的自由移动
		this.x += this.speed*Math.cos(this.angle*Math.PI/180);
		this.y += this.speed*Math.sin(this.angle*Math.PI/180);
		
		///////////////////边缘碰撞操作,角度变换
		if(this.x >= 1300){  
			this.x = 1295;
			if(this.angle >= 0){
				this.angle = this.angle+2*(90-this.angle);
			}
			else if(this.angle <= 0){
				this.angle = this.angle-2*(90+this.angle);
			}

		}
		if(this.x <= 0){
			this.x = 5;
			if(180-this.angle >= 0){
				this.angle = 180 - this.angle;
			}
			else if(180-this.angle <= 0){
				this.angle = this.angle+2*(90-this.angle-180);
			}
		
		}
		if(this.y >= 600){
			this.y = 595;
			if(180-this.angle > 0){
				this.angle =  -this.angle;
			}
			else if(180-this.angle < 0){
				this.angle = -this.angle;
			}
			
		}
		if(this.y <= 0){
			this.y = 5;
			if(180-this.angle > 0){
				this.angle =  -this.angle;
			}
			else if(180-this.angle < 0){
				this.angle = -this.angle;
			}
			
		}
		
		
		////////////////碰撞检测
		var bl = bullets.length; //与单子弹检测
		while(bl--){
			if(distance(this.x,this.y,bullets[bl].x,bullets[bl].y) < 20 && bullets[bl].type == 1){
				this.isGet = true;  //标明被吃
				break;
			}	
		}
	}
	else{       //若卡片被吃,那么卡片移动到炮台，当与炮塔相碰后，炮台火力改变，并有一定火力持续时间
		var px = 650 - this.x;  //卡片的移动
		var py = 600 - this.y;
		var angle = Math.atan(py/px)*180/Math.PI;
		if(px<0){
			angle+=180;
		}
		this.x += 2*this.speed*Math.cos(angle*Math.PI/180);
		this.y += 2*this.speed*Math.sin(angle*Math.PI/180);
		
		if(distance(650,600,this.x,this.y) < 10){  //若与炮塔相碰，设置火力
			if(this.type<4){
				fireType = this.type;
			}
			else if(this.type==4){  //乱射技能卡
				starSkillNum++;
			}
			else if(this.type==5){  //雪花技能卡
				snowSkillNum++;
			}
			cards.splice(index,1);//释放卡片
		}
	}
	
}
Card.prototype.draw = function(CTX){
	this.angleS+=0.02;
	CTX.save();
	CTX.translate(this.x,this.y);
	CTX.rotate(this.angleS);
	var r = Math.floor(random(0,255));
	var g = Math.floor(random(0,255));
	var b = Math.floor(random(0,255));
	
	if(this.type == 1){//暴走卡
		CTX.beginPath();   ///外矩形
		CTX.strokeStyle = 'rgb('+r+','+g+','+b+')';
		CTX.lineWidth = 2;
		CTX.shadowBlur = 0;
		CTX.strokeRect(0-15,0-20,30,40);
		
		CTX.beginPath();   //三斜线
		CTX.moveTo(0+8,0-16);
		CTX.lineTo(0-8,0);
		CTX.strokeStyle = 'rgb(96,92,255)';
		CTX.lineWidth = 2;
		CTX.shadowBlur = 0;
		CTX.stroke();
		CTX.beginPath();   
		CTX.moveTo(0+8,0-8);
		CTX.lineTo(0-8,0+8);
		CTX.strokeStyle = 'rgb(92,255,245)';
		CTX.lineWidth = 2;
		CTX.shadowBlur = 0;
		CTX.stroke();
		CTX.beginPath();   //
		CTX.moveTo(0+8,0);
		CTX.lineTo(0-8,0+16);
		CTX.strokeStyle = 'rgb(255,92,238)';
		CTX.lineWidth = 2;
		CTX.shadowBlur = 0;
		CTX.stroke();
	}
	else if(this.type == 2){ //激光卡
		CTX.beginPath();   ///外矩形
		CTX.strokeStyle = 'rgb('+r+','+g+','+b+')';
		CTX.lineWidth = 2;
		CTX.shadowBlur = 0;
		CTX.strokeRect(0-15,0-20,30,40);
		
		CTX.beginPath();   //箭头
		CTX.moveTo(0,0-8);
		CTX.lineTo(0-8,0);
		CTX.strokeStyle = 'rgb(219,17,178)';
		CTX.lineWidth = 2;
		CTX.shadowBlur = 0;
		CTX.stroke();
		CTX.beginPath();   //箭头
		CTX.moveTo(0,0-8);
		CTX.lineTo(0+8,0);
		CTX.strokeStyle = 'rgb(219,17,178)';
		CTX.lineWidth = 2;
		CTX.shadowBlur = 0;
		CTX.stroke();
		CTX.beginPath();   //箭头
		CTX.moveTo(0,0-8);
		CTX.lineTo(0-4,0);
		CTX.strokeStyle = 'rgb(54,252,245)';
		CTX.lineWidth = 2;
		CTX.shadowBlur = 0;
		CTX.stroke();
		CTX.beginPath();   //箭头
		CTX.moveTo(0,0-8);
		CTX.lineTo(0+4,0);
		CTX.strokeStyle = 'rgb(54,252,245)';
		CTX.lineWidth = 2;
		CTX.shadowBlur = 0;
		CTX.stroke();
		CTX.beginPath();   //箭头
		CTX.moveTo(0,0-8);
		CTX.lineTo(0,0+8);
		CTX.strokeStyle = 'rgb(250,252,54)';
		CTX.lineWidth = 2;
		CTX.shadowBlur = 0;
		CTX.stroke();
	}
	else if(this.type == 3){  //导弹
		CTX.beginPath();   ///外矩形
		CTX.strokeStyle = 'rgb('+r+','+g+','+b+')';
		CTX.lineWidth = 2;
		CTX.shadowBlur = 0;
		CTX.strokeRect(0-15,0-20,30,40);
		
		CTX.beginPath();  //导弹
		CTX.moveTo(0,0-8);
		CTX.lineTo(0-6,0-3);
		CTX.lineTo(0-3,0+8);
		CTX.lineTo(0,0+4);
		CTX.lineTo(0+3,0+8);
		CTX.lineTo(0+6,0-3);
		CTX.lineTo(0,0-8);
		CTX.strokeStyle = 'rgb(219,17,178)';
		CTX.lineWidth = 2;
		CTX.shadowBlur = 0;
		CTX.stroke();
		
		CTX.beginPath();          //十字
		CTX.moveTo(0,0-4);
		CTX.lineTo(0,0+3);
		CTX.strokeStyle = 'rgb(250,252,54)';
		CTX.lineWidth = 2;
		CTX.shadowBlur = 0;
		CTX.stroke();
		CTX.beginPath();          //十字
		CTX.moveTo(0-4,0);
		CTX.lineTo(0+4,0);
		CTX.strokeStyle = 'rgb(250,252,54)';
		CTX.lineWidth = 2;
		CTX.shadowBlur = 0;
		CTX.stroke();
	}
	else if(this.type == 4){   //乱射卡
		CTX.beginPath();   ///外矩形
		CTX.strokeStyle = 'rgb('+r+','+g+','+b+')';
		CTX.lineWidth = 2;
		CTX.shadowBlur = 0;
		CTX.strokeRect(0-15,0-20,30,40);
	
		CTX.beginPath(); //乱射图标
		CTX.moveTo(0-10,0+8);
		CTX.lineTo(0-10,0-10);
		CTX.lineTo(0+10,0+10);
		CTX.lineTo(0+10,0-10);
		CTX.lineTo(0-7,0+8);
		CTX.strokeStyle = 'rgb(148,253,252)';
		CTX.lineWidth = 2;
		CTX.shadowBlur = 0;
		CTX.stroke();
	}
	else if(this.type == 5){   //雪花卡
		CTX.beginPath();   ///外矩形
		CTX.strokeStyle = 'rgb('+r+','+g+','+b+')';
		CTX.lineWidth = 2;
		CTX.shadowBlur = 0;
		CTX.strokeRect(0-15,0-20,30,40);
		
		CTX.beginPath();  //雪花图标
		CTX.moveTo(0,0-12);
		CTX.lineTo(0,0+12);
		CTX.strokeStyle = 'rgb(148,253,252)';
		CTX.lineWidth = 2;
		CTX.shadowBlur = 0;
		CTX.stroke();
		
		CTX.beginPath();   //雪花图标
		CTX.moveTo(0-12,0);
		CTX.lineTo(0+12,0);
		CTX.strokeStyle = 'rgb(148,253,252)';
		CTX.lineWidth = 2;
		CTX.shadowBlur = 0;
		CTX.stroke();
	
		CTX.beginPath();    //雪花图标
		CTX.moveTo(0-6,0-6);
		CTX.lineTo(0+6,0+6);
		CTX.strokeStyle = 'rgb(148,253,252)';
		CTX.lineWidth = 2;
		CTX.shadowBlur = 0;
		CTX.stroke();
	
		CTX.beginPath();    //雪花图标
		CTX.moveTo(0+6,0-6);
		CTX.lineTo(0-6,0+6);
		CTX.strokeStyle = 'rgb(148,253,252)';
		CTX.lineWidth = 2;
		CTX.shadowBlur = 0;
		CTX.stroke();
	}
	
	CTX.restore();
}
//////////////////////////////创建卡片相关
function createCards(X,Y){
	var possible = random(0,100);   //掉落的可能性
	if(possible <= 1){//掉落类型
		var type = Math.floor(random(1,600)/100);
		cards.push( new Card(X,Y,type) );  //创建卡片
	}
	
}
function drawCards(CTX){
	var l = cards.length;
	while(l--){
		cards[l].draw(CTX);
		cards[l].update(l);
	}
}