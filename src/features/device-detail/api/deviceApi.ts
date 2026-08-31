import clientApi from "@/shared/clientApi/clientApi";


export async function getDeviceAlertsApi(deviceId:string,location_id:string){
    return await clientApi.get(`/alerts?device_id=${deviceId}&location_id=${location_id}`).then(({data})=>data)
}


export async function addManualInventoryApi(data:{deviceId:string,payload:{delta:number,reason:string}}){
    
    return await clientApi.post(`/devices/${data.deviceId}/manual-inventory-transaction`,data.payload).then(({data})=>data)
}
