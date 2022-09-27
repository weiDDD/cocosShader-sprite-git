///////////声音控制，声音文件利用jquery动态加入
var soundIndex = 0;  //唯一定位audio标签
function Sound(SoundType){
	this.isCreate = false; //是否播放
	this.index = 0;      //下标
	this.soundType = SoundType;  //声音类型
	this.playTime = 0;    //播放时间
	this.playN = 0;     //播放数
	this.volum = 0.5;
}

Sound.prototype.deleteAudio = function(id){  //删除声音标签
	$('#Audio'+String(this.index)).remove();
	sounds.splice(id,1);
}

Sound.prototype.update = function(id){   //最多放2秒

	if(this.playTime < 30&&this.isCreate == true){   //每个声音在半秒内循环播放
		//alert(this.playTime);
		this.playTime++;	
		
	}
	else if(this.playTime>=30&&this.isCreate == true){
		//this.playTime = 0;
		this.deleteAudio(id);
		//alert('de '+i+' '+sounds.length);
	}
}
Sound.prototype.playSound = function(){   //根据下标添加声音标签，并播放
	
	if(this.soundType == 0.1){  //1音效
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
	else if(this.soundType == 0.2){   //2的声音
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
	else if(this.soundType == 0.3){   //3的声音
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
	else if(this.soundType == 0.4){   //go的声音
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
	
	else if(this.soundType == 1){   //普通子弹的声音
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
	else if(this.soundType == 2){  //激光子弹的声音
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
	else if(this.soundType == 3){  //导弹子弹的声音
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
	else if(this.soundType == 4){  //菜单移上的声音
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
	else if(this.soundType == 5){  //菜单选中的声音
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
	else if(this.soundType == 6){  //子弹与敌人碰到的声音
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
	else if(this.soundType == 7){  //敌人爆炸的声音
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
/////////创建相关

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