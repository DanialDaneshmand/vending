import clientApi from "@/shared/clientApi/clientApi";



export async function getSectionsApi(id:string|null){
    return await clientApi.get(`/locations/sections/list?location_id=${id}`).then(({data})=>data)
}