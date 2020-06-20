import request from '@/utils/request'

export function reqGetjobInfo(page = 1,search) {
    return request({
        url: `/PatentBackstage/web/jobManage/jobInfo/${page}`,
        params:{
            query:search,
        },
        method: 'get'
    })
}


export function putUpdateJobInfo(Array,status) {

    return request({
        url: `/PatentBackstage/web/jobManage/jobInfo/update/${status}`,
        method: 'put',
        data:Array,
    })
}
