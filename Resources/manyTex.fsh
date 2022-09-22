///fsh为碎片shader,纹理的每个像素都会应用此shader,每个像素都会调用

///接收从vsh中传入的数据:顶点颜色
varying vec4 v_fragmentColor;
///接收从vsh中传入的数据:纹理坐标
///每一个像素执行时，会根据差值求出每个像素的具体纹理坐标
varying vec2 v_texCoord;

void main()
{
	vec4 color1 = texture2D(CC_Texture0 , v_texCoord);
	vec4 color2 =  texture2D(CC_Texture1 , v_texCoord);
	color1.a = 0.5;
	color2.a = 1;
	gl_FragColor = color1 + color2/2;
}