import clientApi from "../clientApi/clientApi";


export async function getAllSectionsApi(){
    return await clientApi.get("/locations/sections/list").then(({data})=>data)
}