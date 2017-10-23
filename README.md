# vue-myapp
## 运行项目

```
git clone https://github.com/523451928/vue-myapp.git
cd vue-plugin
npm install
npm run dev
```
## 技术栈
- Vue全家桶（使用Vue-cli作为构建工具）
- Mint-Ui
- Es6
- Sass
- betterscroll,fastclick等第三方库

## 运行演示

#### 线上地址：http://mp.hks360.com:13001/myapp/
#### 移动端请扫描下面二维码：

![二维码](https://qr.api.cli.im/qr?data=http%253A%252F%252Fmp.hks360.com%253A13001%252Fmyapp%252F&level=H&transparent=false&bgcolor=%23ffffff&forecolor=%23000000&blockpixel=12&marginblock=1&logourl=&size=280&kid=cliim&key=e5c6bb875620e56424509e3a2d30129d)

## 项目结构 ##
```

|-- build                            // webpack配置文件
|-- config                           // 项目打包路径
|-- src                              // 源码目录 
|   |-- api                          // ajax接口
|       |-- api.js                 
|   |-- assets                       // 图片资源,js,css文件
|   |-- components                   // 组件
|       |-- Home.vue                 // 首页
|       |-- Reader.vue           	   // 阅读
|       |-- Movie.vue                // 电影
|       |-- Music.vue                // 音乐
|       |-- Nba.vue                  // NBA
|       |-- home                     // 首页栏目下的相关组件
|       |-- music                    // 音乐栏目下的相关组件
|       |-- nba                      // NBA栏目下的相关组件
|       |-- reder                    // 阅读栏目下的相关组件
|       |-- movie                    // 电影栏目下的相关组件    
|   |-- router                       // Vue 路由
|       |-- index.js
|   |-- store                        // Vuex Store文件，APP核心所在
|       |-- index.js       
|   |-- filter                       // 过滤器函数
|       |-- filter.js            
|   |-- public                       // 公共组件
|       |-- Bscroll.vue              // 滚动组件
|       |-- Confirm.vue              // 弹窗确认组件
|       |-- Pickdate.vue             // 日期组件
|       |-- Siderbar.vue             // 侧边栏组件
|       |-- Star.vue                 // 评分组件
|       |-- Swiper.vue               // 轮播图组件
|   |-- App.vue                      // App入口文件
|   |-- main.js                      // 程序入口文件，加载Vuex,Vue-router等插件
|-- .babelrc                         // ES6语法编译配置
|-- .editorconfig                    // 代码编写规格
|-- .eslintignore                    // Eslint 忽略的文件
|-- .eslintrc.js                     // EsLint 配置 暂未使用 
|-- .gitignore                       // git ingnore
|-- .postcssrc.js                    // post css 配置文件
|-- README.md                        // README
|-- index.html                       // 入口html文件
`-- package.json                     // 项目及工具的依赖配置文件

```
