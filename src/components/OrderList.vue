<script setup>
import { computed,ref,onMounted} from 'vue'
import { usePrefectureStore } from '../stores/prefecture'

const store = usePrefectureStore()
// actionsを呼び出す処理
const TotalPrice = computed(() => store.TotalPrice)
const CustomerCode = ref('')
const searchOrderByCusCode =store.searchOrderByCusCode

</script>

<template>
<v-container>
    <v-row class="mb-3 mt-3" align="center" justify="center">
    <v-sheet class="w-50" >
    <v-text-field
              class="ml-6 mr-6"
              v-model="CustomerCode"
              label="顧客コードを入力"
              placeholder="顧客コードを入力…"
              outlined
            ></v-text-field>
    </v-sheet>
    </v-row>
     <v-row class="mb-3 mt-3" align="center" justify="center">
          入力内容　CustomerCode: {{ CustomerCode }} 
          <v-btn
            @click="searchOrderByCusCode(CustomerCode)"
            dark
            small
            color="indigo"
            class="ml-4"
          >
            集計
          </v-btn>
        </v-row>
    <p>総受注額 : {{TotalPrice }} 円</p>
    <table border="1" class="mountains-list">
        <thead>
            <tr class="top-label">
                    <th>受注番号</th>
                    <th>顧客名</th>
                    <th>商品名</th>
                    <th>価格</th>
                    <th>数量</th>
                    <th>合計金額</th>
            </tr>   
        </thead>
            <tbody>
                 <tr v-for="data in store.OrderList">
                    <td>{{data.OrderNo}}</td>
                    <td>{{data.CustomerName}}</td>
                    <td>{{data.ItemName}}</td>
                    <td>{{data.Price}}円</td>
                    <td>{{data.Order_num}}個</td>
                    <td>{{data.TotalPrice}}円</td>
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