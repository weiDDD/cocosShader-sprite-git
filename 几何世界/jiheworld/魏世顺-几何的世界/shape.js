///各种形状类
function CenterStar(X,Y){
	this.x = X;
	this.y = Y;
	this.angle = 4;
	this.isCollision = false;
	this.deadTime = 60;
}	
CenterStar.prototype.collision = function(){    //碰撞检测
	///////////////与普通敌人的检测
	var l1 = enemys.length;
	while(l1--){
		if(distance(enemys[l1].x,enemys[l1].y,650,300)<30){
			isShake = true;//抖动
			this.isCollision = true;
			createParticle(650,300,220,20,190,1);  //创建死亡粒子
		}
	}
	///////////////与聚合敌人的检测
	var l2 = gatherEnemys.length;
	while(l2--){
		if(distance(gatherEnemys[l2].x,gatherEnemys[l2].y,650,300)<30){
			isShake = true;//抖动
			this.isCollision = true;
			createParticle(650,300,220,20,190,1);  //创建死亡粒子
		}
	}
	///////////////与裤子敌人的检测
	var l3 = pantsEnemys.length;
	while(l3--){
		if(distance(pantsEnemys[l3].x,pantsEnemys[l3].y,650,300)<30){
			isShake = true;//抖动
			this.isCollision = true;
			createParticle(650,300,220,20,190,1);  //创建死亡粒子
		}
	}
	///////////////与炸弹敌人的检测
	var l4 = bombEnemys.length;
	while(l4--){
		if(distance(bombEnemys[l4].x,bombEnemys[l4].y,650,300)<30){
			isShake = true;//抖动
			this.isCollision = true;
			createParticle(650,300,220,20,190,1);  //创建死亡粒子
		}
	}
	///////////////与炮塔敌人的检测
	var l5 = gunEnemys.length;
	while(l5--){
		if(distance(gunEnemys[l5].x,gunEnemys[l5].y,650,300)<30){
			isShake = true;//抖动
			this.isCollision = true;
			createParticle(650,300,220,20,190,1);  //创建死亡粒子
		}
	}
	///////////////与子弹敌人的检测
	var l6 = bulletEnemys.length;
	while(l6--){
		if(distance(bulletEnemys[l6].x,bulletEnemys[l6].y,650,300)<30){
			isShake = true;//抖动
			this.isCollision = true;
			createParticle(650,300,220,20,190,1);  //创建死亡粒子
		}
	}
	///////////////与boss敌人的检测
	var l7 = bossEnemys.length;
	while(l7--){
		if(distance(bossEnemys[l7].x,bossEnemys[l7].y,650,300)<30){
			isShake = true;//抖动
			this.isCollision = true;
			createParticle(650,300,220,20,190,1);  //创建死亡粒子
		}
	}
	
	
	if(this.isCollision == true){
		if(this.deadTime != 0){
			this.deadTime--;
		}
		else{
			
			whatScene = 3;
			this.deadTime = 60;
			this.isCollision = false;
			releaseAll();
		}
	}
}
CenterStar.prototype.draw = function(CTX){
	if(this.isCollision == false){
		var sr = Math.floor(Math.random()*255);
		var sg = Math.floor(Math.random()*255);
		var sb = Math.floor(Math.random()*255);
		this.angle++;
		CTX.save();                         //保存原来原点为(0,0)的点
		CTX.translate(650,300);             //重新映射canvas的（0,0）点
		CTX.rotate(this.angle*Math.PI/180);
		CTX.beginPath();
	
		CTX.moveTo(-15,-5);
		CTX.lineTo(+15,-5);
		CTX.lineTo(-10,+15);
		CTX.lineTo(0,-15);
		CTX.lineTo(+10,+15);
		CTX.lineTo(-15,-5);
		CTX.shadowColor = 'rgb('+sr+','+sg+','+sb+')';
		CTX.shadowBlur = 4;
		CTX.stroke();
		CTX.fillStyle = 'rgb(100,240,100)';
		CTX.fill();
		CTX.restore();
	}
	this.collision();
}
	
////////////////////////////////////////////////////////////////星星类,即要变化的星星，其他的星星还是画。
function Star(X,Y,R,G,B,SR,SG,SB,A){//构造函数
	this.x = X;
	this.y = Y;
	
	this.r = R;      //颜色
	this.g = G;
	this.b = B;
	this.a = A;
	
	this.sr = SR;    //阴影颜色
	this.sg = SG;
	this.sb = SB;
	                                 //星星运动的参数
	this.speed = 1;                  //星星初速度
	this.changeX = 1;                //用来改变速度方向的
	this.changeY = 1; 
	this.acceleration = 1.05;        //星星加速度
	this.firction = 0.95;            //星星停止时的摩擦力
	this.angle = random(0,360);
	this.coordinates = [];           //星星拖尾的数组
	this.coordinateCount = 3;        //数组长度
	while(this.coordinateCount--){
		this.coordinates.push( [this.x,this.y] );          // []表示插入的是二维的元素	
	}
	
	this.setXY = function (X,Y){
		this.x = X;
		this.y = Y;
	};
	this.setA = function (A){
		this.a = A;	
	};
	this.setRGB = function (R,G,B){
		this.r = R;
		this.g = G;
		this.b = B;
	};
	this.setSRGB = function (SR,SG,SB){
		this.sr = SR;
		this.sg = SG;
		this.sb = SB;
	};
	this.draw = function (CTX){
		CTX.beginPath();
		CTX.moveTo(this.x,this.y);
		CTX.lineTo(this.x,this.y+2);
		CTX.lineTo(this.x+2,this.y+2);
		CTX.lineTo(this.x+2,this.y);
		CTX.lineTo(this.x,this.y);
		CTX.strokeStyle = 'rgba('+this.r+','+this.g+','+this.b+','+this.a+')';
		CTX.lineWidth = 2;                            //线宽
		CTX.shadowColor = 'rgb('+this.sr+','+this.sg+','+this.sb+')';
		CTX.shadowBlur = 4;                           //阴影的级别
		CTX.stroke();                                 //绘制指定的路径
	};
}

