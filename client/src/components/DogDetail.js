import {React, useEffect} from "react"
import {useSelector, useDispatch} from 'react-redux'
import { getDogId } from "../actions";

export default function DogDetail(props){
    const detail = useSelector((state) => state.dogDetail)
    // /console.log(detail)
    
    const dispatch =  useDispatch();

     useEffect( ()=>{
          (async () => dispatch(await getDogId(props.match.params.id)))()
     }, [dispatch, props.match.params.id]);

     //console.log(props.match.params.id) --> recibo por props el id
    

    //espero que me cargue todo para despues renderizarlo sino me llega undefined
    if(detail.hasOwnProperty('name')){
        return(
            <div>
                {
                    <div>
                        <img alt= ''  src= {detail.image}/>
                        <h2>{detail.name}</h2>
                        <ul>
                            <li>{detail.temperament}</li>
                            <li>
                            {detail.weight['metric'] ? `${detail.weight['metric']} kg` : `${detail.weight} kg`}
                            </li>
                            <li>{`${detail.height} cm`}</li>
                            <li>{detail.life_span ? detail.life_span.includes('years') ? `${detail.life_span} of life`: `${detail.life_span} years of life` : ""}</li>
                        </ul>
                    </div>  
                }
            </div>
        )
    }else{
        return <h1>Cargando...</h1>
    }
}