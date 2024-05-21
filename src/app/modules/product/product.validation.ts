import { z } from 'zod';

const variantsValidationSchema = z.object({
  type: z.string({
    required_error: 'Variants type is required',
  }),
  value: z.string({
    required_error: 'Variants value is required',
  }),
});

const inventoryValidationSchema = z.object({
  quantity: z
    .number({ required_error: 'Quantity is required.' })
    .min(0, { message: 'Quantity can not be a negative number.' }),
  inStock: z.boolean({ required_error: 'In-stock status is required.' }),
});

const productValidationSchema = z.object({
  name: z.string({
    required_error: 'Product name is required',
  }),
  description: z.string({
    required_error: 'Product description is required',
  }),
  price: z
    .number({ required_error: 'Price is required.' })
    .min(0, { message: 'Price can not be a negative number.' }),
  category: z.string({
    required_error: 'Category is required',
  }),
  tags: z.array(z.string(), {
    required_error: 'At least one tag is required.',
  }),
  variants: z.array(variantsValidationSchema, {
    required_error: 'At least one variant is required.',
  }),
  inventory: inventoryValidationSchema,
});

export default productValidationSchema;
