/******************************************* 要素数据渲染 ***************************************
 * GIS要素数据渲染
 * created by swt on 2019.02.27
 *
 * 本文件仅仅添加图层数据渲染的方法，仅实现从JS缓存到页面展现的渲染工作
 *
 * JS缓存 -> 页面渲染
 *
 ******************************************* 要素数据渲染 ****************************************/
// 过滤船舶
function checkAdult(shipArr, shipItem) {
  return shipArr.some(ship => {
    return ship === shipItem
  })
}

/**
 * 数据显示主方法
 */
function dataShow() {
  // 显示轨迹回放
  showAreaTrackShip(trackapp.areaTrackLayer);
}


/******************************************* 显示轨迹回放开始 ****************************************/

/**
 * 显示轨迹回放船舶
 * @param layer
 */
function showAreaTrackShip(layer) {
  if (!layer.getData()) {
    return;
  }

  // 图层不显示，不刷新数据
  if (!layer.layer.getVisible()) {
    layer.clear();
    return;
  }
  //控制船舶名称显示用
  var mapLevel = getMapLevel();
  // 不在指定图层层级，不刷新数据
  if (mapLevel < layer.getMinShowLevel() || mapLevel > layer.getMaxShowLevel()) {
    layer.clear();
    return;
  }

  // 文字缩放级别
  var textscale;
  if (mapLevel < 16) {
    textscale = 0;
  } else if (mapLevel <= 17) {
    textscale = 1;
  } else {
    textscale = 1.2;
  }

  var polygonSymbol = [];

  /*
    [{
		"shipName": "浙湖州货3510",
		"positionBeanList": [{
			"shipName": "浙湖州货3510",
			"longitude": 120.110326666666670,
			"latitude": 30.850788333333334,
			"receiveTimeString": "2019-02-28 09:15:32",
			"speed": 5.10000,
			"direction": 263
		}, {
			"shipName": "浙湖州货3510",
			"longitude": 120.109881666666670,
			"latitude": 30.850746666666666,
			"receiveTimeString": "2019-02-28 09:15:47",
			"speed": 5.10000,
			"direction": 262
		}
	  }]
   */

  $.each(layer.getData(), function (i, shipItem) {
    // 根据时间戳计算船舶位置
    var point1; // 左侧点
    var point2; // 右侧点
    var point0; // 中间点

    var pos = 0;

    var time1;
    var time2;
    // console.log(shipItem)
    if (shipCehcks && shipCehcks.length > 0) {
      if (!checkAdult(shipCehcks, shipItem.shipName)) {
        return
      }
    } else if (!shipCehcks) {
      return
    } else {
      // console.log(111)
    }

    $.each(shipItem.positionBeanList, function (i, item) {
      pos = i;
      // 只刷新可视范围内数据
      if (trackapp.currentExtent) {
        // 左下
        var p1 = webMctToWGS84(trackapp.currentExtent[0], trackapp.currentExtent[1]);
        // 右上
        var p2 = webMctToWGS84(trackapp.currentExtent[2], trackapp.currentExtent[3]);
        if (item.longitude > p2[0] || item.longitude < p1[0] ||
          item.latitude > p2[1] || item.latitude < p1[1]) {
          return true;
        }
      }

      // 查询大于播放时间第一个点
      var time = (Date.parse(item.receiveTimeString)).valueOf();
      if (areaTrack.playTimestamp < time) {
        return false;
      }
      point1 = item;
    });

    // 找不到第一个点
    if (!point1) {
      return true;
    }
    time1 = (Date.parse(point1.receiveTimeString)).valueOf();

    // 设置下一个节点
    pos = pos;
    if (shipItem.positionBeanList.length > pos) {
      point2 = shipItem.positionBeanList[pos];
    }
    // 找不到第二个点
    if (!point2) {
      return true;
    }
    time2 = (Date.parse(point2.receiveTimeString)).valueOf();

    point0 = point1;
    if (areaTrack.playTimestamp >= time2) {
      point0 = point2;
      return true;
    } else {
      // 计算中间点位置
      // var timeSpan = time2 - time1;
      // var timeSpanUsed = areaTrack.playTimestamp - time1;
      // 时间占比
      var timeScale = (areaTrack.playTimestamp - time1) / (time2 - time1);
      point0.longitude = point1.longitude + ((point2.longitude - point1.longitude) * timeScale);
      point0.latitude = point1.latitude + ((point2.latitude - point1.latitude) * timeScale);
    }

    // 默认都是货船
    point0.shipType = GIS_GOODSSHIP;

    var shipAttr = {
      'type': 'areaTrackShip',
      'name': point0.shipName,
      'lon': point0.longitude,
      'lat': point0.latitude,
      'speed': point0.speed,
      'direction': point0.direction,
      // 'headDirection': point0.headDirection,
      // 'message': point0.no,
      'shipType': point0.shipType,
      'receiveTime': point0.receiveTimeString
    };

    var shipSymbol;
    var fillColor;              // 填充
    var lineColor = [0, 0, 0];  // 边框
    var textColor = [0, 200, 0];// 船名颜色

    // 判断是否显示该船舶类型
    /*if(!canShowByShipType(point0.shipType)) {
      return true;
    }*/

    if (point0.shipType == GIS_PASSENGERSHIP) {
      // 客船黄色红框
      fillColor = [255, 255, 0];
      lineColor = [255, 0, 0];
      shipSymbol = HShip.getShipSymbol(shipAttr, fillColor, lineColor, textColor, textscale);
    } else if (point0.shipType == GIS_GOODSSHIP) {
      // 货船绿色黑框
      fillColor = [0, 200, 0];
      shipSymbol = HShip.getShipSymbol(shipAttr, fillColor, lineColor, textColor, textscale);
    } else if (point0.shipType == GIS_DANGERSHIP) {
      // 危险品红色黄框
      fillColor = [255, 0, 0];
      lineColor = [255, 255, 0];
      shipSymbol = HShip.getShipSymbol(shipAttr, fillColor, lineColor, textColor, textscale);
    } else if (point0.shipName.substr(0, 3) == GIS_HXTSHIP) {
      // 海巡艇蓝色黑框
      fillColor = [1, 87, 155];
      shipSymbol = HShip.getShipSymbol(shipAttr, fillColor, lineColor, textColor, textscale);
    } else /*if (point0.shipType == GIS_OTHERSHIP || point0.shipType == GIS_NONAMESHIP)*/ {
      // 未知名和其他白色黑框
      fillColor = [255, 255, 255];
      shipSymbol = HShip.getShipSymbol(shipAttr, fillColor, lineColor, textColor, textscale);
    }
    if (shipSymbol) {
      polygonSymbol.push(shipSymbol);
    }

  });
  layer.clear();
  layer.addPolygonSymbol(polygonSymbol);
}


