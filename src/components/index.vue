
<template>
  <form class="head form-horizontal">
   <div v-for="row in activetype">
     <section class="header">
       <h1 v-for="(item,index) in status" :class="{active:activeindex===index}" @click="activeindex=index">{{item.name}}</h1>
     </section>
     <section v-if="row==1" class="middle">
       <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" class="demo-ruleForm">
         <span>手机号</span>
         <el-form-item prop="phone">
           <el-input type="tel" v-model="ruleForm2.phone" auto-complete="off"></el-input>
         </el-form-item>
         <span>登录密码</span>
         <el-form-item prop="pass">
           <el-input  id="secon" type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
         </el-form-item>
         <router-link class="forget" :to="{name:'forget'}">忘记密码</router-link>
         <el-form-item>
           <el-button type="primary" @click="login">登录</el-button>
         </el-form-item>
       </el-form>
     </section>
     <section class="middle2" v-for="q in activeT" v-else>
       <div class="bgone" v-if="q===1">
         <div class="fir">
           <div class="active">获取验证码</div>
           <div>填写信息</div>
           <div>设置密码</div>
         </div>
       <div class="sec">
         <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" class="demo-ruleForm">
           <span>手机号</span>
           <el-form-item prop="phone">
             <el-input type="tel" name="mobile" id="mobile" v-model="ruleForm2.phone" auto-complete="off"></el-input>
           </el-form-item>
           <button type="button" @click="sendcode" style="position:absolute;top:135px;right:45px;height:40px;width:40%;">验证码</button>
           <span>验证码</span>
           <el-form-item prop="bir">
             <el-input  id="secon" type="bir" v-model="ruleForm2.code" auto-complete="off"></el-input>
           </el-form-item>
           <el-form-item>
             <el-button type="primary" @click="go">下一步</el-button>
           </el-form-item>
         </el-form>
       </div>
       </div>
       <div class="bgtwo" v-else-if="q===2">
         <div class="fir">
           <div class="active">获取验证码</div>
           <div class="active">填写信息</div>
           <div>设置密码</div>
         </div>

         <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" class="demo-ruleForm">
           <span>姓名</span>
           <el-form-item prop="name">
             <el-input  type="text" v-model="ruleForm2.name" auto-complete="off"></el-input>
           </el-form-item>
           <span>身份证号</span>
           <el-form-item prop="idname">
             <el-input type="number" v-model="ruleForm2.idname" auto-complete="off"></el-input>
           </el-form-item>
           <span>生日</span>
           <el-form-item prop="bir">
             <!--<el-input  type="data" v-model="ruleForm2.bir" auto-complete="off"></el-input>-->
             <el-date-picker v-model="ruleForm2.bir" type="date" placeholder="选择日期" style="width: 558px;"></el-date-picker>
           </el-form-item>
           <div class="fif" style="margin-bottom: 10px;">
             <span>性别</span>
             <el-radio v-model="radio" label="1">女</el-radio>
             <el-radio v-model="radio" label="2">男</el-radio>
           </div>
           <el-form-item>
             <el-button type="primary" @click="submitForm('ruleForm1');">下一步</el-button>
           </el-form-item>
         </el-form>

       </div>
       <div class="bgthree" v-else-if="q===3">
         <div class="fir">
           <div class="active">获取验证码</div>
           <div class="active">填写信息</div>
           <div class="active">设置密码</div>
         </div>
         <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" class="demo-ruleForm">
           <span>密码</span>
           <el-form-item prop="pass">
             <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
           </el-form-item>
           <span>请确认密码</span>
           <el-form-item prop="checkPass">
             <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
           </el-form-item>
           <el-form-item>
             <el-button type="primary" @click="finish">完成</el-button>
           </el-form-item>
         </el-form>

       </div>
     </section>
   </div>

  </form>
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
            callback()
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
          { min: 11, max: 11, message: '长度在为11个字符', trigger: 'blur' },
           { pattern: /^1[34578]\d{9}$/, message: '手机格式不正确', trigger: 'blur'}
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
  computed:{
    activetype(){
      return this.status[this.activeindex].id
    },
    activeT(){
      return this.activeI[this.I].id
    }
  },
  
  methods:{
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    submitForm(ruleForm2){
      if(this.ruleForm2.name!=undefined&&this.ruleForm2.idname!=undefined&&(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/).test(this.ruleForm2.idname)){
        document.querySelector(".bgone").style.display = "none";
        document.querySelector(".bgtwo").style.display = "none";
        this.I=2
      }else{
        this.$message({
          message: '请完善您的信息',
          type: 'warning'
        });
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    login(){

       if(this.ruleForm2.phone!=undefined && this.ruleForm2.pass!=undefined && (/^1[34578]\d{9}$/.test(this.ruleForm2.phone))){
        var mobile=this.ruleForm2.phone;
        var storeId='376';
        var password=this.ruleForm2.pass;
        var openId='0';
        var params={"mobile":mobile,"storeId":storeId,"password":password,"openId":openId};
        console.log(JSON.stringify(params));
        var myHeaders= new Headers();
        myHeaders.append('Content-Type','application/json');
        fetch('https://api.vi-ni.com/webapi/v1/card/activateToken', {
          method:'post',
          mode:'cors',
          headers:myHeaders,
          body:JSON.stringify(params)
      }).then(res => res.json()).then((d =>{
          console.log(d)
          if(d.code == '200'){
            alert('success')
          }else{
            alert('fail');
          }}))
      }else{
        this.$message({
          message: '请填写完善信息',
          type: 'warning'
        });
      }
      
    },
    sendcode(){
      if(/^1[34578]\d{9}$/.test(this.ruleForm2.phone)){
        var storeId = 376;
        var mobile=this.ruleForm2.phone;
        fetch('https://api.vi-ni.com/webapi/v1/send/'+mobile+'/identifyingCode/by/'+storeId, {
          method: 'GET',
          mode: 'cors',
        }).then(res => res.json()).then((d => {
            console.log(d)
            if(d.code=='1006'){
              this.$message({
                message: '该手机号码已被注册',
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
      }
    },
    go(){
      if(this.ruleForm2.phone!=undefined && this.ruleForm2.code!=undefined){
        document.querySelector(".bgone").style.display = "none";
        this.I=1;
      }else if(this.ruleForm2.phone=undefined && this.ruleForm2.code!=''){
        this.$message({
          message: '请输入手机号码',
          type: 'warning'
        });
      }else{
        this.$message({
          message: '请填写验证码',
          type: 'warning'
        });
      }
    },
    finish(){
      if(this.ruleForm2.pass!=undefined&&this.ruleForm2.checkPass!=undefined){
        var mobile=this.ruleForm2.phone;
         var name=this.ruleForm2.name;
         var storeId='376';
         var password=this.ruleForm2.pass;
         var sms=this.ruleForm2.code;
         var sex=this.radio;
         var birthday=this.ruleForm2.bir.toString().substr(0,10);
         console.log(birthday);
         var params={"mobile":mobile,"storeId":storeId,"sms":sms,"password":password,"name":name,"sex":sex,"birthday":birthday};
         console.log(JSON.stringify(params));
         var myHeaders= new Headers();
         myHeaders.append('Content-Type','application/json');
         fetch('https://api.vi-ni.com/webapi/v2/card', {
             method:'post',
             mode:'cors',
             headers:myHeaders,
             body:JSON.stringify(params)
         }).then(res => res.json()).then((d =>{
             console.log(d)
             if(d.code == '200'){
                alert('success')
             }else{
                alert('fail');
         }
    }
  ))
}else if(this.ruleForm2.pass=undefined && this.ruleForm2.checkPass!=''){
  this.$message({
          message: '请输入密码',
          type: 'warning'
  });
}else if(this.ruleForm2.checkPass=undefined && this.ruleForm2.pass!=''){
  this.$message({
          message: '请输入确认密码',
          type: 'warning'
  });
}
else{
  this.$message({
          message: '请输入密码并确认密码',
          type: 'warning'
  });
}
         
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
      display: flex;
      justify-content: space-between;
    }
   .middle{
     width: 558px;
     height:315px;
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
  .bottom{
    width: 100%;
    height:66px;
    background:#3C4043;
    position: absolute;
    bottom: 0;
    left:0;
    background-image:url("../assets/img/foot.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    display: flex;
    justify-content: space-between;
  }
  .bgone .sec .el-form .el-form-item .el-form-item__content .el-input .el-input__inner input:nth-of-type(1){
    width: 60%;
  }
  .bottom div{
    width: 25%;
    height:100%;
  }

</style>

