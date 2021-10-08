import {React, useEffect, useState} from "react"
import {useSelector, useDispatch} from 'react-redux'
import {getDogs} from "../actions";
import Dog from './Dog'
import styles from '../css/Dogs.module.css'
import { Link } from "react-router-dom";

export default function Dogs(){
    const dispatch =  useDispatch();
    
    //let allDogs = useSelector((state)=> (state.allDogs))
    //console.log(allDogs); //-> array de todos los perros
    let dogs = useSelector((state) => (state.filteredDogs))
    let errors =  useSelector((state) => (state.error))
    //console.log(filteredDogs);
    
    // el use effect se va a ejecutar solo una vez cuando se monte el comp -> []
    useEffect(()=>{
        //cada vez q renderizo el comp me dispacha todos los perros
        dispatch(getDogs());
    }, [dispatch]);


    //reinicio el paginado
    useEffect(()=>{
        setCurrentPage(0);
    }, [dogs]);

    
    //paginado
    const [currentPage, setCurrentPage] = useState(0)
    
    function eightDogs(arr){
        return arr.slice(currentPage, currentPage + 8)
    }
    function nextPage(arr){
        if(currentPage < arr.length - 8)
            setCurrentPage(currentPage + 8)
    }
    function prevPage(){
        if(currentPage > 0)
            setCurrentPage(currentPage - 8)
    }

    console.log(errors)

    if(dogs.length){
        return(
        <div className = {styles.conteiner}>
            <div className = {styles.divBtn}>
                    <button className = {styles.btns} onClick = {prevPage}>←</button>
                    <button className = {styles.btns} onClick =  {() => nextPage(dogs)}>→</button>
            </div>
            <div className = {styles.conteinerCards}>
            {
                eightDogs(dogs).map(p => {
                    return(
                        <Link className = {styles.linkTitles} to = {'/home/detail/' + p.id} key = {p.name}>
                            <Dog
                                img = {p.image}
                                name = {p.name}
                                temp = {p.temperament}
                                weight = {p.weight['metric'] ? `${p.weight['metric']} kg` : `${p.weight} kg`}
                            />
                        </Link>
                        
                    )
                })
            }
            </div>
            <div className = {styles.divBtnUnder}>
                    <button className = {styles.btns} onClick = {prevPage}>←</button>
                    <button className = {styles.btns} onClick =  {() => nextPage(dogs)}>→</button>
            </div>
        </div>
        )
    }else if(errors){
        return <h3>{errors}</h3>
    }
    else{
        return <h2>Cargando...</h2>
    }
}