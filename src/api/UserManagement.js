import request from "@/utils/request";
import qs from "qs";

export function lists(
  pageNum,
  pageSize,
  order,
  sort,
  status,
  keyword,
  parentDepartmentId
) {
  return request({
    url: "/generico-service/personnel",
    method: "GET",
    params: {
      pageNum,
      pageSize,
      order,
      sort,
      status,
      keyword,
      parentDepartmentId
    }
  });
}

export function lists1(order, sort, status, departmentId, roleId, keyword) {
  return request({
    url: "/generico-service/personnel/list",
    method: "GET",
    params: {
      order,
      sort,
      status,
      departmentId,
      roleId,
      keyword
    }
  });
}

export function watch(id) {
  return request({
    url: "/generico-service/personnel/" + id,
    method: "GET"
  });
}

export function add(form) {
  const data = qs.stringify(form);
  return request({
    url: "/generico-service/personnel",
    method: "POST",
    data
  });
}

export function delt(id) {
  return request({
    url: "/generico-service/personnel/remove",
    method: "PUT",
    params: {
      id: id.join(",")
    }
  });
}

export function enable(id) {
  return request({
    url: "/generico-service/personnel/enable",
    method: "PUT",
    params: {
      id: id.join(",")
    }
  });
}

export function disable(id) {
  return request({
    url: "/generico-service/personnel/disable",
    method: "PUT",
    params: {
      id: id.join(",")
    }
  });
}

export function getDepartArr() {
  return request({
    url: "/generico-service/department",
    method: "GET",
    params: {
      order: "layer",
      status: 1
    }
  });
}

export function getRoleArr() {
  return request({
    url: "/generico-service/role",
    method: "GET",
    params: {
      pageSize: 5000,
      status: 1
    }
  });
}

export function resetpassword(id) {
  return request({
    url: "/generico-service/personnel/passwordReset",
    method: "PUT",
    params: {
      id: id.join(",")
    }
  });
  // const data = qs.stringify({
  //   id: id.join(',')
  // })
  // return request.put('/personnel/passwordReset', data)
}

export function findRoleById(personnelId) {
  return request({
    url: "/generico-service/role/findListByPersonnel",
    method: "GET",
    params: {
      personnelId
    }
  });
}

export function findDepById(id) {
  return request({
    url: "/generico-service/department/findListByPersonnel",
    method: "GET",
    params: {
      id
    }
  });
}

export function findXq() {
  return request({
    url: "/generico-service/area/manageRange/myManageRange",
    method: "GET"
  });
}

export function updatePassword(form) {
  return request({
    url: "generico-service/personnel/updatePassword",
    method: "PUT",
    params: form
  });
}

export function updateACPassword(form) {
  return request({
    url: "generico-service/account/updatePassword",
    method: "PUT",
    params: form
  });
}
