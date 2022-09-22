#include "HelloWorldScene.h"


USING_NS_CC;

Scene* HelloWorld::createScene()
{
	// 'scene' is an autorelease object
	auto scene = Scene::create();

	// 'layer' is an autorelease object
	auto layer = HelloWorld::create();

	// add layer as a child to scene
	scene->addChild(layer);

	// return the scene
	return scene;
}

// on "init" you need to initialize your instance
bool HelloWorld::init()
{

	setTime = 1;
	setTimeCount = 0;

	//////////////////////////////
	// 1. super init first
	if (!Layer::init())
	{
		return false;
	}

	this->scheduleUpdate();

	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();

	/////////////////////////////
	// 2. add a menu item with "X" image, which is clicked to quit the program
	//    you may modify it.

	// add a "close" icon to exit the progress. it's an autorelease object
	auto closeItem = MenuItemImage::create(
		"CloseNormal.png",
		"CloseSelected.png",
		CC_CALLBACK_1(HelloWorld::menuCloseCallback, this));

	closeItem->setPosition(Vec2(origin.x + visibleSize.width - closeItem->getContentSize().width / 2,
		origin.y + closeItem->getContentSize().height / 2));

	// create menu, it's an autorelease object
	auto menu = Menu::create(closeItem, NULL);
	menu->setPosition(Vec2::ZERO);
	this->addChild(menu, 1);


	// �����¼�
	auto listener = EventListenerTouchOneByOne::create();
	listener->setSwallowTouches(false);
	listener->onTouchBegan = CC_CALLBACK_2(HelloWorld::onTouchBegan, this);
	listener->onTouchMoved = CC_CALLBACK_2(HelloWorld::onTouchMoved, this);
	listener->onTouchEnded = CC_CALLBACK_2(HelloWorld::onTouchEnded, this);
	_eventDispatcher->addEventListenerWithSceneGraphPriority(listener, this);  //���¼���ӵ�this�������
	this->setTouchEnabled(true);

	/////////////////////////////
	// 3. add your codes below...

	// add a label shows "Hello World"
	// create and initialize a label

	//auto label = Label::createWithTTF("Hello World", "fonts/Marker Felt.ttf", 24);

	// position the label on the center of the screen
	//label->setPosition(Vec2(origin.x + visibleSize.width/2,origin.y + visibleSize.height - label->getContentSize().height));

	// add the label as a child to this layer
	//this->addChild(label, 1);

	//add "HelloWorld" splash screen"
	//   auto sprite = Sprite::create("test.png");

	//   // position the sprite on the center of the screen
	//   sprite->setPosition(Vec2(visibleSize.width/2 + origin.x, visibleSize.height/2 + origin.y));

	//   // add the sprite as a child to this layer
	//   this->addChild(sprite, 0);
	//this->sprAddGray(sprite);
	{
		/*Sprite* sSprite = Sprite::create("test.png");
		sSprite->setPosition(500, 500);
		sSprite->setScaleX(500 / sSprite->getContentSize().width);
		sSprite->setScaleY(800 / sSprite->getContentSize().height);
		this->addChild(sSprite, -1);*/
	}
	///////////////////////////////////////////////////////
	//sSprite = ShaderSprite::create("HelloWorld.png");
	//sSprite->setPosition(500, 500 );
	//sSprite->setScale(2);
	///*sSprite->setScaleX(200 / sSprite->getContentSize().width);
	//sSprite->setScaleY(400 / sSprite->getContentSize().height);*/
	//this->addChild(sSprite, -1);
	/////////////////////////////////////////////////////////////
	///ʹ��BlendFunc��Ϻ��������ﵽ��ɫ��ϵ�Ч��
	/*auto red = Sprite::create("red.png");
	red->setPosition(200, 200);
	this->addChild(red);

	blue = Sprite::create("circle.png");
	blue->setPosition(0, 200);
	this->addChild(blue);

	BlendFunc cbl = { GL_SRC_ALPHA, GL_ONE };
	blue->setBlendFunc(cbl);*/

	///ÿ��sprite��initWithTexture�лḳֵ���  ���ģʽ
	/*
		��Ϲ���Ϊ��
		Դ��ɫ �� ��Rs,Gs,Bs,As��
		Ŀ����ɫ����Rd,Gd,Bd,Ad)
		Դ���� �� ��Sr,Sg,Sb,Sa)
		Ŀ�����ӣ���Dr,Dg,Db,Da)

		��Ϻ������ɫΪ:
		(Rs*Sr + Rd*Dr,Gs*Sg + Gd*Dg , Bs*Sb+Bd*Db,As*Sa+Ad*Da)

		������ӣ�
		GL_ZERO                  (0��0��0��0)
		GL_ONE                   (1��1��1��1)
		GL_SRC_COLOR             (Rs,Gs,Bs,As)
		GL_DST_COLOR             (Rd,Gd,Bd,Ad)
		GL_ONE_MINUS_SRC_COLOR   (1-Rs,1-Gs,1-Bs,1-As)
		GL_ONE_MINUS_DST_COLOR   (1-Rd,1-Gd,1-Bd,1-Ad)
		GL_SRC_ALPHA             (As,As,As,As)
		GL_DST_ALPHA             (Ad,Ad,Ad,Ad)
		GL_ONE_MINUS_SRC_ALPHA   (1-As,1-As,1-As,1-As)
		GL_ONE_MINUS_DST_ALPHA   (1-Ad,1-Ad,1-Ad,1-Ad)
		*/

	//BlendFunc cbl = {'Դ����'��'Ŀ������'}
	/*BlendFunc cbl = { GL_SRC_ALPHA, GL_ONE };*/

	/////����һ�������б�����ѡ��ͬ��shaderЧ��
	LabelTTF* initLabel = LabelTTF::create("hello", "Arial", 20);
	Size listSize = Size(200, 40);
	initLabel->setDimensions(listSize);
	DropDownList* destBlend = DropDownList::create(initLabel, listSize);
	destBlend->setPosition(visibleSize.width - listSize.width - 20, visibleSize.height - 2 * listSize.height);
	this->addChild(destBlend);

	///һ�����ֵ�vector
	shaderNames.push_back("gray");   ///���
	shaderNames.push_back("SHL");    ///HSL
	shaderNames.push_back("light");  ///
	shaderNames.push_back("flash");
	shaderNames.push_back("vortex");
	shaderNames.push_back("drawEdge");
	shaderNames.push_back("spine-drawEdge");
	shaderNames.push_back("water");
	shaderNames.push_back("ripple");
	shaderNames.push_back("waterRipple");
	shaderNames.push_back("wire");
	shaderNames.push_back("spine-wire");
	shaderNames.push_back("divisionLine");
	shaderNames.push_back("godLight");
	shaderNames.push_back("frost");
	shaderNames.push_back("mask");
	shaderNames.push_back("whiteBar");
	shaderNames.push_back("floatVecTest");
	shaderNames.push_back("touchWaterRipple");
	

	std::vector<std::string>::iterator itor = shaderNames.begin();
	while (itor != shaderNames.end()){
		LabelTTF* label1 = LabelTTF::create((*itor), "Arial", 22);
		destBlend->addLabel(label1);

		itor++;
	}

	destBlend->setItemCallBack(CC_CALLBACK_1(HelloWorld::onDropDownList, this, destBlend));

	return true;
}
/////�����б�Ļص�����
void HelloWorld::onDropDownList(Object* list, DropDownList* sender){
	sender->onSelected(list); //�ر������б��
	int index = dynamic_cast<MenuItem*>(list)->getTag();

	std::string nowName = shaderNames.at(index);
	nowShaderName = nowName;

	////ɾ����һ��
	if (sSprite){
		sSprite->removeFromParent();
		sSprite = nullptr;
	}
	if (soldier){
		soldier->removeFromParent();
		soldier = nullptr;
	}

	////////////////////////////////////
	if (nowName == "gray"){
		///����
		sSprite = ShaderSprite::create("soldier.png");
		sSprite->setPosition(500, 500);
		this->addChild(sSprite, -1);
		sSprite->setScale(2);
		////����shader�ļ�
		sSprite->setShaderFile("gray.vsh", "gray.fsh");
	}
	////////////////////////////////////
	else if (nowName == "SHL"){
		///����
		sSprite = ShaderSprite::create("soldier.png");
		sSprite->setPosition(500, 500);
		this->addChild(sSprite, -1);
		sSprite->setScale(2);
		////����shader�ļ�
		sSprite->setShaderFile("HSL.vsh", "HSL.fsh");
	}
	////////////////////////////////////
	else if (nowName == "light"){
		///����
		sSprite = ShaderSprite::create("light.png");
		sSprite->setPosition(500, 500);
		this->addChild(sSprite, -1);
		////����shader�ļ�
		sSprite->setShaderFile("light.vsh", "light.fsh");
	}
	////////////////////////////////////
	else if (nowName == "flash"){
		///����
		sSprite = ShaderSprite::create("light.png");
		sSprite->setPosition(500, 500);
		sSprite->setScaleX(800 / sSprite->getContentSize().width);
		sSprite->setScaleY(45 / sSprite->getContentSize().height);
		this->addChild(sSprite, -1);
		////����shader�ļ�
		sSprite->setShaderFile("flash.vsh", "flash.fsh");
	}
	////////////////////////////////////
	else if (nowName == "vortex"){
		///����
		sSprite = ShaderSprite::create("man.png");
		sSprite->setPosition(600, 500);
		this->addChild(sSprite, -1);
		////����shader�ļ�
		sSprite->setShaderFile("vortex.vsh", "vortex.fsh");

		vortexRadius = sSprite->getContentSize().width / 2 * sSprite->getScaleX();
		vortexAngle = 450;
	}
	////////////////////////////////////
	else if (nowName == "drawEdge"){
		///����
		sSprite = ShaderSprite::create("soldier.png");
		sSprite->setPosition(600, 500);
		this->addChild(sSprite, -1);
		sSprite->setScale(2);
		////����shader�ļ�
		sSprite->setShaderFile("drawEdge.vsh", "drawEdge.fsh");
	}
	////////////////////////////////////
	else if (nowName == "spine-drawEdge"){
		///����һ��spien����
		soldier = SkeletonAnimation::createWithFile("norsoldier/spine_norsoldier.json", "norsoldier/spine_norsoldier.atlas", 1);
		soldier->setAnimation(0, "norsoldier_walk_left", true);
		soldier->setPosition(500, 300);
		this->addChild(soldier);

		GLProgram* glprogram = GLProgram::createWithFilenames("drawEdge.vsh", "drawEdge.fsh");
		soldier->setShaderProgram(glprogram);

		soldier->getGLProgramState()->setUniformFloat("outlineSize", 0.002);
		soldier->getGLProgramState()->setUniformVec3("outlineColor", Vec3(0, 0.86, 1));
		soldier->getGLProgramState()->setUniformFloat("circleLightAngle", circleLightAngle);
	}
	////////////////////////////////////
	else if (nowName == "water"){
		///����
		sSprite = ShaderSprite::create("man.png");
		sSprite->setPosition(600, 500);
		this->addChild(sSprite, -1);
		sSprite->setScale(2);
		////����shader�ļ�
		sSprite->setShaderFile("water.vsh", "water.fsh");
	}
	////////////////////////////////////
	else if (nowName == "ripple"){
		///����
		sSprite = ShaderSprite::create("man.png");
		sSprite->setPosition(600, 500);
		this->addChild(sSprite, -1);
		sSprite->setScale(2);
		////����shader�ļ�
		sSprite->setShaderFile("ripple.vsh", "ripple.fsh");
	}
	////////////////////////////////////
	else if (nowName == "waterRipple") {
		///����
		sSprite = ShaderSprite::create("man.png");
		sSprite->setPosition(600, 500);
		this->addChild(sSprite, -1);
		sSprite->setScale(2);
		////����shader�ļ�
		sSprite->setShaderFile("waterRipple.vsh", "waterRipple.fsh");


		m_rippleDistance = 0;
		m_rippleRange = 0;
	}

	////////////////////////////////////
	else if (nowName == "wire"){
		///����
		sSprite = ShaderSprite::create("soldier.png");
		sSprite->setPosition(600, 500);
		this->addChild(sSprite, -1);
		sSprite->setScale(2);
		////����shader�ļ�
		sSprite->setShaderFile("wire.vsh", "wire.fsh");
	}
	////////////////////////////////////
	else if (nowName == "spine-wire"){
		///����һ��spien����
		soldier = SkeletonAnimation::createWithFile("norsoldier/spine_norsoldier.json", "norsoldier/spine_norsoldier.atlas", 1);
		soldier->setAnimation(0, "norsoldier_walk_left", true);
		soldier->setPosition(500, 300);
		this->addChild(soldier);

		GLProgram* glprogram = GLProgram::createWithFilenames("wire.vsh", "wire.fsh");
		soldier->setShaderProgram(glprogram);

	}
	////////////////////////////////////
	else if (nowName == "divisionLine"){
		///����
		sSprite = ShaderSprite::create("soldier.png");
		sSprite->setPosition(600, 500);
		this->addChild(sSprite, -1);
		sSprite->setScale(2);
		////����shader�ļ�
		sSprite->setShaderFile("divisionLine.vsh", "divisionLine.fsh");

	}
	////////////////////////////////////
	else if (nowName == "godLight"){
		///����
		sSprite = ShaderSprite::create("man2.png");
		sSprite->setPosition(600, 500);
		this->addChild(sSprite, -1);
		sSprite->setScale(2);
		////����shader�ļ�
		sSprite->setShaderFile("godLight.vsh", "godLight.fsh");

	}
	////////////////////////////////////
	else if (nowName == "frost"){
		///����
		sSprite = ShaderSprite::create("soldier.png");
		sSprite->setPosition(600, 500);
		this->addChild(sSprite, -1);
		sSprite->setScale(2);
		////����shader�ļ�
		sSprite->setShaderFile("frost.vsh", "frost.fsh");
		sSprite->setSecondTex("frostBg2.png");
	}
	////////////////////////////////////
	else if (nowName == "mask"){
		///����
		sSprite = ShaderSprite::create("man.png");
		sSprite->setPosition(600, 500);
		this->addChild(sSprite, -1);
		sSprite->setScale(2);
		////����shader�ļ�
		sSprite->setShaderFile("mask.vsh", "mask.fsh");
	}
	
	////////////////////////////////////
	else if (nowName == "whiteBar"){
		u_time = 0;
		///����
		sSprite = ShaderSprite::create("test.png");
		sSprite->setPosition(600, 500);
		this->addChild(sSprite, -1);
		sSprite->setScale(2);

		sSprite->setScale(1.1);
		////����shader�ļ�
		sSprite->setShaderFile("whiteBar.vsh", "whiteBar.fsh");
		sSprite->setSecondTex("whiteBar2.png");
	}
	////////////////////////////////////
	else if (nowName == "floatVecTest") {
		u_time = 0;
		///����
		sSprite = ShaderSprite::create("test.png");
		sSprite->setPosition(600, 500);
		this->addChild(sSprite, -1);
		sSprite->setScale(2);

		sSprite->setScale(1.1);
		////����shader�ļ�
		sSprite->setShaderFile("floatVecTest.vsh", "floatVecTest.fsh");

		colorGap[0] = 0.2f;
		colorGap[1] = 0.4f;
		colorGap[2] = 0.6f;
		colorGap[3] = 0.8f;
		colorGap[4] = 1.0f;

	}
	////////////////////////////////////
	else if (nowName == "touchWaterRipple") {
		sSprite = ShaderSprite::create("panda.png");
		sSprite->setPosition(600, 500);
		this->addChild(sSprite, -1);
		sSprite->setScale(0.5);
		////����shader�ļ�
		sSprite->setShaderFile("touchWaterRipple.vsh", "touchWaterRipple.fsh");


		waterSpriteRect = Rect(sSprite->getPositionX() - sSprite->getContentSize().width / 2 * sSprite->getScaleX(), sSprite->getPositionY() - sSprite->getContentSize().height / 2 * sSprite->getScaleY(),
									sSprite->getContentSize().width * sSprite->getScaleX(), sSprite->getContentSize().height * sSprite->getScaleY());
	}
	

}

