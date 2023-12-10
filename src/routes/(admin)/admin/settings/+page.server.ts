
import { fail, type Actions } from "@sveltejs/kit";
import { eq } from "drizzle-orm";


// export const actions: Actions = {
// 	changeBusinessName: async ({ request, locals }) => {
//         console.log("in changeBusinessName")
// 		const formData = await request.formData();
// 		console.log('formData', formData);
// 		const businessName = formData.get('businessName');
//         const businessId = formData.get('businessId');
// 		console.log('businessName', businessName, businessId);
// 		if (typeof businessName !== 'string' || businessName.length < 3 || businessName.length > 255 || typeof businessId !== 'string' || businessId.length < 3 || businessId.length > 255) {
// 			return fail(400, {
// 				message: 'Invalid password'
// 			});
// 		}
// 		try {
// 			await db.update(businessesTable).set({businessName: businessName}).where(eq(businessesTable.businessId, businessId));
// 		} catch (e) {
// 			return fail(500, {
// 				message: 'An unknown error occurred'
// 			});
// 		}

		
// 	}
// };
