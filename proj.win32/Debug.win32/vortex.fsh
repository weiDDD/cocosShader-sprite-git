

#ifdef GL_ES
precision highp float;
#endif

varying vec2 v_texCoord;

uniform	float radius ;//旋转的半径
	uniform	float angle ;//旋转的角度
	//旋涡的计算函数
	vec2 vortex( vec2 uv )
	{
		//先减去贴图中心点的纹理坐标,这样是方便旋转计算
		uv -= vec2(0.5, 0.5);
		//计算当前坐标与中心点的距离。
		float dist = length(uv);
		//计算出旋转的百分比
		float percent = (radius - dist) / radius;
		if ( percent <= 1.0 && percent >= 0.0) //小于半径的区域才进行旋转
		{
			//通过sin,cos来计算出旋转后的位置。(这里我还不明白具体的原理，为什么通过这个计算可以得到旋转后的uv坐标，知道原理的同学可以联系我：-）)
			float theta = percent * percent * angle * 0.5;
			float s = sin(theta);
			float c = cos(theta);
			uv = vec2(dot(uv, vec2(c, -s)), dot(uv, vec2(s, c)));
		}
		//再加上贴图中心点的纹理坐标，这样才正确。
		uv += vec2(0.5, 0.5);
		return uv;
	}

void main(void)
{
	
	gl_FragColor = texture2D( CC_Texture0, vortex( v_texCoord ) );
	
}

