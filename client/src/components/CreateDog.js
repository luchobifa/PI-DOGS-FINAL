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
        setInput({
            ...input,
            temperaments: [...input.temperaments, e.target.value]
        })
        //console.log(input.temperaments)
    }
    //console.log(input)
    
    return(
        <form onSubmit = {handleSubmit} className = {styles.form}>
            <div>
                <label>name: </label>
                <input type = 'text' value = {input.name} name = 'name' onChange = {handleChange} required></input>
                *
            </div>

            <div>
                <label>height: </label>
                <input  type = 'text' value = {input.height} name = 'height' onChange = {handleChange} required></input>
                *
            </div>

            <div>
                <label>weight: </label>
                <input  type = 'text' value = {input.weight} name = 'weight' onChange = {handleChange} required></input>
                *
            </div>

            <div>
                <label>span life:</label>
                <input  type = 'text' value = {input.life_span}  name = 'life_span' onChange = {handleChange}></input>
            </div>

            <div>
                <label>temperaments: </label>
                <select onChange = {handleSelect}>
                    <option value = 'All Temperaments' >All Temperaments</option>
                    {
                        temps.map(t => <option key = {t.name}>{t.name}</option>)
                    }
                </select>
                <div>
                    <ul>
                        <li>
                            {input.temperaments.map(t => `${t}, `)}
                        </li>
                    </ul>
                </div>
            </div>

            <button>CREATE!</button>
        </form>
    )
}