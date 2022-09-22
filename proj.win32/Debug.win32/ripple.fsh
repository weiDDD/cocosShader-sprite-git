///fsh为碎片shader,纹理的每个像素都会应用此shader,每个像素都会调用


varying vec4 v_fragmentColor;
varying vec2 v_texCoord;

uniform sampler2D Texture;
uniform float time;
void main()
{
	
	float timeTem = mod(time,5.0);
	///首先获得每个像素的颜色
	vec4 v_color = texture2D(Texture , v_texCoord);
	
	float disToCenter = distance( v_texCoord , vec2(0.5,0.5));
	float frequency = 0.3;   //2PI 的周期长度
	float intensity = 0.01;   //最高的偏移量
	////涟漪效果
	//vec2 newCoord = vec2(v_texCoord.x + intensity * cos((disToCenter/frequency - time) * 2.0 * 3.1415926) ,v_texCoord.y + intensity * cos((disToCenter/frequency-time) * 2.0 * 3.1415926) );
	
	vec2 newCoord = vec2(v_texCoord.x + intensity * cos((disToCenter/frequency - timeTem) * 2.0 * 3.1415926) ,v_texCoord.y - intensity * cos((disToCenter/frequency+timeTem) * 2.0 * 3.1415926) );
	
	
	//vec2 newCoord = vec2(v_texCoord.x + intensity*(1.0-v_texCoord.x) * cos((disToCenter/frequency - time) * 2.0 * 3.1415926) ,v_texCoord.y );
	
	gl_FragColor = texture2D(Texture,newCoord);
	
}