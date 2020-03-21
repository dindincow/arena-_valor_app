<template>
    <div class="page-hero" v-if="model">
        <div class="topbar bg-black py-2 px-3 d-flex ai-center">
             <div style="width:30px;" class="mr-2">
                <img src="../assets/logo.png">
            </div>
            <div class="mr-auto">
               <div class="text-white mb-1">Garena 傳說對決</div>
               <div class="text-grey fs-xxs">公平對戰 隨時開團</div>
            </div>
            <router-link  to="/">  
                <button class="btn bg-primary">
                    回上頁
                </button>
            </router-link>
        </div>
        <!-- 角色 -->
        <div class="top" :style="{'background-image':`url(${model.banner})`}">
            <div class="mask"></div>
            <div class="info text-white p-3">
                <div>{{model.title}}</div>
                <h2 class="my-2">{{model.name}}</h2>
                <div>{{ model.categories.map(v=>v.name).join('/')}}</div>
                <div>
                    <span>難度</span>
                    <span class="badge bg-primary mx-1">{{model.scores.diffcult}}</span>
                    <span>技能</span>
                    <span class="badge bg-blue mx-1">{{model.scores.skills}}</span>
                    <span>攻擊</span>
                    <span class="badge bg-danger mx-1">{{model.scores.attack}}</span>
                    <span>生存</span>
                    <span class="badge bg-grey mx-1">{{model.scores.survive}}</span>
                </div>
            </div>  
        </div>
        <!-- 英雄故事 -->
        <div class="story">
            <h3 class="text-yellow-1 px-2 py-2 bg-blue-purple m-0">英雄故事</h3>
            <p class="text-light-1 lh-1">{{model.story}}</p>
        </div>
        <!-- 技能 -->
        <div class="skills">
            <h3 class="text-yellow-1 px-2 py-2 bg-blue-purple m-0">技能介紹</h3>
            <div class="d-flex jc-around mt-3">
                <img
                    class="icon"
                    @click="currentSkillIndex = i"
                    :class="{active: currentSkillIndex === i}"
                    :src="item.icon"
                    v-for="(item, i) in model.skills"
                    :key="item.name"
                />
            </div>
            <div v-if="currentSkill" class="text-yellow-1">
                <div class="d-flex pt-4 pb-1">
                    <h3 class="m-0"><span class="iconfont icon-magic mr-1"></span>{{currentSkill.name}}</h3>
                    <span class="text-grey-1 ml-4"></span>
                </div>
                <p class="text-light-1 lh-1">{{currentSkill.description}}</p>
               
            </div>
        </div>
        <!-- 出裝 -->
        <div class="equipment">
            <h3 class="text-yellow-1 px-2 py-2 bg-blue-purple m-0">裝備出裝</h3>
            <div>
                <p class="text-yellow-1">順風出裝</p>
                <div class="d-flex jc-around mt-3">
                   <div v-for="(item,index) in model.outfit1" :key="index">
                        <img
                            class="equipment-icon"
                            :src="item.icon"
                        />
                        <p class="mx-1 text-light-1">{{item.name}}</p>
                   </div>
                </div>
            </div>

            <!-- <div>
                <p class="text-yellow-1">逆風出裝</p>
                <div class="d-flex jc-around mt-3">
                   <div v-for="(item,index) in model.outfit1" :key="index">
                        <img
                            class="equipment-icon"
                            :src="item.icon"
                        />
                        <p class="mx-1 text-light-1">{{item.name}}</p>
                   </div>
                </div>
            </div> -->

        </div>
    </div>
</template>

<script>
export default {
    name: 'HeroDetail',
    props: {
        id:{require:true}     
    },
    data() {
        return {
            model:'',
            currentSkillIndex: 0
        }
    },
    methods: {
        async fetch(){
            const res = await this.$http.get(`/herose/${this.id}`);
            this.model = res.data;
           
        }
    },
    computed: {
        currentSkill() {
            return this.model.skills[this.currentSkillIndex];
        }
    },
    created() {
        this.fetch()
    },
}
</script>


<style lang="scss">
.page-hero{
    .top{
        height: 50vw;
        background:#ccc no-repeat top center;
        background-size:auto 100%;
        
        position: relative; 
       
    }
    .mask{
        width: 100%;
        height: 50vw;
        background: rgba(0%, 0%, 0%, 0.4);
        position: absolute;
        top: 0;
    }
    .info{
        position: absolute;
        z-index: 999;
        bottom: 0;

        .badge{
            border-radius: 50%;
            width: 18px;
            height: 18px;
            display: inline-block;
            text-align: center;
        }
    }
}

.skills {
    padding: 1.2rem 1.5rem;
    background: #020a1d;
    border: 1px solid #263042;
    img.icon {
    width: 70px;
    height: 70px;
    border: 3px solid #ccc;
        &.active {
            border-color:#db9e3f;
        }
        border-radius: 50%;
    }
}
.hero-items {
    img.icon{
        width: 45px;
        height: 45px;
        border-radius: 50%;
    }
}

.story{
    padding: 1.2rem 1.5rem;
    background: #020a1d;
    border: 1px solid #263042;
}

.equipment{
    padding: 1.2rem 1.5rem;
    background: #020a1d;
    border: 1px solid #263042;
}

.equipment-icon{
    width: 50px;
}
</style>
