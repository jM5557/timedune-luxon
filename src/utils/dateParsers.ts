import { DateTime, Settings, IANAZone } from "luxon";
import timezones from "@/utils/timezones";
import formats from "@/utils/dateFormats";

// Set the locale to get the abbreviated timezone
Settings.defaultLocale = "en";

export const parseTimezoneAbbreviation = (text: string): string | null => {
    const timezoneAbbreviation = text.trim().split(" ").pop()?.toUpperCase();
  
    // Match some of the most common timezone abbreviations
      if (timezoneAbbreviation === "EST" 
          || timezoneAbbreviation === "EDT" 
          || timezoneAbbreviation === "EASTERN"
      )
      return "America/New_York";
    if (
      timezoneAbbreviation === "PST" ||
      timezoneAbbreviation === "PDT" ||
      timezoneAbbreviation === "PT" ||
      timezoneAbbreviation === "PACIFIC"
    )
      return "America/Los_Angeles";
    if (timezoneAbbreviation === "CST" 
          || timezoneAbbreviation === "CDT"
      || timezoneAbbreviation === "CENTRAL"
  )
      return "America/Chicago";
    if (timezoneAbbreviation === "MST" 
      || timezoneAbbreviation === "MDT"
      || timezoneAbbreviation === "MOUNTAIN"
  )
      return "America/Denver";
    if (timezoneAbbreviation === "GMT") return "Europe/London";
    else {
        return getIANATimezone(timezoneAbbreviation ?? "");
    }
}

function getIANATimezone(searchKey: string): string | null {
    const lowercaseSearchKey = searchKey.toLowerCase();
  
    for (const [key, value] of Object.entries(timezones)) {
      if (key.toLowerCase() === lowercaseSearchKey) {
        if (Array.isArray(value) && value.length > 0) {
          return value[0];
        }
      }
    }
  
    return null; // Return null if no matching key or value is found
  }

export const parseDateTimeToUTC = (datetimeStr: string): string | null => {
    let parsedDateTime: DateTime | null = null;
    let parsedZone: string | null = null;

    for (const format of formats) {
        parsedDateTime = DateTime.fromFormat(datetimeStr, format);
        if (parsedDateTime.isValid) {
        parsedZone = parsedDateTime.zoneName;
        break;
        }
    }

    if (parsedDateTime && parsedZone) {
        const utcDateTime = parsedDateTime.setZone("utc");
        return utcDateTime.toISO({ includeOffset: false }) + ` ${parsedZone}`;
    }

    return null;
}

export const toISO8601UTC = (
    dateInput: string, 
    setUtcTimestamp: Function,
    timezoneInput: string
) => {
    const datetime = parseDateTimeFormats(dateInput, timezoneInput);
  
    if (datetime) {
      const utcTimestamp = datetime.toUTC().toISO({ suppressMilliseconds: true });
      setUtcTimestamp(utcTimestamp);
    } else {
      setUtcTimestamp(null);
    }
}

export const parseDateTimeFormats = (
  dateTimeString: string, 
  timezoneInput: string
): DateTime | null => {
    if (!dateTimeString) return null;
  
    for (const format of formats) {
      const parsedDateTime = DateTime.fromFormat(
        dateTimeString, 
        format, 
        { zone: timezoneInput }
      );

      if (parsedDateTime.isValid) {
        return parsedDateTime;
      }
    }
  
    return null;
  }