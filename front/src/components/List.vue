<template>
    <section class="list">

        <template v-if="list.loading">
            loading
        </template>

        <template v-if="list.error">
            {{list.error}}
        </template>

        <table class="table">
            <tr>
                <th>Filename</th>
            </tr>
            <Item 
                v-if="list.result"
                v-for="data in list.result"
                :data="data"
            ></Item>
        </table>

    </section>
</template>

<script>
import Item from './Item'
export default {
    props:['list'],
    components:{Item},
}
</script>

<style lang="scss">
</style>