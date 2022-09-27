// JavaScript Document
/////////////// 各种敌人

//////////////////////////////////////////////////////////////////////////////////////////////////////////////敌人类
function Enemy(X,Y){  // 直接用炮台类型
	this.x = X;
	this.y = Y;
	
	this.alpha = 1;
	this.alphaA = 1;  //反转
	
	this.isCollision = false;   //是否碰撞了，碰撞了有闪烁效果
	this.collisionTime = 15;     //闪烁几帧
	this.isStop = false;         //运动是否停止
	this.isScale = false;        //园内缩放
	this.CollisionCircle = 0;  //与那个圆相碰,若碰，就跑到相碰圆中心，并缩放
	
	this.isCreate = false;
	this.angleS = 0;  //旋转角度
	this.angleV = Math.random()*360;  //运动方向
	this.speed = 2;   //移动速度
	
	this.points = [];
	this.points.push( [-20,+20] );
	this.points.push( [-20,+20] );
	
	this.life = new Life(this.x,this.y-30,60);   //60点血
	this.lightPoint = new LightPoint(this.x-20,this.y+20);
	
}
Enemy.prototype.create = function(){ //一笔一画效果
	//alert('12');
	
	var len = this.points.length;
	var px = this.points[len-1][0];//获得最后一个的x坐标
	var py = this.points[len-1][1];
	if(len == 2){
		if(distance(this.points[len-2][0],this.points[len-2][1],this.points[len-1][0],this.points[len-1][1]) <= 30){
			py-=2;	
			this.points[len-1][0] = px;
			this.points[len-1][1] = py;
			this.lightPoint.update(this.x+px,this.y+py);  //亮点位置更新
		}
		else{
			this.points.push( [px,py] );	
		}
	}
	else if(len == 3){
		if(distance(this.points[len-2][0],this.points[len-2][1],this.points[len-1][0],this.points[len-1][1]) <= 10*Math.cos(Math.PI/4)){
			px += 2*Math.cos(-135*Math.PI/180);	
			py += 2*Math.sin(-135*Math.PI/180);	
			this.points[len-1][0] = px;
			this.points[len-1][1] = py;
			this.lightPoint.update(this.x+px,this.y+py);  //亮点位置更新
		}
		else{
			this.points.push( [px,py] );	
		}
	}
	else if(len == 4){
		if(distance(this.points[len-2][0],this.points[len-2][1],this.points[len-1][0],this.points[len-1][1]) <= 10*Math.cos(Math.PI/4)){
			px += 2*Math.cos(-45*Math.PI/180);	
			py += 2*Math.sin(-45*Math.PI/180);	
			this.points[len-1][0] = px;
			this.points[len-1][1] = py;
			this.lightPoint.update(this.x+px,this.y+py);  //亮点位置更新
		}
		else{
			this.points.push( [px,py] );	
		}
	}
	else if(len == 5){
		if(distance(this.points[len-2][0],this.points[len-2][1],this.points[len-1][0],this.points[len-1][1]) <= 10/Math.cos(Math.PI/4)){
			px += 2*Math.cos(45*Math.PI/180);	
			py += 2*Math.sin(45*Math.PI/180);	
			this.points[len-1][0] = px;
			this.points[len-1][1] = py;
			this.lightPoint.update(this.x+px,this.y+py);  //亮点位置更新
		}
		else{
			this.points.push( [px,py] );	
		}
	}
	else if(len == 6){
		if(distance(this.points[len-2][0],this.points[len-2][1],this.points[len-1][0],this.points[len-1][1]) <= 10/Math.cos(Math.PI/4)){
			px += 2*Math.cos(-45*Math.PI/180);	
			py += 2*Math.sin(-45*Math.PI/180);
			this.points[len-1][0] = px;
			this.points[len-1][1] = py;
			this.lightPoint.update(this.x+px,this.y+py);  //亮点位置更新
		}
		else{
			this.points.push( [px,py] );	
		}
	}
	else if(len == 7){
		if(distance(this.points[len-2][0],this.points[len-2][1],this.points[len-1][0],this.points[len-1][1]) <= 10*Math.cos(Math.PI/4) ){
			px += 2*Math.cos(45*Math.PI/180);	
			py += 2*Math.sin(45*Math.PI/180);
			this.points[len-1][0] = px;
			this.points[len-1][1] = py;
			this.lightPoint.update(this.x+px,this.y+py);  //亮点位置更新
		}
		else{
			this.points.push( [px,py] );	
		}
	}
	else if(len == 8){
		if(distance(this.points[len-2][0],this.points[len-2][1],this.points[len-1][0],this.points[len-1][1]) <= 10*Math.cos(Math.PI/4) ){
			px += 2*Math.cos(135*Math.PI/180);	
			py += 2*Math.sin(135*Math.PI/180);	
			this.points[len-1][0] = px;
			this.points[len-1][1] = py;
			this.lightPoint.update(this.x+px,this.y+py);  //亮点位置更新
		}
		else{
			this.points.push( [px,py] );	
		}
	}
	else if(len == 9){
		if(distance(this.points[len-2][0],this.points[len-2][1],this.points[len-1][0],this.points[len-1][1]) <= 30){
			py++;	
			this.points[len-1][0] = px;
			this.points[len-1][1] = py;
			this.lightPoint.update(this.x+px,this.y+py);  //亮点位置更新
		}
		else{
			this.points.push( [px,py] );	
		}
	}
	else if(len == 10){
		if(distance(this.points[len-2][0],this.points[len-2][1],this.points[len-1][0],this.points[len-1][1]) <= 20){
			px--;	
			this.points[len-1][0] = px;
			this.points[len-1][1] = py;
			this.lightPoint.update(this.x+px,this.y+py);  //亮点位置更新
		}
		else{  //画完后的操作
			this.isCreate = true;
			this.lightPoint.isShow = false;//亮点消失
			
			
			/////////////////下雪技能的检测
			if(isSnow == true && this.isScale==false){  //速度减为0.3倍
				this.x += 0.3*this.speed*Math.cos(this.angleV*Math.PI/180);   //画完运动
				this.y += 0.3*this.speed*Math.sin(this.angleV*Math.PI/180);
				this.life.x = this.x;     //血条位置更新
				this.life.y = this.y-30;
				this.isCollision = true;
			}
			
			
			////////////////////与圆圈的检测
			if(this.isScale == false){
				var l1 = circles.length;    //检测敌人与圆圈碰撞
				while(l1--){
					if(l1 == 0) break;
					if(distance(this.x,this.y,circles[l1].x,circles[l1].y) < circles[l1].bullets[0].r1+20 && 
						distance(this.x,this.y,circles[l1].x,circles[l1].y) > circles[l1].bullets[0].r1-20){
						this.isScale = true;        //缩放
						this.CollisionCircle = l1;  //与那个圆相碰
						break;
					}
				}
			}
			
			/////////////////与圆相碰，就跑到圆心，并旋转,缩放
			if(this.isScale == true){
				
				var cx = circles[this.CollisionCircle].x;//圆x
				var cy = circles[this.CollisionCircle].y;
				var px = cx - this.x;//距离
				var py = cy - this.y;
				var len = distance(this.x,this.y,circles[this.CollisionCircle].x,circles[this.CollisionCircle].y);  //??问题：若圆数组减小，相应下标改变，即CollisionCircle值找不到对应圆
				//var angle = Math.atan(py/px);
				
				if(len > 5){//移动
					if(px>0){
						this.x+=1;
					}
					else{
						this.x-=1;	
					}
					if(py>0){
						this.y+=1;
					}
					else{
						this.y-=1;	
					}
					//this.x += 2*Math.cos(angle);
					//this.y += 2*Math.sin(angle);
				}
				this.life.x = this.x;     //血条位置更新
				this.life.y = this.y-30;
				//if(circles[this.CollisionCircle].life.len==0){
				//	this.isScale = false;
				//	this.CollisionCircle = -1;
				//}
			}
			
			/////////////////移动
			if(this.isStop == false && isSnow == false && this.isScale == false){  //若没有停止才运动
				this.x += this.speed*Math.cos(this.angleV*Math.PI/180);   //画完运动
				this.y += this.speed*Math.sin(this.angleV*Math.PI/180);
				this.life.x = this.x;     //血条位置更新
				this.life.y = this.y-30;
			}
			else if(this.isStop == true && isSnow == false && this.isScale == false){
				this.x += 0;
				this.y += 0;
				this.isStop = false;
			}
			/*
			//////////////////运动星星与敌人的碰撞检测
			if(isStarTimeout == true){
				var starLen = stars.length;
				while(starLen--){
					if(distance(stars[starLen].x,stars[starLen].y,this.x,this.y) <= 40){
						this.life.len -= 8;	
					}
				}
			}*/
			
			//不透明度的运算
			if(this.alpha<=0.2){
				this.alphaA = 1;
			}
			else if(this.alpha>=1){
				this.alphaA = -1;
			}
			this.alpha += 0.01*this.alphaA;  //alpha值改变
			
			if(this.x > 1300){  //边缘碰撞操作
				this.x = 1295;
				if(180-this.angleV > 0){
					this.angleV = 180 - this.angleV;
				}
				else if(180-this.angleV < 0){
					this.angleV = -this.angleV - 180;
				}
			}
			
			if(this.x < 0){
				this.x = 5;
				if(180-this.angleV > 0){
					this.angleV = 180 - this.angleV;
				}
				else if(180-this.angleV < 0){
					this.angleV = this.angleV + 180;
				}
			}
			if(this.y > 600){
				this.y = 595;
				if(180-this.angleV > 0){
					this.angleV =  -this.angleV;
				}
				else if(180-this.angleV < 0){
					this.angleV = -this.angleV;
				}
			}
			if(this.y < 0){
				this.y = 5;
				if(180-this.angleV > 0){
					this.angleV =  -this.angleV;
				}
				else if(180-this.angleV < 0){
					this.angleV = -this.angleV ;
				}
			}
			
		}
	}
	
}
Enemy.prototype.draw = function(CTX){
	this.life.draw(CTX);   //绘制血条????????有bug
	
	CTX.save();
	CTX.translate(this.x,this.y);
	
	if(this.isCreate == true){//若画完，就旋转
		this.angleS++;
		CTX.rotate(this.angleS*Math.PI/180);
	}
	
	CTX.beginPath();
	CTX.moveTo(this.points[0][0],this.points[0][1]);
	var len = this.points.length;
	for(var i=1;i<len;i++){
		CTX.lineTo(this.points[i][0],this.points[i][1]);	
	}
	if(this.isCollision == true){  //设置碰撞效果
		if(this.collisionTime!=0){
			this.collisionTime--;
			CTX.strokeStyle = 'rgb('+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+')';
			
		}
		else{
			this.collisionTime = 15;
			this.isCollision = false;
		}
	}
	else{
		CTX.strokeStyle = 'rgb(14,249,241)';
	}
	CTX.lineWidth = 2;
	CTX.shadowBlur = 0;
	CTX.stroke();
	
	if(this.isCreate == true){
		
		CTX.beginPath(); //左眼
		CTX.arc(-5,-5,4,0,2*Math.PI);
		CTX.strokeStyle = 'rgba(25,14,249'+','+this.alpha+')';
		CTX.lineWidth = 2;
		CTX.stroke();
	
		CTX.beginPath(); //右眼
		CTX.arc(5,-5,4,0,2*Math.PI);
		CTX.strokeStyle = 'rgba(25,14,249'+','+this.alpha+')';
		CTX.lineWidth = 2;
		CTX.stroke();
	
		CTX.beginPath();//嘴
		CTX.moveTo(-5,10);
		CTX.lineTo( 5,10);
		CTX.strokeStyle = 'rgb(223,17,192)';
		CTX.lineWidth = 2;
		CTX.stroke();
	}
	CTX.restore();
	
	this.lightPoint.draw(CTX);//绘制亮点
	
}
/////////////////////创建敌人相关
function createEnemys(X,Y){
	enemys.push(new Enemy(X,Y));	
}
function drawEnemys(CTX){
	//alert('13');
	var l = enemys.length;
	while(l--){
		if(enemys[l].life.len>0){      //如果还有血，就绘制
			enemys[l].draw(CTX);	
			enemys[l].create();
		} 
		else{                          //没有就删除,并加分
			createCards(enemys[l].x,enemys[l].y);   //随机创建卡片
			score+=10;   //分数++
			mp++;        //mp++
			
			createParticle(enemys[l].x,enemys[l].y,222,17,192,1);   //消失前创建粒子
			createWords(enemys[l].x,enemys[l].y,"mp+1",1);            //创建像是文字
			createWords(enemys[l].x-5,enemys[l].y-10,"score+10",1);        //创建像是文字
			createSounds(7);  //创建死亡声音
			enemys.splice(l,1);	
			
			var len = missiles.length;  //当消失一个敌人就全部再guide
			while(len--){
				//alert('11');
				missiles[len].isFinded = false;
				missiles[len].findId = -1;
				
			}
			
		}
	}
}

