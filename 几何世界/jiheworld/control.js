//�����̿���

$('#Canvas').mousemove(function(e){
	var x = e.pageX - canvas.offsetLeft;
	var y = e.pageY - canvas.offsetTop;
	
	if(whatScene == 0){//���ǲ˵�����ʱ
		if(x<460+250 && x>330+250 && y>300 && y<350){               //���ϲ���
			//sounds.playSoundByIdOnly(1);
			//createSounds(4);
			menuImageN = 1;                        //nb��index.js�ж����ȫ�ֱ���
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
	else if(whatScene == 1){  //��ʼ�����������
		if(whatBoxClick == 4 || whatBoxClick==0){   //ֱ�߿�ѡ��
			var px;           //�ҵ�������ָ��ĽǶ�
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
			if(y>540){    //���ڶ�������µ�y��540�ʹ�����
				triangleCreate = true;	
				whatBoxClick = 4;  //����ֱ��ѡ��
				for(var i=0;i<8;i++){
					if(i==4) boxs[i].setIsClick(true);
					else boxs[i].setIsClick(false);
				}
			}
			var l = triangles.length;
			triangles[l-1].update(x,y);
		}
		if(whatBoxClick == 0 && triangleCreate==true && y<540){//�����Ƕ���ļ���û�л���ǰֻ����һ�����Ƕ���
			
			if(getCoolCircleAngle(0) == 0 && mp>=5){//����ȴԲ�Ƕ�Ϊ0���Ϳ��Դ�������δ������Ӧ��ȴԲ�Ƿ���0
				mp-=5;
				createTriangles(x,y);	
				triangleCreate = false;
				createCoolCircles(330,570,1,0);   //������һ����������ȴԲ
			}
			else{
				whatBoxClick = 4;  //����ֱ��ѡ��
				for(var i=0;i<8;i++){
					if(i==4) boxs[i].setIsClick(true);
					else boxs[i].setIsClick(false);
				}
			}
		}
		
		
		if(whatBoxClick == 1){  // ��������
			
			if(getCoolCircleAngle(1) == 0 && mp>=5){
				mp-=5;
				createRects(x,y,30);   //�߳�30
				createCoolCircles(390,570,1,1);   //������2����������ȴԲ
				
				whatBoxClick = 4;  //����ֱ��ѡ��
				for(var i=0;i<8;i++){
					if(i==4) boxs[i].setIsClick(true);
					else boxs[i].setIsClick(false);
				}
			}
			else{
				whatBoxClick = 4;  //����ֱ��ѡ��
				for(var i=0;i<8;i++){
					if(i==4) boxs[i].setIsClick(true);
					else boxs[i].setIsClick(false);
				}
			}
		}
		else if(whatBoxClick == 2){  // ����Բ��
			if(getCoolCircleAngle(2) == 0 && mp>=5){
				mp-=5;
				createCirclesOut(x,y);
				createCoolCircles(450,570,1,2);   //������3����������ȴԲ
				
				whatBoxClick = 4;  //����ֱ��ѡ��
				for(var i=0;i<8;i++){
					if(i==4) boxs[i].setIsClick(true);
					else boxs[i].setIsClick(false);
				}
			}
			else{
				whatBoxClick = 4;  //����ֱ��ѡ��
				for(var i=0;i<8;i++){
					if(i==4) boxs[i].setIsClick(true);
					else boxs[i].setIsClick(false);
				}
			}
		}  
		else if(whatBoxClick == 3){       //�������
			if(getCoolCircleAngle(3) == 0 && mp>=5){
				mp-=5;
				createPentagons(x,y,40)
				createCoolCircles(510,570,1,3);   //������3����������ȴԲ
				
				whatBoxClick = 4;  //����ֱ��ѡ��
				for(var i=0;i<8;i++){
					if(i==4) boxs[i].setIsClick(true);
					else boxs[i].setIsClick(false);
				}
			}
			else{
				whatBoxClick = 4;  //����ֱ��ѡ��
				for(var i=0;i<8;i++){
					if(i==4) boxs[i].setIsClick(true);
					else boxs[i].setIsClick(false);
				}
			}
		}
		
		
	}
	else if(whatScene == 2){  //���������������
		if(x > 670+250 && x< 760+250 && y>100 && y<180){
			helpImageN = 1;	 //�ı�ͼƬ
		}
		else{
			helpImageN = 0;	
		}
	}
	else if(whatScene == 3){  //���������������
		if(x > 550&& x< 800 && y>200 && y<280){
			overImageN = 1;	 //�ı�ͼƬ
		}
		else if(x > 550&& x< 800 && y>350 && y<420){
			overImageN = 2;	 //�ı�ͼƬ
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
		if(x<460+250 && x>330+250 && y>300 && y<350){               //���ϲ��������
			createSounds(5);
			menuImageN = 0;                        //nb��index.js�ж����ȫ�ֱ���
			initBeginScene();  //��ʼ����ʼ����
			//whatScene = 1;
			isRotate = true;
			
			//isStarStop = true;
		}
		else if(x<460+250 && x>330+250 && y>365 && y<420){
			createSounds(5);
			isStarStop = true;
			//initHelpScene();
			whatScene = 2;  //�ı䳡��
			menuImageN = 2;
		}
		else if(x<460+250 && x>330+250 && y>435 && y<490){
			createSounds(5);
			window.close();
		}
	}
	
	
	else if(whatScene == 2){//���ǰ�������ʱ�����������
		
		if(x > 670+250 && x< 760+250 && y>100 && y<150){
			whatScene = 0;	 //�ı�ͼƬ
		}
	}
	else if(whatScene == 3){  //���������������
		if(x > 550&& x< 800 && y>200 && y<280){
			//window.location.reload();  //ˢ��ҳ��
			whatScene = 1;
			releaseAll();	 //�ı�ͼƬ
			initBeginScene();
			window.location.reload();  //ˢ��ҳ��
		}
		else if(x > 550&& x< 800 && y>350 && y<420){
			whatScene = 0;	 //�ı�ͼƬ
			scaleTime = 0.5;
			releaseAll();
			window.location.reload();  //ˢ��ҳ��
		}
		else{
			overImageN = 0;	
		}
	}
	
}					   					   
);

/*
$('#Canvas').dblclick(function (e){//��������Ȧ˫��Ч��
//$('#Canvas').click(function (e){//��������Ȧ˫��Ч��
	e.preventDefault();
	var x = e.pageX - canvas.offsetLeft;
	var y = e.pageY - canvas.offsetTop;							

	if(whatScene == 1){   //�������Ϸ����
		if(x>570+250 && x<630+250 && y>540 && y<600){   //˫������Ȧ��
			if(circleNum<4 && mp>=2){
				mp-=2;
				circleNum++;	
			}
			for(var i=0;i<circleNum;i++){
				cenCircles[i].setIsBuy(true);	
			}
			for(var i=0;i<8;i++){   //����������û��Ч��
				if(i==4) boxs[i].setIsClick(true);
				else boxs[i].setIsClick(false);
				//boxs[i].setIsClick(false);
			}
			whatBoxClick = 4;
		}
		
		else if(x>630+250 && x<690+250 && y>540 && y<600){   //����Ҷ������
			if(mp>=20 && isStarTimeout == false){
				mp-=20;
				isStarMove = true;
				isStarStop = false;
				isStarTimeout = true;  //����һ��ʱ���˶�
			}
			for(var i=1;i<8;i++){   //����������û��Ч��
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
			for(var i=1;i<8;i++){   //����������û��Ч��
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
		if(whatBoxClick == 1){  // ��������
			alert('12');
			if(getCoolCircleAngle(1) == 0 && mp>=5){
				mp-=5;
				createRects(x,y,30);   //�߳�30
				createCoolCircles(390,570,1,1);   //������2����������ȴԲ
				
				whatBoxClick = 4;  //����ֱ��ѡ��
				for(var i=0;i<8;i++){
					if(i==4) boxs[i].setIsClick(true);
					else boxs[i].setIsClick(false);
				}
			}
		}
		else if(whatBoxClick == 2){  // ����Բ��
			if(getCoolCircleAngle(2) == 0 && mp>=5){
				mp-=5;
				createCirclesOut(x,y);
				createCoolCircles(450,570,1,2);   //������3����������ȴԲ
				
				whatBoxClick = 4;  //����ֱ��ѡ��
				for(var i=0;i<8;i++){
					if(i==4) boxs[i].setIsClick(true);
					else boxs[i].setIsClick(false);
				}
			}
		}  
		else if(whatBoxClick == 3){       //�������
			if(getCoolCircleAngle(3) == 0 && mp>=5){
				mp-=5;
				createPentagons(x,y,40)
				createCoolCircles(510,570,1,3);   //������3����������ȴԲ
				
				whatBoxClick = 4;  //����ֱ��ѡ��
				for(var i=0;i<8;i++){
					if(i==4) boxs[i].setIsClick(true);
					else boxs[i].setIsClick(false);
				}
			}
		}
	*/
	
		if(whatBoxClick == 4){   //ֱ��
			
			//if(x>5&&x<1295&&y>5&&y<595){  //������곬����Ļ
			
				mouseDown = true;
				gun.isShoot = true;  //���ڸı�������ɫ
			//}
			//else{
			//	mouseDown = false;
			//	gun.isShoot = false;
			//}
		}/*
		else if(whatBoxClick == 0 && triangleCreate==true && y<540 && mp>=5){//�����Ƕ���ļ���û�л���ǰֻ����һ�����Ƕ���
			mp-=5;
			if(getCoolCircleAngle(0) == 0){//����ȴԲ�Ƕ�Ϊ0���Ϳ��Դ�������δ������Ӧ��ȴԲ�Ƿ���0
				createTriangles(x,y);	
				triangleCreate = false;
				createCoolCircles(330,570,1,0);   //������һ����������ȴԲ
			}
		}*/
		
		
	}

});
$('#Canvas').mouseup(function (e){
	e.preventDefault();
	
	if(whatScene == 1){ 
		if(whatBoxClick == 4){    //ֱ��
			mouseDown = false;
			gun.isShoot = false;
		}
		else if(whatBoxClick == 0){  //����
			triangleCreate = true;
			
			whatBoxClick = 4;  //����ֱ��ѡ��
			for(var i=0;i<8;i++){
				if(i==4) boxs[i].setIsClick(true);
				else boxs[i].setIsClick(false);
			}
		}
	}
});
$('#Canvas').mouseout(function (e){   //����Ƴ�����
	e.preventDefault();	
	
	if(whatScene == 1){ 
		//if(whatBoxClick == 4){   //ֱ��
			//mouseDown = false;
			//gun.isShoot = false;
		//}
		//else if(whatBoxClick == 0 && triangleCreate==true && y<540){  //�����Ƕ���ļ���û�л���ǰֻ����һ�����Ƕ���
		//	createTriangles(x,y);	
		//	triangleCreate = false;
		//}
	
	}
});

