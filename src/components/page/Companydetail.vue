<template>

    <div class = "Companydetail">
        <div class="top">
        <el-row :gutter="20">
            <el-col :span = "7"><el-card class = "Info" shadow="hover" :body-style="{padding: '0px'}" >
                <el-form style="margin: 30px;color:white" >
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
                    <el-form-item label="是否同意协议：">
                        <span v-if = userDetail.u_is_agreed >{{ userDetail.u_is_agreed }}</span>
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
                    <el-form-item label="营业执照：">
                        <el-avatar shape="square" :size="100" :src="userDetail.e_business_license"></el-avatar>
                    </el-form-item>
                    <el-form-item label="公司名称：">
                        <span v-if = userDetail.e_company_name  >{{ userDetail.e_company_name }}</span>
                        <span v-else class="red">暂无信息</span>
                    </el-form-item>
                    <el-form-item label="法人：">
                        <span v-if = userDetail.e_legal_person  >{{ userDetail.e_legal_person }}</span>
                        <span v-else class="red">暂无信息</span>
                    </el-form-item>
                    <el-form-item label="企业地区（市、区）：">
                        <span v-if = userDetail.e_region_city  >{{ userDetail.e_region_city }}</span>
                        <span v-else class="red">暂无信息</span>
                    </el-form-item>
                    <el-form-item label="企业地区（省）：">
                        <span v-if = userDetail.e_region_province  >{{ userDetail.e_region_province }}</span>
                        <span v-else class="red">暂无信息</span>
                    </el-form-item>

                    <el-form-item label="企业详细地址：">
                        <span v-if = userDetail.e_address  >{{ userDetail.e_address }}</span>
                        <span v-else class="red">暂无信息</span>
                    </el-form-item>
                    <el-form-item label="统一社会信用代码：">
                        <span v-if = userDetail.e_unified_social_credit_code  >{{ userDetail.e_unified_social_credit_code }}</span>
                        <span v-else class="red">暂无信息</span>
                    </el-form-item>
                    <el-form-item label="企业专业邻域：">
                        <span v-if = userDetail.e_neighbourhood  >{{ userDetail.e_neighbourhood }}</span>
                        <span v-else class="red">暂无信息</span>
                    </el-form-item>

                </el-form>
            </el-card> </el-col>
            <el-col :span = "17">  <el-card class="recruit" shadow="hover"  :body-style="{padding: '0px'}">
                    <div class = "header_box" style="height: 60px;width: 100%;background: #99CCCC;" >
                        <div style="float: left ;width: 100px;;height: 30px;padding: 10px;color:white;font-family: 楷体;font-size: 24px ">企业招聘</div>
                        <el-button  type = 'text' @click="checkPublish()" style="margin-top: 10px;color:#FFFFFF">选中可发布消息</el-button>
                        <el-button  type = 'text' @click="checkCancel()" style=" color: #FFFFFF">选中可取消消息</el-button>
                        <el-button type = 'text' @click="clearSelectedChannels()" style=" color: #FFFFFF">取消选中</el-button>
                        <el-popconfirm
                                @onConfirm="CancelAll()"
                                title="要取消所有选中的内容吗？"
                        >
                            <el-button type="danger" slot="reference" v-show = "C_cancel" style=";float: right; margin-right: 10px;margin-top: 10px" >批量取消</el-button>
                        </el-popconfirm>


                        <el-popconfirm
                                @onConfirm="UpdateAll()"
                                title="要发布所有选中的内容吗？"
                        >
                            <el-button type="success"  v-show = "C_publish"  slot="reference"  style="float: right;margin-right: 10px;margin-top: 10px">批量发布 </el-button>
                        </el-popconfirm>

                    </div>
                <div class="tablebox">
                    <el-table
                            ref = "recruitTable"
                            :data="Recruit"
                            width="100%"
                            height = "100%"
                            @selection-change="handleSelectionChange"
                  >
                        <el-table-column
                                :selectable="checkSelectable"
                                type="selection"
                                width="50px">
                        </el-table-column>
                        <el-table-column type="expand" label="详情" width="50px">
                            <template slot-scope="props" >
                                <el-form label-position="left" inline class="recruit-table-expand">
                                    <el-form-item label="招聘职位:">
                                        <span v-if = props.row.r_position >{{ props.row.r_position }}</span>
                                        <span v-else class="red">暂无信息</span>
                                    </el-form-item>
                                    <el-form-item label="薪资待遇:">
                                        <span v-if = props.row.r_salary >{{ props.row.r_salary }}</span>
                                        <span v-else class="red">暂无信息</span>
                                    </el-form-item>
                                    <el-form-item label="福利待遇:">
                                        <span v-if = props.row.r_welfare>{{ props.row.r_welfare }}</span>
                                        <span v-else class="red">暂无信息</span>
                                    </el-form-item>
                                    <el-form-item label="职位描述:">
                                        <span v-if = props.row.r_description  >{{ props.row.r_description }}</span>
                                        <span v-else class="red">暂无信息</span>
                                    </el-form-item>
                                    <el-form-item label="岗位职责:">
                                        <span v-if = props.row.r_duty>{{ props.row.r_duty }}</span>
                                        <span v-else class="red">暂无信息</span>
                                    </el-form-item>
                                    <el-form-item label="职位要求:">
                                        <span v-if = props.row.r_requirements >{{ props.row.r_requirements }}</span>
                                        <span v-else class="red">暂无信息</span>
                                    </el-form-item>
                                    <el-form-item label="必备技能:">
                                        <span v-if = props.row.r_skill>{{ props.row.r_skill }}</span>
                                        <span v-else class="red">暂无信息</span>
                                    </el-form-item>
                                    <el-form-item label="学历要求:">
                                        <span v-if = props.row.r_education  >{{ props.row.r_education }}</span>
                                        <span v-else class="red">暂无信息</span>
                                    </el-form-item>

                                    <el-form-item label="招聘人数:">
                                        <span v-if = props.row.r_number>{{ props.row.r_number}}</span>
                                        <span v-else class="red">暂无信息</span>
                                    </el-form-item>
                                    <el-form-item label="工作经验:">
                                        <span v-if = props.row.r_work_experience>{{ props.row.r_work_experience }}</span>
                                        <span v-else class="red">暂无信息</span>
                                    </el-form-item>
                                    <el-form-item label="公司名称:">
                                        <span v-if = props.row.r_company >{{ props.row.r_company }}</span>
                                        <span v-else class="red">暂无信息</span>
                                    </el-form-item>
                                    <el-form-item label="联系人姓名:">
                                        <span v-if = props.row.r_name >{{ props.row.r_name }}</span>
                                        <span v-else class="red">暂无信息</span>
                                    </el-form-item>
                                    <el-form-item label="工作地点:">
                                        <span v-if = props.row.r_location >{{ props.row.r_location }}</span>
                                        <span v-else class="red">暂无信息</span>
                                    </el-form-item>

                                    <el-form-item label="联系电话:">
                                        <span v-if = props.row.r_phone >{{ props.row.r_phone }}</span>
                                        <span v-else class="red">暂无信息</span>
                                    </el-form-item>

                                    <el-form-item label="联系地址:">
                                        <span v-if = props.row.r_address>{{ props.row.r_address }}</span>
                                        <span v-else class="red">暂无信息</span>
                                    </el-form-item>

                                    <el-form-item label="招聘开始时间:">
                                        <span v-if = props.row.r_create_time >{{ props.row.r_create_time }}</span>
                                        <span v-else class="red">暂无信息</span>
                                    </el-form-item>

                                    <el-form-item label="招聘结束时间:">
                                        <span v-if = props.row.r_finish_time >{{ props.row.r_finish_time }}</span>
                                        <span v-else class="red">暂无信息</span>
                                    </el-form-item>

                                    <el-form-item label="招聘状态:">
                                        <span v-if = props.row.r_status >{{ props.row.r_status }}</span>
                                        <span v-else class="red">暂无信息</span>
                                    </el-form-item>
                                </el-form>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="招聘职位"
                                prop="r_position">
                        </el-table-column>
                        <el-table-column
                                label="薪资待遇"
                                prop="r_salary">
                        </el-table-column>
                        <el-table-column
                                label="公司名称"
                                prop="r_company">
                        </el-table-column>
                        <el-table-column
                                label="地址"
                                prop="r_location">
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-popconfirm
                                        @onConfirm="handleUpdate(scope.$index, scope.row)"
                                        title="要发布该内容吗？"
                                >
                                    <el-button
                                            v-show="scope.row. r_status === '已取消'"
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
                                            v-show="scope.row. r_status === '进行中'"
                                            size="mini"
                                            slot="reference"
                                            type="danger"
                                    >取消</el-button>
                                </el-popconfirm>


                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="block">
                    <el-pagination
                            @current-change="R_handleCurrentChange"
                            :current-page="RCurrentPage"
                            :page-sizes="[10]"
                            :page-size="page_size"
                            :pager-count="7"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="RCount"
                    >
                    </el-pagination>
                </div>
            </el-card></el-col>
        </el-row>
        </div>

        <el-card class="Patent" shadow="hover" :body-style="{padding: '0px'}" >
                <div class = "header_box" style="height: 60px;width: 100%; background: #99CCCC; " >
                    <div style="float: left ;width: 200px;;height: 30px;margin: 10px;color:white;font-family: 楷体;font-size: 24px ">企业专利</div>
                </div>
            <div class="tablebox">
                <el-table
                        height="100%"
                        :data="patents"
                        style="width: 100% "
                >
                    <el-table-column
                            prop="u_p_power"
                            label="身份"
                           >
                    </el-table-column>

                    <el-table-column
                            prop="p_patent_number"
                            label="申请号"
                           >
                    </el-table-column>
                    <el-table-column
                            prop="p_name"
                            label="专利名称"
                           >
                    </el-table-column>

                    <el-table-column
                            prop="p_create_time"
                            label="发明时间"
                            >
                    </el-table-column>

                    <el-table-column
                            prop="p_type"
                            label="类别"
                           >
                    </el-table-column>
                    <el-table-column
                            prop="p_status"
                            label="状态"
                            >
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            >
                        <template slot-scope="scope">
                        <el-button size="mini" @click="openModifyPatent(scope.row.p_id)" type="primary">修改</el-button>
                            <el-dialog
                                    title="专利修改"
                                    :visible.sync="updatePatentVisible"
                                    width="500px"
                                    center
                            >
                                <el-form :model="PatentForm" status-icon :rules="PatentRules" ref="patentRuleForm" label-width="135px" style="width:350px">

                                    <el-form-item label="专利名称" prop ="name" >
                                        <el-input   v-model="PatentForm.name" autocomplete="off" ></el-input>
                                    </el-form-item>
                                    <el-form-item label="专利状态"  prop = "status">
                                            <el-select v-model="PatentForm.status" placeholder="请选择专利状态" value="PatentForm.status" >
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
                         <el-button type="primary" @click="updatePatent('patentRuleForm')">确 定</el-button>
                         </span>
                            </el-dialog>
                        <el-button  size = "mini"   style="background:#EEA282; color: white ;margin-left:10px" @click=" openPatentDetail(scope.row.p_id)">详情</el-button>
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
                                            <span v-else class="red">暂无信息</span>
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
            </div>
            <div class="block">
                <el-pagination
                        @current-change="P_handleCurrentChange"
                        :current-page="PCurrentPage"
                        :page-sizes="[10]"
                        :page-size="page_size"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="Pcount"
                >
                </el-pagination>
            </div>
        </el-card>
        <el-card class = "case" shadow="hover" :body-style="{padding: '0px'}">
            <div class = "header_box"  style="height: 60px;width: 100%; background: #99CCCC; " >
                <div style="float: left ;width: 200px;;height: 30px;margin: 10px;color: white;font-family: 楷体;font-size: 24px ">企业案件</div>
            </div>
            <div class="tablebox">
            <el-table
                    height="100%"
                    :data="cases"
                   width="100%"
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
                        label="专利名"
                        min-width="14%">

                </el-table-column>
                <el-table-column
                        prop="c_patent_number"
                        label="申请号"
                        min-width="12%">
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
                        <el-form :model="CaseForm" status-icon   label-width="135px" style="width: 350px;" :rules="CaseRules" ref="CaseRuleForm">
                            <el-form-item label="物流编号" prop = "logisticsNumber" >
                                <el-input   v-model="CaseForm.logisticsNumber" autocomplete="off" ></el-input>
                            </el-form-item>
                            <el-form-item label="代理费用" prop = "agencyFees" >
                                <el-input   v-model.number="CaseForm.agencyFees" autocomplete="off" ></el-input>
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

                    <el-button  @click=" openCaseDetail(scope.row.c_id)" size = "mini" style="background:#EEA282; margin-left:10px;color: white">详情</el-button>

                    </template>
                </el-table-column>
            </el-table>
            </div>
            <div class="block">
                <el-pagination
                        @current-change="C_handleCurrentChange"
                        :current-page="CCurrentPage"
                        :page-sizes="[10]"
                        :page-size="page_size"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="casesCount"
                >
                </el-pagination>
            </div>
        </el-card>
        <el-card class="Staff" shadow="hover" :body-style="{padding: '0px'}" >
            <div class = "header_box" style="height: 60px;width: 100%; background: #99CCCC; margin-top: 20px" >
                <div style="float: left ;width: 200px;;height: 30px;margin: 10px;color:white;font-family: 楷体;font-size: 24px ">员工信息</div>
            </div>
            <el-table
                    height="390px"
                    :data="staffs"
                    style="width: 100% "
            >
                <el-table-column
                        prop="p_create_time"
                        label="头像"
                        >
                    <template slot-scope="scope">
                    <el-avatar :size="50" :src="scope.row.u_profile"></el-avatar>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="u_name"
                        label="员工姓名"
                       >
                </el-table-column>

                <el-table-column
                        prop="u_account"
                        label="员工账号"
                        width="">
                </el-table-column>
                <el-table-column
                        prop="u_phone"
                        label="联系电话"
                >
                </el-table-column>
                <el-table-column
                        prop="u_sex"
                        label="性别"
                >
                </el-table-column>
                <el-table-column
                        prop="u_e_department"
                        label="部门"
                >
                </el-table-column>


                <el-table-column
                    prop="u_phone"
                    label="联系电话"
                       >
                </el-table-column>
            </el-table>
            <div class="block">
                <el-pagination
                        @current-change="S_handleCurrentChange"
                        :current-page="SCurrentPage"
                        :page-sizes="[10]"
                        :page-size="page_size"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="Scount"

                >
                </el-pagination>
            </div>
        </el-card>
    </div>
