<template>
    <div>
        <el-row :gutter="20" class="mgb20">
            <el-col :span="6">
                <el-card shadow="hover" :body-style="{padding: '0px'}">
                    <div class="grid-content grid-con-1">
                        <i class="el-icon-coin grid-con-icon"></i>
                        <div class="grid-cont-top">
                            <div class="grid-num" >{{AgencyTotal}}</div>
                            <div>代理机构收益总数</div>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card shadow="hover" :body-style="{padding: '0px'}">
                    <div class="grid-content grid-con-2">
                        <i class="el-icon-message grid-con-icon"></i>
                        <div class="grid-cont-top">
                            <div class="grid-num">{{CaseTotal}}</div>
                            <div>案件总数</div>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card shadow="hover" :body-style="{padding: '0px'}">
                    <div class="grid-content grid-con-3">
                        <i class=" el-icon-lx-people grid-con-icon"></i>
                        <div class="grid-cont-top">
                            <div class="grid-num">{{UserTotal}}</div>
                            <div>用户总数</div>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card shadow="hover" :body-style="{padding: '0px'}">
                    <div class="grid-content grid-con-3">
                        <i class="el-icon-view grid-con-icon"></i>
                        <div class="grid-cont-top">
                            <div class="grid-num">{{ViewTotal}}</div>
                            <div>用户访问总数</div>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row >

            <el-col :span="24" >
                <div class = "agencyInfoBox">
                    <dateTimePicker style="float: left"  @transferDateTime="getDateTime" ></dateTimePicker>
                        <el-select  style="float: left ;margin-left: 20px" v-model="ReType" placeholder="请选择查看格式">
                            <el-option label="每日" value="1"></el-option>
                            <el-option label="每月" value="2"></el-option>
                            <el-option label="每年" value="3"></el-option>
                        </el-select>
                    <el-button type="success" style="margin-left: 10px" @click="agancyReSwitch">切换</el-button>
                   <p style="color: #999;">收益总数:{{AgencyTotal}}</p>
                </div>
                <el-card shadow="hover">
                    <div id="profit" style="width: 100%;height: 350px;"></div>
                </el-card>
            </el-col>

        </el-row>

        <el-row >

            <el-col :span="24" >
                <div class = "agencyInfoBox">
                    <dateTimePicker style="float: left" @transferDateTime="getDateTime" ></dateTimePicker>
                    <el-select  style="float: left ;margin-left: 20px" v-model="CType" placeholder="请选择查看格式">
                        <el-option label="每日" value="1"></el-option>
                        <el-option label="每月" value="2"></el-option>
                        <el-option label="每年" value="3"></el-option>
                    </el-select>
                    <el-select  style="float: left ;margin-left: 20px" v-model="status" placeholder="请选择案件类型">
                        <el-option label="全部" value="1"></el-option>
                        <el-option label="已成交" value="2"></el-option>
                    </el-select>
                    <el-button type="success" style="margin-left: 10px" @click = "caseSwitch">切换</el-button>
                    <p style="color: #999;">案件总数:{{CaseTotal}}</p>
                </div>
                <el-card shadow="hover">
                    <div id="case" style="width: 100%;height: 350px;"></div>
                </el-card>
            </el-col>

        </el-row>
        <el-row >

            <el-col :span="24" >
                <div class = "agencyInfoBox">
                    <dateTimePicker style="float: left" @transferDateTime="getDateTime"></dateTimePicker>
                    <el-select  style="float: left ;margin-left: 20px" v-model="UType" placeholder="请选择查看格式">
                        <el-option label="每日" value="1"></el-option>
                        <el-option label="每月" value="2"></el-option>
                        <el-option label="每年" value="3"></el-option>
                    </el-select>
                    <el-button type="success" style="margin-left: 10px" @click="userSwitch">切换</el-button>
                    <p style="color: #999;">用户总数：{{UserTotal}}</p>
                </div>
                <el-card shadow="hover">
                    <div id="userTotal" style="width: 100%;height: 350px;"></div>
                </el-card>
            </el-col>

        </el-row>
        <el-row >

            <el-col :span="24" >
                <div class = "agencyInfoBox">
                    <dateTimePicker style="float: left"@transferDateTime="getDateTime" ></dateTimePicker>
                    <el-select  style="float: left ;margin-left: 20px" v-model="VType" placeholder="请选择查看格式">
                        <el-option label="每日" value="1"></el-option>
                        <el-option label="每月" value="2"></el-option>
                        <el-option label="每年" value="3"></el-option>
                    </el-select>
                    <el-button type="success" style="margin-left: 10px" @click="viewSwitch" >切换</el-button>
                    <p style="color: #999;">访问总数：{{ViewTotal}}</p>
                </div>
                <el-card shadow="hover">
                    <div id="viewTotal" style="width: 100%;height: 350px;"></div>
                </el-card>
            </el-col>

        </el-row>
    </div>
