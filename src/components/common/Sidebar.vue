<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="collapse"
            background-color="#ff7366"
            text-color="#ffffff"
            active-text-color="#FFFF99"
            unique-opened
            router
        >
            <template v-for="item in items" >
                <template v-if="item.subs"  >
                    <el-submenu :index="'/'+item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu
                                v-if="subItem.subs"
                                :index="'/'+subItem.index"
                                :key="subItem.index"
                            >
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item
                                    v-for="(threeItem,i) in subItem.subs"
                                    :key="i"
                                    :index="'/'+threeItem.index"
                                >{{ threeItem.title }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item
                                v-else
                                :index="'/'+subItem.index"
                                :key="subItem.index"
                            >{{ subItem.title }}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="'/'+item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>

            </template>
        </el-menu>
    </div>
</template>

<script>
import bus from '../common/bus';
import {getAuth} from '../../utils/Func'
export default {
    data() {
        return {
            collapse: false,
            items:[],

        };
    },
    mounted(){
        this.setBar()
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        },

    },
    created() {
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('collapse', msg => {
            this.collapse = msg;
            bus.$emit('collapse-content', msg);
        });
    },
    methods: {
        setBar() {
            let Menu = [];
            let Childflag1 = [];//系统管理拥有的权限数
            let Childflag2 = [];//求职招聘管理拥有的权限数
            let jsonObj = getAuth();//tlocalStorage.getItem('authority');
            let arr=jsonObj.substring(1,jsonObj.length-1);
            arr = arr.split(',');
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] == 1) {
                    Childflag1.push({
                        index: 'Backup',
                        title: '数据备份与还原'
                    });
                }
                if (arr[i] == 2) {
                    Childflag1.push({
                        index: 'SystemUser',
                        title: '系统用户管理'
                    },);
                    Childflag1.push(
                        {
                            icon: 'el-icon-sort',
                            index: 'AboutUs',
                            title: '关于我们'
                        }
                    )
                }
                if (arr[i] == 3) {
                    Menu.push({
                        icon: 'el-icon-office-building',
                        index: 'AgencyInfor',
                        title: '代理机构管理',
                    })
                }
                if (arr[i] == 4) {
                    Childflag2.push(
                        {
                            index: 'jobHunting',
                            title: '求职管理',
                        },
                    );
                }
                if (arr[i] == 5) {
                    Childflag2.push({
                        index: 'CompanyRecruitment',
                        title: '企业招聘管理',
                    },);
                }
                if (arr[i] == 6) {
                    Menu.push({
                        icon: 'el-icon-document-copy',
                        index: 'Case',
                        title: '案件管理',
                    },)
                }
                if (arr[i] == 7) {
                    Menu.push(
                        {
                            icon: 'el-icon-rank',
                            index: 'patent',
                            title: '专利管理'
                        }
                    );
                }
                if (arr[i] == 8) {
                    Menu.push({
                        icon: 'el-icon-s-custom',
                        index: 'custom',
                        title: '用户管理',
                    },);
                }

                if (arr[i] == 9) {
                    Menu.push(
                        {
                            icon: 'el-icon-s-shop',
                            index: 'product',
                            title: '首页产品管理',
                        },
                    )
                }
                if (arr[i] == 10) {
                    Menu.push(
                        {
                            icon: 'el-icon-pie-chart',
                            index: 'statisticManage',
                            title: '数据统计',
                        },
                    )
                }
                if (arr[i] == 11) {
                    Menu.push(
                        {
                            icon: 'el-icon-lock',
                            index: 'Permission',
                            title: '权限管理'
                        },
                    )
                }
                if (arr[i] == 12) {
                    Menu.push(
                        {
                            icon: 'el-icon-lx-global',
                            index: 'annualFee',
                            title: '年费管理'
                        },
                    )
                }
                if (arr[i] == 13) {
                    Menu.push(
                        {
                            icon: 'el-icon-news',
                            index: 'News',
                            title: '新闻管理'
                        }
                    )
                }
                if(arr[i] == 15){
                        Menu.push(
                            {
                                icon: 'el-icon-chat-dot-round',
                                index: 'chatManage',
                                subs:[
                                    {
                                        index: 'chat',
                                        title: '聊天记录管理'
                                },
                                {
                                    index: 'chatStatistic',
                                    title: '聊天数据统计'
                                }

                                ],
                                title: '聊天管理'
                            }
                        )
                    }
                if(arr[i] == 16){
                    Menu.push(
                        {
                            icon: 'el-icon-sort',
                            index: 'PatentTransfer',
                            title: '专利转让管理'
                        }
                    )
                }
                if(arr[i] == 17){
                    Menu.push(
                        {
                            icon: 'el-icon-s-tools',
                            index: 'SystemConfiguration',
                            title: '系统配置管理'
                        }
                    )
                }

                if(arr[i] == 18){
                    Menu.push(
                        {
                            icon: 'el-icon-sort',
                            index: 'advertisement',
                            title: '广告管理'
                        }
                    )
                }
            }

            if(Childflag1.length >= 2)
                Menu.push(
                    {
                        icon: 'el-icon-setting',
                        index: 'system',
                        title: '系统管理',
                        subs:Childflag1
                    },
                );

             if(Childflag1.length == 1){
                 const obj = Childflag1.map(item=>({
                     icon: 'el-icon-s-cooperation',
                     index:item.index,
                     title:item.title,
                 }));
                 Menu.push(obj);
        }

        if(Childflag2.length == 2)
                Menu.push({
                    icon: 'el-icon-s-cooperation',
                    title: ' 求职招聘管理',
                    index: 'jobAndRecruit',
                    subs: [
                        {
                            index: 'jobHunting',
                            title: '求职管理',
                        },
                        {
                            index: 'CompanyRecruitment',
                            title: '企业招聘管理',
                        },
                    ]
                },);
             if(Childflag2.length == 1){
                 const obj = Childflag2.map(item =>({
                     icon: 'el-icon-s-cooperation',
                     index:item.index,
                     title:item.title,
                 }));
                 Menu.push(obj[0]);
             }
            this.items = Menu;
        }
    }

};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
</style>
