import { FIRST_SEGMENT_PATH } from '@constants';
// TODO: using Intl for formatting
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

const format2Digit = (time) => ('0' + time).slice(-2);

const getDayAndMonth = (date) =>
  `${format2Digit(date.getDate())}/${format2Digit(date.getMonth() + 1)}`;

const getFullDate = (date) => {
  const year = date.getFullYear();

  return `${getDayAndMonth(date)}/${year}`;
};

export const getFirstSegmentPath = (pathname) =>
  pathname.split('/')[FIRST_SEGMENT_PATH];

/*
 * create the regex match with the path '/path/:id'
 * '/path/:id' -> split('/') -> ['', 'path', '', ':id']
 *                                     ^ first segment path
 */
export const regexPathCreator = (path) =>
  new RegExp(`(?=.*(${getFirstSegmentPath(path)}))`);

export const debounce = (fn, ms) => {
  let timerId = null;
  return (...arg) => {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(fn, ms, ...arg);
  };
};

/*
 * format relative time
 * */

const A_MILI_SECOND = 1000;
const DateTimeUnits = [
  'second',
  'minute',
  'hour',
  'day',
  'week',
  'month',
  'quarter',
  'year',
];
const DateTimes = [
  1,
  60,
  3_600,
  86_400,
  7 * 86_400,
  30 * 86_400,
  89 * 86_400,
  356 * 86_400,
  Infinity,
];
export const formatRelativeTime = (timestamp) => {
  const rtf = new Intl.RelativeTimeFormat('en', {
    style: 'narrow',
  });

  let fromNow = Math.floor((timestamp - Date.now()) / A_MILI_SECOND);
  let timeIdx = DateTimes.findIndex(
    (dateTime) => dateTime >= Math.abs(fromNow)
  );

  timeIdx = timeIdx > 0 ? timeIdx - 1 : 0;

  const dateTimeUnit = DateTimeUnits[timeIdx];

  fromNow = Math.trunc(fromNow / DateTimes[timeIdx]);

  return rtf.format(fromNow, dateTimeUnit);
};
