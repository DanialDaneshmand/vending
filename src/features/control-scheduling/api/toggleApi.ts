import clientApi from "@/shared/clientApi/clientApi";

interface UpdateToggletype {
  deviceId: string;
  payload: {
    toggle_interval_s: number;
    toggle_duration_s: number;
    toggle_count: number;
  };
}


export async function updateToggleApi(data: UpdateToggletype) {
  return await clientApi
    .post(`/devices/${data.deviceId}/control/toggle`, data.payload)
    .then(({ data }) => data);
}

export async function getToggleApi(){  
    return await clientApi.get(`/settings`).then(({data})=>data)
}