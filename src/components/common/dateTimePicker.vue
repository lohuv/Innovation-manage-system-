<template>
    <div>
        <el-date-picker @change="setDateTime"
                v-model="value"
                type="datetimerange"
                :picker-options="pickerOptions"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="right">
        </el-date-picker>
    </div>
</template>

<script>
    export default {
        name:'dateTimePicker',
        data() {
            return {
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                value: ''
            };

        },
        methods:{
            //将时间转化为时间戳
            setDateTime(){
                if(!this.value){
                    this.$emit('transferDateTime','','');
                }
                else{
                    const date1= this.parseTime(this.value[0]);
                    const date2 = this.parseTime(this.value[1]);
                    const value1 = new Date(date1);
                    const value2 = new Date(date2);
                    const start = value1.valueOf();
                    const end = value2.valueOf();
                    this.$emit('transferDateTime',start,end);
                }
            },
            //转化时间格式
            parseTime(d) {
                const newDate = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' '
                    + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
                return newDate;
            }
        }
    };
</script>