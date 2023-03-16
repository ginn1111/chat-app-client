import { CommonErrorMessage, ErrorCode } from '@constants';

const commonErrorHandler = (errorCode) => {
  if (errorCode === ErrorCode.NETWORK) {
    return CommonErrorMessage.NETWORK;
  } else if (errorCode === ErrorCode.INTERNAL_SERVER) {
    return CommonErrorMessage.SERVER;
  }
};

export default commonErrorHandler;
