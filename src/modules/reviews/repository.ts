import type { Context } from 'hono';
import { eq, sql } from 'drizzle-orm';
import { reviewTable } from '../../db/schema';
import { getDB } from '../../db/helpers';
import type { Review } from '../../types';

export const getReviews = async (c: Context): Promise<Review[]> => {
  const db = getDB(c);
  return await db
    .select()
    .from(reviewTable)
    .prepare()
    .execute();
};

export const getReviewById = async (c: Context, id: string): Promise<Review | undefined> => {
  const db = getDB(c);
  return await db
    .select()
    .from(reviewTable)
    .where(eq(reviewTable.id, sql.placeholder('id')))
    .prepare()
    .get({ id: id });
};

export const createReview = async (c: Context, data): Promise<Review[]> => {
  const db = getDB(c);
  return await db
    .insert(reviewTable)
    .values(data)
    .returning();
};

export const deleteReview = async (c: Context, id: string): Promise<boolean> => {
  const db = getDB(c);
  await db
    .delete(reviewTable)
    .where(eq(reviewTable.id, sql.placeholder('id')))
    .prepare()
    .run({ id: id });
  return true;
}