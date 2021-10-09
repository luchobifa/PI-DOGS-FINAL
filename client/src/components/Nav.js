import {React, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import {getDogs} from "../actions";
import { Link } from 'react-router-dom';
import styles from '../css/Nav.module.css'
import logo from "../img/logo2.jpg"

export default function Nav(){
    const dispatch =  useDispatch();

    function refresh(){
        window.location.pathname === "/home" ?
        window.location.reload() :
        window.location.pathname = "/home"
    }

    //empiezo a cargar los perros asi no me tarda en /home
    useEffect(()=>{
        //cada vez q renderizo el comp me dispacha todos los perros
        dispatch(getDogs())
    }, [dispatch]);

    return(
        <header className = {styles.divHeader}>
            <Link  to = '/home' onClick = {refresh} className = {styles.linkLogo}><img className={styles.logo} alt= '' src = {logo}/></Link>
            <Link className = {styles.home}  to = '/home'>Home</Link>
            <Link className = {styles.home} to = '/home/createDog'>Create</Link>
            {/* <Link className = {styles.home} to = '/home/favorites'>Favorites</Link> */}
        </header>
    )
}