export const formatDate = (d) => {
  const date = new Date(d);
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);

  return `${year}-${month}-${day}`;
};

const check = (input) => input.current.isValid;
export const checkInputIsValid = (...args) => args.every(check);

export const fmtFromFileReader = (src) =>
  src.replace(/(data:image\/.+;base64,)/, '');

export const convertImageToBase64 = (imgFile, loadHandler) => {
  var reader = new FileReader();
  reader.onload = loadHandler;
  reader.readAsDataURL(imgFile); // --> when onload finish, we receive base64 code string
};

const format2Digit = time => ('0' + time).slice(-2);

const getFullDate = (date) => {
  const day = format2Digit(date.getDate());
  const mon = format2Digit(date.getMonth() + 1);
  const year = date.getFullYear();

  return `${day} ${mon} ${year}`;
}

const getFullTime = date => {
  const splitDate = date.toLocaleTimeString().split(' ');
  const timeWithHourAndMinute = splitDate[0].split(':').slice(0, 2).join(':')

  return `${timeWithHourAndMinute} ${splitDate[1]}`;
}

export const formatTime = (time) => {
  const date = new Date(time);
  const fmtTime = getFullTime(date);

  return date.getTime() > Date.now() ? getFullDate(date) + ' ' + fmtTime : fmtTime;
}

export const getOfflineTime = timestamp => {
  if (!timestamp) return;
  const timeObj = {
    month: 2592000,
    week: 648000,
    day: 86400,
    hour: 3600,
    minute: 60
  }
  timestamp = (new Date().getTime() - timestamp) / 1000;
  if (timestamp > (timeObj.month * 12)) return new Date(timestamp).toLocaleDateString({ day: 'numeric', month: 'numeric', year: 'numeric' });
  return timestamp >= timeObj.month ? Math.round(timestamp / timeObj.month) + 'mon'
    : timestamp >= timeObj.week ? Math.round(timestamp / timeObj.week) + 'w'
      : timestamp >= timeObj.day ? Math.round(timestamp / timeObj.day) + 'd'
        : timestamp >= timeObj.hour ? Math.round(timestamp / timeObj.hour) + 'h'
          : timestamp >= timeObj.minute ? Math.round(timestamp / timeObj.minute) + 'm'
            : 'just now';
}
