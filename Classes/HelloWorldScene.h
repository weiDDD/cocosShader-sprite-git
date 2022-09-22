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

	Vec2 touchPoint;      // 触摸的点
	float liveTime;       // 这个触摸点存活的时间
	float nowTime;        // 这个已经经过的时间

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

	///////触摸事件
	virtual bool onTouchBegan(cocos2d::CCTouch* pTouch, cocos2d::CCEvent* pEvent);
	virtual void onTouchMoved(cocos2d::CCTouch* pTouch, cocos2d::CCEvent* pEvent);
	virtual void onTouchEnded(cocos2d::CCTouch* pTouch, cocos2d::CCEvent* pEvent);

    // implement the "static create()" method manually
    CREATE_FUNC(HelloWorld);
private:
	std::string nowShaderName;
	std::vector<std::string> shaderNames;
	ShaderSprite* sSprite = nullptr;
	spine::SkeletonAnimation *soldier = nullptr;
	float setTime;
	float setTimeCount;

	////-----------------------------shader的各种参数的变量--------------------------
	/////SHL shader
	Vec3 SHL = Vec3(243,0.1,0.1);
	/////light shader
	float lightHeight = 0;
	float lightWidth = 0;
	float lightStart = 0;
	float lightHeight2 = 0;
	float lightWidth2 = 0;
	float lightStart2 = 0;
	float lightHeight3 = 0;
	float lightWidth3 = 0;
	float lightStart3 = 0;
	/////flash shader
	float flashFirstWidth = 0;
	float flashStartHeight = 0;
	float flashFirstHeight = 0;
	/////vortex shader
	float vortexRadius = 0;
	float vortexAngle = 0;
	////drawEdge sahder
	float outLineSize = 0;
	Vec3 outLineColor = Vec3(0, 0, 0);
	float circleLightAngle = 0;
	////water shader
	float waterTime = 0;
	Vec2 waterResolution = Vec2(0, 0);
	////wire shader
	float wireDurationNum1 = 0;
	float wireDurationNum2 = 0;
	float wireDurationNum3 = 0;
	float startAngle1 = 0;
	float startAngle2 = 0;
	float startAngle3 = 0;
	float wireStartHeight1 = 0;
	float wireStartHeight2 = 0; 
	float wireStartHeight3 = 0;
	float wireHeight1 = 0;
	float wireHeight2 = 0;
	float wireHeight3 = 0;
	float wireSize1 = 0;
	float wireSize2 = 0;
	float wireSize3 = 0;
	/////godLight shader
	float u_time = 0;
	int u_num_sample = 0;   //上帝之光，一个点距离光源点的距离上分为多少份，并叠加这些像素颜色
	float u_weight = 0;     //叠加的颜色需要乘以一个  比例，不然就会很亮
	/////mask shader
	float radius = 0;
	Vec2 center = Vec2(0,0); 
	Vec4 centerColor = Vec4(0, 0,0,0);
	Vec4 maskColor = Vec4(0, 0,0,0); 

	GLfloat colorGap[5]; 
	 

	///
	float m_rippleDistance = 0;
	float m_rippleRange = 0;

	/////////////////////////////////// touch Water data
    std::vector<TouchWaterPoint> touchWaterPointData;  // 触摸数据
	Rect waterSpriteRect;  

	float waterSpeed = 300;    // 水波的传播速度 px
	float waterRange = 40;    // 水波的影响范围 px

	int maxTouchPointNum = 50;

	bool isTouchWater = false;
	Vec2 nowTouchWaterPos;
	float touchWaterTimeDelay = 0.1;
	float touchWaterTimeDelayCount = 0;

};

#endif // __HELLOWORLD_SCENE_H__
