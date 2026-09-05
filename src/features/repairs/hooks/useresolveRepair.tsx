import { useMutation ,useQueryClient} from "@tanstack/react-query";

import toast from "react-hot-toast";
import { resolveRepairApi } from "../api/repairsApi";

export function useResolveRepair() {
  const queryClient=useQueryClient();
  const { isPending: isResolvingingRepair, mutate: resolveRepair } = useMutation(
    {
      mutationFn: resolveRepairApi,
      onSuccess: (data) => {
        queryClient.invalidateQueries({queryKey:["all-repairs-list"]})
        toast.success("تعمیر با موفقیت حل شد");
      },
      onError: (err) => {
        toast.error("مشکلی در   حل تعمیر پیش امده است");
      },
    },
  );
  return { isResolvingingRepair, resolveRepair };
}
