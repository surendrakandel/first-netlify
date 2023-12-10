
import { fail, redirect, type Actions, type ServerLoad } from '@sveltejs/kit';
// import { isValidPasswordResetToken, validatePasswordResetToken } from '$src/lib/auth/token';
// import { auth } from '$src/lib/auth/lucia';
export const prerender = false;
export const load: ServerLoad = async ({ params }) => {
	const { token } = params;
	if (!token) {
		throw redirect(302, '/password-reset');
	}
	// const validToken = await isValidPasswordResetToken(token);
	// if (!validToken) {
	// 	throw redirect(302, '/password-reset');
	// }
	return {};
};

export const actions: Actions = {
	default: async ({ request, params, locals,platform }) => {
		const formData = await request.formData();
		const password = formData.get('password');
		// basic check
		if (typeof password !== 'string' || password.length < 6 || password.length > 255) {
			return fail(400, {
				message: 'Invalid password'
			});
		}
		try {
			const { token } = params;
			if (!token)
				return fail(400, {
					message: 'Invalid Token'
				});
			// const userId = await validatePasswordResetToken(token);
			// if (!userId) {
			// 	return fail(400, {
			// 		message: 'Invalid Token'
			// 	});
			// }
			// let user = await auth.getUser(userId);
			// await auth.invalidateAllUserSessions(user.userId);
			// await auth.updateKeyPassword('email', user.email, password);
			// if (!user.email_verified) {
			// 	user = await auth.updateUserAttributes(user.userId, {
			// 		email_verified: true
			// 	});
			// }
			// const session = await auth.createSession({
			// 	userId: user.userId,
			// 	attributes: {}
			// });
			// locals.auth.setSession(session);
		} catch (e) {
			return fail(400, {
				message: 'Invalid or expired password reset link'
			});
		}
		throw redirect(302, '/');
	}
};
