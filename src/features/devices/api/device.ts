import clientApi from "@/shared/clientApi/clientApi";



export async function deleteDeviceApi(id:string){
    return await clientApi.delete(`/devices/${id}`).then(({data})=>data)
}