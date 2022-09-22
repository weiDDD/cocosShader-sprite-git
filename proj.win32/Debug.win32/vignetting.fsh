

#ifdef GL_ES
precision highp float;
#endif

varying vec2 v_texCoord;


void main(void)
{
	
	vec2 disVec = vec2(v_texCoord.x-0.5,v_texCoord.y-0.5);
	float vig = clamp(3.0*length(disVec),0.0,1.0 );
   
	gl_FragColor = vec4(1,1,1,1-vig);  
}

