import type { Context } from 'hono';
import { eq, sql } from 'drizzle-orm';
import { userTable } from '../../db/schema';
import { getDB } from '../../db/helpers';
import type { User } from '../../types';

export const getUsers = async (c: Context): Promise<User[]> => {
  const db = getDB(c);
  return await db
    .select()
    .from(userTable)
    .prepare()
    .execute();
};

export const getUserById = async (c: Context, id: string): Promise<User | undefined> => {
  const db = getDB(c);
  return await db
    .select()
    .from(userTable)
    .where(eq(userTable.id, sql.placeholder('id')))
    .prepare()
    .get({ id: id });
};

export const createUser = async (c: Context, data): Promise<User[]> => {
  const db = getDB(c);
  return await db
    .insert(userTable)
    .values(data)
    .returning();
};

export const deleteUser = async (c: Context, id: string): Promise<boolean> => {
  const db = getDB(c);
  await db
    .delete(userTable)
    .where(eq(userTable.id, sql.placeholder('id')))
    .prepare()
    .run({ id: id });
  return true;
}