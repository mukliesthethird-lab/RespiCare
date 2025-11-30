import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'respicare.db');
const db = new Database(dbPath);

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Initialize database schema
export function initializeDatabase() {
  // Users table
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT,
      email TEXT UNIQUE NOT NULL,
      password TEXT,
      role TEXT DEFAULT 'user',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Add role column if it doesn't exist (migration for existing databases)
  try {
    db.exec(`ALTER TABLE users ADD COLUMN role TEXT DEFAULT 'user'`);
  } catch (error: any) {
    // Column already exists, ignore error
    if (!error.message.includes('duplicate column')) {
      console.error('Error adding role column:', error);
    }
  }

  // Prediction history table
  db.exec(`
    CREATE TABLE IF NOT EXISTS prediction_history (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      chronic_cough REAL NOT NULL,
      asthma REAL NOT NULL,
      copd REAL NOT NULL,
      respiratory_infection REAL NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  // Create index for better query performance
  db.exec(`
    CREATE INDEX IF NOT EXISTS idx_prediction_user_date 
    ON prediction_history(user_id, created_at DESC)
  `);
}

// Initialize on first import
initializeDatabase();

// User operations
export const userDb = {
  create: (id: string, email: string, password: string, name?: string) => {
    const stmt = db.prepare('INSERT INTO users (id, email, password, name, role) VALUES (?, ?, ?, ?, ?)');
    return stmt.run(id, email, password, name, 'user');
  },

  findByEmail: (email: string) => {
    const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
    return stmt.get(email) as { id: string; email: string; password: string; name: string | null; role: string; created_at: string } | undefined;
  },

  findById: (id: string) => {
    const stmt = db.prepare('SELECT id, email, name, role, created_at FROM users WHERE id = ?');
    return stmt.get(id) as { id: string; email: string; name: string | null; role: string; created_at: string } | undefined;
  },

  findAll: (limit = 50) => {
    const stmt = db.prepare('SELECT id, email, name, role, created_at FROM users ORDER BY created_at DESC LIMIT ?');
    return stmt.all(limit) as { id: string; email: string; name: string | null; role: string; created_at: string }[];
  },

  updateProfile: (id: string, name: string, email: string) => {
    const stmt = db.prepare('UPDATE users SET name = ?, email = ? WHERE id = ?');
    return stmt.run(name, email, id);
  },

  updatePassword: (id: string, hashedPassword: string) => {
    const stmt = db.prepare('UPDATE users SET password = ? WHERE id = ?');
    return stmt.run(hashedPassword, id);
  },

  setRole: (id: string, role: 'user' | 'admin') => {
    const stmt = db.prepare('UPDATE users SET role = ? WHERE id = ?');
    return stmt.run(role, id);
  },

  getPasswordById: (id: string) => {
    const stmt = db.prepare('SELECT password FROM users WHERE id = ?');
    const result = stmt.get(id) as { password: string } | undefined;
    return result?.password;
  },

  count: () => {
    const stmt = db.prepare('SELECT COUNT(*) as count FROM users');
    const result = stmt.get() as { count: number };
    return result.count;
  }
};

// Prediction operations
export const predictionDb = {
  create: (id: string, userId: string, results: { chronicCough: number; asthma: number; copd: number; respiratoryInfection: number }) => {
    const stmt = db.prepare(`
      INSERT INTO prediction_history 
      (id, user_id, chronic_cough, asthma, copd, respiratory_infection) 
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    return stmt.run(id, userId, results.chronicCough, results.asthma, results.copd, results.respiratoryInfection);
  },

  findByUserId: (userId: string, limit = 10) => {
    const stmt = db.prepare(`
      SELECT * FROM prediction_history 
      WHERE user_id = ? 
      ORDER BY created_at DESC 
      LIMIT ?
    `);
    return stmt.all(userId, limit);
  },

  findById: (id: string) => {
    const stmt = db.prepare('SELECT * FROM prediction_history WHERE id = ?');
    return stmt.get(id);
  },

  getAllRecent: (limit = 10) => {
    const stmt = db.prepare(`
      SELECT ph.*, u.name as user_name, u.email as user_email
      FROM prediction_history ph
      LEFT JOIN users u ON ph.user_id = u.id
      ORDER BY ph.created_at DESC 
      LIMIT ?
    `);
    return stmt.all(limit);
  },

  count: () => {
    const stmt = db.prepare('SELECT COUNT(*) as count FROM prediction_history');
    const result = stmt.get() as { count: number };
    return result.count;
  },

  countByUserId: (userId: string) => {
    const stmt = db.prepare('SELECT COUNT(*) as count FROM prediction_history WHERE user_id = ?');
    const result = stmt.get(userId) as { count: number };
    return result.count;
  }
};

export default db;
