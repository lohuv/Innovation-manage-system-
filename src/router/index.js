import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

export default new Router({
    base:'/admin',
    mode:'history',
    routes: [
        {
            path: '/',
            redirect: '/MyInformation',
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '首页框架' },
            children: [

                {
                    path:'/Backup',
                    component:() => import("../components/page/Backup.vue"),
                    meta:{title: '数据备份与还原'},
                },

                {
                    path: '/SystemUser',
                    component: () => import(/* webpackChunkName: "permission" */ '../components/page/SystemUser.vue'),
                    meta: { title: '系统用户管理' ,permission: true}
                },


                {
                    path:'/Backup',
                    component:() => import("../components/page/Backup.vue"),
                    meta: { title: '数据备份与还原' }
                },
                //企业招聘管理
                {
                    path:'/CompanyRecruitment',
                    component:() => import("../components/page/CompanyRecruitment.vue"),
                    meta:{title:'企业招聘管理'}
                },
                {
                    path:'/custom',
                    component:() => import("../components/page/personInfo.vue"),
                    meta: { title: '用户管理' }
                },

                {
                    path:'/jobHunting',
                    component:() => import("../components/page/jobHunting.vue"),
                    meta: { title: '求职管理' }
                },
                //专利管理
                {
                    path:'/patent',
                    component:() => import("../components/page/patent.vue"),
                    meta: { title: '专利管理' }
                },
                //企业详细信息
                {
                    path:'/Companydetail/:id',
                    props:true,
                    component:() => import("../components/page/Companydetail.vue"),
                    meta: { title: '企业信息详情' }
                },{
                    path:'/PersonDetail/:id',
                    props:true,
                    component:() => import("../components/page/PersonDetail.vue"),
                    meta: { title: '个人信息详情' }
                },
                {
                    path:'/Case',
                    component:() => import("../components/page/Case.vue"),
                    meta: { title: '案件管理' }
                },
                {
                    path:'/AgencyInfor',
                    component:() => import("../components/page/AgencyInfor.vue"),
                    meta: { title: '代理机构信息管理' }
                },
                {
                    path:'/AgencyUser/:id',
                    props:true,
                    component:() => import("../components/page/AgencyUser.vue"),
                    meta: { title: '代理机构用户信息' }
                },
                {
                    path:'/Permission',
                    component:()=>import("../components/page/Permission.vue"),
                    meta:{title:'权限管理'},
                },
                {
                    path:'/MyInformation',
                    component:()=>import("../components/page/MyInformation.vue"),
                    meta:{title:'我的资料'},

                },
                {
                    path:'/News',
                    component:()=>import("../components/page/News.vue"),
                    meta:{title:'新闻管理'},

                },
                {
                    path:'/addNews',
                    component:()=>import("../components/page/AddNews.vue"),
                    meta:{title:'添加新闻'},

                },
                {
                    path:'/NewsModify/:id',
                    props:true,
                    component:()=>import("../components/page/NewsModify.vue"),
                    meta:{title:'修改新闻'},
                },

                {
                    path:'/statisticManage',
                    component:()=>import("../components/page/statisticManage.vue"),
                    meta:{title:'数据统计'},
                },
                {
                    path:'/annualFee',
                    component:()=>import("../components/page/annualFeeManage.vue"),
                    meta:{title:'年费管理'},
                },
                {
                    path:'/Product',
                    component:()=>import("../components/page/productManage.vue"),
                    meta:{title:'首页产品管理'},
                },
                {
                    path:'/dateTimePicker',
                    component:()=>import("../components/common/dateTimePicker.vue"),
                    meta:{title:'时间选择器'},
                },

                {

                    path:'/NewsDetail/:id/:type',
                    component:()=>import("../components/page/NewsDetail.vue"),
                    meta:{title:'新闻详情'},

                },


                {   path:'/agencyHome/:id',
                    props:true,
                    component:()=>import("../components/page/agencyHome.vue"),
                    meta:{title:'代理机构首页'},
                },

                {   path:'/chat',
                    component:()=>import("../components/page/chat.vue"),
                    meta:{title:'聊天管理'},
                },
                {   path:'/patentTransfer/',
                    component:()=>import("../components/page/PatentTranfer.vue"),
                    meta:{title:'专利转让管理'},
                },
                {
                    path:'/PatentPeople/:id',
                    props:true,
                    component:()=>import("../components/page/PatentPerson.vue"),
                    meta:{title:'专利相关人员' },
                },
                {
                    path:'/caseDetail/:id/:type',
                    props:true,
                    component:()=>import("../components/page/CaseDetail.vue"),
                    meta:{title:'案件详情' },
                },
                {
                    path:'/chatStatistic',
                    component:()=>import("../components/page/chatStatistic.vue"),
                    meta:{title:'聊天数据统计' },
                },
                {
                    path:'/SystemConfiguration',
                    component:()=>import("../components/page/SystemConfiguration.vue"),
                    meta:{title:'系统配置管理' },
                },
                {
                    path:'/AboutUs',
                    component:()=>import("../components/page/AboutUs.vue"),
                    meta:{title:'关于我们'},

                },
                {
                    path:'/checkEnterprise/:id',
                    props:true,
                    component:()=>import("../components/page/CheckEnterprise.vue"),
                    meta:{title:'企业认证'},

                },
                {
                    path:'/advertisement',
                    props:true,
                    component:()=>import("../components/page/advertisement.vue"),
                    meta:{title:'广告管理'},
                },
                {
                    path:'/agencyEarn/:id',
                    props:true,
                    component:()=>import("../components/page/agencyearn.vue"),
                    meta:{title:'代理机构案件收益'},
                },



            ]
        },
        {
            path:'/getPassword',
            component:()=>import("../components/page/getpassword.vue"),
            meta:{title:'找回密码'},
        },
        {
            path: '/login',
            component: () => import('../components/page/Login.vue'),
            meta: { title: '登录' }
        },
    ]
});



