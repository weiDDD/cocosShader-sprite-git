///fsh为碎片shader,纹理的每个像素都会应用此shader,每个像素都会调用

///接收从vsh中传入的数据:顶点颜色
varying vec4 v_fragmentColor;
///接收从vsh中传入的数据:纹理坐标
///每一个像素执行时，会根据差值求出每个像素的具体纹理坐标
varying vec2 v_texCoord;
///C程序中传入的纹理数据
uniform sampler2D Texture;
//uniform mat4 fiterMat;
uniform int offset;
void main()
{
	float space = 1.0 / 100.0;
	
	int xnum = int(v_texCoord.x / space);
	float u = xnum * space;
	float u_next = (xnum + 1) * space;
	if(u_next > 1.0){
		u_next = 1.0;
	}
	int randomNum_u = mod((xnum * 13 + 7 + offset) , 100);
	float tar_u = u + (randomNum_u / 100.0) * (u_next - u);
	
	int ynum = int(v_texCoord.y / space);
	float v = ynum * space;
	float v_next = (ynum + 1) * space;
	if(v_next > 1.0){
		v_next = 1.0;
	}
	int randomNum_v = mod((ynum * 15 + 9 + offset) , 100);
	float tar_v = v + (randomNum_v / 100.0) * (v_next - v);
	
	///首先获得每个像素的颜色
	vec4 v_orColor = texture2D(Texture , vec2(tar_u, tar_v));

	///将点乘后的颜色值，给全局gl_FragColor
	gl_FragColor = v_orColor;
	
	
}