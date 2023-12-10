import { redirect, fail, type Actions, type ServerLoad } from '@sveltejs/kit';
// import { generateEmailVerificationToken } from '$src/lib/auth/token';
import { sendEmailVerificationLink } from '$src/lib/mail/mailConfig';
export const prerender = false;
export const load: ServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (!session) throw redirect(302, '/login');
	if (session.user.email_verified) {
		throw redirect(302, '/');
	}
	return {};
};

export const actions: Actions = {
	default: async ({ locals }) => {
		const session = await locals.auth.validate();
		if (!session) throw redirect(302, '/login');
		if (session.user.email_verified) {
			throw redirect(302, '/admin');
		}
		try {
			// const token = await generateEmailVerificationToken(session.user.userId);
			// await sendEmailVerificationLink(session.user.email, token);
			return {
				success: true
			};
		} catch {
			return fail(500, {
				message: 'An unknown error occurred'
			});
		}
	}
};
