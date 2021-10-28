const getDateString = userDate => {
  let date;
  if (userDate) {
    date = new Date(userDate);
  } else {
    date = new Date(Date.now());
  }

  const month =
    date.getMonth() < 10 ? `0${date.getMonth()}` : `${date.getMonth() + 1}`;

  return `${date.getFullYear()}-${month}-${date.getDate()}`;
};

export default getDateString;
