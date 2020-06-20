<template>
    <div class="chatStatistic" >
        <el-row :gutter="20" class="mgb20">
            <el-col :span="6">
                <el-card shadow="hover" :body-style="{padding: '0px'}">


                </el-card>
            </el-col>

            <el-col :span="6">
                <el-card shadow="hover" :body-style="{padding: '0px'}">
                    <div class="grid-content grid-con-1">
                        <i class="el-icon-chat-round grid-con-icon"></i>
                        <div class="grid-cont-top">
                            <div class="grid-num" >{{PersonTotal}}</div>
                            <div>聊天组总数</div>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card shadow="hover" :body-style="{padding: '0px'}">
                    <div class="grid-content grid-con-2">
                        <i class="el-icon-chat-square grid-con-icon"></i>
                        <div class="grid-cont-top">
                            <div class="grid-num">{{messageTotal}}</div>
                            <div>消息条数总数</div>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card shadow="hover" :body-style="{padding: '0px'}">

                </el-card>
            </el-col>

        </el-row>
        <el-row >

            <el-col :span="24" >
                <div class = "PersonBox">
                    <dateTimePicker style="float: left"  @transferDateTime="getDateTime" ></dateTimePicker>
                    <el-select  style="float: left ;margin-left: 20px" v-model="type" placeholder="请选择查看格式">
                        <el-option label="每日" value="1"></el-option>
                        <el-option label="每月" value="2"></el-option>
                        <el-option label="每年" value="3"></el-option>
                    </el-select>
                    <el-button type="success" style="margin-left: 10px" @click="Switch">切换</el-button>
                </div>
                <el-card shadow="hover">
                    <div id="person" style="width: 100%;height: 350px;"></div>
                </el-card>
            </el-col>

        </el-row>
        <el-row >

            <el-col :span="24" >
                <el-card shadow="hover">
                    <div id="message" style="width: 100%;height: 350px;"></div>
                </el-card>
            </el-col>

        </el-row>
    </div>
</template>

<script>
    import dateTimePicker from '../common/dateTimePicker';
    import {reqGetMessageStatistics} from '../../api/chat.js'
    import echarts from 'echarts';
    export default {
        name: 'chatStatistic',
        components: {
            echarts,
            dateTimePicker
        },
        data(){
            return{
                type:null,
                PersonTotal:0,
                messageTotal:0,
                messageData:[],
                messageDate:[],
                personData:[],
                personDate:[],
                start : 1579275902000,
                end :(new Date()).getTime()
            }
        },

        mounted() {
            this.drawLine();
        },
        methods:{
            //获取聊天数据
            async getMessageStatistics(type = 1,start = 1579275902000,end = 1584459902000){
                try{
                    const res =  await  reqGetMessageStatistics(type,start,end);
                    this.PersonTotal = res.count.person;
                    this.messageTotal = res.count.message;
                    const message = res.message;
                    let m_datearr = [];
                    if(type == 1){
                        for(let i = 0;i<message.length;i++){
                            const m_date = message[i].year+'-'+message[i].month+'-'+message[i].day;
                            m_datearr.push(m_date);
                        }
                    }
                    if(type == 2){
                        for(let i = 0;i<message.length;i++){
                            const m_date = message[i].year+'-'+message[i].month;
                            m_datearr.push(m_date);
                        }
                    }
                    if(type == 3){
                        for(let i = 0;i<message.length;i++){
                            const m_date = message[i].year;
                            m_datearr.push(m_date);
                        }
                    }

                    this.messageDate = m_datearr;
                    let m_dataarr = [];
                    for(let i = 0;i<message.length;i++){
                        m_dataarr.push(message[i].count);
                    }
                    this.messageData = m_dataarr;

                    const person = res.person;
                    let p_datearr = [];
                    if(type == 1){
                        for(let i = 0;i<person.length;i++){
                            const p_date = person[i].year+'-'+person[i].month+'-'+person[i].day;
                            p_datearr.push(p_date);
                        }
                    }
                    if(type == 2){
                        for(let i = 0;i<person.length;i++){
                            const p_date = person[i].year+'-'+person[i].month;
                            p_datearr.push(p_date);
                        }
                    }
                    if(type == 3){
                        for(let i = 0;i<person.length;i++){
                            const p_date = person[i].year;
                            p_datearr.push(p_date);
                        }
                    }
                    this.personDate = p_datearr;
                    let p_dataarr = [];
                    for(let i = 0;i<person.length;i++){
                        p_dataarr.push(person[i].count);
                    }
                    this.personData = p_dataarr;

                }catch (e) {
                    //;
                }
            },

        //注册聊天组合表和消息条数表
        drawLine( type = 1,start = this.start,end = this.end) {
            this.getMessageStatistics( type ,start,end).then(()=>{
                this.charts1 = echarts.init(document.getElementById("person"));
                this.charts1.setOption({
                    title:{
                        text:'聊天组合数统计'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['聊天组合数']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },

                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: this.personDate
                    },
                    yAxis: {
                        type: 'value'
                    },

                    series: [{
                        name: '聊天条数',
                        type: 'line',
                        stack: '总量',
                        data: this.personData
                    }]
                });
                this.charts2 = echarts.init(document.getElementById("message"));
                this.charts2.setOption({
                    title:{
                        text:'消息条数统计'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['消息条数']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },

                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: this.messageDate
                    },
                    yAxis: {
                        type: 'value'
                    },

                    series: [{
                        name: '消息条数',
                        type: 'line',
                        stack: '总量',
                        data: this.messageData
                    }]
                });

            });

        },
            //获得时间戳
            getDateTime(start,end){
                this.start = start;
                this.end =end;
            },
            //更新统计图
             Switch(){
                let type = this.type;
                if(!type)
                    type = 1;
                this.drawLine(type,this.start,this.end);
            },
        }
    };
</script>

<style scoped>
    .chatStatistic{
        width: 100%;
        min-height: 100%;
        background-image: linear-gradient(to bottom right, #FFEFBA 0%, #FFFFFF 100%);
    }
    /deep/.PersonBox{
        width: 100%;
        height: 60px;
        background: #FFFFFF;
    }
    /deep/.el-row {
        margin-bottom: 20px;
    }
    .mgb20 {
        margin-bottom: 20px;
    }
    .grid-content {
        display: flex;
        align-items: center;
        height: 100px;
    }
    .grid-cont-top {
        flex: 1;
        text-align: center;
        font-size: 14px;
        color: #999;
    }
    .grid-num {
        font-size: 30px;
        font-weight: bold;
    }

    .grid-con-1 .grid-con-icon {
        background:#FFCC99
    }

    .grid-con-1 .grid-num {
        color: #FFCC99
    }

    .grid-con-2 .grid-con-icon {
        background:#FFCC99
    }

    .grid-con-2 .grid-num {
        color: #FFCC99
    }

    .grid-con-3 .grid-con-icon {
        background:#99CC99
    }

    .grid-con-3 .grid-num {
        color: #99CC99
    }

    .grid-con-icon {
        font-size: 50px;
        width: 100px;
        height: 100px;
        text-align: center;
        line-height: 100px;
        color: #fff;
    }




</style>