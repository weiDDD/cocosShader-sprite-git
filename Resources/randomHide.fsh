///fsh为碎片shader,纹理的每个像素都会应用此shader,每个像素都会调用


varying vec4 v_fragmentColor;
varying vec2 v_texCoord;

uniform sampler2D Texture;
uniform float alpha;

void main()
{
	///首先获得 基础纹理的 每个像素的颜色
	vec4 v_color = texture2D(Texture , v_texCoord);
	vec4 v_color2 = texture2D(CC_Texture1 , v_texCoord);
	////
	//if(v_color2.r > alpha){
	//	gl_FragColor = vec4(v_color.rgb, v_color.a - v_color2.r + alpha ) ;
	//}
	//else{
		//gl_FragColor = vec4(v_color.rgb, v_color.a - v_color2.r - alpha) ;
		gl_FragColor = vec4(1.0, 1.0, 1.0, 0.0) ;
	//}
}