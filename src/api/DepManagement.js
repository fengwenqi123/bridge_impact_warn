import request from '@/utils/request'
import qs from 'qs'

export function lists (pageNum, pageSize, order, sort, status, keyword, parentId) {
  return request({
    url: '/account/department',
    method: 'GET',
    params: {
      pageNum,
      pageSize,
      order,
      sort,
      status,
      keyword,
      parentId
    }
  })
}

export function add (form) {
  const data = qs.stringify(form)
  return request({
    url: '/account/department',
    method: 'POST',
    data
  })
}

export function delt (id) {
  const data = qs.stringify({
    id: id.join(',')
  })
  return request.put('/account/department/remove', data)
}

export function findDep () {
  return request({
    url: '/account/department',
    method: 'GET',
    params: {
      pageNum: 1,
      pageSize: 5000,
      order: 'layer',
      sort: '',
      status: 1
    }
  })
}

export function findDepName (id) {
  return request({
    url: '/account/department/' + id,
    method: 'GET'
  })
}

export function findDepartmentsByPersonnel (personnelId) {
  return request({
    url: '/account/department/findDepartmentsByPersonnel',
    method: 'GET',
    params: {
      personnelId
    }
  })
}

export function findListByLayer (layer) {
  return request({
    url: '/account/department/findListByLayer',
    method: 'GET',
    params: {
      layer
    }
  })
}