void HelloWorld::update(float dt){
	/////����shader�Ĳ���
	if (nowShaderName == "SHL"){
		sSprite->setFloatArg("u_dH", SHL.x);
		sSprite->setFloatArg("u_dS", SHL.y);
		sSprite->setFloatArg("u_dL", SHL.z);
	}
	else if (nowShaderName == "light"){
		////����shader����  
		sSprite->setFloatArg("height", lightHeight);
		sSprite->setFloatArg("width", lightWidth);
		sSprite->setFloatArg("start", lightStart);
		sSprite->setFloatArg("height2", lightHeight2);
		sSprite->setFloatArg("width2", lightWidth2);
		sSprite->setFloatArg("start2", lightStart2);
		sSprite->setFloatArg("height3", lightHeight3);
		sSprite->setFloatArg("width3", lightWidth3);
		sSprite->setFloatArg("start3", lightStart3);
	}
	else if (nowShaderName == "flash"){
		////����shader����  
		sSprite->setFloatArg("firstWidth", flashFirstWidth);
		sSprite->setFloatArg("firstHeight", flashFirstHeight);
		sSprite->setFloatArg("startHeight", flashStartHeight);
	}
	else if (nowShaderName == "vortex"){
		////����shader����  
		sSprite->setFloatArg("radius", vortexRadius);
		sSprite->setFloatArg("angle", vortexAngle);
	}
	else if (nowShaderName == "drawEdge"){
		////����shader����  
		sSprite->setFloatArg("outlineSize", outLineSize);
		sSprite->setVec3Arg("outlineColor", outLineColor);
		sSprite->setFloatArg("circleLightAngle", circleLightAngle);
	}
	else if (nowShaderName == "water"){
		////����shader����  
		sSprite->setFloatArg("time", waterTime);
		waterResolution = Vec2(sSprite->getContentSize().width * sSprite->getScaleX(), sSprite->getContentSize().height * sSprite->getScaleY());
		sSprite->setVec2Arg("resolution", waterResolution);
	}
	else if (nowShaderName == "ripple"){
		////����shader����  ,ʹ��ˮ����ʱ��
		sSprite->setFloatArg("time", waterTime);
	}
	else if (nowShaderName == "waterRipple") {
		float rippleSpeed = 0.25f;
		float maxRippleDistance = 1;
		m_rippleDistance += rippleSpeed * dt;
		m_rippleRange = (1 - m_rippleDistance / maxRippleDistance) * 0.06f;

		if (m_rippleDistance > maxRippleDistance) {

		}
		else {
			////����shader����  
			sSprite->setFloatArg("u_rippleDistance", m_rippleDistance);
			sSprite->setFloatArg("u_rippleRange", m_rippleRange);
		}

		
	}

	else if (nowShaderName == "wire"){
		sSprite->setIntArg("wireNum", 5);
		sSprite->setFloatArg("wireDurationNum1", wireDurationNum1);
		sSprite->setFloatArg("wireDurationNum2", wireDurationNum2);
		sSprite->setFloatArg("wireDurationNum3", wireDurationNum3);
		sSprite->setFloatArg("wireHeight1", wireHeight1);
		sSprite->setFloatArg("wireHeight2", wireHeight2);
		sSprite->setFloatArg("wireHeight3", wireHeight3);
		sSprite->setFloatArg("wireSize1", wireSize1);
		sSprite->setFloatArg("wireSize2", wireSize2);
		sSprite->setFloatArg("wireSize3", wireSize3);
		sSprite->setFloatArg("startAngle1", startAngle1);
		sSprite->setFloatArg("startAngle2", startAngle2);
		sSprite->setFloatArg("startAngle3", startAngle3);
		sSprite->setFloatArg("startHeight1", wireStartHeight1);
		sSprite->setFloatArg("startHeight2", wireStartHeight2);
		sSprite->setFloatArg("startHeight3", wireStartHeight3);

	}
	else if (nowShaderName == "spine-wire"){
		soldier->getGLProgramState()->setUniformInt("wireNum", 5);
		soldier->getGLProgramState()->setUniformFloat("wireDurationNum1", wireDurationNum1);
		soldier->getGLProgramState()->setUniformFloat("wireDurationNum2", wireDurationNum2);
		soldier->getGLProgramState()->setUniformFloat("wireDurationNum3", wireDurationNum3);
		soldier->getGLProgramState()->setUniformFloat("wireHeight1", wireHeight1);
		soldier->getGLProgramState()->setUniformFloat("wireHeight2", wireHeight2);
		soldier->getGLProgramState()->setUniformFloat("wireHeight3", wireHeight3);
		soldier->getGLProgramState()->setUniformFloat("wireSize1", wireSize1);
		soldier->getGLProgramState()->setUniformFloat("wireSize2", wireSize2);
		soldier->getGLProgramState()->setUniformFloat("wireSize3", wireSize3);
		soldier->getGLProgramState()->setUniformFloat("startAngle1", startAngle1);
		soldier->getGLProgramState()->setUniformFloat("startAngle2", startAngle2);
		soldier->getGLProgramState()->setUniformFloat("startAngle3", startAngle3);
		soldier->getGLProgramState()->setUniformFloat("startHeight1", wireStartHeight1);
		soldier->getGLProgramState()->setUniformFloat("startHeight2", wireStartHeight2);
		soldier->getGLProgramState()->setUniformFloat("startHeight3", wireStartHeight3);

	}
	else if (nowShaderName == "divisionLine"){
		////����shader���� 
		sSprite->setFloatArg("wireHeight", wireHeight1);
		sSprite->setFloatArg("startAngle", startAngle1);
		sSprite->setFloatArg("wireDurationNum", wireDurationNum1);
		sSprite->setFloatArg("startHeight", wireStartHeight1);
	}
	else if (nowShaderName == "godLight"){
		////����shader���� 
		sSprite->setFloatArg("u_time", u_time);
		sSprite->setIntArg("u_num_sample", u_num_sample);
		sSprite->setFloatArg("u_Weight", u_weight);
	}
	else if (nowShaderName == "frost"){
		////����shader���� 
		sSprite->setFloatArg("time", u_time);
	}
	else if (nowShaderName == "mask"){
		////����shader���� 
		sSprite->setFloatArg("radius", radius);
		sSprite->setVec2Arg("center", center);
		sSprite->setVec4Arg("centerColor", centerColor);
		sSprite->setVec4Arg("maskColor", maskColor);

	}
	else if (nowShaderName == "whiteBar"){
		////����shader���� 
		sSprite->setFloatArg("time", u_time);
	}
	else if (nowShaderName == "floatVecTest") {
		////����shader���� 
		const int size = 5;
		//static GLfloat colorGap[size] = { 0.2f ,0.4f ,0.6f ,0.8f, 1.0f };

		/*colorGap[0] += 0.01f;
		colorGap[1] += 0.01f;
		colorGap[2] += 0.01f;
		colorGap[3] += 0.01f;
		colorGap[4] += 0.01f;*/

		sSprite->setFloatVecArg("colorGap", colorGap, size);
	}
	else if (nowShaderName == "touchWaterRipple") {
		////����shader���� 

		float touchPointX[50];
		float touchPointY[50];
		float touchPointTime[50];
		float touchPointLiveTime[50];

		int index = 0;
		auto itor = touchWaterPointData.begin(); 
		while (itor != touchWaterPointData.end()) {
			itor->nowTime += dt;

			if (itor->nowTime > itor->liveTime) {
				itor = touchWaterPointData.erase(itor);  
				continue;
			}

			touchPointX[index] = itor->touchPoint.x;
			touchPointY[index] = itor->touchPoint.y;
			touchPointTime[index] = itor->nowTime; 
			touchPointLiveTime[index] = itor->liveTime; 

			index++; 
			 
			itor++;
		}


		//// ����
		sSprite->setFloatArg("cw", sSprite->getContentSize().width * sSprite->getScaleX() );
		sSprite->setFloatArg("ch", sSprite->getContentSize().height * sSprite->getScaleY() );

		sSprite->setFloatArg("rippleSpeed", waterSpeed); 
		sSprite->setFloatArg("rippleRange", waterRange);
		sSprite->setIntArg("touchPointNum", index);


		sSprite->setFloatVecArg("touchPointX", touchPointX, index);
		sSprite->setFloatVecArg("touchPointY", touchPointY, index);
		sSprite->setFloatVecArg("touchPointTime", touchPointTime, index);
		sSprite->setFloatVecArg("touchPointLiveTime", touchPointLiveTime, index);
		
		if (isTouchWater) {
			touchWaterTimeDelayCount += dt;
			if (touchWaterTimeDelayCount > touchWaterTimeDelay) {
				touchWaterTimeDelayCount = 0;
				if (touchWaterPointData.size() > maxTouchPointNum - 1) {
					return;
				}

				//if (touchPos.x >= waterSpriteRect.origin.x && touchPos.x <= waterSpriteRect.origin.x + waterSpriteRect.size.width && touchPos.y >= waterSpriteRect.origin.y && touchPos.y <= waterSpriteRect.origin.y + waterSpriteRect.size.height) {
				TouchWaterPoint touchWaterPoint;
				touchWaterPoint.touchPoint = nowTouchWaterPos;

				float maxLength = sqrt(pow(std::max(touchWaterPoint.touchPoint.x, waterSpriteRect.size.width - touchWaterPoint.touchPoint.x), 2) + pow(std::max(touchWaterPoint.touchPoint.y, waterSpriteRect.size.height - touchWaterPoint.touchPoint.y), 2));

				touchWaterPoint.liveTime = maxLength / waterSpeed;


				touchWaterPointData.push_back(touchWaterPoint);

				//}
			}
		}

	}
	
	//////��������---------------------------------------------
	//////light shader
	lightHeight = CCRANDOM_0_1() * 6 + 6;
	lightWidth = CCRANDOM_0_1() * 30 + 10;
	lightStart = 0;
	lightHeight2 = CCRANDOM_0_1() * 4 + 4;
	lightWidth2 = CCRANDOM_0_1() * 30 + 10;
	lightStart2 = 0;
	lightHeight3 = CCRANDOM_0_1() * 2 + 2;
	lightWidth3 = CCRANDOM_0_1() * 30 + 10;
	lightStart3 = CCRANDOM_0_1() * 360;
	//////flash shader
	flashFirstWidth = CCRANDOM_0_1() * 20 + 5;
	flashStartHeight = 15;     ///���һֱ���м�
	flashFirstHeight = CCRANDOM_0_1() * 20 - 10;
	/////vortex shader
	if (vortexRadius > 20)
		vortexRadius -= (vortexRadius - 20)/40;
	vortexAngle += 0.3;
	//////drawEdge shader
	outLineSize = 0.03;  //��0~1��
	outLineColor = Vec3(0, 0.86, 1);
	circleLightAngle = 0;
	////water shader
	waterTime += dt/2;
	////wire shader
	wireDurationNum1 = CCRANDOM_0_1() * 4 + 3;
	wireDurationNum2 = CCRANDOM_0_1() * 4 + 3;
	wireDurationNum3 = CCRANDOM_0_1() * 4 + 3;
	startAngle1 = CCRANDOM_0_1() * 360;
	startAngle2 = CCRANDOM_0_1() * 360;
	startAngle3 = CCRANDOM_0_1() * 360;
	wireStartHeight1 += 0.003;
	wireStartHeight2 += 0.013;
	wireStartHeight3 += 0.008; 
	wireHeight1 = (CCRANDOM_0_1() * 15)*0.001 + 0.01;
	wireHeight2 = (CCRANDOM_0_1() * 15)*0.001 + 0.01;
	wireHeight3 = (CCRANDOM_0_1() * 15)*0.001 + 0.01;
	wireSize1 = (CCRANDOM_0_1() * 7)*0.001 + 0.002;
	wireSize2 = (CCRANDOM_0_1() * 7)*0.001 + 0.002;
	wireSize3 = (CCRANDOM_0_1() * 7)*0.001 + 0.002;
	////godLight shader
	u_time += 3*dt;
	u_num_sample = 50;   //�ϵ�֮�⣬һ��������Դ��ľ����Ϸ�Ϊ���ٷݣ���������Щ������ɫ
	u_weight = 0.04;     //���ӵ���ɫ��Ҫ����һ��  ��������Ȼ�ͻ����
	////mask shader
	radius = 0.2;
	center = Vec2(0.5, 0.5);
	centerColor = Vec4(1, 1, 1, 0);
	maskColor = Vec4(0, 0, 0, 0);
	//

}

