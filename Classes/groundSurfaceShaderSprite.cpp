#include "groundSurfaceShaderSprite.h"
USING_NS_CC;

#include "BaseDefine.h"
NS_DG_BEGIN;

GroundSurfaceShaderSprite::GroundSurfaceShaderSprite(){

}
GroundSurfaceShaderSprite::~GroundSurfaceShaderSprite(){
}


GroundSurfaceShaderSprite* GroundSurfaceShaderSprite::create(const std::string& filename){
	GroundSurfaceShaderSprite* sprite = new GroundSurfaceShaderSprite();
	if (sprite && sprite->initWithFile(filename)){
		sprite->autorelease();
		return sprite;
	}
	CC_SAFE_DELETE(sprite);
	return NULL;
}

void GroundSurfaceShaderSprite::initSurfaceData(){
	std::vector<Vec2>::iterator itor = points.begin();
	while (itor != points.end()){
		///将路线的点转换成纹理网格
		_triangles.push_back(Vec2((*itor).x, (*itor).y + 34));
		_texCoords.push_back(Vec2((*itor).x / texSize.x, 0));
		_triangles.push_back(Vec2((*itor).x, (*itor).y - 54));
		_texCoords.push_back(Vec2((*itor).x / texSize.x, 1));
		itor++;
	}

}

/////////////////////////

bool GroundSurfaceShaderSprite::initWithTexture(CCTexture2D* pTexture, const CCRect& tRect){
	do {
		CC_BREAK_IF(!Sprite::initWithTexture(pTexture, tRect));
		
		/*if (vshName == ""){
			return true;
		}*/

		//auto pProgram = GLProgram::createWithFilenames(vshName, fshName);

		///鍒涘缓shaderstate  shader鐘舵€?
		//auto glprogramstate = GLProgramState::getOrCreateWithGLProgram(pProgram);
		///璁剧疆shader
		//setGLProgramState(glprogramstate);

		CHECK_GL_ERROR_DEBUG();
		return true;

	} while (0);
	return false; 

	

}

void GroundSurfaceShaderSprite::draw(Renderer* renderer, const Mat4 &transform, uint32_t flags){
	_customCommand.init(_globalZOrder);
	_customCommand.func = CC_CALLBACK_0(GroundSurfaceShaderSprite::onDraw, this, transform, flags);
	renderer->addCommand(&_customCommand);

}

void GroundSurfaceShaderSprite::onDraw(const Mat4& transform, uint32_t flags){
	
	if (_triangles.size() == 0 && texSize.x != 0){
		initSurfaceData();
		return;
	}

	///鑾峰彇shaderstate
	auto glProgramState = getGLProgramState();
	///璁剧疆uniform鏁板€硷紝涔熷氨鏄紶鍏hader涓殑uniform鍊?
	//if (vshName == "ground_surface.vsh")
		//glProgramState->setUniformVec2("u_texSize", texSize);

	///搴旂敤GLProgram,椤剁偣灞炴€у拰Uniform鍙傛暟鍒版覆鏌撶绾?
	glProgramState->apply(transform);
	///璁剧疆娣峰悎妯″紡
	GL::blendFunc(_blendFunc.src,_blendFunc.dst);
	BlendFunc cbl = { GL_ONE, GL_ONE_MINUS_SRC_ALPHA };//
	this->setBlendFunc(cbl);

	GL::bindTexture2D(_texture->getName());
	////设置纹理的滚动平铺
	Texture2D::TexParams texParams;
	texParams.magFilter = GL_LINEAR;
	texParams.minFilter = GL_LINEAR;
	texParams.wrapS = GL_REPEAT;
	texParams.wrapT = GL_REPEAT;
	_texture->setTexParameters(texParams);

	////婵€娲诲悕瀛椾负position,color,texture鐨剉ertex attribute
	GL::enableVertexAttribs(GL::VERTEX_ATTRIB_FLAG_POS_COLOR_TEX);
	//GL::enableVertexAttribs(GL::VERTEX_ATTRIB_FLAG_POSITION);  
	//GL::enableVertexAttribs(GL::VERTEX_ATTRIB_FLAG_TEX_COORD);
	////_quad 鏁版嵁鏄湪Sprite绫荤殑initWithTexture(Texture2D,Rect,bool) 涓祴鍊肩殑

#define kQuadSize sizeof(_quad.bl)
	size_t offset = (size_t)&_quad;

	/////涓嬮潰搴旇鍦ㄥ悜椤剁偣shader浼犻€掓暟鎹?
	///vertex
	int diff = offsetof(V3F_C4B_T2F, vertices);


	///涓轰綅缃畃osition鎸囧畾鏁版嵁婧?
	glVertexAttribPointer(GLProgram::VERTEX_ATTRIB_POSITION, 2, GL_FLOAT, GL_FALSE, sizeof(Vec2), &_triangles[0]);
	///texCoods
	diff = offsetof(V3F_C4B_T2F,texCoords);
	///涓虹汗鐞?榛樿绾圭悊) 鎸囧畾鏁版嵁婧?
	glVertexAttribPointer(GLProgram::VERTEX_ATTRIB_TEX_COORD, 2, GL_FLOAT, GL_FALSE, sizeof(Vec2), &_texCoords[0]);

	///color
	diff = offsetof(V3F_C4B_T2F, colors);
	///涓洪鑹?鎸囧畾鏁版嵁婧?
	//glVertexAttribPointer(GLProgram::VERTEX_ATTRIB_COLOR, 4, GL_UNSIGNED_BYTE, GL_TRUE, kQuadSize, (void*)(offset + diff));
	//缁樺埗涓夎褰紝鎵€璋撶殑draw call灏辨槸鎸囪繖涓嚱鏁扮殑璋冪敤
	glDrawArrays(GL_TRIANGLE_STRIP, 0, _triangles.size());
	CHECK_GL_ERROR_DEBUG();
	//閫氱煡cocos2d-x鐨剅ender,璁╁畠鍦ㄥ悎閫傜殑鏃跺€欒皟鐢ㄨ繖浜汷pengl鍛戒护
	CC_INCREMENT_GL_DRAWN_BATCHES_AND_VERTICES(1, _triangles.size() );
}


NS_DG_END