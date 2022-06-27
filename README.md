# LionKingCesium
本项目研究两问题:Cesium的封装打包、Cesium高效加载TLE卫星轨道
## 关于Cesium封装打包
这里是探索在横向扩展Cesium后将Cesium打包成一个第三方库，提供给其他小伙伴使用。适用于在行业内扩展Cesium后，封装成产品发布成自有产品。
本项目只尝试将卫星加载功能封装成SatelliteLayer类，用于卫星加载。封装后的库名称为：LionCesium
##
卫星加载测试效果(轨道数量:23K)
![image](https://github.com/KingHuaBo/LionKingCesium/blob/main/public/Images/laodStatlite.png)

## 卫星轨道数据来源
https://celestrak.com/（开发环境需要代理跨域）

## 环境介绍
1. node版本 v14.18.1
2. npm版本 6.14.15
3. vite 2.9.0
4. vue 3.2.25
5. cesium 1.92.0
6. 开发工具 vscode
