import { time } from "drizzle-orm/mysql-core";
import { DrizzleDB } from "../db/helpers";

export type Context = {
  Bindings: {
    DB: D1Database;
  };
  Variables: {
    user: User | null;
    db: DrizzleDB;
  };
};

export interface User {
    id: string;
    name: string;
    email: string;
    img?: string;
    createdAt: string;
    updatedAt: string;
}

export interface Store {
    id: string;
    name: string;
    address: string | null;
    img?: string;
    description?: string;
    createdAt: string;
    updatedAt: string;
}

export interface Review {
    id: string;
    userId: string;
    storeId: string;
    rating: number;
    comment: string | null;
}