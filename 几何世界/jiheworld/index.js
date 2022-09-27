//ÓÎÏ·Ö÷Ìå

var canvas;                              //ÓÎÏ·È«¾Ö±äÁ¿
var ctx;     
var gameOver = false;                    //ÓÎÏ·Î´½áÊø
var menuImageN = 0;
var helpImageN = 0;
var overImageN = 0;
var scaleTime = 1;  //ÌØÐ§(Ëõ·ÅÐ§¹û)
var isScale = false; 
var scaleTime2 = 1;  //ÓÃÓÚ´æ´¢
var rotateTime = 1;  //Ðý×ª
var isRotate = false;
var score = 0; //·ÖÊý±äÁ¿
var mp = 10;    //mp±äÁ¿
var isStarMove = false;      //ÐÇÐÇÊÇ·ñÒÆ¶¯µÄ£¬¿ªÊ¼Ê±ÊÇ¾²Ö¹µÄ
var isStarStop = false;      //ÐÇÐÇÔË¶¯ºó£¬ÊÇ·ñÍ£Ö¹
var isStarTimeout = false;   
var starTimeout = 400;       //µã»÷ÐÇÐÇ¶¯¼¼ÄÜ£¬ÔË¶¯ÃëÊý
var starSkill;         //ÐÇÐÇÂÒÉä¼¼ÄÜÍ¼±ê
var starSkillNum = 1;  //ÐÇÐÇ¼¼ÄÜÊýÁ¿
var whatBoxClick = 4;   //ÄÄ¸ö¹ºÂò¿ò±»Ñ¡ÖÐ£¬Ä¬ÈÏÃ»ÓÐÖ±ÏßÑ¡ÖÐ
var circleNum = 0;  //ÂòÁË¼¸¸ö¹ºÂòÈ¦
var circleNum1 = 0; //µÚÒ»È¦Ô²£¬Ö»ÄÜÓÐ3¸öÅÚËþ
var circleNum2 = 0; //5¸ö
var circleNum3 = 0; //7¸ö
var particles = [];          //Á£×ÓÊý×é
var particleTrails = [];     //ÍÏÎ²Á£×ÓÊý×é

var boxs = [];          //¹ºÂò¿òÊý×é
var boxCircles = [];    //¹ºÂò¿òÖÐµÄÔ²
var cenCircles = [];    //ÖÐÐÄÖÜÎ§Ô²ÐÎ
var lines = [];         //Ö±ÏßÃÇ
var triangles = [];     //Èý½ÇÃÇ
var rects = [];         //¾ØÐÎÃÇ
var circles = [];       //Ô²ÐÎÃÇ
var pentagons = [];     //Îå½ÇÐÇÃÇ

var sounds = [];        //ÉùÒô
var snows = [];         //Ñ©»¨Êý×é
var isSnow = false;    //ÊÇ·ñÊ¹ÓÃÏÂÑ©¼¼ÄÜ
var snowSkillNum = 1;    //Ñ©»¨¼¼ÄÜµÄÊýÁ¿
var words = [];         //ÎÄ×ÖÃÇ
var snowSkill;          //Ñ©»¨¼¼ÄÜ
var lightPoints = [];    //ÁÁµãÃÇ£¬Á£×ÓÐ§¹ûÏà¹Ø
var centerStar = new CenterStar(650,300);  //ÖÐÐÄÐÇ
var gun = new Gun(650,600);  //µ¥ÉäÅÜ
var gunAngle = 0;             //µ¥ÉäÅÜÐý×ª½Ç¶È
var bullets = [];             //µ¥×Óµ¯Êý×é
var fireType = 0;            //»ðÁ¦ÀàÐÍ
var fireCool = 0;             //»ðÁ¦±ä¸ü³ÖÐøÊ±¼ä
var laserBullets = [];       //¼¤¹â×Óµ¯Êý×é

var bulletTime = 3;          //×Óµ¯·¢ÉäÑÓ³Ù
var timeTick = 0;            //×Óµ¯·¢Éä¼ÆÊý
var missiles = [];             //µ¼µ¯ÃÇ

var coolCircles = [];          //ÀäÈ´Ô²
var collisions = [];           //Åö×²Ô²
var triangleCreate = true;   //´´½¨Èý½ÇÏÞ¶¨

var mouseDown = false;

