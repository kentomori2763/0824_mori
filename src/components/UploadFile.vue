<script setup>
import { ref,onMounted} from 'vue'
import { useBugStore } from '../stores/Upload'
import {useRouter} from 'vue-router'

const router = useRouter()
const store = useBugStore();
const sendPdf = store.sendPdf
const loading =ref(false)

// actionsを呼び出す処理
onMounted(() => {
  if(store.SelectedFiles.length>0){
    files.value = store.SelectedFiles
  }
  })

let files =ref([])
const fileInput = ref(null)
    const onFileChange = (event) => {
      files.value = Array.from(event.target.files)
      store.SelectedFiles = files.value
    }

  const uploadExecute = async () => {

      try {
        loading.value = true
        await sendPdf(files.value)
        router.push("/regist")
      } catch (e) {
        console.error(e)
      } finally {
        loading.value = false
      }
  }

</script>

<template>
  <div class="body">
    <v-overlay
      :model-value="loading"
      class="align-center justify-center"
      persistent
    >
      <v-progress-circular
        indeterminate
        size="80"
        color="primary"
      />
    </v-overlay>
    <v-container fluid class="upload-container">
    <div class="content-wrapper">
    <div v-if="files.length" class="file-list">
      <v-card class="upload-card">
        <br>
          <table class="selectedList">
            <thead>
              <tr>
                <th>No</th>
                <th>ファイル名</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="(file, index) in files"
                :key="index"
              >
                <td>{{ index + 1 }}</td>
                <td class="file-name">{{ file.name }}</td>
              </tr>
            </tbody>

          </table>
          <br>
        <br>
      </v-card>
    </div>
      <br>
      <div class="upload-area">
      <input
          ref="fileInput"
          type="file"
          multiple
          @change="onFileChange"
          style="display: none;"
        />
        <v-btn @click="fileInput.click()">
            ファイル選択
            </v-btn>
      <br><br>
        <v-btn
          color="indigo"
          :loading="loading"
          :disabled="loading"
          @click="uploadExecute"
        >
          アップロード実行
        </v-btn>
        </div>
        </div>
    </v-container>
</div>
</template>

<style scoped>
.content-wrapper{
    width: 700px;
    margin:0 auto;
}
.body{
    width:100%;
}
.upload-area{
    width: 700px;
    display: flex;
    flex-direction: column;
    align-items:center;
}
.selectedList{
      margin: 0 auto;
}
.upload-container{
    width:100%;
    max-width: none !important;
    display: flex;
    flex-direction: column;
    align-items:center;
}
.file-list{
    width: 100%;
    display: flex;
    justify-content: center;
}

.upload-card {
    width: 700px;
    margin: 0 auto;
    padding: 20px;
}

.file-name{
  text-align:left;
  padding-left:20px;
  text-decoration: underline;
}

</style>