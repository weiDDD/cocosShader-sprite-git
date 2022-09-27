
//////////////////子弹们
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////单，子弹类
function Bullet(X,Y,Angle,Len,Speed,Type){  //自定义长度
	this.x = X;
	this.y = Y;
	this.angle = Angle;
	this.type = Type;
	this.isCollision = false;    //是否碰撞到敌人
	this.angleF = false;         //第一次设置角度，子弹角度更新一次，就沿角度移动
	this.acceleration = 1.04;    //加速度
	this.len = Len;                   //子弹的1/2长度
	this.speed = Speed;               //子弹速度
	this.points = [];                 //子弹的顶点数组
	this.points.push( [this.x-this.len*Math.cos(this.angle),this.y-this.len*Math.sin(this.angle)] );   //初始子弹顶点位置
	this.points.push( [this.x+this.len*Math.cos(this.angle),this.y+this.len*Math.sin(this.angle)] );
}
Bullet.prototype.setAngle = function(Angle){
	this.angle = Angle;
}
Bullet.prototype.update = function(index){      //子弹角度，位置的更新
    if(this.x>1300 || this.x<0 || this.y<0){      //当子弹跑出屏幕，移除
 		bullets.splice(index,1);   //删除
	}
	else{   //子弹在屏幕中
		var px1 = this.points[0][0];//获得第一个顶点
		var py1 = this.points[0][1];
		var px2 = this.points[1][0];//获得第二个顶点
		var py2 = this.points[1][1];
		
		this.speed*=this.acceleration;
		
		px1 += this.speed*Math.cos(this.angle);
		py1 += this.speed*Math.sin(this.angle);
		px2 += this.speed*Math.cos(this.angle);
		py2 += this.speed*Math.sin(this.angle);
		this.x += this.speed*Math.cos(this.angle);
		this.y += this.speed*Math.sin(this.angle);
		this.points[0][0] = px1;
		this.points[0][1] = py1;
		this.points[1][0] = px2;
		this.points[1][1] = py2;
		
		createPointParticlePoint(this.x,this.y,1,5);    //创建拖尾粒子
		//createPointParticleTrail(this.points[1][0],this.points[1][0],this.angle+Math.PI/2,1,5);
		//////////////与普通敌人的检测
		var enemyL = enemys.length;
		var i = enemyL;
		while(i--){
			if(distance(this.x,this.y,enemys[i].x,enemys[i].y) <= 30){
				bullets.splice(index,1);   //删除
				enemys[i].isCollision = true;    //设置敌人碰撞了
				createSounds(6);  //创建碰撞声音
				createCollisions(this.x,this.y);  //设置碰撞效果
				enemys[i].life.downLife(10);   
				break;
				//createPointParticleTrail(this.x,this.y,this.angle,8,3);
			}
		}
		/////////////////与聚合敌人的碰撞
		var l2 = gatherEnemys.length;
		while(l2--){
			if(distance(this.x,this.y,gatherEnemys[l2].x,gatherEnemys[l2].y) <= 30){
				bullets.splice(index,1);   //删除
				gatherEnemys[l2].isCollision = true;    //设置敌人碰撞了
				createSounds(6);  //创建碰撞声音
				createCollisions(this.x,this.y);  //设置碰撞效果
				gatherEnemys[l2].life.downLife(10);   
				break;
				//createPointParticleTrail(this.x,this.y,this.angle,8,3);
			}
		}
		//////////////与裤子敌人的碰撞检测
		var l3 = pantsEnemys.length;
		while(l3--){
			if(distance(this.x,this.y,pantsEnemys[l3].x,pantsEnemys[l3].y) <= 30 && pantsEnemys[l3].isGather==false){
				bullets.splice(index,1);   //删除
				pantsEnemys[l3].isCollision = true;    //设置敌人碰撞了
				createSounds(6);  //创建碰撞声音
				createCollisions(this.x,this.y);  //设置碰撞效果
				pantsEnemys[l3].life.downLife(10);   
				break;
				//createPointParticleTrail(this.x,this.y,this.angle,8,3);
			}
		}
		//////////////与炸弹敌人的碰撞检测
		var l4 = bombEnemys.length;
		while(l4--){
			if(distance(this.x,this.y,bombEnemys[l4].x,bombEnemys[l4].y) <= 30){
				bullets.splice(index,1);   //删除
				bombEnemys[l4].isCollision = true;    //设置敌人碰撞了
				createSounds(6);  //创建碰撞声音
				createCollisions(this.x,this.y);  //设置碰撞效果
				bombEnemys[l4].life.downLife(10);   
				break;
				//createPointParticleTrail(this.x,this.y,this.angle,8,3);
			}
		}
		//////////////与炮塔敌人的碰撞检测
		var l5 = gunEnemys.length;
		while(l5--){
			if(distance(this.x,this.y,gunEnemys[l5].x,gunEnemys[l5].y) <= 30){
				bullets.splice(index,1);   //删除
				gunEnemys[l5].isCollision = true;    //设置敌人碰撞了
				createSounds(6);  //创建碰撞声音
				createCollisions(this.x,this.y);  //设置碰撞效果
				gunEnemys[l5].life.downLife(10);   
				break;
				//createPointParticleTrail(this.x,this.y,this.angle,8,3);
			}
		}
		//////////////与子弹敌人的碰撞检测,单子弹无法打
		/*
		var l6 = bulletEnemys.length;
		while(l6--){
			if(distance(this.x,this.y,bulletEnemys[l6].x,bulletEnemys[l6].y) <= 30){
				bullets.splice(index,1);   //删除
				//enemys[i].isCollision = true;    //设置敌人碰撞了
				bulletEnemys[l6].life.downLife(10);   
				break;
				//createPointParticleTrail(this.x,this.y,this.angle,8,3);
			}
		}
		*/
		
	}
}
Bullet.prototype.draw = function(CTX){
	CTX.save();
	CTX.beginPath();
	CTX.moveTo(this.points[0][0],this.points[0][1]);
	CTX.lineTo(this.points[1][0],this.points[1][1]);
	
	CTX.shadowColor = 'rgb(180,25,180)';
	CTX.shadowBlur = 20;
	if(this.type == 1){
		CTX.lineWidth = 2;
		CTX.strokeStyle = 'rgb(220,240,18)';
	}
	else if(this.type == 2){//暴走状态的子弹颜色
		CTX.lineWidth = 2;
		CTX.strokeStyle = 'rgb(255,0,0)';
	}
	CTX.stroke();
	CTX.restore();
}
///////////单子弹创建相关
function createBullets(X,Y,Angle,Len,Speed,Type){
	if(Type==1){
		var l = 1;
		while(l--){
			bullets.push(new Bullet(X+random(-3,3),Y+random(-3,3),Angle,Len,Speed,Type));	
		}
	}
	else{
		var l = 3;
		while(l--){
			if(l==2){
				bullets.push(new Bullet(X+random(-3,3),Y+random(-3,3),Angle+Math.PI/36,Len,Speed,Type));	
			}
			else if(l==1){
				bullets.push(new Bullet(X+random(-3,3),Y+random(-3,3),Angle-Math.PI/36,Len,Speed,Type));	
			}
			else{
				bullets.push(new Bullet(X+random(-3,3),Y+random(-3,3),Angle,Len,Speed,Type));	
			}
		}
	}
}
function drawBullets(CTX){
	var l = bullets.length;
	while(l--){
		bullets[l].draw(CTX);	
		bullets[l].update(l);
	}
}
//////////////////////////////////////////////////////////////////////////////////////////三角子弹
function TriangleBullet(X,Y){
	
	this.x = X;
	this.y = Y;
	this.len = 10;         //三角子弹边长
	this.a = 1.05;
	this.cenToPoint = 2/3*this.len*Math.cos(Math.PI/6);  //中心距顶点距离
	this.points = [];
	this.points.push( [0,0-this.cenToPoint] );
	this.points.push( [this.len/2,0-this.cenToPoint+this.len*Math.cos(Math.PI/6)] );
	this.points.push( [-this.len/2,0-this.cenToPoint+this.len*Math.cos(Math.PI/6)] );
	this.angleS = 0;      //旋转角度
	this.speed = 0.5;
}
TriangleBullet.prototype.update = function(X,Y){   //根据参数设置位置
	this.x = X;
	this.y = Y;
}
TriangleBullet.prototype.draw = function(CTX){
	this.angleS+=5; //旋转角度++ 
	
	createPointParticlePoint((this.x)+this.cenToPoint*Math.cos((this.angleS)*Math.PI/180),(this.y)+this.cenToPoint*Math.sin(this.angleS*Math.PI/180),2,5);  //创建三角每顶点的粒子
	createPointParticlePoint((this.x)+this.cenToPoint*Math.cos((this.angleS+120)*Math.PI/180),(this.y)+this.cenToPoint*Math.sin((this.angleS+120)*Math.PI/180),2,5);
	createPointParticlePoint((this.x)+this.cenToPoint*Math.cos((this.angleS+240)*Math.PI/180),(this.y)+this.cenToPoint*Math.sin((this.angleS+240)*Math.PI/180),2,5);
	
	CTX.save();
	CTX.translate(this.x,this.y);
	CTX.rotate(this.angleS*Math.PI/180);
	CTX.beginPath();
	CTX.moveTo(this.points[0][0],this.points[0][1]);
	CTX.lineTo(this.points[1][0],this.points[1][1]);
	CTX.lineTo(this.points[2][0],this.points[2][1]);
	CTX.lineTo(this.points[0][0],this.points[0][1]);
	CTX.lineWidth = 2;
	CTX.strokeStyle = 'rgb(109,21,255)';
	CTX.shadowBlur = 0;
	CTX.stroke();
	CTX.restore();
}

