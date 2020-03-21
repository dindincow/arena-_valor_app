<template>
    <div class="footer">
        <div class="d-flex flex-wrap">
            <router-link 
                to = "/"
                class="p-3 text-center" 
                style="width:25%"
                :class="{'active':$route.path === '/home'}" 
                >
                <i class="iconfont icon-moreread"></i>
                <p class="">首頁</p>
            </router-link>

            <router-link 
                to = "/introduction"
                class="p-3 text-center" 
                style="width:25%" 
                :class="{'active':$route.path === '/introduction'}" 
                >
                <i class="iconfont icon-iconproductintroduction"></i>
                <p>簡介</p>
            </router-link>

            <router-link 
                to = "/herose"
                class="p-3 text-center" 
                style="width:25%" 
                :class="{'active':$route.path === '/herose'}" 
                >
                <i class="iconfont icon-card-hero"></i>
                <p>英雄</p>
            </router-link>

            <a 
                href = "https://event.moba.garena.tw/20170206Master"
                class="p-3 text-center " 
                style="width:25%" 
                >
                <i class="iconfont icon-movie"></i>
                <p>影片</p>
            </a>
        </div>
    </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<style scoped lang="scss">
.footer{
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 999;
    border-top: 2px solid #375682;
    background: linear-gradient(to bottom, #072d58 0%, #020829 100%);
    i{
        font-size: 1.458571rem;
    }
    p{
        padding: 0;
        margin: 0; 
        padding-top: .357143rem;
    }
    .active{
        background: linear-gradient(to bottom, #002e81 0%, #002464 100%);
    }
}



</style>
