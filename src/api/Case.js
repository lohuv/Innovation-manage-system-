import request from '@/utils/request'

export function reqGetCaseList(page = 1,search,status) {
    return request({
        url: `/PatentBackstage/web/caseManage/case/${status}/${page}`,
        params:{
            query :search,
        },
        method: 'get',
    })
}

export function reqGetCaseDetail(id) {
    return request({
        url: `/PatentBackstage/web/caseManage/case/detail/${id}`,
        method: 'get',
    })
}

export function reqPosCaseModify(modifyForm) {

    return request({
        url: `/PatentBackstage/web/caseManage/case/update`,
        method: 'put',
        data:modifyForm
    })
}

export function reqPosCaseStatus() {

    return request({
        url: `/PatentBackstage/web/caseManage/case/status`,
        method: 'get',
    })
}

