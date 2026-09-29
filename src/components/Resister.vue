<script setup>
import {ref} from 'vue'
import { useBugStore } from '../stores/Upload'

const store = useBugStore()
// actionsを呼び出す処理
const snackbar = ref(false)
const snackbarMessage = ref("")

const createExcel = async () => {
  const requestData = {
    fileName: fileName.value,
    contractList: store.ContractList
    }
    try {

    await store.createExcel(requestData)

    snackbarMessage.value =
        "Excelファイルを作成しました。"
    fileName.value = ""
    snackbar.value = true
    

} catch(error) {

    snackbarMessage.value =
        "Excelファイルの作成に失敗しました。"

    snackbar.value = true

}
}

const fileName = ref("")

</script>

<template>
    <div class="body">
<v-container fluid class="confirm-container">
  <v-snackbar
  v-model="snackbar"
  color="success"
  timeout="3000"
>
  {{ snackbarMessage }}
</v-snackbar>

<div v-if="!store.ContractList||store.ContractList.length===0" class="empty-message">
  PDFファイルをアップロードしてください
</div>

<div v-else>
  <!-- テーブル表示 -->

<v-text-field
  v-model="fileName"
  label="法人名"
  class="filename-input"
/>
<div v-if="store.ContractList">
<div
  v-for="(data, index) in store.ContractList"
  :key="index" class="contract-card">
  <div class="title">
    {{ index + 1 }}件目
  </div>
  <table class="contract-table">
    <tbody>
      <tr>
        <td class="label">被保険者</td>
        <td>
          <v-text-field
            v-model="data.InsuredName"
            style="width: 250px"
            density="compact"
            hide-details
            variant="underlined"
          />
        </td>

        <td class="label">商品</td>
        <td>
          <v-text-field
            v-model="data.Product"
            style="width: 250px"
            density="compact"
            hide-details
            variant="underlined"
          />
        </td>
      </tr>

      <tr>
        <td class="label">証券番号</td>
        <td>
          <v-text-field
            v-model="data.PolicyNumber"
            style="width: 250px"
            density="compact"
            hide-details
            variant="underlined"
          />
        </td>

        <td class="label">払方</td>
        <td>
          <v-text-field
            v-model="data.PaymentMethod"
            style="width: 250px"
            density="compact"
            hide-details
            variant="underlined"
          />
        </td>
      </tr>

      <tr>
        <td class="label">ご契約日</td>
        <td>
          <v-text-field
            v-model="data.ContractDate"
            style="width: 250px"
            density="compact"
            hide-details
            variant="underlined"
          />
        </td>

        <td class="label">満期</td>
        <td>
          <v-text-field
            v-model="data.Type"
            style="width: 250px"
            density="compact"
            hide-details
            variant="underlined"
          />
        </td>
      </tr>

      <tr>
        <td class="label">満了日</td>
        <td>
          <v-text-field
            v-model="data.MaturityDate"
            style="width: 250px"
            density="compact"
            hide-details
            variant="underlined"
          />
        </td>

        <td class="label">保障額</td>
        <td>
          <v-text-field
            v-model="data.Coverage"
            style="width: 250px"
            density="compact"
            hide-details
            variant="underlined"
          />
        </td>
      </tr>

      <tr>
        <td></td>
        <td></td>

        <td class="label">保険料</td>
        <td>
          <v-text-field
            v-model="data.Premium"
            style="width: 250px"
            density="compact"
            hide-details
            variant="underlined"
          />
        </td>
      </tr>
    </tbody>
  </table>
</div>
    <br>
</div>
        <v-btn
        @click="createExcel()"
        dark
        small
        color="indigo"
        class="ml-4"
        >
        ファイル作成
        </v-btn>
        </div>
</v-container>
</div>
</template>

<style scoped>
/* 都道府県ボタン */
.body{
    width:100%;
}
p{
    font-size: large;
    text-align: center;
}
.vbtn{
    margin: 0 auto;   
    text-align: center;
}
.contract-card {
  width: 700px;
  margin: 30px auto;
}

.title {
  width: 120px;
  margin: 0 auto 20px;
  border: 1px solid #000;
  text-align: center;
  font-size: 20px;
}

.contract-table {
  width: 100%;
  border-collapse: collapse;
}

.contract-table td {
  border: 1px solid #000;
  padding: 5px;
}

.label {
  width: 180px;
  font-weight: bold;
  background-color: #f5f5f5;
}

:deep(.v-field) {
  box-shadow: none !important;
}

:deep(.v-field__outline) {
  display: none;
}

.confirm-container{
  width:100%;
  display: flex;
  flex-direction: column;
  align-items:center;
}

.contract-card{
  width:700px;
  margin:30px auto;
}

.empty-message{
  margin-top:120px;
  text-align:center;
  color:#666;
  font-size:22px;
  font-weight:bold;
}

.filename-input{
  width:350px;
  margin:20px auto;
}

:deep(.filename-input input){
  text-align:center;
}

.v-btn{
  margin-top:20px;
}

</style>