var soap = require('soap');
var url = 'https://novo.bysat.com.br/api/GetMacroTelemetria';

var args = {
    usuario: 'comlurb',
    senha: "comlurbrj",
    id_espelhamento: "0",
    placa: "DVS7E71",
    macros: "0",
    id_veiculo: "68833"
};

soap.createClient(url, function(err, client) {
    console.log(client)
});