////////////////////////////////////////////////////////////////////////////////////////////炸弹敌人
function BombEnemy(X,Y){
	this.x = X;
	this.y = Y;
	this.OutR = 15;       //炸弹外圆半径
	this.InR = 4;         //内圆半径
	this.isCreate = false;  //是否创建了
	this.isStop = false;    //停止
	this.isCircle = false;  //是否在圆中
	this.isCollision = false; //碰撞
	this.CollisionCircle = 0;  //碰撞的圆
	this.collisionTime = 15;     //闪烁几帧
	this.angleS = 0;  //旋转角度
	this.angleM = 0;  //移动角度
	this.angleC = 0;  //圆的绘制角度
	this.speed = 2;   //速度
	this.life = new Life(0,0-30,60);  //生命
	this.lightPoint = new LightPoint(0,0);
	
}
BombEnemy.prototype.update = function(index){
	if(this.isCreate == false){
		if(this.angleC<360){
			this.angleC+=5;	
			this.lightPoint.update(0+this.OutR*Math.cos(this.angleC*Math.PI/180),0+this.OutR*Math.sin(this.angleC*Math.PI/180));//更新亮点位置
		}
		else{
			this.isCreate = true;	
			this.lightPoint.isShow = false;
		}
	}
	else{          //若创建了就旋转，并向中心移动
		this.angleS++; //旋转
		///////////////向中心移动
		if(this.isStop == true){  //若运动停止
			this.x+=0;
			this.y+=0;
			this.isStop = false;
		}
		else{  //若没有停止
			///////////////与圆圈的检测
			////////////////////与圆圈的检测
			if(this.isCircle == false){
				var l1 = circles.length;    //检测敌人与圆圈碰撞
				while(l1--){
					if(l1 == 0) break;
					if(distance(this.x,this.y,circles[l1].x,circles[l1].y) < circles[l1].bullets[0].r1+20 && 
						distance(this.x,this.y,circles[l1].x,circles[l1].y) > circles[l1].bullets[0].r1-20){
						this.isCircle = true;        //缩放
						this.CollisionCircle = l1;  //与那个圆相碰
						break;
					}
				}
			}
			
			/////////////////下雪技能的检测
			if(this.isCircle==false){  //如没在圆中
				if(isSnow==true){      //如又下雪，速度减为0.3倍
					this.x += 0.3*this.speed*Math.cos(this.angleM*Math.PI/180);   //画完运动
					this.y += 0.3*this.speed*Math.sin(this.angleM*Math.PI/180);
					this.life.setPosition(0,0-30);    //血条位置更新
					this.isCollision = true;
				}
				else{  //没在圆中，没下雪
					var px = 650 - this.x;  //卡片的移动
					var py = 300 - this.y;
					var angle = Math.atan(py/px)*180/Math.PI;
					if(px<0){
						angle+=180;
					}
					this.angleM = angle;
					this.x+=this.speed*Math.cos(this.angleM*Math.PI/180);
					this.y+=this.speed*Math.sin(this.angleM*Math.PI/180);
					this.life.setPosition(0,0-30);    //血条位置更新
				}
				
			}
			else if(this.isCircle == true){/////////////////与圆相碰，就跑到圆心，并旋转,缩放
				var cx = circles[this.CollisionCircle].x;//圆x
				var cy = circles[this.CollisionCircle].y;
				var px = cx - this.x;//距离
				var py = cy - this.y;
				var len = distance(this.x,this.y,circles[this.CollisionCircle].x,circles[this.CollisionCircle].y);  //??问题：若圆数组减小，相应下标改变，即CollisionCircle值找不到对应圆
				if(len > 5){//移动
					if(px>0){
						this.x+=1;
					}
					else{
						this.x-=1;	
					}
					if(py>0){
						this.y+=1;
					}
					else{
						this.y-=1;	
					}
				}
				this.life.setPosition(0,0-30);    //血条位置更新
			}
		}
	}
}
BombEnemy.prototype.draw = function(CTX){
	CTX.save();
	CTX.translate(this.x,this.y);
	this.life.draw(CTX);////绘制血条
	//this.life.update();
	this.lightPoint.draw(CTX);   //绘制亮点
	CTX.rotate(this.angleS*Math.PI/180);
	
	CTX.beginPath();       //绘制外圆
	CTX.arc(0,0,this.OutR,0,this.angleC*Math.PI/180);
	CTX.lineWidth = 2;
	CTX.shadowBlur = 0;
	//CTX.strokeStyle = 'rgb(180,28,140)';
	if(this.isCollision == true){  //设置碰撞效果
		if(this.collisionTime!=0){
			this.collisionTime--;
			CTX.strokeStyle = 'rgb('+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+')';
			
		}
		else{
			this.collisionTime = 15;
			this.isCollision = false;
		}
	}
	else{
		CTX.strokeStyle = 'rgb(14,249,240)';
	}
	
	
	CTX.stroke();
	
	///////////绘制内圆(在外圆画完才画)
	if(this.isCreate == true){
		
		CTX.beginPath();///绘制内圆
		CTX.arc(0,0,this.InR,0,2*Math.PI);
		CTX.lineWidth = 1;
		CTX.shadowBlur = 0;
		CTX.strokeStyle = 'rgb(25,14,249)';
		CTX.stroke();
		if(this.InR > 0){  //内圆半径的变化
			this.InR-=0.5;	
		}
		else{
			this.InR = 5;	
		}
		
		CTX.beginPath();  //炸弹边矩形
		CTX.moveTo(0+5,0-15);
		CTX.lineTo(0+8,0-17);
		CTX.lineTo(0+14,0-14);
		CTX.lineTo(0+12,0-11);
		CTX.lineWidth = 1;
		CTX.shadowBlur = 0;
		CTX.strokeStyle = 'rgb(14,249,240)';
		CTX.stroke();
		
		CTX.beginPath();  //炸弹引线
		CTX.moveTo(0+11,0-15);
		CTX.lineTo(0+16,0-21);
		CTX.lineWidth = 1;
		CTX.shadowBlur = 0;
		CTX.strokeStyle = 'rgb(14,249,240)';
		CTX.stroke();
		
		////////////////////引线上的粒子效果
		
	}
	
	
	CTX.restore();
}

