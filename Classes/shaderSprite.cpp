#include "shaderSprite.h"
USING_NS_CC;

ShaderSprite::ShaderSprite(){
	texture = nullptr;
}
ShaderSprite::~ShaderSprite(){
	if (texture) {
		texture->release();
	}
}


ShaderSprite* ShaderSprite::create(const std::string& filename){
	ShaderSprite* sprite = new ShaderSprite();
	if (sprite && sprite->initWithFile(filename)){
		sprite->autorelease();
		return sprite;
	}
	CC_SAFE_DELETE(sprite);
	return NULL;
}

ShaderSprite* ShaderSprite::createWithTexture(CCTexture2D* tex){

	ShaderSprite *sprite = new ShaderSprite();
	Rect rect = Rect::ZERO;
	rect.size = tex->getContentSize();
	if (sprite && sprite->initWithTexture(tex, rect))
	{
		//sprite->init();
		sprite->autorelease();
		return sprite;
	}
	CC_SAFE_DELETE(sprite);
	return nullptr;
}
/////////////////////////


bool ShaderSprite::initWithTexture(CCTexture2D* pTexture, const CCRect& tRect){
	do {
		CC_BREAK_IF(!Sprite::initWithTexture(pTexture, tRect));

		///��ʼ��shader�ļ��͵ڶ�������
		//auto pProgram = GLProgram::createWithFilenames("godLight.vsh", "godLight.fsh");

		//tex = Director::getInstance()->getTextureCache()->addImage("frostBg.png")->getName();		

		///����shaderstate  shader״̬
		//auto glprogramstate = GLProgramState::getOrCreateWithGLProgram(pProgram);
		///����shader
		//setGLProgramState(glprogramstate);

	
		CHECK_GL_ERROR_DEBUG();
		return true;

	} while (0);
	return false; 

	

}



void ShaderSprite::draw(Renderer* renderer, const Mat4 &transform, uint32_t flags){
	_customCommand.init(_globalZOrder);
	_customCommand.func = CC_CALLBACK_0(ShaderSprite::onDraw,this,transform,flags);
	renderer->addCommand(&_customCommand);

}

