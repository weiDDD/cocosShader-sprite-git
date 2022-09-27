//游戏主体

var canvas;                              //游戏全局变量
var ctx;     
var gameOver = false;                    //游戏未结束
var menuImageN = 0;
var helpImageN = 0;
var overImageN = 0;
var scaleTime = 1;  //特效(缩放效果)
var isScale = false; 
var scaleTime2 = 1;  //用于存储
var rotateTime = 1;  //旋转
var isRotate = false;
var score = 0; //分数变量
var mp = 10;    //mp变量
var isStarMove = false;      //星星是否移动的，开始时是静止的
var isStarStop = false;      //星星运动后，是否停止
var isStarTimeout = false;   
var starTimeout = 400;       //点击星星动技能，运动秒数
var starSkill;         //星星乱射技能图标
var starSkillNum = 1;  //星星技能数量
var whatBoxClick = 4;   //哪个购买框被选中，默认没有直线选中
var circleNum = 0;  //买了几个购买圈
var circleNum1 = 0; //第一圈圆，只能有3个炮塔
var circleNum2 = 0; //5个
var circleNum3 = 0; //7个
var particles = [];          //粒子数组
var particleTrails = [];     //拖尾粒子数组

var boxs = [];          //购买框数组
var boxCircles = [];    //购买框中的圆
var cenCircles = [];    //中心周围圆形
var lines = [];         //直线们
var triangles = [];     //三角们
var rects = [];         //矩形们
var circles = [];       //圆形们
var pentagons = [];     //五角星们

var sounds = [];        //声音
var snows = [];         //雪花数组
var isSnow = false;    //是否使用下雪技能
var snowSkillNum = 1;    //雪花技能的数量
var words = [];         //文字们
var snowSkill;          //雪花技能
var lightPoints = [];    //亮点们，粒子效果相关
var centerStar = new CenterStar(650,300);  //中心星
var gun = new Gun(650,600);  //单射跑
var gunAngle = 0;             //单射跑旋转角度
var bullets = [];             //单子弹数组
var fireType = 0;            //火力类型
var fireCool = 0;             //火力变更持续时间
var laserBullets = [];       //激光子弹数组

var bulletTime = 3;          //子弹发射延迟
var timeTick = 0;            //子弹发射计数
var missiles = [];             //导弹们

var coolCircles = [];          //冷却圆
var collisions = [];           //碰撞圆
var triangleCreate = true;   //创建三角限定

var mouseDown = false;

var cards = [];       //卡片们
var enemys = [];        //敌人们
var bombEnemys = [];  //炸弹敌人们
var pantsEnemys = [];  //裤子敌人们
var gatherEnemys = [];  //结合体敌人们
var bulletEnemys = [];   //子弹敌人
var gunEnemys = [];     //炮塔敌人
var bossEnemys = [];    //boss敌人

var stage = new Stage();

var isShake = true;    //是否抖动
var shakeX = 0,shakeY = 0;       //抖动x，y偏移
var shakeTime = 30;      //抖动多久结束

var whatScene = 0;           //0为菜单界面，1为开始游戏界面，2为帮助界面

window.requestAnimFrame = (function (){
	return window.requestAnimationFrame || 
	        window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			function (callback){
				window.setTimeout(callback,1000/60);    //停止时间超过1000/60后调用callback函数
			};

})(); //最后两个括号为“自执行匿名函数”

var sy = 0;
function main(){                                    //主循环

	requestAnimFrame(main);
	ctx.clearRect(0,0,1300,600);//清空矩形
	ctx.save();                //保存画面
	
	if(whatScene==0){
		//sound.playSoundById(1);
		//createSounds(1);
		//playSounds();
		
		
		if(isRotate == true){
			if(rotateTime > 0){ //旋转
				rotateTime-=1/30;
				sy+=10;
		
			}
			else{
				//isRotate = false;
				isStarStop = true;
				rotateTime = 0;
				whatScene = 1;
			}
		}
		//alert(scaleTime);
		ctx.save();
		ctx.translate(0+shakeX,0+shakeY);  //原点坐标平移
		ctx.transform(1,0,0,rotateTime,0,sy);
		drawMenuScene(ctx,menuImageN);
		ctx.restore();
		
	}
	else if(whatScene==1){  //游戏界面
		
		if(isShake == true){//抖动控制
			if(shakeTime !=  0){
				shakeTime--;
				shakeX = random(-2,2);
				shakeY = random(-2,2);
			}
			else{
				shakeTime = 30;
				isShake = false;
			}
			
		}
		else{
			shakeX = 0;
			shakeY = 0;
		}
	
		//////星星的运动技能时间
		if(isStarTimeout == true){
			if(starTimeout != 0){
				starTimeout--;	
			}
			else{
				starTimeout = 400;
				isStarTimeout = false;
				//isStarMove = false;
				isStarStop = true;
			}
		}
	
		if(isRotate == true){  
			if(rotateTime < 1){ //旋转
				
				rotateTime+=1/30;
				sy-=10;
		
			}
			else{
				rotateTime = 1;
				//isRotate = false;
				rotate = 1;
				whatScene = 1;
			}
		}
	
	
		if(centerStar.isCollision == true){		  //碰到星的特效
			ctx.save();
			if(scaleTime<2){   //放大   必须要缩小还原
				scaleTime+=0.05;
				
			}    
			else{      //放大到2后，不变了
				scaleTime=2;
			}
			ctx.translate(0-650*(scaleTime-1)+shakeX,0-300*(scaleTime-1)+shakeY);  //缩放
			ctx.scale(scaleTime,scaleTime);
		}
		else{
			var scaleT = 1;
			ctx.save();
			ctx.translate(0-650*(scaleT-1)+shakeX,0-300*(scaleT-1)+shakeY);  //缩放,抖动参数
			ctx.scale(scaleT,scaleT);
		}
		ctx.save();
		//ctx.translate(0+shakeX,0+shakeY);  //原点坐标平移
		ctx.transform(1,0,0,rotateTime,0,sy);
		
		drawBeginScene(ctx);//?
		ctx.restore();
		if(centerStar.isCollision == true){
			ctx.restore();
		}
		else{
			ctx.restore();
		}
		
	}
	else if(whatScene==2){
		//ctx.save();
		//ctx.translate(0-650*(scaleTime2-1),00-300*(scaleTime2-1));  //缩放
		//ctx.scale(scaleTime2,scaleTime2);
		drawHelpScene(ctx,helpImageN);	
		//ctx.restore();
	}
	else if(whatScene == 3){ //退出界面
		isScale = false;
		if(scaleTime2>0.5){
			scaleTime2-=0.05;	
			//alert(scaleTime);
		}
		else{
			scaleTime2=0.5;
		}
		ctx.save();
		ctx.translate(0-650*(scaleTime2-1),0-300*(scaleTime2-1));  //缩放
		ctx.scale(scaleTime2,scaleTime2);
		drawOverScene(ctx,overImageN);
		ctx.restore();
	}
	
	ctx.restore();            //释放画面
}
$("document").ready(function (){                 //初始化场景函数		
	
	canvas = document.getElementById("Canvas");
	ctx = canvas.getContext("2d");			
	
	var myVid=document.getElementById("bgm");
	myVid.volume = 0.5;
		
	initMenuScene(); //初始化菜单场景
	
	main();
	
});