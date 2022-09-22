

#ifdef GL_ES
precision highp float;
#endif

////接收到的纹理顶点信息
////每一个像素执行时，会通过已经执行的顶点shader中的纹理坐标，
////差值出具体一个像素的纹理坐标，比如一个像素在最上一排像素的中间，则v_texCoord的x,y为0.5,0
varying vec2 v_texCoord;

uniform float height;
uniform float width;
uniform float start;

uniform float height2;
uniform float width2;
uniform float start2;

uniform float height3;
uniform float width3;
uniform float start3;


#define picWidth 400.0
#define picHeight 40.0
#define lightWidth 4.0
#define lightLength 20.0


void main(void)
{
	///线的中心
	float targetY = picHeight/2.0;
	float nowAngle = v_texCoord.x*picWidth * 180.0 / width +start;
	targetY = picHeight/2.0 + height*sin(radians(nowAngle));
	float dist = abs(v_texCoord.y*picHeight - targetY);
	float alpha = smoothstep(0.0,lightWidth/2.0,dist);
	alpha = 1.0 - alpha;
	if (alpha > 0.9){
		gl_FragColor = vec4(1,1,1,alpha);
	}
	else{
		gl_FragColor = vec4(0,0.9,1,alpha);
	}

	nowAngle = v_texCoord.x*picWidth * 180.0 / width3 +start3;
	targetY = picHeight/2.0 + height3*sin(radians(nowAngle));
	dist = abs(v_texCoord.y*picHeight - targetY);
	float alpha3 = smoothstep(0.0,lightWidth/2.0,dist);
	alpha3 = 1.0 - alpha3;
	if (alpha3 > 0.0){
		gl_FragColor = vec4(1,1,1,alpha3);
	}
	
	nowAngle = v_texCoord.x*picWidth * 180.0 / width2 +start2;
	targetY = picHeight/2.0 + height2*sin(radians(nowAngle));
	dist = abs(v_texCoord.y*picHeight - targetY);
	float alpha4 = smoothstep(0.0,lightWidth/2.0,dist);
	alpha4 = 1.0 - alpha4;
	if (alpha4 > 0.0){
		gl_FragColor = vec4(1,1,1,alpha4);
	}
	
	
	targetY = picHeight/2.0;
	dist = abs(v_texCoord.y*picHeight - targetY);
	float alpha2 = smoothstep(0.0,lightWidth/4.0,dist);
	alpha2 = 1.0 - alpha2;
	if (alpha2 > 0.0){
		gl_FragColor = vec4(1,1,1,alpha2);
	}
}

