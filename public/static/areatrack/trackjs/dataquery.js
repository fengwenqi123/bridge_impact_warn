/******************************************* 要素数据查询/操作 ***************************************
 * GIS要素数据加载
 * created by swt on 2019.02.28
 *
 * 本文件仅仅添加要素数据查询/操作的方法
 *
 * JS缓存 -> 查询接口
 *
 ******************************************* 要素数据查询/操作 ****************************************/

/******************************************* 区域轨迹回放开始 ****************************************/
var areaTrack = {};
var speed = 200;
var shipCehcks = []

/**
 * 区域轨迹回放
 * @param minTime       最小时间
 * @param maxTime       最大实际
 * @param minLongitude  最小经度
 * @param maxLongitude  最大经度
 * @param minLatitude   最小纬度
 * @param maxLatitude   最大纬度
 * @param type          信号类型
 */
function areaTrackQuery(minTime, maxTime, minLongitude, maxLongitude, minLatitude, maxLatitude, type) {
  areaTrack.minTime = minTime;
  areaTrack.maxTime = maxTime;
  areaTrack.minLongitude = minLongitude;
  areaTrack.maxLongitude = maxLongitude;
  areaTrack.minLatitude = minLatitude;
  areaTrack.maxLatitude = maxLatitude;
  areaTrack.type = type;
  // 播放速度 （1分钟）默认x16
  areaTrack.speed = 200 * 16

  // 显示轨迹回放图层
  trackapp.areaTrackLayer.layer.setVisible(true);
  // 开始加重数据(加载一次)
  trackapp.areaTrackLayer.setNextLoadDataTime(1);
}

// 船舶删选
function shipCheck(arr) {
  console.log(arr)
  if (arr.length > 0) {
    shipCehcks = arr
  } else {
    shipCehcks = null
  }

}

/**
 * 开始
 */
function areaTrackStart() {
  areaTrack.playTimestamp = (Date.parse(areaTrack.minTime)).valueOf();
  clearIntervalAreaTrack();
  setIntervalAreaTrack();
}

/**
 * 停止
 */
function areaTrackStop() {
  areaTrack.playTimestamp = (Date.parse(areaTrack.minTime)).valueOf();
  clearIntervalAreaTrack();
}

/**
 * 暂停
 */
function areaTrackPause() {
  clearIntervalAreaTrack();
}

/**
 * 恢复
 */
function areaTrackResume() {
  clearIntervalAreaTrack();
  setIntervalAreaTrack();
}

/**
 * 加速
 */
function areaTrackSpeedUp(val) {
  areaTrack.speed = speed * val
}

/**
 * 减速
 */
function areaTrackSpeedDown() {
  areaTrack.speed = areaTrack.speed - (60 * 1000);
}

/**
 * 跳转（拖放进度条）
 * @param time
 */
function areaTrackJump(time) {
  console.log(time)
  areaTrack.playTimestamp = time;
  clearIntervalAreaTrack();
  setIntervalAreaTrack();
}

/**
 * 启动计时器
 */
function setIntervalAreaTrack() {
  trackapp.areaTrackInterval = setInterval('areaTrackTiming()', 200); // 加载数据
}

/**
 * 清除计时器
 */
function clearIntervalAreaTrack() {
  clearInterval(trackapp.areaTrackInterval);
}

/**
 * 开始计时
 */
function areaTrackTiming() {
  areaTrack.playTimestamp = areaTrack.playTimestamp + areaTrack.speed;
  parent.postMessage({
    act: 'areaTrackTiming',
    msg: {
      time: areaTrack.playTimestamp
    }
  }, '*')
  // console.log(areaTrack.playTimestamp)
}

/******************************************* 区域轨迹回放结束 ****************************************/
