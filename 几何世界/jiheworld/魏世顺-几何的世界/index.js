//��Ϸ����

var canvas;                              //��Ϸȫ�ֱ���
var ctx;     
var gameOver = false;                    //��Ϸδ����
var menuImageN = 0;
var helpImageN = 0;
var overImageN = 0;
var scaleTime = 1;  //��Ч(����Ч��)
var isScale = false; 
var scaleTime2 = 1;  //���ڴ洢
var rotateTime = 1;  //��ת
var isRotate = false;
var score = 0; //��������
var mp = 10;    //mp����
var isStarMove = false;      //�����Ƿ��ƶ��ģ���ʼʱ�Ǿ�ֹ��
var isStarStop = false;      //�����˶����Ƿ�ֹͣ
var isStarTimeout = false;   
var starTimeout = 400;       //������Ƕ����ܣ��˶�����
var starSkill;         //�������似��ͼ��
var starSkillNum = 1;  //���Ǽ�������
var whatBoxClick = 4;   //�ĸ������ѡ�У�Ĭ��û��ֱ��ѡ��
var circleNum = 0;  //���˼�������Ȧ
var circleNum1 = 0; //��һȦԲ��ֻ����3������
var circleNum2 = 0; //5��
var circleNum3 = 0; //7��
var particles = [];          //��������
var particleTrails = [];     //��β��������

var boxs = [];          //���������
var boxCircles = [];    //������е�Բ
var cenCircles = [];    //������ΧԲ��
var lines = [];         //ֱ����
var triangles = [];     //������
var rects = [];         //������
var circles = [];       //Բ����
var pentagons = [];     //�������

var sounds = [];        //����
var snows = [];         //ѩ������
var isSnow = false;    //�Ƿ�ʹ����ѩ����
var snowSkillNum = 1;    //ѩ�����ܵ�����
var words = [];         //������
var snowSkill;          //ѩ������
var lightPoints = [];    //�����ǣ�����Ч�����
var centerStar = new CenterStar(650,300);  //������
var gun = new Gun(650,600);  //������
var gunAngle = 0;             //��������ת�Ƕ�
var bullets = [];             //���ӵ�����
var fireType = 0;            //��������
var fireCool = 0;             //�����������ʱ��
var laserBullets = [];       //�����ӵ�����

var bulletTime = 3;          //�ӵ������ӳ�
var timeTick = 0;            //�ӵ��������
var missiles = [];             //������

var coolCircles = [];          //��ȴԲ
var collisions = [];           //��ײԲ
var triangleCreate = true;   //���������޶�

var mouseDown = false;

var cards = [];       //��Ƭ��
var enemys = [];        //������
var bombEnemys = [];  //ը��������
var pantsEnemys = [];  //���ӵ�����
var gatherEnemys = [];  //����������
var bulletEnemys = [];   //�ӵ�����
var gunEnemys = [];     //��������
var bossEnemys = [];    //boss����

var stage = new Stage();

var isShake = true;    //�Ƿ񶶶�
var shakeX = 0,shakeY = 0;       //����x��yƫ��
var shakeTime = 30;      //������ý���

var whatScene = 0;           //0Ϊ�˵����棬1Ϊ��ʼ��Ϸ���棬2Ϊ��������

window.requestAnimFrame = (function (){
	return window.requestAnimationFrame || 
	        window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			function (callback){
				window.setTimeout(callback,1000/60);    //ֹͣʱ�䳬��1000/60�����callback����
			};

})(); //�����������Ϊ����ִ������������

var sy = 0;
function main(){                                    //��ѭ��

	requestAnimFrame(main);
	ctx.clearRect(0,0,1300,600);//��վ���
	ctx.save();                //���滭��
	
	if(whatScene==0){
		//sound.playSoundById(1);
		//createSounds(1);
		//playSounds();
		
		
		if(isRotate == true){
			if(rotateTime > 0){ //��ת
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
		ctx.translate(0+shakeX,0+shakeY);  //ԭ������ƽ��
		ctx.transform(1,0,0,rotateTime,0,sy);
		drawMenuScene(ctx,menuImageN);
		ctx.restore();
		
	}
	else if(whatScene==1){  //��Ϸ����
		
		if(isShake == true){//��������
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
	
		//////���ǵ��˶�����ʱ��
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
			if(rotateTime < 1){ //��ת
				
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
	
	
		if(centerStar.isCollision == true){		  //�����ǵ���Ч
			ctx.save();
			if(scaleTime<2){   //�Ŵ�   ����Ҫ��С��ԭ
				scaleTime+=0.05;
				
			}    
			else{      //�Ŵ�2�󣬲�����
				scaleTime=2;
			}
			ctx.translate(0-650*(scaleTime-1)+shakeX,0-300*(scaleTime-1)+shakeY);  //����
			ctx.scale(scaleTime,scaleTime);
		}
		else{
			var scaleT = 1;
			ctx.save();
			ctx.translate(0-650*(scaleT-1)+shakeX,0-300*(scaleT-1)+shakeY);  //����,��������
			ctx.scale(scaleT,scaleT);
		}
		ctx.save();
		//ctx.translate(0+shakeX,0+shakeY);  //ԭ������ƽ��
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
		//ctx.translate(0-650*(scaleTime2-1),00-300*(scaleTime2-1));  //����
		//ctx.scale(scaleTime2,scaleTime2);
		drawHelpScene(ctx,helpImageN);	
		//ctx.restore();
	}
	else if(whatScene == 3){ //�˳�����
		isScale = false;
		if(scaleTime2>0.5){
			scaleTime2-=0.05;	
			//alert(scaleTime);
		}
		else{
			scaleTime2=0.5;
		}
		ctx.save();
		ctx.translate(0-650*(scaleTime2-1),0-300*(scaleTime2-1));  //����
		ctx.scale(scaleTime2,scaleTime2);
		drawOverScene(ctx,overImageN);
		ctx.restore();
	}
	
	ctx.restore();            //�ͷŻ���
}
$("document").ready(function (){                 //��ʼ����������		
	
	canvas = document.getElementById("Canvas");
	ctx = canvas.getContext("2d");			
	
	var myVid=document.getElementById("bgm");
	myVid.volume = 0.5;
		
	initMenuScene(); //��ʼ���˵�����
	
	main();
	
});