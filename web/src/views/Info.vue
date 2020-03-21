<template>
    <div class="page-info">
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
        <div class="infoCard">
            <h3 class="infoCard-title">故事緣起</h3>
            <p>千百年來，眾神和惡魔之間爆發過無數次戰爭。</p>
            <p>他們交戰的時候，從天上打到地下、從雪山打到大海、從荒漠打到沼澤……世界的每個角落，都可以成為他們對決的傳說戰場。</p>
            <p>“戰爭必須停止，但鮮血不能白流！”公正的造物主，重啟了通往傳說戰場的大門，為殺戮堆積的仇恨，打開了一個新的宣洩口。他麾下的挑戰者，將率領眾神、惡魔、人類和野獸四族中的精銳，對彼此展開無止無休地殺戮！</p>
        </div>
        <div class="infoCard">
            <h3 class="infoCard-title">遊戲特色</h3>
            <!-- 輪撥圖 -->
            <swiper :options="swiperOption">
                <swiper-slide>
                    <img class="w-100" src="../assets/imgs/synopsis_banner_2.jpg">
                </swiper-slide>
                <swiper-slide>
                    <img class="w-100" src="../assets/imgs/synopsis_banner_3.jpg">
                </swiper-slide>
                <swiper-slide>
                    <img class="w-100" src="../assets/imgs/synopsis_banner_4.jpg">
                </swiper-slide>
                <swiper-slide>
                    <img class="w-100" src="../assets/imgs/synopsis_banner_5.jpg">
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
            <p>傳說對決這款遊戲中，遊戲模式分為「玩家vs玩家」、「玩家vs電腦」、「自訂 ... 玩家對戰的傳說戰場，玩家自由選擇英雄進行對戰，每位英雄皆有各自的角色定位、特色</p>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import Footer from '../components/Footer';

export default {
    name: 'info',
    components:{
        Footer,
    },
    data() {
        return {
            swiperOption: {
                initialSlide: 0,
                pagination:'.swiper-pagination',
                loop: true,
            }, 
        }
    },
    methods: {
        async fetch(){
           
           
        }
    },
    created() {
        
    },
}
</script>


<style scoped lang="scss">
.page-info{
    padding-bottom:5rem;
    
}
</style>
