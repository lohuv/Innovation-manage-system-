import request from '@/utils/request'
//代理机构收益统计
export function reqGetAgencyRevenue( type,start,end) {
    return request({
        url:`/PatentBackstage/web/statisticsManage/agency/revenue/${type}/${start}/${end}`,
        method:'get'
    })
}

//案件统计
export function reqGetCaseStatistic(type,start,end ,status) {
    return request({
        url:`/PatentBackstage/web/statisticsManage/case/${type}/${status}/${start}/${end}`,
        method:'get'
    })
}

//用户统计

export function reqGetUserStatistic(type,start,end ) {
    return request({
        url:`/PatentBackstage/web/statisticsManage/user/${type}/${start}/${end}`,
        method:'get'
    })
}

//访问量统计
export function reqGetViewStatistic(type,start,end ) {
    return request({
        url:`/PatentBackstage/web/statisticsManage/view/${type}/${start}/${end}`,
        method:'get'
    })
}