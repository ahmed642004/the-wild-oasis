import { useQuery } from "@tanstack/react-query";
import React from "react";
import TodayActivity from "./TodayActivity";
import { getStaysTodayActivity } from "src/services/apiBookings";

const useTodayActivity = () => {
  const { isLoading, data: todayActivity } = useQuery({
    queryFn: getStaysTodayActivity,
    queryKey: ["today-activity"],
  });
  return { isLoading, todayActivity };
};

export default useTodayActivity;
