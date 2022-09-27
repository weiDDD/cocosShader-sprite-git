//鼠标键盘控制

$('#Canvas').mousemove(function(e){
	var x = e.pageX - canvas.offsetLeft;
	var y = e.pageY - canvas.offsetTop;
	
	if(whatScene == 0){//当是菜单界面时
		if(x<460+250 && x>330+250 && y>300 && y<350){               //移上操作
			//sounds.playSoundByIdOnly(1);
			//createSounds(4);
			menuImageN = 1;                        //nb在index.js中定义的全局变量
			isStarMove = true;
			isStarStop = false;
		}
		else if(x<460+250 && x>330+250 && y>365 && y<420){
			//sounds.playSoundByIdOnly(1);
			//createSounds(4);
			isStarMove = true;
			isStarStop = false;
			menuImageN = 2;
		}
		else if(x<460+250 && x>330+250 && y>435 && y<490){
			//sounds.playSoundByIdOnly(1);
			//createSounds(4);
			isStarMove = true;
			isStarStop = false;
			menuImageN = 3;	
		}
		else{
			
			isStarStop = true;
			menuImageN = 0;	
		}
	}
	else if(whatScene == 1){  //开始界面的鼠标控制
		if(whatBoxClick == 4 || whatBoxClick==0){   //直线矿选中
			var px;           //找到炮塔到指针的角度
			var py;
			var angle;
			
			if(x-650>0){   
				px = x-650;
				py = y-600;
				angle = Math.atan(py/px);	
				gunAngle = angle+Math.PI/2;
			}
			else{
				px = 650-x;
				py = 600-y;
				angle = Math.atan(py/px);
				gunAngle = angle-Math.PI/2;
			}
			
		}
		if(whatBoxClick==0 && triangleCreate==false){
			if(y>540){    //若第二个点更新到y》540就创建了
				triangleCreate = true;	
				whatBoxClick = 4;  //设置直线选中
				for(var i=0;i<8;i++){
					if(i==4) boxs[i].setIsClick(true);
					else boxs[i].setIsClick(false);
				}
			}
			var l = triangles.length;
			triangles[l-1].update(x,y);
		}
		if(whatBoxClick == 0 && triangleCreate==true && y<540){//在三角对象的激光没有画完前只创建一个三角对象
			
			if(getCoolCircleAngle(0) == 0 && mp>=5){//若冷却圆角度为0，就可以创建，当未创建对应冷却圆是返回0
				mp-=5;
				createTriangles(x,y);	
				triangleCreate = false;
				createCoolCircles(330,570,1,0);   //创建第一个购买框的冷却圆
			}
			else{
				whatBoxClick = 4;  //设置直线选中
				for(var i=0;i<8;i++){
					if(i==4) boxs[i].setIsClick(true);
					else boxs[i].setIsClick(false);
				}
			}
		}
		
		
		if(whatBoxClick == 1){  // 创建矩形
			
			if(getCoolCircleAngle(1) == 0 && mp>=5){
				mp-=5;
				createRects(x,y,30);   //边长30
				createCoolCircles(390,570,1,1);   //创建第2个购买框的冷却圆
				
				whatBoxClick = 4;  //设置直线选中
				for(var i=0;i<8;i++){
					if(i==4) boxs[i].setIsClick(true);
					else boxs[i].setIsClick(false);
				}
			}
			else{
				whatBoxClick = 4;  //设置直线选中
				for(var i=0;i<8;i++){
					if(i==4) boxs[i].setIsClick(true);
					else boxs[i].setIsClick(false);
				}
			}
		}
		else if(whatBoxClick == 2){  // 创建圆形
			if(getCoolCircleAngle(2) == 0 && mp>=5){
				mp-=5;
				createCirclesOut(x,y);
				createCoolCircles(450,570,1,2);   //创建第3个购买框的冷却圆
				
				whatBoxClick = 4;  //设置直线选中
				for(var i=0;i<8;i++){
					if(i==4) boxs[i].setIsClick(true);
					else boxs[i].setIsClick(false);
				}
			}
			else{
				whatBoxClick = 4;  //设置直线选中
				for(var i=0;i<8;i++){
					if(i==4) boxs[i].setIsClick(true);
					else boxs[i].setIsClick(false);
				}
			}
		}  
		else if(whatBoxClick == 3){       //创建五角
			if(getCoolCircleAngle(3) == 0 && mp>=5){
				mp-=5;
				createPentagons(x,y,40)
				createCoolCircles(510,570,1,3);   //创建第3个购买框的冷却圆
				
				whatBoxClick = 4;  //设置直线选中
				for(var i=0;i<8;i++){
					if(i==4) boxs[i].setIsClick(true);
					else boxs[i].setIsClick(false);
				}
			}
			else{
				whatBoxClick = 4;  //设置直线选中
				for(var i=0;i<8;i++){
					if(i==4) boxs[i].setIsClick(true);
					else boxs[i].setIsClick(false);
				}
			}
		}
		
		
	}
	else if(whatScene == 2){  //帮助界面的鼠标控制
		if(x > 670+250 && x< 760+250 && y>100 && y<180){
			helpImageN = 1;	 //改变图片
		}
		else{
			helpImageN = 0;	
		}
	}
	else if(whatScene == 3){  //结束界面的鼠标控制
		if(x > 550&& x< 800 && y>200 && y<280){
			overImageN = 1;	 //改变图片
		}
		else if(x > 550&& x< 800 && y>350 && y<420){
			overImageN = 2;	 //改变图片
		}
		else{
			overImageN = 0;	
		}
	}
	
	
});

