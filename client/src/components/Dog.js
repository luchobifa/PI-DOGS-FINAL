import React from "react"
import styles from '../css/Dog.module.css'

export default function Dog({img, name, temp, weight}){
    return(
        <div className = {styles.dogCard}>
            <img alt= '' className={styles.imgDog} src= {img}/>
            <h4 className = {styles.name}>
                {name}
            </h4>
            <p>
                {temp}
            </p>  
            <p>
                {weight}
            </p>
        </div>
    )
}