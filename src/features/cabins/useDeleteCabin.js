import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";
import { useDeleteEntity } from "../bookings/useDeleteEntity"; // Adjust the import path as needed

export function useDeleteCabin() {
  return useDeleteEntity(deleteCabinApi, "cabin");
}
