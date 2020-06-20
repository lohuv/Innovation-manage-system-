//账号校验
export const validateCode = (rule, value, callback) => {
    if (!value) {
        return callback(new Error('请输入账号'))
    }
    if (!/^[a-zA-Z0-9]{6,11}$/.test(value)) {
        callback(new Error('账号必须为6-11位，包含数字或字母'))
    } else {
        callback()
    }
};
//密码校验
export const validatePsdReg = (rule, value, callback) => {
    if (!value) {
        return callback(new Error('请输入密码'))
    }
    if (!/^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$)([^\u4e00-\u9fa5\s]){6,16}$/.test(value)) {
        callback(new Error('请输入6-16位英文字母、数字或者符号（除空格），且字母、数字和标点符号至少包含两种'))
    } else {
        callback()
    }
};
//手机号效验
export const validPhone = (rule,value , callback)=> {
    if (/^1[34578]\d{9}$/.test(value) == false) {
        if(value)
        callback(new Error("请输入正确的手机号"));
        else{
            callback();
        }
    } else {
        callback();
    }
};
//邮箱效验
export  const vaildEmail = (rule,value,callback) =>{
    if(!/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(value)){
        callback(new Error("请输入正确的邮箱"));
    }
    else{
        callback();
    }
};
//身份证效验
export const validIDcode = (rule, value, callback) => {
    if (!value) {
        return callback(new Error('请输入身份证号码'))
    }
    if (!/^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$)([^\u4e00-\u9fa5\s]){6,16}$/.test(value)) {
        callback(new Error('身份证号码格式错误'))
    } else {
        callback()
    }
};
//统一社会信用代码验证
export const validateSocialCode = (rule, value, callback) => {

    if (!/^[a-zA-Z0-9]{18}$/.test(value)) {
        callback(new Error('字母或数字组成，位数为18位'))
    } else {
        callback()
    }
};
//代理机构首字母验证
export const validateInitials = (rule, value, callback) => {

    if (!/^[A-Za-z]+$/.test(value)) {
        callback(new Error('请输入字母'))
    } else {
        callback()
    }
};

//代理机构编码验证
export const validateAgencyNum = (rule, value, callback) => {

    if (!/^[0-9]{5}$/.test(value)) {
        callback(new Error('代理机构编码由5位数字组成'))
    } else {
        callback()
    }
};
//验证码效验
export const validatePhoneCode = (rule, value, callback) => {
    if (!value) {
        return callback(new Error('请输入验证码'))
    }
    if (!/^[0-9]{6}$/.test(value)) {
        callback(new Error('验证码由6位数字组成'))
    } else {
        callback()
    }
};
//数字验证 可不填
export const validateNumber = (rule, value, callback) => {
    if (!value) {
        callback()
    }
    if (!/^[0-9]$/.test(value)) {
        callback(new Error('必须为数字'))
    } else {
        callback()
    }
};
//代理机构管理员账号验证
export const validateAgencyAdmin = (rule, value, callback) => {
    if (!value) {
        return callback(new Error('请输入账号编号'))
    }
    if (!/^[a-zA-Z0-9]{1,16}$/.test(value)) {
        callback(new Error('账号编号由1-16位数字或字母组成'))
    } else {
        callback()
    }
};




