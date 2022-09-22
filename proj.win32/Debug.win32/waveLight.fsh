///fsh为碎片shader,纹理的每个像素都会应用此shader,每个像素都会调用


///接收从vsh中传入的数据:纹理坐标
///每一个像素执行时，会根据差值求出每个像素的具体纹理坐标
varying vec2 v_texCoord;

uniform vec4 v_LightColor;
uniform vec2 v_animLight;

uniform float wireHeight;
uniform float startAngle;
uniform float wireDurationNum;
uniform float startHeight;

void main()
{
	float tx = v_texCoord.x + v_animLight.x;
	tx = fract(tx);
	float ty = v_texCoord.y + v_animLight.y;
	ty = fract(ty);
	vec2 tPos = vec2(tx,ty);
	
	vec4 targetColor = vec4(0,0,0,0);
	vec4 lightColor = texture2D(CC_Texture1 , tPos);
	vec4 dstColor = texture2D(CC_Texture0,v_texCoord);
	if(dstColor.a > 0){
		targetColor =  dstColor + lightColor*v_LightColor;
	}
	else{
		targetColor =  dstColor;
	}
	
	float PI = 3.1415926;
	float tHeight = fract(startHeight);
	float targetY = tHeight + wireHeight*sin((startAngle + v_texCoord.x/(1/wireDurationNum)) * 2* PI) ;
	targetY = 1-fract(targetY);
	float dis = abs(v_texCoord.y - targetY);
	
	if(targetColor.a > 0){
		if(v_texCoord.y < targetY){
			targetColor = vec4(0,0,0,0);
		}
	}
	gl_FragColor = targetColor;
	
}