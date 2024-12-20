import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'dev.db');
export const db = new Database(dbPath);

// Enable foreign keys
db.exec('PRAGMA foreign_keys = ON;');

export const exec = (query: string, ...params: any[]) => {
  return db.prepare(query).run(...params);
}

export const query = <T = void>(query: string, ...params: any[]) => {
  return db.prepare(query).all(...params) as T[];
}

export type RenderStatus = "complete" | "created" | "failed" | "pending" | "rendering" | string;

export type Video = {
  id: number;
  title: string;
  description: string | null;
  created_at: number;
  render_records?: RenderRecord[];
}

export type Image = {
  id: number;
  video_id: number;
  editframe_id: string;
  filename: string;
  caption: string | null;
  created_at: number;
}

export type RenderRecord = {
  id: number;
  video_id: number;
  render_id: string;
  status: RenderStatus;
  created_at: number;
  updated_at: number;
}

export async function initializeDatabase() {
  if (process.env.NODE_ENV !== 'test') {
    try {
      // Ensure tables exist
      await createTables();
      console.log('✅ Database tables created/verified');
    } catch (error) {
      console.error('❌ Database initialization failed:', error);
      throw error;
    }
  }
}

export function createTables() {
  db.exec(/* SQL */`
    CREATE TABLE IF NOT EXISTS videos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      created_at INTEGER DEFAULT (unixepoch())
    );

    CREATE TABLE IF NOT EXISTS images (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      video_id INTEGER NOT NULL,
      editframe_id TEXT NOT NULL,
      filename TEXT NOT NULL,
      caption TEXT,
      created_at INTEGER DEFAULT (unixepoch()),
      FOREIGN KEY (video_id) REFERENCES videos(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS render_records (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      video_id INTEGER NOT NULL,
      render_id TEXT NOT NULL,
      status TEXT NOT NULL,
      created_at INTEGER DEFAULT (unixepoch()),
      updated_at INTEGER DEFAULT (unixepoch()),
      FOREIGN KEY (video_id) REFERENCES videos(id) ON DELETE CASCADE
    );
  `);
} 