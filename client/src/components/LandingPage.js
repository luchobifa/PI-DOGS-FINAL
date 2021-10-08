import {React, useEffect} from "react"
import {useDispatch} from 'react-redux'
import { Link } from 'react-router-dom';
import { getDogs } from "../actions";
import styles from '../css/LandingPage.module.css'

export default function LandingPage(){
    const dispatch =  useDispatch();

    //empiezo a cargar los perros asi no me tarda en /home
    useEffect(()=>{
        //cada vez q renderizo el comp me dispacha todos los perros
        dispatch(getDogs())
    }, [dispatch]);
    return(
        <div className = {styles.backgr}>
            <h1>The best</h1>
            <h1>therapist</h1>
            <h1>has fur</h1>
            <h1>and four legs</h1>
           <Link to='/home'><button>Get Started</button></Link> 
        </div>
    );
}