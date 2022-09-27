// 一些常用，共用的函数

function random(min,max){
	return Math.random() * (max-min) + min;   //产生min到max的随机数,0~1*区间差值，再加上起点值	
}

function distance(x1,y1,x2,y2){
	var XD = x2-x1;
	var YD = y2-y1;
	
	return Math.sqrt(Math.pow(XD,2)+Math.pow(YD,2));
}

function distanceToLine(x1,y1,x2,y2,x3,y3){  //点到线的距离 ,x1,y1,x2,y2是直线上两点，x3,y3是点
	var l1 = distance(x1,y1,x3,y3);
	var l2 = distance(x2,y2,x3,y3);
	var l3 = distance(x1,y1,x2,y2);
	var l = 0.5*(l1+l2+l3);//周长一半
	var s = Math.sqrt(l*(l-l1)*(l-l2)*(l-l3));
	var d = 2000;
	if(l3>l1 && l3>l2){
		d = 2*s/l3;   //点到线距离
	}
	return d;
}

function getCoolCircleAngle(id){
	var l=coolCircles.length;
	var angle = 0;
	while(l--){
		if(coolCircles[l].id==id){ //找到对应购买框的id
			angle = coolCircles[l].angle;
			return angle;
		}
	}
	return angle;
}

function releaseAll(){  //还原所有
 menuImageN = 0;
 helpImageN = 0;
 overImageN = 0;
// score = 0; //分数变量
 mp = 0;    //mp变量
 isStarMove = false;      //星星是否移动的，开始时是静止的
 isStarStop = false;      //星星运动后，是否停止
whatBoxClick = -1;   //哪个购买框被选中，默认没有一个选中
 isStarMove = false;      //星星是否移动的，开始时是静止的
 isStarStop = false;      //星星运动后，是否停止
 whatBoxClick = -1;   //哪个购买框被选中，默认没有一个选中
 circleNum = 0;  //买了几个购买圈
 circleNum1 = 0; //第一圈圆，只能有3个炮塔
 circleNum2 = 0; //5个
 circleNum3 = 0; //7个
 var l1 = particles.length;
 particles.splice(0,l1);
 var l2 = cenCircles.length;
 cenCircles.splice(0,l2);
 var l3 = lines.length;
 lines.splice(0,l3);
 var l4 = triangles.length;
 triangles.splice(0,l4);
 var l5 = rects.length;
 rects.splice(0,l5);
 var l6 = circles.length;
 circles.splice(0,l6);
 var l7 = enemys.length;
 enemys.splice(0,l7);
 var l8 = pentagons.length;
 pentagons.splice(0,l8);

}

var bombEnemys = [];  //炸弹敌人们
var pantsEnemys = [];  //裤子敌人们
var gatherEnemys = [];  //结合体敌人们
var bulletEnemys = [];   //子弹敌人
var gunEnemys = [];     //炮塔敌人

function killAllEnemys(){
	var l1 = enemys.length;
	while(l1--){
		enemys[l1].life.len = 0;
	}
	
	var l2 = pantsEnemys.length;
	while(l2--){
		pantsEnemys[l2].life.len = 0;
	}
	
	var l3 = gatherEnemys.length;
	while(l3--){
		gatherEnemys[l3].life.len = 0;
		for(var i=0;i<4;i++){
			gatherEnemys[l3].children[i].life.len = 0;  //孩子的血量
		}
	}
	
	var l4 = bulletEnemys.length;
	while(l4--){
		bulletEnemys[l4].isDead = true;
	}
	
	var l5 = gunEnemys.length;
	while(l5--){
		gunEnemys[l5].life.len = 0;
	}
	
	var l6 = bombEnemys.length;
	while(l6--){
		bombEnemys[l6].life.len = 0;
	}
}

function getEnemysNum(){
	var num = 0;
	var l1 = enemys.length;
	var l2 = gatherEnemys.length;
	var l3 = pantsEnemys.length;
	var l4 = bombEnemys.length;
	var l5 = bulletEnemys.length;
	var l6 = gunEnemys.length;
	num = l1+l2+l3+l4+l5+l6;
	return num;
	
}