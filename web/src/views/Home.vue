<template>
    <div class="home">
        <!-- 首頁輪撥圖 -->
         <swiper :options="swiperOption" v-if="bannerListHead[0]">
            <swiper-slide v-for="(item,index) in bannerListHead[0].items" :key="index">
                <a :href="item.url">
                    <img class="w-100" :src="item.image">
                </a>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>

        <!-- 官方消息 -->
        <ListCard icon="card-hero" title="官方消息" :categories="newCats">
            <!-- 可獲取子組件中 category 變數 -->
            <template #items="{category}"> 
                <router-link 
                    :to="`/articles/${item._id}`"
                    class="d-flex pt-3" 
                    v-for="(item,index) in category.newsList" 
                    :key="index">
                    <span>[{{item.categoryName}}]</span>
                    <span class="mx-2">|</span>
                    <span class="flex-1 mr-3 text-ellipse">{{item.title}}</span>
                    <span>{{item.createdAt | date}}</span>
                </router-link> 
            </template> 
        </ListCard>

        <!-- 英雄列表 -->
        <ListCard icon="card-hero" title="英雄列表" :categories="hreoCats" v-if="newHero[0]">
            <img :src="newHero[0].items[0].image" slot="imgs" class="w-100 newHero">
            <!-- <h2 slot></h2> -->
             <!--這邊會插到 ListCard組件 sloat name = items 中-->
            <template #items="{category}"> 
                <div class="d-flex flex-wrap">
                    <router-link 
                        :to="`/herose/${hero._id}`"
                        class="pt-3 text-center p-2" 
                        style="width:20%;" 
                        v-for="(hero,index) in category.heroList" 
                        :key="index">
                        <img class="w-100" :src="hero.icon" alt="" >
                        <span>{{hero.name}}</span>
                    </router-link>
                </div> 
            </template>
        </ListCard>

        <!-- 周免英雄 -->
        <div class="freeHeorsOfWeek p-3 text-center">
            <h3></h3>
            <p class="text-light-1">傳說陪你好時光!周周讓你體驗新英雄!</p>
            <div class="d-flex flex-wrap">
                <router-link 
                        :to="`/herose/${hero.heroId}`"
                        class="pt-3 text-center p-2" 
                        style="width:20%;" 
                        v-for="hero in weekHeroesList" 
                        :key="hero.heroId">
                        <img class="w-100" :src="hero.icon" alt="" >
                        <span>{{hero.name}}</span>
                </router-link>
            </div>
        </div>

        <!-- 對決影片 -->
        <div class="movie p-3 text-center">
            <h3></h3>
            <p class="text-light-1">戰無不勝!高手過招~影片給你看</p>
            <div class="d-flex flex-wrap">
                <a 
                      href="http://tw.yahoo.com/"
                        class="pt-3 text-center p-2" 
                        style="width:50%;" 
                        >
                        <img class="w-100" src="../assets/imgs/mqdefault1.jpg" alt="" >
                        <span></span>
                </a>
               <router-link 
                    to = "http://tw.yahoo.com/"
                    class="pt-3 text-center p-2" 
                    style="width:50%;" 
                    >
                    <img class="w-100" src="../assets/imgs/mqdefault2.jpg" alt="" >
                    <span></span>
                </router-link>

                <router-link 
                        to = "http://tw.yahoo.com/"
                        class="pt-3 text-center p-2" 
                        style="width:50%;" 
                        >
                        <img class="w-100" src="../assets/imgs/mqdefault3.jpg" alt="" >
                        <span></span>
                </router-link>

               <router-link 
                    to = "http://tw.yahoo.com/"
                    class="pt-3 text-center p-2" 
                    style="width:50%;" 
                    >
                    <img class="w-100" src="../assets/imgs/mqdefault4.jpg" alt="" >
                    <span></span>
                </router-link>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import dayjs from 'dayjs';
import Card from '../components/Card';
import ListCard from '../components/ListCard';
import Footer from '../components/Footer';
export default {
    name: 'home',
    components: {
        Card,
        ListCard,
        Footer
    },
    filters:{
        date(val){
            return dayjs(val).format('MM/DD')
        }
    },
    data() {
        return {
            swiperOption: {
                initialSlide: 0,
                pagination:'.swiper-pagination',
                loop: true,
            },
            newCats:[],
            hreoCats:[],
            bannerListHead:[],
            bannerListMiddle:[],
            weekHeroesList:[],
            newHero:[]
           
                    
        }
    },
    methods: {
        async fetchNewsCats(){
            const res =  await this.$http.get('/news/list');
            this.newCats = res.data;
        },
        async fetchHeroesCats(){
            const res =  await this.$http.get('/herose/list');
            this.hreoCats = res.data;
        },
        async fetchBannerList(){
            const res =  await this.$http.get('/banners/list');
            this.bannerListHead = res.data.filter((item, index, array)=>{
                return item.name == "首頁輪播廣告"; 
            });
            this.newHero = res.data.filter((item, index, array)=>{
                return item.name == "新英雄廣告"; 
            });

           


            this.$set(this.bannerListHead,'items',this.bannerListHead[0].items); 
        },
        async fetchWeekHerosList(){
            const res =  await this.$http.get('weekheroes');
            this.weekHeroesList  = res.data; 
        
        }
    },
    created() {
        this.fetchNewsCats();
        this.fetchHeroesCats();
        this.fetchBannerList();
        this.fetchWeekHerosList();     
    },
}
</script>

<style lang="scss">
@import '../assets/css/variables.scss';
.home{
    margin-bottom: 100px;
}
.nav-icons{
    border-top:1px solid $border-color;
    border-bottom:1px solid $border-color;
    .nav-item{
        width: 25%;
        border-right: 1px solid $border-color;
        &:nth-child(4n){
             border-right: none;
        }
    }
}

.newHero{
    border-radius: 10px;
    border: 1px solid #755624;
}

.freeHeorsOfWeek{
    color: #fff;
    background: url('../assets/imgs/cntbg.jpg') center center;
    h3{
        padding: 0;
        background: url('../assets/imgs/title-freehero.png') no-repeat;
        width: 110px;
        height: 20px;
        margin: 0 auto;
    }
    img{
        border-radius: 10px 0;
        border: 2px solid #5a6ea0;
    }
}

.movie{
    color: #fff;
    background: url('../assets/imgs/cntbg.jpg') center center;
    h3{
        padding: 0;
        background: url('../assets/imgs/title-video.png') no-repeat;
        width: 120px;
        height: 20px;
        margin: 0 auto;
    }
    img{
        border: 1px solid #ccc;
    }
}
</style>


