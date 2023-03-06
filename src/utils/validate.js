/**
 * Validate password with some constraints:
 *  Least one uppercase, lowercase letter.
 *  Least one digit
 *  Do not have space (tab)
 *  Least 8 characters
 */
export const validatePassword = (password) => {
  const regexPassword =
    /(?=.*[A-Z]+)(?=.*[a-z]+)(?=.*\d+)(?=.*[^\w]+)(?=.*[^\s]){8,}/g;

  return regexPassword.test(password);
};

/**
 * Validate email with some constraints:
 *  Start with lowercase or uppercase character or underscore (_)
 *  Having exactly one sign '@' and dot (.)
 *  After a sign '@' and dot (.) must have least one any character except space
 * */
export const validateEmail = (email) => {
  const regexEmail = /^[a-zA-Z_]+\S*@\S+\.\S+$/gi;
  return regexEmail.test(email);
};

export const validateEmpty = (value) => {
  return value.trim() !== '';
};

/**
 * Validate the phone with some constraints:
 *  Start at 0 digit
 *  Have exactly 10 digit
 */
export const validatePhone = (phone) => {
  const regexPhone = /^0\d{9}$/g;
  return regexPhone.test(phone);
};
