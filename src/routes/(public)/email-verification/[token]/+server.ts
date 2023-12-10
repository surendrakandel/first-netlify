import { backendUrl } from '$src/apis/config';
import { CreateUser } from '$src/apis/createUser';
// import { auth } from '$src/lib/auth/lucia';
// import { validateEmailVerificationToken } from '$src/lib/auth/token';
import { users } from '$src/lib/db/schemas/user';
import { sendWelcomEmail } from '$src/lib/mail/mailConfig';
import type { RequestHandler } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
export const GET: RequestHandler = async ({ params, locals, platform }) => {
	try {
		const { token } = params;
		if (!token) {
			return new Response('Invalid email verification link', {
				status: 400
			});
		}
		// const userId = await validateEmailVerificationToken(token);
		// if (!userId) {
		// 	return new Response('Invalid email verification link', {
		// 		status: 400
		// 	});
		// }
		// const user = await auth.getUser(userId);
		const res = await fetch(`${backendUrl}/business/business_count`, {
			credentials: 'include',
			headers: {
			  'Content-Type': 'application/json',
			},
			method: 'GET'
		  });
		const businessId = await res.text();
		// await auth.invalidateAllUserSessions(user.userId);
		// console.log("currentBusinessCount from request",businessId)
		// await auth.updateUserAttributes(user.userId, {
		// 	email_verified: true,
		// 	businessId: businessId,
		// });
		// await db.update(users).set({businessId: businessId}).where(eq(users.id, user.userId))
		// const session = await auth.createSession({
		// 	userId: user.userId,
		// 	attributes: {
		// 	}
		// });
		// locals.auth.setSession(session);
		// await CreateUser(session.user.email, businessId , session.user.email)
		// sendWelcomEmail(user.email);
		return new Response(null, {
			status: 302,
			headers: {
				Location: '/admin',
			}
		});
	} catch (e){
		console.log("error in email verification",e)
		return new Response('Invalid email verification link', {
			status: 400
		});
	}
};
