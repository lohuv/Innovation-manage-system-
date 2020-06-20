import request from '@/utils/request'

export function reqGetPermissionList(page = 1) {
    return request({
        url: `/PatentBackstage/web/permission/role/${page}`,
        method: 'get'
    })
}

//删除角色
export function deleteRole(deleArr) {

    return request({
        url: `/PatentBackstage/web/permission/role/delete`,
        method: 'delete',
        data:deleArr,
    })
}
//添加角色
export function posAddRole(form) {
    return request({
        url:`/PatentBackstage/web/permission/role/add`,
        method:'post',
        data:form
    })
}
//查看角色权限

export function reqGetRolePermission(rId) {
    return request({
        url: `/PatentBackstage/web/permission/role/resource/${rId}`,
        method: 'get'
    })
}

//更新角色权限


export function updatePermission(rId,arr) {
    return request({
        url: `/PatentBackstage/web/permission/role/resource/update/${rId}`,
        method: 'put',
        data:arr
    })
}

//更新角色信息
export function updateRoleInfo(form) {
    return request({
        url: `/PatentBackstage/web/permission/role/update/`,
        method: 'put',
        data:form,
    })
}