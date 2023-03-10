// import Register from '@components/authentication/Register';
// import Login from '@components/authentication/Login';
// import Authentication from '@components/pages/Authentication';

export const PATHS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  AUTHENTICATION: 'auth/',
  PROFILE: '/profile',
  CHAT: '/chat',
};

// export const PUBLIC_ROUTE = [
//   {
//     route: PATHS.AUTHENTICATION,
//     component: Authentication,
//     children: [
//       { route: PATHS.LOGIN, component: Login },
//       { route: PATHS.REGISTER, component: Register },
//     ],
//   },
// ];

export const PRIVATE_ROUTE = [];

const ROUTERS = { PATHS, PRIVATE_ROUTE };

export default ROUTERS;
