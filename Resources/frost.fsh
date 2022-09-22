///fsh为碎片shader,纹理的每个像素都会应用此shader,每个像素都会调用


varying vec4 v_fragmentColor;
varying vec2 v_texCoord;

uniform sampler2D Texture;
uniform float time;
void main()
{
	///首先获得 基础纹理的 每个像素的颜色
	vec4 v_color = texture2D(Texture , v_texCoord);
	vec4 v_color2 = texture2D(CC_Texture1 , v_texCoord);
	
	float disToCenter = distance( v_texCoord , vec2(0,1));
	float frequency = 0.3;   //2PI 的周期长度
	float intensity = 0.025;   //最高的偏移量
	////涟漪效果
	//vec2 newCoord = vec2(v_texCoord.x + intensity * cos((disToCenter/frequency - time) * 2.0 * 3.1415926) ,v_texCoord.y + intensity * cos((disToCenter/frequency-time) * 2.0 * 3.1415926) );
	
	vec2 newCoord = vec2(v_texCoord.x + intensity * cos((disToCenter/frequency - time) * 2.0 * 3.1415926) ,v_texCoord.y - intensity * cos((disToCenter/frequency+time) * 2.0 * 3.1415926) );
	
	
	//vec2 newCoord = vec2(v_texCoord.x + intensity*(1.0-v_texCoord.x) * cos((disToCenter/frequency - time) * 2.0 * 3.1415926) ,v_texCoord.y );
	
	if(v_color.a > 0.1){
	    vec4 newColor = texture2D(CC_Texture1,newCoord);
		//newColor += vec4(1.0 * abs(newCoord.x - v_texCoord.x)/intensity,1.0* abs(newCoord.x - v_texCoord.x)/intensity,1.0* abs(newCoord.x - v_texCoord.x)/intensity,1.0 * abs(newCoord.x - v_texCoord.x)/intensity);
		
		newColor += vec4(1.6,1.6,1.6,0);
		newColor.a = 1.0 * abs(newCoord.x - v_texCoord.x)/intensity;
		//newColor.a = 0;
		v_color -= vec4(0.5,0.5,0.5,0);
		gl_FragColor = mix(v_color,newColor,0.5);
	}
	else{
		gl_FragColor = v_color;
	}
	
	
	
}