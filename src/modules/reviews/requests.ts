import * as z from 'zod';

export const createReviewSchema = z.object({
  userId: z.string().min(1),
  storeId: z.string().min(1),
  rating: z.number().min(1).max(5),
  comment: z.string().max(5000).optional(),
});

export const editReviewSchema = z.object({
  id: z.string().min(1),
  userId: z.string().min(1),
  storeId: z.string().min(1),
  rating: z.number().min(1).max(5),
  comment: z.string().max(5000).optional(),
});