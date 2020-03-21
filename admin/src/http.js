import Vue from 'vue';
import axios from 'axios';
import router from './router'
import { Loading } from 'element-ui';

let loading;
function starLoading(){
    loading = Loading.service({
        lock:true,
        text:"加載中..",
        background:'rgba(0,0,0,0.7)'
    });
}

function endLoading(){
    setTimeout(() => {
        loading.close();
    } , 500);
}


const http = axios.create({
    baseURL: process.env.NODE_ENV == "production" ? 'https://arena-valor-app-demo.herokuapp.com/admin/api' :'http://localhost:3000/admin/api'
})

// 請求攔截
http.interceptors.request.use(function (config) {
    starLoading();
    if(localStorage.token){
        config.headers.Authorization = 'Bearer ' + localStorage.token
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

// 響應攔截
http.interceptors.response.use(res=>{
    endLoading();
    return res
},err=>{    
    console.log('err.response==>',err)
    if(err.response.data){
        // 服務端返回錯誤訊息，讓前端彈出
        Vue.prototype.$message({
            type:'error',
            message:err.response.data.message
        })  
    }

    if(err.response.status===401){
        router.push('/login')
    }
    endLoading();
})


export default http;