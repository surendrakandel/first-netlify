export function load({ setHeaders }:any) {
	setHeaders({
        'Cache-Control': 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0',
        'Pragma': 'no-cache',
        'Expires': '0',
	});
}
