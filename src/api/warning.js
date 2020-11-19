import request from '@/utils/request1'
import request2 from '@/utils/request2'
import qs from 'qs'

export function lists (pageNum, pageSize, name, warningTime, entryState) {
  return request({
    url: '/eventRecording/getEventDataList',
    method: 'GET',
    params: {
      pageNum, pageSize, name, warningTime, entryState
    }
  })
}

export function add (form) {
  const data = qs.stringify(form)
  return request({
    url: '/videoManagement/saveOrUpdate',
    method: 'POST',
    data
  })
}

export function delt (id) {
  return request({
    url: '/videoManagement/remove',
    method: 'delete',
    params: {
      idList: id.join(',')
    }
  })
}
export function getShipInfo (mmsi) {
  return request({
    url: '/shipAdministration/getSipAdminDataList',
    method: 'GET',
    params: {
      mmsi
    }
  })
}

export function getShipSignal (mmsi) {
  return request({
    url: '/signalSupervisory/getSignalNameList',
    method: 'GET',
    params: {
      mmsi
    }
  })
}

export function getPaybackList (objId) {
  return request({
    url: '/paybackManagement/getPaybackList',
    method: 'GET',
    params: {
      objId
    }
  })
}

export function getRtmp (clientId, playbackId) {
  return request2({
    url: '/synchronize-service/recordedBroadcast/rtmp',
    method: 'GET',
    params: {
      clientId, playbackId
    }
  })
}
