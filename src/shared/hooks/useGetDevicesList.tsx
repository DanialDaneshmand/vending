import { useQuery } from "@tanstack/react-query";
import { getDevicesListApi } from "../api/device";

export default function UseGetDevicesList() {
  const { data: devicesList, isLoading: isGettingDevicesList } = useQuery({
    queryKey: ["devices"],
    queryFn: getDevicesListApi,
  });
  return { devicesList, isGettingDevicesList };
}
