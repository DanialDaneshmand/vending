import { useQuery } from "@tanstack/react-query";
import { getDevicesSection } from "../api/section";

export default function UseGetDevicesSection(id: string) {
  const {
    data: devicesSection,
    isLoading: isGettingDevicesSection,
  } = useQuery({
    queryKey: ["devices-section", id],
    queryFn: () => getDevicesSection(id),
    enabled: !!id,
  });

  return {
    devicesSection,
    isGettingDevicesSection,
  };
}