///fsh为碎片shader,纹理的每个像素都会应用此shader,每个像素都会调用

///接收从vsh中传入的数据:纹理坐标
///每一个像素执行时，会根据差值求出每个像素的具体纹理坐标
varying vec2 v_texCoord;

uniform float wireHeight;
uniform float startAngle;
uniform float wireDurationNum;
uniform float startHeight;

void main()
{
	float PI = 3.1415926;
	vec4 v_Color = texture2D(CC_Texture0 ,v_texCoord );
	float tHeight = fract(startHeight);
	//float ty = tHeight + wireHeight*sin((startAngle + v_texCoord.x/(1.0/wireDurationNum)) * 2.0* PI) ;
	float ty = tHeight + wireHeight*sin((startAngle + v_texCoord.x/(1.0/wireDurationNum)) * 2.0* PI) ;
	ty = 1.0-fract(ty);
	float dis = abs(v_texCoord.y - ty);

	
	if(v_Color.a > 0.0){
		if(v_texCoord.y < ty){
			v_Color = vec4(0,0,0,0);
		}
	}
	//v_Color.a = 0;
	gl_FragColor = v_Color;
}