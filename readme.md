## 2023年06月02日01:16:29
通过 pinia 插件做数据存储

## 2023年06月02日01:45:57
1、使用 splitpanes 组件，做拖拽分隔面板

## 2023年06月03日01:54:53
1、加上 tailwind

## 2023年06月04日19:59:16
试试 element 提供的模版
https://vite-starter.element-plus.org/

## 2023年06月25日00:40:30
1、做好了表达式解析， 表达式运行的上下文会有 state、_、qs
2、做好了函数字符串解析， 表达式运行的上下文会有 state、_、qs
3、完成了 url参数变量的开发，表达式为qs.parse(window.location.search);
4、页面变量完成了增删改查和复制。
5、最佳实践：
在pinia插件中，获取本地数据localforage 的时候，再初始化一次 store 的init 办法来初始化数据
```
  // 初始化 store
  if (store.init) {
    store.init();
  }
```

## 2023年06月26日00:46:41
添加了环境， dev、test、uat、prod， 当前运行的就是 dev 平台环境
做了环境后，才可以区分数据源在不同环境的url。

## 2023年06月27日00:54:18
2、页面变量之间的相互引用怎么处理好： 使用了 computed 来处理响应式

```
  expression = `return () => ${expression}`;
    argNames.push(expression);
    const fun = new Function(...argNames);
    const refFun = fun(...argValues, ...arg);
    return computed({
      get: refFun,
      set() {},
    });
```

## 2023年06月29日02:01:38
正在做添加接口数据源的页面，
5、接口名、数字字母下横线
6、描述
2、支持 method 方法
3、支持设置url, 并支持根据环境设置url

想来想去，还是合并了域名和path 组成 url，在做据环境设置url

## 2023年07月02日02:31:48
根据环境设置url - 如果环境本来就有 url 值， 就不获取 api url 替代

## 2023年07月04日23:23:00

一、client tsconfig.json 通过 extends 解决了 FormInstance 引用问题， 可能是 pnpm 软连接 element-ui 的问题吧，要引用到最上层。
```
src/components/api-data-source/add-api-data-source.vue:52:15 - error TS2614: Module '"element-plus"' has no exported member 'FormInstance'. Did you mean to use 'import FormInstance from "element-plus"' instead?

52 import type { FormInstance, FormRules } from 'element-plus';
```
二、加上了element-ui 的日夜主题切换
三、处理了 ts 声明报错问题

## 2023年07月14日23:57:16

通过 vite-plugin-monaco-editor 接入了 monaco-editor 编辑器

和接入了vue3-form-element渲染form组件


## 2023年07月16日00:09:18
monaco editor 编辑器hover、focus 边框样式与element 一致。

## 2023年07月17日01:04:15
添加了monaco json 的校验
添加了参数修剪和响应修剪的 monaco-editor， 定义了插件
```
  // 响应数据结构 json string
  response: string,
  // 数据源本身的前置插件
  prePlugin: '',
  // 数据源引用的前置插件
  prePlugins: [],
  // 数据源本身的后置插件
  postPlugin: '',
  // 数据源引用的后置插件
  postPlugins: [],
```

## 2023年08月10日02:17:39
已支持接口调试面板其中功能点

1、接口调试面板在放在基本信息右侧
2、调试面板支持多环境发起

## 2023年09月05日00:54:18
优化data-source数据


## 2023年09月05日01:18:21
fix： localforage 存储不了的问题

## 2023年09月12日00:18:47
1、使用了组合式函数 useFun 来解决上下文的问题，理解 vue 组合式函数的使用，返回相应对象，保持同步
2、引用router 对象代替 useRouter 和 useRoute ，他们在纯函数使用的时候没有在 vue 上下文，里面的inject 办法回失效，导致 useRoute 不可用

## 2023年09月12日23:51:06
1、通过 pinia 的监听保存，实现了数据源是否打开，选中了那个数据源的缓存


## 2023年09月16日02:09:12
1、支持解析 js 字符串，返回 json 字符串
2、支持了请求体和响应体的输入

## 2023年09月17日02:33:51
1、支持页面数据源的编辑、删除和复制
2、支持页面变量的解析更新


## todos

一、接口数据源的开发。
接口调试面板

3、调试面板支持查看请求信息、接口响应、请求结果
4、支持其后置插件修剪


7、需要一份默认响应数据用于平台环境搭建页面
4、支持mock，并在平台环境mock一份数据使用
5、支持开启自动加载，开启后支持串行还是并行（开启后，会在「页面加载前」及「依赖的变量变化时」自动加载数据），在预览、出码、构建后的页面加载后立马调用
6、支持参数修剪、响应修剪，支持添加前置拦截器、后置拦截器，




2、页面变量之间的相互引用怎么处理好
先 设计数据源
1、了解无极数据源、阿里渲染引擎数据源
阿里宜搭的数据源有
变量、
远程数据、
url参数变量
3种，用颜色区分，集中挂在 state 上
url变量名叫 urlParams

无极数据源有
页面变量、
接口数据源变量、
url参数变量、
项目变量、
无极的页面变量是和数据源是分开的， 页面变量挂在state上， 数据源挂在 data 上，
无极也是把url参数默认提了出来， 是 $query

微搭提供了
数据模型（领域模型），支持在平台上自定义数据库表，
云函数
等平台上的其他数据能力


我的设计：参考无极，一切以数据为基础，设计好数据源，支持页面变量、url参数变量、接口数据源变量（支持schema）
1、组件绑定数据源的时候，可以切换显示数据源内容或者默认的内容：比如按钮默认显示文本就是按钮，支持切换显示绑定的数据源字段state.buttonText，或者里面显示绑定的内容



2、定义组件， 参考下阿里的渲染引擎，文档太多，间歇性看