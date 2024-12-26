import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBookingData } from "./useBookingData";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router-dom";
import { HiArrowUpOnSquare } from "react-icons/hi2";
import { useCheckAction } from "../check-in-out/useCheck";
import Empty from "src/ui/Empty";
const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { bookings, isLoading } = useBookingData();
  const { updateStatus } = useCheckAction();
  const navigate = useNavigate();

  const moveBack = useMoveBack();
  if (isLoading) return <Spinner />;
  if(!bookings) return <Empty resource="booking" />;
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  const { status, id: bookingId } = bookings;
  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={bookings} />
      {status === "unconfirmed" && (
        <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
          Check in
        </Button>
      )}
      {status === "checked-in" && (
        <Button
          icon={<HiArrowUpOnSquare />}
          onClick={() => updateStatus({ bookingId, action: "check-out" })}
        >
          Check out
        </Button>
      )}
      <ButtonGroup>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
