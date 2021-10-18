var express = require('express');
const router = express.Router();
const {Dog, Temperament} = require('../db');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
require('dotenv').config();
const {
    API_KEY
  } = process.env;


//https://api.thedogapi.com/v1/breeds


router.get('/', async (req, res) =>{
    try{
        const {name} = req.query
        //console.log('QUERY: ', name);

        //me traigo los datos de la api.
        let response = await fetch(`https:api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
        let apiBreeds = await response.json();
        
        //mapeo para devolver solo los datos necesarios.
        apiBreeds = apiBreeds.map(({image, name, temperament, weight, id}) => ({
            image: image['url'],
            name,  
            temperament,
            weight: weight,
            id: id
        }));

        let localBreeds = await Dog.findAll({
            include:[{
                model: Temperament,
            }],  
            attributes: {exclude: ['height', 'life_span', 'createdAt', 'updatedAt']} 
        });
        //console.log(localBreeds); 
        
        //mapeo para mostrar bien los temperaments (me vienen como array de obj)
        //
        //mapeo los perros pasandolos a json para despues poder manipularlos
        let result = [...localBreeds.map(e => e.toJSON())]
        //console.log(result) //--> me devuelve un arr de los perrosCreados en json
        //los recorro y transformo su temperamento (arr de objs) en un string
        for(let i =0; i < result.length; i++){
            result[i].temperaments = result[i].temperaments.map(t => t.name).join(', ');
            //creo la prop temperament (SINGULAR) ya que la que me viene de la api se llama asi y sequelize me hace plural
            result[i].temperament = result[i].temperaments;
            //borro temperaments (PLURAL)
            delete  result[i].temperaments;
        } 
        
        //Si me llega un nombre por query...
        if(name){
            //console.log('QUERY: ', name);


            //podria concatenar los dos y hace run solo filter
            //busco contenga el nombre ingresado por query en la API
            let arrNameApi = apiBreeds.filter(b => b.name.toLowerCase().includes(name.toLowerCase()));
            
            //busco contenga el nombre ingresado por query en la DB 
            let arrNameLocal = result.filter(b => b.name.toLowerCase().includes(name.toLowerCase()));
            //console.log(arrNameLocal);    

             
            //si no me traje nada en ninguno de los 2 retorno error
             if(!arrNameApi.length && !arrNameLocal.length){
                 return res.status(404).send(`No se encontro el perro con el nombre ${name}`);
             }
            
            return res.status(200).json([...arrNameApi, ...arrNameLocal])
        }
        return res.status(200).json([...result, ...apiBreeds]);
    }catch(err){
        return console.log(err);
    }
}); 

router.get('/:id', async(req, res) =>{
    try{
        const {id} = req.params;
        //console.log('IDPARAM: ', id)
        //console.log(typeof id)
        
        //me traigo los datos de la api.
        let response = await fetch(`https:api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
        let apiBreeds = await response.json();
        
        //mapeo para devolver solo los datos necesarios.
        apiBreeds = apiBreeds.map(({image, name,id,  temperament, height, weight, life_span }) => ({
            image: image['url'],
            name, 
            temperament,
            height: height['metric'], 
            weight: weight,
            id,
            life_span 
        }));
        
        //Si me llega un id por params...
        if(id){
            if(id.length < 16){
                //busco el perro en la api
                let dogApi = apiBreeds.find(b => b.id === parseInt(id));
                //console.log(dogApi);
                if(!dogApi)return res.status(404).send(`No se encontro el perro con el id: ${id}`);
                return res.status(200).json(dogApi);
            }else{
                //podria usar el findAll e incluir los temps

                //busco el perro en la DB
                let dogDB = await Dog.findByPk(id);
                //console.log(dogDB);

                //me trae los temperamentos asociados
                let temperaments = await dogDB.getTemperaments();
                //console.log(temperaments); 

                //mapeo para obtener el nombre de cada temp
                let tempMap = temperaments.map(el => el.dataValues.name);
                //console.log(tempMap);
                
                //los uno por que me devuelve un array
                dogDB.dataValues.temperament = tempMap.join(' ')

                if(!dogDB)return res.status(404).send(`No se encontro el perro con el id: ${id}`);
                return res.status(200).json(dogDB);
            }
         }
    }catch(err){
        return res.send(err);
    }
});


module.exports = router;