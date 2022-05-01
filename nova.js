const axios = require('axios');
const knex = require('knex');
const knexfile = require('./knexfile').development;
const db = knex(knexfile);
const e = console.log;
const URL = 'https://novo.bysat.com.br/api/login';


const teste = () => {
    const user = {
        usuario: 'comlurb',
        senha: 'comlurbrj'
    }
    

    axios.post(URL, user)
        .then(data => {
            const token = data.data.token;
            e(token);
            axios({
                method: 'GET',
                url: 'https://novo.bysat.com.br/api/getPosicaoTelemetria?id_veiculo=68833&periodo_inicio=2022-04-19 00:00:00&periodo_fim=2022-04-19 23:59:59&status=a',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Bearer ${token}`,
                    'Cache-Control': 'no-cache'
                }
            })
                .then((result) => {
                    e(result)
                }).catch((err) => {
                    console.log(err);
                });
        })
        .catch(error => e(error))
}


teste();







