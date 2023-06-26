'use client'

import React, { useEffect, useState } from "react";
import { DateTime } from "luxon";

interface Event {
  id: number;
  title: string;
  startDateTime: string;
  timezone: string;
}

interface CountdownTimerProps {
  event: Event;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ event }) => {
  const [remainingTime, setRemainingTime] = useState<string>("");
  const [convertedStartDate, setConvertedStartDate] = useState<string>("");
  const [localStartDate, setLocalStartDate] = useState<string>("");

  useEffect(() => {
    const interval = setInterval(() => {
      const startDateTime = DateTime.fromISO(
        event.startDateTime, 
        { zone: "EST"}
      );

      setLocalStartDate(
        startDateTime
          .setZone('EST')
          .toLocaleString(DateTime.DATETIME_FULL)
      );

      const currentTime = DateTime.utc();
      const remaining = startDateTime.diff(
        currentTime, 
        ["years", "months", "days", "hours", "minutes", "seconds"]
      );
      const convertedStartDateTime = startDateTime.setZone(event.timezone).toLocaleString(DateTime.DATETIME_FULL);

      setRemainingTime(remaining.toFormat("y 'years, ' M 'months, ' d 'days,' hh:mm:ss"));
      setConvertedStartDate(convertedStartDateTime);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [event]);

  return (
    <div>
      <div>Remaining Time: {remainingTime}</div>
      <div>Start Date: {convertedStartDate}</div>
      <div>Start Date (Local): {localStartDate}</div>
    </div>
  );
};

export default CountdownTimer;