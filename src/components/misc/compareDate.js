const compareDate = date => {
  const currentDate = new Date();
  const timeDiff = Math.floor((currentDate - date) / 1000);
  let timeDiffStr;

  if (timeDiff < 60) timeDiffStr = `${timeDiff} second(s) ago...`;
  if (timeDiff >= 60) timeDiffStr = `${Math.floor(timeDiff / 60)} minute(s) ago...`;
  if (timeDiff >= 3600) timeDiffStr = `${Math.floor(timeDiff / 3600)} hour(s) ago...`;
  if (timeDiff >= 86400) timeDiffStr = `${Math.floor(timeDiff / 86400)} day(s) ago...`;
  if (timeDiff > 2419200) timeDiffStr = new Date(date).toLocaleDateString();

  return timeDiffStr;
};

export default compareDate;
