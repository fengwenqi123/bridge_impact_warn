import request from '@/utils/request'
import qs from 'qs'

export function lists (pageNum, pageSize, name, startTime, endTime, warnLevel) {
  return request({
    url: '/alerta-service/eventRecording/getEventDataList',
    method: 'GET',
    params: {
      pageNum, pageSize, name, startTime, endTime, warnLevel
    }
  })
}

export function add (form) {
  const data = qs.stringify(form)
  return request({
    url: '/alerta-service/videoManagement/saveOrUpdate',
    method: 'POST',
    data
  })
}

export function delt (id) {
  return request({
    url: '/alerta-service/videoManagement/remove',
    method: 'delete',
    params: {
      idList: id.join(',')
    }
  })
}
export function getShipInfo (zwcm) {
  return request({
    url: '/alerta-service/shipAdministration/getSipAdminDataList',
    method: 'GET',
    params: {
      zwcm
    }
  })
}

export function getShipSignal (zwcm) {
  return request({
    url: '/alerta-service/ais-service/signal/getSignalNameList',
    method: 'GET',
    params: {
      zwcm
    }
  })
}

export function getPaybackList (objId) {
  return request({
    url: '/alerta-service/paybackManagement/getPaybackList',
    method: 'GET',
    params: {
      objId
    }
  })
}

export function getRtmp (clientId, playbackId) {
  return request({
    url: '/synchronize-service/recordedBroadcast/rtmp',
    method: 'GET',
    params: {
      clientId, playbackId
    }
  })
}