///////////////////////////创建相关
function createBombEnemys(X,Y){
	bombEnemys.push(new BombEnemy(X,Y));
}
function drawBombEnemys(CTX){
	var l = bombEnemys.length;
	while(l--){
		if(bombEnemys[l].life.len > 0){
			bombEnemys[l].draw(CTX);
			bombEnemys[l].update(l);
		}
		else{    //炸弹敌人消失的操作
			createCards(bombEnemys[l].x,bombEnemys[l].y);   //随机创建卡片
			score+=10;   //分数++
			mp++;        //mp++
			
			createParticle(bombEnemys[l].x,bombEnemys[l].y,222,17,192,1);   //消失前创建粒子
			createWords(bombEnemys[l].x,bombEnemys[l].y,"mp+1",1);            //创建像是文字
			createWords(bombEnemys[l].x-5,bombEnemys[l].y-10,"score+10",1);        //创建像是文字
			createSounds(7);  //创建死亡声音
			
			createBulletEnemys(bombEnemys[l].x,bombEnemys[l].y,bombEnemys[l].angleS+0);   //炸弹死后爆出5个子弹
			createBulletEnemys(bombEnemys[l].x,bombEnemys[l].y,bombEnemys[l].angleS+120);
			createBulletEnemys(bombEnemys[l].x,bombEnemys[l].y,bombEnemys[l].angleS+240);
			//createBulletEnemys(bombEnemys[l].x,bombEnemys[l].y,216);
			//createBulletEnemys(bombEnemys[l].x,bombEnemys[l].y,288);
			
			var len = missiles.length;  //当消失一个敌人就全导弹部再guide
			while(len--){
				//alert('11');
				missiles[len].isFinded = false;
				missiles[len].findId = -1;
				
			}
			bombEnemys.splice(l,1);
		}
	}
}

