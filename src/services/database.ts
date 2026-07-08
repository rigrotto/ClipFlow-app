import Database from "@tauri-apps/plugin-sql";
import type { Clip } from "../types/clip";

let db: Database | null = null;

export async function initDatabase() {
  db = await Database.load("sqlite:clipflow.db");

  await db.execute(`
    CREATE TABLE IF NOT EXISTS clips (
      id TEXT PRIMARY KEY,
      type TEXT NOT NULL,
      content TEXT NOT NULL,
      pinned INTEGER NOT NULL,
      created_at TEXT NOT NULL
    )
  `);
}

export async function saveClip(clip: Clip) {
  if (!db) return;

  await db.execute(
    `INSERT OR REPLACE INTO clips (id, type, content, pinned, created_at)
     VALUES ($1, $2, $3, $4, $5)`,
    [
      clip.id,
      clip.type,
      clip.content,
      clip.pinned ? 1 : 0,
      clip.createdAt.toISOString(),
    ]
  );
}

export async function loadClips(): Promise<Clip[]> {
  if (!db) return [];

  const rows = await db.select<
    {
      id: string;
      type: string;
      content: string;
      pinned: number;
      created_at: string;
    }[]
  >(`SELECT * FROM clips ORDER BY pinned DESC, created_at DESC`);

  return rows.map((row) => ({
    id: row.id,
    type: row.type as Clip["type"],
    content: row.content,
    pinned: row.pinned === 1,
    createdAt: new Date(row.created_at),
  }));
}

export async function updateClipPinned(id: string, pinned: boolean) {
  if (!db) return;

  await db.execute(
    `UPDATE clips SET pinned = $1 WHERE id = $2`,
    [pinned ? 1 : 0, id]
  );
}

export async function deleteClipFromDatabase(id: string) {
  if (!db) return;

  await db.execute(
    `DELETE FROM clips WHERE id = $1`,
    [id]
  );
}

export async function clearClipsFromDatabase() {
  if (!db) return;

  await db.execute(`DELETE FROM clips`);
}