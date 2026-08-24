<script setup>
import { computed,ref,onMounted,createApp} from 'vue'
import { usePrefectureStore } from '../stores/prefecture'

const store = usePrefectureStore();
const ItemCode = ref('')
const ItemName = ref('')
const Price = ref('')

// actionsを呼び出す処理
onMounted(async () => {await store.readItemList()})
const count = computed(() => store.count)

const addDate =store.addData

</script>

<template>
    <div class="body">
    <v-container> 
     <v-row class="mb-3 mt-3" align="center" justify="center">
         
      <v-col cols="4">
            <v-text-field
              class="ml-6 mr-6"
              v-model="ItemCode"
              label="ItemCodeを入力"
              placeholder="ItemCodeを入力…"
              outlined
              clearable
            ></v-text-field>
      </v-col>
          <v-col cols="4">
            <v-text-field
              class="ml-6 mr-6"
              v-model="ItemName"
              label="ItemNameを入力"
              placeholder="ItemNameを入力…"
              outlined
              clearable
            ></v-text-field>
          </v-col>
 <v-col cols="3">
            <v-text-field
              class="ml-6 mr-6"
              v-model="Price"
              label="単価を入力"
              placeholder="単価を入力…"
              outlined
              clearable
            ></v-text-field>
          </v-col>
        </v-row>

 <v-row class="mb-3 mt-3" align="center" justify="center">
          入力内容　ItemCode: {{ ItemCode }} ItemName: {{ ItemName }} Price: {{ Price }}
          <v-btn
            @click="addDate(ItemCode,ItemName,Price)"
            dark
            small
            color="indigo"
            class="ml-4"
          >
            DBに登録
          </v-btn>
        </v-row>

                <p>表示件数 : {{ count }} 件</p>
        <table border="1" class="mountains-list">
            <thead>
                <tr class="top-label">
                    <th>商品コード</th>
                    <th>商品名</th>
                    <th>単価</th>
                </tr>
            </thead>
            <tbody>
                    <tr v-for="data in store.ItemList" key="mountain.name">
                    <td>{{ data.ItemCode }}</td>
                    <td>{{ data.ItemName }}</td>
                    <td>{{ data.Price }} 円</td>
                    </tr>
            </tbody>
        </table>
    </v-container>
    </div>
</template>

<style scoped>
.body{
    text-align: center;
}
.mountains-list{
      margin: 0 auto;
}

</style>