/////////////////////////////////////////////////////////////////////////////////////////聚合敌人
function PantsEnemy(X,Y,AngleS,bool){   ///////////////////裤子敌人,无AI，大哥有AI
	this.x = X;
	this.y = Y;
	this.angleS = AngleS;  //旋转角度
	this.angleM = random(0,360);      //移动角度
	this.speed = 2;        //速度
	this.isCreate = false;  //是否创建
	this.isLifeShow = false;  //在聚合状态下不显生命
	this.isStop = false;      //停止
	this.isCollision = false; //碰撞
	this.CollisionCircle = 0;  //碰撞的圆
	this.isCircle = false;     
	this.collisionTime = 15;  //闪烁时间
	this.isGather = bool;     //是否在聚合状态
	this.points = [];      //顶点数组
	this.pointsCount = 2;
	while(this.pointsCount--){
		this.points.push( [0-15,0-15] );
	}
	
	this.life = new Life(0,0-30,60);       //生命
	this.lightPoint = new LightPoint(0,0); //亮点
	
}
PantsEnemy.prototype.update = function(X,Y){     //参数由大哥赋值,Angle为移动角度

	var len = this.points.length;
	var px = this.points[len-1][0];
	var py = this.points[len-1][1];
	this.lightPoint.update(px,py);   //亮点更新
	
	if(len==2){
		if(distance(this.points[len-2][0],this.points[len-2][1],this.points[len-1][0],this.points[len-1][1]) <= 32){
			px+=2;
			this.points[len-1][0] = px;
			this.points[len-1][1] = py;
		}
		else{
			this.points.push( [px,py] );	
		}
	}
	else if(len==3){
		if(distance(this.points[len-2][0],this.points[len-2][1],this.points[len-1][0],this.points[len-1][1]) <= 30){
			py+=2;
			this.points[len-1][0] = px;
			this.points[len-1][1] = py;
		}
		else{
			this.points.push( [px,py] );	
		}
	}
	else if(len==4){
		if(distance(this.points[len-2][0],this.points[len-2][1],this.points[len-1][0],this.points[len-1][1]) <= 10){
			px-=2;
			this.points[len-1][0] = px;
			this.points[len-1][1] = py;
		}
		else{
			this.points.push( [px,py] );	
		}
	}
	else if(len==5){
		if(distance(this.points[len-2][0],this.points[len-2][1],this.points[len-1][0],this.points[len-1][1]) <= 15){
			py-=2;
			this.points[len-1][0] = px;
			this.points[len-1][1] = py;
		}
		else{
			this.points.push( [px,py] );	
		}
	}
	else if(len==6){
		if(distance(this.points[len-2][0],this.points[len-2][1],this.points[len-1][0],this.points[len-1][1]) <= 10){
			px-=2;
			this.points[len-1][0] = px;
			this.points[len-1][1] = py;
		}
		else{
			this.points.push( [px,py] );	
		}
	}
	else if(len==7){
		if(distance(this.points[len-2][0],this.points[len-2][1],this.points[len-1][0],this.points[len-1][1]) <= 15){
			py+=2;
			this.points[len-1][0] = px;
			this.points[len-1][1] = py;
		}
		else{
			this.points.push( [px,py] );	
		}
	}
	else if(len==8){
		if(distance(this.points[len-2][0],this.points[len-2][1],this.points[len-1][0],this.points[len-1][1]) <= 10){
			px-=2;
			this.points[len-1][0] = px;
			this.points[len-1][1] = py;
		}
		else{
			this.points.push( [px,py] );	
		}
	}
	else if(len==9){
		if(distance(this.points[len-2][0],this.points[len-2][1],this.points[len-1][0],this.points[len-1][1]) <= 30){
			py-=2;
			this.points[len-1][0] = px;
			this.points[len-1][1] = py;
		}
		else{//////绘制完成
			this.isCreate = true;
			this.lightPoint.isShow = false;
			
			if(this.isGather == true){  //若在聚合状态下，位置跟着大哥动
				this.x = X;
				this.y = Y;
			}
			else{   //若没有在聚合状态，乱移动
				this.angleS+=2;  //旋转
				
				////////////////////与圆圈的检测
				if(this.isCircle == false){
					var l1 = circles.length;    //检测敌人与圆圈碰撞
					while(l1--){
						if(l1 == 0) break;
						if(distance(this.x,this.y,circles[l1].x,circles[l1].y) < circles[l1].bullets[0].r1+20 && 
							distance(this.x,this.y,circles[l1].x,circles[l1].y) > circles[l1].bullets[0].r1-20){
							this.isCircle = true;        //缩放
							this.CollisionCircle = l1;  //与那个圆相碰
							break;
						}
					}
				}
				
				///////////////////边缘碰撞操作,角度变换
				if(this.x >= 1300){  
					this.x = 1295;
					if(this.angleM >= 0){
						this.angleM = this.angleM+2*(90-this.angleM);
					}
					else if(this.angleM <= 0){
						this.angleM = this.angleM-2*(90+this.angleM);
					}
				}
				if(this.x <= 0){
					this.x = 5;
					if(180-this.angleM >= 0){
						this.angleM = 180 - this.angleM;
					}
					else if(180-this.angleM <= 0){
						this.angleM = this.angleM+2*(90-this.angleM-180);
					}
				}
				if(this.y >= 600){
					this.y = 595;
					if(180-this.angleM > 0){
						this.angleM =  -this.angleM;
					}
					else if(180-this.angleM < 0){
						this.angleM = -this.angleM;
					}
				}
				if(this.y <= 0){
					this.y = 5;
					if(180-this.angleM > 0){
						this.angleM =  -this.angleM;
					}
					else if(180-this.angleM < 0){
						this.angleM = -this.angleM;
					}
				}
				///////////////自由移动
				if(this.isStop == true){
					this.x+=0;
					this.y+=0;
					this.isStop = false;
				}
				else{////没停止就移动
					/////////////////下雪技能的检测
					if(this.isCircle==false){  //如没在圆中
						if(isSnow==true){      //如又下雪，速度减为0.3倍
							this.x += 0.3*this.speed*Math.cos(this.angleM*Math.PI/180);   //画完运动
							this.y += 0.3*this.speed*Math.sin(this.angleM*Math.PI/180);
							this.life.setPosition(0,0-30);    //血条位置更新
							this.isCollision = true;
						}
						else{  //没在圆中，没下雪
							
							this.x+=this.speed*Math.cos(this.angleM*Math.PI/180);
							this.y+=this.speed*Math.sin(this.angleM*Math.PI/180);
							this.life.setPosition(0,0-30);    //血条位置更新
						}
				
					}
					else if(this.isCircle == true){/////////////////与圆相碰，就跑到圆心，并旋转,缩放
						var cx = circles[this.CollisionCircle].x;//圆x
						var cy = circles[this.CollisionCircle].y;
						var px = cx - this.x;//距离
						var py = cy - this.y;
						var len = distance(this.x,this.y,circles[this.CollisionCircle].x,circles[this.CollisionCircle].y);  //??问题：若圆数组减小，相应下标改变，即CollisionCircle值找不到对应圆
						if(len > 5){//移动
							if(px>0){
								this.x+=1;
							}
							else{
								this.x-=1;	
							}
							if(py>0){
								this.y+=1;
							}
							else{
								this.y-=1;	
							}
						}
						this.life.setPosition(0,0-30);    //血条位置更新
					}
				}
				
			}
			//this.angleS++;
		}
	}
}
PantsEnemy.prototype.draw = function(CTX){
	
	CTX.save();
	CTX.translate(this.x,this.y);
	if(this.isGather == false){   //当没在聚合状态下才可显示生命，并且检测碰撞
		this.life.draw(CTX);
		//this.life.update();
	}
	this.lightPoint.draw(CTX);
	
	CTX.rotate(this.angleS*Math.PI/180);
	
	var l = this.points.length;
	CTX.beginPath();    //裤子外围
	CTX.moveTo(this.points[0][0],this.points[0][1]);
	for(var i=1;i<l;i++){
		CTX.lineTo(this.points[i][0],this.points[i][1]);	
	}
	CTX.lineWidth = 1;
	CTX.shadowBlur = 0;
	//CTX.strokeStyle = 'rgb(180,28,140)';
	if(this.isCollision == true){  //设置碰撞效果
		if(this.collisionTime!=0){
			this.collisionTime--;
			CTX.strokeStyle = 'rgb('+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+')';
			
		}
		else{
			this.collisionTime = 15;
			this.isCollision = false;
		}
	}
	else{
		CTX.strokeStyle = 'rgb(14,249,241)';
	}
	
	CTX.stroke();
	
    ///圆标志
	CTX.beginPath();
	CTX.arc(0,0-8,3,0,2*Math.PI);
	CTX.lineWidth = 1;
	CTX.shadowBlur = 0;
	CTX.strokeStyle = 'rgb(25,14,249)';
	CTX.stroke();
	
	CTX.restore();
	/*
	CTX.moveTo(0-15,0-15);
	CTX.lineTo(0+15,0-15);
	CTX.lineTo(0+15,0+15);
	CTX.lineTo(0+5,0+15);
	CTX.lineTo(0+5,0);
	CTX.lineTo(0-5,0);
	CTX.lineTo(0-5,0+15);
	CTX.lineTo(0-15,0+15);
	CTX.lineTo(0-15,0-15);*/
}
////////////////////////裤子敌人创建相关
//function createPantsEnemys(X,Y){
//	pantsEnemys.push();
//}
function drawPantsEnemys(CTX){
	var l = pantsEnemys.length;
	while(l--){
		if(pantsEnemys[l].life.len > 0){
			pantsEnemys[l].draw(CTX);
			pantsEnemys[l].update(0,0);
		}
		else{
			
			createCards(pantsEnemys[l].x,pantsEnemys[l].y);   //随机创建卡片
			score+=10;   //分数++
			mp++;        //mp++
			createParticle(pantsEnemys[l].x,pantsEnemys[l].y,222,17,192,1);   //消失前创建粒子
			createWords(pantsEnemys[l].x,pantsEnemys[l].y,"mp+1",1);            //创建像是文字
			createWords(pantsEnemys[l].x-5,pantsEnemys[l].y-10,"score+10",1);        //创建像是文字
			createSounds(7);  //创建死亡声音
			
			var len = missiles.length;  //当消失一个敌人就全导弹部再guide
			while(len--){
				//alert('11');
				missiles[len].isFinded = false;
				missiles[len].findId = -1;
				
			}
			
			pantsEnemys.splice(l,1);	
			
		}
	}
}