/******************************************* 显示轨迹回放结束 ****************************************/

/******************************************* 显示船舶开始 ****************************************/

/**
 * 根据船舶类型判断是否要显示
 * @param type
 * @returns {boolean}
 */
function canShowByShipType(type) {
  var canShow = false;
  $.each(showShipType, function (i, item) {
    if (item == type) {
      canShow = true;
      return false;
    }
  });
  return canShow;
}

/**
 * 显示船舶
 * @param layer
 */
function showShip(layer) {
  if (!layer.getData()) {
    return;
  }

  // 图层不显示，不刷新数据
  if (!layer.layer.getVisible()) {
    layer.clear();
    return;
  }
  //控制船舶名称显示用
  var mapLevel = getMapLevel();
  // 不在指定图层层级，不刷新数据
  if (mapLevel < layer.getMinShowLevel() || mapLevel > layer.getMaxShowLevel()) {
    layer.clear();
    return;
  }

  // 文字缩放级别
  var textscale;
  if (mapLevel < 16) {
    textscale = 0;
  } else if (mapLevel <= 17) {
    textscale = 1;
  } else {
    textscale = 1.2;
  }

  var polygonSymbol = [];
  $.each(layer.getData(), function (i, item) {
    // 只刷新可视范围内数据
    if (trackapp.currentExtent) {
      // 左下
      var p1 = webMctToWGS84(trackapp.currentExtent[0], trackapp.currentExtent[1]);
      // 右上
      var p2 = webMctToWGS84(trackapp.currentExtent[2], trackapp.currentExtent[3]);
      if (item.longitude > p2[0] || item.longitude < p1[0] ||
        item.latitude > p2[1] || item.latitude < p1[1]) {
        return true;
      }
    }

    var shipAttr = {
      'type': 'mixedship',
      'name': item.shipName,
      'lon': item.longitude,
      'lat': item.latitude,
      'speed': item.speed,
      'direction': item.direction,
      'headDirection': item.headDirection,
      'message': item.no,
      'shipType': item.shipType,
      'receiveTime': item.receiveTimeString
    };

    var shipSymbol;
    var fillColor;              // 填充
    var lineColor = [0, 0, 0];  // 边框
    var textColor = [0, 200, 0];// 船名颜色

    // 判断是否显示该船舶类型
    if (!canShowByShipType(item.shipType)) {
      return;
    }

    if (item.shipType == GIS_PASSENGERSHIP) {
      // 客船黄色红框
      fillColor = [255, 255, 0];
      lineColor = [255, 0, 0];
      shipSymbol = HShip.getShipSymbol(shipAttr, fillColor, lineColor, textColor, textscale);
    } else if (item.shipType == GIS_GOODSSHIP) {
      // 货船绿色黑框
      fillColor = [0, 200, 0];
      shipSymbol = HShip.getShipSymbol(shipAttr, fillColor, lineColor, textColor, textscale);
    } else if (item.shipType == GIS_DANGERSHIP) {
      // 危险品红色黄框
      fillColor = [255, 0, 0];
      lineColor = [255, 255, 0];
      shipSymbol = HShip.getShipSymbol(shipAttr, fillColor, lineColor, textColor, textscale);
    } else if (item.shipName.substr(0, 3) == GIS_HXTSHIP) {
      // 海巡艇蓝色黑框
      fillColor = [1, 87, 155];
      shipSymbol = HShip.getShipSymbol(shipAttr, fillColor, lineColor, textColor, textscale);
    } else /*if (item.shipType == GIS_OTHERSHIP || item.shipType == GIS_NONAMESHIP)*/ {
      // 未知名和其他白色黑框
      fillColor = [255, 255, 255];
      shipSymbol = HShip.getShipSymbol(shipAttr, fillColor, lineColor, textColor, textscale);
    }
    if (shipSymbol) {
      polygonSymbol.push(shipSymbol);
    }
  });

  layer.clear();
  layer.addPolygonSymbol(polygonSymbol);
}

/******************************************* 显示船舶结束 ****************************************/
