import request from '@/utils/request'
export function reqGetBackupList(end,start,name, page) {
    return request(
        {
            url:`/PatentBackstage/web/system/backupRecord/${page}`,
            method:'get',
            params:{
                end:end,
                start:start,
                name:name,
            }
        }
    )
}

export function reqGetbackup() {
    return request(
        {
            url:`/PatentBackstage/web/system/backup/`,
            method:'get'
        }
    )
}

//备份恢复
export function posbackupRecover(Path) {
    return request(
        {
            url:`/PatentBackstage/web/system/backupRecover`,
            method:'post',
            data:Path,
        }
    )
}

//备份删除
export function posDelebackup(form) {
    return request(
        {
            url:`/PatentBackstage/web/system/backupRecord/delete`,
            method:'post',
            data:form
        }
    )
}