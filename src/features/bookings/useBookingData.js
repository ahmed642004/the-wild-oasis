import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

export function useBookingData() {
  const { bookingId } = useParams();
  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ["bookings",bookingId],
    queryFn: () => getBooking(bookingId),
    retry: false,
  });
  return { isLoading, bookings, error };
}
