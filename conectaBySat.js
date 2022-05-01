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
            axios({
                method: 'GET',
                url: 'https://novo.bysat.com.br/api/getUltimaPosicao?status=a',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Bearer ${token}`,
                    'Cache-Control': 'no-cache'
                }
            })
                .then((result) => {
                    salvaDados(result.data);
                }).catch((err) => {
                    console.log(err);
                });
        })
        .catch(error => e(error))
}

const salvaDados = async (datas) => {
    let obj = {}


    for (let d of datas) {

        obj['id_veiculo'] = d.id_veiculo;
        obj['latitude'] = d.latitude;
        obj['longitude'] = d.longitude;
        obj['placa'] = d.placa;
        obj['rpm'] = d.rpm
        obj['veiculo'] = d.veiculo;
        obj['velocidade'] = d.velocidade;
        obj['time'] = new Date();

        const respose = await db('Velocidades').insert(obj);


    }
}

let count = 0;

// teste();

setInterval(() => {

    teste();

    e(count);
    count++;

}, 120000)





