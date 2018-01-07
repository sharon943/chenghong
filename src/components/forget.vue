<template>
  <div class="head">
    <section class="header">
      <h1>忘记密码</h1>
    </section>
    <section class="middle">

      <div class="sec">
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" class="demo-ruleForm">
          <span>手机号</span>
          <el-form-item prop="phone">
            <el-input type="tel" name="mobile" id="mobile" v-model="ruleForm2.phone" auto-complete="off"></el-input>
          </el-form-item>
          <button type="button" @click="sendcode" style="position:absolute;top:91px;right:45px;height:40px;width:40%;">获取验证码</button>
          <span>验证码</span>
          <el-form-item prop="bir">
            <el-input type="number" v-model="ruleForm2.code" auto-complete="off"></el-input>
          </el-form-item>
          <span>新密码</span>
          <el-form-item prop="newpass">
            <el-input type="password" v-model="ruleForm2.newpass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="makesure" id="sure">确认</el-button>
          </el-form-item>
        </el-form>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'index',
    data () {
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('年龄不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value < 18) {
              callback(new Error('必须年满18岁'));
            } else {
              callback();
            }
          }
        }, 1000);
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };

      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        cardid:'',
        code:'',
        radio: '1',
        phone:'',
        activeindex:0,
        activeI:[{id:1},{id:2},{id:3}],
        I:0,
        status:[{id:1,name:'登录'},{id:2,name:'注册'}],
        mess:'',
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },
        ruleForm2: {
          name:'',
          pass: '',
          checkPass: '',
          age: ''
        },
        rules2: {
          name:[
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
          ],
          phone:[
            { required: true, message: '请输入手机号码', trigger: 'blur' },
            { min: 11, max: 11, message: '长度在为11个字符', trigger: 'blur' }
          ],
          idname:[
            { required: true, message: '请输入身份证号码', trigger: 'blur' },
            { min: 18, max: 18, message: '请输入正确的身份证号码', trigger: 'blur' }
          ],
          bir:[
            { required: false}
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' },
            { min: 6, max: 6, message: '请输入6位数字', trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          age: [
            { validator: checkAge, trigger: 'blur' }
          ]
        }
      }
    },
    methods:{
      sendcode(){
        var storeId = 376;
        var mobile=this.ruleForm2.phone;
        if(/^1[34578]\d{9}$/.test(this.ruleForm2.phone)){
          var headers={"storeId":storeId};
          fetch('https://api.vi-ni.com/app/v1/sms_pasword/by/'+ mobile, {
            method: 'GET',
            mode: 'cors',
            headers:headers,
          }).then(res => res.json()).then((d => {
              console.log(d)
              if(d.code=='1031'){
                this.$message({
                  message: '该手机号码未被注册',
                  type: 'warning'
                });
              }
              }
          ))
        }else if(this.ruleForm2.phone==undefined){
          this.$message({
            message: '请输入手机号码',
            type: 'warning'
          });
        };



      },
      makesure(){
        var storeId='376';
        var mobile=this.ruleForm2.phone;
        var headers={"storeId":storeId};
        fetch('https://api.vi-ni.com/app/v1/vip/by/mobile/storeId/'+mobile+'/'+storeId, {
          method: 'GET',
          mode: 'cors',
          headers:headers,
        }).then(res => res.json()).then((d =>
          {
            console.log(d);
            this.cardid=d.data[0].id;
            var password=this.ruleForm2.newpass;
            var sms=this.ruleForm2.code;
            var id=this.cardid;
            var params={"mobile":mobile,"storeId":storeId,"mobileCode":sms,"password":password,"id":id};
            console.log(JSON.stringify(params));
            var myHeaders= new Headers();
            myHeaders.append('Content-Type','application/json');
            fetch('https://api.vi-ni.com/webapi/v1/card/reset/passWord', {
              method:'post',
              mode:'cors',
              headers:myHeaders,
              body:JSON.stringify(params)
            }).then(res => res.json()).then((d =>{
                console.log(d)
                if(d.code == '200'){
                  this.$message({
                    message: '密码重置成功',
                    type: 'success'
                  });
                }else if(d.code=='1020'){
                  this.$message.error('验证码错误');
                }else if(d.code=='1021'){
                  this.$message.error('验证码过期');
                }
              }
            ))
          }
        ))

      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .head{
    width: 100%;
    height: 100%;
  }
  .head > div{
    width: 100%;
    height: 100%;
  }
  .header{
    width: 189px;
    height:35px;
    top: 120px;
    position: absolute;
    left:0;
    right:0;
    margin-left:auto;
    margin-right:auto;
    text-align: center;
  }
  .middle{
    width: 558px;
    background: white;
    position: absolute;
    top:180px;
    left:0;
    right:0;
    margin-left:auto;
    margin-right:auto;
    box-shadow: 0 0 30px 8px rgba(0,0,0,0.2);
    padding:37px 43px;
  }
  .middle2{
    width: 558px;
    /*height:315px;*/
    background: white;
    position: absolute;
    top:180px;
    left:0;
    right:0;
    margin-left:auto;
    margin-right:auto;
    box-shadow: 0 0 30px 8px rgba(0,0,0,0.2);
    padding:37px 43px;
  }
  span,el-form-item > label.el-form-item__label{
    display: block;
    font-size: 18px;
    color: #9F9F9F;
    text-align: left;
    margin-bottom: 5px;
  }
  .el-form-item.is-success .el-input__inner:focus {
    border:none;
  }
  .middle span:nth-of-type(2){
    margin-top:15px;
  }
  input{
    display: block;
    margin-top:15px;
    background: #EEEEEE;
    width: 100%;
    height:50px;
    border:none;
    font-size: 20px;
  }
  .login,.next{
    background: #707070;
    width: 100%;
    height:50px;
    font-size: 20px;
    margin-top: 43px;
    line-height:50px ;
  }
  .fir div{
    width: 33%;
    float:left;
  }
  .fir div:nth-of-type(1){
    margin-right: 2.5px;
  }
  .el-button--primary {
    color: #fff;
    background-color: #707070;
    border-color: #707070;
    width: 100%;
    font-size: 18px;
  }
  .el-form-item.is-error .el-input__inner{
    border-color: #707070;
  }
  .el-form{
    margin-top: 23px;
  }
  .fir div:nth-of-type(2){
    margin-right: 3px;
  }
  .fif{
    display: flex;
    line-height: 50px;
  }
  .fif span{
    width: 90px;
  }
  .fif input{
    width: 25px;
    height: 25px;
    margin-right: 30px;
  }
  .fif input:nth-of-type(1){
    margin-left: 20px;
  }
  .fif input:nth-of-type(2){
    margin-left: 110px;
  }
  .fir div.active{
    padding-bottom: 12px;
    /*text-decoration:underline;*/
    border-bottom: 8px solid #707070;
  }
  .thi{
    margin-top: 8px;
  }
  .active{
    color:#636363;
    border-bottom: 2px solid #636363;
  }
  .forget{
    text-align: right;
    margin-top:15px;
    color: #9F9F9F;
    font-size: 18px;
    display: block;
  }
  .fir{
    font-size: 18px;
    padding-bottom: 36px;
    border-bottom: 8px solid #eeeeee;
    margin-bottom: 5px;
  }
  .sec span{
    margin-top: 25px;
  }
  .sec input{
    display: inline-block;
    width: 60%;
  }
  /*.sec button:nth-of-type(1){*/
  /*display: inline-block;*/
  /*width: 39%;*/
  /*height: 50px;*/
  /*border:1px solid #707070;*/
  /*}*/
  .bgtwo span{
    line-height: 16px;
    margin-bottom: 5px;
  }
  span.el-radio__input.is-checked .el-radio__inner {
    border-color: #eeeeee;
    background: #eeeeee;
  }
  .el-radio__input.is-checked+.el-radio__label {
    color: #eeeeee;
  }
  #sure{
    margin-top: 10px;
  }
</style>
