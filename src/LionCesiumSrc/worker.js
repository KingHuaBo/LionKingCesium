import { propagate, gstime, eciToGeodetic } from 'satellite.js'

onmessage = function (e) {
    // console.log(e.data);
    const time = e.data.time;
    const positionAndVelocity = propagate(e.data.satRec, time);
    const gmst = gstime(time);
    let position = eciToGeodetic(positionAndVelocity.position, gmst);
    
    this.postMessage(position);
}