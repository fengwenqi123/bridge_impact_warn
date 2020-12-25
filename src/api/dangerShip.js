import request from '@/utils/request'

export function dangerShipRecord (pageNum, pageSize, accountName, relieveId, shipName, shipID, zybw, wxlb, zyzt, startTime, endTime) {
  return request({
    url: '/generico-service/gis/dangerousDeclaration/shipDangerousDeclaration',
    method: 'GET',
    params: {
      pageNum, pageSize, accountName, relieveId, shipName, shipID, zybw, wxlb, zyzt, startTime, endTime
    }
  })
}

export function dangerShipFocus (shipName, lzykssj1, accountName, relieveId) {
  return request({
    url: '/generico-service/gis/dangerousDeclaration/addOrUpdateShipLook',
    method: 'GET',
    params: {
      shipName, lzykssj1, accountName, relieveId
    }
  })
}

export function dangerShipInfo (sbbh) {
  return request({
    url: '/generico-service/gis/dangerousDeclaration/recordOfDangerousShip',
    method: 'GET',
    params: {
      sbbh
    }
  })
}

export function dangerShipInfoList (shipName) {
  return request({
    url: '/generico-service/gis/dangerousDeclaration/dangerousShipOrder',
    method: 'GET',
    params: {
      shipName
    }
  })
}
