varying vec4 v_fragmentColor;   
varying vec2 v_texCoord;  
  
uniform float u_rippleDistance;  
uniform float u_rippleRange;  
  
float waveHeight(vec2 p) {  
    float ampFactor = 2;  
    float distFactor = 2;  
    float dist = length(p);  
    float delta = abs(u_rippleDistance - dist);  
    if (delta <= u_rippleRange) {  
        return cos((u_rippleDistance - dist) * distFactor) * (u_rippleRange - delta) * ampFactor;  
    }  
    else {  
        return 0;  
    }  
}  
  
void main() {  
	vec2 texCoordTem = v_texCoord;
    vec2 p = v_texCoord - vec2(0.5, 0.5);  
    vec2 normal = normalize(p);  
    // offset texcoord along dist direction  
    texCoordTem += normal * waveHeight(p);  
      
    gl_FragColor = texture2D(CC_Texture0, texCoordTem) * v_fragmentColor;  
}  