////////////////////////////////////////////，，，，，，，，，，，，，，，，，，，，////////聚合敌人
function GatherEnemy(X,Y){//////////////////子类的聚合敌人
	this.x = X;
	this.y = Y;
	this.isCreate = false;  //是否创建了
	this.isStop = false;    //停止
	this.isCollision = false; //碰撞
	this.angleS = 0;  //旋转角度
	this.angleM = 0;  //移动角度
	this.speed = 1;   //速度
	this.children = [];  //孩子们
	
	this.children.push( new PantsEnemy(0+5,0-22.5,0,true) );
	this.children.push( new PantsEnemy(0+19,0-5,180,true) );
	this.children.push( new PantsEnemy(0-5,0+26,180,true) );
	this.children.push( new PantsEnemy(0-19,0+9,0,true) );
	
	this.life = new Life(0,0-45,60);  //生命
	//this.lightPoint = new LightPoint(0,0);
		
}
GatherEnemy.prototype.update = function(){
	if(this.children[0].isCreate == true && this.children[0].isGather==true){//当创建时才移动
		var px = 650 - this.x;  //聚合敌人向中心移动
		var py = 300 - this.y;
		var angle = Math.atan(py/px)*180/Math.PI;
		if(px<0){
			angle+=180;
		}
		this.angleM = angle;
		if(this.isStop == true){
			this.x+=0;
			this.y+=0;
			this.isStop = false;
		}
		else{
			this.x += this.speed*Math.cos(this.angleM*Math.PI/180);
			this.y += this.speed*Math.sin(this.angleM*Math.PI/180);
		}
		this.life.setPosition(0,0-45);  //设置血条位置
		
		this.angleS++;  //旋转
	}
	//this.x++;
	//this.y++;
	
}
GatherEnemy.prototype.draw = function(CTX,index){
	CTX.save();
	
	if(this.life.len<=0){  //若血量小于0，，孩子们自由,将他们压入他们的数组中
		//alert('11');
		var len = this.children.length;
		while(len--){
			this.children[len].isGather = false;
			this.children[len].draw(CTX);
			
			if(len==0){  //位置对应
				this.children[len].x = this.x+5;
				this.children[len].y = this.y-22.5;
				//this.children[len].update(0,0);
				pantsEnemys.push(this.children[len]);  //将孩子们压入数组
			}
			else if(len==1){
				this.children[len].x = this.x+19;
				this.children[len].y = this.y-5;
				//this.children[len].update(0,0);
				pantsEnemys.push(this.children[len]);
			}
			else if(len==2){
				this.children[len].x = this.x-5;
				this.children[len].y = this.y+26;
				//this.children[len].update(0,0);
				pantsEnemys.push(this.children[len]);
			}
			else if(len==3){
				this.children[len].x = this.x-19;
				this.children[len].y = this.y+9;
				//this.children[len].update(0,0);
				pantsEnemys.push(this.children[len]);
			}
		}
		
		createSounds(7);  //创建死亡声音
		createParticle(this.x,this.y,0,0,0,1);
		
		var len = missiles.length;  //当消失一个敌人就全导弹部再guide
		while(len--){
				//alert('11');
			missiles[len].isFinded = false;
			missiles[len].findId = -1;
				
		}
		
		gatherEnemys.splice(index,1);
		return;
	}
	else{   //若聚合体血量大于0
		CTX.translate(this.x,this.y);
		this.life.draw(CTX);  //绘制血条
		//this.life.update();
		CTX.rotate(this.angleS*Math.PI/180);
		var l = this.children.length;
		while(l--){
		//alert('112');
			this.children[l].draw(CTX);
			if(l==0){  //位置对应
				this.children[l].update(0+5,0-22.5);
				if(this.isCollision==true){  //设置碰撞
					this.children[l].isCollision = true;
					this.isCollision = false;
				}
			}
			else if(l==1){
				this.children[l].update(0+19,0-5);
				if(this.isCollision==true){  //设置碰撞
					this.children[l].isCollision = true;
					//this.isCollision = false;
				}
			}
			else if(l==2){
				this.children[l].update(0-5,0+26);
				if(this.isCollision==true){  //设置碰撞
					this.children[l].isCollision = true;
					//this.isCollision = false;
				}
			}
			else if(l==3){
				this.children[l].update(0-19,0+9);
				if(this.isCollision==true){  //设置碰撞
					this.children[l].isCollision = true;
					//this.isCollision = false;
				}
			}
		}
	}
	
	CTX.restore();
}

