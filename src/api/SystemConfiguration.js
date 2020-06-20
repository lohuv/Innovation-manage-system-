import request from '@/utils/request'
//查看代理机构模板文件
export function reqGetAgencyFileList() {
    return request(
        {
            url:`/PatentBackstage/web/systemLayout/agency/template/file`,
            method:'get'
        }
    )
}
//下载代理机构模板文件
export function posDownLoadAgencyFile(id) {
    return request(
        {
            url:`/PatentBackstage/web/systemLayout/agency/template/file/download/${id}`,
            method:'get',
            responseType:'arraybuffer'
        }
    )
}

//更新代理机构模板文件
export function putUpdateAgencyFile(form) {
    return request(
        {
            url:`/PatentBackstage/web/systemLayout/agency/template/file/update`,
            method:'put',
            data:form,
            headers: { 'content-type': 'multipart/form-data' },
            withCredentials:true
        }
    )
}
//计算代理机构授权率
export function reqGetAgencyCalculate() {
    return request(
        {
            url:`/PatentBackstage/web/systemLayout/agency/calculate`,
          method:'get',
}
    )
}

