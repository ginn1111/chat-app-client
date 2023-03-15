import * as Yup from 'yup';

const ERROR_MESSAGES = {
  REQUIRED: 'Required!',
  EMAIL: 'Email invalid!',
  MIN_LEN_4: 'At least 4 characters!',
  PASSWORD:
    'Password has at least one uppercase, one lowercase, one digital, one specify character, not has space and at least 8 characters!',
};

const REGEX = {
  /**
   * Regex password: this regex has at least one uppercase, one lowercase, one digital, one specify character, doesn't space at any position and at least 8 characters
   */
  PASSWORD:
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-={}[\]|:;"'<>,.?~`])(?=\S+$).{8,}$/,
  /**
   * Regex email: start with alphanumeric characters, dot, underscore, percent sign, plus sign, hyphen sign
   *  follow by '@' symbol. Then domain name consist of alphanumeric characters, dot sign and hyphen sign
   *  end with top-level domain that has at least 2 characters
   */
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
};

const YUP_SCHEMAS = {
  EMAIL: Yup.string()
    .required(ERROR_MESSAGES.REQUIRED)
    .matches(REGEX.EMAIL, ERROR_MESSAGES.EMAIL),
  PASSWORD: Yup.string()
    .required(ERROR_MESSAGES.REQUIRED)
    .matches(REGEX.PASSWORD, ERROR_MESSAGES.PASSWORD),
};

export const registerSchema = Yup.object({
  email: YUP_SCHEMAS.EMAIL,
  password: YUP_SCHEMAS.PASSWORD,
  username: Yup.string()
    .required(ERROR_MESSAGES.REQUIRED)
    .min(4, ERROR_MESSAGES.MIN_LEN_4),
});

export const loginSchema = Yup.object({
  email: YUP_SCHEMAS.EMAIL,
  password: Yup.string().required(ERROR_MESSAGES.REQUIRED),
});
