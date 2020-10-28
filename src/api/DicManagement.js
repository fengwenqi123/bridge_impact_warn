import request from '@/utils/request'
import qs from 'qs'

export function lists (pageNum, pageSize, order, sort, classification, type, status, keyword) {
  return request({
    url: '/account/dataDictionary/list',
    method: 'GET',
    params: {
      pageNum,
      pageSize,
      order,
      sort,
      classification,
      type,
      status,
      keyword
    }
  })
}

export function add (form) {
  const data = qs.stringify(form)
  return request({
    url: '/account/dataDictionary',
    method: 'POST',
    data
  })
}

export function delt (id) {
  const data = qs.stringify({
    id: id.join(',')
  })
  return request.put('/account/dataDictionary/remove', data)
}

export function enable (id) {
  const data = qs.stringify({
    id: id.join(',')
  })
  return request.put('/account/dataDictionary/enable', data)
}

export function disable (id) {
  const data = qs.stringify({
    id: id.join(',')
  })
  return request.put('/account/dataDictionary/disable', data)
}

export function classification (classification, status) {
  return request({
    url: '/account/dataDictionary/findListByClassification',
    method: 'GET',
    params: {
      classification, status
    }
  })
}
