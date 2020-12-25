import request from '@/utils/request'
import qs from 'qs'

export function lists (pageNum, pageSize, keyword, videoType) {
  return request({
    url: '/alerta-service/videoManagement/getVideoDataList',
    method: 'GET',
    params: {
      pageNum, pageSize, keyword, videoType
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