void HelloWorld::menuCloseCallback(Ref* pSender)
{
#if (CC_TARGET_PLATFORM == CC_PLATFORM_WP8) || (CC_TARGET_PLATFORM == CC_PLATFORM_WINRT)
	MessageBox("You pressed the close button. Windows Store Apps do not implement a close button.","Alert");
	return;
#endif

	Director::getInstance()->end();

#if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
	exit(0);
#endif
}


bool HelloWorld::onTouchBegan(cocos2d::CCTouch* pTouch, cocos2d::CCEvent* pEvent) {
	
	

	Vec2 touchPos = pTouch->getLocation();

	if (nowShaderName == "touchWaterRipple") {

		if (touchPos.x >= waterSpriteRect.origin.x && touchPos.x <= waterSpriteRect.origin.x + waterSpriteRect.size.width && touchPos.y >= waterSpriteRect.origin.y && touchPos.y <= waterSpriteRect.origin.y + waterSpriteRect.size.height) {
			isTouchWater = true;
			nowTouchWaterPos = Vec2((touchPos.x - waterSpriteRect.origin.x), waterSpriteRect.size.height - (touchPos.y - waterSpriteRect.origin.y));
		}

	}

	return true;
}

void HelloWorld::onTouchMoved(cocos2d::CCTouch* pTouch, cocos2d::CCEvent* pEvent) {

	Vec2 touchPos = pTouch->getLocation();

	if (nowShaderName == "touchWaterRipple") {

		if (touchPos.x >= waterSpriteRect.origin.x && touchPos.x <= waterSpriteRect.origin.x + waterSpriteRect.size.width && touchPos.y >= waterSpriteRect.origin.y && touchPos.y <= waterSpriteRect.origin.y + waterSpriteRect.size.height) {
			
			nowTouchWaterPos = Vec2((touchPos.x - waterSpriteRect.origin.x), waterSpriteRect.size.height - (touchPos.y - waterSpriteRect.origin.y));


		}

	}
}