$('#Canvas').click(function (e){      //
	e.preventDefault();
	var x = e.pageX - canvas.offsetLeft;
	var y = e.pageY - canvas.offsetTop;
	
	if(whatScene == 0){
		if(x<460+250 && x>330+250 && y>300 && y<350){               //移上并点击操作
			createSounds(5);
			menuImageN = 0;                        //nb在index.js中定义的全局变量
			initBeginScene();  //初始化开始场景
			//whatScene = 1;
			isRotate = true;
			
			//isStarStop = true;
		}
		else if(x<460+250 && x>330+250 && y>365 && y<420){
			createSounds(5);
			isStarStop = true;
			//initHelpScene();
			whatScene = 2;  //改变场景
			menuImageN = 2;
		}
		else if(x<460+250 && x>330+250 && y>435 && y<490){
			createSounds(5);
			window.close();
		}
	}
	
	
	else if(whatScene == 2){//当是帮助界面时的鼠标点击控制
		
		if(x > 670+250 && x< 760+250 && y>100 && y<150){
			whatScene = 0;	 //改变图片
		}
	}
	else if(whatScene == 3){  //结束界面的鼠标控制
		if(x > 550&& x< 800 && y>200 && y<280){
			//window.location.reload();  //刷新页面
			whatScene = 1;
			releaseAll();	 //改变图片
			initBeginScene();
			window.location.reload();  //刷新页面
		}
		else if(x > 550&& x< 800 && y>350 && y<420){
			whatScene = 0;	 //改变图片
			scaleTime = 0.5;
			releaseAll();
			window.location.reload();  //刷新页面
		}
		else{
			overImageN = 0;	
		}
	}
	
}					   					   
);

