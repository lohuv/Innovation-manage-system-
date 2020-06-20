import request from '@/utils/request'
export function reqGetNewsList(page,search,TStart,TEnd,dele) {
    return request({
        url:`/PatentBackstage/web/newsManage/news/${dele}/${page}`,
        method: 'get',
        params:{
            query :search,
            start:TStart,
            end:TEnd,
        },
    })
}
//添加新闻
export function posAddNewsList(form) {
    return request({
        url:`/PatentBackstage/web/newsManage/news/add`,
        method: 'post',
       data:form
    })
}
//删除新闻
export function deleNewsList(arr) {
    return request({
        url:`/PatentBackstage/web/newsManage/news/delete`,
        method:'delete',
        data:arr,
    })
}

//查看新闻领域
export function posreqneighbourhood(id){
    return request({
        url:`/PatentBackstage/web/newsManage/news/neighbourhood/${id}`,
        method:'post',
    })
}
//修改新闻
export function putModifyNews(form) {
    return request({
        url:`/PatentBackstage/web/newsManage/news/update`,
        method:'put',
        data:form,
    })
}

//查看新闻详情
export function reqgetNewsDetail(nId) {
    return request({
        url: `/PatentBackstage/web/newsManage/news/detail/${nId}`,
        method: 'get',
    })
}


