<template> 
    <div class="login">
        <div class="login-weapper">
            <div class="logo-img">
                <img src="../assets/imgs/logo.png">
            </div>
            <h2>ADMINT管理者後台</h2>
            <el-card class="login-card">
    
                <el-form :model="form" size="medium">
                    <el-form-item label="帳號">
                        <el-input v-model="form.username" style="height: 47px;"></el-input>
                    </el-form-item>

                    <el-form-item label="密碼">
                        <el-input  v-model="form.password" style="height: 47px;"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="login" style="width: 100%;height: 47px;">登入</el-button>  
                    </el-form-item>
                </el-form>
            </el-card>
        </div>
    </div>
</template>

<script>
export default {
    name: "login",
    components: {},
    props: {
       
    },
    data() {
        return {
            form: {
                username:"admin",
                password:"123"
            }
        };
    },
    methods: {
        async login() {
            const res = await this.$http.post('login',this.form)
            localStorage.setItem('token', res.data.token);
            this.$store.dispatch("setAuthenticated",!this.isEmpty(localStorage.token))
            this.$router.push('/');
            this.$message({
                type:"success",
                message:'登入成功'
            })
        },
        isEmpty(value) {
            return (
                value === undefined ||
                value === null ||
                (typeof value === "object" && Object.keys(value).length === 0) ||
                (typeof value === "string" && value.trim().length === 0)
            );
        }
        
    },
    created() {
        
    }
};
</script>
<style>

.login-weapper{
    width: 30rem;
    margin:8rem auto;
    box-shadow: 0 0 13px 0 rgba(44,56,90,.08);
}
.login-weapper .logo-img{
    text-align: center;
}
.login-weapper h2{
    text-align: center;
    color: #fff;
    letter-spacing: 3px;
}

.login-weapper .el-card {
    border: 1px solid #5c5881 !important;
    background: #2d2a4b !important;
}

.login-weapper .el-card__body{
    color: #303133 !important;
    background: #2d2a4b !important;
}

.login-weapper .el-form-item__label {
    font-size: 16px;
    color: #d9d9d9;
    letter-spacing: 2px;
}
  
.login-weapper .el-input__inner{
    height: 46px !important;
    border: 1px solid #363353;
    background-color: #1f1c39;
    color: #d9d9d9;
}



</style>
