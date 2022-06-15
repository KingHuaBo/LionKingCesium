let cesiumVersion = '';

(function () {
    let thirdJsArr = [
        'ThirdPartLib/Cesium/Cesium.js',
        'LionCesium.umd.js',
    ]
    let thirdCssArr = [
        'ThirdPartLib/Cesium/Widgets/widgets.css'
    ]
    let scriptArr = Array.from(document.getElementsByTagName('script'))
    let host
    scriptArr.map(item => {
        let src = item.getAttribute('src')
        if (item.src.match('AllInOneLoader.js')) {
            host = src.split('AllInOneLoader.js')[0]
        }
    })
    thirdLoad(thirdCssArr, "css")
    thirdLoad(thirdJsArr, "js")
    window.CESIUM_BASE_URL = "./ThirdPartLib/Cesium";
    function thirdLoad(arr, type) {
        let head = document.getElementsByTagName('head')[0]
        let fragment = document.createDocumentFragment()
        if (type === "js") {
            for (let i = 0; i < arr.length; i++) {
                document.write(`<script  src='${host}${arr[i]}'></script>`)
            }
        } else if (type === "css") {
            for (let i = 0; i < arr.length; i++) {
                let link = document.createElement('link')
                link.href = `${host}${arr[i]}`
                link.rel = "stylesheet"
                link.type = "text/css"
                fragment.appendChild(link)
            }
            head.appendChild(fragment)
        }
    }

})()