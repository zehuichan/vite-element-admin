# vite-element-admin

## 技术栈

1. vue@2.7
2. pinia
3. vue-router@3.6
4. vueuse@latest
5. element-ui@latest
6. unocss@latest

目前 `element-ui` 使用完整导入

## 准备

- [node](http://nodejs.org/) 和 [git](https://git-scm.com/) -项目开发环境
- [Vite](https://vitejs.dev/) - 熟悉 vite 特性
- [Vue3](https://v3.vuejs.org/) - 熟悉 Vue 基础语法
- [Es6+](http://es6.ruanyifeng.com/) - 熟悉 es6 基本语法
- [Vue-Router](https://v3.router.vuejs.org/) - 熟悉 vue-router 基本使用
- [Element](https://element.eleme.io/) - ui 基本使用

## 起步

- 安装依赖

```bash
cd [project]

npm install
```

- 运行

```bash
npm run dev
```

feat:

- 媒体查询
- 按钮权限、菜单权限
- 一些公共组件

## 目录结构

```
├─build
├─mock
├─public
│
└─src
    │  App.vue
    │  main.js
    │
    ├─api # api接口
    ├─assets  # 图片、视频、音频、字体等资源
    │  ├─images
    │  ├─logo
    │  └─styles
    │
    ├─components # 组件库
    ├─enums # 前端枚举
    ├─hooks # 钩子函数
    ├─install # 指令、插件
    │  ├─directives
    │  └─plugins
    │
    ├─layouts # 骨架
    │  ├─blank
    │  └─default
    │
    ├─router # 路由
    │
    ├─store # store
    │
    ├─utils # 工具方法
    │
    └─views # 页面
```

## 常见问题

### 首先有任何报错，最简单的方法是把报错信息复制到浏览器里面搜索一下！！！

- [Google 点我](https://www.google.com/)
- [百度点我](https://www.baidu.com/)

## 致谢

基于 [@PanJiaChen](https://github.com/PanJiaChen)
的 [vue-element-admin](https://github.com/PanJiaChen/vue-element-admin) 二次开发的模板
