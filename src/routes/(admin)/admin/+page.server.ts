import { getBusinessCount } from '$src/apis/business/get_business_count';
import { CreateUser } from '$src/apis/createUser';
import type { Load, ServerLoad } from '@sveltejs/kit';
import { getBasicInfo } from '$src/apis/business/get_basic_info';
import { clerkClient } from '$src/lib/auth';
import type { User } from '@clerk/backend';


export const load: ServerLoad = async function load({ fetch, cookies, locals}) {
	if(!cookies.get('first-auth')){
		let user:User = await clerkClient.users.getUser(locals?.session?.userId || "");
		console.log('user is', user)
		let businssCount = await getBusinessCount()
		let fullName = ""
		if(user.firstName != "" && user.lastName != ""){
			fullName = user.firstName + " " + user.lastName
		}else{
			fullName = user.firstName  ? user.firstName: ""
		}
		await CreateUser(fetch,user.emailAddresses[0].emailAddress, businssCount, fullName, user.id)
		await clerkClient.users.updateUserMetadata(locals?.session?.userId || "", {
			publicMetadata: {
				businessId: businssCount,
				email: user.emailAddresses[0].emailAddress,
				accountOpened: true,
			}
		})
		let firstsUser = {
			user:{
				businessId: businssCount,
				email: user.emailAddresses[0].emailAddress ,
			}
		} 
		let stringCookie =JSON.stringify(firstsUser);
		cookies.set('first-auth',stringCookie , {
			httpOnly: false,
			secure: false,
			sameSite: 'lax',
			expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
			path: '/'
		})
	}
	let basicInfo = await getBasicInfo(fetch)
	if(basicInfo.business?.businessId == "" || !basicInfo.business?.businessId){
		throw("Business not found")
	}
	return basicInfo;
		
}	