///////////////////////////////////创建结合体敌人相关
function createGatherEnemys(X,Y){
	//alert('12');
	gatherEnemys.push(new GatherEnemy(X,Y));
}
function drawGatherEnemys(CTX){
	var l = gatherEnemys.length;
	while(l--){
		gatherEnemys[l].update();
		gatherEnemys[l].draw(CTX,l);
	}
}

/////////////////////////////////////////////////////////////////////////////////////////子弹敌人，用于施放
function BulletEnemy(X,Y,Angle){
	this.x = X;
	this.y = Y;
	this.angleM = Angle;   //旋转,移动角度
	this.speed = 3;
	this.a = 1.01;  //加速度
	this.isDead = false;   //是否死亡
	this.isCollision = false;  //是否碰撞
	this.isCircle = false;
	this.CollisionCircle = 0;  //碰撞圆
	  
}
BulletEnemy.prototype.update = function(index){
	//////子弹沿着角度移动
	if(this.x>1300 || this.x<0 || this.y>600 || this.y<0){  //如果超出屏幕就释放
		bulletEnemys.splice(index,1);  //释放子弹敌人
	}
	else{  //没有超出屏幕
		//this.speed*=this.a;
		//this.x+=this.speed*Math.cos(this.angleM*Math.PI/180);
		//this.y+=this.speed*Math.sin(this.angleM*Math.PI/180);
		//createPointParticlePoint(this.x,this.y,1,9);      //创建拖尾粒子
		
		////////////////////与圆圈的检测
		if(this.isCircle == false){   //没在圆中
			var l1 = circles.length;    //检测敌人与圆圈碰撞
			while(l1--){
				if(l1 == 0) break;
				if(distance(this.x,this.y,circles[l1].x,circles[l1].y) < circles[l1].bullets[0].r1+20 && 
					distance(this.x,this.y,circles[l1].x,circles[l1].y) > circles[l1].bullets[0].r1-20){
					this.isCircle = true;        //缩放
					this.CollisionCircle = l1;  //与那个圆相碰
					break;
				}
			}
			if(isSnow==true){ //没在圆中，下雪
				this.speed*=this.a;
				this.x+=0.3*this.speed*Math.cos(this.angleM*Math.PI/180);
				this.y+=0.3*this.speed*Math.sin(this.angleM*Math.PI/180);
				createPointParticlePoint(this.x,this.y,1,14);      //创建拖尾粒子
			}
			else{ //没在圆中，没下雪
				this.speed*=this.a;
				this.x+=this.speed*Math.cos(this.angleM*Math.PI/180);
				this.y+=this.speed*Math.sin(this.angleM*Math.PI/180);
				createPointParticlePoint(this.x,this.y,1,9);      //创建拖尾粒子
			}
			
		}
		else{  //在圆中
			var cx = circles[this.CollisionCircle].x;//圆x
			var cy = circles[this.CollisionCircle].y;
			var px = cx - this.x;//距离
			var py = cy - this.y;
			var len = distance(this.x,this.y,circles[this.CollisionCircle].x,circles[this.CollisionCircle].y);  //??圆
			if(len > 5){//移动
				if(px>0){
					this.x+=1;
				}
				else{
					this.x-=1;	
				}
				if(py>0){
					this.y+=1;
				}
				else{
					this.y-=1;	
				}
			}
		}
		
	}
}
BulletEnemy.prototype.setAngle = function(Angle){
	this.angleM = Angle;
}
BulletEnemy.prototype.draw = function(CTX){
	CTX.save();
	CTX.translate(this.x,this.y);
	CTX.rotate(this.angleM*Math.PI/180+Math.PI/2);
	
	CTX.beginPath();   //子弹外框
	CTX.moveTo(0,0+1);
	CTX.lineTo(0-8,0+10);
	CTX.lineTo(0,0-14);
	CTX.lineTo(0+8,0+10);
	CTX.lineTo(0,0+1);
	CTX.lineWidth = 1;
	CTX.shadowBlur = 0;
	CTX.strokeStyle = 'rgb(14,249,241)';
	CTX.stroke();
	
	CTX.beginPath();  //圆标志
	CTX.arc(0,0-3,2,0,2*Math.PI);
	CTX.lineWidth = 1;
	CTX.shadowBlur = 0;
	CTX.strokeStyle = 'rgb(25,14,249)';
	CTX.stroke();
	
	CTX.restore();
	
}
/////////////////////创建子弹敌人相关
function createBulletEnemys(X,Y,Angle){
	bulletEnemys.push(new BulletEnemy(X,Y,Angle));
}
function drawBulletEnemys(CTX){
	var l = bulletEnemys.length;
	while(l--){
		if(bulletEnemys[l].isDead == false){
			bulletEnemys[l].draw(CTX);
			bulletEnemys[l].update(l);
		}
		else{//子弹消失
			createCards(bulletEnemys[l].x,bulletEnemys[l].y);   //随机创建卡片
			//score+=10;   //分数++
			//mp++;        //mp++
			createParticle(bulletEnemys[l].x,bulletEnemys[l].y,222,17,192,1);   //消失前创建粒子(用小烟花)
			createSounds(7);  //创建死亡声音
			//createWords(pantsEnemys[l].x,pantsEnemys[l].y,"mp+1",1);            //创建像是文字
			//createWords(pantsEnemys[l].x-5,pantsEnemys[l].y-10,"score+10",1);        //创建像是文字
		
			bulletEnemys.splice(l,1);	
		}
	}
}

