<template>
    <section class="panel">
        <p>{{cwd}}</p>
        <p @click="folderUp">up</p>
        <List :list="list"></List>
    </section>
</template>

<script>
import {mapState,mapActions} from 'vuex'
import List from './List'
export default {
    components:{List},
    computed:{  
        ...mapState(['cwd','list'])
    },
    methods:{
        ...mapActions({
            changeCWD:'CHANGE_CWD',
            folderUp:'FOLDER_UP'
        })
    },
    created(){
        this.changeCWD('c:/tools')
    }
}
</script>

<style lang="scss">
</style>