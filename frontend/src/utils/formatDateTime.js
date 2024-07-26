// utils/formatDateTime.js
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function formatDateTime(date) {
  const dateObj = new Date(date);
  const month = monthNames[dateObj.getMonth()];
  const day = dateObj.getDate();
  const year = dateObj.getFullYear();
  const hour = dateObj.getHours();
  const minute = dateObj.getMinutes();
  return `(${hour.toString().padStart(2, "0")}:${minute
    .toString()
    .padStart(2, "0")})  ${month} ${day}, ${year} `;
}
