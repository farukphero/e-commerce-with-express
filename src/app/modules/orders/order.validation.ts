import { z } from 'zod';

const orderValidationSchema = z.object({
  email: z.string({
    required_error: 'Email name is required',
  }),
  productId: z.string({
    required_error: 'Product Id is required',
  }),
  price: z
    .number({ required_error: 'Price is required.' })
    .min(0, { message: 'Price can not be a negative number.' }),
  quantity: z
    .number({ required_error: 'Quantity is required.' })
    .min(0, { message: 'Quantity can not be a negative number.' }),
});

export default orderValidationSchema;
