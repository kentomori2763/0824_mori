<script setup>
    import { ref } from "vue"
    import axios from 'axios'
 
    import { useWorkReportStore } from '../stores/workReport'
    const workReportStore = useWorkReportStore()
 
    import { useRouter } from 'vue-router'
    const router = useRouter()
 
    const file = ref(null)
    const targetMonth = ref('')
 
    const onFileChange = (event) => {
      file.value = event.target.files[0]
    }
 
    const compareReport = async () => {
      if (!file.value) {
        console.log("ファイルが選択されていません");
        return;
      }
      if (!targetMonth.value) {
        console.log("対象月が選択されていません");
        return;
      }
 
      workReportStore.targetMonth = targetMonth.value
 
      const param = {
        employee_no: workReportStore.employeeNo,
        target_month: targetMonth.value
      };
 
    //   実際のAPI URLに置き換えてください
    //   const response = await axios.post('https://m3h-emasasaki-containerapp.ashystone-cccb8584.japaneast.azurecontainerapps.io/api/SELECTMONTH%27, param);
    //   workReportStore.diffList = response.data;
    //   router.push('/result');
    };
</script>
 
 
<template>
    <div>
     
      <h1 style = "padding: 20px">勤怠記録突合</h1>
 
      <div align="center">
 
      <p>PDFファイル：</p>
      <input type = "file" @change="onFileChange">
 
      <br>
      <br>
 
      <p>社員名：{{ workReportStore.employeeNo }}</p>
      <p>対象月：<input type = "month" v-model="targetMonth"></p>
 
      <br><br>
 
      <v-btn
        @click="compareReport"
        dark
        small
        color="indigo"
        class="ml-4"
        >
         突合実行
        </v-btn>
 
        <br><br>
 
        <v-btn class="mb-3 btn-toFavorite" @click="$router.push('/regist')">
          勤怠登録画面へ移動する
        </v-btn>
      </div>
    </div>
</template>