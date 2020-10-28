import { Loading } from 'element-ui'

let load = null

function startLoading () {
  load = Loading.service({
    lock: true,
    text: '正在加载数据...',
    background: 'rgba(255, 255, 255, 0.5)',
    target: '#scrolls'
  })
}

export function endLoading () {
  load.close()
}

let needLoadingRequestCount = 0

export function showFullScreenLoading () {
  if (needLoadingRequestCount === 0) {
    startLoading()
  }
  needLoadingRequestCount++
}

export function tryHideFullScreenLoading () {
  if (needLoadingRequestCount <= 0) return
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    endLoading()
  }
}
