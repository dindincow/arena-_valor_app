<template>
    <div class="herose-info">
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
        <div class="heroseList">
            <h2>英雄列表</h2>
            <div class="heroseNav d-flex fs-xl jc-around">
                <div v-for="(item,index) in heroseMenu" 
                    :key="index"
                    @click="changeType(index)"
                    :class="{'active':currentType==index}"
                    >
                    {{item}}
                </div>
            </div>
            <div class="d-flex flex-wrap">
                <router-link 
                    :to="`/herose/${hero._id}`"
                    class="pt-3 text-center p-2" 
                    style="width:20%;" 
                    v-for="hero in heroseList" 
                    :key="hero._id">
                    <img class="w-100" :src="hero.icon" alt="" >
                    <span>{{hero.name}}</span>
                </router-link>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import Footer from '../components/Footer';

export default {
    name: 'herose',
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
            allHeroseList:[],
            heroseList:[],
            heroseMenu:[ '全部','坦克','戰士','刺客','法師','射手','輔助'],
            currentType:0
        }
    },
    methods: {
        async fetchHerosList(){
            const res =  await this.$http.get('heroseList');
            this.heroseList  = res.data; 
            this.allHeroseList = this.heroseList
        },

        filterHerose(id){
            let list;
            list = this.allHeroseList.filter((item,index)=>{
                console.log('item',item)
                for(var i=0;i<item.categories.length;i++){
                    if(item.categories[i]===id){
                        return item;
                    }
                }
            })
            return list;
        },

        changeType(index){
            this.currentType = index ;   
            switch (index){
                    // 全部
                case 0 :
                    this.heroseList = this.allHeroseList ; 
                    break; 
                case 1 :
                    // 坦克 5e53b0c758cae26e501eb2fb
                    this.heroseList = this.filterHerose('5e53b0c758cae26e501eb2fb')
                    console.log(' this.heroseList', this.heroseList)

                    break; 
                case 2 :
                    // 戰士 5e53b0d558cae26e501eb2fc
                    this.heroseList = this.filterHerose('5e53b0d558cae26e501eb2fc')
                    break; 

                case 3 :
                    // 刺客 5e53b0f158cae26e501eb2fe
                    this.heroseList = this.filterHerose('5e53b0f158cae26e501eb2fe')
                    break; 

                case 4 :
                    // 法師 5e53b0ff58cae26e501eb2ff 
                    this.heroseList = this.filterHerose('5e53b0ff58cae26e501eb2ff')
                    break; 

                case 5 :
                    // 射手 5e53b0e358cae26e501eb2fd
                    this.heroseList = this.filterHerose('5e53b0e358cae26e501eb2fd')
                    break; 

                case 6 :
                    //  輔助 5e53b10e58cae26e501eb300
                    this.heroseList = this.filterHerose('5e53b10e58cae26e501eb300')
                    break; 
            } 
        }
    },
    created() {
        this.fetchHerosList();
    }
  
}
</script>


<style scoped lang="scss">
.herose-info{
    padding-bottom:5rem;
    color: #ead99f;
   
    .heroseList{
        padding: 1.2rem 1.5rem;
        h2{
            padding: 0.5rem;
            color: #ead99f;
            background-color: #372e54;
        }
        .heroseNav{
            padding: 10px 0;
            border-bottom: 1px solid #999bae;
            color: #999ec9;
            .active{
                color: red;
            }
        }
        
    }
}
</style>
