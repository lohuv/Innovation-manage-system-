<template>
    <div class="PersonDetail">
        <div class="Info">
            <el-form style="margin: 30px; color: #FFFFFF">
                <el-form-item label="头像：">
                    <el-avatar shape="square" :size="100" :src="userDetail.u_profile"></el-avatar>
                </el-form-item>
                <el-form-item label="用户名：">
                    <span v-if = userDetail.u_name>{{userDetail.u_name}}</span>
                    <span v-else class="red">暂无信息</span>
                </el-form-item>
                <el-form-item label="账号：">
                    <span v-if = userDetail.u_account >{{userDetail.u_account }}</span>
                    <span v-else class="red">暂无信息</span>
                </el-form-item>
                <el-form-item label="性别：">
                    <span v-if = userDetail.u_sex>{{ userDetail.u_sex }}</span>
                    <span v-else class="red">暂无信息</span>
                </el-form-item>
                <el-form-item label="国籍：">
                    <span v-if = userDetail.u_nationality  >{{ userDetail.u_nationality }}</span>
                    <span v-else class="red">暂无信息</span>
                </el-form-item>
                <el-form-item label="邮箱：">
                    <span v-if = userDetail.u_email>{{ userDetail.u_email }}</span>
                    <span v-else class="red">暂无信息</span>
                </el-form-item>
                <el-form-item label="地址：">
                    <span v-if =userDetail.u_address >{{ userDetail.u_address }}</span>
                    <span v-else class="red">暂无信息</span>
                </el-form-item>
                <el-form-item label="邮政编码：">
                    <span v-if = userDetail.u_postcode >{{ userDetail.u_postcode }}</span>
                    <span v-else class="red">暂无信息</span>
                </el-form-item>
                <el-form-item label="联系电话：">
                    <span v-if = userDetail.u_phone>{{ userDetail.u_phone }}</span>
                    <span v-else class="red">暂无信息</span>
                </el-form-item>
                <el-form-item label="创建时间：">
                    <span v-if = userDetail.u_create_time>{{ userDetail.u_create_time }}</span>
                    <span v-else class="red">暂无信息</span>
                </el-form-item>
                <el-form-item label="登录次数：">
                    <span v-if = userDetail.u_login_time >{{ userDetail.u_login_time }}</span>
                    <span v-else class="red">暂无信息</span>
                </el-form-item>
                <el-form-item label="身份证号：">
                    <span v-if = userDetail.u_id_number>{{ userDetail.u_id_number }}</span>
                    <span v-else class="red">暂无信息</span>
                </el-form-item>
                <el-form-item label="身份证正面照：">
                    <el-avatar shape="square" :size="100" :src="userDetail.u_front_view"></el-avatar>
                </el-form-item>
                <el-form-item label="身份证反面照：">
                    <el-avatar shape="square" :size="100" :src="userDetail.u_back_view"></el-avatar>
                </el-form-item>

            </el-form>

        </div>
        <div class="job">
            <div class="header_pbox" style="height:60px;width: 100%;">
                <div style="float: left;color: #FFFFFF;font-family: 楷体;font-size: 24px ;line-height: 60px ;width: 100px; ">
                    个人求职
                </div>
                <el-button  type = 'text' @click="checkPublish()" style="margin-top: 15px;color:#FFFFFF">选中可发布消息</el-button>
                <el-button  type = 'text' @click="checkCancel()" style=" color: #FFFFFF">选中可取消消息</el-button>
                <el-button type = 'text' @click="clearSelectedChannels()" style=" color: #FFFFFF">取消选中</el-button>
                <el-popconfirm
                        @onConfirm="CancelAll()"
                        title="要取消所有选中的内容吗？"
                >
                    <el-button type="danger" slot="reference" v-show = "J_cancel" style=";float: right; margin-right: 10px;margin-top: 10px" >批量取消</el-button>
                </el-popconfirm>


                <el-popconfirm
                        @onConfirm=" UpdateAll()"
                        title="要发布所有选中的内容吗？"
                >
                    <el-button type="success"  v-show = "J_publish" slot="reference"  style="float: right;margin-right: 10px;margin-top: 10px">批量发布 </el-button>
                </el-popconfirm>

            </div>
            <el-table
                    @selection-change="handleSelectionChange"
                    :data="jobInfos"
                    ref = "jobTable"
                    width="100%"
                    height="79%">
                <el-table-column
                        :selectable="checkSelectable"
                        type="selection"
                        width="50">
                </el-table-column>
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="job-table-expand">
                            <el-form-item label="期望职务:">
                                <span v-if =props.row.j_h_job_intention >{{ props.row.j_h_job_intention}}</span>
                                <span v-else class="red">暂无信息</span>
                            </el-form-item>
                            <el-form-item label="期望工作地点:">
                                <span v-if = props.row.j_h_for_address >{{ props.row.j_h_for_address }}</span>
                                <span v-else class="red">暂无信息</span>
                            </el-form-item>
                            <el-form-item label="期望薪资:">
                                <span v-if = props.row.j_h_for_salary >{{ props.row.j_h_for_salary }}</span>
                                <span v-else class="red">暂无信息</span>
                            </el-form-item>
                            <el-form-item label="工作经验:">
                                <span v-if =  props.row.j_h_work_experience>{{ props.row.j_h_work_experience}}</span>
                                <span v-else class="red">暂无信息</span>
                            </el-form-item>
                            <el-form-item label="性别:">
                                <span v-if =  props.row.j_h_sex>{{ props.row.j_h_sex}}</span>
                                <span v-else class="red">暂无信息</span>
                            </el-form-item>
                            <el-form-item label="年龄:">
                                <span v-if =  props.row.j_h_age >{{ props.row.j_h_age }}</span>
                                <span v-else class="red">暂无信息</span>
                            </el-form-item>
                            <el-form-item label="求职状态:">
                                <span v-if =  props.row.j_h_status>{{ props.row.j_h_status }}</span>
                                <span v-else class="red">暂无信息</span>
                            </el-form-item>

                            <el-form-item label="学历:">
                                <span v-if = props.row.j_h_education_background>{{ props.row.j_h_education_background }}</span>
                                <span v-else class="red">暂无信息</span>
                            </el-form-item>
                            <el-form-item label="求职创建时间:">
                                <span v-if = props.row.j_h_creat_time >{{ props.row.j_h_creat_time }}</span>
                                <span v-else class="red">暂无信息</span>
                            </el-form-item>
                            <el-form-item label="工作年限:">
                                <span v-if =  props.row.j_h_woker_years >{{ props.row.j_h_woker_years }}</span>
                                <span v-else class="red">暂无信息</span>
                            </el-form-item>

                            <el-form-item label="联系电话:">
                                <span v-if =  props.row.j_h_phone>{{ props.row.j_h_phone }}</span>
                                <span v-else class="red">暂无信息</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column
                >
                    <template slot-scope="scope">
                        <el-avatar :size="40" :src="scope.row.j_h_image"></el-avatar>
                    </template>
                </el-table-column>
                <el-table-column
                        label="求职人姓名"
                        prop="j_h_name">
                </el-table-column>
                <el-table-column
                        label="期望职位"
                        prop="j_h_for_address">
                </el-table-column>
                <el-table-column
                        label="学历"
                        prop="j_h_education_background">
                </el-table-column>
                <el-table-column
                        label="联系电话"
                        prop="j_h_phone">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">

                        <el-popconfirm
                                @onConfirm="handleUpdate(scope.$index, scope.row)"
                                title="要发布该内容吗？"
                        >
                            <el-button
                                    v-show="scope.row. j_h_status === '已取消'"
                                    size="mini"
                                    type = "success"
                                    slot="reference"
                                    style = "margin-right: 10px"
                            >发布</el-button>
                        </el-popconfirm>
                        <el-popconfirm
                                @onConfirm="handleCancel(scope.$index, scope.row)"
                                title="要取消该内容吗？"
                        >
                            <el-button
                                    v-show="scope.row. j_h_status === '进行中'"
                                    size="mini"
                                    slot="reference"
                                    type="danger"
                            >取消</el-button>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
            <div class="block" style=" background: #99CCCC">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="J_handleCurrentChange"
                        :current-page="jCurrentPage"
                        :page-sizes="[10]"
                        :pager-count="7"
                        :page-size="page_size"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="jobCount"

                >
                </el-pagination>
            </div>
        </div>
        <div class="Patent">
            <div class="header_pbox" style="height: 12%;width: 100%;">
                <div style="float: left ;width: 200px;;height: 30px;margin: 10px; color:#FFFFFF;font-family: 楷体;font-size: 24px ">
                    专利
                </div>
            </div>
            <el-table
                    height="79%"
                    :data="patents"
                    style="width: 100% "
            >

                <el-table-column
                        prop="u_p_power"
                        label="身份"
                        min-width="20%">
                </el-table-column>
                <el-table-column
                        prop="p_name"
                        label="专利名称"
                        min-width="20%">
                </el-table-column>
                <el-table-column
                        prop="p_patent_number"
                        label="申请号"
                        min-width="20%">
                </el-table-column>

                <el-table-column
                        prop="p_create_time"
                        label="发明时间"
                        min-width="20%">
                </el-table-column>


                <el-table-column
                        prop="p_type"
                        label="类别"
                        min-width="20%">
                </el-table-column>
                <el-table-column
                        prop="p_status"
                        label="状态"
                        min-width="20%">
                </el-table-column>
                <el-table-column
                        label="操作"
                        min-width="20%">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" style="margin-right:10px"
                                   @click="openModifyPatent(scope.row.p_id)">修改
                        </el-button>
                        <el-dialog
                                title="专利修改"
                                :visible.sync="updatePatentVisible"
                                width="500px"
                                center
                        >

                            <el-form :model="PatentForm" status-icon :rules="PatentRules" ref="PatentRuleForm"
                                     label-width="135px" style="width:350px">
                                <el-form-item label="专利名称" prop = "name">
                                    <el-input v-model="PatentForm.name" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="专利状态">
                                    <el-select v-model="PatentForm.status" placeholder="请选择专利状态"
                                               value="PatentRuleForm.status">
                                        <el-option label="不转让" value="1"></el-option>
                                        <el-option label="待转让" value="2"></el-option>
                                        <el-option label="转让中" value="3"></el-option>
                                        <el-option label="申请中" value="4"></el-option>
                                        <el-option label="已申请" value="5"></el-option>
                                    </el-select>
                                </el-form-item>


                            </el-form>
                            <span slot="footer" class="dialog-footer">
                         <el-button @click="updatePatentVisible = false">取 消</el-button>
                         <el-button type="primary" @click="updatePatent('PatentRuleForm')">提交</el-button>
                         </span>
                        </el-dialog>
                        <el-button size="mini" style="background:#EEA282; color: white"
                                   @click="openPatentDetail(scope.row.p_id)">详情
                        </el-button>
                        <el-dialog title="专利详情" :visible.sync="detailPatentVisible" center width="1000px" >
                            <div class="patentDetail" >
                                <el-form :inline="true" >
                                    <el-form-item  v-show = "patentDetail.p_url" label="专利图片">
                                        <el-image style="width: 250px; height: 200px;;
                                             "
                                                  :src="patentDetail.p_url"
                                                  :fit="fit"
                                        >
                                        </el-image>
                                    </el-form-item>
                                    <el-form-item label="代理机构名称">
                                        <span v-if = patentDetail.p_agency_name>{{patentDetail.p_agency_name }}</span>
                                        <span v-else class="red">暂无信息</span>
                                    </el-form-item>
                                    <el-form-item label="代理机构编号">
                                        <span v-if = patentDetail.p_agency_num>{{patentDetail.p_agency_num }}</span>
                                        <span v-else class="red">暂无信息</span>
                                    </el-form-item>
                                    <el-form-item label="代理人">
                                        <span v-if = patentDetail.p_agent_name>{{patentDetail.p_agent_name }}</span>
                                        <span v-else class="red">暂无信息</span>
                                    </el-form-item>
                                    <el-form-item label="专利名称">
                                        <span v-if =  patentDetail.p_name >{{ patentDetail.p_name }}</span>
                                        <span v-else class="red">暂无信息</span>
                                    </el-form-item>
                                    <el-form-item label="申请号">
                                        <span v-if = patentDetail.p_patent_number >{{ patentDetail.p_patent_number }}</span>
                                        <span v-else class="red">暂无信息</span>
                                    </el-form-item>
                                    <el-form-item label="专利类别">
                                        <span v-if =  patentDetail.p_type >{{ patentDetail.p_type }}</span>
                                        <span v-else class="red">暂无信息</span>
                                    </el-form-item>
                                    <el-form-item label=" 专利状态">
                                        <span v-if = patentDetail.p_status>{{ patentDetail.p_status }}</span>
                                        <span v-else class="red">暂无信息</span>
                                    </el-form-item>

                                    <el-form-item label="主分类号">
                                        <span v-if = patentDetail.p_main_classification>{{patentDetail.p_main_classification }}</span>
                                        <span v-else class="red">暂无信息</span>
                                    </el-form-item>
                                    <el-form-item label="公开号">
                                        <span v-if = patentDetail.p_country_name>{{patentDetail.p_country_name }}</span>
                                        <span v-else class="red">暂无信息</span>
                                    </el-form-item>
                                    <el-form-item label="公开号（带国别类型）">
                                        <span v-if = patentDetail.p_public_number_country>{{patentDetail.p_public_number_country }}</span>
                                        <span v-else class="red">暂无信息</span>
                                    </el-form-item>
                                    <el-form-item label="审查员">
                                        <span v-if = patentDetail.p_examiner>{{patentDetail.p_examiner }}</span>
                                        <span v-else class="red">暂无信息</span>
                                    </el-form-item>
                                    <el-form-item label="发明人">
                                        <span v-if = patentDetail.p_inventors>{{patentDetail.p_inventors }}</span>
                                        <span v-else class="red">暂无信息</span>
                                    </el-form-item>
                                    <el-form-item label="申请人地址">
                                        <span v-if = patentDetail.p_applicants_address>{{patentDetail.p_applicants_address }}</span>
                                        <span v-else class="red">暂无信息</span>
                                    </el-form-item>
                                    <el-form-item label="公告日">
                                        <span v-if = patentDetail.p_note_time>{{patentDetail.p_note_time }}</span>
                                        <span v-else class="red">暂无信息</span>
                                    </el-form-item>
                                    <el-form-item label="公开日">
                                        <span v-if = patentDetail.p_public_time>{{patentDetail.p_public_time }}</span>
                                        <span v-else class="red">暂无信息</span>
                                    </el-form-item>
                                    <el-form-item label=" 申请时间">
                                        <span v-if = patentDetail.p_application_date  >{{ patentDetail.p_application_date }}</span>
                                        <span v-else class="red">暂无信息</span>
                                    </el-form-item>
                                    <el-form-item label=" 授权时间">
                                        <span v-if = patentDetail.p_authorization_time>{{patentDetail.p_authorization_time }}</span>
                                        <span v-else class="red">暂无信息</span>
                                    </el-form-item>
                                    <el-form-item label=" 专利创建时间">
                                        <span v-if = patentDetail.p_create_time>{{ patentDetail.p_create_time }}</span>
                                        <span v-else class="red">暂无信息</span>
                                    </el-form-item>
                                    <el-form-item label="下次缴费时间">
                                        <span v-if = patentDetail.p_next_payment_time>{{patentDetail.p_next_payment_time }}</span>
                                        <span v-else class="red">暂无信息</span>
                                    </el-form-item>
                                    <el-form-item label="联系人">
                                        <span v-if = patentDetail.p_contact_name>{{patentDetail.p_contact_name }}</span>
                                        <span v-else class="red">暂无信息</span>
                                    </el-form-item>
                                    <el-form-item label="联系电话">
                                        <span v-if = patentDetail.p_contact_phone>{{patentDetail.p_contact_phone }}</span>
                                        <span v-else class="red">暂无信息</span>
                                    </el-form-item>

                                    <el-form-item label="专利年费缴纳次数">
                                        <span v-if = patentDetail.p_pay_num>{{patentDetail.p_pay_num }}</span>
                                        <span v-else class="red">暂未缴纳</span>
                                    </el-form-item>
                                    <el-form-item >

                                    </el-form-item>

                                    <el-form-item label="摘要">
                                        <span v-if = patentDetail.p_abstract>{{patentDetail.p_abstract }}</span>
                                        <span v-else class="red">暂无信息</span>
                                    </el-form-item>

                                    <el-form-item label="主权利要求">
                                        <span v-if = patentDetail.p_main_claims>{{patentDetail.p_main_claims }}</span>
                                        <span v-else class="red">暂无信息</span>
                                    </el-form-item>
                                    <el-form-item label="非引证信息">
                                        <span v-if = patentDetail.p_non_patent_references>{{patentDetail.p_non_patent_references }}</span>
                                        <span v-else class="red">暂无信息</span>
                                    </el-form-item>
                                    <el-form-item label="引证信息">
                                        <span v-if = patentDetail.p_citation_patent_documents>{{patentDetail.p_citation_patent_documents }}</span>
                                        <span v-else class="red">暂无信息</span>
                                    </el-form-item>

                                </el-form>

                            </div>
                        </el-dialog>
                    </template>
                </el-table-column>
            </el-table>
            <div class="block" style=" background: #99CCCC">
                <el-pagination

                        @size-change="handleSizeChange"
                        @current-change="P_handleCurrentChange"
                        :current-page="pCurrentPage"
                        :page-sizes="[10]"
                        :pager-count="7"
                        :page-size="page_size"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="patentCount"

                >
                </el-pagination>
            </div>
        </div>
        <div class="case">
            <div class="header_pbox" style="height: 12%;width: 100%;">
                <div style="float: left ;width: 200px;;height: 30px;margin: 10px;color: #FFFFFF;font-family: 楷体;font-size: 24px  ">
                    案件
                </div>
            </div>
            <el-table
                    height="79%"
                    :data="cases"
                    style="width: 100% "
            >

                <el-table-column
                        prop="c_agency_name"
                        label="代理机构"
                        min-width="12%">
                </el-table-column>
                <el-table-column
                        prop="c_agency_fees"
                        label="代理费"
                        min-width="12%">
                </el-table-column>

                <el-table-column
                        prop="c_patent_name"
                        label="专利名称"
                        min-width="12%">
                </el-table-column>
                <el-table-column
                        prop="c_patent_number"
                        label="申请号"
                        min-width="14%">
                </el-table-column>
                <el-table-column
                        prop="c_type"
                        label="案件类型"
                        min-width="12%">
                </el-table-column>

                <el-table-column
                        prop="c_status"
                        label="案件状态"
                        min-width="12%">
                </el-table-column>
                <el-table-column
                        prop="c_create_time"
                        label="创建时间"
                        min-width="14%">
                </el-table-column>
                <el-table-column
                        label="操作"
                        min-width="15%">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="openModifyCase(scope.row.c_id)">修改</el-button>
                        <el-dialog
                                title="案件修改"
                                :visible.sync="updateCaseVisible"
                                width="500px"
                                center
                        >
                            <el-form :model="CaseForm" status-icon :rules="CaseRules" ref="CaseRuleForm"
                                     label-width="135px" style="width:350px">
                                <el-form-item label="物流编号" prop = "logisticsNumber">
                                    <el-input v-model="CaseForm.logisticsNumber" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="代理费用" prop = "agencyFees">
                                    <el-input v-model.number="CaseForm.agencyFees" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="案件类型" prop="type">
                                    <el-select v-model="CaseForm.type" placeholder="请选择案件类别">
                                        <el-option label="发明专利申请" value='1'></el-option>
                                        <el-option label="实用" value='2'></el-option>
                                        <el-option label="外观申请" value='3'></el-option>
                                    </el-select>
                                </el-form-item>

                            </el-form>
                            <span slot="footer" class="dialog-footer">
                         <el-button @click="updateCaseVisible = false">取 消</el-button>
                         <el-button type="primary" @click="UpdateCase('CaseRuleForm')">提交</el-button>
                         </span>
                        </el-dialog>

                        <el-button size="mini" style="background:#EEA282; color: white;margin-left :10px "
                                   @click="openCaseDetail(scope.row.c_id)">详情
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="block">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="C_handleCurrentChange"
                        :current-page="cCurrentPage"
                        :page-sizes="[10]"
                        :page-size="page_size"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="caseCount"
                >
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import { reqGetUserDetail,reqGetJobInfo ,
        reqGetUserCase,reqGetUserCaseDetail,
        reqGetUserPatent,reqGetUserPatentDetail,
        PutPatentModify,PutCaseModify,putUpdateJobInfo} from '../../api/UserDetail';
    import { reqGetCaseDetail } from '../../api/Case';
    import {validateNumber} from "../../utils/validate";

    export default {
        props:{
            id:{
                type:String,
                default:''
            }
        },
        data() {
            return {
                fit:'scale-down',
                idx :0,
                J_cancel:0,
                J_publish:0,
                msg:"",
                jobCount:0,
                patentCount:0,
                caseCount:0,
                cCurrentPage:1,
                pCurrentPage: 1,
                jCurrentPage:1,
                updateCaseVisible:false,
                c_detailCaseVisible: false,
                updatePatentVisible: false,
                detailPatentVisible: false,
                page_size: 10,
                updateArr:[],
                multipleSelection:[],
                userDetail: {},
                patents: [],
                cases: [],
                jobInfos: [],
                patentDetail: {},
                caseDetail: {},
                PatentForm: {
                    id: '',
                    name: '',
                    status: '',

                },
                PatentRules: {
                    name: [{ required: true, message: '请输入专利名称', trigger: 'blur' }],
                    status: [{ required: true, message: '请选择专利状态', trigger: 'blur' }],
                },
                CaseForm: {
                    'agencyFees': '',
                    'id': '',
                    'logisticsNumber': '',
                    'type': ''
                },
                CaseRules: {
                    agencyFees: [
                        { validator:validateNumber,trigger:blur }
                    ],
                    type: [{ required: true, message: '请选择案件类别', trigger: 'blur' }]
                },


            };
        },

        created() {
            this.getUserDetail();
            this.getjobInfo();
            this.getcase();
            this.getPatent();
        },

        watch: {
            //监听相同路由下参数变化的时候，从而实现异步刷新
            '$route'(to,from) {

                //重新获取数据
                this.getUserDetail();
                this.getjobInfo();
                this.getcase();
                this.getPatent();
                /** 初始化其他数据 */
            },
        },




        methods: {
            //获取用户详情
            async getUserDetail(id = this.id,type=1){
                try {
                    const res = await reqGetUserDetail(id,type);
                    this.userDetail= res.userDetail;
                    this.userDetail.u_create_time = this.dateString( this.userDetail.u_create_time )
                } catch (e) {

                }
            },

            //获取求职信息
            async getjobInfo(id = this.id,page = this.jCurrentPage){
                try {
                    const res = await reqGetJobInfo(id,page);
                    const jobInfos = res.jobInfos;
                    for(let i = 0;i<jobInfos.length;i++){
                        if(jobInfos[i].j_h_status ===1)
                            jobInfos[i].j_h_status = '进行中';
                        if(jobInfos[i].j_h_status ===2)
                            jobInfos[i].j_h_status = '已完成';
                        if(jobInfos[i].j_h_status ===3)
                            jobInfos[i].j_h_status = '已取消';
                        jobInfos[i].j_h_creat_time = this.dateString(  jobInfos[i].j_h_creat_time);
                    }
                    this.jobInfos = jobInfos;
                    this.jobCount = res.count;

                } catch (e) {

                }
            },
            //查看案件
            async getcase(id = this.id,page = this.cCurrentPage){
                try {
                    const res = await reqGetUserCase(id,page);
                    this.caseCount =res.count;
                    if(!res.cases){
                        this.cases  =[];
                        return
                    }

                    this.cases= res.cases;
                    for(let i = 0;i<this.cases.length;i++){
                        if( this.cases[i].c_type == 1)
                            this.cases[i].c_type = '发明专利申请';
                        if( this.cases[i].c_type == 2)
                            this.cases[i].c_type = '使用';
                        if( this.cases[i].c_type == 3)
                            this.cases[i].c_type = '外观申请';
                    }



                } catch (e) {

                }
            },
            //案件详情
            async getCaseDetail(id = this.id) {
                try {
                    const res = await reqGetUserCaseDetail(id);
                    if (!res.caseDetail) return;
                    const data = res.caseDetail;
                    this.times = data.times.map(item => ({
                        timestamp: this.dateString(item.c_t_time),
                        content: item.c_t_type,
                    }));
                    if(!data.c_type)
                    data.c_type = '';
                    else data.c_type = data.c_type.toString();
                    data.c_pay_time = this.dateString(data.c_pay_time);
                    data.c_agent_timing = this.dateString(data.c_agent_timing);
                    data.c_apply_fees_time = this.dateString(data.c_apply_fees_time);
                    data.c_create_time = this.dateString(data.c_create_time);
                    data.c_substantial_audit_fees_time = this.dateString((data.c_substantial_audit_fees_time));
                    this.caseDetail = data;

                } catch (e) {

                }
            },

            //查看专利
            async getPatent(id = this.id, page = this.pCurrentPage){
                try {
                    const res = await reqGetUserPatent(id,page);
                    const data = res.patents;
                    for(let i = 0;i<data.length;i++){
                        data[i].p_create_time = this.dateString(data[i].p_create_time );
                        if( data[i].p_status  === 1){
                            data[i].p_status = '不转让';
                        }
                        if( data[i].p_status  === 2){
                            data[i].p_status = '待转让';
                        }
                        if( data[i].p_status  === 3){
                            data[i].p_status = '转让中';
                        }
                        if( data[i].p_status  === 4){
                            data[i].p_status = '申请中';
                        }
                        if( data[i].p_status  === 5){
                            data[i].p_status = '已申请';
                        }
                        if(data[i].u_p_power === 0){
                            data[i].u_p_power = '专利权人'
                        }
                        else{
                            data[i].u_p_power = '第'+data[i].u_p_power+'发明人'
                        }
                    }
                    this.patents= data;
                    this.patentCount = res.count;
                } catch (e) {

                }
            },
            //专利详情
            async getPatentDetail(id){
                try {
                    const res = await reqGetUserPatentDetail(id);
                    const data  = res.patentDetail;
                    data.p_non_patent_references =  this.transfeCritation( data.p_non_patent_references);
                    data.p_citation_patent_documents = this.transfeCritation( data.p_citation_patent_documents);
                    data.p_application_date = this.dateString(  data.p_application_date);
                    data.p_authorization_time = this.dateString(  data.p_authorization_time);
                    data.p_create_time = this.dateString( data.p_create_time);
                    data.p_next_payment_time  = this.dateString(data.p_next_payment_time);
                    data.p_note_time = this.dateString(data.p_note_time );
                    data.p_public_time = this.dateString( data.p_public_time);
                    this.patentDetail = data;

                } catch (e) {
                }
            },

            transfeCritation(str ){
                if(!str){
                    return ''
                }
                let citationArr = [];
                citationArr = str.split(';');
                let citation = '';
                for(let i = 0;i<citationArr.length-1;i++){
                    citation +=  citationArr[i]+';|';
                }
                citation +=citationArr[citationArr.length-1];
                return citation
            },
            //修改专利
            async ModifyPatent( modifyForm) {
                try {
                    const res = await PutPatentModify(modifyForm);
                    if(res.msg == 'success'){
                        this.$message({
                            type:'success',
                            message:'操作成功'
                        });
                        this.updatePatentVisible= false;
                    }

                } catch (e) {

                }
            },
            //修改案件
            async ModifyCase( modifyForm) {
                try {
                    const res = await PutCaseModify(modifyForm);
                    if(res.msg === 'success'){
                        this.$message({
                        type:'success',
                        message:'操作成功'
                    });
                        this.updateCaseVisible = false;
                    }

                } catch (e) {

                }

            },
            //取消或发布求职信息
            async updateJobInfo(arr = this.updateArr,status){
                const res = await putUpdateJobInfo(arr,status);
                if(res.msg === 'success')
                    this.$message({
                        type:'success',
                        message:'操作成功'
                    });
                this.updateArr = [];
                this.multipleSelection = [];
            },
            //专利详情
            openPatentDetail(id){
                this.detailPatentVisible = true;
                this.getPatentDetail(id);

            },
            //案件详情
            openCaseDetail(id){
                this.$router.push({path:'/caseDetail/'+id+'/2'});
            },
            //打开案件修改页面
            openModifyCase(id){
                this.updateCaseVisible = true;
                this.getCaseDetail(id).then(()=>{
                    this.CaseForm.id = id;
                    this.CaseForm.agencyFees = this.caseDetail.c_agency_fees ;
                    this.CaseForm.logisticsNumber = this.caseDetail.c_logistics_number;
                    this.CaseForm.type= this.caseDetail.c_type.toString();

                })

            },
            //确定修改案件
            UpdateCase(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // this.CaseForm.type = parseInt(this.CaseForm.type);
                        // this.CaseForm.agencyFees = Number( this.CaseForm.agencyFees);
                        this.ModifyCase(this.CaseForm).then(()=>{
                            this.getcase();
                        });
                    } else {
                        return false;
                    }
                });

            },
            // //打开专利修改界面
            openModifyPatent(id){
                this.updatePatentVisible = true;
                this.getPatentDetail(id).then(()=>{
                    this.PatentForm.id = parseInt(id);
                    this.PatentForm.name = this.patentDetail.p_name ;
                    if(this.patentDetail.p_status=='不转让')
                        this.PatentForm.status = '1' ;
                    if(this.patentDetail.p_status=='待转让')
                        this.PatentForm.status = '2' ;
                    if(this.patentDetail.p_status=='转让中')
                        this.PatentForm.status = '3' ;
                    if(this.patentDetail.p_status=='申请中')
                        this.PatentForm.status = '4' ;
                    if(this.patentDetail.p_status=='已申请')
                        this.PatentForm.status = '5' ;
                })
            },
            //确定修改
            updatePatent(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                     //   this.PatentForm.status = parseInt(this.PatentForm.status);
                        this.ModifyPatent(this.PatentForm).then(()=>{
                            this.getPatent();
                        });
                    } else {
                        return false;
                    }
                });

            },
            //批量发布求职信息
            UpdateAll(){
                const length = this.multipleSelection.length;
                if(!length){
                    this.$message.error("请先选中用户")
                }
                else{
                    for (let i = 0; i < length; i++) {
                        this.updateArr.push(this.multipleSelection[i].j_h_id);
                    }
                    this.updateJobInfo(this.updateArr,1).then(()=>{
                        this.getjobInfo();
                    });

                }
            },
            //单行发布求职信息
            handleUpdate(index, row ){
                this.idx = index;
                this.updateArr.push(row.j_h_id);
                this.updateJobInfo(this.updateArr,1).then(()=>{
                    this.getjobInfo();
                });


            },
            //单行取消求职信息
            handleCancel(index, row ){

                this.idx = index;
                this.updateArr.push(row.j_h_id);
                this.updateJobInfo(this.updateArr,3).then(()=>{
                    this.getjobInfo();
                });

            },
            //批量取消求职信息
            CancelAll() {
                const length = this.multipleSelection.length;
                if(!length){
                    this.$message.error("请先选中用户")
                }
                else{
                    for (let i = 0; i < length; i++) {
                        this.updateArr.push(this.multipleSelection[i].j_h_id);
                    }
                    this.updateJobInfo(this.updateArr,3).then(()=>{
                        this.getjobinfo();
                    });

                }
            },

            checkSelectable(row){
                return row.j_h_status !=='已完成'
            },

            handleSelectionChange(val) {
                this.multipleSelection = val;
                if(this.multipleSelection[0]){
                    if(this.multipleSelection[0].j_h_status==='进行中'){
                        this.J_cancel = 1;
                        this.J_publish = 0;
                    }
                    if(this.multipleSelection[0].j_h_status==='已取消'){
                        this.J_cancel = 0;
                        this.J_publish = 1;
                    }
                }
                if(this.multipleSelection.length>1){
                    for(let i = 1;i<this.multipleSelection.length;i++){
                        if (this.multipleSelection[0].j_h_status && this.multipleSelection[i].j_h_status ) {
                            if (this.multipleSelection[0].j_h_status !== this.multipleSelection[i].j_h_status) {
                                this.$message.error("您只能选中相同类型的信息");
                                this.$refs.jobTable.toggleRowSelection(this.multipleSelection[i], false);
                                this.multipleSelection.splice(i, 1);
                                this.clearSelectedChannels(this.multipleSelection);
                            }
                        }
                    }

                }

            },
            //选中要取消的操作
            checkCancel(){
                if(this.jobInfos){
                    if(this.multipleSelection[0]){
                        if(this.multipleSelection[0].j_h_status ==='已取消'){
                            this.$message.error("您只能选中相同类型的信息");
                            return false
                        }
                    }
                    let rows  = [];
                    for(let i = 0;i<this.jobInfos.length;i++){
                        if(this.jobInfos[i].j_h_status === '进行中')
                            rows.push(this.jobInfos[i])
                    }
                    this.clearSelectedChannels(rows)
                }

            },
            //选中要发布的操作
            checkPublish(){
                if(this.jobInfos){
                    if(this.multipleSelection[0]){
                        if(this.multipleSelection[0].j_h_status ==='进行中'){
                            this.$message.error("您只能选中相同类型的信息");
                            return false
                        }
                    }
                    let rows  = [];
                    for(let i = 0;i<this.jobInfos.length;i++){
                        if(this.jobInfos[i].j_h_status === '已取消')
                            rows.push(this.jobInfos[i])
                    }
                    this.clearSelectedChannels(rows)
                }

            },
            //消除选中
            clearSelectedChannels(rows){
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.jobTable.toggleRowSelection(row, true);
                    });
                } else {
                    this.$refs.jobTable.clearSelection();
                }
            },

            handleSizeChange(val) {
                this.page_size = val;
            },
            J_handleCurrentChange(val) {
                this.jCurrentPage = val;
                this.getjobInfo( this.id,this.jCurrentPage);
            },
            P_handleCurrentChange(val) {
                this.PCurrentPage = val;
                this.getPatent( this.id,this.PCurrentPage);
            },
            C_handleCurrentChange(val) {
                this.cCurrentPage = val;
                this.getcase( this.id,this.cCurrentPage);
            },
        }

    };
