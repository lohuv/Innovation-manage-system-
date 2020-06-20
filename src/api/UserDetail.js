import request from '@/utils/request'

export function reqGetUserDetail(id,type) {

    return request({
        url: `/PatentBackstage/web/userManage/user/detail/${type}/${id}`,
        method: 'get',

    })
}

//查看企业招聘信息
export function reqGetRecruitInfo(id ,page){

    return request({
        url: `/PatentBackstage/web/userManage/recruitment/${id}/${page}`,
        method: 'get',
    })
}
//查看企业招聘详情
export function reqGetRecruitInfoDetail(id ) {

    return request({
        url: `/PatentBackstage/web/userManage/recruitment/${id}`,
        method: 'get',
    })
}
//查看求职信息
export function reqGetJobInfo(id,page) {

    return request({
        url: `/PatentBackstage/web/userManage/jobInfo/${id}/${page}`,
        method: 'get',
    })
}
//查看案件
export function reqGetUserCase(id,page ) {

    return request({
        url: `/PatentBackstage/web/userManage/case/${id}/${page}`,
        method: 'get',
    })
}
//查看案件详情
export function reqGetUserCaseDetail(id) {

    return request({
        url: `/PatentBackstage/web/userManage/case/${id}`,
        method: 'get',
    })
}
//查看专利
export function reqGetUserPatent(id,page ) {

    return request({
        url: `/PatentBackstage/web/userManage/patent/${id}/${page}`,
        method: 'get',
    })
}
//查看专利详情
export function reqGetUserPatentDetail(id) {

    return request({
        url: `/PatentBackstage/web/userManage/patent/${id}`,
        method: 'get',
    })
}
//修改专利
export function PutPatentModify(PatentForm) {

    return request({
        url: `/PatentBackstage/web/userManage/patent/update`,
        method: 'put',
        data:PatentForm
    })
}
//修改案件
export function PutCaseModify(CaseForm) {
    return request({
        url: `/PatentBackstage/web/caseManage/case/update`,
        method: 'put',
        data:CaseForm
    })
}
//发布或取消企业招聘信息
export function putUpdateReInfo(rlds,status) {
    return request({
        url: `/PatentBackstage/web/userManage/recruitment/update/${status}`,
        method:'put',
        data:rlds,
    })
}
//发布或取消求职信息
export function putUpdateJobInfo(rlds,status){
    return request({
        url:`/PatentBackstage/web/userManage/jobInfo/update/${status}`,
        method:'put',
        data:rlds,
    })
}

//查看加入企业的用户
export function reqgetEnterprisePerson(eId,page){
    return request({
        url:`/PatentBackstage/web/userManage/enterprise/user/${eId}/${page}`,
        method:'get',
    })
}
