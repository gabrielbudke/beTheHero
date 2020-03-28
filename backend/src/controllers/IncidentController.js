const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { page = 1 } = request.query;

        const [count] = await connection('incidents').count();
        
        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'incidents.*', 
                'ongs.name', 
                'ongs.email', 
                'ongs.whatsapp', 
                'ongs.city', 
                'ongs.uf'
            ]);

        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);
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