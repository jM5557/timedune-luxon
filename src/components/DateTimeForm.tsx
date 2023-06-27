'use client'

import React, { useState } from "react";
import { parseTimezoneAbbreviation, toISO8601UTC } from "@/utils/dateParsers";

type DateTimeFormProps = {
  initialTimestamp: string,
  onTimestampChange: (timestamp: string) => void,
}

const DateTimeForm: React.FC<DateTimeFormProps> = ({
  initialTimestamp = "",
  onTimestampChange
}) => {
  const [timezoneInput, setTimezoneInput] = useState<string>("");
  const [utcTimestamp, setUtcTimestamp] = useState<string | null>(null);
  const [dateTimeText, setDateTimeText] = useState<string>("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUtcTimestamp(null);

    let text = e.target.value;
    let timezoneAbbreviation = parseTimezoneAbbreviation(e.target.value);

    if (timezoneAbbreviation) {
        let dateValues = e.target.value.split(' ');
        dateValues.pop();
      
        text = dateValues.join(' ');
    } else {
        timezoneAbbreviation = "America/New_York"
    }
    
    toISO8601UTC(
        text,
        setUtcTimestamp,
        timezoneAbbreviation
    );

    setDateTimeText(e.target.value);
    setTimezoneInput(timezoneAbbreviation);

    toISO8601UTC(
      text,
      onTimestampChange,
      timezoneAbbreviation
    );
}

  return (
    <div>
      <h2>Enter Date and Time</h2>
      <input 
        type="text"
        value={dateTimeText}
        onChange = {onChange}
      />
      <h3>{utcTimestamp}</h3>
    </div>
  );
};

export default DateTimeForm;