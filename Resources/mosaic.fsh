///fsh为碎片shader,纹理的每个像素都会应用此shader,每个像素都会调用

///接收从vsh中传入的数据:顶点颜色
varying vec4 v_fragmentColor;
///接收从vsh中传入的数据:纹理坐标
///每一个像素执行时，会根据差值求出每个像素的具体纹理坐标
varying vec2 v_texCoord;
///C程序中传入的纹理数据
uniform sampler2D Texture;
//uniform mat4 fiterMat;
void main()
{
	//float num = 0.05;
	
	//int xnum = int(v_texCoord.x / num);
	//float u = xnum * num;
	
	//int ynum = int(v_texCoord.y / num);
	//float v = ynum * num;
	
	///首先获得每个像素的颜色
	vec4 v_orColor = v_fragmentColor * texture2D(Texture , v_texCoord);

	///将点乘后的颜色值，给全局gl_FragColor
	gl_FragColor = v_orColor;
	
	
}