/*
$('#Canvas').dblclick(function (e){//购买炮塔圈双击效果
//$('#Canvas').click(function (e){//购买炮塔圈双击效果
	e.preventDefault();
	var x = e.pageX - canvas.offsetLeft;
	var y = e.pageY - canvas.offsetTop;							

	if(whatScene == 1){   //如果是游戏场景
		if(x>570+250 && x<630+250 && y>540 && y<600){   //双击购买圈数
			if(circleNum<4 && mp>=2){
				mp-=2;
				circleNum++;	
			}
			for(var i=0;i<circleNum;i++){
				cenCircles[i].setIsBuy(true);	
			}
			for(var i=0;i<8;i++){   //设置其他框没点效果
				if(i==4) boxs[i].setIsClick(true);
				else boxs[i].setIsClick(false);
				//boxs[i].setIsClick(false);
			}
			whatBoxClick = 4;
		}
		
		else if(x>630+250 && x<690+250 && y>540 && y<600){   //点击右二购买框
			if(mp>=20 && isStarTimeout == false){
				mp-=20;
				isStarMove = true;
				isStarStop = false;
				isStarTimeout = true;  //星星一段时间运动
			}
			for(var i=1;i<8;i++){   //设置其他框没点效果
				if(i==4) boxs[i].setIsClick(true);
				else boxs[i].setIsClick(false);
				//boxs[i].setIsClick(false);
			}
			whatBoxClick = 4;
		}
		else if(x>690+250 && x<750+250 && y>540 && y<600){
			if(mp>=20 && isSnow == false){
				mp-=20;
				createSnows();
				isSnow = true;
			}
			for(var i=1;i<8;i++){   //设置其他框没点效果
				if(i==4) boxs[i].setIsClick(true);
				else boxs[i].setIsClick(false);
				//boxs[i].setIsClick(false);
			}
			whatBoxClick = 4;
		}
		
	}

}					 
);*/

$('#Canvas').mousedown(function (e){
	e.preventDefault();
	var x = e.pageX - canvas.offsetLeft;
	var y = e.pageY - canvas.offsetTop;		
	if(whatScene == 1){ 
	/*
		if(whatBoxClick == 1){  // 创建矩形
			alert('12');
			if(getCoolCircleAngle(1) == 0 && mp>=5){
				mp-=5;
				createRects(x,y,30);   //边长30
				createCoolCircles(390,570,1,1);   //创建第2个购买框的冷却圆
				
				whatBoxClick = 4;  //设置直线选中
				for(var i=0;i<8;i++){
					if(i==4) boxs[i].setIsClick(true);
					else boxs[i].setIsClick(false);
				}
			}
		}
		else if(whatBoxClick == 2){  // 创建圆形
			if(getCoolCircleAngle(2) == 0 && mp>=5){
				mp-=5;
				createCirclesOut(x,y);
				createCoolCircles(450,570,1,2);   //创建第3个购买框的冷却圆
				
				whatBoxClick = 4;  //设置直线选中
				for(var i=0;i<8;i++){
					if(i==4) boxs[i].setIsClick(true);
					else boxs[i].setIsClick(false);
				}
			}
		}  
		else if(whatBoxClick == 3){       //创建五角
			if(getCoolCircleAngle(3) == 0 && mp>=5){
				mp-=5;
				createPentagons(x,y,40)
				createCoolCircles(510,570,1,3);   //创建第3个购买框的冷却圆
				
				whatBoxClick = 4;  //设置直线选中
				for(var i=0;i<8;i++){
					if(i==4) boxs[i].setIsClick(true);
					else boxs[i].setIsClick(false);
				}
			}
		}
	*/
	
		if(whatBoxClick == 4){   //直线
			
			//if(x>5&&x<1295&&y>5&&y<595){  //控制鼠标超出屏幕
			
				mouseDown = true;
				gun.isShoot = true;  //用于改变炮塔颜色
			//}
			//else{
			//	mouseDown = false;
			//	gun.isShoot = false;
			//}
		}/*
		else if(whatBoxClick == 0 && triangleCreate==true && y<540 && mp>=5){//在三角对象的激光没有画完前只创建一个三角对象
			mp-=5;
			if(getCoolCircleAngle(0) == 0){//若冷却圆角度为0，就可以创建，当未创建对应冷却圆是返回0
				createTriangles(x,y);	
				triangleCreate = false;
				createCoolCircles(330,570,1,0);   //创建第一个购买框的冷却圆
			}
		}*/
		
		
	}

});
$('#Canvas').mouseup(function (e){
	e.preventDefault();
	
	if(whatScene == 1){ 
		if(whatBoxClick == 4){    //直线
			mouseDown = false;
			gun.isShoot = false;
		}
		else if(whatBoxClick == 0){  //三角
			triangleCreate = true;
			
			whatBoxClick = 4;  //设置直线选中
			for(var i=0;i<8;i++){
				if(i==4) boxs[i].setIsClick(true);
				else boxs[i].setIsClick(false);
			}
		}
	}
});
$('#Canvas').mouseout(function (e){   //鼠标移出画布
	e.preventDefault();	
	
	if(whatScene == 1){ 
		//if(whatBoxClick == 4){   //直线
			//mouseDown = false;
			//gun.isShoot = false;
		//}
		//else if(whatBoxClick == 0 && triangleCreate==true && y<540){  //在三角对象的激光没有画完前只创建一个三角对象
		//	createTriangles(x,y);	
		//	triangleCreate = false;
		//}
	
	}
});

