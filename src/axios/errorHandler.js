import { CommonErrorMessage, ErrorCode } from '@constants';

const commonErrorHandler = (error) => {
  console.log(error)
  if (
    (error.response === undefined &&
      error?.code !== ErrorCode.CANCEL_REQUEST) || error?.code === ErrorCode.NETWORK
  ) {
    return CommonErrorMessage.NETWORK;
  } else if (error.response.status === ErrorCode.INTERNAL_SERVER) {
    return CommonErrorMessage.SERVER;
  }
};

export default commonErrorHandler;