Star.prototype.move = function (CTX){                  //更新与绘制
	this.coordinates.pop();                            //删除拖尾数组的末尾元素
	this.coordinates.unshift( [this.x,this.y] );       //将现在的位置放入数组头
	
	if(isStarStop == false){                              //如果星星没停止就加速
		if(this.speed < 20){ //限制最大速度
			this.speed *= this.acceleration;              //速度*=加速
		}
		createPointParticleTrail(this.coordinates[this.coordinates.length-1][0],this.coordinates[this.coordinates.length-1][1],this.angle,3,2);  //创建拖尾粒子
		
	} 
	else{   //如果星星停止就增加摩擦力，停止后设置参数
		if(this.speed>=0.5){
			this.speed *= this.firction;                 //速度*=摩擦力
			createPointParticleTrail(this.coordinates[this.coordinates.length-1][0],this.coordinates[this.coordinates.length-1][1],this.angle,3,2);  //创建拖尾粒子
		}
		else{
			this.speed = 1;
			isStarMove = false;
			
			var i = particles.length;
			while(i--){
				particles.splice(i,1);   //星星停止，清空粒子数组	
			}
			return;
		}
	}
	/*
	if(this.x>=1300 || this.x<=0){
		if(this.x>=1300){
			this.x = 1298;	
		}
		else{
			this.x = 2;	
		}
		this.changeX = (this.changeX==1)?-1:1;
		createParticle(this.x,this.y,this.r,this.g,this.b,this.a);          //创建粒子
	}
	else if(this.y>=600 || this.y<=0){
		if(this.y>=600){   //避免嵌入边缘
			this.y = 598;
		}	
		else{
			this.y = 2;
		}
		this.changeY = (this.changeY==1)?-1:1;
		createParticle(this.x,this.y,this.r,this.g,this.b,this.a);           //创建粒子
	}*/
	
	if(this.x >= 1300){  //边缘碰撞操作
		this.x = 1295;
		if(this.angle >= 0){
			this.angle = this.angle+2*(90-this.angle);
		}
		else if(this.angle <= 0){
			this.angle = this.angle-2*(90+this.angle);
		}
		createParticle(this.x,this.y,this.r,this.g,this.b,this.a);          //创建粒子
	}
			
	if(this.x <= 0){
		this.x = 5;
		if(180-this.angle >= 0){
			this.angle = 180 - this.angle;
		}
		else if(180-this.angle <= 0){
			this.angle = this.angle+2*(90-this.angle-180);
		}
		createParticle(this.x,this.y,this.r,this.g,this.b,this.a);          //创建粒子
	}
	if(this.y >= 600){
		this.y = 595;
		if(180-this.angle > 0){
			this.angle =  -this.angle;
		}
		else if(180-this.angle < 0){
			this.angle = -this.angle;
		}
		createParticle(this.x,this.y,this.r,this.g,this.b,this.a);          //创建粒子
	}
	if(this.y <= 0){
		this.y = 5;
		if(180-this.angle > 0){
			this.angle =  -this.angle;
		}
		else if(180-this.angle < 0){
			this.angle = -this.angle;
		}
		createParticle(this.x,this.y,this.r,this.g,this.b,this.a);          //创建粒子
	}
	
	vx = this.speed * Math.cos(this.angle*Math.PI/180);    //*changeX 为了改变方向
	vy = this.speed * Math.sin(this.angle*Math.PI/180);
	this.x += vx;
	this.y += vy;
	
	if(isStarTimeout == true){
		////////////与普通敌人的检测
		var l1 = enemys.length;
		while(l1--){
			if(distance(enemys[l1].x,enemys[l1].y,this.x,this.y) <= 40){
				enemys[l1].life.len -= 8;	
			}
		}
		////////////与聚合敌人的检测
		var l2 = gatherEnemys.length;
		while(l2--){
			if(distance(gatherEnemys[l2].x,gatherEnemys[l2].y,this.x,this.y) <= 40){
				gatherEnemys[l2].life.len -= 8;	
			}
		}
		////////////与裤子敌人的检测
		var l3 = pantsEnemys.length;
		while(l3--){
			if(distance(pantsEnemys[l3].x,pantsEnemys[l3].y,this.x,this.y) <= 40){
				pantsEnemys[l3].life.len -= 8;	
			}
		}
		////////////与炸弹敌人的检测
		var l4 = bombEnemys.length;
		while(l4--){
			if(distance(bombEnemys[l4].x,bombEnemys[l4].y,this.x,this.y) <= 40){
				bombEnemys[l4].life.len -= 8;	
			}
		}
		////////////与子弹敌人的检测
		var l5 = bulletEnemys.length;
		while(l5--){
			if(distance(bulletEnemys[l5].x,bulletEnemys[l5].y,this.x,this.y) <= 40){
				bulletEnemys[l5].isDead = true;	
			}
		}
		////////////与炮塔敌人的检测
		var l6 = gunEnemys.length;
		while(l6--){
			if(distance(gunEnemys[l6].x,gunEnemys[l6].y,this.x,this.y) <= 40){
				gunEnemys[l6].life.len -= 8;	
			}
		}
	}

	
	
	//drawParticle(CTX);                 //绘制粒子
	
	CTX.beginPath();
	CTX.moveTo(this.coordinates[this.coordinates.length-1][0] , this.coordinates[this.coordinates.length-1][1]);
	CTX.lineTo(this.x,this.y);
	CTX.strokeStyle = 'rgba('+this.r+','+this.g+','+this.b+','+this.a+')';
	CTX.lineWidth = 1;
	CTX.shadowBlur = 1;
	CTX.stroke();
	
}

/////////////////////////////////////////////星星处理，初始化星星们和更新绘制星星们
var stars = new Array(10);//星星数组
function initStars(){      //初始化星星
	for(var i=0;i<10;i++){
		r = Math.floor(Math.random()*210);
		g = Math.floor(Math.random()*210);
		b = Math.floor(Math.random()*210);
		a = 100;
		sr = Math.floor(Math.random()*255);
		sg = Math.floor(Math.random()*255);
		sb = Math.floor(Math.random()*255);
		stars[i] = new Star(Math.random()*canvas.width,Math.random()*canvas.height,r,g,b,sr,sg,sb,a);
		stars[i].draw(ctx);
	}
}

function drawStars(CTX){
	if(isStarMove == false){         //如果星星没动，就绘制闪烁星星
		for(var i=0;i<10;i++){
			var SR = Math.floor(Math.random()*255);
			var SG = Math.floor(Math.random()*255);
			var SB = Math.floor(Math.random()*255);
			stars[i].setSRGB(SR,SG,SB);
			stars[i].draw(CTX);
		}
	}
	else{
		for(var i=0;i<10;i++){
			stars[i].move(CTX);	
		}
	}
}

/////////////////////////////////////////////////////////////////////////////////////////////////////粒子类
function Particle(X,Y,R,G,B,A){
	this.x = X;
	this.y = Y;
	//this.r = random(R-20,R+20);
	//this.g = random(G-20,G+20);
	//this.b = random(B-20,B+20);
	this.r = Math.floor(random(0,255));
	this.g = Math.floor(random(0,255));
	this.b = Math.floor(random(0,255));
	this.a = A;
	
	this.angle = random(0,Math.PI*2);
	this.speed = random(2,7);
	this.friction = 0.91;
	this.deadTime = random(0.025,0.04); //死亡时间
	this.life = 2;                      //生命值为1
	                         //拖尾数组
	this.coordinates = [];
	this.coordinateCount = 8;
	while(this.coordinateCount--){
		this.coordinates.push( [this.x,this.y] );	
	}
}

Particle.prototype.update = function (index){
	this.coordinates.pop();
	this.coordinates.unshift( [this.x,this.y] );
	
	this.speed *= this.friction;
	this.x += this.speed*Math.cos(this.angle);
	this.y += this.speed*Math.sin(this.angle);
	
	this.life -= this.deadTime;          //粒子生命降低
	if(this.life <= this.deadTime){
		particles.splice(index,1);	              //删除该粒子
		createLightPoints(this.x,this.y);         //创建粒子亮点
		
	} 
	
}
Particle.prototype.draw = function (CTX){
	
	CTX.beginPath();
	CTX.moveTo(this.coordinates[this.coordinates.length-1][0] , this.coordinates[this.coordinates.length-1][1]);
	CTX.lineTo(this.x,this.y);
	CTX.lineWidth = 1.5;
	//CTX.shadowColor = 'rgba(194,211,97,0.8)';
	//CTX.shadowBlur = 100;
	CTX.strokeStyle = 'rgb('+this.r+','+this.g+','+this.b+')';
	CTX.stroke();
}
/////////////////////创建粒子相关
function createParticle(X,Y,R,G,B,A){   //创建粒子，每次都向粒子数组中添加元素
	var particleCount = 16;  //一次添加8个粒子
	while(particleCount--){
		particles.push( new Particle(X,Y,R,G,B,A) );	      //向粒子数组中添加元素
	}
	
}
function createCollisionParticle(X,Y,R,G,B,A){   //创建碰撞粒子
	var l = 8;
	while(l--){
		particles.push( new Particle(X,Y,R,G,B,A) );
		particles[particles.length-1].speed = random(2,4);
		particles[particles.length-1].deadTime = random(0.025,0.04); //死亡时间
		particles[particles.length-1].life = random(1.5,2);
	}
}