void ShaderSprite::onDraw(const Mat4& transform,uint32_t flags){
	///��ȡshaderstate
	auto glProgramState = getGLProgramState();

	/////�������еĲ���map��������ֵ
	std::map <std::string, float>::iterator floatItor = floatArgMap.begin();
	while (floatItor != floatArgMap.end()){
		std::string argKeyName = floatItor->first;
		float value = floatItor->second;
		glProgramState->setUniformFloat(argKeyName, value);
		floatItor++;
	}

	std::map <std::string, int>::iterator intItor = intArgMap.begin();
	while (intItor != intArgMap.end()){
		std::string argKeyName = intItor->first;
		int value = intItor->second;
		glProgramState->setUniformInt(argKeyName, value);
		intItor++;
	}

	std::map <std::string, Vec2>::iterator vec2Itor = vec2ArgMap.begin();
	while (vec2Itor != vec2ArgMap.end()){
		std::string argKeyName = vec2Itor->first;
		Vec2 value = vec2Itor->second;
		glProgramState->setUniformVec2(argKeyName, value);
		vec2Itor++;
	}

	std::map <std::string, Vec3>::iterator vec3Itor = vec3ArgMap.begin();
	while (vec3Itor != vec3ArgMap.end()){
		std::string argKeyName = vec3Itor->first;
		Vec3 value = vec3Itor->second;
		glProgramState->setUniformVec3(argKeyName, value);
		vec3Itor++;
	}

	std::map <std::string, Vec4>::iterator vec4Itor = vec4ArgMap.begin();
	while (vec4Itor != vec4ArgMap.end()){
		std::string argKeyName = vec4Itor->first;
		Vec4 value = vec4Itor->second;
		glProgramState->setUniformVec4(argKeyName, value);
		vec4Itor++;
	}

	
	///Ӧ��GLProgram,�������Ժ�Uniform��������Ⱦ����
	glProgramState->apply(transform);

	// ���� , �������ŵ�apply�ĺ����Ǹ�
	std::map <std::string, floatVec>::iterator floatVecItor = floatVecArgMap.begin();
	while (floatVecItor != floatVecArgMap.end()) {
		std::string argKeyName = floatVecItor->first;
		floatVec value = (floatVec)floatVecItor->second;
		GLint loc = glGetUniformLocation(getGLProgram()->getProgram(), argKeyName.c_str()); //glProgramState->getGLProgram()->getUniformLocation(argKeyName);

																							//const float test[5] = { 0.2f,0.4f,0.6f,0.8f,1.0f };
		glUniform1fv(loc, (GLsizei)value.size, (const GLfloat *)value.vec); // ����1��float���͵�v���������飩
																			//getGLProgram()->setUniformLocationWith1fv(loc , (const GLfloat*)test , (GLsizei)3);  // setUniformLocationWith1fv
		floatVecItor++;
	}

	///���û��ģʽ
	GL::blendFunc(_blendFunc.src,_blendFunc.dst);
	//BlendFunc cbl = { GL_ONE, GL_ONE_MINUS_SRC_ALPHA };//��Ҳ��֪������ʱ���˸�������ģʽ
	//this->setBlendFunc(cbl);

	GL::bindTexture2D(_texture->getName());
	////��������Ϊposition,color,texture��vertex attribute
	GL::enableVertexAttribs(GL::VERTEX_ATTRIB_FLAG_POS_COLOR_TEX);

	////_quad ��������Sprite���initWithTexture(Texture2D,Rect,bool) �и�ֵ��

	


#define kQuadSize sizeof(_quad.bl)
	size_t offset = (size_t)&_quad;

	/////����Ӧ�����򶥵�shader��������
	///vertex
	int diff = offsetof(V3F_C4B_T2F, vertices);
	
	///glVertexAttribPointerΪ��ɫ����ָ���ı�������ÿ���������Լ�����Ԫ�ص�ֵ��ȡֵָ����ʼλ�á�
	///������⣺
	///1.index:      ָ��Ҫ�޸ĵĶ������Ե�����ֵ
	///2.size:       ָ��ÿ���������Ե������������position�ɣ�x,y,z�������Ϊ3��color�ɣ�r,g,b,a�������Ϊ4
	///3.type:       ָ��������ÿ��������������ͣ�����position�е�x,y,z��ʲô���͵ġ�
	///4.normalized: ָ����������ʱ���̶�������ֵӦ�ñ���һ��(GL_TRUE ) ��ֱ��ת��Ϊ�̶�ֵ (GL_FALSE)
	///5.stride:     ָ��������������֮���ƫ������V3F_C4B_T2F_Quad��������4��V3F_C4B_T2F���͵����ϣ����ϣ����£����£��ĸ���������ݣ�ÿ��V3F_C4B_T2F������vertices��color��texcoord���ݣ��������Դӵ�һ�����ϵ��е�V3F_C4B_T2F�е�vertices������һ�����ϵ��е�V3F_C4B_T2F�е�vertices�����Ϊһ��V3F_C4B_T2F���ͳ���
	///6.pointer:    ָ����һ�����������ĵ�һ�����������е�ƫ������Ӧ�þ���
	///Ϊλ��positionָ������Դ
	glVertexAttribPointer(GLProgram::VERTEX_ATTRIB_POSITION, 3, GL_FLOAT, GL_FALSE, kQuadSize, (void*)(offset + diff));
	///texCoods
	diff = offsetof(V3F_C4B_T2F,texCoords);
	///Ϊ����(Ĭ������) ָ������Դ
	glVertexAttribPointer(GLProgram::VERTEX_ATTRIB_TEX_COORD, 2, GL_FLOAT, GL_FALSE, kQuadSize, (void*)(offset + diff));

	///�����������ã���ȡ��һ�����õ�uniform�������������д������ݡ������е�1����ڶ�������0ΪĬ������
	GLuint testTexUniform = glGetUniformLocation(getGLProgram()->getProgram() ,"CC_Texture1");
	GL::bindTexture2DN(1,tex);
	glUniform1i(testTexUniform,1);

	///color
	diff = offsetof(V3F_C4B_T2F, colors);
	///Ϊ��ɫ ָ������Դ
	glVertexAttribPointer(GLProgram::VERTEX_ATTRIB_COLOR, 4, GL_UNSIGNED_BYTE, GL_TRUE, kQuadSize, (void*)(offset + diff));
	//���������Σ���ν��draw call����ָ��������ĵ���
	glDrawArrays(GL_TRIANGLE_STRIP, 0, 4);
	CHECK_GL_ERROR_DEBUG();
	//֪ͨcocos2d-x��render,�����ں��ʵ�ʱ�������ЩOpengl����
	CC_INCREMENT_GL_DRAWN_BATCHES_AND_VERTICES(1, 4);


	

}


