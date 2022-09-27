
function checkGameOver(){                    //检查所有敌人看是否游戏结束，并且碰到圈圈的效果
	///////、、、、、、、、、、、、、、、、、、////////////////////////////////////////////////////////////////////////////与普通敌人检测
	var l1 = enemys.length;
	while(l1--){
		if(distance(enemys[l1].x,enemys[l1].y,650,300)<50 && circleNum>0){  //若最内圈已买且位置合理，清空最内圈,
			isShake = true;//抖动
			 createParticle(enemys[l1].x,enemys[l1].y,220,20,190,1);  //创建敌人消失粒子
			 enemys[l1].life.len=0;  //敌人消失
			 createParticle(690,300,220,20,190,1);               //创建圈消失粒子
			 createParticle(610,300,220,20,190,1);
			 createParticle(650,340,220,20,190,1);
			 createParticle(650,260,220,20,190,1);
			 cenCircles[0].setIsBuy(false);                    //设置周围圆属性，使其不可见
			 circleNum--; //圈数变量--
			 
		}
		else if(distance(enemys[l1].x,enemys[l1].y,650,300)<80 && circleNum>1){  //清空第二圈
			isShake = true;//抖动
			createParticle(enemys[l1].x,enemys[l1].y,220,20,190,1);  //创建敌人消失粒子
			  enemys[l1].life.len=0;  //敌人消失
			 
			 createParticle(720,300,220,20,190,1);               //创建圈消失粒子
			 createParticle(580,300,220,20,190,1);
			 createParticle(650,370,220,20,190,1);
			 createParticle(650,230,220,20,190,1);
			 cenCircles[1].setIsBuy(false);                    //设置周围圆属性，使其不可见
			 circleNum--; //圈数变量--
			
		}
		else if(distance(enemys[l1].x,enemys[l1].y,650,300)<110 && circleNum>2){  //清空最外圈
			isShake = true;//抖动
			createParticle(enemys[l1].x,enemys[l1].y,220,20,190,1);  //创建敌人消失粒子
			 enemys[l1].life.len=0;  //敌人消失
			 
			 createParticle(750,300,220,20,190,1);               //创建圈消失粒子
			 createParticle(550,300,220,20,190,1);
			 createParticle(650,400,220,20,190,1);
			 createParticle(650,200,220,20,190,1);
			 cenCircles[2].setIsBuy(false);                    //设置周围圆属性，使其不可见
			 circleNum--; //圈数变量--
			
		}
	}
	
	//////////////////、、、、、、、、、、、、、、、、、、、///////////////////////////////////////////////////////////与聚合敌人检测
	var l2 = gatherEnemys.length;
	while(l2--){
		if(distance(gatherEnemys[l2].x,gatherEnemys[l2].y,650,300)<50 && circleNum>0){  //若最内圈已买且位置合理，清空最内圈,
			isShake = true;//抖动
			 createParticle(gatherEnemys[l2].x,gatherEnemys[l2].y,220,20,190,1);  //创建敌人消失粒子
			 gatherEnemys[l2].life.len=0;  //敌人消失
			 createParticle(690,300,220,20,190,1);               //创建圈消失粒子
			 createParticle(610,300,220,20,190,1);
			 createParticle(650,340,220,20,190,1);
			 createParticle(650,260,220,20,190,1);
			 cenCircles[0].setIsBuy(false);                    //设置周围圆属性，使其不可见
			 circleNum--; //圈数变量--
			 
		}
		else if(distance(gatherEnemys[l2].x,gatherEnemys[l2].y,650,300)<80 && circleNum>1){  //清空第二圈
			isShake = true;//抖动
			createParticle(gatherEnemys[l2].x,gatherEnemys[l2].y,220,20,190,1);  //创建敌人消失粒子
			  gatherEnemys[l2].life.len=0;  //敌人消失
			 
			 createParticle(720,300,220,20,190,1);               //创建圈消失粒子
			 createParticle(580,300,220,20,190,1);
			 createParticle(650,370,220,20,190,1);
			 createParticle(650,230,220,20,190,1);
			 cenCircles[1].setIsBuy(false);                    //设置周围圆属性，使其不可见
			 circleNum--; //圈数变量--
			
		}
		else if(distance(gatherEnemys[l2].x,gatherEnemys[l2].y,650,300)<110 && circleNum>2){  //清空最外圈
			isShake = true;//抖动
			createParticle(gatherEnemys[l2].x,gatherEnemys[l2].y,220,20,190,1);  //创建敌人消失粒子
			 gatherEnemys[l2].life.len=0;  //敌人消失
			 
			 createParticle(750,300,220,20,190,1);               //创建圈消失粒子
			 createParticle(550,300,220,20,190,1);
			 createParticle(650,400,220,20,190,1);
			 createParticle(650,200,220,20,190,1);
			 cenCircles[2].setIsBuy(false);                    //设置周围圆属性，使其不可见
			 circleNum--; //圈数变量--
			
		}
	}
	
	////////////////////////////////////
	//////////////////、、、、、、、、、、、、、、、、、///////////////////////////////////////////////////////、、//////与裤子敌人检测
	var l3 = pantsEnemys.length;
	while(l3--){
		if(distance(pantsEnemys[l3].x,pantsEnemys[l3].y,650,300)<50 && circleNum>0){  //若最内圈已买且位置合理，清空最内圈,
			isShake = true;//抖动
			 createParticle(pantsEnemys[l3].x,pantsEnemys[l3].y,220,20,190,1);  //创建敌人消失粒子
			 pantsEnemys[l3].life.len=0;  //敌人消失
			 createParticle(690,300,220,20,190,1);               //创建圈消失粒子
			 createParticle(610,300,220,20,190,1);
			 createParticle(650,340,220,20,190,1);
			 createParticle(650,260,220,20,190,1);
			 cenCircles[0].setIsBuy(false);                    //设置周围圆属性，使其不可见
			 circleNum--; //圈数变量--
			 
		}
		else if(distance(pantsEnemys[l3].x,pantsEnemys[l3].y,650,300)<80 && circleNum>1){  //清空第二圈
			isShake = true;//抖动
			createParticle(pantsEnemys[l3].x,pantsEnemys[l3].y,220,20,190,1);  //创建敌人消失粒子
			  pantsEnemys[l3].life.len=0;  //敌人消失
			 
			 createParticle(720,300,220,20,190,1);               //创建圈消失粒子
			 createParticle(580,300,220,20,190,1);
			 createParticle(650,370,220,20,190,1);
			 createParticle(650,230,220,20,190,1);
			 cenCircles[1].setIsBuy(false);                    //设置周围圆属性，使其不可见
			 circleNum--; //圈数变量--
			
		}
		else if(distance(pantsEnemys[l3].x,pantsEnemys[l3].y,650,300)<110 && circleNum>2){  //清空最外圈
			isShake = true;//抖动
			createParticle(pantsEnemys[l3].x,pantsEnemys[l3].y,220,20,190,1);  //创建敌人消失粒子
			 pantsEnemys[l3].life.len=0;  //敌人消失
			 
			 createParticle(750,300,220,20,190,1);               //创建圈消失粒子
			 createParticle(550,300,220,20,190,1);
			 createParticle(650,400,220,20,190,1);
			 createParticle(650,200,220,20,190,1);
			 cenCircles[2].setIsBuy(false);                    //设置周围圆属性，使其不可见
			 circleNum--; //圈数变量--
			
		}
	}
	
	//////////////////、、、、、、、、、、、、、、、、、、、//////////////////////////////////////////////////////////与炸弹敌人检测
	var l4 = bombEnemys.length;
	while(l4--){
		if(distance(bombEnemys[l4].x,bombEnemys[l4].y,650,300)<50 && circleNum>0){  //若最内圈已买且位置合理，清空最内圈,
			isShake = true;//抖动
			 createParticle(bombEnemys[l4].x,bombEnemys[l4].y,220,20,190,1);  //创建敌人消失粒子
			 bombEnemys[l4].life.len=0;  //敌人消失
			 createParticle(690,300,220,20,190,1);               //创建圈消失粒子
			 createParticle(610,300,220,20,190,1);
			 createParticle(650,340,220,20,190,1);
			 createParticle(650,260,220,20,190,1);
			 cenCircles[0].setIsBuy(false);                    //设置周围圆属性，使其不可见
			 circleNum--; //圈数变量--
			 
		}
		else if(distance(bombEnemys[l4].x,bombEnemys[l4].y,650,300)<80 && circleNum>1){  //清空第二圈
			isShake = true;//抖动
			createParticle(bombEnemys[l4].x,bombEnemys[l4].y,220,20,190,1);  //创建敌人消失粒子
			  bombEnemys[l4].life.len=0;  //敌人消失
			 
			 createParticle(720,300,220,20,190,1);               //创建圈消失粒子
			 createParticle(580,300,220,20,190,1);
			 createParticle(650,370,220,20,190,1);
			 createParticle(650,230,220,20,190,1);
			 cenCircles[1].setIsBuy(false);                    //设置周围圆属性，使其不可见
			 circleNum--; //圈数变量--
			
		}
		else if(distance(bombEnemys[l4].x,bombEnemys[l4].y,650,300)<110 && circleNum>2){  //清空最外圈
			isShake = true;//抖动
			createParticle(bombEnemys[l4].x,bombEnemys[l4].y,220,20,190,1);  //创建敌人消失粒子
			 bombEnemys[l4].life.len=0;  //敌人消失
			 
			 createParticle(750,300,220,20,190,1);               //创建圈消失粒子
			 createParticle(550,300,220,20,190,1);
			 createParticle(650,400,220,20,190,1);
			 createParticle(650,200,220,20,190,1);
			 cenCircles[2].setIsBuy(false);                    //设置周围圆属性，使其不可见
			 circleNum--; //圈数变量--
			
		}
	}
	
	//////////////////、、、、、、、、、、、、、、、、、、、//////////////////////////////////////////////////////////与炮塔敌人检测
	var l5 = gunEnemys.length;
	while(l5--){
		if(distance(gunEnemys[l5].x,gunEnemys[l5].y,650,300)<50 && circleNum>0){  //若最内圈已买且位置合理，清空最内圈,
			isShake = true;//抖动
			 createParticle(gunEnemys[l5].x,gunEnemys[l5].y,220,20,190,1);  //创建敌人消失粒子
			 gunEnemys[l5].life.len=0;  //敌人消失
			 createParticle(690,300,220,20,190,1);               //创建圈消失粒子
			 createParticle(610,300,220,20,190,1);
			 createParticle(650,340,220,20,190,1);
			 createParticle(650,260,220,20,190,1);
			 cenCircles[0].setIsBuy(false);                    //设置周围圆属性，使其不可见
			 circleNum--; //圈数变量--
			 
		}
		else if(distance(gunEnemys[l5].x,gunEnemys[l5].y,650,300)<80 && circleNum>1){  //清空第二圈
			isShake = true;//抖动
			createParticle(gunEnemys[l5].x,gunEnemys[l5].y,220,20,190,1);  //创建敌人消失粒子
			  gunEnemys[l5].life.len=0;  //敌人消失
			 
			 createParticle(720,300,220,20,190,1);               //创建圈消失粒子
			 createParticle(580,300,220,20,190,1);
			 createParticle(650,370,220,20,190,1);
			 createParticle(650,230,220,20,190,1);
			 cenCircles[1].setIsBuy(false);                    //设置周围圆属性，使其不可见
			 circleNum--; //圈数变量--
			
		}
		else if(distance(gunEnemys[l5].x,gunEnemys[l5].y,650,300)<110 && circleNum>2){  //清空最外圈
			isShake = true;//抖动
			createParticle(gunEnemys[l5].x,gunEnemys[l5].y,220,20,190,1);  //创建敌人消失粒子
			 gunEnemys[l5].life.len=0;  //敌人消失
			 
			 createParticle(750,300,220,20,190,1);               //创建圈消失粒子
			 createParticle(550,300,220,20,190,1);
			 createParticle(650,400,220,20,190,1);
			 createParticle(650,200,220,20,190,1);
			 cenCircles[2].setIsBuy(false);                    //设置周围圆属性，使其不可见
			 circleNum--; //圈数变量--
			
		}
	}
	
	//////////////////、、、、、、、、、、、、、、、、、、、//////////////////////////////////////////////////////////与子弹敌人检测
	var l6 = bulletEnemys.length;
	while(l6--){
		if(distance(bulletEnemys[l6].x,bulletEnemys[l6].y,650,300)<50 && circleNum>0){  //若最内圈已买且位置合理，清空最内圈,
			isShake = true;//抖动
			 createParticle(bulletEnemys[l6].x,bulletEnemys[l6].y,220,20,190,1);  //创建敌人消失粒子
			 bulletEnemys[l6].isDead = true;  //敌人消失
			 createParticle(690,300,220,20,190,1);               //创建圈消失粒子
			 createParticle(610,300,220,20,190,1);
			 createParticle(650,340,220,20,190,1);
			 createParticle(650,260,220,20,190,1);
			 cenCircles[0].setIsBuy(false);                    //设置周围圆属性，使其不可见
			 circleNum--; //圈数变量--
			 
		}
		else if(distance(bulletEnemys[l6].x,bulletEnemys[l6].y,650,300)<80 && circleNum>1){  //清空第二圈
			isShake = true;//抖动
			createParticle(bulletEnemys[l6].x,bulletEnemys[l6].y,220,20,190,1);  //创建敌人消失粒子
			  bulletEnemys[l6].isDead = true;  //敌人消失
			 
			 createParticle(720,300,220,20,190,1);               //创建圈消失粒子
			 createParticle(580,300,220,20,190,1);
			 createParticle(650,370,220,20,190,1);
			 createParticle(650,230,220,20,190,1);
			 cenCircles[1].setIsBuy(false);                    //设置周围圆属性，使其不可见
			 circleNum--; //圈数变量--
			
		}
		else if(distance(bulletEnemys[l6].x,bulletEnemys[l6].y,650,300)<110 && circleNum>2){  //清空最外圈
			isShake = true;//抖动
			createParticle(bulletEnemys[l6].x,bulletEnemys[l6].y,220,20,190,1);  //创建敌人消失粒子
			 bulletEnemys[l6].isDead = true;  //敌人消失
			 
			 createParticle(750,300,220,20,190,1);               //创建圈消失粒子
			 createParticle(550,300,220,20,190,1);
			 createParticle(650,400,220,20,190,1);
			 createParticle(650,200,220,20,190,1);
			 cenCircles[2].setIsBuy(false);                    //设置周围圆属性，使其不可见
			 circleNum--; //圈数变量--
			
		}
	}
	
	
	
}
