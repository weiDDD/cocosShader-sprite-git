// JavaScript Document
//////////关卡设定，舞台设定

function Stage(){
	this.stage = 1;  //第几个舞台
	this.stageTime = 0;
	this.createStage = true;  //是否创建场景
	this.enemyTime = 60;  //创建普通敌人时间,1秒一个
	this.timeN = 0;       //时间变量
	
}
Stage.prototype.run = function(){  //循环
	if(this.createStage == true){
		this.drawStage(this.stage);	
	}
	else{  //开头语完后
		this.timeN++;  //时间++
		if(this.stage==1){  ////////////////////////////////////////////////////////////////场景1(普通敌人)的创建
			if(this.timeN<5000){ //第一场景时间达到
				////////////////////////////////////////////////创建敌人相关
				if(this.timeN%1800==0){  //每半分钟就创建
					for(var i=0;i<10;i++){
						createEnemys(50,80+i*50);	
						createEnemys(1250,80+i*50);
					}
				}
	
				if(this.enemyTime!=0){//时间到创建敌人
					this.enemyTime--;	
				}
				else{
					this.enemyTime = 45;  //时间还原
					var createTrue = true;
					var x;
					var y;
					while(createTrue){
						x = Math.random()*1300;
						y = Math.random()*600
						if(x>300 && x<1000 && y>100 && y<500){  //限制敌人创建的位置
							createTrue = true;
						}
						else{
							createTrue = false;	
						}
					}
		
					createEnemys(x,y);//位置随机?
				}
				///////////////////以上是创建敌人相关
			}
			else{//时间超出
				if(getEnemysNum() == 0){
					this.createStage = true;//再次创建创建开头语
					this.stage++;
					this.timeN = 0;
					killAllEnemys();
				}
			}
			
		}
		//////////////////////////////////////////////////////////////场景2(结合敌人)的创建
		else if(this.stage==2){   
			if(this.timeN<5000){   //第2场景未时间达到
				/////////////聚合敌人创建操作
				if(this.timeN%1800==0){ //半分钟创建4个
					createGatherEnemys(100,100);
					createGatherEnemys(1200,100);
					createGatherEnemys(100,500);
					createGatherEnemys(1200,500);
				}
				
				if(this.enemyTime!=0){//时间到创建敌人
					this.enemyTime--;	
				}
				else{
					this.enemyTime = 120;  //时间还原,2秒一个
					var createTrue = true;
					var x;
					var y;
					while(createTrue){
						x = Math.random()*1300;
						y = Math.random()*600
						if(x>200 && x<1100 && y>100 && y<500){  //限制敌人创建的位置
							createTrue = true;
						}
						else{
							createTrue = false;	
						}
					}
		
					createGatherEnemys(x,y);//位置随机?
				}
				
			}
			else{//时间超出
				if(getEnemysNum() == 0){
					this.createStage = true;//再次创建创建开头语
					this.stage++;
					this.timeN = 0;
					killAllEnemys();
				}
			}
		}
		///////////////////////////////////////////////////////////////////////////////场景3(炸弹敌人)的创建
		else if(this.stage==3){   
			if(this.timeN<5000){ //第3场景时间达到
				/////////////炸弹敌人创建操作
				if(this.timeN%1800 == 0){  //若时间达到1000次,创建20个
					var num = 20;
					var px = 50;
					var py = 50;
					
					var ll=4;
					while(ll--){
						if(ll==3){
							px = 100;
							py = 100;
						}
						else if(ll==2){
							px = 1200;
							py = 100;
						}
						else if(ll==1){
							px = 100;
							py = 500;
						}
						else{
							px = 1200;
							py = 500;
						}
						for(var i=0;i<5;i++){
							if(i==0){
								createBombEnemys(px,py);
							}
							else if(i==1){
								createBombEnemys(px-30,py-30);
							}
							else if(i==3){
								createBombEnemys(px+30,py-30);
							}
							else if(i==4){
								createBombEnemys(px-30,py+30);
							}
							else{
								createBombEnemys(px+30,py+30);
							}
						}
						
					}
					
					
				}
				
				if(this.enemyTime!=0){//时间到创建敌人
					this.enemyTime--;	
				}
				else{
					this.enemyTime = 60;  //时间还原,1秒2个半
					var createTrue = true;
					var x;
					var y;
					while(createTrue){
						x = Math.random()*1300;
						y = Math.random()*600
						if(x>300 && x<1000 && y>100 && y<500){  //限制敌人创建的位置
							createTrue = true;
						}
						else{
							createTrue = false;	
						}
					}
		
					createBombEnemys(x,y);//位置随机?
				}
				
				
			}
			else{  //时间超出
				if(getEnemysNum() == 0){
					this.createStage = true;//再次创建创建开头语
					this.stage++;
					this.timeN = 0;
					killAllEnemys();
				}
			}
		}
		//////////////////////////////////////////////////////////////////////////////////场景4(炮塔敌人)的创建
		else if(this.stage==4){  
			if(this.timeN<5000){ //第4场景时间达到
				/////////////炮塔敌人创建操作
				if(this.timeN%1800==0){   //半分钟
					createGunEnemys(100,100);
					createGunEnemys(650,100);
					createGunEnemys(1200,100);
					createGunEnemys(100,500);
					createGunEnemys(650,500);
					createGunEnemys(1200,500);
					createGunEnemys(100,300);
					createGunEnemys(1200,300);
				}
				
				
				if(this.enemyTime!=0){//时间到创建敌人
					this.enemyTime--;	
				}
				else{
					this.enemyTime = 45;  //时间还原
					var createTrue = true;
					var x;
					var y;
					while(createTrue){
						x = Math.random()*1300;
						y = Math.random()*600
						if(x>300 && x<1000 && y>100 && y<500){  //限制敌人创建的位置
							createTrue = true;
						}
						else{
							createTrue = false;	
						}
					}
		
					createGunEnemys(x,y);//位置随机?
				}
				
				
			}
			else{  //时间超出
				if(getEnemysNum() == 0){
					this.createStage = true;//再次创建创建开头语
					this.stage++;
					this.timeN = 0;
					killAllEnemys();
				}
			}
		}
		else if(this.stage==5){    //boss敌人
			if(this.timeN<1000){ //第3场景时间达到
				drawWord(ctx,"you are good!",650,300);
				
				
			}
			else{  //时间超出
				if(getEnemysNum() == 0){
					this.createStage = true;//再次创建创建开头语
					this.stage++;
					this.timeN = 0;
					killAllEnemys();
				}
			}
		}
		
		
	}
}
Stage.prototype.drawStage = function(stageN){
	this.stageTime++;
	//if(timeN<480){ //开头4秒
		if(this.stageTime==1){
			createSounds(0.3);
			createWords(645,300,'   3  ',2);
		}
		else if(this.stageTime==90){
			createSounds(0.2);
			createWords(645,300,'   2  ',2);
		}
		else if(this.stageTime==180){
			createSounds(0.1);
			createWords(645,300,'   1  ',2);
		}
		else if(this.stageTime==270){
			createSounds(0.4);
			createWords(610,300,'stage '+String(stageN),2);
			
		}
		else if(this.stageTime==360){
			this.stageTime = 0;
			this.createStage = false;
		}
	//}
}
