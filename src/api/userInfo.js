import request from '@/utils/request'


export function reqGetUserInfoList( type,page,search,dele) {
    return request({
        url: `/PatentBackstage/web/userManage/user/${type}/${dele}/${page}`,
        params:{
            query:search,
        },
        method: 'get'
    })
}

export function reqPostAddUser(form) {
    return request({
        url: `/PatentBackstage/web/userManage/user/add`,
        method: 'post',
        data:form
    })
}

export function isExistAccount(account) {
    return request({
        url: `/PatentBackstage/web/userManage/user/judge/${account}`,
        method: 'get'
    })
}



export function deleteUsers(deleArr) {

    return request({
        url: `/PatentBackstage/web/userManage/user/delete`,
        method: 'delete',
        data:deleArr,
    })
}
//用户密码重置

export function reSetUsers(resetArr) {

    return request({
        url: `/PatentBackstage/web/userManage/user/resetPassword`,
        method: 'put',
        data:resetArr,
    })
}

//企业认证

export function reqEnterpriseCheck(id,result) {

    return request({
        url: `/PatentBackstage/web/userManage/enterprise/check/${id}/${result}`,
        method: 'put',
    })
}
