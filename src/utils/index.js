/* eslint-disable one-var */

export function parseTime (time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

export function formatTime (time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) { // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}

// 时间戳转字符串
export function timeToString (str) {
  var oDate = new Date(str),
    oYear = oDate.getFullYear(),
    oMonth = oDate.getMonth() + 1,
    oDay = oDate.getDate(),
    oHour = oDate.getHours(),
    oMin = oDate.getMinutes(),
    oSen = oDate.getSeconds(),
    oTime = oYear + '-' + getzf(oMonth) + '-' + getzf(oDay) + ' ' + getzf(oHour) + ':' + getzf(oMin) + ':' + getzf(oSen)
  return oTime
}

// 补0操作
function getzf (num) {
  if (parseInt(num) < 10) {
    num = '0' + num
  }
  return num
}

// 日期字符串转时间戳
export function stringToTime (date) {
  date = date.substring(0, 19)
  date = date.replace(/-/g, '/')
  return (new Date(date).getTime() / 1000)
}

// 截取地址栏参数

export function GetQueryString (name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  var r = window.location.search.substr(1).match(reg)
  if (r != null) return unescape(r[2])
  return null
}

// 数组去重
export function uniq (array) {
  var temp = []
  for (var i = 0; i < array.length; i++) {
    if (temp.indexOf(array[i]) === -1) {
      temp.push(array[i])
    }
  }
  return temp
}

// 获取当月第一天
export function getCurrentMonthFirst () {
  var date = new Date()
  date.setDate(1)
  var month = parseInt(date.getMonth() + 1)
  var day = date.getDate()
  if (month < 10) {
    month = '0' + month
  }
  if (day < 10) {
    day = '0' + day
  }
  return date.getFullYear() + '-' + month + '-' + day
}

// 获取当月最后一天
export function getCurrentMonthLast () {
  var date = new Date()
  var currentMonth = date.getMonth()
  var nextMonth = ++currentMonth
  var nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1)
  var oneDay = 1000 * 60 * 60 * 24
  var lastTime = new Date(nextMonthFirstDay - oneDay)
  var month = parseInt(lastTime.getMonth() + 1)
  var day = lastTime.getDate()
  if (month < 10) {
    month = '0' + month
  }
  if (day < 10) {
    day = '0' + day
  }
  return (date.getFullYear() + '-' + month + '-' + day)
}

export function toboolean (val) {
  switch (val.toLowerCase()) {
    case 'true':
    case 1:
    case 'yes':
      return true
    case 'false':
    case 0:
    case 'no':
    case null:
      return false
    default:
      return Boolean(val)
  }
}

// 获取元素距离浏览器左侧距离
export function getAbsLeft (obj) {
  var l = obj.offsetLeft
  while (obj.offsetParent != null) {
    obj = obj.offsetParent
    l += obj.offsetLeft
  }
  return l
}

// 时间差
export function timeDifference (date3) {
  var leave1 = date3 % (24 * 3600 * 1000) // 计算天数后剩余的毫秒数
  var hours = Math.floor(leave1 / (3600 * 1000))
  // 计算相差分钟数
  var leave2 = leave1 % (3600 * 1000) // 计算小时数后剩余的毫秒数
  var minutes = Math.floor(leave2 / (60 * 1000))
  // 计算相差秒数
  var leave3 = leave2 % (60 * 1000) // 计算分钟数后剩余的毫秒数
  var seconds = Math.round(leave3 / 1000)
  var timeDiff = hours + '小时' + minutes + '分钟' + seconds + '秒'
  return timeDiff
}

// 列表转二叉树
export function listToTree (myId, pId, list) {
  function exists (list, parentId) {
    for (let i = 0; i < list.length; i++) {
      if (list[i][myId] === parentId) {
        return true
      }
    }
    return false
  }

  var nodes = []
  for (let i = 0; i < list.length; i++) {
    const row = list[i]
    if (!exists(list, row[pId])) {
      nodes.push(row)
    }
  }

  var toDo = []
  for (let i = 0; i < nodes.length; i++) {
    toDo.push(nodes[i])
  }
  while (toDo.length) {
    var node = toDo.shift() // the parent node
    // get the children nodes
    for (let i = 0; i < list.length; i++) {
      const row = list[i]
      if (row[pId] === node[myId]) {
        if (node.children) {
          node.children.push(row)
        } else {
          node.children = [row]
        }
        toDo.push(row)
      }
    }
  }
  return nodes
}

export function sortNumber (a, b) {
  return a - b
}
