import request from "../utils/request"

export function reqGetRecruitList(page = 1,search) {
    return request({
        url: `/PatentBackstage/web/recruitmentManage/recruitment/${page}`,
        method: 'get',
        params:{
            query:search
        }
    })
}


export function updateRecruit(Array,status) {

    return request({
        url: `/PatentBackstage/web/recruitmentManage/recruitment/update/${status}`,
        method: 'put',
        data:Array,
    })
}
