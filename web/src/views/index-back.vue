<template>
    <div class="home">
        <!-- 首頁輪撥圖 -->
        <swiper :options="swiperOption">
            <swiper-slide v-for="(item,index) in bannerListHead[0].items" :key="index">
                <a :href="item.url">
                    <img class="w-100" :src="item.image">
                </a>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>

        <div class="nav-icons bg-white mt-3 d-flex flex-wrap pt-3">
            <div class="nav-item text-center mb-4" v-for="n in 10" :key="n">
                <i class="sprite sprite-news mb-1"></i>
                <div>爆料站</div>
            </div>
        </div>

        <!-- 新聞資訊 -->
        <ListCard icon="card-hero" title="新聞資訊" :categories="newCats">
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
        <ListCard icon="card-hero" title="英雄列表" :categories="hreoCats">
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

        <p>asdas</p>
        <p>asdas</p>
        <p>asdas</p>
        <p>asdas</p>
    </div>
</template>

<script>
import dayjs from 'dayjs';
import Card from '../components/Card';
import ListCard from '../components/ListCard';
export default {
    name: 'home',
    components: {
        Card,
        ListCard
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
            bannerListHead:[{}]
                    
        }
    },
    methods: {
        async fetchNewsCats(){
            const res =  await this.$http.get('/news/list');
            this.newCats = res.data;

            console.log("this.newCats",this.newCats)
        },
        async fetchHeroesCats(){
            const res =  await this.$http.get('/herose/list');
            this.hreoCats = res.data;
        },
        async fetchBannerList(){

            const res =  await this.$http.get('/banners/list');
            this.bannerListHead = res.data.filter((item, index, array)=>{
                return item.name == "首頁廣告"; 
            });

            this.$set(this.bannerListHead,'items',this.bannerListHead[0].items)
            
        }
    },
    created() {
        this.fetchNewsCats();
        this.fetchHeroesCats();
        this.fetchBannerList();    
    },
}
</script>

<style lang="scss">
@import '../assets/css/variables.scss';

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
</style>


