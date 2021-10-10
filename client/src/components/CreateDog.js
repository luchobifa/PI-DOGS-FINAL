import {React, useEffect, useState} from "react";
import styles from '../css/CreateDog.module.css'
import { postDog, getTemperaments} from "../actions";
import {useDispatch,useSelector} from 'react-redux'
import { useHistory } from "react-router";

export default function CreateDog(){
    const history = useHistory()
    const [input, setInput] = useState({
        name: '',
        height: '',
        weight: '',
        life_span: '',
        temperaments: []
    })

    const temps = useSelector((state)=> state.temperaments);

    const dispatch =  useDispatch();
    
    useEffect(()=>{
        dispatch(getTemperaments())
    }, [dispatch])

    function handleSubmit(e){
        e.preventDefault()
        dispatch(postDog(input));
        alert('The dog was created succesfully!')
        setInput(
            {
                name: '',
                height: '',
                weight: '',
                life_span: '',
                temperaments: []
            } 
        )
        history.push("/home")
    }

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        //console.log(input);
    }

    function handleSelect(e){
        if(!input.temperaments.includes(e.target.value)){
            setInput({
                ...input,
                temperaments: [...input.temperaments, e.target.value]
            })
        }
        else{
            return alert(`The temperament "${e.target.value}" is already added`)
        }
        //console.log(input.temperaments)
    }
    //console.log(input)

    function deleteTemp(temp){
        setInput({
            ...input,
            temperaments : input.temperaments.filter(t => t !== temp)
        })
    }
    
    
    return(
        <div className = {styles.conteiner}>
        <form onSubmit = {handleSubmit} className = {styles.form}>
            <h2>Create a dog</h2>
            <div className = {styles.content}>
                <div className = {styles.nameyhei}>
                    <div className={styles.eachInput}>
                        <label className = {styles.label}>Name *</label>
                        <input  className={styles.inputs} type = 'text' value = {input.name} name = 'name' onChange = {handleChange} required placeholder = "Type a name"></input>
                    </div>

                    <div className={styles.eachInput}>
                        <label className = {styles.label}>Height *</label>
                        <input   className={styles.inputs} type = 'text' value = {input.height} name = 'height' onChange = {handleChange} required placeholder = "Type the height"></input>
                    </div>
                </div>

                <div className = {styles.weiyspan}>
                    <div className={styles.eachInput}>
                        <label className = {styles.label}>Weight *</label>
                        <input  className={styles.inputs} type = 'text' value = {input.weight} name = 'weight' onChange = {handleChange} required placeholder = "Type the weight"></input>
                    </div>
                    <div className={styles.eachInput}>
                        <label className = {styles.label}>Span life </label>
                        <input   className={styles.inputs} type = 'text' value = {input.life_span}  name = 'life_span' onChange = {handleChange} placeholder = "Type the weight"></input>
                    </div>
                </div>

                <div>
                    <label> Add temperaments </label>
                    <select className={styles.inputs} onChange = {handleSelect} defaultValue = 'All Temperaments'>
                        <option value = 'All Temperaments'disabled>All Temperaments</option>
                        {
                            temps.map(t => <option key = {t.name}>{t.name}</option>)
                        }
                    </select>
                    <div>
                        <div className = {styles.addedConteiner}>
                            {input.temperaments.map(t => <div key = {t} className = {styles.temps}>{t }<button className={styles.deleteBtn} onClick = {()=> deleteTemp(t)}>X</button></div>)}
                        </div>
                    </div>
                </div>

                <button className = {styles.btn}>CREATE!</button>
            </div>
        </form>
        </div>
    )
}