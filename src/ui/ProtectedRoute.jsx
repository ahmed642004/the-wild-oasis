import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ProtectedRoute = ({ children }) => {
  const { isLoading, isAuthenticated, fetchStatus } = useUser();
  const navigate = useNavigate();
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading && fetchStatus !== "fetching")
        navigate("/login");
    },
    [isAuthenticated, isLoading, navigate, fetchStatus]
  );
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  return children;
};

export default ProtectedRoute;
