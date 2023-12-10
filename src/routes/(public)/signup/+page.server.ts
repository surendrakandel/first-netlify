
// import { fail, redirect, type Actions, type ServerLoad } from '@sveltejs/kit';

// // import { LuciaError, type Session } from 'lucia';
// // import { generateEmailVerificationToken } from '$lib/auth/token';
// import { isValidEmail, sendEmailVerificationLink } from '$src/lib/mail/mailConfig';
// // import { auth } from '$src/lib/auth/lucia';
// export const prerender = false;
// export const load: ServerLoad = async ({ locals }) => {

// };

// export const actions: Actions = {
// 	signup: async ({ request, locals}) => {
// 		const formData = await request.formData();
// 		console.log('Signup Form', formData);
// 		const email = formData.get('email');
// 		const password = formData.get('password');
// 		const name = formData.get('name');
// 		// basic check
// 		if (!isValidEmail(email)) {
// 			return fail(400, { message: 'Invalid email' });
// 		}
// 		console.log('Email is valid');
// 		if (typeof password !== 'string' || password.length < 6 || password.length > 255) {
// 			return fail(400, {
// 				message: 'Invalid password'
// 			});
// 		}
// 		console.log('Password is valid');
// 		try {
// 			console.log('Creating User');
// 			// const user = await auth.createUser({
// 			// 	key: {
// 			// 		providerId: 'email', // auth method
// 			// 		providerUserId: email.toLowerCase(), 
// 			// 		password // hashed by Lucia
// 			// 	},
// 			// 	attributes: {
// 			// 		email: email.toLowerCase(),
// 			// 		email_verified: false,
// 			// 		created_at: new Date().toISOString(),
// 			// 		updated_at: new Date().toISOString(),
// 			// 		id : email.toLowerCase(),
// 			// 		businessId: "",
// 			// 		name: name?.toString().toLocaleLowerCase() || "",
					
// 			// 	}
// 			// });
// 			// const session:Session = await auth.createSession({
// 			// 	userId: user.userId,
// 			// 	attributes: {}
// 			// });
// 			// const token = await generateEmailVerificationToken(user.userId);
// 			// await sendEmailVerificationLink(email, token);
// 			// locals.auth.setSession(session)
			
// 		} catch (e) {
// 			console.log('Error Signup', e);
// 			// this part depends on the database you're using
// 			// check for unique constraint error in user table
// 			// if (e instanceof LuciaError && e.message === 'AUTH_INVALID_USER_ID') {
// 			// 	return fail(400, {
// 			// 		message: 'Username/Account already taken'
// 			// 	});
// 			// }
// 			return fail(500, {
// 				message: 'An unknown error occurred'
// 			});
// 		}
// 		throw redirect(302, "/email-verification");
		
// 	}
// };
