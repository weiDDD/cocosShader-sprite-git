//#ifdef GL_ES
//precision highp float;
//#endif


varying vec4 v_fragmentColor;   
varying vec2 v_texCoord;  
  
const int maxTouchPointNum = 50;

uniform float cw;
uniform float ch;

uniform float rippleSpeed;
uniform float rippleRange;
uniform int touchPointNum;
uniform float touchPointX[maxTouchPointNum];
uniform float touchPointY[maxTouchPointNum];
uniform float touchPointTime[maxTouchPointNum];
uniform float touchPointLiveTime[maxTouchPointNum];

float PI = 3.1415926;

float waveHeight(vec2 p) {  
    /*float ampFactor = 2;  
    float distFactor = 2;  
    float dist = length(p);  
    float delta = abs(u_rippleDistance - dist);  
    if (delta <= u_rippleRange) {  
        return cos((u_rippleDistance - dist) * distFactor) * (u_rippleRange - delta) * ampFactor;  
    }  
    else {  
        return 0;  
    }  */
	
	///
	float maxWH = max(cw,ch);
	
	float height = 0.0;
	float maxHeight = 1.5;
	float everMaxHeight = 0.3;
	for (int i=0;i<touchPointNum;i++){
		vec2 touchPoint = vec2(touchPointX[i], touchPointY[i]);
	
		float dis = length( v_texCoord.xy * vec2(cw,ch) - touchPoint ) ; 
		
		float nowRippleSpeed = rippleSpeed * (2.0 - 0.9*(touchPointTime[i] / touchPointLiveTime[i]));
		
		float nowRippleRange = rippleRange * (1.0 - 0.9*(touchPointTime[i] / touchPointLiveTime[i]));
		
		float nowRippleDis = nowRippleSpeed * touchPointTime[i];
		
		float delta = abs(nowRippleDis - dis);  
		
		//// 经过的地方需要作弱化高度摆动
		if( dis < nowRippleDis ){
			float speedTime = (nowRippleDis - dis) / rippleSpeed / 3;
			float speedTimeCol = speedTime / (0.05*touchPointLiveTime[i]);
			
			if(speedTimeCol > 1.0){
				speedTimeCol = 1.0;
			}
			
			float addHeight = everMaxHeight * (1.0-speedTimeCol) * cos(speedTime / (0.03*touchPointLiveTime[i]) * 2.0*PI);
			
			height += cos((nowRippleDis - dis)/ maxWH * addHeight) * (nowRippleRange - delta) / maxWH * addHeight;  	
		}
		
		if(delta <= nowRippleRange){
			height += cos((nowRippleDis - dis)/ maxWH * everMaxHeight) * (nowRippleRange - delta) / maxWH * everMaxHeight;  			
		}
		
		if(height > maxHeight){
			height = maxHeight;
		}
	}
	return height;
}  
  
void main() {  
	vec2 texCoordTem = v_texCoord;
    vec2 p = v_texCoord - vec2(0.5, 0.5);  
    vec2 normal = normalize(p);  
    // offset texcoord along dist direction  
    texCoordTem += normal * waveHeight(p);  
      
    gl_FragColor = texture2D(CC_Texture0, texCoordTem) * v_fragmentColor;  
}  