import request from "../utils/request"

export function resGetAgencyUserList(page = 1,aId,dele) {
    return request({
        url: `/PatentBackstage/web/agencyManage/agency/user/${aId}/${dele}/${page}`,
        method: 'get'
    })
}



//添加管理员
export function posAddAgencyAdmin(form) {
    return request({
        url: `/PatentBackstage/web/agencyManage/agency/admin/add`,
        method: 'post',
        data:form

    })
}
//删除代理机构用户
export function deleteAgencyUser(deleArr) {

    return request({
        url: `/PatentBackstage/web/agencyManage/agency/user/delete/`,
        method: 'delete',
        data:deleArr,
    })
}
//重置代理机构密码
export function resetPasswd(resetArr) {

    return request({
        url: `/PatentBackstage/web/agencyManage/agency/user/resetPassword/`,
        method: 'put',
        data:resetArr,
    })
}


//查看代理机构首页新闻正文

export function getAddAgencyAdmin(nId) {
    return request({
        url: `/PatentBackstage/web/agencyManage/agency/home/news/${nId}`,
        method: 'get',
    })
}

//删除代理机构首页图片


//查看账号是否重复
export function isExistAccount(account) {
    return request({
        url: `/PatentBackstage/web/agencyManage/agency/admin/judge/${account}`,
        method: 'get',
    })
}