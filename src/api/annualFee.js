import request from '@/utils/request'

export function reqgetAnnualFeeList(status,page) {
    return request({
        url: `/PatentBackstage/web/annualFeeManage/annualFee/${status}/${page}`,
        method:'get',
    })
}
export  function putConfirmPayment(aId) {
    return request({
        url:`/PatentBackstage/web/annualFeeManage/annualFee/confirmPayment/${aId}`,
        method:'put'
    })
}

