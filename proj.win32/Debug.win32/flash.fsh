

#ifdef GL_ES
precision highp float;
#endif

////接收到的纹理顶点信息
////每一个像素执行时，会通过已经执行的顶点shader中的纹理坐标，
////差值出具体一个像素的纹理坐标，比如一个像素在最上一排像素的中间，则v_texCoord的x,y为0.5,0
varying vec2 v_texCoord;

float picWidth = 400.0;
float picHeight = 30.0;

uniform float firstWidth;
uniform float firstHeight;
uniform float startHeight;

uniform float firstWidth2;
uniform float firstHeight2;
uniform float startHeight2;

float wMod = 45.0;
float wModStart = 5.0;
float hMod = 29.0;

/////主要思路：
/////首先传入第一段的宽度，高度，起始高度，然后后面的宽度根据前面的宽度来设置取模；高度同理

void main(void)
{
	///随机线的宽度
	float lineWidth = 25.0;
	
	///随机线的第一个宽度
	//float firstWidth = 30.0;
	///随机线的高度
	//float firstHeight = 10.0;
	///随机线的起始高度
	//float startHeight = 10.0;
	
	///随机宽度
	int maxIndex = 0;
	float randWidth[200];
	int i = 0;
	randWidth[0] = firstWidth;
	float widthSum = randWidth[0];
	while (true){
		i++;
		if (i > 199){
			break;
		}
		if (widthSum > picWidth){
			maxIndex = i;
			
			
			break;
		}
		randWidth[i] = mod(randWidth[i-1]*2.0 + 7.0,wMod) + wModStart;
		widthSum += randWidth[i];
	}
	///随机高度
	float randHeight[200];
	i = 0;
	randHeight[0] = firstHeight;
	float heightSum = randHeight[0] + startHeight;
	widthSum = randWidth[0];
	while (true){
		i++;
		if (i > maxIndex){
			break;
		}
		if (widthSum > picWidth){
			
			///最后一个的宽度特定
			//randWidth[i-1] = picWidth - (widthSum - randWidth[i-1]);
			float lastWidth = picWidth - (widthSum - randWidth[i-1]);
			if(lastWidth < 40.0)
			{
				randWidth[i-2] = picWidth - (widthSum - randWidth[i-1] - randWidth[i-2]) + 1.0;
				randHeight[i-2] = picHeight/2.0 - (heightSum - randHeight[i-1] - randHeight[i-2]);
			}
			else{
				randWidth[i-2] = picWidth - (widthSum - randWidth[i-1] ) + 1.0;
				///最后一个的高度特定，使其最后的点落在高度的一般上
				randHeight[i-1] = picHeight/2.0 - (heightSum - randHeight[i-1]);
			}
			
			
			break;
		}
		randHeight[i] = mod(abs(randHeight[i-1]*3.0 + 7.0),hMod) - heightSum;
		heightSum += randHeight[i];
		widthSum += randWidth[i];
		
		
	}
	///获取K,B值
	float px1 = 0.0;
	float py1 = startHeight;
	float px2 = 0.0;
	float py2 = 0.0;
	
	i = 0;
	widthSum = randWidth[i];
	while(true){
		if (v_texCoord.x*picWidth < widthSum){
			break;
		}
		px1 += randWidth[i];
		py1 += randHeight[i];
		i++;
		widthSum += randWidth[i];
		
		if (i > maxIndex){
			break;
		}
	}
	px2 = px1 + randWidth[i];
	py2 = py1 + randHeight[i];
	
	float k = (py2-py1)/(px2-px1);
	float b = py1 - k*px1;
	
	float targetY = v_texCoord.x*picWidth * k + b;
	
	float dist = abs(v_texCoord.y*picHeight - targetY);
	float alpha = smoothstep(0.0,lineWidth/2.0,dist);
	alpha = 1.0 - alpha;
	if (dist < 1.0){
		gl_FragColor = vec4(1,1,1,alpha);
	}
	else{
		gl_FragColor = vec4(0.2,0.96,0.867,alpha/3.0);
	}
	/*
	if (alpha > 0.95){
		gl_FragColor = vec4(1,1,1,alpha);
	}
	else{
		gl_FragColor = vec4(1,1,1,alpha/3);
	}
	*/
	
	//////起始点和末端点的白色点效果
	float pointSize = 4.0;
	float pDis = distance(vec2(0.0,picHeight/2.0),vec2(v_texCoord.x*picWidth,v_texCoord.y*picHeight));
	if (pDis < pointSize && pDis > 0.0){
		gl_FragColor = vec4(1,1,1,1);
	}
	float pDis2 = distance(vec2(picWidth,picHeight/2.0),vec2(v_texCoord.x*picWidth,v_texCoord.y*picHeight));
	if (pDis2 < pointSize && pDis2 > 0.0){
		gl_FragColor = vec4(1,1,1,1);
	}
	
	/////////////////////////////////////////////////////////////////////////
	////第二条电流线
	/*
	///随机宽度
	int maxIndex2 = 0;
	float randWidth2[200];
	int i2 = 0;
	randWidth2[0] = firstWidth2;
	float widthSum2 = randWidth2[0];
	while (true){
		i2++;
		if (i2 > 199){
			break;
		}
		if (widthSum2 > picWidth){
			maxIndex2 = i2;
			
			
			break;
		}
		randWidth2[i2] = mod(randWidth2[i2-1]*3 + 9,wMod/2) + wModStart;
		widthSum2 += randWidth2[i2];
		
	}
	///随机高度
	float randHeight2[200];
	i2 = 0;
	randHeight2[0] = firstHeight2;
	float heightSum2= randHeight2[0] + startHeight2;
	widthSum2 = randWidth2[0];
	while (true){
		i2++;
		if (i2 > maxIndex2){
			break;
		}
		if (widthSum2 > picWidth){
		
			float lastWidth = picWidth - (widthSum2 - randWidth2[i2-1]);
			if(lastWidth < 40)
			{
				randWidth2[i2-2] = picWidth - (widthSum2 - randWidth2[i2-1] - randWidth2[i2-2]) + 1;
				randHeight2[i2-2] = picHeight/2 - (heightSum2 - randHeight2[i2-1] - randHeight2[i2-2]);
			}
			else{
				randWidth2[i2-2] = picWidth - (widthSum2 - randWidth2[i2-1] ) + 1;
				///最后一个的高度特定，使其最后的点落在高度的一般上
				randHeight2[i2-1] = picHeight/2 - (heightSum2 - randHeight2[i2-1]);
			}
			
			break;
		}
		randHeight2[i2] = mod(abs(randHeight2[i2-1]*4 + 6),hMod) - heightSum2;
		heightSum2 += randHeight2[i2];
		widthSum2 += randWidth2[i2];
		
		
	}
	///获取K,B值
	float px21 = 0;
	float py21 = startHeight2;
	float px22 = 0;
	float py22 = 0;
	
	i2 = 0;
	widthSum2 = randWidth2[i2];
	while(true){
		if (v_texCoord.x*picWidth < widthSum2){
			break;
		}
		px21 += randWidth2[i2];
		py21 += randHeight2[i2];
		i2++;
		widthSum2 += randWidth2[i2];
		
		if (i2 > maxIndex2){
			break;
		}
	}
	px22 = px21 + randWidth2[i2];
	py22 = py21 + randHeight2[i2];
	
	float k2 = (py22-py21)/(px22-px21);
	float b2 = py21 - k2*px21;
	
	float targetY2 = v_texCoord.x*picWidth * k2 + b2;
	
	float dist2 = abs(v_texCoord.y*picHeight - targetY2);
	float alpha2 = smoothstep(0.0,lineWidth/2,dist2);
	alpha2 = 1 - alpha2;
	
	if (alpha2 > 0){
		if (dist2 < 1){
			gl_FragColor = vec4(1,1,1,alpha2);
		}
		else{
			gl_FragColor = vec4(0.2,0.96,0.867,alpha2/3);
		}
	}
	*/
	/*
	if (alpha2 > 0.95){
		gl_FragColor = vec4(1,1,1,alpha2);
	}
	else if(alpha2 > 0 && alpha2 <=0.95) {
		gl_FragColor = vec4(1,1,1,alpha2/3);
	}
	*/
	
	//////////////////////////////////
	/*
	float targetY3 = picHeight/2;
	float dist3 = abs(v_texCoord.y*picHeight - targetY3);
	float alpha3 = smoothstep(0.0,lineWidth/3,dist3);
	alpha3 = 1 - alpha3;
	if (alpha3 > 0){
		if (alpha3 >=0.95){
			gl_FragColor = vec4(1,1,1,alpha3);
		}
		else{
			gl_FragColor = vec4(0,1,1,alpha3/2);
		}
	}
	*/
	
}

