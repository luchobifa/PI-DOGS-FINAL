import {React, useEffect} from "react"
import {useDispatch} from 'react-redux'
import { Link } from 'react-router-dom';
import { getDogs } from "../actions";
import styles from '../css/LandingPage.module.css'
import video from "../img/papis2.mp4"

export default function LandingPage(){
    const dispatch =  useDispatch();

    //empiezo a cargar los perros asi no me tarda en /home
    useEffect(()=>{
        //cada vez q renderizo el comp me dispacha todos los perros
        dispatch(getDogs())
    }, [dispatch]);
    
    return(
        <div className = {styles.backgr}>
            <video className = {styles.video} autoPlay loop muted>
                <source src={video} type="video/mp4"/>
            </video>
           <Link to='/home'><button className = {styles.btn}>Get Started</button></Link> 
        </div>
    );
}