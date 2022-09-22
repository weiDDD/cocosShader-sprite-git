#ifdef GL_ES
precision mediump float;
#endif

///顶点的位置
attribute vec4 a_position;
///返回纹理坐标，左上角(0,0)右上角(1,0)...
attribute vec2 a_texCoord;
///顶点的颜色
attribute vec4 a_color;

///传递给片段shader的顶点信息
varying vec2 v_texCoord;
                  
void main() 
{                           
    gl_Position = CC_MVPMatrix * a_position;
    v_texCoord = a_texCoord;
}