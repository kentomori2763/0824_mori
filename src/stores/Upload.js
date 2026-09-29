import { defineStore } from 'pinia'
import axios, { create } from 'axios'
import { isEmpty } from 'vuetify/lib/util/helpers.mjs'

export const useBugStore = defineStore('bug', {
    state: () => ({
        BugList:[],
        CustomerList:[],
        OrderList:[],
        ItemCode:'',
        ItemName:'',
        ContractList:[],
        SelectedFiles:[]
    }),

    getters:{
        //count:(state)=> state.ItemList.length,
        CustomerCount:(state)=> state.CustomerList.length,
        favo:(state)=>state.favoriteMountain,
        totalElevation:(state)=> {
            return state.favoriteMountain.reduce((sum,item) => 
            {return sum+item.elevation},0) 
            },
        TotalPrice:(state)=> {
            return state.OrderList.reduce((sum,item) => 
            {return sum+item.TotalPrice},0) 
            }
    },

    actions:{
        async readItemList(){
            console.log("商品リスト起動開始")
            const res = await axios.get(`https://m3h-mori-0812container.redplant-bb35adea.japaneast.azurecontainerapps.io/api/SELECT`)
            console.log(res.data.List)
            this.ItemList = res.data.List
        },

        async readCustomerList(){
            console.log("顧客リスト起動開始")
            const res = await axios.get(`https://m3h-mori-0812container.redplant-bb35adea.japaneast.azurecontainerapps.io/api/CUSTOMER`)
            console.log(res.data.List)
            this.CustomerList = res.data.List
        },

        async addData(ItemCode,ItemName,Price){
            if (!ItemCode || isNaN(ItemCode)) {
            console.log("商品コード が入力されていません");
            return;
            }
            const param = {
                ItemCode: ItemCode,
                ItemName: ItemName,
                Price: Price,
            }
            //console.log(param)
            const response = await axios.post('https://m3h-mori-0812container.redplant-bb35adea.japaneast.azurecontainerapps.io/api/INSERT', param); 
            console.log(response.data);

            const res = await axios.get(`https://m3h-mori-0812container.redplant-bb35adea.japaneast.azurecontainerapps.io/api/SELECT`)
            console.log(res.data.List)
            this.ItemList = res.data.List
         },
        async searchOrderByCusCode(CustomerCode){
            if (!CustomerCode || isEmpty(CustomerCode)) {
            console.log("顧客コード が入力されていません");
            return;
            }
            
            const res = await axios.get('https://m3h-mori-0812container.redplant-bb35adea.japaneast.azurecontainerapps.io/api/OrderListByCusCode', 
                {
                    params:{CustomerCode:CustomerCode}
                }); 
            console.log(res.data.List);
             this.OrderList = res.data.List
        },

        async sendPdf(files){
            if (!files) {
            console.log("ファイルが選択されていません"); 
            return;
            }
            const formData = new FormData()
            for(let i=0;i<files.length;i++){
                formData.append('files',files[i])
                console.log(files[i].name);
            }
        try{
            const res = await axios.post('https://m3h-mori-0812container.redplant-bb35adea.japaneast.azurecontainerapps.io/api/scan',formData
            //https://m3h-mori-0812container.redplant-bb35adea.japaneast.azurecontainerapps.io
            //     }
            // }
            )
        console.log("成功");
        console.log(res.data);
        this.ContractList = res.data;
        }catch(error){
            console.error("アップロード失敗");
            console.error(error);
        }},

async createExcel(requestData) {

    if (!requestData) {
        console.log("ファイルが選択されていません")
        return
    }

    try {

        // 保存先を先に選択
        const handle = await window.showSaveFilePicker({
            suggestedName: '法人名_Y2加入者一覧.xlsx'
        })

        const writable = await handle.createWritable()

        // Excel生成API実行
        const res = await axios.post(
            'https://m3h-mori-0812container.redplant-bb35adea.japaneast.azurecontainerapps.io/api/scan/excel',
            requestData,
            {
                responseType: 'blob'
            }
        )

        const blob = new Blob(
            [res.data],
            {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            }
        )

        // 保存
        await writable.write(blob)
        await writable.close()

        this.ContractList = null

    } catch (error) {
        console.error("Excel作成失敗")
        console.error(error)
    }
},
        async getContractList() {
            try {
                const res = await axios.get(
                    "https://m3h-mori-0812container.redplant-bb35adea.japaneast.azurecontainerapps.io/api/contracts"
                )
                console.log("取得結果：",res)
                console.log("取得データ：",res.data)
                return res.data
        } catch (error) {
            console.error(error)
        }
}
}})