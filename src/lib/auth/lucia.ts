// import { dev } from '$app/environment';
// import { libsql } from '@lucia-auth/adapter-sqlite';
// import { lucia } from 'lucia';
// import { sveltekit } from 'lucia/middleware';
// import { sqlClient } from '../db';

// // expect error
// export  const auth = lucia({
//     env: dev ? 'DEV' : 'PROD',
//     middleware: sveltekit(),
//     adapter: libsql(sqlClient, {
//       user: 'auth_user',
//       key: 'user_key',
//       session: 'user_session'
//     }),
//     getUserAttributes: (data) => {
//       return {
//         username: data.name,
//         email: data.email,
//         email_verified: data.email_verified,
//         id: data.id,
//         name: data.name,
//         businessId: data.businessId
//       };
//     }
// });

// export type Auth = typeof auth;