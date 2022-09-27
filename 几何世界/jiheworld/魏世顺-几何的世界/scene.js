//管理场景

/////////////////////////////////////////////////////////菜单界面
var t;
function initMenuScene(){        //初始化菜单场景，初始化图片，星星
	initBackImage();
	initMenuImage();
	initStars();
	//createBullets(650,600,-90,10,1);
	//triangles.push( new Triangle(140+250,570) );
	//t = new GatherEnemy(800,130);
	//t = new PantsEnemy(800,130,0,true);
	//createCollisions(300,300);
}
function drawMenuScene(CTX,n){     //绘制菜单场景
	playSounds();
	
	drawBackImage(CTX);
	drawMenuImage(CTX,n);
	drawStars(CTX);
	drawParticle(CTX);  //绘制粒子数组
	drawPointParticleTrail(CTX);
	drawLightPoints(CTX);//绘制粒子亮点
	
	drawGatherEnemys(CTX);
	drawPantsEnemys(CTX);
	
	//createCollisions(300,300);  //设置碰撞效果
	//drawCollisions(CTX);
	//
 	//t.draw(CTX);
	//t.update();
	//drawBullets(CTX);
	//drawTriangles(CTX);  //画三角
	//
}

/////////////////////////////////////////////////////////帮助界面
function initHelpScene(){
	initHelpImage();
}
function drawHelpScene(CTX,n){
	playSounds();
	
	drawBackImage(CTX);
	drawHelpImage(CTX,n);
	drawStars(CTX);
	drawParticle(CTX);  //绘制粒子数组
	drawPointParticleTrail(CTX);   //拖尾粒子数组
	drawLightPoints(CTX);//绘制粒子亮点
}

/////////////////////////////////////////////////////////开始界面
////////////////开始场景的固定物的绘制

function initBeginScene(){
	
	initOverImage();//初始化退出图片
	createBoxCircles();   //创建框中圆
	//alert('123');
	createBoxs();  //?
	
	                         //购买框中的各种形状
	lines.push(new Line(320+250,570));          //购买框的直线
	triangles.push(new Triangle(80+250,570,0));
	rects.push(new Rect(140+250,570,20));   //第一个矩形边长20
	circles.push(new CircleOut(200+250,570));         //购买框中的圆，和牌台圆用的一样的数组
	createCircles();  //初始中心周围圆
	pentagons.push(new Pentagon(260+250,570,20));
	
	starSkill = new StarSkill(910,570);
	snowSkill = new SnowSkill(970,570);
}
function drawBeginScene(CTX){
	//CTX.save();
	//CTX.translate(650,300);
	//CTX.scale(1,1);
	
	playSounds();
	//score++;
	drawBackImage(CTX);
	
	drawStars(CTX);
	centerStar.draw(CTX);  //画中心星
	
	gun.setAngle(gunAngle);  //设置旋转角度?
	gun.draw(CTX);           //画炮塔?
	
	drawCircles(CTX);    //画圆
	
	drawLines(CTX);      //画直线型
	//
	drawTriangles(CTX);  //画三角
	drawRects(CTX);      //画矩形
	drawCirclesOut(CTX); //画圆
	drawPentagons(CTX);  //绘制五角形
	
	checkGameOver();    //检查敌人与圈关系
	//checkCircle();      //检查敌人与圆形子弹
	drawParticle(CTX);  //绘制粒子数组
	drawPointParticleTrail(CTX);
	drawLightPoints(CTX);//绘制粒子亮点
	drawWords(CTX);     //绘制文字们

	starSkill.draw(CTX);
	snowSkill.draw(CTX);
	
	drawCoolCircles(CTX);  //绘制冷却圆
	
	createFire(fireType);//创建子弹
	drawFire(CTX);       //绘制子弹
	drawCards(CTX);      //绘制卡片
	
	if(isSnow == true){
		drawSnows(CTX);	
	}
	
	stage.run();      //设置舞台场景
	/////////////绘制敌人
	drawEnemys(CTX);
	drawGatherEnemys(CTX);   
	drawPantsEnemys(CTX);
	drawBombEnemys(CTX);
	drawGunEnemys(CTX);
	drawBulletEnemys(CTX);
	
	//createCollisions(200,200);
	drawCollisions(CTX);  //绘制碰撞效果
	////////////////////////////////////////////////
	drawWord(CTX,"score:",20,20);
	drawWord(CTX,String(score),85,20);
	drawWord(CTX,"mp:",1150,20);
	drawWord(CTX,String(mp),1200,20);
	drawWord2(CTX,"next stage:",550,20);
	if(5000-stage.timeN>0){
		drawWord2(CTX,String(5000-stage.timeN),650,20);
	}
	else{
		drawWord2(CTX,String(0),650,20);
	}
	drawWord2(CTX,"mp:5",330,550);
	drawWord2(CTX,"A",305,593);
	drawWord2(CTX,"mp:5",390,550);
	drawWord2(CTX,"S",365,593);
	drawWord2(CTX,"mp:5",450,550);
	drawWord2(CTX,"D",425,593);
	drawWord2(CTX,"mp:5",510,550);
	drawWord2(CTX,"F",485,593);
	drawWord2(CTX,"mp:0",570,550);
	drawWord2(CTX,"SPACE",545,593);
	
	drawWord2(CTX,"mp:5",850,550);
	drawWord2(CTX,"W",825,593);
	drawWord2(CTX,String(starSkillNum),895,550);
	drawWord2(CTX,"E",885,593);
	drawWord2(CTX,String(snowSkillNum),955,550);
	drawWord2(CTX,"R",945,593);
	
	
	
	drawBoxCircles(CTX);
	drawBoxs(CTX);
	//CTX.restore();
}

/////////////////////绘制结束界面
function drawOverScene(CTX,n){
	drawBackImage(CTX);
	drawWord(CTX,"制作者：魏世顺",1050,550);
	drawWord(CTX,'您的最终分数为:',530,520);
	drawWord(CTX,String(score),690,520);
	drawWord(CTX,'您最终到达stage: '+String(stage.stage),530,550);
	if(score<3000){
		drawWord(CTX,"敢不敢再弱点！",530,580);
	}
	else if(score>=3000 && score<6000){
		drawWord(CTX,"有点进步哦！",530,580);
	}
	else if(score>=6000 && score<9000){
		drawWord(CTX,"哎呦！不错！",530,580);
	}
	else if(score>=9000){
		drawWord(CTX,"你已经超神了！",530,580);
	}
	drawOverImage(CTX,n);
	drawStars(CTX);
}