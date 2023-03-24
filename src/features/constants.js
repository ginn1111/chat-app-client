export const LoadingStatus = {
  PENDING: 'Pending',
  IDLE: 'Idle',
  FULFILLED: 'Fulfilled',
  REJECTED: 'Rejected',
};

export const PREFIX = {
  AUTHENTICATION: 'authentication',
  FRIEND: 'friend',
};

/*
 * Don't change here, this status depend on generator status of redux*/
const REJECTED = '/rejected';
const PENDING = '/pending';

const fnFactoryAction =
  (status) =>
  (prefix) =>
  ({ type }) =>
    type.endsWith(status) && type.startsWith(prefix);

export const actionNameGenerator = (prefix) => (name) => `${prefix}/${name}`;

export const pendingStatusAction = fnFactoryAction(PENDING);
export const rejectedStatusAction = fnFactoryAction(REJECTED);
