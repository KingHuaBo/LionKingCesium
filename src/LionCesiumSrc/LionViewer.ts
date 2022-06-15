import * as Cesium from "cesium";
import {SatelliteLayer} from './SatelliteOrbit';

class LionViewer extends Cesium.Viewer {
    RootPrimitiveCollection: Cesium.PrimitiveCollection;
    SatelliteLayer:SatelliteLayer;
    constructor(container: any,options ?: any){
        super(container,options);
        this.RootPrimitiveCollection = new Cesium.PrimitiveCollection();
        super.scene.primitives.add(this.RootPrimitiveCollection);
        this.SatelliteLayer=new SatelliteLayer(this);
    }
}
export default LionViewer