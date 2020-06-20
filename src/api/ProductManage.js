import request from '@/utils/request'
export function reqgetProductList(status,dele,page,search) {
    return request({
        url:`/PatentBackstage/web/productManage/product/${status}/${dele}/${page}`,
        method:'get',
        params:{
            query: search
        },
    })
}
//删除产品
export function deleteProduct(arr) {
    return request({
        url:`/PatentBackstage/web/productManage/product/delete`,
        method:'delete',
        data:arr,
    })
}

//产品审核

export function putOperation(pId,status,remark) {
    return request({
        url:`/PatentBackstage/web/productManage/product/status/operation/${pId}/${status}`,
        method:'put',
        data:remark,
    })
}