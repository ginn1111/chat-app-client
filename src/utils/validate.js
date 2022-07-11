export const validatePassword = (password) => {
  const regexPassword =
    /(?=.*[A-Z]+)(?=.*[a-z]+)(?=.*\d+)(?=.*[^\w]+)(?=.*[^\s]){8,}/g;

  return regexPassword.test(password);
};

export const validateEmail = (email) => {
  const regexEmail = /^[a-zA-Z_]+.*@.+$/gi;
  return regexEmail.test(email);
};

export const validateEmpty = (value) => {
  return value.trim() !== '';
};

export const validatePhone = (phone) => {
  const regexPhone = /^0[\d]{2}[-_\s]*[\d]{3}[-_\s]*[\d]{4}$/g;
  return [regexPhone.test(phone), phone.replace(/(-_\s)/g, '')];
};
