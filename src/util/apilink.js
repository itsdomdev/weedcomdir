var axios = require('axios');

let isDev = false;


const apiUrl = isDev ?
    "http://localhost:8080" :
    // "https://landing-preview-p2vs7mz6ta-uc.a.run.app" :
    "http://localhost:4000/api" ;
    // "https://us-central1-newproj-315711.cloudfunctions.net/dirfunctions" ;


export function getListings(dat) {
    // console.debug('checkForSession')
    return new Promise((resolve) => {
        dat.scope="dispensary_list"
        var data = JSON.stringify(dat);
        var config = {
            method: 'post',
            url: apiUrl,
            headers: {
              'Content-Type': 'application/json'
            },
            data : data
          };
        // var config = {
        // method: 'post',
        // url: `${apiUrl}/dispensary_list`,
        // headers: {
        //     'Content-Type': 'application/json'
        // },
        // data : data
        // };
        console.log(' ----- data ----- ')
        console.log(data)
        console.log(' ----- data ----- ')

        axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            return resolve(response.data)
        })
        .catch(function (error) {
        console.log(error);
        });

    })
}


export function updateListings(d) {
    // console.debug('checkForSession')
    return new Promise((resolve) => {
        // var data = JSON.stringify(d);
        d.scope="dispensary_list_update"
        var data = JSON.stringify(d);
        console.log(d)
        var config = {
            method: 'post',
            url: apiUrl,
            headers: {
              'Content-Type': 'application/json'
            },
            data : data
          };
        // var config = {
        // method: 'post',
        // url: `${apiUrl}/dispensary_list/update`,
        // headers: {
        //     'Content-Type': 'application/json'
        // },
        // data : data
        // };

        axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            return resolve(response.data)
        })
        .catch(function (error) {
        console.log(error);
        });

    })
}

export function dispBySlug(slug) {
    // console.debug('checkForSession')
    return new Promise((resolve) => {

        var data = JSON.stringify({"slug":slug,"scope":"get_dispensary"});

        var config = {
        method: 'post',
        url: `${apiUrl}`,
        headers: {
            'Content-Type': 'application/json'
        },
        data : data
        };
        // var config = {
        // method: 'get',
        // url: `${apiUrl}/api/disp_by_slug/${slug}`
        // };
          axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
            return resolve(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });


    })
}

export function getTopCities() {
    // console.debug('checkForSession')
    return new Promise((resolve) => {


        var data = JSON.stringify({"scope":"top_cities"});

        var config = {
        method: 'post',
        url: apiUrl,
        headers: {
            'Content-Type': 'application/json'
        },
        data : data
        };
          axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
            return resolve(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });


    })
}
