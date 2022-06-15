import LionViewer from "./LionCesiumSrc/LionViewer";
import 'cesium/Build/Cesium/Widgets/widgets.css' 
import { Satellite, SatelliteOrbitOpt } from "./LionCesiumSrc/SatelliteOrbit";
import { mode } from "cesium";
(window as any).CESIUM_BASE_URL = "./ThirdPartLib/Cesium";
let global=new  LionViewer("app",{
    // requestRenderMode : true,
    // imageryProvider: new Cesium.TileMapServiceImageryProvider({
    //     url: Cesium.buildModuleUrl("Assets/Textures/NaturalEarthII"),
    //   }),
    imageryProvider:  new Cesium.UrlTemplateImageryProvider({
        url: 'https://tile-{s}.openstreetmap.fr/hot/{z}/{x}/{y}.png',
        subdomains: ["a", "b", "c", "d"],
    }),
      baseLayerPicker: false,
      geocoder: false,
});
global.scene.debugShowFramesPerSecond=true;
// let url='/NORAD/elements/gp.php?GROUP=GPS-OPS&FORMAT=TLE';
// let url='/NORAD/elements/gp.php?GROUP=Beidou&FORMAT=TLE';
// let url='/NORAD/elements/gp.php?GROUP=STATIONS&FORMAT=TLE';
// let url='/NORAD/elements/gp.php?SPECIAL=gpz&FORMAT=TLE';
// let url='/NORAD/elements/gp.php?GROUP=starlink&FORMAT=tle';
let url='/pub/TLE/catalog.txt';
// let url='/NORAD/elements/active.txt';
fetch(url,{
    method:'GET',   
})
.then(res =>{
    
    res.text().then(
        data=>{
            console.log(data);
            
           let tleArr= data.split('\r\n');
           console.log(tleArr.length/3);
           for(let index=0;index<tleArr.length;index=index+3){
              let satellite1=new Satellite(tleArr[index],tleArr[index+1]+'\r\n'+tleArr[index+2])  
              global.SatelliteLayer.add(satellite1);
           } 
           console.log(global.SatelliteLayer);
            
        }
    );
    
})
// let satelliteOpt=new SatelliteOrbitOpt("tle","name");
// let satellite =new Satellite("wx1",
// `1 48274U 21035A   22112.25640462  .00046046  00000-0  55052-3 0  9993
// 2 48274  41.4734 199.0119 0011771 190.6473 200.6215 15.60105213 56031`)
// global.SatelliteLayer.add(satellite);
// console.log(global)
