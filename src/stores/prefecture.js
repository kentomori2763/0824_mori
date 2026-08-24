import { defineStore } from 'pinia'
import axios from 'axios'
import { isEmpty } from 'vuetify/lib/util/helpers.mjs'

export const usePrefectureStore = defineStore('prefecture', {
    state: () => ({
        ItemList:[],
        CustomerList:[],
        OrderList:[],
        ItemCode:'',
        ItemName:''
    }),

    getters:{
        count:(state)=> state.ItemList.length,
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
        // async readOrderList(){
        //     console.log("受注リスト起動開始")
        //     const res = await axios.get(`https://m3h-mori-0812container.redplant-bb35adea.japaneast.azurecontainerapps.io/api/ORDER`)
        //     console.log(res.data.List)
        //     this.OrderList = res.data.List
        // },

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
        }

    }
})