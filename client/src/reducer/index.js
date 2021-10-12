const initialState = {
    allDogs: [], //copia para tener siempre todos los perros
    dogDetail: {},
    temperaments: [],
    filteredDogs:[],
    error:""
};

function parseWeight(str){
    if(str){
        let arr = str.split(' - ')
    //console.log(arr)
    if(arr.length > 1){
        let sum = 0;
        for (let i = 0 ; i < arr.length; i++){
            sum += parseInt(arr[i])
        }
        //console.log(sum)
        let promedio = sum / 2
        return promedio
    }else{
        //console.log(arr.join())
        return arr.join()
    }
    }
}

export default function rootReducer(state = initialState, action) {
    switch(action.type){
        case "GET_ALL":
            return{
                ...state,
                allDogs: action.payload,
                filteredDogs: action.payload
            }
        case "GET_ALL_DOGS":
                return{
                    ...state, 
                    //allDogs: action.payload,
                    filteredDogs: action.payload
                }
        case "ERROR":
            return{
                ...state,
                filteredDogs: [],
                error: action.payload
            }
        case "GET_DOGS_FILTERED_BY_BREED":
            if(action.payload === 'All Breeds'){
                return{
                    ...state,
                    filteredDogs: state.allDogs
                }
            }
            else{
                return{
                    ...state, 
                    filteredDogs: state.allDogs.filter(d => (d.name === action.payload))
                }
            }
        case "GET_DOG_ID":
            return{
                ...state,
                dogDetail: action.payload
            }
        case "GET_TEMPERAMENT":
            return{
                ...state,
                temperaments: action.payload
            }
        case "POST_DOG":
            return{
                ...state,
                 //allDogs: state.allDogs.concat(action.payload)
            }
        case "FILTER_BY_TEMP":
            if(action.payload === 'All Temperaments'){
                return{
                    ...state,
                    filteredDogs: state.allDogs
                }
            }
            else{ 
                return{
                    ...state,
                    filteredDogs: state.allDogs.filter(d => (d.temperament?.includes(action.payload)))
                }
            }
        case "ORDER":
            if(action.payload === 'desc'){
                return{
                    ...state,
                    //ya me vienen ordenados
                    filteredDogs: [...state.filteredDogs].sort((a, b) => {
                        return (a.name < b.name ? 1 : -1)
                    })
                }
            }
            else if(action.payload === 'asc'){
                return{
                    ...state,
                    filteredDogs: [...state.filteredDogs].sort((a, b) => {
                        return (a.name < b.name ? -1 : 1)
                    })
                }
            }
            else if(action.payload === 'min_weight'){
                return{
                    ...state,
                    filteredDogs: [...state.filteredDogs].sort((a, b) => {
                        return ((a.weight['metric'] ? parseWeight(a.weight['metric']) : parseWeight(a.weight)) - (b.weight['metric'] ? parseWeight(b.weight['metric']): parseWeight(b.weight)))
                    }),
                }
            }else{
                return{
                    ...state,
                    filteredDogs: [...state.filteredDogs].sort((a, b) => {
                        return ((b.weight['metric'] ? parseWeight(b.weight['metric']): parseWeight(b.weight)) - (a.weight['metric'] ? parseWeight(a.weight['metric']): parseWeight(a.weight)))
                    }),
                }
            }
        default:
            return state;
    }
}