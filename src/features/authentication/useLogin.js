import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: (credentials) => loginApi(credentials),
    onSuccess: data => {
        queryClient.setQueryData(['user'], data.user);
        toast.success('Login successful');
        navigate('/dashboard', { replace: true });
      },
    onError: (err) => {
      console.log(err);
      toast.error("Provided email or password are incorrect");
    },
  });
  return { login, isLoading };
}
