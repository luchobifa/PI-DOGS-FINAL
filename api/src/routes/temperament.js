var express = require('express');
const router = express.Router();
const {Temperament} = require('../db');
// const axios = require('axios');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
require('dotenv').config();
const {
    API_KEY
  } = process.env;


//https://api.thedogapi.com/v1/breeds


router.get('/', async (req, res) => {
  try{
    //me traigo los datos de la api.
    let response = await fetch(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
    let apiDogs = await response.json();
    
    //mapeo para devolver solo los temperamentos.
    let temps = apiDogs.map(d => d.temperament);
    //console.log('mapeados: ', temps);
    
    //spliteo para poder manipularlos
    temps = temps.map(t =>t?.split(', '));
    //console.log('spliteados: ', temps);

    //los uno para despues cargarlos a la DB
    temps = temps.flat();
    //console.log('unidos: ', temps);

    //hace falta eliminar duplicados antes de hacerlos objs.
    let uniqueTemps = [...new Set(temps)];

    //me llega un null asi que lo filtro
    uniqueTemps = uniqueTemps.filter(t => t !== undefined);

    //los guardo con el name para luego hacer el bulkCreate
    uniqueTemps = uniqueTemps.map(t => { return {name: t}});
    //console.log('unicos: ', uniqueTemps); 
    

    //me traigo los datos de la DB
    let dbDogs = await Temperament.findAll();
    //console.log('DB-DOGS: ', dbDogs)

    //si no hay datos en la DB, la cargo.
    if(!dbDogs.length){
      await Temperament.bulkCreate(uniqueTemps);
      dbDogs = await Temperament.findAll();
      return res.status(200).json(dbDogs);
     }else{
       return res.status(200).json(dbDogs);
     }
  }catch(err){
    return res.send(err);
  }
});




module.exports = router;