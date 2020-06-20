import request from '@/utils/request'
//获取找回密码的验证码
export function reqGetRetrievePwdCode(phone) {
    return request({
        url: `/PatentBackstage/web/retrievePwd/code/${phone}`,
        method: 'get'
    })
}
//修改密码
export function reqGetRetrievePwdUpdate(phone,code,password) {
    return request({
        url: `/PatentBackstage/web/retrievePwd/password/update/${phone}/${code}`,
        method: 'put',
        data:password
    })
}

