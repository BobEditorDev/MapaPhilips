/**
 * API Serverless para Contador de Visitas Persistente no Vercel
 * Usa PostgreSQL (Neon) para armazenamento persistente
 */

import { Pool } from 'pg';

const VISITS_KEY = 'mapa-philips-visits';

// Configuração do pool de conexões PostgreSQL
const pool = new Pool({
    connectionString: process.env.DATABASE_URL || process.env.POSTGRES_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

/**
 * Inicializar tabela se não existir
 */
async function initializeTable() {
    const client = await pool.connect();
    try {
        await client.query(`
            CREATE TABLE IF NOT EXISTS visit_counter (
                id SERIAL PRIMARY KEY,
                key VARCHAR(50) UNIQUE NOT NULL,
                visits INTEGER NOT NULL DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        
        // Inserir registro inicial se não existir
        await client.query(`
            INSERT INTO visit_counter (key, visits) 
            VALUES ($1, 0) 
            ON CONFLICT (key) DO NOTHING;
        `, [VISITS_KEY]);
    } finally {
        client.release();
    }
}

/**
 * Obter número atual de visitas
 */
async function getVisits() {
    const client = await pool.connect();
    try {
        const result = await client.query(
            'SELECT visits FROM visit_counter WHERE key = $1',
            [VISITS_KEY]
        );
        return result.rows.length > 0 ? result.rows[0].visits : 0;
    } finally {
        client.release();
    }
}

/**
 * Incrementar contador de visitas
 */
async function incrementVisits() {
    const client = await pool.connect();
    try {
        const result = await client.query(`
            UPDATE visit_counter 
            SET visits = visits + 1, 
                updated_at = CURRENT_TIMESTAMP 
            WHERE key = $1 
            RETURNING visits;
        `, [VISITS_KEY]);
        
        return result.rows.length > 0 ? result.rows[0].visits : 1;
    } finally {
        client.release();
    }
}

export default async function handler(req, res) {
    // Configurar CORS para permitir requisições do frontend
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        // Inicializar tabela se necessário
        await initializeTable();
        
        if (req.method === 'GET') {
            // Obter número atual de visitas
            const visits = await getVisits();
            return res.status(200).json({ visits: parseInt(visits) });
            
        } else if (req.method === 'POST') {
            // Incrementar contador de visitas
            const newVisits = await incrementVisits();
            
            return res.status(200).json({ 
                visits: newVisits,
                success: true 
            });
            
        } else {
            return res.status(405).json({ 
                error: 'Method not allowed',
                allowed: ['GET', 'POST'] 
            });
        }
    } catch (error) {
        console.error('Erro na API de visitas (PostgreSQL):', error);
        return res.status(500).json({ 
            error: 'Erro interno do servidor',
            fallback: true 
        });
    }
}