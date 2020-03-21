<template>
    <div>
        <div class="topbar bg-black py-2 px-3 d-flex ai-center">
            <div style="width:30px;" class="mr-2">
                <img src="../assets/logo.png">
            </div>
           <div class="mr-auto">
               <div class="text-white mb-1">Garena 傳說對決</div>
               <div class="text-grey fs-xxs">公平對戰 隨時開團</div>
           </div>
           <div>
                <button class="btn bg-primary">
                    立即下載
                </button>
           </div>
        </div>

        <div class="bg-primary py-2">
            <div class="nav nav-inverse py-1 jc-around">
                <div class="nav-item active">
                    <router-link tag="div" class="nav-link" to="/">首頁</router-link>
                </div>
                <div class="nav-item">
                    <router-link tag="div" class="nav-link" to="/">攻略中心</router-link>
                </div>
                  <div class="nav-item">
                    <router-link tag="div" class="nav-link" to="/">賽事中心</router-link>
                </div>
            </div>
        </div>
       
       <router-view></router-view>
    </div>
</template>

<script>
export default {
    
}
</script>
