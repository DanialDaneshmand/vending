import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateToggleApi } from "../api/toggleApi";

export function useUpdateToggle() {
  const queryClient = useQueryClient();
  const { isPending: isUpdatingToggle, mutate: updateToggle } = useMutation({
    mutationFn: updateToggleApi,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["device"] });
    },
    onError: (err) => {
      console.log(err);
    },
  });
  return { isUpdatingToggle, updateToggle };
}
