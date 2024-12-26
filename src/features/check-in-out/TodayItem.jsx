import styled from "styled-components";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 1fr 2rem 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
  display: inline-block;
`;
import React from "react";
import Tag from "src/ui/Tag";
import { Flag } from "src/ui/Flag";
import Button from "src/ui/Button";
import { Link } from "react-router-dom";
import CheckoutButton from "./CheckoutButton";

const TodayItem = ({ activity }) => {
  const { id, status, guests, numNights } = activity;
  return (
    <StyledTodayItem>
      {status === "unconfirmed" && <Tag type="green">Arriving</Tag>}
      {status === "checked-in" && <Tag type="blue">Departing</Tag>}
      <Guest>{guests.fullName}</Guest>
      <Flag src={guests.countryFlag} alt={guests.nationality} />
      <div>{numNights} nights</div>
      {status === "unconfirmed" && (
        <Button
          size="small"
          variation="primary"
          as={Link}
          to={`/checkin/${id}`}
        >
          Check-in
        </Button>
      )}
      {status === "checked-in" && <CheckoutButton bookingId={id} />}
    </StyledTodayItem>
  );
};

export default TodayItem;
