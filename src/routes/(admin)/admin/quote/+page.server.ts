import { redirect } from "@sveltejs/kit";

export async function load({ setHeaders, locals }:any) {
    const session = locals.session.userId
	if (!session) throw redirect(302, '/login');
	setHeaders({
                'Cache-Control': 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0',
                'Pragma': 'no-cache',
                'Expires': '0',
                'language': 'en',
	});
}
