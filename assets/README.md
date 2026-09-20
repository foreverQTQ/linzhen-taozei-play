# 浏览器正式资源目录

这里保存游戏运行时直接加载的压缩素材。高清源稿放在项目根目录 `art_sources/`，不会进入网页构建包。

## 图片分类

| 目录 | 内容 | 配置入口 |
| --- | --- | --- |
| `images/battlefield/` | 五丈原、箕谷、陈仓、荆州、夷陵、赤壁等地图 | `BattleVisualData.js`、`CampaignData.js` |
| `images/buildings/` | 蜀魏箭塔、主城和废墟 | `BattleVisualData.js` |
| `images/units/generals/` | 26名武将动作图集 | `GeneralSpriteData.js` |
| `images/units/escorts/` | 8类基础随从动作图集 | `EscortSpriteData.js` |
| `images/units/beasts/` | 青龙、白虎、朱雀、玄武动作图集 | `BeastData.js` |
| `images/gameplay/formations/` | 7种阵法的卡面与战场主体图 | `SkillCardData.js` |
| `images/gameplay/structures/` | 步兵营、弓弩营的卡面与场景图 | `StructureCardData.js` |
| `images/effects/` | 普攻、技能、箭塔和主城弹道图集 | `EffectSpriteData.js` |
| `images/story/prologue/` | 序章插画 | `StoryVisualData.js` |
| `images/story/epilogue/` | 12关战后插画 | `StoryVisualData.js` |
| `images/story/finale/` | 12幕终章插画 | `StoryVisualData.js` |
| `images/ui/` | 主菜单、模式页、卡牌头像和界面背景 | 各UI资源数据文件 |
| `icons/` | PWA与桌面图标 | `manifest.webmanifest` |

## 动作图统一规范

- 26名武将和4只神兽使用4列×4行动作表。
- 四行从上到下依次为：待机、移动、普通攻击、专属技能。
- 8类基础随从同样使用4×4动作表，但第四行是受击倒地。
- 空白区域必须是真实Alpha透明，不能把灰白棋盘格画进图片。

## 卡牌图片

当前35张卡牌均有独立的图片入口：26张武将头像、7张阵法图和2张营寨图。界面从 `CardPortraitData.js` 统一查询，因此更换图片时不需要修改手牌场景。

## 音频说明

背景音乐和大部分短音效由 `AudioService` 通过Web Audio实时合成，可以减小下载体积并避免大量零散音频文件。若以后改用录制音频，应放入 `audio/bgm/` 或 `audio/sfx/`，并继续由 `AudioService` 统一控制音量和并发。

## 新增资源时必须做什么

1. 把网页真正使用的压缩文件放入本目录的正确分类。
2. 在 `src/data/` 对应资源表登记 `key` 与相对路径。
3. 在 `AssetLoadingService` 对应的场景队列中确认资源会按需加载；首屏不要无条件预载大型素材。
4. 把可返修高清稿和来源说明放入 `art_sources/`。
5. 运行 `npm test` 与 `npm run build`，检查路径、尺寸和发布包。

## 公网发布图片处理

`public/assets/` 和 `art_sources/` 保存可继续开发的正式素材。执行 `npm run build:publish` 时，
`scripts/optimize-mobile-build.mjs` 只处理 `dist-publish/` 副本：转换或重压图片、把动作表缩到发布尺寸、
删除未被程序引用的历史文件，并加入缓存查询标记。不要为了缩小网站而直接覆盖源码中的高清动作表。
