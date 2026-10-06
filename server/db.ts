import mysql, { Pool } from 'mysql2/promise';

const DEFAULT_DB_URL =
  process.env.DATABASE_URL ||
  'mysql://rHUHLpc64mrScvX.root:1hCYJl9CIr8XAqNv@gateway01.ap-southeast-1.prod.aws.tidbcloud.com:4000/itzfizz';

let pool: Pool | null = null;

export function getDbPool(): Pool {
  if (!pool) {
    const dbUrl = DEFAULT_DB_URL;
    pool = mysql.createPool({
      uri: dbUrl,
      ssl: {
        rejectUnauthorized: false,
      },
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 10000,
    });
  }
  return pool;
}

export async function initDatabase(): Promise<{ success: boolean; version?: string; currentDb?: string; error?: string }> {
  try {
    const p = getDbPool();

    // Verify connection and database
    const [infoRows]: any = await p.query('SELECT VERSION() as version, DATABASE() as current_db');
    const version = infoRows?.[0]?.version || 'Unknown';
    const currentDb = infoRows?.[0]?.current_db || 'Unknown';

    // Ensure contact_inquiries table exists
    await p.query(`
      CREATE TABLE IF NOT EXISTS contact_inquiries (
        id INT AUTO_INCREMENT PRIMARY KEY,
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        subject VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        status VARCHAR(50) DEFAULT 'new',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    return {
      success: true,
      version,
      currentDb,
    };
  } catch (err: any) {
    console.error('Database initialization error:', err.message);
    return {
      success: false,
      error: err.message,
    };
  }
}

export interface ContactInquiry {
  id?: number;
  fullName: string;
  email: string;
  subject: string;
  message: string;
  status?: string;
  createdAt?: string;
}

export async function saveInquiry(inquiry: {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}): Promise<{ id: number }> {
  const p = getDbPool();
  const [result]: any = await p.execute(
    `INSERT INTO contact_inquiries (full_name, email, subject, message) VALUES (?, ?, ?, ?)`,
    [inquiry.fullName, inquiry.email, inquiry.subject, inquiry.message]
  );
  return { id: result.insertId };
}

export async function getInquiries(limit = 20): Promise<any[]> {
  const p = getDbPool();
  const [rows] = await p.query(
    `SELECT id, full_name, email, subject, message, status, created_at FROM contact_inquiries ORDER BY created_at DESC LIMIT ?`,
    [limit]
  );
  return rows as any[];
}
