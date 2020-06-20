import request from '@/utils/request'

//查看广告
export function reqGetAdvertiseList(dele,page) {
    return request({
        url: `/PatentBackstage/web/advertiseManage/advertise/${dele}/${page}`,
        method: 'post'
    })
}
//添加广告
export function reqAddAdvertise(form) {
    return request({
        url: `/PatentBackstage/web/advertiseManage/advertise/add`,
        method: 'post',
        data:form,
        headers: { 'content-type': 'multipart/form-data' },
        withCredentials:true
    })
}
//删除广告
export function reqdeleAdvertise(arr) {
    return request({
        url: `/PatentBackstage/web/advertiseManage/advertise/delete`,
        method: 'delete',
        data:arr
    })
}
//修改广告
export function reqModifyAdvertise(form) {
    return request({
        url: `/PatentBackstage/web/advertiseManage/advertise/update`,
        method: 'put',
        data:form
    })
}