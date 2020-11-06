const addZero = val => {
  if (val < 10) return `0${val}`;
  return val.toString();
};

// Converts a new Date() to datetime-local input value format
const convertDate = (date, toggleTime = true) => {
  let newMonth = date.getMonth() + 1;
  let newDay = date.getDate();
  const year = date.getFullYear();
  let hour = date.getHours();
  let minutes = date.getMinutes();

  newMonth = addZero(newMonth);
  newDay = addZero(newDay);
  hour = addZero(hour);
  minutes = addZero(minutes);
  const time = toggleTime ? `T${hour}:${minutes}` : '';

  const resultDate = `${year}-${newMonth}-${newDay}${time}`;
  return resultDate;
};

export default convertDate;
