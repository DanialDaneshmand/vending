import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { editDeviceApi } from "../api/deviceApi";

export function useEditDevice() {
  const queryClient = useQueryClient();
  const { isPending: isEditingDevice, mutate: editDevice } = useMutation(
    {
      mutationFn: editDeviceApi,
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["device"] });
        toast.success("دستگاه با موفقیت آپدیت شد");
      },
      onError: (err) => {
        toast.error("مشکلی در آپدیت  دستگاه  پیش امده است");
      },
    },
  );
  return { isEditingDevice, editDevice };
}
