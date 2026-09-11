// Minimal structured logging (no framework). Single-line JSON events with
// stable event names for diagnosis: contact flow, provider status, and problems.
// Sensitive values (message body, email addresses, API keys) are never logged.

export type LogFields = Record<string, string | number | boolean | undefined>;

export type Logger = (event: string, fields?: LogFields) => void;

export function createLogger(): Logger {
  return (event, fields) => {
    const line = JSON.stringify({ t: new Date().toISOString(), event, ...fields });
    console.log(line);
  };
}

/** Logger that does nothing — used where logging is not wanted (tests). */
export const silentLogger: Logger = () => {};
