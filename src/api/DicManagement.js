import request from '@/utils/request'
import qs from 'qs'

export function lists (pageNum, pageSize, order, sort, classification, type, status, keyword) {
  return request({
    url: '/dataDictionary/list',
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
    url: '/dataDictionary',
    method: 'POST',
    data
  })
}

export function delt (id) {
  return request({
    url: '/dataDictionary/remove',
    method: 'PUT',
    params: {
      id: id.join(',')
    }
  })
  // const data = qs.stringify({
  //   id: id.join(',')
  // })
  // return request.put('/dataDictionary/remove', data)
}

export function enable (id) {
  return request({
    url: '/dataDictionary/enable',
    method: 'PUT',
    params: {
      id: id.join(',')
    }
  })
  // const data = qs.stringify({
  //   id: id.join(',')
  // })
  // return request.put('/dataDictionary/enable', data)
}

export function disable (id) {
  return request({
    url: '/dataDictionary/disable',
    method: 'PUT',
    params: {
      id: id.join(',')
    }
  })
  // const data = qs.stringify({
  //   id: id.join(',')
  // })
  // return request.put('/dataDictionary/disable', data)
}

export function classification (classification, status) {
  return request({
    url: '/dataDictionary/findListByClassification',
    method: 'GET',
    params: {
      classification, status
    }
  })
}
