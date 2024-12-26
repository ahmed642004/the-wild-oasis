import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import { useDeleteEntity } from "./useDeleteEntity"; // Adjust the import path as needed

export function useDeleteBooking() {
  return useDeleteEntity(deleteBookingApi, "bookings");
}
