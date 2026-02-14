import { db } from "./schema";

export const DB_VERSION = 1;

export async function ensureDatabaseReady(): Promise<void> {
  try {
    await db.open();
  } catch (e) {
    console.error("IndexedDB open failed:", e);
    throw e;
  }
}
