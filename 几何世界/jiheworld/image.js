//绘制图片的操作

var backImage;                               //背景图片
var backImageMove = 0;
var menuImage;                           //游戏菜单图片组
var menuImage2;
var helpImage;
var overImage;   //游戏结束图

///////////////////////////////////////////////////菜单场景的图片处理
function initBackImage(){
	backImage = new Image();
	backImage.src = "img/background.jpg";
};
function drawBackImage(CTX){                     //绘制游戏初始菜单场景

	if(backImageMove != 1300){
		backImageMove++;
	}
	else{
		backImageMove = 0;	
	} 
	CTX.save();
	CTX.translate(0,0);
	CTX.shadowColor = 'rgb(51,233,242)';
	CTX.shadowBlur = 40;
	CTX.drawImage(backImage,0+backImageMove,0,1300,600,0,0,1300,600);
	//CTX.drawImage(backImage,0+backImageMove,0,1300-backImageMove,600,0,0,1300-backImageMove,600);
	//CTX.drawImage(backImage,0,0,backImageMove,600,1300-backImageMove,0,backImageMove,600);
	CTX.restore();
};

function initMenuImage(){
	menuImage = new Image();
	menuImage.src = "img/menu.png";
	menuImage2 = new Image();
	menuImage2.src = "img/menuWord.png";
	initHelpImage();
};
function drawMenuImage(CTX,n){
	CTX.save();
	CTX.translate(0,0);
	CTX.shadowBlur = 0;
	CTX.drawImage(menuImage,n*300,0,300,400,canvas.width/2-150,canvas.height/2-200,300,400);   //参数依次为：从x,y裁剪宽300,高400，放在x 250 y100处，大小宽300 高400
	CTX.restore();
	
	CTX.save();
	CTX.translate(0,0);
	CTX.shadowColor = 'rgb('+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+')';
	CTX.shadowBlur = 10;
	CTX.drawImage(menuImage2,canvas.width/2-150,canvas.height/2-200,300,400);   
	CTX.restore();
};

///////////////////////////////////////////////////////帮助场景的图片处理
function initHelpImage(){
	
	helpImage = new Image();
	helpImage.src = "img/gameHelp4.png";
	
}
function drawHelpImage(CTX,n){
	CTX.save();
	CTX.translate(0,0);
	CTX.shadowBlur = 0;
	CTX.drawImage(helpImage,n*800,0,800,600,canvas.width/2-400,canvas.height/2-300,800,600);
	CTX.restore();
}

///////////////////////////////////////////////////////////游戏结束图片处理
function initOverImage(){
	overImage = new Image();
	overImage.src = "img/gameOver.png";
}
function drawOverImage(CTX,n){
	CTX.save();
	CTX.translate(0,0);
	CTX.shadowBlur = 0;
	CTX.drawImage(overImage,n*800,0,800,600,canvas.width/2-400,canvas.height/2-300,800,600);
	CTX.restore();
}
