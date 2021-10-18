var express = require('express');
const router = express.Router();
const {Dog, Temperament} = require('../db');
// const axios = require('axios');
//const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
require('dotenv').config();
const {
    API_KEY
  } = process.env;

router.post('/', async (req, res) =>{
    let {name, minHeight, maxHeight, minWeight, maxWeight, life_span, temperaments, image, country} = req.body;
    if(!name){
        return res.send('Must fill stared')
    }
    if(!image){
        image = 'https://media.istockphoto.com/vectors/dog-silhouette-pet-animal-vector-id1257179923?k=20&m=1257179923&s=170667a&w=0&h=zsjUXo2adsZHHD7iysTGU1epH_y8UyQY1VOc7knEF3M=';
    }
    try{
        const newDog = await Dog.create({
            image,  
            name,
            height: `${minHeight} - ${maxHeight}`,
            weight: `${minWeight} - ${maxWeight}`, 
            life_span,
            country
        });
        //console.log(newDog.toJSON()); 

        //temperaments es un array de temps -> strings

        //me traigo de mi DB los respectivos temps
        let temps = await Temperament.findAll({
            where:{ 
                name: temperaments
            }
        }
        )
        //console.log(temps)

        //los asocio con el perro creado
        newDog.addTemperament(temps);

        //console.log(temp);
        //console.log(temp.map(p => p.toJSON()));

        return res.status(200).json(newDog);
    }catch(err){
        res.send(err);
    }
});



module.exports = router;