<script setup>
import { ref,onMounted} from 'vue'
import { useBugStore } from '../stores/Upload'

const store = useBugStore()
// actionsを呼び出す処理
const contractList = ref([])
onMounted(async()=> {
  try{
    contractList.value=
      await store.getContractList()
  }finally{loading.value = false
  }
})

const formatDate = (date) => {
  if (!date) return ''

  return new Date(date).toLocaleString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}

const loading = ref(true)

</script>

<template>
<v-container>

  <div 
  v-if="loading" 
  class="d-flex justify-center mt-10">
  <div class="table-width text-center">
    <v-progress-circular
    indeterminate
    color="primary"
    class="mb-3"/>
    <div>
    データを読込中です...
    </div>
    </div>
  </div>
  
  <div v-else class="d-flex justify-center">
    <v-table class="table-width">
  <thead>
    <tr>
      <th>ファイル名</th>
      <th>作成日時</th>
      <th>ダウンロード</th>
    </tr>
  </thead>

  <tbody>
    <tr
      v-for="contract in contractList"
      :key="contract.id"
    >
      <td>
        {{ contract.fileName }}
      </td>

      <td>
        {{ formatDate(contract.createdAt) }}
      </td>

      <td>
        <a
          :href="contract.blobUrl"
          target="_blank"
        >
          ダウンロードする
        </a>
      </td>
    </tr>
  </tbody>
</v-table>
</div>
                    
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
.table-width {
  width: 900px;
}

th{
  text-align: center !important;
}
</style>