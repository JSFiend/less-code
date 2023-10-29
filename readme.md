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

## 2023年09月17日23:29:10
1、为了更好的维护， 页面变量的 store 和 api数据源的 store 从 dataSource里面抽离出来
2、页面变量的增加、复制、删除整改完成。
3、下一步整改api数据源的添加、复制、删除

## 2023年09月18日23:56:48
api数据源支持添加、复制、删除

## 2023年09月22日00:24:10
1、数据源编辑支持编辑数据记录

2、实际参数支持更新请求体的新增字段，并且保留自身的内容，但是不支持更新请求体的删除字体

## 2023年10月11日00:23:50
1、支持用表格是解析实际参数

## 2023年10月11日23:19:17
1、添加了 vite-plugin-mock 来模拟本地开发数据
2、添加了 接口调试面板

## 2023年10月11日23:48:24
1、 引入了 Vjsf (Vue JSON Schema Form) 作为组件属性编辑

## 2023年10月16日01:04:18
1、支持批量引用组件的 config了

## 2023年10月16日22:50:52
1、实现了从 op-kit 组件库聚合组件 config 显示在平台组件库面板
todo： 组件库面板支持拖拽

## 2023年10月18日00:02:19
1、有了 component-instance-list 渲染组件列表了。
2、编辑面板可以编辑当前选中组件的 dataSchema 了
todo: 模拟器渲染出渲染列表内容

## 2023年10月19日03:46:14
1、初步渲染组件，和组件属性， 属性也能绑定组件

todo：组件的外层，选中组件和删除组件

## 2023年10月20日01:32:31
1、支持了组件名加随机数的唯一 uniqueId 属性
2、支持了选中的外框

todo: 外框绑定选中组件，点击支持选中组件

## 2023年10月21日00:28:21
1、支持了容器组件的渲染和子组件的渲染
2、支持点击选中组件
3、支持选中组件后显示外框

## 2023年10月22日04:45:21
重要！！！  
1、终于只用一个组件就可以实现了渲染容器组件和基础组件。
1.1、对于容器组件来说， 不管是一个插槽还是多个插槽，都添加了一层插槽 child。
就是渲染的时候：
 list -> basecomponent
 list -> containercomponent -> slotChildren(需要给容器组件定义children) -> slotChildren.children 才是拖拽进来的组件
  容器组件决定了 slotChildren 插槽的显隐。 预览区确定了插槽的拖拽内容

 1.2、 插槽的命名使用 slot[slotChildren.index] 来区分，

 2、在template 中， v-if 和 v-slot 有冲突。去掉了 isCantainer 的判断

 3、 组件defineProps 属性的定义，从 dataSchema 转为 data 定义， 因为data 可能多一点数据

 todo： 编辑区域的 VueForm， 组件的 schema 会 删除 data 多余的数据， 要做兼容，不删除和 schema key 不一致的数据 

## 2023年10月23日01:49:07
1、添加了样式面板以及事件面板
2、不采取双向绑定 modelValue， 因为 vueForm 会把 schema 多余的 key 删掉。采取 merge 递归合并

todo： 事件编排的交互设计以及数据设计


## 2023年10月25日01:04:43
设计好了组件事件的样式

todo： 添加组件交互面板

## 2023年10月26日00:39:38

study： 
1、[&.active]:bg-teal-100  tailwind 自定义类的修饰符
2、hover hover:bg-teal-100 hover:dark:bg-teal-700

done： 
1、组件事件面板支持了点击选中， hover、active显示美化
2、行为面板 dialog 已做弹出


todo： 行为面板添加行为

## 2023年10月30日02:25:01
1、 支持了事件选择行为
2、行为显示行为参数
3、参数支持编辑
4、抽取 vjsf 为 edit-schema 公共组件
5、事件和行为名称从 value 改为 eventName、actionName

study:
interface abc {
  event: Record<string ,any>,
  [key: string]: any,
}

todo: 
1、优化参数内容的显示
2、编排的调用

## todos

bug： 拖拽组件到预览区域，组件可能会被重复引用。



1、补全组件的公共配置， commonconfig
2、组件的显示在组件库面板
3、编辑面板显示组件的编辑属性

不支持更新请求体的删除字体




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