import styled from "styled-components";

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;
import React from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../ui/constants";
import { useBookings } from "../features/bookings/useBookings";
const Pagination = ({ count }) => {
  const [,setSearchParams] = useSearchParams();

  const { page } = useBookings();
  const pageCount = Math.ceil(count / PAGE_SIZE);

  function handelPrev() {
    const prev = page === 1 ? page : page - 1;
    setSearchParams((searchParams) => {
      searchParams.set("page", prev);
      return searchParams;
    });
  }
  function handelNext() {
    const next = page === pageCount ? page : page + 1;
    setSearchParams((searchParams) => {
      searchParams.set("page", next);
      return searchParams;
    });
  }
  if (pageCount <= 1) return null;
  return (
    <StyledPagination>
      <p>
        Showing <span>{(page - 1) * PAGE_SIZE + 1}</span> to{" "}
        <span>{pageCount === page ? count : page * PAGE_SIZE}</span> of{" "}
        <span>{count}</span> results
      </p>
      <Buttons>
        <PaginationButton onClick={handelPrev} disabled={page === 1}>
          <HiChevronLeft /> <span>Previous</span>
        </PaginationButton>
        <PaginationButton onClick={handelNext} disabled={page === pageCount}>
          <span>Next</span> <HiChevronRight />
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  );
};

export default Pagination;
