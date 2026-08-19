
import { useQuery } from "@tanstack/react-query";
import { getLocationsApi } from "../api/getLocations";

export default function UseGetLocations(){
    const { data:locations, isLoading:isGettingLocations } = useQuery({
        queryKey: ['locations'],
        queryFn: getLocationsApi

    });
     return {locations,isGettingLocations}
}

