import clientApi from "@/shared/clientApi/clientApi";


export async function getAlertListApi(){
    return await clientApi.get("/alerts").then(({data})=>data)
}

export async function getAlertStatsApi(){
    return await clientApi.get("/alerts/stats").then(({data})=>data)
}