//////////////////////////////////////////////////////////////////////////////////////////////圆形子弹
function CircleBullet(X,Y){
	this.x = X;
	this.y = Y;
	this.a = 1.03;   //加速度
	this.speed1 = 1; //速度
	this.speed2 = 1; //速度
	this.speed3 = 1; //速度
	this.speed4 = 1; //速度
	this.r1 = 9;
	this.r2 = 0;
	this.r3 = 0;
	this.r4 = 0;
	this.isArrive = false;   //第一圈达到没
	this.isCollision = false;
}

CircleBullet.prototype.update = function(){
	
	if(this.r1 < 100){
		this.speed1 *= this.a;
		this.r1 += this.speed1;	
	}
	else if(this.r1 >= 100&&this.isArrive == false){
		this.isArrive = true;
		this.r1 = 100;
		this.speed1 = 1;
		this.r2 = 100;
		this.r3 = 92;
		this.r4 = 84;
	}
	
	if(this.isArrive==true){
		if(this.r2 > 84){   //当第一个圈到达后，在绘制其他圆
			//this.speed2 *= this.a;
			this.r2 -=0.3;			
		}
		else{
			this.r2 = 100;
			this.speed2 = 1;
		}
		//
		if(this.r3 > 84){
			//this.speed3 *= this.a;
			this.r3 -=0.3;	
		}
		else{
			this.r3 = 100;
			this.speed3 = 1;
		}
		//
		if(this.r4 > 84){
			//this.speed4 *= this.a;
			this.r4 -=0.3;			
		}
		else{
			this.r4 = 100;
			this.speed4 = 1;
		}
	}
	//
	
}
CircleBullet.prototype.draw = function(CTX){
	CTX.beginPath();
	CTX.arc(this.x,this.y,this.r1,0,2*Math.PI);
	CTX.lineWidth = 2;
	CTX.strokeStyle = 'rgb(109,21,255)';
	CTX.stroke();
	
	CTX.beginPath();
	CTX.arc(this.x,this.y,this.r2,0,2*Math.PI);
	CTX.lineWidth = 1;
	CTX.strokeStyle = 'rgb(109,21,255)';
	CTX.stroke();
	
	CTX.beginPath();
	CTX.arc(this.x,this.y,this.r3,0,2*Math.PI);
	CTX.lineWidth = 1;
	CTX.strokeStyle = 'rgb(109,21,255)';
	CTX.stroke();
	
	CTX.beginPath();
	CTX.arc(this.x,this.y,this.r4,0,2*Math.PI);
	CTX.lineWidth = 1;
	CTX.strokeStyle = 'rgb(109,21,255)';
	CTX.stroke();
}
////////////////////////////////////////////////////////////////////////////////////////////五角星的激光子弹,长的宽的线条
function LaserBullet(X,Y){
	this.x = X;  //起始点位置
	this.y = Y;
	this.isToLen = false;   //是否到达了长度
	this.speed = 0.2;
	this.a = 1.05;
	this.points = [];
	this.pointsCount = 2;  //顶点数量
	var l = this.pointsCount;
	while(l--){
		this.points.push( [this.x,this.y] );
	}
}
LaserBullet.prototype.setAngle = function(Angle){
	this.angle = Angle;
}
LaserBullet.prototype.setPoint1 = function(X,Y){
	this.points[0][0] = X;
	this.points[0][1] = Y;
}
LaserBullet.prototype.setPoint2 = function(X,Y){
	this.points[1][0] = X;
	this.points[1][1] = Y;
}

