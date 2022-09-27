///////////�������ƣ������ļ�����jquery��̬����
var soundIndex = 0;  //Ψһ��λaudio��ǩ
function Sound(SoundType){
	this.isCreate = false; //�Ƿ񲥷�
	this.index = 0;      //�±�
	this.soundType = SoundType;  //��������
	this.playTime = 0;    //����ʱ��
	this.playN = 0;     //������
	this.volum = 0.5;
}

Sound.prototype.deleteAudio = function(id){  //ɾ��������ǩ
	$('#Audio'+String(this.index)).remove();
	sounds.splice(id,1);
}

Sound.prototype.update = function(id){   //����2��

	if(this.playTime < 30&&this.isCreate == true){   //ÿ�������ڰ�����ѭ������
		//alert(this.playTime);
		this.playTime++;	
		
	}
	else if(this.playTime>=30&&this.isCreate == true){
		//this.playTime = 0;
		this.deleteAudio(id);
		//alert('de '+i+' '+sounds.length);
	}
}
Sound.prototype.playSound = function(){   //�����±����������ǩ��������
	
	if(this.soundType == 0.1){  //1��Ч
		if(this.isCreate == false){
			soundIndex++;
			this.index = soundIndex;
			$('<audio id="Audio'+soundIndex+'"><source src="audio/one.ogg" type="audio/ogg"></audio>').appendTo('body');
			this.isCreate = true;
		}
		var audioName = 'Audio'+String(this.index);
		var myVid=document.getElementById(audioName);
		myVid.volume = 1;
		//alert(myVid.ended);
		if(myVid.ended == false){
			$('#Audio'+String(this.index))[0].play();
		}
	}
	else if(this.soundType == 0.2){   //2������
		if(this.isCreate == false){
			soundIndex++;
			this.index = soundIndex;
			$('<audio id="Audio'+soundIndex+'"><source src="audio/two.ogg" type="audio/ogg"></audio>').appendTo('body');
			this.isCreate = true;
		}
		var audioName = 'Audio'+String(this.index);
		var myVid=document.getElementById(audioName);
		myVid.volume = 1;
		//alert(myVid.ended);
		if(myVid.ended == false){
			$('#Audio'+String(this.index))[0].play();
		}
	}
	else if(this.soundType == 0.3){   //3������
		if(this.isCreate == false){
			soundIndex++;
			this.index = soundIndex;
			$('<audio id="Audio'+soundIndex+'"><source src="audio/three.ogg" type="audio/ogg"></audio>').appendTo('body');
			this.isCreate = true;
		}
		var audioName = 'Audio'+String(this.index);
		var myVid=document.getElementById(audioName);
		myVid.volume = 1;
		//alert(myVid.ended);
		if(myVid.ended == false){
			$('#Audio'+String(this.index))[0].play();
		}
	}
	else if(this.soundType == 0.4){   //go������
		if(this.isCreate == false){
			soundIndex++;
			this.index = soundIndex;
			$('<audio id="Audio'+soundIndex+'"><source src="audio/go.ogg" type="audio/ogg"></audio>').appendTo('body');
			this.isCreate = true;
		}
		var audioName = 'Audio'+String(this.index);
		var myVid=document.getElementById(audioName);
		myVid.volume = 1;
		//alert(myVid.ended);
		if(myVid.ended == false){
			$('#Audio'+String(this.index))[0].play();
		}
	}
	
	else if(this.soundType == 1){   //��ͨ�ӵ�������
		if(this.isCreate == false){
			soundIndex++;
			this.index = soundIndex;
			$('<audio id="Audio'+soundIndex+'"><source src="audio/fire.ogg" type="audio/ogg"></audio>').appendTo('body');
			this.isCreate = true;
		}
		var audioName = 'Audio'+String(this.index);
		var myVid=document.getElementById(audioName);
		myVid.volume = 0.1;
		//alert(myVid.ended);
		if(myVid.ended == false){
			$('#Audio'+String(this.index))[0].play();
		}
	}
	else if(this.soundType == 2){  //�����ӵ�������
		if(this.isCreate == false){
			soundIndex++;
			this.index = soundIndex;
			$('<audio id="Audio'+soundIndex+'"><source src="audio/laser.ogg" type="audio/ogg"></audio>').appendTo('body');
			this.isCreate = true;
		}
		var audioName = 'Audio'+String(this.index);
		var myVid=document.getElementById(audioName);
		myVid.volume = 0.5;
		//alert(myVid.ended);
		if(myVid.ended == false){
			$('#Audio'+String(this.index))[0].play();
		}
	}
	else if(this.soundType == 3){  //�����ӵ�������
		if(this.isCreate == false){
			soundIndex++;
			this.index = soundIndex;
			$('<audio id="Audio'+soundIndex+'"><source src="audio/missile.ogg" type="audio/ogg"></audio>').appendTo('body');
			this.isCreate = true;
		}
		var audioName = 'Audio'+String(this.index);
		var myVid=document.getElementById(audioName);
		myVid.volume = 1;
		//alert(myVid.ended);
		if(myVid.ended == false){
			$('#Audio'+String(this.index))[0].play();
		}
	}
	else if(this.soundType == 4){  //�˵����ϵ�����
		if(this.isCreate == false){
			soundIndex++;
			this.index = soundIndex;
			$('<audio id="Audio'+soundIndex+'"><source src="audio/moveUp.ogg" type="audio/ogg"></audio>').appendTo('body');
			this.isCreate = true;
			
			
			var audioName = 'Audio'+String(this.index);
			var myVid=document.getElementById(audioName);
			myVid.volume = 1;
			//alert(myVid.ended);
			if(myVid.ended == false){
				$('#Audio'+String(this.index))[0].play();
			}
		}
		
	}
	else if(this.soundType == 5){  //�˵�ѡ�е�����
		if(this.isCreate == false){
			soundIndex++;
			this.index = soundIndex;
			$('<audio id="Audio'+soundIndex+'"><source src="audio/select.ogg" type="audio/ogg"></audio>').appendTo('body');
			this.isCreate = true;
		}
		var audioName = 'Audio'+String(this.index);
		var myVid=document.getElementById(audioName);
		myVid.volume = 1;
		//alert(myVid.ended);
		if(myVid.ended == false){
			$('#Audio'+String(this.index))[0].play();
		}
	}
	else if(this.soundType == 6){  //�ӵ����������������
		if(this.isCreate == false){
			soundIndex++;
			this.index = soundIndex;
			$('<audio id="Audio'+soundIndex+'"><source src="audio/hit.ogg" type="audio/ogg"></audio>').appendTo('body');
			this.isCreate = true;
		}
		var audioName = 'Audio'+String(this.index);
		var myVid=document.getElementById(audioName);
		myVid.volume = 0.5;
		//alert(myVid.ended);
		if(myVid.ended == false){
			$('#Audio'+String(this.index))[0].play();
		}
	}
	else if(this.soundType == 7){  //���˱�ը������
		if(this.isCreate == false){
			soundIndex++;
			this.index = soundIndex;
			$('<audio id="Audio'+soundIndex+'"><source src="audio/bomb.ogg" type="audio/ogg"></audio>').appendTo('body');
			this.isCreate = true;
		}
		var audioName = 'Audio'+String(this.index);
		var myVid=document.getElementById(audioName);
		myVid.volume = 0.7;
		//alert(myVid.ended);
		if(myVid.ended == false){
			$('#Audio'+String(this.index))[0].play();
		}
	}
	
  
}
/////////�������

function createSounds(SoundType){
	
	sounds.push(new Sound(SoundType) );	
	//alert(i+' '+sounds.length);
	//alert('111');
}
function playSounds(){
	var l = sounds.length;
	//alert(sounds.length);
	while(l--){
		sounds[l].playSound();
		sounds[l].update(l);
	}
}