import TileLayer from 'ol/layer/Tile'
import TileArcGISRest from 'ol/source/TileArcGISRest'
import OSM from 'ol/source/OSM'
import XYZ from 'ol/source/XYZ'
import TileWMS from 'ol/source/TileWMS'
import TileGrid from 'ol/tilegrid/TileGrid'
import { transform, get } from 'ol/proj'
import { GIS_HOST } from './gisLib/HConfig'

const url = `${GIS_HOST}/geowebcache/service/wms`

const zjExtent = [12266461.42492, 2459896.44427, 15086223.39814, 4351865.76839]

const fullExtent = [-20037508.342787, -20037508.342781033, 20037508.342781033, 20037508.342787]

const resolutions = [156543.0339, 78271.516953125, 39135.7584765625, 19567.87923828125, 9783.939619140625, 4891.9698095703125, 2445.9849047851562,
  1222.9924523925781, 611.4962261962891, 305.74811309814453, 152.87405654907226, 76.43702827453613, 38.218514137268066, 19.109257068634033,
  9.554628534317016, 4.777314267158508, 2.388657133579254, 1.194328566789627, 0.5971642833948135]

const tileGrid = new TileGrid({
  tileSize: 256,
  extent: fullExtent,
  resolutions: resolutions
})

const maptype = 0 // 0表示部署的离线瓦片地图，1表示OSM,2表示使用Arcgis在线午夜蓝地图服务
var streetmap = () => {
  var maplayer = null
  switch (maptype) {
    case 0:
      maplayer = [
        // new TileLayer({
        //   title: '卫星影像图',
        //   type: 'YXT',
        //   source: new TileWMS({
        //     url: url,
        //     params: { LAYERS: 'zjimg', format: 'image/png', SRS: 'EPSG:3857' },
        //     tileGrid: tileGrid
        //   }),
        //   visible: false
        // }),
        new TileLayer({
          title: '电子地图',
          type: 'DZDT',
          source: new TileWMS({
            url: 'http://192.168.1.129:8080/geoserver/gwc/service/wms',
            params: { LAYERS: 'zhejiang_bz', format: 'image/png', SRS: 'EPSG:3857' },
            tileGrid: tileGrid
          })
        })/*,
        new TileLayer({
          title: '电子航道图',
          type: 'DZHDT',
          source: new TileWMS({
            url: url,
            params: { LAYERS: '1226hzjt', format: 'image/png', SRS: 'EPSG:3857' },
            tileGrid: tileGrid
          })
        }) */
      ]
      break
    case 1:
      maplayer = new TileLayer({
        source: new OSM()
      })
      break
    case 2:
      maplayer = new TileLayer({
        source: new TileArcGISRest({
          url: 'https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer'
        })
      })
      break
    case 3:
      maplayer = [
        new TileLayer({
          title: '影像地图',
          type: 'YXT',
          source: new XYZ({
            url: url + 'img_w'
          })
        }),
        new TileLayer({
          title: '二维地图',
          type: 'DZDT',
          source: new XYZ({
            url: url + 'vec_w'
          })
        }),
        new TileLayer({
          title: '影像注记',
          type: 'CIA',
          source: new XYZ({
            url: url + 'cia_w'
          })
        })
      ]
      break
  }
  return maplayer
}
const config = {
  mapCenterCoor: transform([120.1, 30.86], 'EPSG:4326', 'EPSG:3857'),
  zoom: 10, // 地图缩放级别
  streetmap: streetmap,
  projection: get('EPSG:3857'),
  extent: zjExtent,
  minZoom: 9,
  maxZoom: 18
}

export default config
