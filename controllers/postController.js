const knex = require('knex');
const knexfile = require('../knexfile').development;
const db = knex(knexfile);
const e = console.log;

module.exports.getAll = async (req, res) => {

    let action = req.query.action;
    //req.body.Label = JSON.stringify(req.body.Label)

    res.header("Access-Control-Allow-Origin", "*");

    switch (action) {


        case 'persisteParadas':


            db('Paradas').insert(req.body)
                .then(data => {
                    res.status(200).json(data);
                })
                .catch(error => {
                    res.status(401).json(error);
                })
            break;

        case 'deleteParadas':

            db('Paradas')
                .where('Sequencia', req.body.Sequencia)
                .andWhere('RotaID', req.body.RotaID)
                .del()
                .then(data => {
                    res.status(200).json(data);
                })
                .catch(error => {
                    res.status(401).json(error);
                })
            break;


        case 'deleteAllParadas':

            db('Paradas')
                .where('RotaID', req.body.RotaID)
                .del()
                .then(data => {
                    res.status(200).json(data);
                })
                .catch(error => {
                    res.status(401).json(error);
                })
            break;

        case 'updateParadas':
            e(req.body);

            db('Paradas')
                .where('Sequencia', req.body.Sequencia)
                .andWhere('RotaID', req.body.RotaID)
                .update({
                    Latitude: req.body.Latitude,
                    Longitude: req.body.Longitude,
                    Icon: req.body.Icon,
                    Label: JSON.stringify(req.body.Label),
                    Title: req.body.Title,
                    Bairro: req.body.Bairro,
                    Logradouro: req.body.Logradouro,
                })
                .then(data => {
                    res.status(200).json(data);
                })
                .catch(error => {
                    console.log(error);
                    res.status(401).json(error);
                })
            break;

        case 'persisteRotas':

            const rota = req.body.rota;
            const len = rota.length;
            const rest = len % 340;

            let parts = 1;
            if (len > 340) {
                let soma = (len - rest) / 340;
                parts += soma;
            };

            e(`$ Parts ${parts} Len ${len}  Rest ${rest}`);

            let partsArray = [];

            for (let index = 0; index <= parts - 1; index++) {
                let init = index * 340;
                let end = init + 340;
                let part = rota.slice(init, end);
                partsArray.push(part);
            }

            let count = 0;

            for await (const [index, value] of partsArray.entries()) {

                db('Rotas').insert(value)
                    .then(data => {
                        if (index === parts - 1) {
                            res.status(200).json(data);
                        }
                    })
                    .catch(error => {
                        e(req.body);
                        e(error);
                        res.status(401).json(error);
                    })
            }

            break;

        case 'deleteRotas':

            console.log(req.body.Sequencia);
            console.log(req.body.RotaID);

            db('Rotas')
                .where('Sequencia', req.body.Sequencia)
                .andWhere('RotaID', req.body.RotaID)
                .del()
                .then(data => {
                    res.status(200).json(data);
                })
                .catch(error => {

                    res.status(401).json(error);
                })
            break;

        case 'deleteAllRotas':

            console.log(req.body.Sequencia);
            console.log(req.body.RotaID);

            db('Rotas')
                .where('RotaID', req.body.RotaID)
                .del()
                .then(data => {
                    res.status(200).json(data);
                })
                .catch(error => {

                    res.status(401).json(error);
                })
            break;

        case 'updateRotas':
            e(req.body)
            db('Rotas')
                .where('Sequencia', req.body.Sequencia)
                .andWhere('RotaID', req.body.RotaID)
                .update({
                    Latitude: req.body.Latitude,
                    Longitude: req.body.Longitude
                })
                .then(data => {
                    res.status(200).json(data);
                })
                .catch(error => {
                    res.status(401).json(error);
                })
            break;

        case 'getLogradouros':
            db('Paradas')
                .distinct('Logradouro')
                .where('Bairro', req.body.Bairro)
                .orderBy('Logradouro')
                .then(data => {
                    res.status(200).json(data);
                })
                .catch(error => {
                    e(error);
                    res.status(401).json(error);
                })
            break;

        case 'getColetas':
            e(req.body);
            db('vwCodigosRoteiro')
                .where('SiglaDoRoteiro', req.body.RotaID)
                .then(data => {
                    res.status(200).json(data);
                })
                .catch(error => {
                    e(error);
                    res.status(401).json(error);
                })
            break;

        //Velocidades
        case 'getVelocidades':
            e(req.body);
            db('Velocidades')
                .where('veiculo', req.body.Veiculo)
                .then(data => {
                    res.status(200).json(data);
                })
                .catch(error => {
                    e(error);
                    res.status(401).json(error);
                })
            break;
           

        default:
            res.status(401).json(new Error('Erro desconhecido!!!'));
    }
}