var cards = [];       //¿¨Æ¬ÃÇ
var enemys = [];        //µÐÈËÃÇ
var bombEnemys = [];  //Õ¨µ¯µÐÈËÃÇ
var pantsEnemys = [];  //¿ã×ÓµÐÈËÃÇ
var gatherEnemys = [];  //½áºÏÌåµÐÈËÃÇ
var bulletEnemys = [];   //×Óµ¯µÐÈË
var gunEnemys = [];     //ÅÚËþµÐÈË
var bossEnemys = [];    //bossµÐÈË

var stage = new Stage();

var isShake = true;    //ÊÇ·ñ¶¶¶¯
var shakeX = 0,shakeY = 0;       //¶¶¶¯x£¬yÆ«ÒÆ
var shakeTime = 30;      //¶¶¶¯¶à¾Ã½áÊø

var whatScene = 0;           //0Îª²Ëµ¥½çÃæ£¬1Îª¿ªÊ¼ÓÎÏ·½çÃæ£¬2Îª°ïÖú½çÃæ

window.requestAnimFrame = (function (){
	return window.requestAnimationFrame || 
	        window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			function (callback){
				window.setTimeout(callback,1000/60);    //Í£Ö¹Ê±¼ä³¬¹ý1000/60ºóµ÷ÓÃcallbackº¯Êý
			};

})(); //×îºóÁ½¸öÀ¨ºÅÎª¡°×ÔÖ´ÐÐÄäÃûº¯Êý¡±

var sy = 0;
function main(){                                    //Ö÷Ñ­»·

	requestAnimFrame(main);
	ctx.clearRect(0,0,1300,600);//Çå¿Õ¾ØÐÎ
	ctx.save();                //±£´æ»­Ãæ
	
	if(whatScene==0){
		//sound.playSoundById(1);
		//createSounds(1);
		//playSounds();
		
		
		if(isRotate == true){
			if(rotateTime > 0){ //Ðý×ª
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
		ctx.translate(0+shakeX,0+shakeY);  //Ô­µã×ø±êÆ½ÒÆ
		ctx.transform(1,0,0,rotateTime,0,sy);
		drawMenuScene(ctx,menuImageN);
		ctx.restore();
		
	}
	else if(whatScene==1){  //ÓÎÏ·½çÃæ
		
		if(isShake == true){//¶¶¶¯¿ØÖÆ
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
	
		//////ÐÇÐÇµÄÔË¶¯¼¼ÄÜÊ±¼ä
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
			if(rotateTime < 1){ //Ðý×ª
				
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
	
	
		if(centerStar.isCollision == true){		  //Åöµ½ÐÇµÄÌØÐ§
			ctx.save();
			if(scaleTime<2){   //·Å´ó   ±ØÐëÒªËõÐ¡»¹Ô­
				scaleTime+=0.05;
				
			}    
			else{      //·Å´óµ½2ºó£¬²»±äÁË
				scaleTime=2;
			}
			ctx.translate(0-650*(scaleTime-1)+shakeX,00-300*(scaleTime-1)+shakeY);  //Ëõ·Å
			ctx.scale(scaleTime,scaleTime);
		}
		else{
			var scaleT = 1;
			ctx.save();
			ctx.translate(0-650*(scaleT-1)+shakeX,00-300*(scaleT-1)+shakeY);  //Ëõ·Å,¶¶¶¯²ÎÊý
			ctx.scale(scaleT,scaleT);
		}
		ctx.save();
		//ctx.translate(0+shakeX,0+shakeY);  //Ô­µã×ø±êÆ½ÒÆ
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
		//ctx.translate(0-650*(scaleTime2-1),00-300*(scaleTime2-1));  //Ëõ·Å
		//ctx.scale(scaleTime2,scaleTime2);
		drawHelpScene(ctx,helpImageN);	
		//ctx.restore();
	}
	else if(whatScene == 3){ //ÍË³ö½çÃæ
		isScale = false;
		if(scaleTime2>0.5){
			scaleTime2-=0.05;	
			//alert(scaleTime);
		}
		else{
			scaleTime2=0.5;
		}
		ctx.save();
		ctx.translate(0-650*(scaleTime2-1),00-300*(scaleTime2-1));  //Ëõ·Å
		ctx.scale(scaleTime2,scaleTime2);
		drawOverScene(ctx,overImageN);
		ctx.restore();
	}
	
	ctx.restore();            //ÊÍ·Å»­Ãæ
}
$("document").ready(function (){                 //³õÊ¼»¯³¡¾°º¯Êý		
	
	canvas = document.getElementById("Canvas");
	ctx = canvas.getContext("2d");			
	
	var myVid=document.getElementById("bgm");
	myVid.volume = 0.5;
		
	initMenuScene(); //³õÊ¼»¯²Ëµ¥³¡¾°
	
	main();
	
});