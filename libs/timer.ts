// Formats milliseconds to a time string in the format hh:mm:ss.
// Divides the milliseconds by 1000 to get seconds, then divides by 60 to get minutes.
// Divides the milliseconds by 1000 * 60 to get minutes, then divides by 60 to get hours.
// Divides the milliseconds by 1000 * 60 * 60 to get hours, then divides by 24 to get days.

// This function is used to format the time in the UI of the application.

type Milliseconds = number;
type Hours = string;
type Minutes = string;
type Seconds = string;
type Time = string;

const divideMod =
  (divisor: number, modulus: number) =>
  (value: number): number =>
    Math.floor((value / divisor) % modulus);

const getSeconds = divideMod(1000, 60);
const getMinutes = divideMod(1000 * 60, 60);
const getHours = divideMod(1000 * 60 * 60, 24);

const padZero = (value: number): string => value.toString().padStart(2, '0');

function FormatMsToTime(ms: Milliseconds): Time {
  const hh: Hours = padZero(getHours(ms));
  const mm: Minutes = padZero(getMinutes(ms));
  const ss: Seconds = padZero(getSeconds(ms));

  return `${hh}:${mm}:${ss}`;
}

export default FormatMsToTime;
