

#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D Texture;
uniform float radius;
uniform vec2 center;
uniform vec4 centerColor;
uniform vec4 maskColor;


////接收到的纹理顶点信息
////每一个像素执行时，会通过已经执行的顶点shader中的纹理坐标，
////差值出具体一个像素的纹理坐标，比如一个像素在最上一排像素的中间，则v_texCoord的x,y为0.5,0
varying vec2 v_texCoord;

float get_mask(float _radius, vec2 _pos, vec2 _center)
{
    float dist = distance(_pos, _center);
    if (dist <= _radius)
    {
        return 1.0-smoothstep(0.9*radius, radius , dist);
    }
    return 0.0;
}

void main(void)
{
    //vec2 aspe = screenSize/resolution;
    
	vec4 mColor = texture2D(Texture , v_texCoord);
    vec4 tc = maskColor;
	////gl_FragCoord中的坐标为纹理在屏幕上的绝对坐标。
    float mask = get_mask(radius , v_texCoord.xy, center);
    
	
	if (mask == 0.0){
		gl_FragColor = maskColor;
	}
	else{
		gl_FragColor = mix(mColor,centerColor,0.3);
		gl_FragColor.a = mask;
	}
	
    //if(coefficient.x == 0.0)
		
    //   gl_FragColor = vec4(tc * mask * color);
    //else
        //gl_FragColor = vec4(tc*(1.0 - coefficient.x*mask*color));
	
	//if (v_texCoord.x*500.0 < 250.0)
	//{
	//	gl_FragColor = vec4(1,0,0,0.5);
	//}
	//else{
	//	gl_FragColor = vec4(0,1,0,1);
	//}
		
}

