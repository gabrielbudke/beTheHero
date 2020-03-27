const connection = require('../database/connection');
const crypto = require('crypto'); // Pacote para criptografia

module.exports = {
    async index (request, response) {
        const ongs = await connection('ongs').select('*');
        return response.json( ongs );
    }, 
    
    async create (request, response) {
        const { name, email, whatsapp, city, uf } = request.body;
        
        /* Gera caractestes de 4 bytes aleatórios e converte para 
           uma string hexadecimal. */
        const id = crypto.randomBytes(4).toString('HEX');

        await connection('ongs').insert({
            id, name, email, whatsapp, city, uf
        });

        return response.json({ id });
    }
}