void HelloWorld::onTouchEnded(cocos2d::CCTouch* pTouch, cocos2d::CCEvent* pEvent) {
	isTouchWater = false;


	/*Vec2 touchPos = pTouch->getLocation();

	if (nowShaderName == "touchWaterRipple") {

		if ( touchWaterPointData.size() > maxTouchPointNum) {
			return;
		}

		if (touchPos.x >= waterSpriteRect.origin.x && touchPos.x <= waterSpriteRect.origin.x + waterSpriteRect.size.width && touchPos.y >= waterSpriteRect.origin.y && touchPos.y <= waterSpriteRect.origin.y + waterSpriteRect.size.height) {
			TouchWaterPoint touchWaterPoint;
			touchWaterPoint.touchPoint = Vec2( (touchPos.x - waterSpriteRect.origin.x) , waterSpriteRect.size.height - (touchPos.y - waterSpriteRect.origin.y) );
		 	
			float maxLength = sqrt(pow(std::max(touchWaterPoint.touchPoint.x, waterSpriteRect.size.width - touchWaterPoint.touchPoint.x), 2) + pow(std::max(touchWaterPoint.touchPoint.y, waterSpriteRect.size.height - touchWaterPoint.touchPoint.y), 2)) ;
			
			touchWaterPoint.liveTime = maxLength / waterSpeed;
			
			
			touchWaterPointData.push_back(touchWaterPoint);

		}

	}*/
}
