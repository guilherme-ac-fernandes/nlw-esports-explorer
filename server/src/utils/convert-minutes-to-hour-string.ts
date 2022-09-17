const convertMinutesToHourString = (timeMinutes: number) => {

  const hours = Math.floor(timeMinutes/60);
  const minutes = timeMinutes % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;

};

export default convertMinutesToHourString;