function drawParticle(CTX){                 //绘制粒子
	var i = particles.length;
	while(i--){
		particles[i].draw(CTX);
		particles[i].update(i);
	}
}
///////////////////////////////////////////////////////////////////////////////////////////各种其他粒子类
function PointParticle(X,Y,Life){  //像素点粒子
	this.x = X;
	this.y = Y;
	this.life = Life;
	this.r = Math.floor(random(0,255));
	this.g = Math.floor(random(0,255));
	this.b = Math.floor(random(0,255));
	this.a = 1;
	
}
PointParticle.prototype.update = function(){
	this.life--;
}
PointParticle.prototype.draw = function(CTX){
	//CTX.beginPath();
	//CTX.arc(this.x,this.y,0.5,0,2*Math.PI);
	CTX.fillStyle = 'rgba('+this.r+','+this.g+','+this.b+','+this.a+')';
	CTX.fillRect(this.x,this.y,0.5,0.5);
}
////////////////////////////////////////////////////////////////////点粒子，构建成各种粒子群效果
function createPointParticleTrail(X,Y,Angle,len,Life){  //创建拖尾粒子
	var l = len;  //每次增加粒子数量
	var angle1 = random((180+Angle)+10,(180+Angle)+20);
	var angle2 = random((180+Angle)-10,(180+Angle)-20);
	var long = random(0,8);    //距离
	while(l--)
	{
		particleTrails.push( new PointParticle(X+long*Math.cos(angle1*Math.PI/180),Y+long*Math.sin(angle1*Math.PI/180),Life) );
		particleTrails.push( new PointParticle(X+long*Math.cos(angle2*Math.PI/180),Y+long*Math.sin(angle2*Math.PI/180),Life) );
	}
}
function createPointParticlePoint(X,Y,Len,Life){            //在某点创建粒子
	var l = Len;
	while(l--){
		particleTrails.push( new PointParticle(X,Y,Life) );
	}
}
function createPointParticleBoom(X,Y,Len,R){  //创建爆炸粒子,爆炸粒子多少，爆炸半径
	var len = Len;
	var l = len;
	var r = R;
	while(l--){
		var angle = random(0,2*Math.PI);
		if(l<len/5){  //内圈粒子
			particleTrails.push( new PointParticle(X+(r/3+random(-r/3,r/3))*Math.cos(angle),Y+(r/3+random(-r/3,r/3))*Math.sin(angle),15) );
		}
		else if(l<2*len/5 && l>=len/5){  //内圈粒子
			particleTrails.push( new PointParticle(X+(1*r/3+random(-r/3,r/3))*Math.cos(angle),Y+(1*r/3+random(-r/3,r/3))*Math.sin(angle),20) );
		}
		else if(l<3*len/5 && l>=2*len/5){  //内圈粒子
			particleTrails.push( new PointParticle(X+(2*r/3+random(-r/3,r/3))*Math.cos(angle),Y+(2*r/3+random(-r/3,r/3))*Math.sin(angle),25) );
		}
		else if(l<4*len/5 && l>=3*len/5){  //内圈粒子
			particleTrails.push( new PointParticle(X+(2*r/3+random(-r/3,r/3))*Math.cos(angle),Y+(2*r/3+random(-r/3,r/3))*Math.sin(angle),30) );
		}
		else if(l<len){  //内圈粒子
			particleTrails.push( new PointParticle(X+(r+random(-r/3,0))*Math.cos(angle),Y+(r+random(-r/3,0))*Math.sin(angle),35) );
		}
	}
}


