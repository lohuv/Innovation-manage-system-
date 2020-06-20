import request from '@/utils/request'

export function reqGetAboutUs() {
    return request({
        url: `/PatentBackstage/web/system/us`,
        method: 'get'
    })
}

export function reqPutUpdateUs(content ) {
    return request({
        url: `/PatentBackstage/web/system/us/update`,
        method: 'put',
        data:content,
    })
}