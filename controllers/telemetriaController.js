const knex = require('knex');
const knexfile = require('../knexfile').development;
const db = knex(knexfile);
const axios = require('axios');
const e = console.log;
const URL = 'https://novo.bysat.com.br/api/login';



module.exports.getAll = (req, res) => {

    const user = {
        usuario: 'comlurb',
        senha: 'comlurbrj'
    }

    const veiculo = req.body.veiculo;
    const inicio = req.body.inicio;
    const fim = req.body.fim;


    db('frotaComlurb')
        .where('PrefixoVeiculo', veiculo.toLowerCase())
        .then(data => {

            if (data.length === 0) {
                res.status(401).json(new Error('Deu merda'));
                return;
            }

            const query = data[0].PlacaVeiculo + '&periodo_inicio=' + inicio + '&periodo_fim=' + fim + '&status=a'
            const url = 'https://novo.bysat.com.br/api/getPosicaoTelemetria?placa=' + query;


            axios.post(URL, user)
                .then(data => {
                    const token = data.data.token;
                    e(token);

                    axios({
                        method: 'GET',
                        url: url,
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Authorization': `Bearer ${token}`,
                            'Cache-Control': 'no-cache'
                        }
                    })
                        .then((data) => {
                            res.status(200).json(data.data);
                        }).catch((err) => {
                            e(err);
                            e(url);
                            res.status(401).json(err.data);
                        });
                })
                .catch(error => e(error))

        })
        .catch(error => {
            e(error);
            res.status(401).json(error);
        })



}