function drawPointParticleTrail(CTX){   
	//alert('123');
	var l = particleTrails.length;
	while(l--)
	{
		if(particleTrails[l].life!=0){
			particleTrails[l].draw(CTX);
			particleTrails[l].update();
		}
		else{
			particleTrails.splice(l,1);	
		}
	}
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////开始场景的相关
/////////////////////////./////////////////////////////////////中心周围圆圈
function Circle(X,Y,R){
	this.x = X;
	this.y = Y;
	this.r = R;//半径
	
	this.cr = 90;   //colorR
	this.cg = 90;
	this.cb = 90;
	this.alpha = 0.3;
	this.alphaA = 1;
	
	this.isBuy = false;    //是否已经购买允许使用
	
	this.sr = 54;     //shadowColorR
	this.sg = 21;
	this.sb = 240;
}
Circle.prototype.setIsBuy = function (bool){
	this.isBuy = bool;
}
Circle.prototype.draw = function (CTX){
	if(this.alpha >= 1){
		this.alphaA = -1;	
	}
	else if(this.alpha <= 0.3){
		this.alphaA = 1;
	}
	this.alpha += 0.01*this.alphaA;
	
	CTX.beginPath();
	CTX.arc(this.x,this.y,this.r,0,2*Math.PI);
	CTX.strokeStyle = 'rgba('+this.cr+','+this.cg+','+this.cb+','+this.alpha+')';
	CTX.lineWidth = 2;
	if(this.isBuy == true){//买了才显示
		CTX.shadowColor = 'rgb('+this.sr+','+this.sg+','+this.sb+')';
		CTX.stroke();
	}
	
}

function createBoxCircles(){
	for(var i=0;i<3;i++){
		boxCircles[i] = new Circle(600+250,570,5+i*8);	
		boxCircles[i].setIsBuy(true);
		
	}
	
}
function drawBoxCircles(CTX){
	
	for(var i=0;i<3;i++){
		boxCircles[i].draw(CTX);	
	}
}


function createCircles (){          //创建圆圈们
	for(var i=0;i<3;i++){
		cenCircles[i] = new Circle(400+250,300,40+i*30);	  //中心圆的初始半径40，依次增加30
	}
}
function drawCircles(CTX){          //绘制圆圈们
	for(var i=0;i<3;i++){
		cenCircles[i].draw(CTX);	
	}
}

//////////////////////////////////////////////////////////////////////购买框

function Box(X,Y){//购买框类
	this.x = X;
	this.y = Y;
	
	this.isClick = false;  //方框是否选中，同时只能选中一个方框
}
Box.prototype.setIsClick = function (bool){
	this.isClick = bool;
}
Box.prototype.draw = function(CTX){
	CTX.beginPath();
	
	if(this.isClick == true){
		CTX.strokeStyle = 'rgb(230,237,49)';
		//CTX.shadowColor = 'rgb(255,0,0)';
		CTX.shadowBlur = 0;
		CTX.lineWidth = 2;
	}
	else{
		CTX.strokeStyle = 'rgb(150,222,215)';
		//CTX.shadowColor = 'rgb(0,0,0)';
		CTX.shadowBlur = 0;
		CTX.lineWidth = 1;
	}
	CTX.strokeRect(this.x,this.y,60,60);
}

/////////
function createBoxs(){
	
	for(var i=0;i<5;i++){   //左购买框
		
		boxs[i] = new Box(50+250+i*60,540);	
		if(i==4) boxs[i].setIsClick(true);    //设置直线框选中
	}
	for(var i=5;i<8;i++){   //右购买框
		boxs[i] = new Box(570+250+(i-5)*60,540);	
	}
	
}
function drawBoxs(CTX){
	for(var i=0;i<8;i++){
		boxs[i].draw(CTX);	
	}
}
///////////////////////////////////////////////////////////////////////////乱射图形
function StarSkill(X,Y){
	this.x = X;
	this.y = Y;
	this.r = Math.floor(random(100,255));
	this.g = Math.floor(random(100,255));
	this.b = Math.floor(random(100,255));
	this.alpha = 0.3;
	this.alphaA = 1;
}
StarSkill.prototype.draw = function(CTX){
	if(this.alpha >= 1){
		this.alphaA = -1;	
	}
	else if(this.alpha <= 0.3){
		this.alphaA = 1;
	}
	this.alpha += 0.01*this.alphaA;
	
	CTX.beginPath();
	CTX.moveTo(this.x-16,this.y+14);
	CTX.lineTo(this.x-16,this.y-16);
	CTX.lineTo(this.x+16,this.y+16);
	CTX.lineTo(this.x+16,this.y-16);
	CTX.lineTo(this.x-13,this.y+14);
	CTX.strokeStyle = 'rgba('+this.r+','+this.g+','+this.b+','+this.alpha+')';
	CTX.lineWidth = 1;
	CTX.shadowBlur = 0;
	CTX.stroke();
}
///////////////////////////////////////////////////////////////雪花图标
function SnowSkill(X,Y){
	this.x = X;
	this.y = Y;
	this.r = Math.floor(random(100,255));
	this.g = Math.floor(random(100,255));
	this.b = Math.floor(random(100,255));
	this.alpha = 0.3;
	this.alphaA = 1;
}
SnowSkill.prototype.draw = function(CTX){
	if(this.alpha >= 1){
		this.alphaA = -1;	
	}
	else if(this.alpha <= 0.3){
		this.alphaA = 1;
	}
	this.alpha += 0.01*this.alphaA;
	
	CTX.beginPath();
	CTX.moveTo(this.x,this.y-20);
	CTX.lineTo(this.x,this.y+20);
	CTX.strokeStyle = 'rgba('+this.r+','+this.g+','+this.b+','+this.alpha+')';
	CTX.lineWidth = 1;
	CTX.shadowBlur = 0;
	CTX.stroke();
	
	CTX.beginPath();
	CTX.moveTo(this.x-20,this.y);
	CTX.lineTo(this.x+20,this.y);
	CTX.strokeStyle = 'rgba('+this.r+','+this.g+','+this.b+','+this.alpha+')';
	CTX.lineWidth = 1;
	CTX.shadowBlur = 0;
	CTX.stroke();
	
	CTX.beginPath();
	CTX.moveTo(this.x-10,this.y-10);
	CTX.lineTo(this.x+10,this.y+10);
	CTX.strokeStyle = 'rgba('+this.r+','+this.g+','+this.b+','+this.alpha+')';
	CTX.lineWidth = 1;
	CTX.shadowBlur = 0;
	CTX.stroke();
	
	CTX.beginPath();
	CTX.moveTo(this.x+10,this.y-10);
	CTX.lineTo(this.x-10,this.y+10);
	CTX.strokeStyle = 'rgba('+this.r+','+this.g+','+this.b+','+this.alpha+')';
	CTX.lineWidth = 1;
	CTX.shadowBlur = 0;
	CTX.stroke();
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////各种几何形状类
function Line(X,Y){//直线型,相当于构造函数了
	this.x = X;                    //中心位置
	this.y = Y;
	this.r = random(0,255);   //颜色
	this.g = random(0,255);
	this.b = random(0,255);
	
	this.isCreate = false;//是否画出了,画出了就根据敌人的位置，来旋转
	this.len = 30; //直线的长度
	this.angle = -45*Math.PI/180;   //初始角度为45
	
	this.points = []; // 直线型的顶点数
	this.pointCount = 2;
	while(this.pointCount--){
		this.points.push( [this.x-0.5*this.len*Math.cos(this.angle),this.y-0.5*this.len*Math.sin(this.angle)] );	    //原点为直线的中心
	}
	
	this.lightPoint = new LightPoint(this.points[1][0],this.points[1][1]);
}

Line.prototype.create = function (){   //直线刚刚创建时的”一笔一画出来“的效果
	var pointx = this.points[1][0];
	var pointy = this.points[1][1];
	if(distance(this.points[0][0],this.points[0][1],this.points[1][0],this.points[1][1])<=this.len){  //直线长度为
		pointx += 2*Math.cos(this.angle); //2为速度
		pointy += 2*Math.sin(this.angle);
		
		this.points[1][0] = pointx;
		this.points[1][1] = pointy;
		
		this.lightPoint.update(pointx,pointy);   
 	}
	else{ //如果画完了就设置属性
		this.isCreate = true;		
		this.lightPoint.isShow = false;
	}
}

Line.prototype.draw = function (CTX,index){//参数index为线数组的下
	CTX.save();
	CTX.beginPath();
	CTX.moveTo(this.points[0][0],this.points[0][1]);
	CTX.lineTo(this.points[1][0],this.points[1][1]);
	CTX.lineWidth = 2;
	CTX.shadowBlur = 0;
	CTX.strokeStyle = 'rgb(109,21,255)';
	CTX.stroke();
	CTX.restore();
	
	this.lightPoint.draw(CTX);  //?
}

///////////
function createLines(X,Y){  //在X，Y处创建一个直线
	lines.push( new Line(X,Y) );
	
}
function drawLines(CTX){    //绘制直线数组
	
	var l = lines.length;
	while(l--){
		lines[l].create();
		lines[l].draw(CTX,l);  //?
	}
}
//////////////////////////////////////////////////、、、、/////////////////////////////////、、/////////三角形
///一个本身(在框中显示)，两个三角子弹，一个激光；点击down绘制一个三角，移动绘制激光(限长)，up为绘制另一个三角
function Triangle(X,Y){
	this.x = X;  //中心位置
	this.y = Y;
	
	this.angle = 0;
	this.len = 20;  //三角的边长
	this.centerLen = this.len/2/Math.sin(Math.PI/3);   //三角形中心点距离三个顶点的距离
	
	this.isCreate = false;
	this.isArrive = false;       //是否三角子弹就位
	this.bulletLen = 400;        //激光最大长度
	
	this.TriangleBullets = [];       //三角形两个三角子弹
	this.TriangleBulletsCount = 2;   //三角子弹数量为2
	var l = this.TriangleBulletsCount;
	while(l--){
		
		this.TriangleBullets.push( new TriangleBullet(this.x,this.y) );	//三角子弹
		
	}
	this.LaserBullets = new LaserBullet(this.x,this.y); //激光子弹
	
	this.points = [];   //本身顶点
	
	this.points.push( [this.x,this.y - this.centerLen] );//先放两个点,都是三角形的上顶点
	this.points.push( [this.x,this.y - this.centerLen] );
	
	this.life1 = new Life(this.x,this.y,40);   //两个小三角的血条对象
	this.life2 = new Life(this.x,this.y,40);  //血条对象
	this.lightPoint = new LightPoint(this.x,this.y - this.centerLen);
}

Triangle.prototype.create = function (){            //创建时的一笔一画的效果
	var len = this.points.length;
	var px = this.points[len-1][0];  //取到最后一个点
	var py = this.points[len-1][1];
	
	if(len == 2){ //如果顶点数组长度为2，即要画到第二个顶点
		if(distance(this.points[len-2][0],this.points[len-2][1],this.points[len-1][0],this.points[len-1][1]) <= this.len){ //如果边长未画足
			px += 2*Math.cos(this.angle + Math.PI/3);  //2为绘制速度
			py += 2*Math.sin(this.angle + Math.PI/3);
			
			this.points[len-1][0] = px;
			this.points[len-1][1] = py;
			this.lightPoint.update(px,py);
		}
		else{
			this.points.push([px,py]);	
		}
	}
	else if(len == 3){
		if(distance(this.points[len-2][0],this.points[len-2][1],this.points[len-1][0],this.points[len-1][1])<=this.len-2){
			px += 2*Math.cos(this.angle + Math.PI);
			py += 2*Math.sin(this.angle + Math.PI);
			
			this.points[len-1][0] = px;
			this.points[len-1][1] = py;
			this.lightPoint.update(px,py);
		}
		else{
			this.points.push([px,py]);	
		}
	}
	else if(len == 4){
		if(distance(this.points[len-2][0],this.points[len-2][1],this.points[len-1][0],this.points[len-1][1])<=this.len){
			px += 2*Math.cos(this.angle - Math.PI/3);
			py += 2*Math.sin(this.angle - Math.PI/3);
			
			this.points[len-1][0] = px;
			this.points[len-1][1] = py;
			this.lightPoint.update(px,py);
		}
		else{
			this.isCreate = true;
			this.lightPoint.isShow = false;
		}
	}
}
Triangle.prototype.update = function(X,Y){//激光绘制两三角间
 	if(distance(this.TriangleBullets[0].x,this.TriangleBullets[0].y,X,Y) < 300){  //限制激光长度
    	this.TriangleBullets[1].x = X;  //第二个三角的移动更新
		this.TriangleBullets[1].y = Y;
		this.TriangleBullets[1].update(X,Y);
	}
	else{    //若达到长度就创建
		triangleCreate = true;	
		whatBoxClick = 4;  //设置直线选中
		for(var i=0;i<8;i++){
			if(i==4) boxs[i].setIsClick(true);
			else boxs[i].setIsClick(false);
		}
	}
	
	this.LaserBullets.setPoint1(this.TriangleBullets[0].x,this.TriangleBullets[0].y);   //设置激光的始末点
	this.LaserBullets.setPoint2(this.TriangleBullets[1].x,this.TriangleBullets[1].y);
	this.life1.setPosition(this.TriangleBullets[0].x,this.TriangleBullets[0].y-8);         //血条的位置设置
	this.life2.setPosition(this.TriangleBullets[1].x,this.TriangleBullets[1].y-8);
}
Triangle.prototype.drawBullet = function(CTX){
	this.life1.draw(CTX);             //绘制血条
	this.life2.draw(CTX); 
	this.life1.update();
	this.life2.update();
	this.TriangleBullets[0].draw(CTX);
	this.TriangleBullets[1].draw(CTX);
	this.LaserBullets.draw(CTX);
}

Triangle.prototype.draw = function (CTX,index){
	
	CTX.beginPath();
	var len = this.points.length;
	CTX.moveTo(this.points[0][0],this.points[0][1]);
	
	for(var i = 1;i<len;i++){
		CTX.lineTo(this.points[i][0],this.points[i][1]);
	}
	CTX.lineWidth = 2;
	CTX.shadowBlur = 0;
	CTX.strokeStyle = 'rgb(109,21,255)';
	CTX.stroke();
	
	CTX.beginPath();                //十字
	CTX.moveTo(this.x-4,this.y);
	CTX.lineTo(this.x+4,this.y);
	CTX.lineWidth = 1;
	CTX.strokeStyle = 'rgb(222,235,18)';
	CTX.stroke();
	CTX.beginPath();                //十字
	CTX.moveTo(this.x,this.y-6);
	CTX.lineTo(this.x,this.y+6);
	CTX.lineWidth = 1;
	CTX.strokeStyle = 'rgb(222,235,18)';
	CTX.stroke();
	
	this.lightPoint.draw(CTX);
}

//////////////创建三角相关
function createTriangles(X,Y){   //创建三角
	triangles.push(new Triangle(X,Y));
}
function drawTriangles(CTX){
	
	var l = triangles.length;
	while(l--){
		if(l==0){
			triangles[l].draw(CTX,l);
			//alert('123');
			triangles[l].create();
		}
		else{    //若不是第一个(购买框中的)就绘制三角子弹和激光，更新在MouseMove中
			if(triangles[l].life1.len!=0){
				triangles[l].drawBullet(CTX);
			}
			else{
				triangles.splice(l,1);	
			}
		}
	}
	
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////正方形
function Rect(X,Y,Len){  //边长20，
	this.x = X;
	this.y = Y;
	//this.whatCircle = WhatCircle;//位于哪个炮塔圈
	
	this.angle = 0;
	this.timeDelay = 20;       //发射延迟
	
	
	this.points = [];  //矩形的顶点数组
	this.len = Len;     //矩形的边长
	
	
	this.points.push( [this.x-this.len/2,this.y-this.len/2] );  //起始点为左上点
	this.points.push( [this.x-this.len/2,this.y-this.len/2] );
	this.cenToPoint = distance(this.x,this.y,this.points[0][0],this.points[0][1]);//中心到顶点距离
	
	this.life = new Life(this.x,this.y-this.cenToPoint-3,60); //血条，30持续时间10秒
	this.lightPoint = new LightPoint(this.x-this.len/2,this.y-this.len/2);
}
Rect.prototype.create = function(index){
	var len = this.points.length;
	var px = this.points[len-1][0]; //取到最后一点
	var py = this.points[len-1][1];
	
	if(len == 2){
		if(distance(this.points[len-2][0],this.points[len-2][1],this.points[len-1][0],this.points[len-1][1]) <= this.len){
			px += 2;
			this.points[len-1][0] = px;
			this.lightPoint.update(px,py);
		}
		else{
			this.points.push( [px,py] );	
		}
	}
	else if(len == 3){
		if(distance(this.points[len-2][0],this.points[len-2][1],this.points[len-1][0],this.points[len-1][1]) <= this.len){
			py += 2;
			this.points[len-1][1] = py;
			this.lightPoint.update(px,py);
		}
		else{
			this.points.push( [px,py] );	
		}
	}
	else if(len == 4){
		if(distance(this.points[len-2][0],this.points[len-2][1],this.points[len-1][0],this.points[len-1][1]) <= this.len){
			px -=2;
			this.points[len-1][0] = px;
			this.lightPoint.update(px,py);
		}
		else{
			this.points.push( [px,py] );	
		}
	}
	else if(len == 5){
		if(distance(this.points[len-2][0],this.points[len-2][1],this.points[len-1][0],this.points[len-1][1]) <= this.len){
			py -= 2;
			this.points[len-1][1] = py;
			this.lightPoint.update(px,py);
		}
		else{
			this.isCreate = true;
			this.lightPoint.isShow = false;
			
			//////////////////////发射导弹
			if(this.timeDelay != 0){
				this.timeDelay--;
			}	
			else{
				this.timeDelay = 20;
				if(index != 0){
					createMissiles(this.x,this.y,random(0,2*Math.PI),1.2);
				}
			}
		}
	}
			
	
}

Rect.prototype.draw = function (CTX,index){
	
	if(this.isCreate == true && index != 0){
		this.life.update();  //绘制血条
		this.life.draw(CTX);
		this.angle+=2;//旋转,不是弧度
		this.points[0][0] = this.x+this.cenToPoint*Math.cos((this.angle-135)*Math.PI/180);
		this.points[0][1] = this.y+this.cenToPoint*Math.sin((this.angle-135)*Math.PI/180);
		this.points[1][0] = this.x+this.cenToPoint*Math.cos((this.angle-45)*Math.PI/180);
		this.points[1][1] = this.y+this.cenToPoint*Math.sin((this.angle-45)*Math.PI/180);
		this.points[2][0] = this.x+this.cenToPoint*Math.cos((this.angle+45)*Math.PI/180);
		this.points[2][1] = this.y+this.cenToPoint*Math.sin((this.angle+45)*Math.PI/180);
		this.points[3][0] = this.x+this.cenToPoint*Math.cos((this.angle+135)*Math.PI/180);
		this.points[3][1] = this.y+this.cenToPoint*Math.sin((this.angle+135)*Math.PI/180);
		this.points[4][0] = this.x+this.cenToPoint*Math.cos((this.angle-135)*Math.PI/180);
		this.points[4][1] = this.y+this.cenToPoint*Math.sin((this.angle-135)*Math.PI/180);	
		
		createPointParticlePoint(this.points[0][0],this.points[0][1],1,10);  //创建顶点粒子
		createPointParticlePoint(this.points[1][0],this.points[1][1],1,10);
		createPointParticlePoint(this.points[2][0],this.points[2][1],1,10);
		createPointParticlePoint(this.points[3][0],this.points[3][1],1,10);
	}
	
	CTX.save();
	CTX.beginPath();
	CTX.moveTo(this.points[0][0],this.points[0][1]);
	var l = this.points.length;
	for(var i = 1;i<l;i++){
		CTX.lineTo(this.points[i][0],this.points[i][1]);	
	}
	CTX.lineWidth = 2;
	CTX.shadowBlur = 0;
	CTX.strokeStyle = 'rgb(109,21,255)';
	CTX.stroke();
	CTX.restore();
	
	CTX.beginPath();                //十字
	CTX.moveTo(this.x-4,this.y);
	CTX.lineTo(this.x+4,this.y);
	CTX.lineWidth = 1;
	CTX.strokeStyle = 'rgb(222,235,18)';
	CTX.stroke();
	CTX.beginPath();                //十字
	CTX.moveTo(this.x,this.y-6);
	CTX.lineTo(this.x,this.y+6);
	CTX.lineWidth = 1;
	CTX.strokeStyle = 'rgb(222,235,18)';
	CTX.stroke();
	
	this.lightPoint.draw(CTX);
}

/////////创建矩形相关
function createRects(X,Y,Len){
	rects.push(new Rect(X,Y,Len));
}
function drawRects(CTX){
	
	var l = rects.length;
	while(l--){
		if(rects[l].life.len!=0){
			rects[l].create(l);
			rects[l].draw(CTX,l);
		}
		else{
			
			rects.splice(l,1);
		}
		
	}
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////圆形
function CircleOut(X,Y){
	this.x = X;
	this.y = Y;
	
	this.angle = 0;   //创建时的角度
	//this.points = [];不需顶点数组
	this.r = 10;      //y圆的半径
	
	this.timeDelay = 0;
	this.shootNum = 0;
	this.isCreate = false;
	this.bullets = [];
	this.bullets.push(new CircleBullet(this.x,this.y));
	
	this.life = new Life(this.x,this.y-this.r-3,60);  //血条60
	this.lightPoint = new LightPoint(this.x-this.r,this.y);
}
CircleOut.prototype.create = function(){
	if(this.angle<=360){
		this.angle+=10;	
	}
	else{//
		this.isCreate = true;	
		this.lightPoint.isShow = false;
		
	}
	this.lightPoint.update(this.x+this.r*Math.cos((this.angle)*Math.PI/180),this.y+this.r*Math.sin((this.angle)*Math.PI/180));
}
CircleOut.prototype.draw = function(CTX,index){
	//alert('111');
	if(this.isCreate == true && index != 0){
		this.life.update();  //绘制血条
		this.life.draw(CTX);
		
		this.bullets[0].draw(CTX);
		this.bullets[0].update();
	}
	CTX.beginPath();
	CTX.arc(this.x,this.y,this.r,0,this.angle*Math.PI/180);
	CTX.lineWidth = 2;
	CTX.shadowBlur = 0;
	CTX.strokeStyle = 'rgb(109,21,255)';
	CTX.stroke();
	
	CTX.beginPath();                //十字
	CTX.moveTo(this.x-4,this.y);
	CTX.lineTo(this.x+4,this.y);
	CTX.lineWidth = 1;
	CTX.strokeStyle = 'rgb(222,235,18)';
	CTX.stroke();
	CTX.beginPath();                //十字
	CTX.moveTo(this.x,this.y-6);
	CTX.lineTo(this.x,this.y+6);
	CTX.lineWidth = 1;
	CTX.strokeStyle = 'rgb(222,235,18)';
	CTX.stroke();
	
	this.lightPoint.draw(CTX);
}

////////圆形创建想关
function createCirclesOut(X,Y){   //这里区别于前面的绘制购买框中的圆
	circles.push(new CircleOut(X,Y));
}
function drawCirclesOut(CTX){
	var l = circles.length;
	while(l--){
		if(circles[l].life.len!=0){
			circles[l].draw(CTX,l);
			circles[l].create();
		}
		else{//血条为0
			//////////释放普通敌人
			var l1 = enemys.length;    //当要删除圆时，遍历敌人，且将束缚住的敌人释放
			while(l1--){
				if(enemys[l1].CollisionCircle == l){
					enemys[l1].isScale = false;
					enemys[l1].CollisionCircle--;
				}
				else{
					enemys[l1].CollisionCircle--;
				}
			}	
			///////////释放裤子敌人
			var l2 = pantsEnemys.length;    //当要删除圆时，遍历敌人，且将束缚住的敌人释放
			while(l2--){
				if(pantsEnemys[l2].CollisionCircle == l){
					pantsEnemys[l2].isCircle = false;
					pantsEnemys[l2].CollisionCircle--;
				}
				else{
					pantsEnemys[l2].CollisionCircle--;
				}
			}	
			///////////释放炸弹敌人
			var l3 = bombEnemys.length;    //当要删除圆时，遍历敌人，且将束缚住的敌人释放
			while(l3--){
				if(bombEnemys[l3].CollisionCircle == l){
					bombEnemys[l3].isCircle = false;
					bombEnemys[l3].CollisionCircle--;
				}
				else{
					bombEnemys[l3].CollisionCircle--;
				}
			}	
			///////////释放子弹敌人
			var l4 = bulletEnemys.length;    //当要删除圆时，遍历敌人，且将束缚住的敌人释放
			while(l4--){
				if(bulletEnemys[l4].CollisionCircle == l){
					bulletEnemys[l4].isCircle = false;
					bulletEnemys[l4].CollisionCircle--;
				}
				else{
					bulletEnemys[l4].CollisionCircle--;
				}
			}	
			
			circles.splice(l,1);
		}
	}
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////五角形
function Pentagon(X,Y,Len){   //边长20
	this.x = X;
	this.y = Y;
	this.isCreate = false;
	this.angle = 0;
	
	this.points = [];
	this.len = Len;
	this.lx = this.len/2*Math.cos(18*Math.PI/180);   //五角星中心点距离起始点的x距离
	this.ly = this.len/2*Math.sin(18*Math.PI/180);   //。。。y距离
	this.cenToPoint = distance( this.x - this.lx,this.y - this.ly,this.x,this.y );
	
	this.points.push( [this.x - this.lx,this.y - this.ly] );
	this.points.push( [this.x - this.lx,this.y - this.ly] );
	
	this.life = new Life(this.x,this.y-30,60);       //10秒
	//this.bullets = [];
	//this.bulletCount = 5;
	this.lightPoint = new LightPoint(this.x - this.lx,this.y - this.ly);
}
Pentagon.prototype.create = function(index){
	var len = this.points.length;
	var px = this.points[len-1][0];
	var py = this.points[len-1][1];
	
	if(len == 2){
		if(distance(this.points[len-2][0],this.points[len-2][1],this.points[len-1][0],this.points[len-1][1]) <= this.len){
			px += 2;
			this.points[len-1][0] = px;
			this.lightPoint.update(px,py);
		}
		else{
			this.points.push( [px,py] );
		}
	}
	else if(len == 3){
		if(distance(this.points[len-2][0],this.points[len-2][1],this.points[len-1][0],this.points[len-1][1]) <= this.len){
			px += 2*Math.cos(144*Math.PI/180);
			py += 2*Math.sin(144*Math.PI/180);
			this.points[len-1][0] = px;
			this.points[len-1][1] = py;
			this.lightPoint.update(px,py);
		}
		else{
			this.points.push( [px,py] );
		}
	}
	else if(len == 4){
		if(distance(this.points[len-2][0],this.points[len-2][1],this.points[len-1][0],this.points[len-1][1]) <= this.len){
			px += 2*Math.cos(288*Math.PI/180);
			py += 2*Math.sin(288*Math.PI/180);
			this.points[len-1][0] = px;
			this.points[len-1][1] = py;
			this.lightPoint.update(px,py);
		}
		else{
			this.points.push( [px,py] );
		}
	}
	else if(len == 5){
		if(distance(this.points[len-2][0],this.points[len-2][1],this.points[len-1][0],this.points[len-1][1]) <= this.len){
			px += 2*Math.cos(72*Math.PI/180);
			py += 2*Math.sin(72*Math.PI/180);
			this.points[len-1][0] = px;
			this.points[len-1][1] = py;
			this.lightPoint.update(px,py);
		}
		else{
			this.points.push( [px,py] );
		}
	}
	else if(len == 6){
		if(distance(this.points[len-2][0],this.points[len-2][1],this.points[len-1][0],this.points[len-1][1]) <= this.len){
			px += 2*Math.cos(216*Math.PI/180);
			py += 2*Math.sin(216*Math.PI/180);
			this.points[len-1][0] = px;
			this.points[len-1][1] = py;
			this.lightPoint.update(px,py);
		}
		else{
			this.isCreate = true;
			this.lightPoint.isShow = false;
		
			
		}
	}
	
}
Pentagon.prototype.draw = function(CTX,index){
	
	
	CTX.beginPath();
	CTX.moveTo(this.points[0][0],this.points[0][1]);
	var l = this.points.length;
	for(var i=1;i<l;i++){
		CTX.lineTo(this.points[i][0],this.points[i][1]);
	}
	CTX.lineWidth = 2;
	CTX.shadowBlur = 0;
	CTX.strokeStyle = 'rgb(109,21,255)';
	CTX.stroke();
	
	CTX.beginPath();                //十字
	CTX.moveTo(this.x-4,this.y);
	CTX.lineTo(this.x+4,this.y);
	CTX.lineWidth = 1;
	CTX.strokeStyle = 'rgb(222,235,18)';
	CTX.stroke();
	CTX.beginPath();                //十字
	CTX.moveTo(this.x,this.y-6);
	CTX.lineTo(this.x,this.y+6);
	CTX.lineWidth = 1;
	CTX.strokeStyle = 'rgb(222,235,18)';
	CTX.stroke();
	
	this.lightPoint.draw(CTX);
	
	if(this.isCreate == true && index!=0){//更新
		this.life.update();   //绘制血条
		this.life.draw(CTX);
		
		this.angle++;         //旋转
		this.points[0][0] = this.x+this.cenToPoint*Math.cos((this.angle+198)*Math.PI/180);
		this.points[0][1] = this.y+this.cenToPoint*Math.sin((this.angle+198)*Math.PI/180);
		this.points[1][0] = this.x+this.cenToPoint*Math.cos((this.angle-18)*Math.PI/180);
		this.points[1][1] = this.y+this.cenToPoint*Math.sin((this.angle-18)*Math.PI/180);
		this.points[2][0] = this.x+this.cenToPoint*Math.cos((this.angle+126)*Math.PI/180);
		this.points[2][1] = this.y+this.cenToPoint*Math.sin((this.angle+126)*Math.PI/180);
		this.points[3][0] = this.x+this.cenToPoint*Math.cos((this.angle-90)*Math.PI/180);
		this.points[3][1] = this.y+this.cenToPoint*Math.sin((this.angle-90)*Math.PI/180);
		this.points[4][0] = this.x+this.cenToPoint*Math.cos((this.angle+54)*Math.PI/180);
		this.points[4][1] = this.y+this.cenToPoint*Math.sin((this.angle+54)*Math.PI/180);	
		this.points[5][0] = this.x+this.cenToPoint*Math.cos((this.angle+198)*Math.PI/180);
		this.points[5][1] = this.y+this.cenToPoint*Math.sin((this.angle+198)*Math.PI/180);	
		
		createPointParticlePoint(this.points[0][0],this.points[0][1],1,20);      //创建拖尾粒子
		createPointParticlePoint(this.points[1][0],this.points[1][1],1,20);      //创建拖尾粒子
		createPointParticlePoint(this.points[2][0],this.points[2][1],1,20);      //创建拖尾粒子
		createPointParticlePoint(this.points[3][0],this.points[3][1],1,20);      //创建拖尾粒子
		createPointParticlePoint(this.points[4][0],this.points[4][1],1,20);      //创建拖尾粒子
		
		
		/////////////与普通敌人碰撞检测
		var l1 = enemys.length;
		while(l1--){
			if(distance(this.x,this.y,enemys[l1].x,enemys[l1].y) < 40){
				createParticle(this.x,this.y,0,0,0,1);    //创建粒子效果(改成爆炸的粒子效果)
				createPointParticleBoom(this.x,this.y,200,200);
				isShake = true; //抖动
				this.life.len = 0;                //五星生命减为0
				break;	
			}
		}
		/////////////与聚合敌人碰撞检测
		var l2 = gatherEnemys.length;
		while(l2--){
			if(distance(this.x,this.y,gatherEnemys[l2].x,gatherEnemys[l2].y) < 40){
				createParticle(this.x,this.y,0,0,0,1);    //创建粒子效果(改成爆炸的粒子效果)
				createPointParticleBoom(this.x,this.y,200,200);
				isShake = true; //抖动
				this.life.len = 0;                //五星生命减为0
				break;	
			}
		}
		/////////////与裤子敌人碰撞检测
		var l3 = pantsEnemys.length;
		while(l3--){
			if(distance(this.x,this.y,pantsEnemys[l3].x,pantsEnemys[l3].y) < 40){
				createParticle(this.x,this.y,0,0,0,1);    //创建粒子效果(改成爆炸的粒子效果)
				createPointParticleBoom(this.x,this.y,200,200);
				isShake = true; //抖动
				this.life.len = 0;                //五星生命减为0
				break;	
			}
		}
		/////////////与炸弹敌人碰撞检测
		var l4 = bombEnemys.length;
		while(l4--){
			if(distance(this.x,this.y,bombEnemys[l4].x,bombEnemys[l4].y) < 40){
				createParticle(this.x,this.y,0,0,0,1);    //创建粒子效果(改成爆炸的粒子效果)
				createPointParticleBoom(this.x,this.y,200,200);
				isShake = true; //抖动
				this.life.len = 0;                //五星生命减为0
				break;	
			}
		}
		/////////////与子弹敌人碰撞检测
		var l5 = bulletEnemys.length;
		while(l5--){
			if(distance(this.x,this.y,bulletEnemys[l5].x,bulletEnemys[l5].y) < 40){
				createParticle(this.x,this.y,0,0,0,1);    //创建粒子效果(改成爆炸的粒子效果)
				createPointParticleBoom(this.x,this.y,200,200);
				isShake = true; //抖动
				this.life.len = 0;                //五星生命减为0
				break;	
			}
		}
		/////////////与炮塔敌人碰撞检测
		var l6 = gunEnemys.length;
		while(l6--){
			if(distance(this.x,this.y,gunEnemys[l6].x,gunEnemys[l6].y) < 40){
				createParticle(this.x,this.y,0,0,0,1);    //创建粒子效果(改成爆炸的粒子效果)
				createPointParticleBoom(this.x,this.y,200,200);
				isShake = true; //抖动
				this.life.len = 0;                //五星生命减为0
				break;	
			}
		}
		////////////////////////////////
		if(this.life.len<=0){   //生命为0，释放检测
			createParticle(this.x,this.y,0,0,0,1);    //创建粒子效果(改成爆炸的粒子效果)
			createPointParticleBoom(this.x,this.y,200,200);
			isShake = true; //抖动
			//////////让五角星周围一定距离的敌人死亡
			/////普通敌人
			var l1 = enemys.length;
			while(l1--){
				if(distance(this.x,this.y,enemys[l1].x,enemys[l1].y) < 200){  //若敌人和五角星的距离小于一定值，
					enemys[l1].life.len = 0;  //敌人生命减为0
				}
			}
			///////聚合敌人
			var l2 = gatherEnemys.length;
			while(l2--){
				if(distance(this.x,this.y,gatherEnemys[l2].x,gatherEnemys[l2].y) < 200){  //若敌人和五角星的距离小于一定值，
					gatherEnemys[l2].life.len = 0;  //敌人生命减为0
					gatherEnemys[l2].children[0].life.len = 0;
					gatherEnemys[l2].children[1].life.len = 0;
					gatherEnemys[l2].children[2].life.len = 0;
					gatherEnemys[l2].children[3].life.len = 0;
				}
			}
			///////裤子敌人
			var l3 = pantsEnemys.length;
			while(l3--){
				if(distance(this.x,this.y,pantsEnemys[l3].x,pantsEnemys[l3].y) < 200){  //若敌人和五角星的距离小于一定值，
					pantsEnemys[l3].life.len = 0;  //敌人生命减为0
				}
			}
			////////炸弹敌人
			var l4 = bombEnemys.length;
			while(l4--){
				if(distance(this.x,this.y,bombEnemys[l4].x,bombEnemys[l4].y) < 200){  //若敌人和五角星的距离小于一定值，
					bombEnemys[l4].life.len = 0;  //敌人生命减为0
				}
			}
			////////子弹敌人
			var l5 = bulletEnemys.length;
			while(l5--){
				if(distance(this.x,this.y,bulletEnemys[l5].x,bulletEnemys[l5].y) < 200){  //若敌人和五角星的距离小于一定值，
					bulletEnemys[l5].isDead = true;  //敌人生命减为0
				}
			}
			////////炮塔敌人
			var l6 = gunEnemys.length;
			while(l6--){
				if(distance(this.x,this.y,gunEnemys[l6].x,gunEnemys[l6].y) < 200){  //若敌人和五角星的距离小于一定值，
					gunEnemys[l6].life.len = 0;  //敌人生命减为0
				}
			}
			
			createLaserBullets(this.x,this.y,Math.PI/180);    //创建炸弹激光
			createLaserBullets(this.x,this.y,36*Math.PI/180);
			createLaserBullets(this.x,this.y,72*Math.PI/180);
			createLaserBullets(this.x,this.y,108*Math.PI/180);
			createLaserBullets(this.x,this.y,144*Math.PI/180);
			createLaserBullets(this.x,this.y,180*Math.PI/180);
			createLaserBullets(this.x,this.y,216*Math.PI/180);
			createLaserBullets(this.x,this.y,252*Math.PI/180);
			createLaserBullets(this.x,this.y,288*Math.PI/180);
			createLaserBullets(this.x,this.y,324*Math.PI/180);
			
			pentagons.splice(index,1);                //释放五星
			
			return;
		}
	}
}

///////////////////创建五角星相关
function createPentagons(X,Y,Len){
	pentagons.push(new Pentagon(X,Y,Len));
}
function drawPentagons(CTX){
	
	var l = pentagons.length;
	while(l--){
		//if(pentagons[l].life.len != 0){
			pentagons[l].create(l);
			pentagons[l].draw(CTX,l);
			
		//}
		//else{
		//	pentagons.splice(l,1);
			
			
		//}
	}
	
}


////////////////////////////////////////////////////////////////////////////////////////////////////////其他各种敌人



////////////////////////////////////////////////////////////////////////////////////////////////////////雪花效果

function Snow(X,Y){
	this.x = X;
	this.y = Y;
	this.speed = random(0.5,2);
	this.size = random(0.4,2);
	this.gravity = 1.005;     //重力
	this.angle = random(65,115); //角度
	this.alpha = random(0.2,1);  //不透明度
	this.alphaA = 1;  //alpha+=控制
	this.life = 500;             //生命
	this.centerDis = distance(this.x,this.y,650,300); //距离中心的位置
}
Snow.prototype.update = function(){
	
	this.life--;
	//this.speed*=this.gravity;  // 速度增加
	this.angle = Math.random()>0.8?random(75,105):this.angle;  //角度
	this.x += this.speed*Math.cos(this.angle*Math.PI/180);
	this.y += this.speed*Math.sin(this.angle*Math.PI/180);
	if(this.alpha<=0.2){
		this.alphaA = 1;
	}
	else if(this.alpha>=1){
		this.alphaA = -1;
	}
	this.alpha += 0.02*this.alphaA;  //alpha值改变
	
}

Snow.prototype.draw = function(CTX){
	CTX.beginPath();
	CTX.arc(this.x,this.y,this.size,0,2*Math.PI);
	CTX.fillStyle = 'rgba(250,250,250'+','+this.alpha+')';
	CTX.fill();
}

/////////////////创建相关
function createSnows(){
	var l = 200;
	while(l--){
		snows.push(new Snow(random(0,1300),random(-600,600)));
	}
}
function drawSnows(CTX){
	var l = snows.length;
	if(l==0)//当雪花数组中为0，就设置bool变量为未使用技能
	{
		isSnow = false;	
	}
	while(l--){
		if(snows[l].life!=0){
			snows[l].update();
			snows[l].draw(CTX);
		}
		else{
			snows.splice(l,1);	
		}
	}
}

////////////////////////////////////////////////////////////////////////////////////////////技能冷却圆
function CoolCircle(X,Y,Time,Id){
	this.x = X;
	this.y = Y;
	this.r = 20;//半径
	this.id = Id;          //用于标示哪个技能冷却，
	this.coolTime = Time;  //冷却时间,每隔多久angle--
	this.timeTick = this.coolTime;  //时间计数
	this.angle = 360;      //圆的角度
}
CoolCircle.prototype.update = function(index){
	
	if(this.timeTick!=0){
		this.timeTick--;//冷却--
	}
	else{
		this.timeTick = this.coolTime;
		this.angle--;
		//coolCircles.splice(index,1);	
	}
	if(this.angle==0){   //如果角度为0了，就删除冷却圆
		coolCircles.splice(index,1);
	}
}
CoolCircle.prototype.draw = function(CTX){
	CTX.beginPath();
	CTX.arc(this.x,this.y,this.r,0,this.angle*Math.PI/180);
	CTX.shadowBlur = 0;
	CTX.lineWidth = 2;
	CTX.strokeStyle = 'rgba(166,27,231,0.6)';
	CTX.stroke();
	
	CTX.beginPath();
	CTX.arc(this.x,this.y,this.r-4,0,this.angle*Math.PI/180);
	CTX.shadowBlur = 0;
	CTX.lineWidth = 2;
	CTX.strokeStyle = 'rgba(37,240,22,0.6)';
	CTX.stroke();
	
	CTX.beginPath();
	CTX.arc(this.x,this.y,this.r-8,0,this.angle*Math.PI/180);
	CTX.shadowBlur = 0;
	CTX.lineWidth = 2;
	CTX.strokeStyle = 'rgba(22,240,227,0.6)';
	CTX.stroke();
}
/////////////////////创建相关
function createCoolCircles(X,Y,Time,Id){
	coolCircles.push(new CoolCircle(X,Y,Time,Id));
}
function drawCoolCircles(CTX){
	var l = coolCircles.length;
	while(l--){
		coolCircles[l].draw(CTX);
		coolCircles[l].update(l);
	}
}

////////////////////////////////////////////////////////////////////////////碰撞的渐变圆，粒子效果
function Collision(X,Y){  //碰撞效果，一个渐变半透明圆，加粒子效果
	this.x = X;
	this.y = Y;
	this.life = 30;  //半秒钟
	this.r = Math.floor(random(0,255));
	this.g = Math.floor(random(0,255));
	this.b = Math.floor(random(0,255));
	this.a = 1;
}
Collision.prototype.update = function(index){
	if(this.life>0){
		this.life--;
		this.a-=1/30;
	}
	else{
		//collisions.splice(index,1);	
	}
}
Collision.prototype.draw = function(CTX){
	CTX.save();
	CTX.beginPath();
	CTX.arc(this.x,this.y,9,0,2*Math.PI);
	CTX.shadowBlur = 0;
	var gradient = CTX.createRadialGradient(this.x,this.y,1,this.x,this.y,8);        //设置渐变属性
	gradient.addColorStop("0",'rgba('+this.r+','+this.g+','+this.b+','+this.a+')');
	gradient.addColorStop("0.5",'rgba('+Math.floor(random(0,255))+','+Math.floor(random(0,255))+','+Math.floor(random(0,255))+','+this.a+')');
	gradient.addColorStop("1",'rgba('+Math.floor(random(0,255))+','+Math.floor(random(0,255))+','+Math.floor(random(0,255))+','+0.2+')');
	//CTX.fillStyle = 'rgba('+this.r+','+this.g+','+this.b+','+this.a+')';
	CTX.fillStyle = gradient;
	CTX.fill();
	
	CTX.restore();
}
////////创建相关
function createCollisions(X,Y){
	//collisions.push(new Collision(X,Y));
	collisions.push(new Collision(X,Y));
	createCollisionParticle(X,Y,0,0,0,1);
}
function drawCollisions(CTX){
	var l = collisions.length;
	while(l--){
		if(collisions[l].life>0){
			collisions[l].draw(CTX);
			collisions[l].update(l);
		}
		else{
			collisions.splice(l,1);
		}
	}
}
