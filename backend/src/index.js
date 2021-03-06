const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express(); 

app.use(cors());
app.use(express.json());

/**
 * Rota é o caminho completo
 * Recurso é o que vem depois da barra(as vezes associadoa alguma entidade)
 */

/**
 * Métodos HTTP:
 * 
 * GET: usamos quando queremos buscar uma informação do back-end
 * POST: criar uma informação no back-end
 * PUT: quando queremos alterar uma informação no back-end
 * DELETE: deletar uma informação no back-end
 */

/**
 * Tipos de parâmetros:
 * 
 * Query Params: São parâmetros enviados na rota/url. 
 *               Geralmente são usados para paginação e filtro.
 *               Exemplo: /users?nome=Gabriel
 *               Para acessar as informações -> request.query
 *               
 * Route Params: São parâmentrs utilizados para identificar recursos/entidades.
 *               Exemplo: /users/:id -> usado para buscar apenas UM usuário .
 *               Para acessar as informações -> request.params
 * 
 * Request Body: corpo da requisição utilizado para criar ou alterar recursos 
 */

/**
 * SQL: MySQL, SQLite, PostgreSQL, Oracle, Microsoft SQL Server
 * NoSQL: MongoDB, CouchDB, etc
 */

app.use(routes);

app.listen(3333);
