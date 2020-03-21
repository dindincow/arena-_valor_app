import axios from 'axios';

const state = {
    isAuthenticated : false,
    userInfo:{},
   
}

const getters ={
    authenticated : state => state.isAuthenticated,
    user : state => state.userInfo
}

const mutations = {
    SET_AUTHENTICATED: (state, isAuthenticated) => {

        if(isAuthenticated){
            state.isAuthenticated = true;
        }else{
            state.isAuthenticated = false;
        }
    },
    SET_USER: (state, user) => {
        console.log("-----user--------",user)
        if(user){
            state.userInfo = user;
        }
    },
   
   
}

const actions = {
   
    async setAuthenticated({ commit }, isAuthenticated) {
        commit("SET_AUTHENTICATED",isAuthenticated)    
    },
  

    async getUserInfo({commit},id){
       
        //const res = await axios.get(`https://arena-valor-app-demo.herokuapp.com/admin/api/admin_users/${id}`);
        const res = await axios.get(`http://localhost:3000/admin/api/admin_users/${id}`);
        console.log("```res````",res)
        commit("SET_USER",res.data);
        return res;
    },


    // user logout
    logout({ commit, state }) {
      
    },
    // remove token
    resetToken({ commit }) {
       
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}
  