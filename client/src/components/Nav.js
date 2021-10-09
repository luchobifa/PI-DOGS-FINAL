import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../css/Nav.module.css'
import logo from "../img/logo2.jpg"

export default function Nav(){
    function refresh(){
        window.location.pathname === "/home" ?
        window.location.reload() :
        window.location.pathname = "/home"
    }


    return(
        <header className = {styles.divHeader}>
            <Link  to = '/home' onClick = {refresh} className = {styles.linkLogo}><img className={styles.logo} alt= '' src = {logo}/></Link>
            <Link className = {styles.home}  to = '/home'>Home</Link>
            <Link className = {styles.home} to = '/home/createDog'>Create</Link>
            {/* <Link className = {styles.home} to = '/home/favorites'>Favorites</Link> */}
        </header>
    )
}