LaserBullet.prototype.draw = function(CTX){
	CTX.beginPath();
	
		
	CTX.moveTo(this.points[0][0],this.points[0][1]);
	CTX.lineTo(this.points[1][0],this.points[1][1]);
		
	/////////////////////////////////////////////////////////////////////与普通敌人的检测
	var l1 = enemys.length;
	while(l1--){  //遍历碰撞
		if(distanceToLine(this.points[0][0],this.points[0][1],this.points[1][0],this.points[1][1],enemys[l1].x,enemys[l1].y)< 20){      //当三角激光与敌人相碰，敌人停止
				//enemys[enemysL].isCollision = true;
				//enemys[enemysL].life.downLife(this.downLife); //敌人减血5
			enemys[l1].isStop = true;
		}
	}
	////////////////// //////////////////////////////////////////////////与结合体敌人的检测
	var l2 = gatherEnemys.length;
	while(l2--){  //遍历碰撞
		if(distanceToLine(this.points[0][0],this.points[0][1],this.points[1][0],this.points[1][1],gatherEnemys[l2].x,gatherEnemys[l2].y)< 20){      //当三角激光与敌人相碰，敌人停止
				//enemys[enemysL].isCollision = true;
				//enemys[enemysL].life.downLife(this.downLife); //敌人减血5
			gatherEnemys[l2].isStop = true;
		}
	}
	///////////////////////////////////////////////////////////////////////与裤子敌人的检测
	var l3 = pantsEnemys.length;
	while(l3--){  //遍历碰撞
		if(distanceToLine(this.points[0][0],this.points[0][1],this.points[1][0],this.points[1][1],pantsEnemys[l3].x,pantsEnemys[l3].y)< 20){      //当三角激光与敌人相碰，敌人停止
				//enemys[enemysL].isCollision = true;
				//enemys[enemysL].life.downLife(this.downLife); //敌人减血5
			pantsEnemys[l3].isStop = true;
		}
	}
	///////////////////////////////////////////////////////////////////////与炸弹敌人的检测
	var l4 = bombEnemys.length;
	while(l4--){  //遍历碰撞
		if(distanceToLine(this.points[0][0],this.points[0][1],this.points[1][0],this.points[1][1],bombEnemys[l4].x,bombEnemys[l4].y)< 20){      //当三角激光与敌人相碰，敌人停止
				//enemys[enemysL].isCollision = true;
				//enemys[enemysL].life.downLife(this.downLife); //敌人减血5
			bombEnemys[l4].isStop = true;
		}
	}
	///////////////////////////////////////////////////////////////////////与子弹敌人的检测
	var l5 = bulletEnemys.length;
	while(l5--){  //遍历碰撞
		if(distanceToLine(this.points[0][0],this.points[0][1],this.points[1][0],this.points[1][1],bulletEnemys[l5].x,bulletEnemys[l5].y)< 20){      //当三角激光与敌人相碰，敌人停止
				//enemys[enemysL].isCollision = true;
				//enemys[enemysL].life.downLife(this.downLife); //敌人减血5
			bulletEnemys[l5].isDead = true;   //子弹碰到激光，消失
		}
	}
	
		
	
	CTX.lineWidth = 2;
	CTX.shadowColor = 'rgb('+Math.floor(random(0,255))+','+Math.floor(random(0,255))+','+Math.floor(random(0,255))+')';
	CTX.shadowBlur = 20;
	CTX.strokeStyle = 'rgb(109,21,255)';
	CTX.stroke();
	
}
///////////////////////////////////////////////////////////////////////////////////////////////////////发射激光子弹2，在变更子弹中
function LaserBullet2(X,Y,Len,Angle,dLife){
	this.x = X;  //起始点位置
	this.y = Y;
	this.len = Len;//长度初始为0,激光子弹长度
	this.isToLen = false;   //是否到达了长度
	this.angle = Angle;
	this.speed = 6;
	this.a = 1.05;
	this.downLife = dLife;   //敌人减血
	this.points = [];
	this.pointsCount = 2;  //顶点数量
	var l = this.pointsCount;
	while(l--){
		this.points.push( [this.x,this.y] );
	}
}
LaserBullet2.prototype.setAngle = function(Angle){
	this.angle = Angle;
}
LaserBullet2.prototype.update = function(index){ // 移动
	
	var px = this.points[1][0];//获得第二个位置
	var py = this.points[1][1];
	if(distance(this.points[0][0],this.points[0][1],this.points[1][0],this.points[1][1]) < this.len){  //子弹达到长度
		this.speed*=this.a;
		px += this.speed*Math.cos(this.angle);
		py += this.speed*Math.sin(this.angle);
		this.points[1][0] = px;
		this.points[1][1] = py;
	}
	else{                                      //子弹移动
		this.isToLen = true;
		
		this.points[0][0] += this.speed*Math.cos(this.angle);
		this.points[0][1] += this.speed*Math.sin(this.angle);
		this.points[1][0] += this.speed*Math.cos(this.angle);
		this.points[1][1] += this.speed*Math.sin(this.angle);
		if(distance(px,py,650,600) > 800){   //释放
			laserBullets.splice(index,1);
		}
		
		createPointParticlePoint(this.points[0][0],this.points[0][1],1,8);      //创建拖尾粒子
	}
}
LaserBullet2.prototype.draw = function(CTX){
	CTX.beginPath();
	if(this.isToLen == false){   //激光子弹若未到达激光
		CTX.moveTo(this.points[0][0],this.points[0][1]);
		CTX.lineTo(this.points[1][0],this.points[1][1]);
		/*
		///////////////////////与普通敌人的检测
		var enemysL = enemys.length;
		while(enemysL--){  //遍历碰撞
			if(distanceToLine(this.points[0][0],this.points[0][1],this.points[1][0],this.points[1][1],enemys[enemysL].x,enemys[enemysL].y)< 20){
				enemys[enemysL].isCollision = true;
				enemys[enemysL].life.downLife(this.downLife);                               //敌人减血5
			}
		}
		*/
		//////////////与炮塔敌人的碰撞检测
		var l5 = gunEnemys.length;
		while(l5--){
			if(distanceToLine(this.points[0][0],this.points[0][1],this.points[1][0],this.points[1][1],gunEnemys[l5].x,gunEnemys[l5].y) <= 20){
				//bullets.splice(index,1);   //删除
				gunEnemys[l5].isCollision = true;    //设置敌人碰撞了
				createSounds(6);  //创建碰撞声音
				createCollisions(this.points[1][0],this.points[1][1]);  //设置碰撞效果
				gunEnemys[l5].life.downLife(10);   
				//break;
				//createPointParticleTrail(this.x,this.y,this.angle,8,3);
			}
		}
		
	}
	else{//激光子弹，长度达到
		CTX.moveTo(this.points[0][0],this.points[0][1]);
		CTX.lineTo(this.points[1][0],this.points[1][1]);
		///////////////////////////与普通敌人的检测
		var enemysL = enemys.length;
		while(enemysL--){
			if(distanceToLine(this.points[0][0],this.points[0][1],this.points[1][0],this.points[1][1],enemys[enemysL].x,enemys[enemysL].y) < 20){
				enemys[enemysL].isCollision = true;
				createSounds(6);  //创建碰撞声音
				createCollisions(this.points[1][0],this.points[1][1]);  //设置碰撞效果
				enemys[enemysL].life.downLife(this.downLife);                               //敌人减血5
				}
		}
		////////////////////////与结合体敌人的检测
		var l2 = gatherEnemys.length;
		while(l2--){
			if(distanceToLine(this.points[0][0],this.points[0][1],this.points[1][0],this.points[1][1],gatherEnemys[l2].x,gatherEnemys[l2].y) <= 40){
				//bullets.splice(index,1);   //删除
				gatherEnemys[l2].isCollision = true;    //设置敌人碰撞了
				createSounds(6);  //创建碰撞声音
				createCollisions(this.points[1][0],this.points[1][1]);  //设置碰撞效果
				gatherEnemys[l2].life.downLife(10);   
				//break;
				//createPointParticleTrail(this.x,this.y,this.angle,8,3);
			}
		}
		//////////////与裤子敌人的碰撞检测
		var l3 = pantsEnemys.length;
		while(l3--){
			if(distanceToLine(this.points[0][0],this.points[0][1],this.points[1][0],this.points[1][1],pantsEnemys[l3].x,pantsEnemys[l3].y) <= 20 && pantsEnemys[l3].isGather==false){
				//bullets.splice(index,1);   //删除
				pantsEnemys[l3].isCollision = true;    //设置敌人碰撞了
				createSounds(6);  //创建碰撞声音
				createCollisions(this.points[1][0],this.points[1][1]);  //设置碰撞效果
				pantsEnemys[l3].life.downLife(10);   
				//break;
				//createPointParticleTrail(this.x,this.y,this.angle,8,3);
			}
		}
		//////////////与炸弹敌人的碰撞检测
		var l4 = bombEnemys.length;
		while(l4--){
			if(distanceToLine(this.points[0][0],this.points[0][1],this.points[1][0],this.points[1][1],bombEnemys[l4].x,bombEnemys[l4].y) <= 20){
				//bullets.splice(index,1);   //删除
				bombEnemys[l4].isCollision = true;    //设置敌人碰撞了
				createSounds(6);  //创建碰撞声音
				createCollisions(this.points[1][0],this.points[1][1]);  //设置碰撞效果
				bombEnemys[l4].life.downLife(10);   
				//break;
				//createPointParticleTrail(this.x,this.y,this.angle,8,3);
			}
		}
		//////////////与炮塔敌人的碰撞检测
		var l5 = gunEnemys.length;
		while(l5--){
			if(distanceToLine(this.points[0][0],this.points[0][1],this.points[1][0],this.points[1][1],gunEnemys[l5].x,gunEnemys[l5].y) <= 20){
				//bullets.splice(index,1);   //删除
				gunEnemys[l5].isCollision = true;    //设置敌人碰撞了
				createSounds(6);  //创建碰撞声音
				createCollisions(this.points[1][0],this.points[1][1]);  //设置碰撞效果
				gunEnemys[l5].life.downLife(10);   
				//break;
				//createPointParticleTrail(this.x,this.y,this.angle,8,3);
			}
		}
		
		
	}
	CTX.lineWidth = 2;
	CTX.shadowColor = 'rgb('+Math.floor(random(0,255))+','+Math.floor(random(0,255))+','+Math.floor(random(0,255))+')';
	CTX.shadowBlur = 50;
	CTX.strokeStyle = 'rgb(23,245,231)';
	CTX.stroke();
}

