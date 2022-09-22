/*\
	modify by wss 2016/9/30
 本类，已经实现，
	1:地面草平铺效果，使用shader实现

*/

#ifndef GROUNDSURFACE_SHADER_SPRITE_H
#define GROUNDSURFACE_SHADER_SPRITE_H
#include "BaseDefine.h"

#include "cocos2d.h"
USING_NS_CC;

NS_DG_BEGIN;

////////整形转字符串

class GroundSurfaceShaderSprite : public Sprite{
public:
	GroundSurfaceShaderSprite();
	virtual ~GroundSurfaceShaderSprite();
	static GroundSurfaceShaderSprite* create(const std::string& filename);

	bool initWithTexture(Texture2D* pTexture,const CCRect& tRect);
	virtual void draw(Renderer* renderer,const Mat4 &transform,uint32_t flags) override;
	void onDraw(const Mat4& transform,uint32_t flags);

	////设置shader文件
	std::string vshName = "";
	std::string fshName = "";
	void setShaderFile(std::string vName, std::string fName){
		vshName = vName;
		fshName = fName;

		auto pProgram = GLProgram::createWithFilenames(vshName, fshName);
		///创建shaderstate  shader状态
		auto glprogramstate = GLProgramState::getOrCreateWithGLProgram(pProgram);
		///设置shader
		setGLProgramState(glprogramstate);
	}

	///用于纹理shader的顶点的顶点数据
	///顶点坐标
	std::vector<Vec2> _triangles;
	///纹理坐标
	std::vector<Vec2> _texCoords;

	///从外部传入的地面的点数据
	std::vector<Vec2> points;
	void setPoint( Vec2 pos){
		points.push_back(Vec2(pos.x, pos.y));
	}
	////初始化地面的网格信息
	void initSurfaceData();
	
	///shader 需要传递的参数
	Vec2 texSize = Vec2(0,0);
	void setTexSize(Vec2 size){
		texSize = size;
	}

protected:
	CustomCommand _customCommand;
private:
	
};

NS_DG_END

#endif