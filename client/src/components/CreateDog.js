import {React, useEffect, useState} from "react";
import styles from '../css/CreateDog.module.css'
import { postDog, getTemperaments, getDogs} from "../actions";
import {useDispatch,useSelector} from 'react-redux'
import { useHistory } from "react-router";

export default function CreateDog(){
    const history = useHistory();
    const [input, setInput] = useState({
        name: '',
        height: '',
        weight: '',
        life_span: '',
        temperaments: [],
        country: ""
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
                minHeight: '',
                maxHeight: '',
                minWeight: '',
                maxWeight: '',
                life_span: '',
                temperaments: [],
                country:""
            } 
        )
        dispatch(getDogs())
        history.push("/home");
    }

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
       // console.log(input);
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
        <div className = {styles.img}>
        <div className = {styles.conteiner}>
        <form onSubmit = {handleSubmit} className = {styles.form}>
            <h2 className = {styles.title}>Create a breed !</h2>
                
            <div className={styles.eachInput}>
                <label className = {styles.label}>Name *</label>
                <input  className={styles.inputs} type = 'text' value = {input.name} name = 'name' onChange = {handleChange} required placeholder = "Type a name"></input>
            </div>       

                <div className={styles.eachInput}>
                    <label className = {styles.label}>Height *</label>
                        
                    <input className={styles.inputs} type = 'number' defaultValue = "" name = 'minHeight' onChange = {handleChange} required placeholder = "Type the min height [Centimeters]"></input>
                        
                    <input   className={styles.inputs} type = 'number' defaultValue = "" name = 'maxHeight' onChange = {handleChange} required placeholder = "Type the max height [Centimeters]"></input>
                </div>
                
                <div className={styles.eachInput}>
                    <label className = {styles.label}>Weight *</label>

                    <input  className={styles.inputs} type = 'number' defaultValue = "" name = 'minWeight' onChange = {handleChange} required placeholder = "Type the min weight [Kilograms]"></input>
                        

                    <input  className={styles.inputs} type = 'number' defaultValue = "" name = 'maxWeight' onChange = {handleChange} required placeholder = "Type the max weight [Kilograms]"></input>
                    </div>
                    
                    <div className={styles.eachInput}>
                        <label className = {styles.label}>Life Span </label>
                        <input   className={styles.inputs} type = 'text' value = {input.life_span}  name = 'life_span' onChange = {handleChange} placeholder = "Type the life span [Years]"></input>
                    </div> 
             

                <div className = {styles.divTemps}>
                    <label> Add temperaments:</label>
                    <select className={styles.inputTemp} onChange = {handleSelect} defaultValue = 'All Temperaments'>
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
                    {/* <label> Country</label>
                    <input name = "country" type = "text" value ={input.country} onChange={handleChange}></input> */}
                </div>

                <button className = {styles.btn}>CREATE !</button>
            
        </form>
        </div>
        </div>
    )
}