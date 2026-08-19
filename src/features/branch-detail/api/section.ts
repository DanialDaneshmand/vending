import clientApi from "@/shared/clientApi/clientApi";



export async function createSectionApi(data:{name:string,location_id:string}){
    return await clientApi.post("/locations/sections",data).then(({data})=>data);
}

export async function deleteSectionApi(id:string){
    return await clientApi.delete(`/locations/sections/${id}`).then(({data})=>data);
}

export async function getDevicesSection(sectionId:string){
    return await clientApi.get(`/devices/${sectionId}`).then(({data})=>data);
}