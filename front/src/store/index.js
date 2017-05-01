import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import * as api from '../lib/api'

export default new Vuex.Store({
    state:{
        cwd:'',
        list:{
            loading:false,
            result:null,
            error:null
        }
    },
    actions:{
        async CHANGE_CWD({commit},cwd){
            commit('SET_CWD',cwd)
            commit('LIST_CLEAR',cwd)
            try{
                let result = await api.list(cwd)
                commit('LIST_RESULT',result)
            }catch(err){
                commit('LIST_ERROR',err)
            }
        },
        FOLDER_UP({dispatch,state}){
            let cwd = state.cwd
                .split('/')
                .slice(0,-1)
                .join('/')
            dispatch('CHANGE_CWD',cwd)
        },
        ENTER_FOLDER({dispatch,state},folder){
            let cwd = state.cwd+'/'+folder
            dispatch('CHANGE_CWD',cwd)
        }
    },
    mutations:{
        SET_CWD(state,cwd){
            state.cwd = cwd
        },
        LIST_CLEAR(state){
            state.list.loading = true
            state.list.result = null
            state.list.error = null
        },
        LIST_RESULT(state,result){
            state.list.loading = false
            state.list.result = result
        },
        LIST_ERROR(state,error){
            state.list.loading = false
            state.list.error = {
                code:error.code,
                message:error.message
            }
        },
    }
})