</template>

<script>
    import dateTimePicker from '../common/dateTimePicker';
    import {reqGetAgencyRevenue,reqGetCaseStatistic,reqGetUserStatistic,reqGetViewStatistic} from '../../api/statisticsManage'
    import echarts from 'echarts'
    export default {
        name: 'statisticManage',
        components: {
            echarts,
            dateTimePicker
        },

        data() {
            return {
                ProfitData: [],
                profitDate:[],
                CaseData: [],
                CaseDate:[],
                userData: [],
                userDate:[],
                viewDate:[],
                viewData:[],
                str:'',
                UserTotal:0,
                AgencyTotal:0,
                ViewTotal:0,
                CaseTotal:0,
                ReType:'',
                CType:'',
                UType:'',
                VType:'',
                status:'',
                now:Date.parse(new Date()),
                threeMonthAgo: (new Date()).setMonth( (new Date()).getMonth()-3 ),
                start:'',//2020-1-01-01-00-00时间戳
                end:'',//当前时间戳
                agencyRevenueStatistics:[
                    {name:0,value:12}
                ],
            }
        },
        mounted(){
            this.VdrawLine();
            this.UdrawLine();
            this.PdrawLine();
            this.CdrawLine();
        },
        methods:{

            //代理机构收益
            async getAgencyRevenue(type ,start,end){
                try{
                    const res = await reqGetAgencyRevenue(type,start,end);
                    this.AgencyTotal = res.total;
                    const agencyRevenueStatistics = res.agencyRevenueStatistics;
                    let datearr = [];
                    if(type == 1){
                        for(let i = 0;i<agencyRevenueStatistics.length;i++){
                            const date = agencyRevenueStatistics[i].year+'-'+agencyRevenueStatistics[i].month+'-'+agencyRevenueStatistics[i].day;
                            datearr.push(date);
                        }
                    }
                    if(type == 2){
                        for(let i = 0;i<agencyRevenueStatistics.length;i++){
                            const date = agencyRevenueStatistics[i].year+'-'+agencyRevenueStatistics[i].month;
                            datearr.push(date);
                        }
                    }
                    if(type == 3){
                        for(let i = 0;i<agencyRevenueStatistics.length;i++){
                            const date = agencyRevenueStatistics[i].year;
                            datearr.push(date);
                        }
                    }
                    this.profitDate = datearr;
                    let dataarr = [];
                    for(let i = 0;i<agencyRevenueStatistics.length;i++){
                        dataarr.push(agencyRevenueStatistics[i].count);
                    }
                    this.ProfitData = dataarr;

                }catch (e) {
                    //;
                }
            },
            //案件总量
            async getCaseStatistic(type,start,end ,status ){
                try{
                    const res = await reqGetCaseStatistic(type ,start,end,status);
                    this.CaseTotal = res.count;
                    const data = [];

                    for(let i = 0;i<res.caseStatistics.length;i++){
                        data.push(res.caseStatistics[i].count);
                    }
                    this.CaseData = data;
                    const caseStatistics = res.caseStatistics;

                    const dateArr= [];
                    if(type == 1){
                        for(let i = 0;i<caseStatistics.length;i++){
                            const date = caseStatistics[i].year+'-'+caseStatistics[i].month+'-'+caseStatistics[i].day;
                            dateArr.push(date);
                        }
                    }
                    if(type == 2){
                        for(let i = 0;i<caseStatistics.length;i++){
                            const date = caseStatistics[i].year+'-'+caseStatistics[i].month;
                            dateArr.push(date);
                        }
                    }
                    if(type == 3){
                        for(let i = 0;i<caseStatistics.length;i++){
                            const date = caseStatistics[i].year;
                            dateArr.push(date);
                        }
                    }
                    this.CaseDate  =  dateArr;
                }catch (e) {
                    //;
                }
            },
            //用户总量
            async getUserStatistic(type = 1,start = this.start,end = this.end){
                try{
                    const res = await reqGetUserStatistic(type,start,end);
                    this.UserTotal = res.count;
                    const dataArr = [];
                    for(let i = 0;i<res.userStatistics.length;i++){
                        dataArr.push(res.userStatistics[i].count);
                    }
                    this.userData = dataArr;
                    const userStatistics = res.userStatistics;
                    const dateArr = [];
                    if(type == 1){
                        for(let i = 0;i<userStatistics.length;i++){
                            const date = userStatistics[i].year+'-'+userStatistics[i].month+'-'+userStatistics[i].day;
                            dateArr.push(date);
                        }
                    }
                    if(type == 2){
                        for(let i = 0;i<userStatistics.length;i++){
                            const date = userStatistics[i].year+'-'+userStatistics[i].month;
                            dateArr.push(date);
                        }
                    }
                    if(type == 3){
                        for(let i = 0;i<userStatistics.length;i++){
                            const date = userStatistics[i].year;
                            dateArr.push(date);
                        }
                    }

                    this.userDate = dateArr;

                }catch (e) {
                    //;
                }
            },
            //访问总量
            async getViewStatistic(type = 1,start = this.threeMonthAgo,end = this.now){
                try{
                    const res = await reqGetViewStatistic(type,start,end);
                    this.ViewTotal = res.count;
                    const dataArr = [];
                    for(let i = 0;i<res.viewStatistics.length;i++){
                        dataArr.push(res.viewStatistics[i].count);
                    }
                    this.viewData = dataArr;
                    const viewStatistics = res.viewStatistics;
                    const dateArr = [];
                    if(type ==1){
                        for(let i = 0;i<viewStatistics.length;i++){
                            const date = viewStatistics[i].year+'-'+viewStatistics[i].month+'-'+viewStatistics[i].day;
                            dateArr.push(date);
                        }
                    }
                    if(type == 2){
                        for(let i = 0;i<viewStatistics.length;i++){
                            const date = viewStatistics[i].year+'-'+viewStatistics[i].month;
                            dateArr.push(date);
                        }
                    }

                    if(type == 3){
                        for(let i = 0;i<viewStatistics.length;i++){
                            const date = viewStatistics[i].year;
                            dateArr.push(date);
                        }
                    }

                    this.viewDate = dateArr;

                }catch (e) {
                    //;
                }
            },

            //绘制代理机构收益图
            PdrawLine( type = 1,start = this.threeMonthAgo,end = this.now) {
                this.getAgencyRevenue( type ,start,end).then(()=>{
                    this.charts = echarts.init(document.getElementById("profit"));
                    this.charts.setOption({
                        title:{
                            text:'代理机构利润统计'
                        },
                        tooltip: {
                            trigger: 'axis'
                        },
                        legend: {
                            data: ['代理机构收益']
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
                            data: this.profitDate
                        },
                        yAxis: {
                            type: 'value'
                        },

                        series: [{
                            name: '代理机构收益增量',
                            type: 'line',
                            stack: '总数',
                            data: this.ProfitData
                        }]
                    })
                });

            },

            //绘制案件总量收益图
            CdrawLine(type = 1,start = this.threeMonthAgo,end = this.now ,status = 1){
                this.getCaseStatistic(type,start,end ,status).then(()=>{
                    this.C_charts = echarts.init(document.getElementById("case"));
                    this.C_charts.setOption({
                        title:{
                            text:'案件总量统计'
                        },
                        tooltip: {
                            trigger: 'axis'
                        },
                        legend: {
                            data: ['案件总数']
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
                            data:this.CaseDate,

                        },
                        yAxis: {
                            type: 'value'
                        },

                        series: [{
                            name: '案件增量',
                            type: 'line',
                            stack: '总量',
                            data: this.CaseData
                        }]
                    })
                });


            },

            //绘制用户总量图
            UdrawLine(type = 1,start = this.threeMonthAgo,end = this.now){
                this.getUserStatistic(type,start,end).then(()=>{
                    this.U_charts = echarts.init(document.getElementById("userTotal"));
                    this.U_charts.setOption({
                        title:{
                            text:'用户总量统计'
                        },
                        tooltip: {
                            trigger: 'axis'
                        },
                        legend: {
                            data: ['用户总数']
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
                            data:this.userDate,

                        },
                        yAxis: {
                            type: 'value'
                        },

                        series: [{
                            name: '用户增量',
                            type: 'line',
                            stack: '总量',
                            data:this.userData
                        }]
                    })
                });


            },
            //绘制访问量统计图
            VdrawLine(type = 1,start = this.threeMonthAgo,end = this.now){
                this.getViewStatistic(type,start,end).then(()=>{
                    this.V_charts = echarts.init(document.getElementById("viewTotal"));
                    this.V_charts.setOption({
                        title:{
                            text:'用户访问量统计'
                        },
                        tooltip: {
                            trigger: 'axis'
                        },
                        legend: {
                            data: ['用户访问量']
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
                            data:this.viewDate,

                        },
                        yAxis: {
                            type: 'value'
                        },

                        series: [{
                            name: '用户访问增量',
                            type: 'line',
                            stack: '总量',
                            data:this.viewData
                        }]
                    })
                });


            },


            //获得时间戳
             getDateTime(start,end){
                this.start = start;
                this.end = end;
             },
            //更新案件统计图
            caseSwitch(){
                let type = this.CType;
                let status = this.status;
                if(!type){
                    type = 1
                }
                if(!status){
                    status = 1
                }
                if(!this.start)
                    this.start = this.threeMonthAgo;
                if(!this.end)
                    this.end = this.now;
                this.CdrawLine(type,this.start,this.end,status);
            },
            //跟新代理机构收益统计图
            agancyReSwitch(){
                let type = this.ReType;
                if(!type) {
                    type = 1;
                }
                if(!this.start)
                    this.start = this.threeMonthAgo;
                if(!this.end)
                    this.end = this.now;
                this.PdrawLine(type,this.start,this.end);
            },

            //更新用户访问量图
            viewSwitch(){
                let type = this.VType;
                if(!type) {
                    type = 1;
                }
                if(!this.start)
                    this.start = this.threeMonthAgo;
                if(!this.end)
                    this.end = this.now;
                this.VdrawLine(type,this.start,this.end);
            },
            //更新用户量统计图
            userSwitch(){
                let type = this.UType;
                if(!type) {
                    type = 1;
                }
                if(!this.start)
                    this.start = this.threeMonthAgo;
                if(!this.end)
                    this.end = this.now;
                this.UdrawLine(type,this.start,this.end);
            }
        }
    }
</script>

<style scoped>
    .schart {
        width: 100%;
        height: 300px;
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
    .el-row {
        margin-bottom: 20px;
    }
    .agencyInfoBox{
        width: 100%;
        height: 60px;
        background: #FFFFFF;
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