////////////////////////////////////////////////////////////////////////////////////////////子弹炮塔敌人，一个大的子弹形
function GunEnemy(X,Y){
	//alert('111');
	this.x = X;
	this.y = Y;
	this.points = [];
	this.pointsCount = 2;
	while(this.pointsCount--){
		this.points.push( [this.x,this.y] );
	}
	this.shootDelay = 10;  //子弹发射延迟
	this.bulletAngle = 0;  //发射子弹的角度
	this.shootTime = 0;    //射了多久
	this.isCreate = false;
	this.isCollision = false;  //碰撞
	this.life = new Life(this.x,this.y-30,60);
	this.lightPoint = new LightPoint(this.x,this.y);
	
}
GunEnemy.prototype.createRandomBullet = function(){
	if(this.shootDelay != 0){
		this.shootDelay--;	
		}
	else{
		createBulletEnemys( this.x,this.y,Math.floor(random(0,360)) );
		this.shootDelay = 10;
	}
}

GunEnemy.prototype.createCircleBullet = function(){
	if(this.shootDelay > 8){
		this.shootDelay--;	
	}
	else{
		createBulletEnemys( this.x,this.y,this.bulletAngle );
		this.shootDelay = 10;
	}
	
}
GunEnemy.prototype.update = function(){
	if(this.isCreate == false){  //未创建完毕
		var l = this.points.length;
		var px = this.points[l-1][0];
		var py = this.points[l-1][1];
		this.lightPoint.update(px,py);   //亮点位置
		if(l==2){
			if(Math.abs(this.points[l-2][0]-this.points[l-1][0]) < 12){
				px-=1;
				py+=2;
				this.points[l-1][0] = px;
				this.points[l-1][1] = py;
			}
			else{
				this.points.push( [px,py] );
			}
		}
		else if(l==3){
			if(Math.abs(this.points[l-2][1]-this.points[l-1][1]) < 52){
				px+=1;
				py-=4;
				this.points[l-1][0] = px;
				this.points[l-1][1] = py;
			}
			else{
				this.points.push( [px,py] );
			}
		}
		else if(l==4){
			if(Math.abs(this.points[l-2][1]-this.points[l-1][1]) < 52){
				px+=1;
				py+=4;
				this.points[l-1][0] = px;
				this.points[l-1][1] = py;
			}
			else{
				this.points.push( [px,py] );
			}
		}
		else if(l==5){
			if(Math.abs(this.points[l-2][0]-this.points[l-1][0]) < 12){
				px-=1;
				py-=2;
				this.points[l-1][0] = px;
				this.points[l-1][1] = py;
			}
			else{
				this.isCreate = true;
				this.lightPoint.isShow = false;
				
				
			}
		}
		
	}
	else{  //创建完毕,可以发射子弹了
		this.shootTime++;
		if(this.shootTime<600){
			this.createRandomBullet();
		}
		else{
			
			this.createCircleBullet();	
			this.bulletAngle+=7;
			if(this.shootTime%800 == 0){  //旋射持续时间1200-600
				this.shootTime = 0;	
			}
		}
	}
}

