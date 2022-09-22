/*\
	κ��˳

 ���࣬�Ѿ�ʵ�֣�
	1.����ͼƬ�Ļ��ģʽ���ﵽһ����ͼƬ����Ч��
	2.ʹһ��ͼƬ��ң�ʹ�õ���gray.vsh;gray.fsh
	3.ʹһ��ͼƬ�ı���HSLֵ��ʹ����ӵ��ſ�
	....

*/

#ifndef SHADER_SPEITE_H
#define SHADER_SPRITE_H

#include "cocos2d.h"
USING_NS_CC;

class ShaderSprite : public Sprite{
public:
	ShaderSprite();
	virtual ~ShaderSprite();

	// int �������飬������ʼָ�룬�������С
	struct intVec {
		intVec(const int* f, int s) {
			vec = (const int*)f;
			size = (GLsizei)s;
		}
		const int* vec;
		GLsizei size;
	};
	// float �������飬������ʼָ�룬�������С
	struct floatVec {
		floatVec(float* f, int s) {
			//vec = (float*)f;

			vec = (float*)malloc(s * sizeof(float));
			for (int i = 0; i < s; ++i) {
				vec[i] = float(f[i]);
			}

			size = (GLsizei)s;
		}
		/*~floatVec() {
			free( vec );
		}*/
		
		float* vec;
		GLsizei size;
	};

	static ShaderSprite* create(const std::string& filename);
	static ShaderSprite* createWithTexture(Texture2D* tex);

	bool initWithTexture(Texture2D* pTexture,const CCRect& tRect);
	virtual void draw(Renderer* renderer,const Mat4 &transform,uint32_t flags) override;
	void onDraw(const Mat4& transform,uint32_t flags);
	////
	////����shader�ļ�
	std::string vshName = "";
	std::string fshName = "";
	void setShaderFile(std::string vName, std::string fName){
		vshName = vName;
		fshName = fName;

		auto pProgram = GLProgram::createWithFilenames(vshName, fshName);
		///����shaderstate  shader״̬
		auto glprogramstate = GLProgramState::getOrCreateWithGLProgram(pProgram);
		///����shader
		setGLProgramState(glprogramstate);
	}

	////���õڶ�������
	void setSecondTex(std::string name){
		auto image = new (std::nothrow) Image();
		std::string fullpath = FileUtils::getInstance()->fullPathForFilename(name);
		bool bRet = image->initWithImageFile(fullpath);

		texture = new (std::nothrow) Texture2D();

		if (texture && texture->initWithImage(image)) {
			image->release();
			tex = texture->getName();
		}
		//tex = Director::getInstance()->getTextureCache()->addImage(name)->getName();
	}

	/////���в�����map
	std::map<std::string, float> floatArgMap;    ///float���͵Ĳ�����map
	std::map<std::string, int> intArgMap;
	std::map<std::string, Vec2> vec2ArgMap;
	std::map<std::string, Vec3> vec3ArgMap;
	std::map<std::string, Vec4> vec4ArgMap;

	///���ⲿ�ṩ������������Ľӿ�
	void setFloatArg(std::string argKeyName, float value);
	void setIntArg(std::string argKeyName, int value);
	void setVec2Arg(std::string argKeyName, Vec2 value);
	void setVec3Arg(std::string argKeyName, Vec3 value);
	void setVec4Arg(std::string argKeyName, Vec4 value);

	// ������������ , ��ʱֻ֧��int �� float����
	// ��C++ ���̵Ľӿ�
	void setIntVecArg(std::string argKeyName,const int* ptr , ssize_t size);
	// ��lua �Ľӿ�
	void setIntVecArgLua(std::string argKeyName, const cocos2d::ValueVector &ptr, ssize_t size);
	std::map<std::string, intVec> intVecArgMap;



	// ��C++ ���̵Ľӿ�
	void setFloatVecArg(std::string argKeyName, float* ptr, ssize_t size);
	// ��lua �Ľӿ�
	void setFloatVecArgLua(std::string argKeyName, const cocos2d::ValueVector &ptr, ssize_t size);
	std::map<std::string, floatVec> floatVecArgMap;

	////������еĲ���
	void clearAllArgMap();

	///�ڶ�������
	Texture2D* texture;
	GLuint tex;



protected:
	CustomCommand _customCommand;
private:
	
};



#endif