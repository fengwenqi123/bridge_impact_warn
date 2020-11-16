import request from '@/utils/request1'
import qs from 'qs'

export function lists (pageNum, pageSize, warningType, warningMethod, start) {
  return request({
    url: '/guinaramAlerta/getGuinaramDataList',
    method: 'GET',
    params: {
      pageNum, pageSize, warningType, warningMethod, start
    }
  })
}

export function add (form) {
  const data = qs.stringify(form)
  return request({
    url: '/guinaramAlerta/saveOrUpdate',
    method: 'POST',
    data
  })
}

export function delt (id) {
  return request({
    url: '/guinaramAlerta/remove',
    method: 'delete',
    params: {
      idList: id.join(',')
    }
  })
}
