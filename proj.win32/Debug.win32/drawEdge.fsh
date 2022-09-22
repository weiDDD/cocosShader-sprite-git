///fsh为碎片shader,纹理的每个像素都会应用此shader,每个像素都会调用

///接收从vsh中传入的数据:顶点颜色
varying vec4 v_fragmentColor;
///接收从vsh中传入的数据:纹理坐标
///每一个像素执行时，会根据差值求出每个像素的具体纹理坐标
varying vec2 v_texCoord;
///C程序中传入的纹理数据
//uniform sampler2D Texture;

uniform float outlineSize;  ///描边线的宽度
uniform vec3 outlineColor;  ///描边颜色
uniform float circleLightAngle; ///描边的一个高亮角度
float angleRange = 10.0;          ///角度周围20度高亮

///找到了几个满足条件的角度
float findNum = 0.0;
float getIsStrokeWithAngel(float angle){
	float stroke = 0.0;
	float rad = angle * 0.01745329252;
	float a = texture2D(CC_Texture0,vec2(v_texCoord.x + outlineSize*cos(rad),v_texCoord.y + outlineSize*sin(rad) )).a;
	///距离，返回距离
	float dis = sqrt(pow(outlineSize*cos(rad),2.0)+ pow(outlineSize*sin(rad),2.0) );  
	
	if(a >= 0.5){
		stroke = dis;
		findNum++;
	}
	return stroke;
}


void main()
{
	///首先获得每个像素的颜色
	vec4 myC = texture2D(CC_Texture0 , v_texCoord);
	if(myC.a >= 0.5){
		gl_FragColor = v_fragmentColor*myC;
		return;
	}
	
	float strokeCount = 0.0;  
    strokeCount += getIsStrokeWithAngel(0.0);  
    strokeCount += getIsStrokeWithAngel(30.0);  
    strokeCount += getIsStrokeWithAngel(60.0);  
    strokeCount += getIsStrokeWithAngel(90.0);  
    strokeCount += getIsStrokeWithAngel(120.0);  
    strokeCount += getIsStrokeWithAngel(150.0);  
    strokeCount += getIsStrokeWithAngel(180.0);  
    strokeCount += getIsStrokeWithAngel(210.0);  
    strokeCount += getIsStrokeWithAngel(240.0);  
    strokeCount += getIsStrokeWithAngel(270.0);  
    strokeCount += getIsStrokeWithAngel(300.0);  
    strokeCount += getIsStrokeWithAngel(330.0);  
  
    if (strokeCount > 0.0) // 四周围至少有一个点是不透明的，这个点要设成描边颜色  
    {  
        myC = vec4(outlineColor,1 )*vec4(1,1,1,1.0-((strokeCount/findNum)/outlineSize)  );  
        ///判断当前的描边像素是否需要添加高亮色
		float disToCenter = sqrt(pow(v_texCoord.x-0.5 , 2.0 )+ pow(v_texCoord.y-0.5,2.0));
		float rad = circleLightAngle * 0.01745329252;
		vec2 anglePos = vec2(0.5 + disToCenter * cos(rad), 0.5 + disToCenter * sin(rad));
		float disToAnglePos = sqrt(pow(v_texCoord.x-anglePos.x , 2.0 )+ pow(v_texCoord.y-anglePos.y,2.0));
		
		float range = disToCenter*tan(angleRange/2.0*0.01745329252);
		
		if (disToAnglePos < range){
			myC+=vec4(1,0,1,1);
		}
		
		//myC.a = 1.0;  
    }  
  
    gl_FragColor = v_fragmentColor * myC;  
}