void ShaderSprite::setFloatArg(std::string argKeyName, float value){
	std::map<std::string, float>::iterator itor = floatArgMap.find(argKeyName);
	///û���ҵ�������
	if (itor == floatArgMap.end()){
		floatArgMap.insert( std::make_pair(argKeyName, value) );
	}
	else{
		itor->second = value;
	}
}
void ShaderSprite::setIntArg(std::string argKeyName, int value){
	std::map<std::string, int>::iterator itor = intArgMap.find(argKeyName);
	///û���ҵ�������
	if (itor == intArgMap.end()){
		intArgMap.insert(std::make_pair(argKeyName, value));
	}
	else{
		itor->second = value;
	}
}

void ShaderSprite::setVec2Arg(std::string argKeyName, Vec2 value){
	std::map<std::string, Vec2>::iterator itor = vec2ArgMap.find(argKeyName);
	///û���ҵ�������
	if (itor == vec2ArgMap.end()){
		vec2ArgMap.insert(std::make_pair(argKeyName, value));
	}
	else{
		itor->second = value;
	}
}

void ShaderSprite::setVec3Arg(std::string argKeyName, Vec3 value){
	std::map<std::string, Vec3>::iterator itor = vec3ArgMap.find(argKeyName);
	///û���ҵ�������
	if (itor == vec3ArgMap.end()){
		vec3ArgMap.insert(std::make_pair(argKeyName, value));
	}
	else{
		itor->second = value;
	}
}

void ShaderSprite::setVec4Arg(std::string argKeyName, Vec4 value){
	std::map<std::string, Vec4>::iterator itor = vec4ArgMap.find(argKeyName);
	///û���ҵ�������
	if (itor == vec4ArgMap.end()){
		vec4ArgMap.insert(std::make_pair(argKeyName, value));
	}
	else{
		itor->second = value;
	}
}

void ShaderSprite::setIntVecArg(std::string argKeyName, const int* ptr, ssize_t size) {
	std::map<std::string, intVec>::iterator itor = intVecArgMap.find(argKeyName);
	///û���ҵ�������,�����޸�
	if (itor == intVecArgMap.end()) {
		intVecArgMap.insert(std::make_pair(argKeyName, intVec(ptr, size)));
	}
	else {
		itor->second = intVec(ptr, size);
	}
}

void ShaderSprite::setIntVecArgLua(std::string argKeyName, const cocos2d::ValueVector &ptr, ssize_t size) {
	std::map<std::string, intVec>::iterator itor = intVecArgMap.find(argKeyName);
	///û���ҵ�������,�����޸�
	//const float* fPtr = (const float*)ptr;
	const ssize_t s = size;
	static int *iVec = new int(s);
	auto vecitor = ptr.begin();
	int index = 0;
	while (vecitor != ptr.end())
	{
		iVec[index] = float(ptr.at(index).asInt());
		index++;
		vecitor++;
	}

	if (itor == intVecArgMap.end()) {
		intVecArgMap.insert(std::make_pair(argKeyName, intVec(&iVec[0], size)));
	}
	else {
		itor->second = intVec(&iVec[0], size);
	}

}

// 
void ShaderSprite::setFloatVecArg(std::string argKeyName, float* ptr, ssize_t size) {
	std::map<std::string, floatVec>::iterator itor = floatVecArgMap.find(argKeyName);
	///û���ҵ�������,�����޸�
	float* fPtr = (float*)ptr;
	if (itor == floatVecArgMap.end()) {
		floatVecArgMap.insert(std::make_pair(argKeyName, floatVec(fPtr,size)));
	}
	else {
		itor->second = floatVec(fPtr, size);
	}

}

void ShaderSprite::setFloatVecArgLua(std::string argKeyName, const cocos2d::ValueVector &ptr, ssize_t size) {
	std::map<std::string, floatVec>::iterator itor = floatVecArgMap.find(argKeyName);
	///û���ҵ�������,�����޸�
	//const float* fPtr = (const float*)ptr;
	const ssize_t s = size;
	float *fVec = (float*)malloc(s * sizeof(float));
	auto vecitor = ptr.begin();
	int index = 0;
	while (vecitor != ptr.end())
	{
		fVec[index] = float(ptr.at(index).asDouble());
		index++;
		vecitor++;
	}

	//floatVec value = floatVec(fVec, size);
	if (itor == floatVecArgMap.end()) {
		floatVecArgMap.insert(std::make_pair(argKeyName, floatVec(fVec, size)));
	}
	else {
		itor->second = floatVec(fVec, size);
	}

	free(fVec);
}



////Ŷ������û��
void ShaderSprite::clearAllArgMap(){
	floatArgMap.clear();    
	intArgMap.clear();
	vec2ArgMap.clear();
	vec3ArgMap.clear();
	vec4ArgMap.clear();
	intVecArgMap.clear();
	floatVecArgMap.clear();
}
