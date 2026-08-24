<script setup>
import { computed,ref,onMounted} from 'vue'
import { usePrefectureStore } from '../stores/prefecture'

const store = usePrefectureStore()

// actionsを呼び出す処理
onMounted(async () => {await store.readCustomerList()})

const count = computed(() => store.CustomerCount)
// const deleteM = (index) =>{
//     store.deleteM(index)
// }
//  const totalElevation = computed(() => store.totalElevation) 

// const clearList =store.clearList


</script>

<template>
<v-container>
    <!--
    <div v-if="totalElevation === 0" >
                <p>あなたの挑戦を待ってます</p>
                </div>
        <div v-else>
    <p>挑戦標高 : {{ totalElevation }} m</p><br>
    -->
    <p>表示件数 : {{ count }} 件</p>
    <table border="1" class="mountains-list">
        <thead>
            <tr class="top-label">
                    <th>顧客コード</th>
                    <th>顧客名</th>
            </tr>   
        </thead>
            <tbody>
                 <tr v-for="data in store.CustomerList">
                    <td>{{data.CustomerCode}}</td>
                    <td>{{data.CustomerName}}</td>
                </tr>
            </tbody>
    </table><br>
                    <!--<div class=vbtn>
                    <v-btn  size="small" v-on:click="clearList">お気に入りを全削除  
                    </v-btn> 
                    </div>-->
                    
</v-container>
</template>

<style scoped>
/* 都道府県ボタン */
.body{
    text-align: center;
}
.mountains-list{
      margin: 0 auto;
}
p{
    font-size: large;
    text-align: center;
}
.vbtn{
    margin: 0 auto;   
    text-align: center;
}

</style>