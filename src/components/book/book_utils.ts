import type { quoteRequest } from "$src/types/quote";
import { z } from "zod";

export function validateBookRequest(currentQuote: quoteRequest): boolean {
  const zod_quote_request = z.object({
    shipmentInfo: z.object({
      shipmentValue: z.number().refine((value) => value > 0 && value < 1000000, {
        message: 'Shipment Value must be between 0 and 1,000,000'
      }),
      pickupDate: z.string()
    }),
    commodities: z
      .array(
        z.object({
          weight: z.number().refine((value) => value > 0 && value < 30000, {
            message: 'Weight must be between 50 and 7000 lbs'
          }),
          length: z.number().refine((value) => value > 0 && value <= 75, {
            message: 'Length must be between 0 and 75'
          }),
          width: z.number().refine((value) => value > 0 && value <= 75, {
            message: 'Width must be between 0 and 75'
          }),
          height: z.number().refine((value) => value > 0 && value <= 75, {
            message: 'Height must be between 0 and 75'
          }),
          packageType: z.number().min(0).max(19),
          description: z.string().min(2)
        })
      )
      .min(1),
    pickup: z.object({
      address: z.object({
        zipCode: z.string().min(5).max(5)
      })
    }),
    delivery: z.object({
      address: z.object({
        zipCode: z.string().min(5).max(5)
      })
    })
  });
  let validShipmentValue =  currentQuote?.shipmentInfo && currentQuote?.shipmentInfo?.shipmentValue > 0 &&
  currentQuote.shipmentInfo.shipmentValue < 1000000 ? true : false;
  const result = zod_quote_request.safeParse(currentQuote);
  return result?.success && validShipmentValue == true;
}
