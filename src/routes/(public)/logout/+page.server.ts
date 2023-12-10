// import { auth } from "$src/lib/auth/lucia";
import { fail, redirect, type ServerLoad, type Actions } from "@sveltejs/kit";
export const prerender = false;
export const load: ServerLoad = async ({ locals,platform }) => {
	console.log("in logout")
    const session = await locals.auth.validate();
    if (!session) return fail(401);
    // await auth.invalidateSession(session?.sessionId); // invalidate session
    locals.auth.setSession(null); // remove cookie
    throw redirect(302, "/login"); // redirect to login page
};

export const actions: Actions = {
	logout: async ({ locals,platform }) => {
		const session = await locals.auth.validate();
		if (!session) return fail(401);
		// await auth.invalidateSession(session.sessionId); // invalidate session
		// locals.auth.setSession(null); // remove cookie
		throw redirect(302, "/login"); // redirect to login page
	}
};