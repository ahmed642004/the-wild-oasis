import Button from "../../ui/Button";
import { useCheckAction } from "./useCheck";

function CheckoutButton({ bookingId }) {
  const { updateStatus, isUpdatingStatus } = useCheckAction();
  return (
    <Button
      variation="primary"
      size="small"
      onClick={() => updateStatus({ bookingId, action: "check-out" })}
      disabled={isUpdatingStatus}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
