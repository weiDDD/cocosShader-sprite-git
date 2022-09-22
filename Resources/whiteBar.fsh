///fsh为碎片shader,纹理的每个像素都会应用此shader,每个像素都会调用


varying vec4 v_fragmentColor;
varying vec2 v_texCoord;

uniform sampler2D Texture;
uniform float time;

///第二层纹理，横竖方向上的速度
float hSpeed = 0.3;
float vSpeed = 0.3;

float scale = 2;
void main()
{
	///首先获得 基础纹理的 每个像素的颜色
	vec4 v_color = texture2D(Texture , v_texCoord);
	///第二层纹理的颜色值
	vec2 coord2 = vec2(0.5 + v_texCoord.x / scale ,0.25 + v_texCoord.y / scale );
	
	coord2.x -= hSpeed * time;
	while(coord2.x < 0.0){
		coord2.x+=1.0;
	}
	//coord2.y -= vSpeed * time;
	//while(coord2.y < 0.0){
	//	coord2.y+=1.0;
	//}
	vec4 v_color2 = texture2D(CC_Texture1 , coord2);
	////
	if (v_color2.a > 0.0){
		
		v_color *= vec4(1.5,1.5,1.5,1);
		
	}
	gl_FragColor = v_color;
}