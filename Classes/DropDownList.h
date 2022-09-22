///////////����������������������������������������������������������������������������������������/�����б���
////�����б�
#ifndef DROPDOWNLIST_h
#define DROPDOWNLIST_h
#include "cocos2d.h"
USING_NS_CC;


class DropDownList : public Layer
{
public:
	//���췽��
	DropDownList(LabelTTF* label, Size size)
		: showLabel(label)
		, isShowMenu(false)
		, lastSelectedIndex(0)
	{
		//������һ��menu���������ڻ�����ӵ���ͼ��
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

	//��������
	~DropDownList()
	{
		mainMenu->release();
	}

	//����ʵ�����󷽷�
	static DropDownList* create(LabelTTF* label, Size size)
	{
		DropDownList* list = new DropDownList(label, size);
		list->autorelease();
		return list;
	}
	//��ȡ��ǰѡ��label��string
	std::string getString()
	{
		return showLabel->getString();
	}

	//��ȡ��ǰѡ�е�index
	int getSelectedIndex()
	{
		return lastSelectedIndex;
	}

	//����ѡ��index
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

	////����ѡ������ĸ������֣��������ֻ��
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

					//�������ʾ�����б��Ҳ����mainMenu
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

	//������menu item �����һ��label���ǵ�����
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

	//ѡ�������б��
	void onSelected(Object* sender)
	{
		MenuItem* item = dynamic_cast<MenuItem*>(sender);
		if (item)
		{
			lastSelectedIndex = item->getTag();
			showLabel->setString(selectLabels[item->getTag()]->getString());
		}
		onClose(); //�ر������б��
	}


	//�ر������б��
	void onClose()
	{
		removeChild(mainMenu, true);  //ͨ��ɾ��mainMenu,�ر������б��
		isShowMenu = false;
	}


	/////Ϊ�����б������ⲿ�ص�����
	void setItemCallBack(const cocos2d::ccMenuCallback& func){
		std::vector<MenuItem*>::iterator itor = bgSprites.begin();
		while (itor != bgSprites.end()){
			(*itor)->setCallback(func);
			itor++;
		}
	}

private:
	////����ͼƬ��ѡ�е����������������б�ı���
	Sprite* selectBg;
	std::vector<MenuItem*> bgSprites; //�������� ����


	Menu* mainMenu;  //�����б�ѡ��ļ���

	LabelTTF* showLabel;  //��ʾѡ�еĽ��

	std::vector<LabelTTF*> selectLabels;  //�����б�label

	bool isShowMenu;  //�Ƿ���ʾ�������б�

	int lastSelectedIndex;  //ѡ�������б��index

};

#endif
