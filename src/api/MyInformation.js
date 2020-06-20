import request from '@/utils/request'

//查看个人信息
export function reqGetPersonInfo() {
    return request({
        url: `/PatentBackstage/web/personManage/user/person/info`,
        method: 'get'
    })
}
//修改密码
export function reqPutPwdModify(form) {
    return request({
        url: `/PatentBackstage/web/personManage/password/update`,
        method: 'put',
        withCredentials:true,
        headers: { 'content-type': 'multipart/form-data' },
        data:form
    })
}
//更新用户本人的信息
export function putPersonInfoModify(form){
    return request({
        url: `/PatentBackstage/web/personManage/info/update`,
        withCredentials:true,
        headers: { 'content-type': 'multipart/form-data' },
        method: 'put',
        data:form,
    })
}
//绑定手机号
export function reqGetBindPhone(phone,code) {
        return request({
        url: `/PatentBackstage/web/personManage/user/phone/bind/${phone}/${code}`,
        method: 'get'
    })
}

//解绑绑定手机号
export function reqGetUnbindPhone(code) {
    return request({
        url: `/PatentBackstage/web/personManage/user/phone/unbind/code/${code}`,
        method: 'get'
    })
}
//获取绑定手机号验证码
export function reqGetBindCode(phone) {
    return request({
        url: `/PatentBackstage/web/personManage/user/phone/bind/code`,
        method: 'put',
        params:{
            phone:phone
        }
    })
}
//获取解绑手机号验证码
export function reqGetUnBindCode() {
    return request({
        url: `/PatentBackstage/web/personManage/user/phone/unbind/code`,
        method: 'get'
    })
}
