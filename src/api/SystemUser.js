import request from '@/utils/request'

export function reqGetSystemUserList(page = 1,search,dele) {
    return request({
        url: `/PatentBackstage/web/system/admin/${dele}/${page}`,
        method: 'get',
        params: {
            query:search,
        }
    })
}

export function reqPostAddUser(form) {
    return request({
        url: `/PatentBackstage/web/system/admin/add`,
        method: 'post',
        data:form
    })
}


export function reqGetRoleDetail(id) {

    return request({
        url: `/PatentBackstage/web/system/admin/detail/${id}`,
        method: 'get'
    })
}


export function isExistAccount(account) {

    return request({
        url: `/PatentBackstage/web/system/admin/judge/${account}`,
        method: 'get'
    })
}



export function deleteUser(deleArr) {

    return request({
        url: `/PatentBackstage/web/system/admin/delete/`,
        method: 'delete',
        data:deleArr,
    })
}

export function resetPasswd(resetArr) {

    return request({
        url: `/PatentBackstage/web/system/admin/resetPassword/`,
        method: 'put',
        data:resetArr,
    })
}
//修改用户角色
export function UserModify(uId,roleId) {


    return request({
        url: `/PatentBackstage/web/system/role/update/${uId}/${roleId}`,
        method: 'put',
    })
}


export function reqGetAllRole() {

    return request({
        url: `/PatentBackstage/web/system/role`,
        method: 'get'
    })
}