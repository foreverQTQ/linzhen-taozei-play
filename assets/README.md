# 资源组织

当前战场、武将、随从、建筑、主菜单和远程特效均已接入正式图片；范围提示及次要粒子由Phaser高性能共享绘图层生成，音乐音效由AudioService实时合成。

正式素材按以下位置存放：

- images/units/generals、images/units/escorts、images/buildings：武将、士兵和建筑。
- images/battlefield、images/ui、images/effects：地图、卡牌界面、需要使用图片的技能特效。
- audio/bgm、audio/sfx：循环配乐和短音效。
- data/levels、data/config：扩展关卡与资源清单。

武将数值位于src/data/GeneralData.js，阵法牌数值位于src/data/SkillCardData.js，通用规则位于src/config/GameConstants.js；每类数值只保留一份真实来源，不要在资源说明中另建不同步的重复配置。

新增素材时同时记录文件来源与可用范围。场景加载资源后，显示层读取图片清单；更换同规格图片不需要修改战斗规则。

## 已加入的正式武将动作表

`images/units/generals/`下包含刘备、关羽、张飞、赵云、黄忠、诸葛亮、典韦、夏侯惇8张正式运行图。每张均为1024×1024透明PNG，共4列×4行，每格256×256。

四行从上到下依次为：待机、行走、普通攻击、怒气技能；每行从左到右播放。高清生成源图放在项目根目录的`art_sources/generals/`，不会被浏览器加载。完整制作规范和生成提示词见`docs/art-production.md`。

## 已加入的兵种、地图和建筑

- `images/units/escorts/`：蜀军亲卫、青龙亲卫、虎卫步兵、白马义从、弓箭手、军师卫队、近卫力士、虎豹卫。每张为1024×1024透明PNG，四行依次为待机、行军、攻击、受击倒地。
- `images/battlefield/wuzhang-plains-night-v3.png`：与规则层双桥位置对齐的五丈原夜战战场；河道更窄、桥更短，南北作战陆地更大。
- `images/buildings/fortifications-v1.png`：蜀、魏的箭楼、主城及双方废墟，共8帧。

这些素材的高清生成源图存放在项目根目录`art_sources/`，完整提示词与替换方法见`docs/art-production.md`。

## 已加入的卡牌图像

`images/ui/cards/`下包含8张武将头像，`images/ui/cards/skills/`包含八卦阵和烈火阵2张阵法卡面，全部为512×512方形PNG。它们在底部手牌中缩放为50×50显示，核心人物或阵法符号仍能辨认。图像统一由`src/data/CardPortraitData.js`对UI导出，高清生成源图位于`art_sources/cards/`。

## 已加入的主菜单与战斗特效

- `images/ui/main-menu/zhugeliang-stargazing-v1.png`：540×960诸葛亮坐木制轮椅车在五丈原观星的竖屏背景。
- `images/effects/combat-projectiles-v2.png`：1024×1024、真实透明的4×4动作表，四行分别为金色箭矢、紫色弩光、塔楼火弹和火计燃烧。
- `images/effects/fortification-projectiles-v1.png`：1024×512、真实透明的4×2动作表，上排为箭塔青铜弩矢，下排为主城三缕赤金军令枪。

运行配置分别位于`src/data/UIVisualData.js`和`src/data/EffectSpriteData.js`；高清源图位于`art_sources/ui/`与`art_sources/effects/`。
