import request from '@/utils/request'

//查看消息发送者和接收者
export function reqGetMessagePerson(senderRole ,receiverRole,page) {
    return request({
        url: `/PatentBackstage/web/chatManage/message/sender/receiver/${senderRole}/${receiverRole}/${page}`,
        method: 'get'
    })
}

//查看聊天记录
export function reqGetMessageRecord(sender,receiver,page) {
    return request({
        url: `/PatentBackstage/web/chatManage/message/${sender}/${receiver}/${page}`,
        method: 'get'
    })
}

//聊天数据统计

export function reqGetMessageStatistics(type ,start,end) {
    return request({
        url: `/PatentBackstage/web/chatManage/message/statistics/${type}/${start}/${end}`,
        method: 'get'
    })
}