/////////////////创建激光子弹相关
function createLaserBullets(X,Y,Angle){
	laserBullets.push(new LaserBullet2(X,Y,20,Angle,10));  //
	
}
function drawLaserBullets(CTX){
	
	var l = laserBullets.length;
	while(l--){
		laserBullets[l].draw(CTX);
		laserBullets[l].update(l);
	}

}



////////////////////////////////////////////////////////////////////////////////////////导弹
function Missile(X,Y,Angle,A){  //A为加速度，1.2
	this.x = X;
	this.y = Y;
	this.speed = 2;
	this.a1 = A;   //刚刚创建时的加速度
	this.a2 = 1.1; //加速度
	this.moveTime = 0;//移动时间
	this.angleB = Angle;//创建时随机角度
	this.angle = 0;  //记录角度
	
	this.isFinded = false;       //是否找到目标
	this.findId = -1;            //找到敌人的下标
	this.findType = 0;           //记录找到的敌人的类型
}
Missile.prototype.guide = function(){  //导弹导航，找到最近一个敌人（瞬发），创建时调用
	var minDis = 1300;   //最小距离
	//////////与普通敌人的跟踪
	var l1 = enemys.length;
	while(l1--){
		var dis = distance(this.x,this.y,enemys[l1].x,enemys[l1].y);  //导弹到敌人距离
		if( dis < minDis){
			minDis = dis;
			this.findId = l1;  //找到敌人下标
			this.isFinded = true;
			this.findType = 1;
		}
	}
	//////////与聚合敌人的跟踪
	var l2 = gatherEnemys.length;
	while(l2--){
		var dis = distance(this.x,this.y,gatherEnemys[l2].x,gatherEnemys[l2].y);  //导弹到敌人距离
		if( dis < minDis){
			minDis = dis;
			this.findId = l2;  //找到敌人下标
			this.isFinded = true;
			this.findType = 2;
		}
	}
	//////////与裤子敌人的跟踪
	var l3 = pantsEnemys.length;
	while(l3--){
		var dis = distance(this.x,this.y,pantsEnemys[l3].x,pantsEnemys[l3].y);  //导弹到敌人距离
		if( dis < minDis){
			minDis = dis;
			this.findId = l3;  //找到敌人下标
			this.isFinded = true;
			this.findType = 3;
		}
	}
	//////////与炸弹敌人的跟踪
	var l4 = bombEnemys.length;
	while(l4--){
		var dis = distance(this.x,this.y,bombEnemys[l4].x,bombEnemys[l4].y);  //导弹到敌人距离
		if( dis < minDis){
			minDis = dis;
			this.findId = l4;  //找到敌人下标
			this.isFinded = true;
			this.findType = 4;
		}
	}
	//////////与炮塔敌人的跟踪
	var l5 = gunEnemys.length;
	while(l5--){
		var dis = distance(this.x,this.y,gunEnemys[l5].x,gunEnemys[l5].y);  //导弹到敌人距离
		if( dis < minDis){
			minDis = dis;
			this.findId = l5;  //找到敌人下标
			this.isFinded = true;
			this.findType = 5;
		}
	}
	
	
	//alert(this.findId);
}
Missile.prototype.update = function(index){
	this.moveTime++;//移动时间++
	if(this.isFinded == true){//若找到敌人
		//if(enemys[this.findId].life.len == 0){
		
		//}
		
		
		//this.speed*=this.a2;         //位置移动
		if(this.moveTime < 10){
			this.speed*=this.a1;	
			this.x+=this.speed*Math.cos(this.angleB);
			this.y+=this.speed*Math.sin(this.angleB);
		}
		else if(this.moveTime == 10){
			this.speed = 5;	
		}
		else{///导弹弹射后的自由移动
			if(this.findType==1){  //根据找到的类型来定位导弹
				var ex = enemys[this.findId].x;//设置导弹的角度
				var ey = enemys[this.findId].y;
			}
			else if(this.findType==2){
				var ex = gatherEnemys[this.findId].x;//设置导弹的角度
				var ey = gatherEnemys[this.findId].y;
			}
			else if(this.findType==3){
				var ex = pantsEnemys[this.findId].x;//设置导弹的角度
				var ey = pantsEnemys[this.findId].y;
			}
			else if(this.findType==4){
				var ex = bombEnemys[this.findId].x;//设置导弹的角度
				var ey = bombEnemys[this.findId].y;
			}
			else if(this.findType==5){
				var ex = gunEnemys[this.findId].x;//设置导弹的角度
				var ey = gunEnemys[this.findId].y;
			}
			var px = ex - this.x;
			var py = ey - this.y;
			var angle;
			if(px>0){
				angle = Math.atan(py/px);
				this.angle = angle+Math.PI/2;
			}
			else{
				angle = Math.atan((-py)/(-px));
				this.angle = angle-Math.PI/2;
			}
			
			this.x+=this.speed*Math.cos(this.angle-Math.PI/2);
			this.y+=this.speed*Math.sin(this.angle-Math.PI/2);
		}
		createPointParticlePoint(this.x,this.y,1,10);      //创建拖尾粒子
		createPointParticlePoint((this.x)+Math.sqrt(54)*Math.cos(this.angle),(this.y)+Math.sqrt(54)*Math.sin(this.angle),1,7);      //创建拖尾粒子
		createPointParticlePoint((this.x)-Math.sqrt(54)*Math.cos(this.angle),(this.y)-Math.sqrt(54)*Math.sin(this.angle),1,7);      //创建拖尾粒子
		
		////////与普通敌人的碰撞检测
		if(this.findType==1){
			if(distance(this.x,this.y,enemys[this.findId].x,enemys[this.findId].y) <= 20){
				enemys[this.findId].life.len -= 30;       //减血，当敌人消失一个就，再guide，20
				enemys[this.findId].isCollision = true;
				createSounds(6);  //创建碰撞声音
				createCollisions(this.x,this.y);  //设置碰撞效果
				missiles.splice(index,1);   //导弹删除
			} 
		}
		/////////////////与结合体敌人的检测
		else if(this.findType==2){
			if(distance(this.x,this.y,gatherEnemys[this.findId].x,gatherEnemys[this.findId].y) <= 20){
				gatherEnemys[this.findId].life.len -= 20;       //减血，当敌人消失一个就，再guide，20
				gatherEnemys[this.findId].isCollision = true;
				createSounds(6);  //创建碰撞声音
				createCollisions(this.x,this.y);  //设置碰撞效果
				missiles.splice(index,1);   //导弹删除
			} 
		}
		/////////////////与裤子体敌人的检测
		else if(this.findType==3){
			if(distance(this.x,this.y,pantsEnemys[this.findId].x,pantsEnemys[this.findId].y) <= 20){
				pantsEnemys[this.findId].life.len -= 30;       //减血，当敌人消失一个就，再guide，20
				pantsEnemys[this.findId].isCollision = true;
				createSounds(6);  //创建碰撞声音
				createCollisions(this.x,this.y);  //设置碰撞效果
				missiles.splice(index,1);   //导弹删除
			} 
		}
		/////////////////与炸弹体敌人的检测
		else if(this.findType==4){
			if(distance(this.x,this.y,bombEnemys[this.findId].x,bombEnemys[this.findId].y) <= 20){
				bombEnemys[this.findId].life.len -= 30;       //减血，当敌人消失一个就，再guide，20
				bombEnemys[this.findId].isCollision = true;
				createSounds(6);  //创建碰撞声音
				createCollisions(this.x,this.y);  //设置碰撞效果
				missiles.splice(index,1);   //导弹删除
			} 
		}
		/////////////////与炮塔体敌人的检测
		else if(this.findType==5){
			if(distance(this.x,this.y,gunEnemys[this.findId].x,gunEnemys[this.findId].y) <= 20){
				gunEnemys[this.findId].life.len -= 30;       //减血，当敌人消失一个就，再guide，20
				gunEnemys[this.findId].isCollision = true;
				createSounds(6);  //创建碰撞声音
				createCollisions(this.x,this.y);  //设置碰撞效果
				missiles.splice(index,1);   //导弹删除
				
				
			} 
		}
		
		
	}
	else{//若未找到就再导航
		if(this.moveTime < 10){
			this.speed*=this.a1;	
			this.x+=this.speed*Math.cos(this.angleB);
			this.y+=this.speed*Math.sin(this.angleB);
		}
		else if(this.moveTime == 10){
			this.speed = 5;	
		}
		else{
			this.guide();
			this.angle+=Math.PI/24;
			this.x+=this.speed*Math.cos(this.angle-Math.PI/2);
			this.y+=this.speed*Math.sin(this.angle-Math.PI/2);
			
			createPointParticlePoint(this.x,this.y,1,10);      //创建拖尾粒子
			createPointParticlePoint((this.x)+Math.sqrt(54)*Math.cos(this.angle),(this.y)+Math.sqrt(54)*Math.sin(this.angle),1,7);    	   //创建拖尾粒子
			createPointParticlePoint((this.x)-Math.sqrt(54)*Math.cos(this.angle),(this.y)-Math.sqrt(54)*Math.sin(this.angle),1,7);      	   //创建拖尾粒子
		}
	}
}
Missile.prototype.draw = function(CTX){
	CTX.beginPath();
	CTX.save();
	CTX.translate(this.x,this.y);
	if(this.moveTime < 10){
		CTX.rotate(this.angleB+Math.PI/2);
	}
	else{
		CTX.rotate(this.angle);
	}
	
	
	CTX.moveTo(0,0);                //导弹身
	CTX.lineTo(0-3,0+4);
	CTX.lineTo(0-5,0-10);
	CTX.lineTo(0,0-14);
	CTX.lineTo(0+5,0-10);
	CTX.lineTo(0+3,0+4);
	CTX.lineTo(0,0);
	CTX.shadowBlur = 0;
	CTX.lineWidth = 1;
	CTX.strokeStyle = 'rgb(223,40,208)';
	CTX.stroke();
	
	CTX.beginPath();
	CTX.moveTo(0,0-11);//十字
	CTX.lineTo(0,0-5);
	CTX.strokeStyle = 'rgb(222,235,18)';
	CTX.stroke();
	CTX.beginPath();
	CTX.moveTo(0-3,0-8);
	CTX.lineTo(0+3,0-8);
	CTX.strokeStyle = 'rgb(222,235,18)';
	CTX.stroke();
	
	CTX.beginPath();     //两斜线
	CTX.moveTo(0-4,0-6);
	CTX.lineTo(0-7,0-2);
	CTX.strokeStyle = 'rgb(18,222,235)';
	CTX.stroke();
	CTX.beginPath();
	CTX.moveTo(0+4,0-6);
	CTX.lineTo(0+7,0-2);
	CTX.strokeStyle = 'rgb(18,222,235)';
	CTX.stroke();
	
	CTX.restore();
}
/////////////////////////创建导弹相关
function createMissiles(X,Y,Angle,A){
	
	missiles.push( new Missile(X,Y,Angle,A) );
	var l = missiles.length;
	missiles[l-1].guide();    //创建时，执行导航
	
}
function drawMissiles(CTX){
	
	var l = missiles.length;
	while(l--){
		
		missiles[l].draw(CTX);
		missiles[l].update(l);
	}
	//alert('111');
}

