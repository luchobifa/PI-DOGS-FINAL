import axios from "axios";

export function getDogs(name) {
    return async function(dispatch){
        if(name){
            try{
                let data = await (await axios.get(`http://localhost:3001/dogs?name=${name}`)).data;
                return dispatch({type: "GET_ALL_DOGS", payload: data})
            }catch(e){
                return dispatch({type: "ERROR", payload: `No se encontro el perro ${name}`})
            }
        }
        let data = await (await axios.get("http://localhost:3001/dogs")).data;
        return dispatch({type: "GET_ALL", payload: data})
    }
}

export function getDogsFiltered(breed){
    //console.log(breed);
    return{type: "GET_DOGS_FILTERED_BY_BREED", payload: breed}
}

export function getDogId(id){
    return async function(dispatch){
        let data = await (await axios.get(`http://localhost:3001/dogs/${id}`)).data;
        //console.log(data);
        return dispatch({type: "GET_DOG_ID", payload: data})
    }
}

export function getTemperaments(){
    return async function(dispatch){
        let data = await (await axios.get(`http://localhost:3001/temperament`)).data;
        return dispatch({type: "GET_TEMPERAMENT", payload: data})
    }
} 

export function postDog(input){
    return async function(dispatch){
        let data = await (await axios.post(`http://localhost:3001/dog`, input)).data;
        return dispatch({type: "POST_DOG", payload: data})
    }
}

export function getCopyDogs(arrDogs){
    return{type: "GET_COPY_DOGS" , payload: arrDogs}
}

//filtros


export function filterByTemp(temp){
    return {type: "FILTER_BY_TEMP", payload: temp}
}


export function order(order){
    return {type: "ORDER", payload : order}
}

export function reset(){
    return{type: "DELETE_DETAIL"}
}
