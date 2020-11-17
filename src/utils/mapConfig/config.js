import TileLayer from 'ol/layer/Tile'
import XYZ from 'ol/source/XYZ'
import TileWMS from 'ol/source/TileWMS'
import TileGrid from 'ol/tilegrid/TileGrid'
import { transform, get } from 'ol/proj'
import { GIS_HOST } from './gisLib/HConfig'

const url = GIS_HOST + '/geowebcache/service/wms'

const ypExtent = [13354372.33097, 3496494.21754, 13399393.74063, 3537388.02767]

const fullExtent = [-20037508.342787, -20037508.342781033, 20037508.342781033, 20037508.342787]

const resolutions = [156543.0339, 78271.516953125, 39135.7584765625, 19567.87923828125, 9783.939619140625, 4891.9698095703125, 2445.9849047851562,
  1222.9924523925781, 611.4962261962891, 305.74811309814453, 152.87405654907226, 76.43702827453613, 38.218514137268066, 19.109257068634033,
  9.554628534317016, 4.777314267158508, 2.388657133579254, 1.194328566789627, 0.5971642833948135]

const tileGrid = new TileGrid({
  tileSize: 256,
  extent: fullExtent,
  resolutions: resolutions
})

const maptype = 0 // 0:发布的离线地图 1:天地图在线 需修改地址
var basemap = () => {
  var maplayer = null
  switch (maptype) {
    case 0:
      maplayer = [
        new TileLayer({
          title: '卫星影像图',
          type: 'YXT',
          source: new TileWMS({
            url: url,
            params: { LAYERS: 'yp_image', format: 'image/jpeg', SRS: 'EPSG:3857' },
            tileGrid: tileGrid
          }),
          visible: false
        })
      ]
      break
    case 1:
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
  mapCenterCoor: transform([120.172378, 30.102054], 'EPSG:4326', 'EPSG:3857'),
  zoom: 16, // 地图缩放级别
  basemap: basemap,
  projection: get('EPSG:3857'),
  extent: ypExtent,
  minZoom: 9,
  maxZoom: 18
}

export default config