GunEnemy.prototype.draw = function(CTX){
	CTX.save();
	//CTX.translate(this.x,this.y);
	this.life.draw(CTX);
	this.lightPoint.draw(CTX);
	
	CTX.beginPath();   //子弹外框
	var l = this.points.length;
	CTX.moveTo( this.points[0][0],this.points[0][1]);
	for(var i=1;i<l;i++){
		CTX.lineTo( this.points[i][0],this.points[i][1] );
	}
	CTX.lineWidth = 1;
	CTX.shadowBlur = 0;
	//CTX.strokeStyle = 'rgb(180,28,140)';
	if(this.isCollision == true){  //设置碰撞效果
		if(this.collisionTime>=0){
			this.collisionTime--;
			CTX.strokeStyle = 'rgb('+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+')';
			
		}
		else{
			this.collisionTime = 15;
			this.isCollision = false;
		}
		
	}
	else{
		CTX.strokeStyle = 'rgb(14,249,241)';
	}
	
	CTX.stroke();
	
	CTX.beginPath();  //圆标志
	CTX.arc(this.x,this.y-3,2,0,2*Math.PI);
	CTX.lineWidth = 1;
	CTX.shadowBlur = 0;
	CTX.strokeStyle = 'rgb(25,14,249)';
	CTX.stroke();
	
	CTX.restore();
}

//////////////////子弹炮塔的绘制相关
function createGunEnemys(X,Y){
	gunEnemys.push(new GunEnemy(X,Y));
}
function drawGunEnemys(CTX){
	var l = gunEnemys.length;
	while(l--){
		if(gunEnemys[l].life.len>0){
			gunEnemys[l].draw(CTX);
			gunEnemys[l].update();
		}
		else{
			createCards(gunEnemys[l].x,gunEnemys[l].y);   //随机创建卡片
			score+=10;   //分数++
			mp++;        //mp++
			createParticle(gunEnemys[l].x,gunEnemys[l].y,222,17,192,1);   //消失前创建粒子(用小烟花)
			createWords(gunEnemys[l].x,gunEnemys[l].y,"mp+1",1);            //创建像是文字
			createWords(gunEnemys[l].x-5,gunEnemys[l].y-10,"score+10",1);        //创建像是文字
			createSounds(7);  //创建死亡声音
			
			var len = missiles.length;  //当消失一个敌人就全导弹部再guide
			while(len--){
				//alert('11');
				missiles[len].isFinded = false;
				missiles[len].findId = -1;
				
			}
			
			gunEnemys.splice(l,1);
		}
	}
}