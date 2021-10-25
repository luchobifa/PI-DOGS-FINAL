import {React, useEffect} from "react"
import {useSelector, useDispatch} from 'react-redux'
import { Link } from "react-router-dom";
import { getDogId, reset} from "../actions";
import styles from "../css/DogDetail.module.css"

export default function DogDetail(props){
    const detail = useSelector((state) => state.dogDetail)
    //console.log(detail)
    //console.log(props) --> obj con history, location, match
    
    const dispatch =  useDispatch();

    useEffect( ()=>{
          dispatch(getDogId(props.match.params.id));
    }, [dispatch, props.match.params.id]);


    //limpio el detail
    useEffect( ()=>{
        return () => dispatch(reset());
    }, [dispatch]);

    function deleteNaN(str){
        let arr =  str.split(' - ');
        //console.log(arr)
        let index;
        for(let i =0; i < arr.length; i++){
            if(arr[i] === "NaN"){
                index = i;
             }
        }
        arr.splice(index, 1);
        //console.log(arr);
        return arr.join();
    }

    //espero que me cargue todo para despues renderizarlo sino me llega undefined
    if(detail.hasOwnProperty('name')){
        return(
            <div style = {{position: "relative", display: "flex", justifyContent: "center"}}>
                    <Link to = "/home" className = {styles.link}><button className = {styles.btnBack}>BACK</button></Link>
                    <div className = {styles.conteiner}>
                        <div className = {styles.content}>
                            <h2 className = {styles.title}>{detail.name}</h2>
                            <ul className = {styles.ul}>
                                <li>{detail.temperament}</li>
                                <li>
                                {detail.weight['metric'] ? detail.weight['metric'].includes('NaN') ?`${deleteNaN(detail.weight['metric'])} kg` : `${detail.weight['metric']} kg`  : `${detail.weight} kg`}
                                </li>
                                <li>{`${detail.height} cm`}</li>
                                <li>{detail.life_span ? detail.life_span.includes('years') ? `${detail.life_span} of life`: `${detail.life_span} years of life` : ""}</li>
                                <li>{detail.country}</li>
                            </ul>
                        </div>
                        <img className={styles.img} alt= ''  src= {detail.image}/>
                    </div>  
            </div>
        )
    }else{
        return <h1 className = {styles.loading}>Loading...</h1>
    }
}