//////////////////////////////////////////////////////////////////////////////////////亮点
function LightPoint(X,Y){      //一笔一画前的那个亮点效果
	this.r = Math.floor(random(80,255));
	this.g = Math.floor(random(80,255));
	this.b = Math.floor(random(80,255));
	
	this.x = X;
	this.y = Y;
	this.alpha = random(0.3,1);    //不透明度
	this.alphaA = 1;
	this.isShow = true;//是否绘制
	this.life = 20;    //生命
}
LightPoint.prototype.update = function(X,Y){
	this.x = X;
	this.y = Y;
	
	if(this.alpha>=1){                     //不透明度操作
		this.alphaA = -1;	
	}
	else if(this.alpha<=0.3){
		this.alphaA = 1;	
	}
	this.alpha += 0.07*this.alphaA;
	
	
}
LightPoint.prototype.draw = function(CTX){
	//alert('dr');
	if(this.isShow==true){
		
		CTX.beginPath();
		CTX.arc(this.x,this.y,3.5,0,2*Math.PI);
		CTX.fillStyle = 'rgba('+this.r+','+this.g+','+this.b+','+this.alpha+')';
		CTX.fill();
	}
}
LightPoint.prototype.downLife = function(){
	this.life--;
}
///////////////////////创建相关，粒子最后的亮点效果
function createLightPoints(X,Y){
	
	lightPoints.push( new LightPoint(X,Y) );
}
function drawLightPoints(CTX){
	
	var l = lightPoints.length;
	while(l--){
		if(lightPoints[l].life != 0){
			
			lightPoints[l].draw(CTX);//?
			//
			lightPoints[l].downLife();
			lightPoints[l].update(lightPoints[l].x,lightPoints[l].y);
			
		}
		else{
			lightPoints.splice(l,1);	
		}
	}
}


