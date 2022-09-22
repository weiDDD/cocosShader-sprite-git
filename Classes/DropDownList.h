///////////、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、/下拉列表类
////下拉列表
#ifndef DROPDOWNLIST_h
#define DROPDOWNLIST_h
#include "cocos2d.h"
USING_NS_CC;


class DropDownList : public Layer
{
public:
	//构造方法
	DropDownList(LabelTTF* label, Size size)
		: showLabel(label)
		, isShowMenu(false)
		, lastSelectedIndex(0)
	{
		//创建好一个menu，但是现在还不添加到视图中
		mainMenu = Menu::create();
		mainMenu->setPosition(Point(size.width / 2, size.height / 2));
		mainMenu->retain();

		showLabel->setPosition(Point(size.width / 2, size.height / 2));
		addChild(showLabel);
		////
		selectBg = Sprite::create("listBg1.png");
		selectBg->setPosition(Point(size.width / 2, size.height / 2));
		selectBg->setScaleX(size.width / selectBg->getContentSize().width);
		selectBg->setScaleY(size.height / selectBg->getContentSize().height);
		selectBg->setOpacity(140);
		addChild(selectBg, -100);

		setContentSize(size);
	}

	//析构函数
	~DropDownList()
	{
		mainMenu->release();
	}

	//创建实例对象方法
	static DropDownList* create(LabelTTF* label, Size size)
	{
		DropDownList* list = new DropDownList(label, size);
		list->autorelease();
		return list;
	}
	//获取当前选中label的string
	std::string getString()
	{
		return showLabel->getString();
	}

	//获取当前选中的index
	int getSelectedIndex()
	{
		return lastSelectedIndex;
	}

	//设置选中index
	void setSelectedIndex(int index)
	{
		lastSelectedIndex = index;

		for (int i = 0, j = (int)selectLabels.size(); i < j; ++i)
		{
			if (i == lastSelectedIndex)
			{
				bgSprites[i]->setColor(Color3B(255, 40, 255));
				showLabel->setString(selectLabels[i]->getString());
			}
			else
			{
				bgSprites[i]->setColor(Color3B(255, 255, 255));
			}
		}
	}

	////设置选择的是哪个的文字，根据文字获得
	void setSelectedIndexByString(std::string name)
	{
		for (int i = 0; i < (int)selectLabels.size(); ++i)
		{
			if (name == selectLabels[i]->getString()){
				bgSprites[i]->setColor(Color3B(255, 40, 255));
				showLabel->setString(selectLabels[i]->getString());
			}
			else
			{
				bgSprites[i]->setColor(Color3B(255, 255, 255));
			}
		}
	}

	void onEnter()
	{
		setTouchEnabled(true);
		auto listener = EventListenerTouchOneByOne::create();
		listener->setEnabled(true);
		listener->setSwallowTouches(true);
		listener->onTouchBegan = [=](Touch *touch, Event *event)
		{
			if (!isShowMenu)
			{
				Rect rect;
				rect.origin = Vec2(0, 0);
				rect.size = getContentSize();
				Point position = convertTouchToNodeSpace(touch);

				if (rect.containsPoint(position))
				{
					isShowMenu = true;

					//点击，显示下拉列表框，也就是mainMenu
					addChild(mainMenu);

					for (int i = 0, j = (int)selectLabels.size(); i < j; ++i)
					{
						if (i == lastSelectedIndex)
						{
							bgSprites[i]->setColor(Color3B(255, 40, 255));
						}
						else
						{
							bgSprites[i]->setColor(Color3B(255, 255, 255));
						}
					}
					return true;
				}
			}
			else{
				onClose();
				return true;
			}

			return false;
		};
		listener->onTouchEnded = [=](Touch *touch, Event *event){

		};

		EventDispatcher *dispatcher = Director::getInstance()->getEventDispatcher();
		dispatcher->addEventListenerWithSceneGraphPriority(listener, this);
		Layer::onEnter();
	}

	//创建以menu item 并添加一个label覆盖到上面
	void addLabel(LabelTTF* label)
	{
		Size size = getContentSize();

		selectLabels.push_back(label);

		MenuItem* item = MenuItemImage::create(
			"listBg2.png",
			"listBg2.png",
			CC_CALLBACK_1(DropDownList::onSelected, this)
			);
		bgSprites.push_back(item);
		label->setAnchorPoint(Point(0.5, 0.5));
		label->setColor(Color3B(0, 0, 0));
		label->setPosition(Point(size.width/2, size.height / 2));
		float sx = size.width / item->getContentSize().width;
		float sy = size.height / item->getContentSize().height;
		item->setScaleX(sx);
		item->setScaleY(sy);

		/*label->setScaleX(4*size.width/5 /sx / label->getContentSize().width );
		label->setScaleY(2*size.height/3 / sy / label->getContentSize().height);*/

		item->addChild(label);
		item->setTag((int)selectLabels.size() - 1);
		//item->setOpacity(200);
		item->setPosition(0, -(int)selectLabels.size() * size.height);

		mainMenu->addChild(item);
	}

	//选中下拉列表后
	void onSelected(Object* sender)
	{
		MenuItem* item = dynamic_cast<MenuItem*>(sender);
		if (item)
		{
			lastSelectedIndex = item->getTag();
			showLabel->setString(selectLabels[item->getTag()]->getString());
		}
		onClose(); //关闭下拉列表框
	}


	//关闭下拉列表框
	void onClose()
	{
		removeChild(mainMenu, true);  //通过删除mainMenu,关闭下拉列表框
		isShowMenu = false;
	}


	/////为下拉列表，增加外部回调函数
	void setItemCallBack(const cocos2d::ccMenuCallback& func){
		std::vector<MenuItem*>::iterator itor = bgSprites.begin();
		while (itor != bgSprites.end()){
			(*itor)->setCallback(func);
			itor++;
		}
	}

private:
	////背景图片，选中的主背景，其他子列表的背景
	Sprite* selectBg;
	std::vector<MenuItem*> bgSprites; //用于设置 背景


	Menu* mainMenu;  //下拉列表选项的集合

	LabelTTF* showLabel;  //显示选中的结果

	std::vector<LabelTTF*> selectLabels;  //下拉列表label

	bool isShowMenu;  //是否显示了下拉列表

	int lastSelectedIndex;  //选中下拉列表的index

};

#endif