$('body').keypress(function (e){      //�����¼�
	//mouseDown = false;
	//gun.isShoot = false;  //���˼��������ӵ�ֹͣ
	
	
	var key = e.keyCode;
	//alert(key);
	if(whatScene == 1){
	switch(key){
		case 32:
			whatBoxClick = 4; //�����ĸ��������
			for(var i=0;i<8;i++){
				if(i==4) boxs[i].setIsClick(true);
				else boxs[i].setIsClick(false);
			}
			break;
		case 65:
		case 97:  //a
			whatBoxClick = 0; //�����ĸ��������
			for(var i=0;i<8;i++){
				if(i==0) boxs[i].setIsClick(true);
				else boxs[i].setIsClick(false);
			}
			break;
		case 83:
		case 115:  //s
			whatBoxClick = 1; //�����ĸ��������
			for(var i=0;i<8;i++){
				if(i==1) boxs[i].setIsClick(true);
				else boxs[i].setIsClick(false);
			}
			
			break;
		case 68:
		case 100:   //d
			whatBoxClick = 2; //�����ĸ��������
			for(var i=0;i<8;i++){
				if(i==2) boxs[i].setIsClick(true);
				else boxs[i].setIsClick(false);
			}
			
			
			break;
		case 70:
		case 102:  //f
			whatBoxClick = 3; //�����ĸ��������
			for(var i=0;i<8;i++){
				if(i==3) boxs[i].setIsClick(true);
				else boxs[i].setIsClick(false);
			}
			
			break;
			/////////////////////�ұ߼���
		case 119:
		case 87:  //w
			if(circleNum<4 && mp>=5){
				mp-=5;
				circleNum++;	
			}
			for(var i=0;i<circleNum;i++){
				cenCircles[i].setIsBuy(true);	
			}
			for(var i=0;i<8;i++){   //����������û��Ч��
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
				isStarTimeout = true;  //����һ��ʱ���˶�
			}
			for(var i=1;i<8;i++){   //����������û��Ч��
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
			for(var i=1;i<8;i++){   //����������û��Ч��
				if(i==4) boxs[i].setIsClick(true);
				else boxs[i].setIsClick(false);
				//boxs[i].setIsClick(false);
			}
			whatBoxClick = 4;
			break;
	}
	
	}
});



