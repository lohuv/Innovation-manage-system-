import request from '@/utils/request'
export function reqputlogin(form) {
  return request({
      url: `/PatentBackstage/login`,
      method:'post',
      data:form,
      headers: { 'content-type': 'multipart/form-data' },
      withCredentials:true
  })
}

