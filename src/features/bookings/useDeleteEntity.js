import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
export function useDeleteEntity(entityApiFn, entityQueryKey) {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteEntity } = useMutation({
    mutationFn: entityApiFn,
    onSuccess: () => {
      toast.success(`${entityQueryKey}successfully deleted`);
      queryClient.invalidateQueries({
        queryKey: [entityQueryKey],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isDeleting, deleteEntity };
}
