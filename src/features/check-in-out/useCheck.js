import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckAction() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: updateStatus, isLoading: isUpdatingStatus } = useMutation({
    mutationFn: ({ bookingId, action, breakfast }) => {
      const payload = {
        status: action === "check-in" ? "checked-in" : "checked-out",
        isPaid: action === "check-in",
        ...(action === "check-in" && breakfast ? { ...breakfast } : {}),
      };
      return updateBooking(bookingId, payload);
    },
    onSuccess: (data, variables) => {
      toast.success(`Booking #${data.id} successfully ${variables.action ==="check-in" ? "checked-in" : "checked-out"}`);
      queryClient.invalidateQueries({ active: true });
      // Navigate only if the action is "check-in"
      if (variables.action === "check-in") {
        navigate("/");
      }
    },
    onError: () =>
      toast.error("There was an error while updating the booking status"),
  });

  return { updateStatus, isUpdatingStatus };
}
