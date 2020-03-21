<template>
    <el-container style="height: 100vh;">
        <el-aside width="200px" class="aside">
            <div class="logo">ADMIN</div>
            <el-menu  
                    background-color="#2e323a"
                    text-color="rgb(236, 236, 236)"
                    active-text-color="#ffd04b"
                    :default-active="isActive" 
                    >

                <el-submenu index="1"> 
                    <template slot="title"><i class="iconfont icon-category"></i>分類管理</template>
                    <el-menu-item-group>
                        <el-menu-item index="/categories/create">
                            <router-link tag="span" class="navBtn" to="/categories/create">新建分類</router-link>  
                        </el-menu-item>
                        <el-menu-item index="/categories/list">
                            <router-link tag="span" class="navBtn" to="/categories/list">分類列表</router-link>  
                        </el-menu-item>
                    </el-menu-item-group>
                </el-submenu>

                <el-submenu index="2">
                    <template slot="title"><i class="iconfont icon-Object"></i>裝備管理</template>
                    <el-menu-item-group>
                        <el-menu-item index="/items/create">
                            <router-link tag="span" class="navBtn"  to="/items/create">新建裝備</router-link>  
                        </el-menu-item>
                        <el-menu-item index="/items/list">
                            <router-link tag="span" class="navBtn" to="/items/list">裝備列表</router-link>  
                        </el-menu-item>
                    </el-menu-item-group>
                </el-submenu>

                <el-submenu index="3">
                    <template slot="title"><i class="iconfont icon-card-hero"></i>英雄管理</template>
                    <el-menu-item-group>
                        <el-menu-item index="/heroes/create">
                            <router-link tag="span" class="navBtn"  to="/heroes/create">新建英雄</router-link>  
                        </el-menu-item>
                        <el-menu-item index="/heroes/list">
                            <router-link tag="span" class="navBtn"  to="/heroes/list">英雄列表</router-link>  
                        </el-menu-item>
                        <el-menu-item index="/heroes/weekHerose">
                            <router-link tag="span" class="navBtn"  to="/heroes/weekHerose">周免英雄</router-link>  
                        </el-menu-item>
                    </el-menu-item-group>
                </el-submenu>

                <el-submenu index="4">
                    <template slot="title"><i class="iconfont icon-wenzhang"></i>文章管理</template>
                    <el-menu-item-group>
                        <el-menu-item index="/articles/create">
                            <router-link tag="span" class="navBtn"  to="/articles/create">新建文章</router-link>  
                        </el-menu-item>
                        <el-menu-item index="/articles/list">
                            <router-link tag="span" class="navBtn"  to="/articles/list">文章列表</router-link>  
                        </el-menu-item>
                    </el-menu-item-group>
                </el-submenu>

                <el-submenu index="5">
                    <template slot="title"><i class="iconfont icon-banner"></i>廣告管理</template>
                    <el-menu-item-group>
                        <el-menu-item index="/ads/create">
                            <router-link tag="span" class="navBtn"  to="/ads/create">新建廣告位</router-link>  
                        
                        </el-menu-item>
                        <el-menu-item index="/ads/list">
                             <router-link tag="span" class="navBtn"  to="/ads/list"> 廣告位列表</router-link>  
                       
                        </el-menu-item>
                    </el-menu-item-group>
                </el-submenu>

                <el-submenu index="6">
                    <template slot="title"><i class="iconfont icon-admin"></i>管理中心</template>
                    <el-menu-item-group>
                        <el-menu-item index="/admin_users/create">
                            <router-link tag="span" class="navBtn"  to="/admin_users/create"> 管理員分類</router-link>  
                       
                        </el-menu-item>
                        <el-menu-item index="/admin_users/list">
                         <router-link tag="span" class="navBtn"  to="/admin_users/list"> 管理員列表</router-link>  
                        </el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </el-menu>
        </el-aside>
        
        <el-container>
            <el-header style="text-align: right; font-size: 12px">
            <el-dropdown @command="handleCommand">
                <i class="el-icon-setting" style="margin-right: 15px"></i>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="a">登出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <span>{{user.username}}</span>
            </el-header> 
            
            <el-main>
                <router-view :key="$route.path"></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>


<script>
export default {
    data() {
        return{
            // isActive:"/categories/create"
        }
    },
    methods: {
        handleCommand(command){
            console.log("command",command)
            this.$store.dispatch("setAuthenticated",false);
            this.$store.commit("SET_USER",{});
            localStorage.clear();
            this.$router.push('/login');
        },
        
    },
    computed: {
        user() {
            return this.$store.getters.user;
        },
        
      
        isActive() {
            //  let path = this.$route.path.replace('/','');

            //     return path ? path : '/articles/create';
            //如果是編輯,則路由高亮停在list
            let url = this.$route.path;
            if(this.$route.params.id){
               
                var newStr= this.$route.path.split('/'+this.$route.params.id)[0];
                var str= newStr.split('/edit')[0];
                url =str +'/list'
            }
            return url;

        }

    },

    // beforeRouteLeave:function(to,from,next){
    //     console.log("to=>",to)
    //     console.log("from=>",from)
    // }
};
</script>
<style scoped>


.logo{
    height: 60px;
    background: #242528;
    line-height: 60px;
    text-align: center;
    color: #fff;
    background-image: url("../assets/imgs/admin-logo.png");
    text-indent: -99999px;
}
.el-menu{
    border-right: none !important;
}
.el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
    background: #fff;
    box-shadow: 0 0 28px 0 rgba(61,78,124,.13);
    text-align: right;
    font-size: 12px;
}
  
.aside {
    color: #333;
    background: #2e323a;
    font-size: 15px;
}

.aside ul li,.aside .el-submenu__title{
   
    letter-spacing: 1px;
}

.el-main{
    padding:3rem ;
    background: #f2f1f1; 
}

.navBtn{
    width: 100%;
    display: inline-block;
}
</style>

