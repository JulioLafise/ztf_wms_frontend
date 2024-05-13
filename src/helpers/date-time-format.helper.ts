const monthsArray = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
const daysArray = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
let AMPM: 'am' | 'pm' = 'am';

export const dateTimeFormat = (dateData?: Date) => {
  const request = dateData ? new Date(dateData) : new Date();
  // FORMATS
  const day = request.getDate();
  const dayName = daysArray[request.getDay()];
  const month = monthsArray[request.getMonth()];
  const year = request.getFullYear();
  const dateFormat = `${day}-${month}-${year}`;

  const hours24hrs = request.getHours();
  const hours12hrs = request.getHours() > 12 ? request.getHours() - 12 : request.getHours();
  AMPM = request.getHours() > 12 ? 'pm' : 'am';
  const minutes = request.getMinutes() < 10 ? `0${request.getMinutes()}` : request.getMinutes();
  const time24hrs = `${hours24hrs}:${minutes}`;
  const time12hrs = `${hours12hrs}:${minutes} ${AMPM}`;

  return {
    // DATE
    day,
    dayName,
    month,
    year,
    date: request,
    dateFormat,
    // TIME
    hours24hrs,
    hours12hrs,
    minutes,
    time24hrs,
    time12hrs,
  };
};