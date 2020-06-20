import request from '@/utils/request'

export function reqGetPatentList(page = 1,search,Status) {
    return request({
        url: `/PatentBackstage/web/patentManage/patent/${Status}/${page}`,
        params:{
            query:search,
        },
        method: 'get',
    })
}
//专利状态列表
export function reqGetPatentStatus() {
    return request({
        url: `/PatentBackstage/web/patentManage/patent/status`,
        method: 'get',
    })
}
//查看专利权人和发明人
export function reqGetPatentPerson(pId,page) {
    return request({
        url: `/PatentBackstage/web/patentManage/patent/relation/${pId}/${page}`,
        method: 'get',
    })
}

//专利详情
export function reqGetPatentDetail(id) {
    return request({
        url: `/PatentBackstage/web/patentManage/patent/detail/${id}`,
        method: 'get',
    })
}

//专利相关人员详情
export function reqGetPatentPersonDetail(id) {
    return request({
        url: `/PatentBackstage/web/patentManage/patent/person/detail/${id}`,
        method: 'get',
    })
}


//修改专利权人或发明人信息
export function putPatentPersonModify(form) {
    return request({
        url: `/PatentBackstage/web/patentManage/patent/person/update`,
        method: 'put',
        data:form,
    })
}

//专利转让记录
export function reqGetPatentRecord(name,page,status) {
    return request({
        url: `/PatentBackstage/web/patentTransferManage/patent/${status}/${page}`,
        method: 'get',
       params:{
           query:name,

       }
    })
}

// //专利转让详情
export function reqGetPatentTransferDetail(ptId) {
    return request({
        url: `/PatentBackstage/web/patentTransferManage/patent/detail/${ptId}`,
        method: 'get',
    })
}

//专利转让状态列表
export function reqGetPatentTransferStatus() {
    return request({
        url: `/PatentBackstage/web/patentTransferManage/patent/transfer/status`,
        method: 'get',
    })
}

//查看专利数量
export function reqGetPatentCount(search,status) {
    return request({
        url: `/PatentBackstage/web/patentManage/patent/count/${status}`,
        method: 'get',
        params:{
            query:search
        }
    })
}

//修改专利
export function reqputPatentModify(form) {
    return request({
        url: `/PatentBackstage/web/patentManage/patent/update`,
        method: 'put',
        data:form,
    })
}
//法律数据上传
export function reqGetPatentLowUpdate(file) {
    return request({
        url: `/PatentBackstage/web/patentManage/law/upload`,
        method: 'post',
        data:file,
        withCredentials:true,
        headers: { 'content-type': 'multipart/form-data' },
    })
}
//专利数据上传
export function reqGetPatentDataUpdate(file) {
    return request({
        url: `/PatentBackstage/web/patentManage/patent/upload`,
        method: 'post',
        withCredentials:true,
        headers: { 'content-type': 'multipart/form-data' },
        data:file,
    })
}