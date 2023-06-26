'use client'

import React, { useState } from "react";
import { DateTime } from "luxon";
import TimeConverter from "./TimeConverter";
import CountdownTimer from "./CountdownTimer";
import { parseDateTimeFormats, parseDateTimeToUTC, parseTimezoneAbbreviation, toISO8601UTC } from "@/utils/dateParsers";

const DateTimeForm: React.FC = () => {
    const [dateInput, setDateInput] = useState<string>("");
    const [timezoneInput, setTimezoneInput] = useState<string>("");
    const [utcTimestamp, setUtcTimestamp] = useState<string | null>(null);

    const [dateTimeText, setDateTimeText] = useState<string>("");

  return (
    <div>
      <h2>Enter Date and Time</h2>
      <input 
        type="text"
        value={dateTimeText}
        onChange = {
            (e) => {
                setUtcTimestamp(null);

                let text = e.target.value;
                let timezoneAbbreviation = parseTimezoneAbbreviation(e.target.value);

                if (timezoneAbbreviation) {
                    let dateValues = e.target.value.split(' ');
                    dateValues.pop();
                    
                    setDateInput(dateValues.join(' '));
                    text = dateValues.join(' ');
                } else {
                    timezoneAbbreviation = "America/New_York"
                    setDateInput(e.target.value);
                }
                
                toISO8601UTC(
                    text,
                    setUtcTimestamp,
                    timezoneAbbreviation
                );

                setDateTimeText(e.target.value);
                setTimezoneInput(timezoneAbbreviation);
            }
        }
      />
      <h1>{dateInput}</h1>
      <h2>{timezoneInput}</h2>
      <h3>{utcTimestamp}</h3>

      {utcTimestamp !== null && (
        <div>
            <br />
            <br />
          <TimeConverter
            datetime={utcTimestamp}
            timezone={timezoneInput}
          />
          <CountdownTimer
            event = {{
                id: 1,
                title: "My Event",
                startDateTime: utcTimestamp,
                timezone: timezoneInput
            }}
          />
          <br />
          <br />
        </div>
      )}
    </div>
  );
};

export default DateTimeForm;