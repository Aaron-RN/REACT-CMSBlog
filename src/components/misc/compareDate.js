const compareDate = (serverDate, date) => {
  const serverDateConverted = serverDate.substring(0, serverDate.indexOf('+'));
  const currentDate = new Date(serverDateConverted);
  const convertedDate = new Date(date);
  const timeDiff = Math.floor((currentDate - convertedDate) / 1000);

  let timeDiffStr;

  if (timeDiff < 60) timeDiffStr = `${timeDiff} second(s) ago...`;
  if (timeDiff >= 60) timeDiffStr = `${Math.floor(timeDiff / 60)} minute(s) ago...`;
  if (timeDiff >= 3600) timeDiffStr = `${Math.floor(timeDiff / 3600)} hour(s) ago...`;
  if (timeDiff >= 86400) timeDiffStr = `${Math.floor(timeDiff / 86400)} day(s) ago...`;
  if (timeDiff > 2419200) timeDiffStr = convertedDate.toLocaleDateString();

  return timeDiffStr;
};

export default compareDate;