$('body').keypress(function (e){      //键盘事件
	//mouseDown = false;
	//gun.isShoot = false;  //按了键就设置子弹停止
	
	
	var key = e.keyCode;
	//alert(key);
	if(whatScene == 1){
	switch(key){
		case 32:
			whatBoxClick = 4; //设置哪个购买框点击
			for(var i=0;i<8;i++){
				if(i==4) boxs[i].setIsClick(true);
				else boxs[i].setIsClick(false);
			}
			break;
		case 65:
		case 97:  //a
			whatBoxClick = 0; //设置哪个购买框点击
			for(var i=0;i<8;i++){
				if(i==0) boxs[i].setIsClick(true);
				else boxs[i].setIsClick(false);
			}
			break;
		case 83:
		case 115:  //s
			whatBoxClick = 1; //设置哪个购买框点击
			for(var i=0;i<8;i++){
				if(i==1) boxs[i].setIsClick(true);
				else boxs[i].setIsClick(false);
			}
			
			break;
		case 68:
		case 100:   //d
			whatBoxClick = 2; //设置哪个购买框点击
			for(var i=0;i<8;i++){
				if(i==2) boxs[i].setIsClick(true);
				else boxs[i].setIsClick(false);
			}
			
			
			break;
		case 70:
		case 102:  //f
			whatBoxClick = 3; //设置哪个购买框点击
			for(var i=0;i<8;i++){
				if(i==3) boxs[i].setIsClick(true);
				else boxs[i].setIsClick(false);
			}
			
			break;
			/////////////////////右边技能
		case 119:
		case 87:  //w
			if(circleNum<4 && mp>=5){
				mp-=5;
				circleNum++;	
			}
			for(var i=0;i<circleNum;i++){
				cenCircles[i].setIsBuy(true);	
			}
			for(var i=0;i<8;i++){   //设置其他框没点效果
				if(i==4) boxs[i].setIsClick(true);
				else boxs[i].setIsClick(false);
				//boxs[i].setIsClick(false);
			}
			whatBoxClick = 4;
			break;
		case 69:
		case 101:  //e
			if(starSkillNum>0 && isStarTimeout == false){
				starSkillNum--;
				isStarMove = true;
				isStarStop = false;
				isStarTimeout = true;  //星星一段时间运动
			}
			for(var i=1;i<8;i++){   //设置其他框没点效果
				if(i==4) boxs[i].setIsClick(true);
				else boxs[i].setIsClick(false);
				//boxs[i].setIsClick(false);
			}
			whatBoxClick = 4;
			break;
		case 82:
		case 114:  //r
			if(snowSkillNum>0 && isSnow == false){
				snowSkillNum--;
				createSnows();
				isSnow = true;
			}
			for(var i=1;i<8;i++){   //设置其他框没点效果
				if(i==4) boxs[i].setIsClick(true);
				else boxs[i].setIsClick(false);
				//boxs[i].setIsClick(false);
			}
			whatBoxClick = 4;
			break;
	}
	
	}
});



