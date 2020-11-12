/******************************************* 要素数据加载 ***************************************
 * GIS要素数据加载
 * created by swt on 2019.02.27
 *
 * 本文件仅仅添加图层数据加载的方法，仅实现服务器数据到JS缓存的迁移工作
 *
 * 服务器数据 -> JS缓存
 *
 ******************************************* 要素数据加载 ****************************************/

/**
 * 数据加载主方法
 */
function dataLoading() {
  loadAreaTrack();
}

/**
 * 加载船舶轨迹回放数据
 */
function loadAreaTrack() {
  var layer = trackapp.areaTrackLayer;
  if (!canLoad(layer)) {
    return;
  }

  // 加载区域船舶
  $.ajax({
    url: GIS_AREASHIP + "minReceiveTime=" + areaTrack.minTime + "&" + "maxReceiveTime=" + areaTrack.maxTime + "&"
      + "minLongitude=" + areaTrack.minLongitude + "&" + "maxLongitude=" + areaTrack.maxLongitude + "&"
      + "minLatitude=" + areaTrack.minLatitude + "&" + "maxLatitude=" + areaTrack.maxLatitude + "&type=" + areaTrack.type,
    type: "get",
    dataType: "json",
    async: true,
    success: function (d) {
      var arr = []
      var shipArr = []
      d.data.forEach((item, index) => {
        if (item.shipName) {
          arr.push(item)
          shipArr.push(item.shipName)
        }
      })
      layer.setData(arr)
      var resultArray = shipArr.sort(
        function compareFunction(param1, param2) {
          return param1.localeCompare(param2, "zh")
        }
      )
      parent.postMessage({
        act: 'playback',
        msg: {
          active: 'true',
          shipNameArr: JSON.stringify(resultArray)
        }
      }, '*');
    }
  });
}

/**
 * 判断是否能加载
 * @param layer
 * @returns {boolean}
 */
function canLoad(layer) {
  // 当前时间戳
  var timestamp = new Date().getTime();
  if (layer.getNextLoadDataTime() <= 0) {
    // 该图层不加载数据
    return false;
  } else if (layer.getNextLoadDataTime() <= 1) {
    // 该图层仅加载一次数据
    layer.setNextLoadDataTime(0);
  } else if (layer.getNextLoadDataTime() > timestamp) {
    // 上次加载时间还没超时
    return false;
  } else {
    // 上次加载时间超过5秒，立即执行刷新
    timestamp = timestamp + 5000;
    layer.setNextLoadDataTime(timestamp);
  }
  return true;
}