</template>


<script>
    import {
        reqGetUserDetail, reqGetRecruitInfo,
        reqGetUserCase,
        reqGetUserPatent, reqGetUserPatentDetail,
        PutPatentModify, PutCaseModify,
        putUpdateReInfo, reqgetEnterprisePerson, reqGetUserCaseDetail
    } from '../../api/UserDetail';
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
                C_cancel:1,
                C_publish: 0,
                fit:'scale-down',
                idx :0,
                msg:"",
                page_size: 10,
                casesCount: 0,
                Pcount: 0,
                RCount: 0,
                Scount:0,
                RCurrentPage: 1,
                CCurrentPage: 1,
                PCurrentPage: 1,
                SCurrentPage:1,
                updateCaseVisible: false,
                c_detailCaseVisible: false,
                updatePatentVisible: false,
                detailPatentVisible: false,
                staffs:[],//加入企业的员工
                updateArr:[],
                multipleSelection:[],
                Recruit: [],
                userDetail: {},
                patents: [],
                patentDetail: {},
                caseDetail: {},
                cases: [],
                PatentForm: {
                    id: '',
                    name:'',
                    status: '',
                },
                PatentRules: {
                    name: [{ required: true, message: '请输入专利名称', trigger: 'blur' }],
                    status: [{ required: true, message: '请选择专利状态', trigger: 'blur' }],
                },
                CaseForm: {
                    agencyFees: '',
                    id: '',
                    logisticsNumber: '',
                    type: ''
                },
                CaseRules: {
                    agencyFees: [
                        { validator:validateNumber,trigger:blur }
                    ],

                    type: [{ required: true, message: '请选择案件类别', trigger: 'blur' }],
                }

            }
        },


        created() {
            this.getRecruit();
            this.getUserDetail();
            this.getcase();
            this.getPatent();
            this.getStaffList();
        },
        watch: {
            //监听相同路由下参数变化的时候，从而实现异步刷新
            '$route'(to,from) {
                //重新获取数据
                this.getRecruit();
                this.getUserDetail();
                this.getcase();
                this.getPatent();
                this.getStaffList();

            },
        },

            methods: {
                //用户信息
                async getUserDetail(id = this.id,type=2){
                    try {
                        const res = await reqGetUserDetail(id,type);
                        if(!res.userDetail){
                            this.userDetail= [];
                            return
                        }
                        this.userDetail= res.userDetail;
                        if( this.userDetail.u_is_agreed == 1)
                            this.userDetail.u_is_agreed = '是';
                        if(this.userDetail.u_is_agreed == 0)
                            this.userDetail.u_is_agreed = '否'

                    } catch (e) {

                    }
                },
                //获取员工信息
                async getStaffList(id = this.id,page = 1){
                    try {
                        const res = await reqgetEnterprisePerson(id,page);
                        this.Scount = res.count;
                        if(!res.staffs) {
                            this.staffs = [];
                            return
                        }
                        this.staffs= res.staffs;
                        for(let i = 0;i<this.staffs.length;i++){
                            if(this.staffs[i].u_sex == 1)
                                this.staffs[i].u_sex = '男';
                            if(this.staffs[i].u_sex == 2)
                                this.staffs[i].u_sex = '女';
                        }


                    } catch (e) {

                    }
                },

                //获取招聘信息
                async getRecruit(id = this.id,page = this.RCurrentPage){
                    try {
                        const res = await reqGetRecruitInfo(id,page);
                        if(!res.recruitment)
                            this.Recruit = [];

                        const recruitment = res.recruitment;
                        for(let i = 0;i<recruitment.length;i++){

                            if(recruitment[i].r_status === 1)
                                recruitment[i].r_status = '进行中';
                            if(recruitment[i].r_status === 2)
                                recruitment[i].r_status = '已完成';
                            if(recruitment[i].r_status === 3)
                                recruitment[i].r_status = '已取消';
                            recruitment[i].r_create_time = this.dateString( recruitment[i].r_create_time);
                            recruitment[i].r_finish_time = this.dateString( recruitment[i].r_finish_time);
                        }
                        this.Recruit= recruitment;
                        this.RCount =res.count;
                    } catch (e) {

                    }
                },

                //查看案件
                async getcase(id = this.id,page = this.CCurrentPage){
                    try {
                        const res = await reqGetUserCase(id,page);
                        this.casesCount =res.count;
                        if(!res.cases) {
                            this.cases = [];
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
                            data.c_type ='';
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
                async getPatent(id = this.id,page = this.PCurrentPage){
                    try {
                        const res = await reqGetUserPatent(id,page);
                        if(!res.patents){
                            this.patents = [];
                            return
                        }
                        const data = res.patents;
                        for(let i = 0;i<data.length;i++){
                           data[i].p_create_time = this.dateString(data[i].p_create_time );
                            if( data[i].p_status  == 1){
                                data[i].p_status = '不转让';
                            }
                            if( data[i].p_status  == 2){
                                data[i].p_status = '待转让';
                            }
                            if( data[i].p_status  == 3){
                                data[i].p_status = '转让中';
                            }
                            if( data[i].p_status  == 4){
                                data[i].p_status = '申请中';
                            }
                            if( data[i].p_status  == 5){
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
                        this.Pcount = res.count;
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
                //将引证内容转化为！隔开
                transfeCritation(str ){
                    let citationArr = [];
                    citationArr = str.split(';');
                    let citation = '';
                    for(let i = 0;i<citationArr.length-1;i++){
                        citation +=  citationArr[i]+';|';
                    }
                    citation +=citationArr[citationArr.length-1];
                    return citation
                },

                //修改案件
                async ModifyCase( modifyForm) {
                    try {
                        const res = await PutCaseModify(modifyForm);
                        if(res.msg == 'success'){
                            this.$message({
                                type:'success',
                                message:'操作成功'
                            });
                            this.updateCaseVisible = false;
                        }

                    } catch (e) {

                    }

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

                //取消或发布招聘信息
                async updateRecruit(arr,status){
                   const res = await putUpdateReInfo(arr,status);
                    if(res.msg == 'success')
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
                //打开专利修改界面
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
                          //  this.PatentForm.status = parseInt(this.PatentForm.status);
                            this.ModifyPatent(this.PatentForm).then(()=>{
                                this.getPatent();
                            });
                        } else {
                            return false;
                        }
                    });


                },
                //打开修改案件界面
                openModifyCase(id){
                    this.updateCaseVisible = true;
                    this.getCaseDetail(id).then(()=>{
                        this.CaseForm.id = id;
                        this.CaseForm.agencyFees = this.caseDetail.c_agency_fees ;
                        this.CaseForm.logisticsNumber = this.caseDetail.c_logistics_number;
                        this.CaseForm.type = this.caseDetail.c_type.toString();
                    })
                },
                //确定修改案件
                UpdateCase(formName){
                    this.$refs[formName].validate((valid) => {
                        if (valid) {
                         //   this.CaseForm.type = parseInt(this.CaseForm.type);
                            this.ModifyCase(this.CaseForm);
                            this.getcase();

                        } else {
                            return false;
                        }
                    });

                },

                //批量发布招聘信息
                UpdateAll(){
                    const length = this.multipleSelection.length;
                    if(!length){
                        this.$message.error("请先选中消息")
                    }
                    else{
                        for (let i = 0; i < length; i++) {
                            this.updateArr.push(this.multipleSelection[i].r_id);
                        }
                        this.updateRecruit(this.updateArr,1).then(()=>{
                            this.getRecruit();
                        });
                    }
                },

                //单行发布招聘信息
                handleUpdate(index, row ){
                    this.idx = index;
                    this.updateArr.push(row.r_id);
                    this.updateRecruit(this.updateArr,1).then(()=>{
                        this.getRecruit();
                    });
                },
                //单行取消招聘信息
                handleCancel(index, row ){
                    this.idx = index;
                    this.updateArr.push(row.r_id);
                    this.updateRecruit(this.updateArr,3).then(()=>{
                        this.getRecruit();
                    })
                },

                //批量取消招聘信息
                CancelAll() {
                    const length = this.multipleSelection.length;
                    if(!length){
                        this.$message.error("请先选中消息")
                    }else{
                        for (let i = 0; i < length; i++) {
                            this.updateArr.push(this.multipleSelection[i].r_id);
                        }
                        this.updateRecruit(this.updateArr,3).then(()=>{
                            this.getRecruit();
                        });
                    }
                },


                handleSelectionChange(val) {
                    this.multipleSelection = val;
                    if(this.multipleSelection[0]){
                        if(this.multipleSelection[0].r_status==='进行中'){
                            this.C_cancel = 1;
                            this.C_publish = 0;
                        }
                        if(this.multipleSelection[0].r_status==='已取消'){
                            this.C_cancel = 0;
                            this.C_publish = 1;
                        }
                    }

                    if(this.multipleSelection.length>1) {
                        for (let i = 1; i < this.multipleSelection.length; i++) {
                            if (this.multipleSelection[0].r_status && this.multipleSelection[i].r_status) {
                                if (this.multipleSelection[0].r_status !== this.multipleSelection[i].r_status) {
                                    this.$message.error("您只能选中相同类型的信息");
                                    this.$refs.recruitTable.toggleRowSelection(this.multipleSelection[i], false);
                                    this.multipleSelection.splice(1, 1);
                                    this.clearSelectedChannels(this.multipleSelection);
                                }
                            }
                        }
                    }
                },

                //选中要取消的操作
                checkCancel(){
                    if(this.Recruit){
                        if(this.multipleSelection[0]){
                            if(this.multipleSelection[0].r_status ==='已取消'){
                                this.$message.error("您只能选中相同类型的信息");
                                return false
                            }
                        }
                        let rows  = [];
                        for(let i = 0;i<this.Recruit.length;i++){
                            if(this.Recruit[i].r_status === '进行中')
                                rows.push(this.Recruit[i])
                        }
                        this.clearSelectedChannels(rows)
                    }

                },
                //选中要发布的操作
                checkPublish(){
                    if(this.Recruit){
                        if(this.multipleSelection[0]){
                            if(this.multipleSelection[0].r_status ==='进行中'){
                                this.$message.error("您只能选中相同类型的信息");
                                return false
                            }
                        }
                        let rows  = [];
                        for(let i = 0;i<this.Recruit.length;i++){
                            if(this.Recruit[i].r_status === '已取消')
                                rows.push(this.Recruit[i])
                        }
                        this.clearSelectedChannels(rows)
                    }
                },
                //消除选中
                clearSelectedChannels(rows){
                    if (rows) {
                        rows.forEach(row => {
                            this.$refs.recruitTable.toggleRowSelection(row, true);
                        });
                    } else {
                        this.$refs.recruitTable.clearSelection();
                    }
                },
                checkSelectable(row){
                  return row.r_status !=='已完成'
                },

                R_handleCurrentChange(val) {
                    this.RCurrentPage = val;
                    this.getRecruit(this.jCurrentPage);
                },

                P_handleCurrentChange(val) {
                    this.PCurrentPage = val;
                    this.getPatent(this.id,this.PCurrentPage);
                },
                C_handleCurrentChange(val) {
                    this.CCurrentPage = val;
                    this.getcase(this.id,this.CCurrentPage);
                },
                S_handleCurrentChange(val) {
                    this.SCurrentPage = val;
                    this.getStaffList(this.SCurrentPage);
                },

            }

    }

</script>
<style scoped >
    el-row {
        margin-bottom: 20px;
    }
    .Companydetail{
        width: 100%;
        height: 160%;
    }
    /deep/.Companydetail .header_box{
        background: #99CCCC;
    }
   /deep/.Companydetail .block{
        background:#99CCCC;
    }
   .Info{
        width: 100%;
        height: 482px;
        background:#99CCCC;
        border: 10px solid white;
        box-sizing:border-box;
        -moz-box-sizing:border-box; /* Firefox */
        -webkit-box-sizing:border-box; /* Safari */
        overflow: auto;
    }
    .recruit{
        width: 100%;
        height: 482px;
        background: #FFFFFF;
    }
   /deep/ .tablebox{
       width: 100%;
       height: 392px;
       background: #E86850;
   }
   .Patent{
        width: 100%;
        height: 482px;

        margin-top: 2%;

    }
   .case{
        width: 100%;
        height: 482px;

        margin-top: 2%;


    }

    /deep/.Info-table label {
        width: 90px;
        color: #99a9bf;
    }

   /deep/ .recruit-table-expand {
        font-size: 0;
    }
   /deep/ .recruit-table-expand label {
        width: 110px;
        color: #99a9bf;
    }
    /deep/.recruit-table-expand .el-form-item  {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
   /deep/ .el-dialog {
       background-image: linear-gradient(to bottom right, #FFEFBA 0%, #FFFFFF 100%);
    }

   /deep/.el-dialog .el-form-item__label{
       color:#82848a ;
    }
    /deep/.el-table th, .el-table tr, .el-table td {
        background-color: transparent;
    }
    /deep/.el-table thead {
        font-weight: 500;
    }

    /deep/.case. .el-form-item{
        color: #e4e4e4;
    }

    /deep/.el-row{
        width: 100%;
        height: 100%;
    }

    /deep/.c_detail ul>li{
        width: 250px;
        height: 40px;
    }
    /deep/.c_detail ul>li span {
        color: #f0f2f5;
    }
    /deep/.patentDetail{
        width: 100%;
        height: 420px;
    }
    /deep/.patentDetail .el-form .el-form-item{
        width: 47%;
    }
    /deep/.patentDetail .el-form{
        width: 90%;
        height: 420px;
        overflow: auto;
    }
    /deep/.red{
        color: #dd6161 !important;
    }

    /deep/.el-table__header-wrapper  .el-checkbox{
        display:none
    }
    /deep/.block{
        text-align: center;
        background: #99CCCC;
    }
</style>