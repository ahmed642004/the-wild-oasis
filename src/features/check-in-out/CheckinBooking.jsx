import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";
import CheckBox from "../../ui/Checkbox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import { useMoveBack } from "../../hooks/useMoveBack";
import Spinner from "../../ui/Spinner";
import { useBookingData } from "../bookings/useBookingData";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import { useCheckAction } from "./useCheck";
import { useSettings } from "../settings/useSettings";
import Checkbox from "../../ui/Checkbox";
const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const { bookings, isLoading } = useBookingData();
  const { updateStatus, isUpdatingStatus } = useCheckAction();
  const { settings, isLoading: isLoadingSettings } = useSettings();
  useEffect(() => setConfirmPaid(bookings?.isPaid ?? false), [bookings]);
  const moveBack = useMoveBack();
  if (isLoading) return <Spinner />;
  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = bookings;

  const optionalBreakfastPrice =
    settings?.breakfastPrice * numNights * numGuests;

  function handleCheckin() {
    if (!confirmPaid) return;
    if (addBreakfast) {
      updateStatus({
        bookingId,
        action: "check-in",
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
      });
    } else {
      updateStatus({ bookingId, action: "check-in", breakfast: {} });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={bookings} />
      {bookings.status === "unconfirmed" && !hasBreakfast && (
        <Box>
          <Checkbox
            id={"breakfast"}
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((add) => !add);
              setConfirmPaid(false);
            }}
          >
            Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
          </Checkbox>
        </Box>
      )}

      {bookings.status === "unconfirmed" && (
        <Box>
          <Checkbox
            disabled={(bookings.isPaid && !addBreakfast) || isUpdatingStatus}
            checked={confirmPaid || (bookings.isPaid && !addBreakfast)}
            onChange={() => setConfirmPaid((confirm) => !confirm)}
            id={"confirm"}
          >
            I confirm that {guests.fullName} has paid the total amount of{" "}
            {!addBreakfast
              ? formatCurrency(totalPrice)
              : !bookings.isPaid
              ? `${formatCurrency(
                  totalPrice + optionalBreakfastPrice
                )} (${formatCurrency(totalPrice)} cabin + ${formatCurrency(
                  optionalBreakfastPrice
                )} breakfast)`
              : `${formatCurrency(optionalBreakfastPrice)} breakfast`}
          </Checkbox>
        </Box>
      )}

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
