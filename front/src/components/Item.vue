<template>
    <tr>
        <td>
            <b @click="enterFolder(data.name)">{{data.name}}</b>
            {{data.type}}
        </td>
    </tr>
</template>

<script>
import {mapActions} from 'vuex'

export default {
    props:['data'],
    methods:{
        ...mapActions({
            enterFolder:'ENTER_FOLDER'
        })
    }
}
</script>
