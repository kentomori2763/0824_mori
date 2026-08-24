import { defineStore } from 'pinia'
import axios from 'axios'
import { ref } from 'vue'
import OrderList from '@/components/OrderList.vue'
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
        getMountainRank(
        temp,wind,rain){
        if(rain ===0 && wind < 5 &&temp>=5){
        return "A";}
        if(rain<1 && wind < 10 && temp >=0){
        return "B";}
        return "C";}
        ,
        favoriteM(mountain){
            const exists = this.favoriteMountain.some(item => item.name === mountain.name)
            console.log(exists)
            if (!exists) {
                this.favoriteMountain.push(mountain)
                //console.log(this.favoriteMountain.length)
            }else{
                alert("すでに追加されてます。")
            }
        },

        deleteM(index) {
            this.favoriteMountain.splice(index,1)
            console.log("消しました")
        },

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

        // async selectMountain(prefID){
        //     let weather = ref(0)
        //     let current = ref(0)
        //     const result = []
        //     console.log("セレクト起動開始")
        //     const res = await axios.get(`https://mountix.codemountains.org/api/v1/mountains?tag=1&prefecture=${prefID}`)
        //     console.log(res.data.mountains)
        //     for(const mountain of res.data.mountains){
        //     console.log("for文開始", mountain.name,mountain.location.latitude)
        //     weather = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${mountain.location.latitude}&longitude=${mountain.location.longitude}&current=temperature_2m,precipitation,wind_speed_10m`)
        //     //await new Promise(resolve => setTimeout(resolve, 1000))
        //     console.log(weather.data.current.temperature_2m);
        //     current = weather.data.current
        //     result.push({
        //         name: mountain.name,
        //         prefectures: mountain.prefectures,
        //         elevation: mountain.elevation,
        //         temperature: current.temperature_2m,
        //         wind: current.wind_speed_10m,
        //         rain: current.precipitation,
        //         rank:this.getMountainRank(
        //         current.temperature_2m,
        //         current.wind_speed_10m,
        //         current.precipitation)
        //         })
        //     }
        //     this.mountains = result
        // },

    }
})