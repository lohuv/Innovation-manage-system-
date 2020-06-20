import request from '@/utils/request'

export function reqGetAgencyList(page = 1,search) {
    return request({
        url: `/PatentBackstage/web/agencyManage/agency/${page}`,
        params:{
            query:search
        },
        method: 'get'
    })
}

//添加代理机构
export function posAddAgency(form) {
    return request({
        url: `/PatentBackstage/web/agencyManage/agency/add`,
        data:form,
        method: 'post',
        headers: { 'content-type': 'multipart/form-data' },
        withCredentials:true
    })
}

//代理机构详情
export function reqGetAgencyDetail(aId) {
    return request({
        url: `/PatentBackstage/web/agencyManage/agency/detail/${aId}`,
        method: 'get'
    })
}

//代理机构首页
export function reqGetAgencyhome(aId) {
    return request({
        url: `/PatentBackstage/web/agencyManage/home/${aId}`,
        method: 'get'
    })
}

//删除代理机构首页图片等信息

// type
// 1 删除首页图片
// 2 删除首页介绍
// 3 删除首页新闻
export function deleAgencyhome(aid,ids,Type) {
    return request({
        url: `/PatentBackstage/web/agencyManage/home/delete/${aid}/${Type}`,
        method: 'delete',
        data:ids,
        params:{
            aId:aid,
            type:Type,
        }
    })
}

//代理机构首页新闻正文
export function reqGetAgencyhomeNews(nId) {
    return request({
        url: `/PatentBackstage/web/agencyManage/home/news/${nId}`,
        method: 'get'
    })
}

//修改代理机构信息
export function reqputAgencyModify(form) {
    return request({
        url: `/PatentBackstage/web/agencyManage/agency/update`,
        method: 'put',
        data:form,
        headers: { 'content-type': 'multipart/form-data' },
        withCredentials:true

    })
}
//地域

export function reqGetAgencyRegion(pid) {
    return request({
        url: `/PatentBackstage/web/agencyManage/agency/region/${pid}`,
        method: 'get'
    })
}