////////////////////////////////////////////////////////////////////////////////////下中心炮塔类
function Gun(X,Y){
	this.x = X;  //原点
	this.y = Y;
	this.angle = 0;   //炮塔竖立
	this.isShoot = false;
}
Gun.prototype.setAngle = function(Angle){
	//alert('15');
	this.angle = Angle;
}
Gun.prototype.draw = function(CTX){
	CTX.save();
	CTX.translate(this.x,this.y);
	CTX.rotate(this.angle);
	
	CTX.beginPath();
	CTX.arc(0,0-10,10,0,Math.PI);  //半圆
	if(this.isShoot == true){
		CTX.strokeStyle = 'rgb('+Math.floor(random(0,255))+','+Math.floor(random(0,255))+','+Math.floor(random(0,255))+')';
	}
	else{
		CTX.strokeStyle = 'rgb(223,40,208)';
	}
	CTX.lineWidth = 1;
	CTX.shadowBlur = 0;
	CTX.stroke();
	
	CTX.strokeRect(0-10,0-20,20,10);  //矩形
	
	CTX.beginPath();                //尖
	CTX.moveTo(0-8,0-20);
	CTX.lineTo(0-8,0-40);
	CTX.lineTo(0,0-45);
	CTX.lineTo(0+8,0-40);
	CTX.lineTo(0+8,0-20);
	//CTX.strokeStyle = 'rgb(223,40,208)';
	CTX.stroke();
	
	CTX.beginPath();                //十字
	CTX.moveTo(0-5,0-35);
	CTX.lineTo(0+5,0-35);
	CTX.strokeStyle = 'rgb(222,235,18)';
	CTX.stroke();
	CTX.beginPath();                //十字
	CTX.moveTo(0,0-42);
	CTX.lineTo(0,0-25);
	CTX.strokeStyle = 'rgb(222,235,18)';
	CTX.stroke();
	
	CTX.beginPath();                //边斜横
	CTX.moveTo(0-10,0-38);
	CTX.lineTo(0-17,0-33);
	CTX.strokeStyle = 'rgb(18,222,235)';
	CTX.stroke();
	CTX.beginPath();                //边斜横
	CTX.moveTo(0-10,0-34);
	CTX.lineTo(0-17,0-29);
	CTX.strokeStyle = 'rgb(18,222,235)';
	CTX.stroke();
	CTX.beginPath();                //边斜横
	CTX.moveTo(0-10,0-30);
	CTX.lineTo(0-17,0-25);
	CTX.strokeStyle = 'rgb(18,222,235)';
	CTX.stroke();
	CTX.beginPath();                //边斜横
	CTX.moveTo(0+10,0-38);
	CTX.lineTo(0+17,0-33);
	CTX.strokeStyle = 'rgb(18,222,235)';
	CTX.stroke();
	CTX.beginPath();                //边斜横
	CTX.moveTo(0+10,0-34);
	CTX.lineTo(0+17,0-29);
	CTX.strokeStyle = 'rgb(18,222,235)';
	CTX.stroke();
	CTX.beginPath();                //边斜横
	CTX.moveTo(0+10,0-30);
	CTX.lineTo(0+17,0-25);
	CTX.strokeStyle = 'rgb(18,222,235)';
	CTX.stroke();
	
	
	CTX.restore();
}
///////////创建各种子弹，与获得技能卡片相关
function createFire(Type){
	var type = Type;
	
	if(type == 0){
		if(mouseDown == true){  /////发射子弹
			if(timeTick > bulletTime){
				createSounds(1);  //创建声音
				createBullets(650+45*Math.cos(gunAngle-Math.PI/2),600+45*Math.sin(gunAngle-Math.PI/2),gunAngle-Math.PI/2,2,5,1);
				timeTick = 0;
			}
			else{
				timeTick++;	
			}
		}
		
	}
	else if(type == 1){  //暴走
		if(mouseDown == true){  /////发射子弹
			if(timeTick > bulletTime){
				createSounds(1);  //创建声音
				createBullets(650+45*Math.cos(gunAngle-Math.PI/2),600+45*Math.sin(gunAngle-Math.PI/2),gunAngle-Math.PI/2,2,5,2);
				timeTick = 0;
			}
			else{
				timeTick++;	
			}
		}
	}
	else if(type == 2){  //激光
		
		if(mouseDown == true){  /////发射激光
			if(timeTick > bulletTime*1.5){
				//alert('22');
				createSounds(2);  //创建声音
				createLaserBullets(650+45*Math.cos(gunAngle-Math.PI/2),600+45*Math.sin(gunAngle-Math.PI/2),gunAngle-Math.PI/2);
				timeTick = 0;
			}
			else{
				timeTick++;	
			}
		}
		
	}
	else if(type == 3){  //导弹
		if(mouseDown == true){  /////发射导弹
			if(timeTick > bulletTime*3){
				createSounds(3);  //创建声音
				createMissiles(650+45*Math.cos(gunAngle-Math.PI/2),600+45*Math.sin(gunAngle-Math.PI/2),gunAngle-Math.PI/2,1.5);
				timeTick = 0;
			}
			else{
				timeTick++;	
			}
		}
	}
	
}
function drawFire(CTX){    //绘制所有子弹
	if(fireType != 0){   //若子弹变更
		if(fireCool < 1200){    //子弹变更持续时间
			fireCool++;
		}
		else{
			fireCool = 0;
			fireType = 0;  //还原子弹
		}
	}
	drawBullets(CTX);
	drawMissiles(CTX);    //绘制导弹
	drawLaserBullets(CTX);  //绘制激光子弹
}


////////////////////////////////////////////////////////////////////////////////////////////////血条类
function Life(X,Y,lifeN){ //就用一个直线,用红色
	this.x = X;
	this.y = Y;
	this.len = lifeN;     //生命长度
	this.timeDelay = 20;  //每20次调用函数生命值--
	
}
Life.prototype.update = function(){  //自动减血

	if(this.timeDelay!=0){
		this.timeDelay--;	
	}
	else{
		this.timeDelay = 20;
		if(this.len!=0){
			this.len--;
		}
	}
}
Life.prototype.setPosition = function(X,Y){
	this.x = X;
	this.y = Y;
}
Life.prototype.downLife = function(n){ //减血函数
	this.len -= n;
}
Life.prototype.draw = function(CTX){
	//alert('li');
	CTX.beginPath();
	CTX.moveTo(this.x-this.len/2,this.y);
	CTX.lineTo(this.x+this.len/2,this.y);
	CTX.shadowBlur = 0;
	CTX.lineWidth = 2;
	CTX.strokeStyle = 'red';
	CTX.stroke();
}