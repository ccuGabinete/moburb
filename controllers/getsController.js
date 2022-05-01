const knex = require('knex');
const knexfile = require('../knexfile').development;
const db = knex(knexfile);
const e = console.log;

module.exports.getAll = (req, res) => {

    let action = req.query.action;
    let rotaid = req.query.RotaID;

    res.header("Access-Control-Allow-Origin", "*");

    switch (action) {
        //Paradas
        case 'getParadas':

            if (rotaid) {
                db('Paradas')
                    .where('RotaID', rotaid)
                    .then(data => {
                        res.status(200).json(data);
                    })
                    .catch(error => {
                        res.status(401).json(error);
                    })
            } else {
                db('Paradas')
                    .then(data => {
                        e(data);
                        res.status(200).json(data);
                    })
                    .catch(error => {
                        res.status(401).json(error);
                    })
            }

            break;

        case 'persisteParadas':
            db('Paradas').insert(req.body)
                .then(data => {
                    res.status(200).json(data);
                })
                .catch(error => {
                    res.status(401).json(error);
                })
            break;


        // Rotas    
        case 'getRotas':
            db('Rotas')
                .where('RotaID', rotaid)
                .then(data => {
                    res.status(200).json(data);
                })
                .catch(error => {
                    res.status(401).json(error);
                })
            break;

        // Dias    
        case 'getDias':
            db('Rotas')
                .distinct('Dias')
                .where('RotaID', rotaid)
                .then(data => {
                    if (data.length === 0) {
                        res.status(200).json([{ Dias: '[""]' }]);
                        return;
                    }

                    res.status(200).json(data);
                })
                .catch(error => {
                    res.status(401).json(error);
                })
            break;

        // Roteiros    
        case 'getRoteiros':
            db('vwCodigosRoteiro')
                .column('SiglaDoRoteiro', 'PrefixoVeiculo')
                .then(data => {
                    res.status(200).json(data);
                })
                .catch(error => {
                    e(error);
                    res.status(401).json(error);
                })
            break;

        case 'getBairros':
            db('Paradas')
                .distinct('Bairro')
                .orderBy('Bairro')
                .then(data => {
                    res.status(200).json(data);
                })
                .catch(error => {
                    e(error);
                    res.status(401).json(error);
                })
            break;

        // Todas as Rotas    
        case 'getNameRotas':

            db.from('Rotas')
                .distinct('Rotas.RotaID')
                .column('vwCodigosRoteiro.SiglaSetor')
                .innerJoin('vwCodigosRoteiro', 'Rotas.RotaID', 'vwCodigosRoteiro.SiglaDoRoteiro')

                .then(data => {

                    let aux = [];

                    data.forEach(e => {
                        if (aux.indexOf(e.SiglaSetor) === -1) {
                            aux.push(e.SiglaSetor);
                        }
                    });

                    let grupos = [];



                    let x;
                    let aux2 = [];

                    aux.forEach(t => {
                        x = data.filter(x => x.SiglaSetor === t);
                        x.forEach(m => {
                            if (aux2.indexOf(m.RotaID) === -1) {
                                aux2.push({ name: m.RotaID });
                            }
                        })

                        grupos.push({ name: t, children: aux2 })

                    });

                    res.status(200).json(grupos);
                })
                .catch(error => {
                    res.status(401).json(error);
                })
            break;

        default:
            res.status(401).json(new Error('Erro desconhecido!!!'));
    }
}



