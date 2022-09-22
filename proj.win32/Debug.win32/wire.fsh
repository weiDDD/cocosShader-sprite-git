///fsh为碎片shader,纹理的每个像素都会应用此shader,每个像素都会调用

varying vec2 v_texCoord;

////线圈的个数
uniform int wireNum;
////线圈有多少个周期
uniform float wireDurationNum1;
uniform float wireDurationNum2;
uniform float wireDurationNum3;
////线圈的高度,0~1范围
uniform float wireHeight1;
uniform float wireHeight2;
uniform float wireHeight3;
//宽度
uniform	float wireSize1;
uniform	float wireSize2;
uniform	float wireSize3;

uniform float startAngle1;
uniform float startAngle2;
uniform float startAngle3;

uniform float startHeight1;
uniform float startHeight2;
uniform float startHeight3;

void main()
{
	
	float PI = 3.1415926;
	
	float height1 = fract(startHeight1);
	float height2 = fract(startHeight2);
	float height3 = fract(startHeight3);
	
	vec4 v_Color =texture2D(CC_Texture0 ,v_texCoord );
	
	for(int i=1;i<= wireNum;i++){
		float tHeight = 0.0;
		float ty = 0.0;
		////线的宽度大小
		float wireSize = 0.0;
		////光晕的尺寸
		float glowSize = 0.03;
		if( mod(float(i),3.0) == 1.0){
		    tHeight = height1 + float(i*1/wireNum);
			ty = tHeight + wireHeight1*sin((startAngle1 + v_texCoord.x/(1.0/wireDurationNum1)) * 2.0* PI) ;
			wireSize = wireSize1;
		}
		else if(mod(float(i),3.0) == 2.0){
	            tHeight = height2 + float(i*1/wireNum);
			ty = tHeight + wireHeight2*sin((startAngle2 + v_texCoord.x/(1.0/wireDurationNum2)) * 2.0* PI) ;
			wireSize = wireSize2;
		}
		else if(mod(float(i),3.0) == 0.0){
		    tHeight = height3 + float(i*1/wireNum);
			ty = tHeight + wireHeight3*sin((startAngle3 + v_texCoord.x/(1.0/wireDurationNum3)) * 2.0* PI) ;
			wireSize = wireSize3;
		}
		
		
		
		//float ty = tHeight + wireHeight*sin((startAngle + i*10 + v_texCoord.x/(1.0/wireDurationNum)) * 2.0* PI) ;
		ty = 1.0-fract(ty);
		float dis = abs(v_texCoord.y - ty);
		
		if(v_Color.a > 0.3){
			if(dis <= wireSize){
				v_Color = vec4(1,1,1,1);
			}
			float maxSize = wireSize+glowSize;
			if(dis <=maxSize && dis > wireSize){
				//float alpha =  1.0 - smoothstep(wireSize, maxSize, dis);
				
				float alpha = 1.0 - dis / maxSize;
				
				v_Color = vec4(v_Color.r,v_Color.g,v_Color.b,1) + vec4(0.0 * alpha,0.8 * alpha,1.0 * alpha, 0);
			}
		}
	}
	gl_FragColor = v_Color;
	
}