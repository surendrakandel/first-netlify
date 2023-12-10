export function changeStaffRole(event: any) {
	let user_role_dropdown: any;
	const index = event.target.id.split('_')[1];
	user_role_dropdown = document.getElementById('userrole_' + index);
	user_role_dropdown.style.opacity = '.7';
	user_role_dropdown.disabled = true;
}
