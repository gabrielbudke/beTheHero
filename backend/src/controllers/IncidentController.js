const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const ong_id = request.headers.authorization;
        //const incidents = await connection('incidents').select('*');
        const incidents = await connection('incidents').select('*').where('ong_id', ong_id);

        return response.json( incidents );
    },

    async create(request, response) {
        const { title, description, value } = request.body;
        
        /**
         *  Quando falamos de autenticação de login a informação de 
         *  quem está logado vem através do cabeçalho da requisição.
         * 
         *  Guarda o contexto da nossa requisição. Vem dados da 
         *  autenticação do usuário, da localização geográfica.
         */

        const ong_id = request.headers.authorization;

        // const [id] -> retorna o primeiro valor na variável 'id'
        const [id] = await connection('incidents').insert({
            title, description, value, ong_id
        });

        return response.json({ id });
    },

    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        console.log(id);
        const incidents = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

        if(incidents.ong_id !== ong_id) {
            return response.status(401).json({ error: 'Operation not permitted' });
        }

        await connection('incidents').where('id', id).delete();

        return response.status(204).send();

    }
}