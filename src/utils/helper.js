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
