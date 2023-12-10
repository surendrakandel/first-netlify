
// // import { LuciaError } from 'lucia';
// import { fail, redirect, type Actions, type ServerLoad } from '@sveltejs/kit';
// // import { auth } from '$src/lib/auth/lucia';
// export const prerender = false;
// export const load: ServerLoad = async ({ locals, cookies }) => {
// 	console.log("in server load in login")
// 	const session = await locals.auth.validate();
// 	console.log("seesion is: ", session)
// 	cookies.set('auth-session', JSON.stringify(session), {
// 		httpOnly: false,
// 		secure: false,
// 		sameSite: 'lax',
// 		expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
// 		path: '/'
// 	})
// 	if (session) {
// 		console.log("in session")
// 		if (!session.user.email_verified) throw redirect(302, '/email-verification');
// 		console.log("going to admin")
// 		throw redirect(302, '/admin');
// 	}

// };

// export const actions: Actions = {
// 	login: async ({ request, locals, cookies }) => {
// 		console.log("in login")
// 		const formData = await request.formData();
// 		const email = formData.get('email');
// 		const password = formData.get('password');
// 		if (typeof email !== 'string' || email.length < 1 || email.length > 255) {
// 			return fail(400, {
// 				message: 'Invalid email'
// 			});
// 		}
// 		if (typeof password !== 'string' || password.length < 1 || password.length > 255) {
// 			return fail(400, {
// 				message: 'Invalid password'
// 			});
// 		}
// 		try {
// 			// const key = await auth.useKey('email', email.toLowerCase(), password);
// 			// const session = await auth.createSession({
// 			// 	userId: key.userId,
// 			// 	attributes: {}
// 			// });
// 			// locals.auth.setSession(session);
// 			// cookies.set('auth-session', JSON.stringify(session), {
// 			// 	httpOnly: false,
// 			// 	secure: false,
// 			// 	sameSite: 'lax',
// 			// 	expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
// 			// 	path: '/'
// 			// })
// 		} catch (e) {
// 			console.log("in catch", e)
// 			// if (
// 			// 	e instanceof LuciaError &&
// 			// 	(e.message === 'AUTH_INVALID_KEY_ID' || e.message === 'AUTH_INVALID_PASSWORD')
// 			// ) {
// 			// 	// user does not exist
// 			// 	// or invalid password
// 			// 	return fail(400, {
// 			// 		message: 'Incorrect email or password'
// 			// 	});
// 			// }
// 			return fail(500, {
// 				message: 'An unknown error occurred'
// 			});
// 		}
// 		throw redirect(302, '/admin');
// 	}
// };
