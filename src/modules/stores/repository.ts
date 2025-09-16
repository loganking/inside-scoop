import type { Context } from 'hono';
import { eq, sql } from 'drizzle-orm';
import { storeTable } from '../../db/schema';
import { getDB } from '../../db/helpers';
import type { Store } from '../../types';


export const getStores = async (c: Context): Promise<Store[]> => {
  const db = getDB(c);
  return await db
    .select()
    .from(storeTable)
    .prepare()
    .execute();
};

export const getStoreById = async (c: Context, id: string): Promise<Store | undefined> => {
  const db = getDB(c);
  return await db
    .select()
    .from(storeTable)
    .where(eq(storeTable.id, sql.placeholder('id')))
    .prepare()
    .get({ id: id });
};

export const createStore = async (c: Context, data): Promise<Store[]> => {
  const db = getDB(c);
  return await db
    .insert(storeTable)
    .values(data)
    .returning();
};

export const deleteStore = async (c: Context, id: string): Promise<boolean> => {
  const db = getDB(c);
  await db
    .delete(storeTable)
    .where(eq(storeTable.id, sql.placeholder('id')))
    .prepare()
    .run({ id: id });
  return true;
}