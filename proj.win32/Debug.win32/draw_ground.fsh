///fsh为碎片shader,纹理的每个像素都会应用此shader,每个像素都会调用

///接收从vsh中传入的数据:顶点颜色
varying vec4 v_fragmentColor;
///接收从vsh中传入的数据:纹理坐标
///每一个像素执行时，会根据差值求出每个像素的具体纹理坐标
varying vec2 v_texCoord;
///C程序中传入的纹理数据
uniform sampler2D Texture;

uniform int linePointNum;
uniform vec2 linePoint1;
uniform vec2 linePoint2;
uniform vec2 linePoint3;
uniform vec2 linePoint4;
uniform vec2 linePoint5;
uniform vec2 linePoint6;
uniform vec2 linePoint7;
uniform vec2 linePoint8;
uniform vec2 linePoint9;
uniform vec2 linePoint10;
uniform vec2 linePoint11;
uniform vec2 linePoint12;
uniform vec2 linePoint13;
uniform vec2 linePoint14;
uniform vec2 linePoint15;
uniform vec2 linePoint16;
uniform vec2 linePoint17;
uniform vec2 linePoint18;
uniform vec2 linePoint19;
uniform vec2 linePoint20;

vec2 getPointByInt(int index){
	if(index == 1){
		return linePoint1;
	}
	else if(index == 2){
		return linePoint2;
	}
	else if(index == 3){
		return linePoint3;
	}
	else if(index == 4){
		return linePoint4;
	}
	else if(index == 5){
		return linePoint5;
	}
	else if(index == 6){
		return linePoint6;
	}
	else if(index == 7){
		return linePoint7;
	}
	else if(index == 8){
		return linePoint8;
	}
	else if(index == 9){
		return linePoint9;
	}
	else if(index == 10){
		return linePoint10;
	}
	else if(index == 11){
		return linePoint11;
	}
	else if(index == 12){
		return linePoint12;
	}
	else if(index == 13){
		return linePoint13;
	}
	else if(index == 14){
		return linePoint14;
	}
	else if(index == 15){
		return linePoint15;
	}
	else if(index == 16){
		return linePoint16;
	}
	else if(index == 17){
		return linePoint17;
	}
	else if(index == 18){
		return linePoint18;
	}
	else if(index == 19){
		return linePoint19;
	}
	else if(index == 20){
		return linePoint20;
	}
}

float faceSize = 0.006;

void main()
{
	///首先获得每个像素的颜色
	vec4 v_orColor = v_fragmentColor * texture2D(Texture , v_texCoord);
	///然后把这个颜色的rgb点乘上vec3(0.3,0.59,0.11)
	//float gray = dot(v_orColor.rgb, vec3(0.3,0.59,0.11));
	///将点乘后的颜色值，给全局gl_FragColor
	
	for (int i=0;i<linePointNum - 1;i++){
		vec2 startPoint = getPointByInt(i+1);
		vec2 endPoint = getPointByInt(i+2);
		
		if ( v_texCoord.x >= min(startPoint.x,endPoint.x) && v_texCoord.x <= max(startPoint.x,endPoint.x) ){
			float k = (endPoint.y - startPoint.y) / (endPoint.x - startPoint.x);
			float b = startPoint.y - k * startPoint.x;
			
			float lineY = v_texCoord.x*k + b;
			if (v_texCoord.y < lineY){
				v_orColor = vec4(0,0,0,0);
			}
			
			//float dis = abs(v_texCoord.y - lineY);
			//if (dis < faceSize){
			//	v_orColor = vec4(0.7,0.5,1, 1.0 - (dis / faceSize) );
			//}
			
		}
		
	}
	
	gl_FragColor = vec4(v_orColor.rgb,v_orColor.a);
}

