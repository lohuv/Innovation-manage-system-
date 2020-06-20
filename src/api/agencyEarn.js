import request from '@/utils/request'
//查看代理机构专利转让案件极其收益
export function reqGetRevenueTransfer(id,page) {
    return request({
        url:`/PatentBackstage/web/agencyManage/agency/revenue/transfer/${id}/${page}`,
        method:'get',
        })
}
//查看案件机构专利申请案件及其收益
export function reqGetRevenueApply(id,page) {
    return request({
        url:`/PatentBackstage/web/agencyManage/agency/revenue/apply/${id}/${page}`,
        method:'get',
    })
}
