import clientApi from "../clientApi/clientApi";


export async function getLocationsApi(){
    return clientApi.get("/locations").then(({data})=>data)
}