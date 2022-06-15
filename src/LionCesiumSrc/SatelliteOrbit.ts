import * as Cesium from "cesium";
import PositionProperty from "cesium/Source/DataSources/PositionProperty";
import LionViewer from './LionViewer'
import { twoline2satrec, propagate, gstime, eciToGeodetic, SatRec, GeodeticLocation } from 'satellite.js'
import CalaPositionWorker from './worker?worker'
class SatelliteLayer {
    viewer: Cesium.Viewer;
    satelliteMap: Map<string, Satellite>;
    satellitePrimitiveCollection = new Cesium.PointPrimitiveCollection();
    private _satRecMap: Map<string, SatRec>;
    private _calaPositcionWorker = new CalaPositionWorker()

    constructor(viewer: LionViewer) {
        this.viewer = viewer;
        this.satelliteMap = new Map<string, Satellite>();
        let s = this.viewer.scene.primitives.add(this.satellitePrimitiveCollection);
        this._satRecMap = new Map<NamedCurve, SatRec>()
        this._move();
    }
    add(satellite: Satellite) {
        try {
            let satrec = twoline2satrec(satellite.tle.split('\n')[0].trim(), satellite.tle.split('\n')[1].trim());
            this._satRecMap.set(satellite.name, satrec);

            let jsDate = new Date().valueOf();
            let positionAndVelocity = propagate(satrec, new Date(jsDate));
            let gmst = gstime(new Date(jsDate));
            let position = eciToGeodetic(positionAndVelocity.position, gmst);

            this.satellitePrimitiveCollection.add({
                id: satellite.name,
                position: Cesium.Cartesian3.fromRadians(position.longitude, position.latitude, position.height * 1000),
                color: Cesium.Color.PINK,
                pixelSize: 1,
            })
        } catch (error) {

        }

        // this.viewer.scene.preRender.addEventListener((s, t) => {
        // if(t===s.lastRenderTime){
        //     return;
        // }
        // let points = this.satellitePrimitiveCollection;
        // for (let i = 0; i < points.length; i++) {
        // let point = points.get(i);
        // let now = Cesium.JulianDate.toDate(t);
        // let satRec=this._satRecMap.get(point.id)
        // let positionAndVelocity1 = propagate(satRec, now);
        // let jsDate1 = now;
        // let gmst1 = gstime(jsDate1);
        // position = eciToGeodetic(positionAndVelocity1.position, gmst1);
        // point.position = new Cesium.Cartesian3.fromRadians(position.longitude, position.latitude, position.height*1000);

        // this._calaPositcionWorker.postMessage({
        //     satRec:satRec,
        //     time:now
        // })
        // this._calaPositcionWorker.onmessage=function(ev){
        //     const position=ev.data;
        //     point.position = new Cesium.Cartesian3.fromRadians(position.longitude, position.latitude, position.height*1);
        //     console.log(point.position)
        // }
        //     }
        // });
    }

    _move() {
        setInterval(() => {
            let points = this.satellitePrimitiveCollection;
            for (let i = 0; i < points.length; i++) {
                try {
                    let point = points.get(i);
                    let now = Cesium.JulianDate.toDate(this.viewer.clock.currentTime)
                    let satRec = this._satRecMap.get(point.id)
                    let positionAndVelocity1 = propagate(satRec, now);
                    let jsDate1 = now;
                    let gmst1 = gstime(jsDate1);
                    let position = eciToGeodetic(positionAndVelocity1.position, gmst1);
                    point.position = new Cesium.Cartesian3.fromRadians(position.longitude, position.latitude, position.height * 1000);
                } catch (error) {

                }
            }
        }, 200);
    }
}
class SatelliteOrbitOpt {
    /**卫星两根数 */
    tle: string;
    constructor(tle: string, name: string) {
        this.tle = tle;
    }
}
class Satellite {
    name: string;
    protected _id: any;
    tle: string;
    constructor(name: string, tle: string) {
        this.name = name;
        this.tle = tle;

    }
}
export { SatelliteLayer, SatelliteOrbitOpt, Satellite }