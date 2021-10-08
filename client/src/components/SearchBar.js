import React from 'react';
import { useState} from 'react';
import {useDispatch} from 'react-redux';
import { getDogs} from "../actions";
import styles from "../css/SearchBar.module.css"
import {GrSearch} from "react-icons/gr"

export default function SearchBar(){
    const [value, setValue] = useState('');
    
    const dispatch =  useDispatch();

    // useEffect(()=>{
    //     //cada vez q renderizo el comp me dispacha todos los perros
    //     // dispatch(getDogs(value));
    // }, [dispatch]);

    function handleSubmit(e){
        e.preventDefault();
        dispatch(getDogs(value));
        setValue('');
    }

    function handleChange(e){
        //console.log(e.target.value)
        setValue(e.target.value);
    }
    //console.log(value)
    
    return(
        <div className = {styles.banner}>
            <form className={styles.form} onSubmit =  {handleSubmit}>
                <div className = {styles.searchConteiner}>
                    <input
                        className = {styles.input}
                        value = {value}
                        onChange = {handleChange}
                        placeholder = 'Search a breed...'>
                    </input>
                    <button className = {styles.btn}><GrSearch/></button>
                </div> 
            </form>
        </div>
    )
}