import * as z from 'zod';

export const createStoreSchema = z.object({
  name: z.string().min(2).max(100),
  address: z.string().max(200).optional(),
  img: z.string().url().optional(),
  description: z.string().max(5000).optional(),
});

export const editStoreSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(2).max(100),
  address: z.string().max(200).optional(),
  img: z.string().url().optional(),
  description: z.string().max(5000).optional(),
});