<div align="center">

<img src="./assets/lifuka.png" alt="丽芙卡 grokbot-like avatar" width="150" />

# 🐱 丽芙卡 bot // lifuka-bot 🐱

基于 Koishi 的《蛋仔派对》bot 插件。

<small>~~至于为啥叫这个名字是因为维护者喜欢丽芙卡~~</small>
</div>

> [!WARNING]  
> 该 bot 项目由社区维护，使用的所有与《蛋仔派对》相关的 图片 / 音频 等资源的版权归 **网易公司（NetEase, Inc）** 所有。  
> 维护者与网易及其子公司无任何关联。  
> 如有侵权可联系 littlekan233@qq.com 。

## 🤔 开发这个插件的动机
主要是心血来潮，想写一个蛋仔派对的bot，然后就有了这个项目（

## ✨ 功能
> ~~虽然都还在做~~  
> 不过如果你愿意可以提一些新功能 会看着实现难度加入这里（
- [ ] 自带帮助（可能会顶替原有的 help 插件）
- [ ] 公告渲染
- [ ] 玩家基本信息预览
- [ ] 超燃对局数据预览
- [x] ~~好了我就想到这些（~~


## 🚀 使用
> [!IMPORTANT]  
> 后续会有所变动。
> npm的话stable了再发（
1. 安装插件
  - 通过模板项目创建

  可以通过以下命令安装：

  ```sh
  # npm
  npm run clone EggyFly/lifuka-bot
  # yarn
  yarn clone EggyFly/lifuka-bot
  ```

  - 手动搭建

    > 这个就比较麻烦了（

    可以通过以下命令安装：

    ```sh
    cd /path/to/koishi
    mkdir external/lifuka-bot # 这里随意，但建议有一个文件夹专门存放第三方插件
    git clone https://github.com/EggyFly/lifuka-bot.git external/lifuka-bot
    ```

2. 启用插件
  - 通过模板项目创建

    > 这里稍后补图。

    在控制台“插件配置”界面中，点击右上角“添加插件”，找到lifuka-bot并添加。

  - 手动搭建

    在项目入口文件添加以下内容：

    ```javascript
    // 假设你的 Koishi 应用变量叫 ctx

    // CommonJS

    ctx.plugin(require("./external/lifuka-bot"));

    // ESM / TypeScript

    // ...
    import * as lifuka_bot from "./external/lifuka-bot";
    // ...
    ctx.plugin(lifuka_bot);
    ```

## 🌱 贡献
欢迎各路大佬来协助~~我这个大区~~完善本插件！

提交请遵守 [Conventional Commits 规范](//www.conventionalcommits.org/)。

使用 AI 贡献也被允许，但 **请您在提交前仔细审阅 AI 的改动，并且要为这些改动负责**。

## 📝 协议
项目使用 GPLv3 协议进行分发。