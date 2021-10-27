import React from "react";
import styles from "../css/Footer.module.css"

export default function Footer(){
    return(
        <footer className = {styles.conteiner}>
            <div className = {styles.divAbout}>
                <h4 className = {styles.about} >ABOUT</h4>
                <p className = {styles.parrafo}>Este es mi proyecto individual desarrollado en 3 semanas para el bootcamp SoyHenry el cual consiste en una aplicacion mediante la cual se pueden crear razas de perro y buscarlas mediante una API(TheDogApi), filtrarlas, ordenarlas y acceder a sus respectivos detalles.</p>
            </div>
            <div className = {styles.divLista}>
                <h4 className = {styles.about} >FRONT-END</h4>
                <ul className = {styles.lista}>
                    <li className = {styles.parrafo}>React</li>
                    <li className = {styles.parrafo}>Redux</li>
                </ul>
            </div>
            <div className = {styles.divLista}>
                <h4 className = {styles.about} >BACK-END</h4>
                <ul className = {styles.lista}>
                    <li className = {styles.parrafo}>Node JS</li>
                    <li className = {styles.parrafo}>Sequelize</li>
                    <li className = {styles.parrafo}>Express</li>
                    <li className = {styles.parrafo}></li>
                </ul>
            </div>
            <div className = {styles.divLista}>
                <h4 className = {styles.about}>DATA BASE</h4>
                <ul className = {styles.lista}>
                    <li className = {styles.parrafo}>PostgreSQL</li>
                </ul>
            </div>
        </footer>
    )
}