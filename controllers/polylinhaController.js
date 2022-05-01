const axios = require('axios');

const e = console.log;

module.exports.getPoly = (req, res) => {

    var promise = new Promise(function (resolve, reject) {

        const arr = req.body.arr;
        const access_token = req.body.access;

        /**
         * tráz o tamanho do array
         */
        const lenArr = arr.length;

        /**
         * 
         * Array que aramzenara o polylinha
         */
        let polylinha = [];
        let  markers = [];


        let partes = Math.floor(lenArr / 25);

        if (lenArr % 25 > 0) {
            partes += 1;
        }

        let start = 0;
        let end = 25;

        let arrayDasPartes = [];

        for (let index = 0; index <= partes - 1; index++) {
            arrayDasPartes.push(arr.slice(start, end))
            start += 25;
            end += 25;
        }

        let count = 0;

        const interval = setInterval(() => {

            
            if (count > partes - 1) {
                clearInterval(interval);
                const response = {polylinha: polylinha, markers: markers}
                resolve(response)
                return;
            }

            let url = 'https://api.mapbox.com/directions/v5/mapbox/driving/'

            arrayDasPartes[count].forEach(x => {
                url += x[1] + ',' + x[0] + ';'
            })

            let len = url.length;
            url = url.substring(0, len - 1);
            url += `?steps=true&geometries=geojson&access_token=${access_token}`;

            axios.get(url)
                .then(data => {
                    const response = data.data.routes[0].geometry.coordinates;
   
                    data.data.waypoints.forEach(x => {
                        if(x.name.length > 0){
                            let obj = {name: x.name, location: x.location};
                            markers.push(obj);
                        }
                    });

                    response.forEach(x => {
                        polylinha.push(x);
                    })
                })
                .catch(err => {
                    reject(err);
                });

            count++;

        }, 500);

    });

    promise
        .then(data => res.status(200).json(data))
        .catch(err => res.status(401).json(err));

}