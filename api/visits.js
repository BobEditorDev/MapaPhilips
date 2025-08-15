/**
 * API Serverless para Contador de Visitas Persistente no Vercel
 * Usa Vercel KV para armazenamento persistente
 */

import { kv } from '@vercel/kv';

const VISITS_KEY = 'mapa-philips-visits';

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
        if (req.method === 'GET') {
            // Obter número atual de visitas
            const visits = await kv.get(VISITS_KEY) || 0;
            return res.status(200).json({ visits: parseInt(visits) });
            
        } else if (req.method === 'POST') {
            // Incrementar contador de visitas
            const currentVisits = await kv.get(VISITS_KEY) || 0;
            const newVisits = parseInt(currentVisits) + 1;
            
            await kv.set(VISITS_KEY, newVisits);
            
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
        console.error('Erro na API de visitas:', error);
        return res.status(500).json({ 
            error: 'Erro interno do servidor',
            fallback: true 
        });
    }
}