</script>

<style scoped>
    .PersonDetail {
        width: 100%;
        height: 160%;

    }

    /deep/.header_pbox {
        background:#99CCCC;
    }


    /deep/.Info {
        width: 30%;
        height:482px;
        float: left;
        background: #99CCCC;
        border: 10px solid white;
        box-sizing:border-box;
        -moz-box-sizing:border-box; /* Firefox */
        -webkit-box-sizing:border-box; /* Safari */
        overflow: auto;

    }

    /deep/.job {
        width: 68%;
        height:482px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        float: right;
    }

    /deep/.Patent {
        width: 100%;
        height: 482px;
        margin-top: 2%;
        float: left;

    }

    /deep/.case {
        width: 100%;
        height: 482px;
        float: left;
        margin-top: 2%;
        background:#99CCCC;
    }

    /deep/.Info-table label {
        width: 90px;
        color: #99a9bf;
    }

   /deep/ .Info-table .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 100%;
        height: 53px;
    }

   /deep/ .job-table-expand {
        font-size: 0;
    }

   /deep/ .job-table-expand label {
        width: 110px;
        color: #99a9bf;
    }

   /deep/ .job-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }


   /deep/ .el-dialog {
       background-image: linear-gradient(to bottom right, #FFEFBA 0%, #FFFFFF 100%);
    }

    .el-table thead {
        font-weight: 500;
    }

   /deep/ .PersonDetail .block {
        background: #99a9bf;
    }
    /deep/ .el-dialog label {
        color:#82848a ;
    }

    /deep/.PersonDetail .el-form-item {
        color: #e4e4e4;
    }

    /deep/.PersonDetail .el-form-item span {
        color: white;

    }

    /deep/.patentDetail{
        width:100%;
        height: 420px;
    }
    /deep/.patentDetail .el-form{
        width: 90%;
        margin:auto;
        height: 420px;
     overflow: auto;
    }
    /deep/.patentDetail .el-form-item{
        width:47%;

    }
    /deep/.red{
        color: #dd6161!important;
    }

    /deep/.el-table__header-wrapper  .el-checkbox{
        display:none
    }
    /deep/.block{
        text-align: center;
        background: #99CCCC;
    }



</style>