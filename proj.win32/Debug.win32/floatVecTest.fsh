///fsh为碎片shader,纹理的每个像素都会应用此shader,每个像素都会调用

#ifdef GL_ES
precision highp float;
#endif

///接收从vsh中传入的数据:顶点颜色
varying vec4 v_fragmentColor;
///接收从vsh中传入的数据:纹理坐标
///每一个像素执行时，会根据差值求出每个像素的具体纹理坐标
varying vec2 v_texCoord;
///C程序中传入的纹理数据
uniform sampler2D Texture;

const int vecSize = 5;
uniform float colorGap[vecSize];

void main()
{
	///首先获得每个像素的颜色
	vec4 v_orColor = v_fragmentColor * texture2D(Texture , v_texCoord);
	
	float colorWidth = 0.05;
	for(int i=0;i<vecSize;i++){
		if (v_texCoord.x >= colorGap[i]-colorWidth/2 && v_texCoord.x <= colorGap[i]+colorWidth/2){
			v_orColor = vec4(1.0,1.0,0.0,1.0);
		}
	}
	
	gl_FragColor = v_orColor;
	
}