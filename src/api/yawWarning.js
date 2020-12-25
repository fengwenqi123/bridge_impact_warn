import request from '@/utils/request'
import qs from 'qs'

export function lists (pageNum, pageSize, warningType, warningMethod, start) {
  return request({
    url: '/alerta-service/guinaramAlerta/getGuinaramDataList',
    method: 'GET',
    params: {
      pageNum, pageSize, warningType, warningMethod, start
    }
  })
}

export function add (form) {
  const data = qs.stringify(form)
  return request({
    url: '/alerta-service/guinaramAlerta/saveOrUpdate',
    method: 'POST',
    data
  })
}

export function delt (id) {
  return request({
    url: '/alerta-service/guinaramAlerta/remove',
    method: 'delete',
    params: {
      idList: id.join(',')
    }
  })
}
