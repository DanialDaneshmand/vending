import clientApi from "../clientApi/clientApi";



export async function getDevicesListApi(){
    return await clientApi.get("/devices").then(({data})=>data)
}

export async function getDeviceDetailApi(id:string){
    return await clientApi.get(`/devices/${id}`).then(({data})=>data)
}

export async function deleteDeviceWeeklyScheduleApi(id:string){
    return await clientApi.delete(`/schedules/devices/${id}`).then(({data})=>data)
}