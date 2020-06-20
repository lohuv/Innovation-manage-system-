<template>
    <div class="chat">
        <div class="chatHead">
            <el-select v-model="senderRole" @change="search" placeholder="发送方：默认用户">
                <el-option label="用户" value="1"></el-option>
                <el-option label="代理机构" value="2"></el-option>
            </el-select>
            <span> 对 </span>
            <el-select v-model="receiverRole" @change="search"  placeholder="接收方： 默认代理机构">
                <el-option label="用户" value="1"></el-option>
                <el-option label="代理机构" value="2"></el-option>
            </el-select>
        </div>
        <div class = "listTable">
            <el-table
                    :data="messageList"
                    height="100%"
                    style="width: 100%;
                     ">
                <el-table-column
                        prop="senderAccount"
                        label="发送者账号"
                        min-width="20%">
                </el-table-column>
                <el-table-column
                        prop="senderName"
                        label="发送者昵称"
                        min-width="20%">
                </el-table-column>
                <el-table-column
                        prop="receiverAccount"
                        label="接收者账号"
                        min-width="20%">
                </el-table-column>
                <el-table-column
                        prop="receiverName"
                        label="接收者昵称"
                        min-width="20%">
                </el-table-column>
                <el-table-column
                        label="操作"
                        min-width="20%">
                    <template slot-scope="scope">
                    <el-button size="mini" @click="openRecord(scope.row)"> 查看记录</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="block">
            <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="page_size"
                    :page-sizes="[10]"
                    layout="total,sizes,prev, pager, next, jumper"
                    :total="count"
            >
            </el-pagination>
        </div>
        <el-drawer
                title="聊天记录"
                :visible.sync="drawer"
                :before-close="handleClose">
            <div style="width:100%;height: 100%;">
                <div class="topBox" >
                        <div class="messageBox"  v-for="item in messageRecord">
                            <div class = "messageHead">
                                <span> {{item.sentDate}}   {{item.fromJID}}</span>
                            </div>
                            <div class="messageContent">
                               {{item.body}}
                            </div>
                        </div>
                </div>
                <div class="footBox">
<!--                    <el-pagination-->
<!--                            @current-change="RhandleCurrentChange"-->
<!--                            :current-page.sync="RcurrentPage"-->
<!--                            :page-sizes="[10]"-->
<!--                            layout="total,prev, pager, next"-->
<!--                            :total="messageRecord.length"-->
<!--                          >-->

<!--                    </el-pagination>-->
                    <el-button type="text" v-show = "!nullFlag" @click="MoreRecord">查看更多</el-button>
                    <p class="red" v-show = "nullFlag" >没有更多记录了</p>
                </div>
            </div>
        </el-drawer>
    </div>

</template>

