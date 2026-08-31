import { useQuery } from "@tanstack/react-query";
import { getDeviceAlertsApi } from "../api/deviceApi";

export default function useGetDeviceAlerts(deviceId: string,locationId:string) {
  const {
    data: deviceAlerts,
    isLoading: isGettingDeviceAlerts,
  } = useQuery({
    queryKey: ["device", deviceId,locationId],
    queryFn: () => getDeviceAlertsApi(deviceId,locationId),
    enabled: !!deviceId,
  });

  return {
    deviceAlerts,
    isGettingDeviceAlerts,
  };
}