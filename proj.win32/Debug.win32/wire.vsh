#ifdef GL_ES
precision mediump float;
#endif

///vsh为顶点shader，每个绘制顶点像素调用一次

///attribute类型和uniform数据  为外部传入的数据，可以理解为C++程序传入的
///顶点的位置
attribute vec4 a_position;

attribute vec2 a_texCoord;

attribute vec4 a_color;

varying vec2 v_texCoord;
                                 
void main() 
{                  
	///设置全局顶点的位置
    gl_Position = CC_MVPMatrix * a_position;
	///设置将要传出的数据:顶点坐标
    v_texCoord = a_texCoord;
}