<script>
    import {reqGetMessagePerson,reqGetMessageRecord,reqGetMessageStatistics} from '../../api/chat.js'
    export default {
        data(){
            return{
                msg:'',
                nullFlag:false,//提示没有聊天记录
                tableHeight:0,
                RcurrentPage:1,
                recordCount:0,
                drawer:false,
                count:0,
                Rcount:0,
                currentPage:1,
                page_size:10,
                messageList:[],
                messageRecord:[],
                senderRole:'1',
                receiverRole :'2',

            }
        },
        mounted() {
           this.getMessagePerson();
            this.cssStyle();
        },
        methods:{
            //获取列表信息
            async getMessagePerson(senderRole = this.senderRole,receiverRole = this.receiverRole,page =this.currentPage){
                try {
                    const res = await reqGetMessagePerson(senderRole,receiverRole,page);
                    this.count = res.count;
                        if(!res.senderAndReceiver){
                            this.messageList = [];
                            return
                        }
                        const list= res.senderAndReceiver;
                    this.messageList = list.map(item=>({
                        receiverAccount:item.receiverAccount,
                        receiverId: this.receiverRole == 1?'user_'+ item.receiverId+'@'+ '112.126.70.15' :'agency_'+item.receiverId+'@'+ '112.126.70.15',
                        receiverName:item.receiverName,
                        senderAccount:item.senderAccount,
                        senderId:this.senderRole == 1?'user_'+ item.senderId+'@'+ '112.126.70.15':'agency_'+item.senderId+'@'+ '112.126.70.15',
                        senderName:item.senderName,
                    }));

                }catch (e) {
                    //;
                }
            },
            //获取消息记录
            async getMeassage(sender,receiver,page = 1){
                try{
                    const res = await reqGetMessageRecord(sender,receiver,page);
                        let list = res.message;
                        if(!list.length)
                            this.nullFlag = true;
                        for(let i = 0;i<list.length;i++){
                            list[i].sentDate = this.dateString( list[i].sentDate );
                            for(let j = 0;j<this.messageList.length;j++){
                                if(list[i].fromJID === this.messageList[j].receiverId){
                                    list[i].fromJID = this.messageList[j].receiverName
                                }
                                if(list[i].fromJID === this.messageList[j].senderId){

                                    list[i].fromJID = this.messageList[j].senderName
                                }
                            }
                            this.messageRecord.push(list[i]);
                        }



                }catch (e) {
                    //;
                }
            },

            //打开消息记录
            openRecord(row){
                this.msg = row;
                this.drawer = true;
                this.getMeassage(row.senderId,row.receiverId,1);
            },

            //查询
            search(){
                this.getMessagePerson(this.senderRole,this.receiverRole,1)
            },

            handleCurrentChange(val) {
                this.currentPage = val;

            },
            MoreRecord(){
                this.RcurrentPage =  this.RcurrentPage+1;
                this.getMeassage(this.msg.senderId,this.msg.receiverId,this.RcurrentPage)
            },
            RhandleCurrentChange(val) {
                this.RcurrentPage = val;

            },
            //关闭消息记录
            handleClose(done) {
                this.$confirm('确认关闭消息记录？')
                    .then(_ => {
                        done();
                        this.RcurrentPage = 1;
                        this.messageRecord = [];
                    })
                    .catch(_ => {});
            },
            cssStyle(){
                let footHeight = document.getElementsByClassName('block')[0].offsetHeight;
                let tablebox = document.getElementsByClassName('listTable')[0];
                let topbox = document.getElementsByClassName('topBox')[0];
                let bodyHeight =  document.getElementsByClassName('chat')[0].offsetHeight;
                tablebox.style.height  = bodyHeight-footHeight-56+'px';
                topbox.style.height  = bodyHeight-footHeight+'px'
            }
        }


    };

</script>

<style scoped>
    .chat{
        width: 100%;
        height: 100%;
        background: #FFCCCC;
        font-size: 16px;
    }
    /deep/.chatHead{
        width: 100%;
        height: 56px;
        padding: 10px;
        min-width: 1200px;
        box-sizing: border-box;
        -moz-box-sizing:border-box;/* Firefox */
        -webkit-box-sizing:border-box;/* Safari */
    }
    /deep/.chatHead span{
        color: #FFFFFF;
    }
    .chat .listTable{
        width: 100%;
    }
    /deep/.el-drawer{
        overflow-y: auto
    }
    /deep/.messageBox{
        width: 100%;
        min-height: 59px;
        padding-left: 20px;
        box-sizing: border-box;
        -moz-box-sizing:border-box;/* Firefox */
        -webkit-box-sizing:border-box;/* Safari */
        color: #E86850;
        font-family: "Helvetica Neue";
    }
    /deep/.messageBox:hover{
        background:#FFF1C2;
    }
    /deep/ .messageBox .messageHead{
        width: 100%;
        height: 25px;
        font-size: 15px;
        line-height: 25px;

    }
    /deep/.messageBox .messageContent{
        width: 100%;
        min-height: 34px;
        line-height: 34px;
        font-size: 20px;

    }
    /deep/.footBox{
        width: 100%;
        height: 50px;
        padding-left: 20px;
        text-align: center;
        box-sizing: border-box;
        -moz-box-sizing:border-box;/* Firefox */
        -webkit-box-sizing:border-box;/* Safari */
    }
    /deep/.block{
        text-align: center;
    }
    /deep/.topBox{
         width: 100%;
         overflow: auto
     }
    /deep/.red{
        color: #F56C6C;
        font-size: 10px;
    }

</style>