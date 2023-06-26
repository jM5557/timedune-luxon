'use client'

import React from "react";
import { DateTime } from "luxon";

interface TimeConverterProps {
  datetime: string;
  timezone: string;
}

const TimeConverter: React.FC<TimeConverterProps> = ({ datetime, timezone }) => {
  const convertedDateTime = DateTime.fromISO(datetime).setZone(timezone).toLocaleString(DateTime.DATETIME_FULL);

  return (
    <div>
      <h2>Converted Time</h2>
      <p>Original UTC DateTime: {datetime}</p>
      <p>Converted DateTime: {convertedDateTime}</p>
    </div>
  );
};

export default TimeConverter;