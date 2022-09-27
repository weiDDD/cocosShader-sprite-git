#ifndef __HELLOWORLD_SCENE_H__
#define __HELLOWORLD_SCENE_H__

#include "cocos2d.h"
#include "shaderSprite.h"
#include "DropDownList.h"
#include <spine/spine.h>
#include <spine/Animation.h>
#include <spine/SkeletonAnimation.h>

struct TouchWaterPoint{
	TouchWaterPoint() {
		touchPoint = Vec2(0, 0);
		liveTime = 0;
		nowTime = 0;
	}

	Vec2 touchPoint;      // �����ĵ�
	float liveTime;       // ������������ʱ��
	float nowTime;        // ����Ѿ�������ʱ��

};


using namespace spine;
class HelloWorld : public cocos2d::Layer
{
public:
    // there's no 'id' in cpp, so we recommend returning the class instance pointer
    static cocos2d::Scene* createScene();

    // Here's a difference. Method 'init' in cocos2d-x returns bool, instead of returning 'id' in cocos2d-iphone
    virtual bool init();
	void update(float dt);

    // a selector callback
    void menuCloseCallback(cocos2d::Ref* pSender);
    
	void onDropDownList(Object* list, DropDownList* sender);

	///////�����¼�
	virtual bool onTouchBegan(cocos2d::CCTouch* pTouch, cocos2d::CCEvent* pEvent);
	virtual void onTouchMoved(cocos2d::CCTouch* pTouch, cocos2d::CCEvent* pEvent);
	virtual void onTouchEnded(cocos2d::CCTouch* pTouch, cocos2d::CCEvent* pEvent);

    // implement the "static create()" method manually
    CREATE_FUNC(HelloWorld);
private:
	std::string nowShaderName;
	std::vector<std::string> shaderNames;
	ShaderSprite* sSprite ;
	spine::SkeletonAnimation *soldier ;
	float setTime;
	float setTimeCount;

	////-----------------------------shader�ĸ��ֲ����ı���--------------------------
	/////SHL shader
	Vec3 SHL;
	/////light shader
	float lightHeight;
	float lightWidth;
	float lightStart;
	float lightHeight2;
	float lightWidth2;
	float lightStart2;
	float lightHeight3;
	float lightWidth3;
	float lightStart3;
	/////flash shader
	float flashFirstWidth;
	float flashStartHeight;
	float flashFirstHeight;
	/////vortex shader
	float vortexRadius;
	float vortexAngle;
	////drawEdge sahder
	float outLineSize;
	Vec3 outLineColor ;
	float circleLightAngle;
	////water shader
	float waterTime;
	Vec2 waterResolution;
	////wire shader
	float wireDurationNum1;
	float wireDurationNum2;
	float wireDurationNum3;
	float startAngle1;
	float startAngle2;
	float startAngle3;
	float wireStartHeight1;
	float wireStartHeight2; 
	float wireStartHeight3;
	float wireHeight1;
	float wireHeight2;
	float wireHeight3;
	float wireSize1;
	float wireSize2;
	float wireSize3;
	/////godLight shader
	float u_time;
	int u_num_sample;   //�ϵ�֮�⣬һ��������Դ��ľ����Ϸ�Ϊ���ٷݣ���������Щ������ɫ
	float u_weight;     //���ӵ���ɫ��Ҫ����һ��  ��������Ȼ�ͻ����
	/////mask shader
	float radius;
	Vec2 center; 
	Vec4 centerColor;
	Vec4 maskColor; 

	GLfloat colorGap[5]; 
	 

	///
	float m_rippleDistance;
	float m_rippleRange;

	/////////////////////////////////// touch Water data
    std::vector<TouchWaterPoint> touchWaterPointData;  // ��������
	Rect waterSpriteRect;  

	float waterSpeed;    // ˮ���Ĵ����ٶ� px
	float waterRange;    // ˮ����Ӱ�췶Χ px

	int maxTouchPointNum;

	bool isTouchWater;
	Vec2 nowTouchWaterPos;
	float touchWaterTimeDelay;
	float touchWaterTimeDelayCount;

	// randomHide
	float alpha;

};

#endif // __HELLOWORLD_SCENE_H__
